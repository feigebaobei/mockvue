<template>
  <div id="login">
    <p>本地登录方式</p>
    <section class="localFormBox">
      <form action="#" class="localForm">
        <div class="item">
          <label class="label" for="email">email</label>
          <input type="text" id="email" name="email" class="input" v-model="localFormData.email" placeholder="请输入email">
        </div>
        <div class="item">
          <label class="label" for="password">password</label>
          <input type="password" id="password" name="password" class="input" v-model="localFormData.password" placeholder="请输入password">
        </div>
        <div class="item">
          <button class="button submit" @click="submit">提交</button>
          <button class="button reset" @click="reset">重置</button>
        </div>
      </form>
    </section>
    <p>联合登录方式</p>
    <p>
      <span class="loginMethodItem" @click="tokenLogin">链信</span>
      <span class="loginMethodItem" @click="githubLogin">github</span>
      <span class="loginMethodItem" @click="githubLogin">微信</span>
      <span class="loginMethodItem" @click="githubLogin">新浪</span>
    </p>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import instance from '@/lib/axiosInstance'
import QRCode from 'qrcode'
import tokenSDKClient from 'token-sdk-client'

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
        udidList: [{
          title: '',
          udid: ''
        }],
        selectedUdid: '',
        idpwd: '',
        authUserInfoList: [], //['name', 'avatar']
        provideAuthUserInfoList: [],
      },
      localFormData: {
        email: '18515195415@163.com',
        password: '1234qwerA'
      },
      purposeUrl: this.$route.query.purposeUrl
    }
  },
  computed: {},
  components: {
    // HelloWorld
  },
  methods: {
    init () {
      // console.log(this)
      // this.getQRData()
    },
    // 请求qr data
    getQRData () {
      instance.get('/users/login/userInfo').then(res => {
        this.hasRenderQR = true
        this.formData.authUserInfoList = res.data.data.userInfoList
        // 渲染qr
        QRCode.toCanvas(this.$refs.qr, JSON.stringify(res.data), error => {
          if (error) {
            console.log('error', error)
          }
          // console.log('success')
        })
        // 保存 sessionId / adid
        // console.log('res', res)
        this.$store.commit('modifyUuid', {uuid: res.data.data.uuid})
        // this.$store.dispatch('modifyAdid', {adid: res.data.adid})
        // this.$store.dispatch('modifyUdid', {udid: res.data.udid})
        // 轮询请求用户信息
        // this.reqUserInfoLoop()
      }).catch(error => {
        console.log('error', error)
      })
    },
    // 轮询请求 userInfo
    reqUserInfoLoop () {
      this.reqUserInfo().then(res => {
        // console.log('res', res)
        // 保存sessionId
        this.$store.dispatch('modifyUserInfo', {userInfo: {
          nickName: res.data.data.nickName,
          avatar: res.data.data.avatar,
          udid: res.data.data.udid
        }})
        // this.$store.dispatch('modifyName', {nickName: res.data.data.nickName})
        // this.$store.dispatch('modifyAvatar', {avatar: res.data.data.avatar})
        // this.$store.dispatch('modifyUdid', {udid: res.data.data.udid})
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
        url: `/users/userInfo/${this.$store.getters.getUuid}`,
        method: 'get',
      })
    },
    // 选择登录方式
    selectLoginMethod (meth) {
      this.loginMethod = meth
      // if (!this.hasRenderQR) {
      //   this.getQRData()
      //   this.hasRenderQR = true
      // }
    },
    getCheckCode (event) {
      event.preventDefault()
      tokenSDKClient.getCheckCode(this.formData.phone)
      .then(res => {
        console.log(res)
        alert(`验证码是${res.data.data.checkCode}`)
      }).catch(error => {
        console.log(error)
      })
    },
    getUdidList (event) {
      event.preventDefault()
      // })
      tokenSDKClient.getDidList(this.formData.phone)
      .then(res => {
      // console.log(res)
        this.formData.udidList = res.data.data.udidList
        alert('已得到did')
      }).catch(error => {
        console.log(error)
      })
    },
    getPvDataBox (event) {
      event.preventDefault()
      Promise.all([
        tokenSDKClient.getDidttm(this.formData.selectedUdid),
        // tokenSDKClient.getDidttm('2345trew'),
        // tokenSDKClient.getPvData('2345trew')
        tokenSDKClient.getPvData(this.formData.selectedUdid)
      ]).then(([keyStoreCt, pvDataCt]) => {
        // 解密
        // 使用sm4、idpwd解密keyStoreCt
        let keyStore = tokenSDKClient.decryptDidttm(keyStoreCt.data.data, this.formData.idpwd) // 在该方法中已经写死了key。
        keyStore = JSON.parse(keyStore)
        // let keyStore = keyStoreCt.data.data
        // 保存keyStore
        this.$store.dispatch('modifyKeyStore', {keyStore: keyStore}).catch((err) => {
        // this.$store.dispatch('modifyKeyStore', {keyStore: keyStoreCt.data.data}).catch((err) => {
          console.log(err)
        })
        alert('已得到pvdata')
        // 解密
        // 使用sm2、私钥解密pvDataCt
        let pvData = tokenSDKClient.decryptPvData(pvDataCt.data.data, keyStore.privatekey)
        // let pvData = pvDataCt.data.data
        console.log('pvData', pvData)
        // 保存pvData
        // this.$store.dispatch('modifyPvData', {pvData: pvData}).then(() => {
        this.$store.dispatch('modifyPvData', {pvData: pvData}).then(() => {
          // console.log('pvData', pvData)
          this.$store.dispatch('modifyHasPvData', {hasPvData: true})
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    simulateLogin (event) {
      event.preventDefault()
      this.reqUserInfoLoop()
    },
    authUserInfo (event) {
      event.preventDefault()
      let pvData = this.$store.state.userInfo.pvData
      let paui = this.formData.provideAuthUserInfoList
      let data = {
          name: paui.includes('name') ? pvData.property.nickName : '',
          avatar: paui.includes('avatar') ? pvData.property.avatar : '',
          udid: paui.includes('udid') ? pvData.did : ''
        }
      // 数据结构需要修改
      instance({
        url: '/users/receive',
        method: 'post',
        data: data
      }).then((res) => {
        console.log(res)
        alert('已授权使用')
      }).catch(error => {
        console.log(error)
        alert(error.message)
      })
    },
    submit (event) {
      event.preventDefault()
      instance({
        url: '/users/login',
        method: 'post',
        data: {
          email: this.localFormData.email,
          password: this.localFormData.password
        },
        withCredential: true
      }).then(response => {
        // console.log(response.data)
        if (response.data.data) {
          if (this.purposeUrl) {
            this.$router.push({
              path: this.purposeUrl,
            })
          } else {
            this.$router.push({
              path: '/'
            })
          }
          sessionStorage.setItem('userInfo', JSON.stringify(response.data.data))
          this.$store.dispatch('modifyUserInfo', {userInfo: response.data.data})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    reset (event) {
      event.preventDefault()
      this.localFormData.email = ''
      this.localFormData.password = ''
    },
    testfn (event) {
      event.preventDefault()
      instance({
        url: '/users/test',
        method: 'post',
        data: {}
      }).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    testCookie (event) {
      event.preventDefault()
      instance({
        url: '/users/cookie',
        method: 'post',
        data: {}
      }).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    tokenLogin (event) {
      event.preventDefault()
      this.$router.push({
        path: '/tokenLogin'
      })
    },
    githubLogin (event) {
      event.preventDefault()
      alert('暂未开通')
      // this.$router.push({
      //   path: '/tokenLogin'
      // })
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

  #simulateLogin
    margin: 16px 0
    display: block
    width: 120px
    height: 40px
    padding: 8px
    margin: 0 10px
    border-radius: 8px

  .formLogin
  .authForm
  .localForm
    width: 360px

    .item
      width: 100%
      display: flex
      align-items: center
      margin-bottom: 10px
      justify-content: space-between

      .label
        margin-right: 6px

      .input
      .select
        flex-grow: 1
        height: 28px

      .button
        width: 100%
        height: 34px
        padding: 8px
        border-radius: 8px
        margin-bottom: 15px

      .submit
      .reset
        width: 46%

      #getCheckCode
        width: 120px
        padding: 8px
        margin: 0 10px
        border-radius: 8px

  .tip
    font-size: 22px
    margin-bottom: 0

  .authForm
    margin-bottom: 60px

    .item
      display: flex
      justify-content: space-between

      .checkbox
        width: 28px
        height: 28px

  .loginMethodItem
    margin: 5px 10px
    font-size: 28px
    cursor: pointer

</style>
