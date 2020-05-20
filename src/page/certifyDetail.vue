<template>
  <div class="certifyDetail">
    <!-- 证书视图 -->
    <section class="certifyBox">
      <h2 class="title">{{certify.title}}</h2>
      <p>{{certify.cont}}</p>
      <p class="center">{{certify.hashValue}}</p>
      <canvas id="canvas" ref="qr"></canvas>
      <section class="signBox" v-for="(item, index) in certify.signList" :key="index">
        <h4 v-if="index === 0">申明者: {{item.name}} &nbsp;&nbsp;&nbsp;&nbsp; 状态 {{item.status}}</h4>
        <h4 v-else>签发者: {{item.name}} &nbsp;&nbsp;&nbsp;&nbsp; 状态 {{item.status}}</h4>
        <p><span class="key">DID: </span><span class="value">{{item.did}}</span></p>
        <p><span class="key">签名数据: </span><span class="value">{{item.sign}}</span></p>
        <p><span class="key">过期时间: </span><span class="value">{{item.expire}}</span></p>
      </section>
    </section>
    <!-- 签名列表 -->
    <section class="btBox">
      <button class="button" @click="gotoCertifySign">找人签发</button>
      <button class="button" @click="gotoCertifyCheck">去查验</button>
      <button class="button" @click="cancel">取消</button>
    </section>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import QRCode from 'qrcode'
import tokenSDKClient from 'token-sdk-client'
export default {
  props: {},
  data () {
    return {
      templateId: this.$route.query.templateId,
      certify:{
        title: '',
        cont: '',
        hashValue: '',
        signList: [
          // {
          //   name: '',
          //   did: '',
          //   sign: '',
          //   expire: ''
          // }
        ]
      }
    }
  },
  computed: {
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      this.getCertifyTemplat()
    },
    getCertifyTemplat () {
      tokenSDKClient.getTemplate(this.templateId).then(res => {
        let {title, desc, id} = res.data.data
        id = '12345fd6d964575b3d42bf959' // 在测试是才写死
        this.certify.title = title
        let claim_sn = ''
        let certifyData = this.$store.getters.getPvData.manageCertifies.filter((item) => {
          if (item.claim_sn === id) {
            claim_sn = item.claim_sn
            return true
          } else {
            return false
          }
        })[0].data || {}
        for (let [key, value] of Object.entries(certifyData)) {
          let reg = new RegExp(`\\$${key}\\$`, 'gm')
          desc = desc.replace(reg, value)
        }
        this.certify.cont = desc
        // this.getCertifyFingerPrint(claim_sn, did, certifyData)
        this.getCertifyFingerPrint(claim_sn)
      }).catch(err => {
        console.log('err', err)
      })
    },
    getCertifyFingerPrint (claim_sn) {
      tokenSDKClient.getCertifyFingerPrint(claim_sn).then(res => {
        this.certify.hashValue = res.data.data.hashCont || 'none hash value.'
        // let url = `${window.location.origin}/?claim_sn=${claim_sn}&did=${did}&${JSON.stringify(certifyData)}`
        // console.log(url)
        let url = this.certify.hashValue
        // 渲染qr
        QRCode.toCanvas(this.$refs.qr, url, error => {
          if (error) {
            console.log('error', error)
          }
          // console.log('success')
        })
        this.certify.signList = res.data.data.signList.map((item) => {
          let date = new Date(Number(item.endtime))
          console.log(date)
          let [y, m, d, h, mm, s] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
          console.log(y,m,d)
          return {
            did: item.byDid,
            expire: `${y}年${m+1}月${d}日 ${h}:${mm}:${s}`,
            sign: JSON.stringify(item.sign),
            name: item.name,
            status: item.status
          }
        })
      }).catch(err => {
        console.log('err', err)
      })
    },
    gotoCertifySign () {
      this.$router.push({
        path: '/certifySign'
      })
    },
    gotoCertifyCheck () {
      this.$router.push({
        path: '/certifyCheck'
      })
    },
    cancel () {
    },
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .certifyDetail
    .certifyBox
      display: flex
      justify-content: center
      flex-wrap: wrap

      .title
        text-align: center
      .center
        text-align: center
        flex-basis: 100%

      .signBox
        background: #ddd
        margin-bottom: 6px
        word-break: break-all
        padding: 6px

        h4
        p
          margin: 0
          display: flex

        .key
          flex-basis: 80px
          flex-grow: 0
          flex-shrink: 0

        .value
          flex-grow: 1

</style>
