<template>
  <div class="certifyDetail">
    <!-- 证书视图 -->
    <section class="certifyBox" :style="{background: `url(${certify.background})`}">
      <h2 class="title">{{certify.title}}</h2>
      <p>{{certify.cont}}</p>
      <p class="center">{{certify.hashValue}}</p>
      <div class="barBox">
        <img src="" alt="" id="bar">
      </div>
      <!-- <canvas id="canvas" ref="qr" @click="gotoCertifyCheck"></canvas> -->
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
      <!-- <button class="button" @click="showModel">去查验</button> -->
      <button class="button" @click="showModel">输出海报</button>
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
            <button class="button" @click="gotoCertifyPoster">确定</button>
          </div>
        </form>
      </section>
    </section>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
// import QRCode from 'qrcode'
import tokenSDKClient from 'token-sdk-client'
// import JsBarcode from 'jsbarcode'
import XEClipboard from 'xe-clipboard'
import instance from '@/lib/axiosInstance'
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
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      this.getCertTempAndCertData()
    },
    getCertTempAndCertData () {
      Promise.all([this.getCertifyTemplat(), this.getCertifyData()]).then(([resTemplate, resCertifyData]) => {
        this.certify.title = resTemplate.data.data.title
        this.certify.cont = resTemplate.data.data.desc
        this.certify.background = resTemplate.data.data.background
        this.certify.data = resCertifyData.data.data.data
        for (let [key, value] of Object.entries(this.certify.data)) {
          let reg = new RegExp(`\\$${key}\\$`, 'gm')
          this.certify.cont = this.certify.cont.replace(reg, value)
        }
        this.getCertifyFingerPrint()
        this.opModel()
      })
    },
    getCertifyTemplat () {
      return tokenSDKClient.getTemplate(this.templateId)
    },
    getCertifyData () {
      return instance({
        url: '/claim/certifyData',
        method: 'get',
        params: {
          // claim_sn: this.certify.claim_sn
          claim_sn: '02b22a5e81e840176d9f381ec' // 为了走通逻辑所以写死值
        }
      })
    },
    getCertifyFingerPrint () {
      tokenSDKClient.getCertifyFingerPrint(this.certify.claim_sn).then(res => {
        this.certify.hashValue = res.data.data.hashCont || 'none hash value.'
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
        // this.renderQR()
      }).catch(err => {
        console.log('err', err)
      })
    },
    // renderQR () {
    //   let url = `${window.location.origin}?claim_sn=${this.certify.claim_sn}&templateId=${this.templateId}`
    //   // console.log(url)
    //   // let url = this.certify.hashValue
    //   // 渲染barcode
    //   JsBarcode('#bar', this.certify.hashValue)
    //   // 渲染qr
    //   QRCode.toCanvas(this.$refs.qr, url, error => {
    //     if (error) {
    //       console.log('error', error)
    //     }
    //   })
    // },
    // 进入证书签发页面
    gotoCertifySign () {
      let certifyData = {}
      for (let [key, value] of Object.entries(this.certify.data)) {
        certifyData[key] = {
          value: value,
          hasHash: false
        }
      }
      console.log(this.certify.claim_sn)
      instance({
        url: '/claim/certifySignURL',
        method: 'post',
        data: {
          // claim_sn: this.certify.claim_sn,
          claim_sn: '02b22a5e81e840176d9f381ec',
          // keqwertyhgfdsasdfbnbvds: '234tgfds'
          // templateId: this.templateId,
          // certifyData: this.certify.data // 证书数据应该在服务端从数据库中取得。
        }
      }).then(res => {
        let url = `${window.location.origin}`
        this.$router.mode === 'hash' ? url += '/#' : ''
        url += `/certifySign/?certifySignUuid=${res.data.data}`
        XEClipboard.copy(url)
        alert('已经复制签发页面的url。该url有效期为10min。')
        // 为了开发，所以进入签发页面。
        this.$router.push({
          path: '/server/certifySign',
          query: {
            certifySignUuid: `${res.data.data}`
          }
        })
      }).catch(err => {
        console.log('err', err)
      })
    },
    gotoCertifyCheck () {
      this.$router.push({
        path: '/server/certifyCheck',
        query: {
          claim_sn: this.certify.claim_sn,
          templateId: this.templateId
        }
      })
    },
    cancel () {
      instance({
        url: '/claim/cancel',
        method: 'post',
        data: {
          // claim_sn: this.certify.claim_sn,
          claim_sn: '02b22a5e81e840176d9f381ec'
          // 其它数据由服务端生成或得到。
        }
      }).then(() => {
        alert('取消成功')
      }).catch(() => {
        alert('取消失败')

      })
    },
    showModel () {
      this.selectModel.show = true
    },
    closeModel () {
      this.selectModel.show = false
    },
    opModel () {
      // let certify = this.$store.getters.getPvData.manageCertifies.filter((item) => item.claim_sn === this.certify.claim_sn)[0] || {}
      // for (let [key] of Object.entries(certify.data)) {
      for (let [key] of Object.entries(this.certify.data)) {
        this.selectModel.certifyDataItem.push(key)
      }
    },
    gotoCertifyPoster (event) {
      event.preventDefault()
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
      instance({
        url: '/claim/genPoster',
        method: 'post',
        data: {
          // claim_sn: this.certify.claim_sn
          claim_sn: '02b22a5e81e840176d9f381ec', // 为了走通逻辑所以写死值
          expire: expire,
          purpose: this.selectModel.purpose,
          hashDataItem: this.selectModel.hashDataItem
        }
      }).then(res => {
        console.log('res', res)
        this.$router.push({
          path: '/server/certifyPoster',
          query: {
            temporaryID: res.data.data.temporaryID
          }
        })
      }).catch(err => {
        console.log('err', err)
        alert('生成海报失败')
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
