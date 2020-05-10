<template>
  <div id="login">
    <!-- <h2>welcome to login page.</h2> -->
    <p>请选择登录方式</p>
    <section class="buttons">
      <button id="scan" @click="selectLoginMethod('scan')">扫码登录</button>
      <button id="udid" @click="selectLoginMethod('udid')">udid登录</button>
    </section>
    <canvas id="canvas" ref="qr" v-show="this.loginMethod === 'scan'"></canvas>
    <form action="#" v-show="this.loginMethod === 'udid'">
      <div>
        <label for="phone">手机号</label>
        <input type="text" id="phone" name="phone">
      </div>
      <div>
        <label for="checkCode">验证码</label>
        <input type="text" id="checkCode" name="checkCode">
      </div>
      <div>
        <button id="getCheckCode">获得验证码</button>
      </div>
      <div class="udidBlocd">
        <div>
          <label for="udid">udid</label>
          <select name="udid" id="udid">
            <option v-for="(udid, index) in this.formData.udid" :key="index" value="udid">{{udid}}</option>
          </select>
        </div>
        <div>
          <label for="idpwd">身份密码</label>
          <input type="password" id="idpwd" name="idpwd">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import instance from '@/lib/axiosInstance'
import QRCode from 'qrcode'

export default {
  name: 'Login',
  data () {
    return {
      loginMethod: '', // 登录方式 scan udid
      hasRenderQR: false, // 是否已经渲染qr
      reqTime: 0, // 请求userInfo的次数
      formData: {
        phone: '',
        checkCode: '',
        udid: [],
        idpwd: ''
      }
    }
  },
  computed: {},
  components: {
    // HelloWorld
  },
  methods: {
    init () {
      // console.log(this)
      // this.getData()
    },
    // getData () {
    // 请求qr data
    getQRData () {
      instance.get('/users/login/userInfo').then(res => {
        // 渲染qr
        QRCode.toCanvas(this.$refs.qr, JSON.stringify(res.data), error => {
          if (error) {
            console.log('error', error)
          }
          // console.log('success')
        })
        // 保存 sessionId / adid
        this.$store.commit('modifyUuid', {uuid: res.data.uuid})
        this.$store.dispatch('modifyAdid', {adid: res.data.adid})
        this.$store.dispatch('modifyUdid', {udid: res.data.udid})
        // 轮询请求用户信息
        this.reqUserInfoLoop()
      }).catch(error => {
        console.log('error', error)
      })
    },
    // 轮询请求 userInfo
    reqUserInfoLoop () {
      this.reqUserInfo().then(res => {
        // console.log('res', res)
        // 保存sessionId
        this.$store.dispatch('modifyName', {name: res.data.name})
        this.$store.dispatch('modifyAvatar', {avatar: res.data.avatar})
        this.$router.push({
          path: '/'
        })
        // 路由已经跳走了，所以不用清除setTimeout.
      }).catch((error) => {
        if (this.reqTime < 30) {
          setTimeout(() => {
            this.reqUserInfoLoop()
          }, 1000)
          this.reqTime++
        }
        console.log('error:', error)
      })
    },
    // 请求 userInfo
    reqUserInfo () {
      return instance({
        method: 'get',
        url: `/users/userInfo/${this.$store.getters.getUuid}`,
        body: 'uuid',
      })
    },
    // 选择登录方式
    selectLoginMethod (meth) {
      this.loginMethod = meth
      if (!this.hasRenderQR) {
        this.getQRData()
        this.hasRenderQR = true
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
  p
    font-size: 36px
    color: #333

  .buttons
    margin: 16px 0

    button
      width: 120px
      height: 40px
      padding: 8px
      margin: 0 10px
      border-radius: 8px
</style>
