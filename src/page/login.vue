<template>
  <div id="login">
    <!-- <h2>welcome to login page.</h2> -->
    <p>请选择登录方式</p>
    <section class="buttons">
      <button id="scan" @click="selectLoginMethod('scan')">扫码登录</button>
      <button id="udid" @click="selectLoginMethod('udid')">udid登录</button>
    </section>
    <section class="scanLogin" v-show="this.loginMethod === 'scan'">
      <canvas id="canvas" ref="qr"></canvas>
      <button id="simulateLogin" @click="simulateLogin">模拟登录</button>
    </section>
    <section v-show="this.loginMethod === 'udid'">
      <form action="#" class="formLogin" >
        <div class="item">
          <label for="phone" class="label">手机号</label>
          <input type="text" id="phone" name="phone" class="input" v-model="formData.phone">
        </div>
        <div class="item">
          <label for="checkCode" class="label">验证码</label>
          <input type="text" id="checkCode" name="checkCode" class="input" v-model="formData.checkCode">
          <button id="getCheckCode" @click="getCheckCode">获取验证码</button>
        </div>
        <div class="item">
          <button class="button" @click="getUdidList">获取did</button>
        </div>
        <div class="item">
          <label for="udid" class="label">udid</label>
          <select name="udid" id="udid"  class="select" v-model="formData.selectedUdid">
            <option v-for="(item, index) in this.formData.udidList" :key="index" :value="item.udid">{{item.title}} {{item.udid}}</option>
          </select>
        </div>
        <div class="item">
          <label for="idpwd" class="label">身份密码</label>
          <input type="password" id="idpwd" name="idpwd" class="input" v-model="formData.idpwd">
        </div>
        <div class="item">
          <button class="button" @click="getPvDataBox">获取pvdata</button>
        </div>
      </form>
      <p class="tip">登录时服务器需要您的这些数据：</p>
      <form action="#" class="authForm">
        <div class="item" v-for="(item, index) in formData.authUserInfoList" :key="index">
          <label :for="item" class="label">{{item}}</label>
          <input type="checkbox" :id="item" :name="item" class="checkbox" :value="item" v-model="formData.provideAuthUserInfoList">
        </div>
        <div class="item">
          <button class="button" @click="authUserInfo">授权使用</button>
        </div>
      </form>
    </section>
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
      this.getQRData()
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
      // instance.get(`/node/vcode/${this.formData.phone}`)
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
      instance({
        url: `/node/udidList`,
        method: 'get',
        params: {
          phone: this.formData.phone,
          checkCode: this.formData.checkCode
        }
      }).then(res => {
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
        tokenSDKClient.getKeyStore(this.formData.selectedUdid),
        // tokenSDKClient.getKeyStore('2345trew'),
        // tokenSDKClient.getPvData('2345trew')
        tokenSDKClient.getPvData(this.formData.selectedUdid)
        // instance({
        //   url: `/did/keystore/${this.formData.selectedUdid}`,
        //   method: 'get'
        // }),
        // instance({
        //   url: `/did/pvdata/${this.formData.selectedUdid}`,
        //   method: 'get'
        // })
      ]).then(([keyStoreCt, pvDataCt]) => {
        // 解密
        // 使用sm4、idpwd解密keyStoreCt
        let keyStore = tokenSDKClient.decryptKeyStore(keyStoreCt.data.data, this.formData.idpwd) // 在该方法中已经写死了key。
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
        // console.log('pvData', pvData)
        // 保存pvData
        // this.$store.dispatch('modifyPvData', {pvData: pvData}).then(() => {
        this.$store.dispatch('modifyPvData', {pvData: pvData}).then(() => {
          this.$store.dispatch('modifyHasPvData', {hasPvData: true})
          // // 渲染我的证书
          // this.opCertify(pvData.submitCertifies, true)
          // // 渲染我验证过的证书
          // this.opCertify(pvData.validatedCertifies, false)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    opCertify (certify, bool) {
      instance({
        url: `/claim/template/${certify.templateId}`,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        let desc = data.desc
        for (let key in data.data) {
          let str = '\\$' + key + '\\$'
          let reg = new RegExp(str, 'gm')
          desc = desc.replace(reg, data.data[key])
        }
        if (bool) {
          this.certifyData.title = data.title
          this.certifyData.content = desc
        } else {
          this.checkSignCertifyData.title = data.title
          this.checkSignCertifyData.content = desc
        }
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
    }
  },
  created () {},
  mounted () {
    this.init()
    // tokenSDKClient.test0()
    // let data = {
    //     "did": "did:ttm:u043829681e922731094502ebffdf1f10389c3ad11c8a67847c68f0482e608",
    //     "phone": "15652684614",
    //     "subDids": [{
    //         "did": "did:ttm:f08ae17a9f890e251f51d161c3d7e064a742714522c8a67847c68f0482a796",
    //         "idpwd": "111111",
    //         "relationDid": "did:ttm:a0_app_001_did",
    //         "type": "f"
    //     }],
    //     "version": "1588985429",
    //     "property": {
    //         "nickName": "tank",
    //         "avatar": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1718143317,3612074652&fm=26&gp=0.jpg"
    //     },
    //     "submitCertifies": [{
    //         "id": "a68c5fd6d964575b3d42bf959",
    //         "type": "validated",
    //         "templateId": "t001",
    //         "templateTitle": "荣誉证书",
    //         "hashCont": "dad9ae7815efe9800998ecf8427e8d74",
    //         "content": {
    //             "name": "abc",
    //             "age": "18"
    //         }
    //     }],
    //     "contacts": [{
    //             "name": "first",
    //             "phone": "18512345678"
    //         },
    //         {
    //             "name": "second",
    //             "phone": "18523456789"
    //         },
    //         {
    //             "name": "third",
    //             "phone": "18534567890"
    //         }
    //     ],
    //     "validatedCertifies": [{
    //         "id": "a68c5fd6d964575b3d42bf959",
    //         "type": "validated",
    //         "templateId": "t001",
    //         "templateTitle": "荣誉证书",
    //         "hashCont": "dad9ae7815efe9800998ecf8427e8d74",
    //         "content": {
    //             "name": "abc",
    //             "age": "18"
    //         }
    //     }]
    // }
    // let keyes = tokenSDKClient.sm2.genKeyPair('01837f014db7fc5acd914f53839bdb5dbf4cd80ecbbb7bf966ba9619f34b627a')
    // let dataStr = JSON.stringify(data)
    // console.log('dataStr', dataStr)
    // let ct = keyes.encrypt(dataStr)
    // console.log('ct', ct, `[${ct.join(', ')}]`)
    // let mt = keyes.decrypt(ct)
    // console.log('mt', mt)
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
    width: 360px

    .item
      width: 100%
      display: flex
      align-items: center
      margin-bottom: 10px

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

</style>
