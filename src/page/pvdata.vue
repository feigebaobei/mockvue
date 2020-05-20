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
      <!-- <h3 class="title">证书（身份证书、通用证书）</h3> -->
      <h3 class="title">验证过的证书 通用证书</h3>
      <!-- <section class="certifyItem">
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
      </section> -->
      <section class="certifyBox">
        <section class="certifyItem" v-for="(item, index) in pvData.manageCertifies" :key="index" @click="gotoCertifyDetail(item.templateId, item.claim_sn)">
          <div class="left">
            <h4 class="title">{{item.templateTitle}}</h4>
            <p>{{item.claim_sn}}</p>
          </div>
          <img :src="arrows" alt="" class="right">
        </section>
      </section>
      <h3 class="title">通讯录</h3>
      <section>
        <p v-for="(item, index) in pvData.contacts" :key="index">
          <span>{{item.name}}: </span>
          <span>{{item.phone}}</span>
        </p>
      </section>
      <!-- <h3 class="title">验证过的证书</h3> -->
      <h3 class="title">身份证书</h3>
      <section class="certifyBox">
        <section class="certifyItem" v-for="(item, index) in pvData.identityCertifies" :key="index" @click="gotoCertifyDetail(item.templateId, item.claim_sn)">
          <div class="left">
            <h4 class="title">{{item.templateTitle}}</h4>
            <p>{{item.claim_sn}}</p>
          </div>
          <img :src="arrows" alt="" class="right">
        </section>
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
// import instance from '@/lib/axiosInstance'
// import QRCode from 'qrcode'
import tokenSDKClient from 'token-sdk-client'
import arrows from '@/lib/images/arrows.png'

export default {
  props: {},
  data () {
    return {
      arrows: arrows,
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
      },
      // manageCertifies: [],
      pvData: this.$store.state.userInfo.pvData,
    }
  },
  computed: {
    hasPvData () {
      return this.$store.state.userInfo.hasPvData
    },
    // pvData () {
    //   let temp = this.$store.state.userInfo.pvData
    //   // this.manageCertifies = temp.manageCertifies
    //   return temp
    // },
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
    // init () {
    // },
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
        this.$store.dispatch('modifyPvData', {pvData: res})
        // this.init()
      }).catch(err => {
        console.log('err', err)
      })
    },
    opCont (desc, data) {
      for (let [key, value] of Object.entries(data)) {
        let reg = new RegExp(`\\$${key}\\$`, 'gm')
        desc = desc.replace(reg, value)
      }
      return desc
    },
    gotoCertifyDetail (templateId, claim_sn) {
      this.$router.push({
        path: '/certifyDetail',
        query: {
          templateId: templateId,
          claim_sn: claim_sn
        }
      })
    }
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>

    .signItem
      word-break: break-word

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

  .certifyBox
    .certifyItem
      display: flex
      justify-content: space-around
      width: 420px
      padding: 15px
      background: #f1f1f1
      margin: 0 0 6px 0

      .left
        flex-grow: 1
      .right
        flex-grow: 0
</style>
