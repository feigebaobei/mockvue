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
      hasUserInfo: false, // 是否得到了用户信息
      timer: null
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
        // this.validTime = 5 // 测试用
        this.spendTime()
        this.pollLoginStatus()
        return QRCode.toCanvas(this.$refs.qr, response.data.data, error => {
          if (error) {
            console.log(error)
          }
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
    getLoginStatus () {
      return instance({
        url: '/users/loginStatus',
        method: 'get'
      })
    },
    getUserInfo () {
      instance({
        url: '/users/userInfo',
      }).then(response => {
        // if (response.)
        sessionStorage.setItem('userInfo', JSON.stringify(response.data.data))
        this.$store.dispatch('modiyfUserInfo', {userInfo: response.data.data})
      }).catch(error => {
        console.log(error)
      })
    },
    pollLoginStatus () {
      if (!this.hasUserInfo && this.validTime) {
        this.getLoginStatus().then(response => {
          if (response.data.result) {
            this.userInfo = response.data.data
            this.hasUserInfo = true
            sessionStorage.userInfo = JSON.stringify(response.data.data)
            // alert('已登录')
            this.getUserInfo()
            this.$router.push({
              path: '/'
            })
          } else {
            let that = this
            this.timer = setTimeout(function () {
              that.pollLoginStatus()
            }, 1000)
          }
        }).catch(() => {
          let that = this
          this.timer = setTimeout(function () {
            that.pollLoginStatus()
          }, 1000)
        })
      }
    }
  },
  created () {},
  mounted () {
    this.init()
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus" scoped>

  .loginToken

    h2
      font-size: .36rem

</style>
