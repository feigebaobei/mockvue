<template>
  <div class="certifyDetail">
    <!-- 证书视图 -->
    <section class="certifyBox" :style="{background: `url(${certify.background})`}">
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
      <button class="button" @click="showModel">去查验</button>
      <button class="button" @click="cancel">取消</button>
    </section>
    <!-- model -->
    <section class="selectModel" v-show="selectModel.show" @click.self="closeModel">
      <section class="cont">
        <h2>请选择需要哈希的值：</h2>
        <form action="#">
          <div class="item" v-for="(item, index) in selectModel.certifyDataItem" :key="index">
            <label for="" class="label">{{item}}</label>
            <input type="checkbox" :value="item" v-model="selectModel.hashDataItem">
          </div>
          <div class="item">
            <label for="" class="label">有效期至</label>
            <input type="date" v-model="selectModel.expireStr">
          </div>
          <div class="item">
            <label for="" class="label">用途</label>
            <input type="text" v-model="selectModel.purpose">
          </div>
          <div class="item">
            <button class="button" @click="gotoCertifyCheck">确定</button>
          </div>
        </form>
      </section>
    </section>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import QRCode from 'qrcode'
import tokenSDKClient from 'token-sdk-client'
// import utils from '@/lib/utils'
export default {
  props: {},
  data () {
    return {
      templateId: this.$route.query.templateId,
      certify:{
        title: '',
        cont: '',
        data: {},
        hashValue: '',
        claim_sn: this.$route.query.claim_sn,
        signList: [
          // {
          //   name: '',
          //   did: '',
          //   sign: '',
          //   expire: ''
          // }
        ],
        background: ''
      },
      selectModel: {
        show: false,
        certifyDataItem: [],
        hashDataItem: [],
        expireStr: '',
        // expire: '',
        purpose: ''
      }
    }
  },
  computed: {
    pvData () {
      return this.$store.getters.getPvData
    }
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      // this.certify.claim_sn = '12345fd6d964575b3d42bf959' // 在测试是才写死
      this.getCertifyTemplat()
      this.opModel()
    },
    getCertifyTemplat () {
      tokenSDKClient.getTemplate(this.templateId).then(res => {
        let {title, desc, background} = res.data.data
        this.certify.title = title
        this.certify.cont = desc
        let certifyData = this.$store.getters.getPvData.manageCertifies.filter((item) => item.claim_sn === this.certify.claim_sn)[0].data || {}
        // console.log('certifyData', certifyData, certifyData.gender, certifyData.identify)
        // this.certify.data = certifyData // 这样会浅复制
        this.certify.data = JSON.parse(JSON.stringify(certifyData)) // 这样避免浅复制
        for (let [key, value] of Object.entries(this.certify.data)) {
          let reg = new RegExp(`\\$${key}\\$`, 'gm')
          this.certify.cont = this.certify.cont.replace(reg, value)
        }
        this.getCertifyFingerPrint()
        this.certify.background = background
      }).catch(err => {
        console.log('err', err)
      })
    },
    getCertifyFingerPrint () {
      tokenSDKClient.getCertifyFingerPrint(this.certify.claim_sn).then(res => {
        this.certify.hashValue = res.data.data.hashCont || 'none hash value.'
        // let url = `${window.location.origin}/?claim_sn=${claim_sn}&did=${did}&${JSON.stringify(certifyData)}`
        // console.log(url)
        let url = this.certify.hashValue
        // 渲染qr
        QRCode.toCanvas(this.$refs.qr, url, error => {
          if (error) {
            console.log('error', error)
          }
        })
        this.certify.signList = res.data.data.signList.map((item) => {
          let date = new Date(Number(item.endtime))
          let [y, m, d, h, mm, s] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
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
    gotoCertifyCheck (event) {
      event.preventDefault()
      for (let element of this.selectModel.hashDataItem) {
        this.certify.data[element] = new tokenSDKClient.sm3().sum(this.certify.data[element])
      }
      let expire = new Date()
      let [y, m, d] = this.selectModel.expireStr.split(/[，,/-\s\\]/)
      expire.setFullYear(y)
      expire.setMonth(m - 1)
      expire.setDate(d)
      expire.setHours(0)
      expire.setMinutes(0)
      expire.setSeconds(0)
      expire.setMilliseconds(0)
      expire = expire.getTime()
      tokenSDKClient.saveCertifyData(this.certify.claim_sn, this.templateId, this.certify.data, expire, this.selectModel.purpose).then(res => {
        console.log('res', res)
        this.$router.push({
          path: '/certifyCheck',
          // path: '/',
          query: {
            temporaryID: res.data.data.temporaryID
          }
        })
      }).catch(err => {
        console.log('err', err)
      })
    },
    cancel () {
      tokenSDKClient.cancelCertify(this.certify.claim_sn, this.$store.getters.getPvData.did, this.certify.hashValue, new Date().getTime(), this.$store.getters.getKeyStore.privatekey).then(() => {
        alert('已经取消证书')
      }).catch(err => {
        console.log('err', err)
      })
    },
    showModel () {
      this.selectModel.show = true
    },
    closeModel () {
      this.selectModel.show = false
    },
    opModel () {
      let certify = this.$store.getters.getPvData.manageCertifies.filter((item) => item.claim_sn === this.certify.claim_sn)[0] || {}
      for (let [key] of Object.entries(certify.data)) {
        this.selectModel.certifyDataItem.push(key)
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

  .certifyDetail
    .certifyBox
      display: flex
      justify-content: center
      flex-wrap: wrap
      border: 2px solid #ddd
      margin: 20px 0
      padding: 16px

      .title
        text-align: center
      .center
        text-align: center
        flex-basis: 100%

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

    .selectModel
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      background: rgba(0, 0, 0, .2)
      display: flex
      justify-content: center
      align-items: center

      .cont
        background: #fff
        width: 600px
        padding: 20px
        .item
          display: flex
          margin-bottom: 6px

          .label
            width: 100px

</style>
