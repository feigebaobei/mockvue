<template>
  <div class="loginToken">
    <div class="canvasBox">
      <canvas id="canvas" ref="qr"></canvas>
      <p>二维码有效时间：<span>{{validTime}}</span>s</p>
    </div>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
import QRCode from 'qrcode'

export default {
  props: {},
  data () {
    return {
      validTime: 0,
      userInfo: '',
      hasUserInfo: false // 是否得到了用户信息
    }
  },
  computed: {
  },
  // filters: {},
  components: {
    // basicvue
  },
  methods: {
    init () {
      this.getQrStr()
    },
    getQrStr () {
      instance({
        url: '/users/qrStr',
        method: 'get'
      }).then(response => {
        // console.log(JSON.parse(response.data.data))
        this.validTime = Math.floor((Number(JSON.parse(response.data.data).expire) - Date.now()) / 1000)
        // this.validTime = 5
        this.spendTime()
        this.pollLoginStatus()
        return QRCode.toCanvas(this.$refs.qr, response.data.data, error => {
          return Promise.reject(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    spendTime () {
      let that = this
      setTimeout(function () {
        if (that.validTime) {
          that.validTime--
          that.spendTime()
        }
      }, 1000);
    },
    getUserInfo () {
      return instance({
        url: '/users/userInfo',
        method: 'get'
      })
    },
    pollLoginStatus () {
      // let that = this
      if (!this.hasUserInfo && this.validTime) {
        this.getUserInfo().then(response => {
          if (response.data.result) {
            this.userInfo = response.data.data
            this.hasUserInfo = true
            sessionStorage.userInfo = JSON.stringify(response.data.data)
            alert('已登录')
            this.$router.push({
              path: '/'
            })
          } else {
            let that = this
            setTimeout(function () {
              that.pollLoginStatus()
            }, 1000)
          }
        }).catch(() => {
          let that = this
          setTimeout(function () {
            that.pollLoginStatus()
          }, 1000)
        })
      }
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .loginToken

    h2
      font-size: .36rem

</style>
