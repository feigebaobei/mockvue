<template>
  <div class="pvdata">
    <section class="logined" v-if="hasPvData">
      <p>这个页面一共有5个部分。</p>
      <h3 class="title">用户属性</h3>
      <section class="ui">
        <p v-for="(value, item, index) in pvData.property" :key="index" class="item">
          <span>{{item}}: </span>
          <img class="avatar" :src="pvData.property.avatar" alt="" v-if="item === 'avatar'">
          <span v-else>{{pvData.property[item]}}</span>
        </p>
      </section>
      <h3 class="title">证书（身份证书、通用证书）</h3>
      <section class="certifyItem">
        <h4 class="title">{{certifyData.title}}</h4>
        <p class="cont">{{certifyData.content}}</p>
        <section class="qrBox">
          <section class="item">
            <canvas id="signQrMy" ref="signQrMy"></canvas>
            <p>验证二维码</p>
          </section>
          <section class="item">
            <canvas id="checkQrMy" ref="checkQrMy"></canvas>
            <p>核验二维码</p>
          </section>
        </section>
        <p>签名列表</p>
        <p v-for="(item, index) in certifyData.signList" :key="index" class="signItem">
          <span class="title">{{item.title}}</span>
          <br>
          <span class="sign">{{JSON.stringify(item.sign)}}</span>
          <br>
          <span class="expireTime">过期时间：{{item.endtime}}</span>
        </p>
      </section>
      <h3 class="title">通讯录</h3>
      <section>
        <p v-for="(item, index) in pvData.contacts" :key="index">
          <span>{{item.name}}: </span>
          <span>{{item.phone}}</span>
        </p>
      </section>
      <h3 class="title">验证过的证书</h3>
      <section class="certifyItem">
        <h4 class="title">{{checkSignCertifyData.title}}</h4>
        <p class="cont">{{checkSignCertifyData.content}}</p>
        <section class="qrBox">
          <section class="item">
            <canvas id="signQrC" ref="signQrC"></canvas>
            <p>验证二维码</p>
          </section>
          <section class="item">
            <canvas id="checkQrC" ref="checkQrC"></canvas>
            <p>核验二维码</p>
          </section>
        </section>
        <p>签名列表</p>
        <p v-for="(item, index) in certifyData.signList" :key="index" class="signItem">
          <span class="title">{{item.title}}</span>
          <br>
          <span class="sign">{{JSON.stringify(item.sign)}}</span>
          <br>
          <span class="expireTime">{{item.expireTime}}</span>
        </p>
      </section>
      <button id="getPvDataBox" @click="getPvDataBox">刷新pvdata</button>
    </section>
    <section class="unlogined" v-else>
      <p>您没有拉取pvdata</p>
      <button id="gotoLogin" @click="gotoLogin">去登录页面，拉取pvdata</button>
    </section>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
import QRCode from 'qrcode'
import tokenSDKClient from 'token-sdk-client'

export default {
  props: {},
  data () {
    return {
      formData: {
        phone: '12345',
        checkCode: '2456',
        udidList: [{
          title: '',
          udid: ''
        }],
        selectedUdid: '',
        idpwd: ''
      },
      certifyData: {
        title: '',
        content: '',
        signList: []
      },
      checkSignCertifyData: {
        title: '',
        content: '',
        signList: []
      }
    }
  },
  computed: {
    hasPvData () {
      return this.$store.state.userInfo.hasPvData
    },
    pvData () {
      return this.$store.state.userInfo.pvData
    },
    keyStore () {
      return this.$store.getters.getKeyStore
    },
    // ui () {
    //   this.pvData.
    // }
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      if (this.pvData.submitCertifies) {
        this.opCertify(this.pvData.submitCertifies[0], true)
      }
      if (this.pvData.validatedCertifies) {
        this.opCertify(this.pvData.validatedCertifies[0], false)
      }
    },
    gotoLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    // 请求私密数据
    getPvDataBox (event) {
      if (event) {
        event.preventDefault()
      }
      tokenSDKClient.getPvData(this.pvData.did).then(res => {
        let pvData = tokenSDKClient.decryptPvData(res.data.data, this.keyStore.privatekey)
        return pvData
      }).then(res => {
        // console.log('res', res)
        this.$store.dispatch('modifyPvData', {pvData: res})
        this.init()
        // return res
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 渲染证书
    opCertify (certify, bool) {
      // console.log('certify', certify)
      // bool 是否是自己的证书
      // 请求证书模板
      instance({
        url: `/claim/template/${certify.id}`,
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
          // 核验二维码
          this.opQR('checkQrMy', certify.hashCont)
          // 验证二维码
          this.opQR('signQrMy', certify.id)
        } else {
          this.checkSignCertifyData.title = data.title
          this.checkSignCertifyData.content = desc
          // 核验二维码
          this.opQR('checkQrC', certify.hashCont)
          // 验证二维码
          this.opQR('signQrC', certify.id)
        }
      })
      // 请求证书签名列表
      instance({
        url: `/claim/fingerprint/${certify.id}`,
        method: 'get'
      }).then(res => {
        this.certifyData.signList = res.data.data.signList
      }).catch(err => {
        console.log(err)
      })
    },
    // 渲染二维码
    opQR (ref, data) {
      QRCode.toCanvas(this.$refs[`${ref}`], JSON.stringify(data), error => {
        if (error) {
          console.log('error', error)
        }
        // console.log('success')
      })
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  // .pvdata
  .certifyItem
    width: 420px
    background: #ddd
    padding: 15px

    .signItem
      word-break: break-word

    .title
      text-align: center

      .cont
        // width: 350px

    .qrBox
      display: flex
      justify-content: space-around

      .item
        p
          text-align: center

  .logined
    .ui
      .item
        display: flex
        align-items: center

  .avatar
    width: 100px

  #gotoLogin
  #getPvDataBox
    margin: 16px 0
    display: block
    width: 160px
    height: 40px
    padding: 8px
    // margin: 0 10px
    border-radius: 8px
</style>
