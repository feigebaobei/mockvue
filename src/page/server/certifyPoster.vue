<template>
  <div class="certifyPoster">
    <!-- 证书视图 -->
    <section class="certifyBox" :style="{background: `url(${certify.background})`}">
      <h2 class="title">{{certify.title}}</h2>
      <p>{{certify.cont}}</p>
      <p class="center">{{certify.hashValue}}</p>
      <div class="barBox">
        <img src="" alt="" id="bar">
      </div>
      <canvas id="canvas" ref="qr"></canvas>
      <p>用途：{{certify.purpose}}</p>
    </section>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import QRCode from 'qrcode'
import tokenSDKClient from 'token-sdk-client'
import JsBarcode from 'jsbarcode'
export default {
  props: {},
  data () {
    return {
      temporaryID: this.$route.query.temporaryID,
      certify: {
        claim_sn: '',
        templateId: '',
        title: '',
        desc: '',
        cont: '',
        data: {},
        expire: '',
        purpose: '',
        hashValue: '',
        background: ''
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
      this.getData()
    },
    getData () {
      tokenSDKClient.getTemporaryCertifyData(this.temporaryID).then(res => {
        let data = res.data.data
        this.certify.data = data.certifyData
        this.certify.claim_sn = data.claim_sn
        this.certify.expire = data.expire
        this.certify.purpose = data.purpose
        this.certify.templateId = data.templateId
        this.getCertifyTemplat()
        this.getCertifyFingerPrint()
      }).catch(err => {
        console.log('err', err)
      })
    },
    getCertifyTemplat () {
      tokenSDKClient.getTemplate(this.certify.templateId).then(res => {
        let {title, desc, background} = res.data.data
        this.certify.title = title
        this.certify.desc = desc
        this.certify.cont = desc
        for (let [key, {value, hasHash}] of Object.entries(this.certify.data)) {
          if (hasHash) {
            value = tokenSDKClient.bytesToStrHex(value)
          }
          let reg = new RegExp(`\\$${key}\\$`, 'gm')
          this.certify.cont = this.certify.cont.replace(reg, value)
        }
        this.certify.background = background
      }).catch(err => {
        console.log('err', err)
      })
    },
    getCertifyFingerPrint () {
      tokenSDKClient.getCertifyFingerPrint(this.certify.claim_sn).then(res => {
        this.certify.hashValue = res.data.data.hashCont || 'none hash value.'
        let url = `${window.location.origin}?claim_sn=${this.certify.claim_sn}&templateId=${this.certify.templateId}`
        // console.log('url', url)
        // 渲染barcode
        JsBarcode('#bar', this.certify.hashValue)
        // 渲染qr
        QRCode.toCanvas(this.$refs.qr, url)
      }).catch(err => {
        console.log('err', err)
      })
    },
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .certifyPoster
    .certifyBox
      display: flex
      justify-content: center
      flex-wrap: wrap
      border: 2px solid #ddd
      margin: 20px 0
      padding: 16px

      p
        flex-basis: 100%

      .title
        text-align: center
      .center
        text-align: center
        flex-basis: 100%

      .barBox
        flex-basis: 100%

        #bar
          display: block
          margin: 0 auto
      
      .signBox
        background: rgba(221, 221, 221, .3)
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
