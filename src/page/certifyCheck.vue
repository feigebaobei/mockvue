<template>
  <div class="cerifyCheck">
    <!-- 渲染证书 -->
    <section class="certifyBox" :style="{background: `url(${certify.background})`}">
      <h2 class="title">{{certify.title}}</h2>
      <p>{{certify.cont}}</p>
      <p class="center">{{certify.hashValue}}</p>
      <div class="barBox">
        <img src="" alt="" id="bar">
      </div>
    </section>
    <!-- 链上数据 -->
    <section class="chainData">
      <h2>链上数据</h2>
      <!-- 就是签名列表 -->
      <!-- <p v-for="(value, k, index) in chainData" :key="index">
        <span class="k">{{k}}</span>
        <span class="value">{{value}}</span>
      </p> -->
      <section class="signBox" v-for="(item, index) in certify.signList" :key="index">
        <h4 v-if="index === 0">申明者: {{item.name}} &nbsp;&nbsp;&nbsp;&nbsp; 状态 {{item.status}}</h4>
        <h4 v-else>签发者: {{item.name}} &nbsp;&nbsp;&nbsp;&nbsp; 状态 {{item.status}}</h4>
        <p><span class="key">DID: </span><span class="value">{{item.did}}</span></p>
        <p><span class="key">签名数据: </span><span class="value">{{item.sign}}</span></p>
        <p><span class="key">过期时间: </span><span class="value">{{item.expire}}</span></p>
      </section>
    </section>
    <!-- 查验说明 -->
    <section class="checkDescribe">
      <h2>核验原理及说明:</h2>
      <p>原理: 利用SM3密码散列函数,对于任何一个给定的消息，它都很容易就能运算出散列数值。一个已知的散列数值，难以去推算出原始的消息。对于两个不同的消息，散列数值不同。</p>
      <p>说明:证书核验采用对每个值求散列值,然后拼接起来对整体求散列值。声明证书的时候确保了证书的多重散列值准确无误的上链了,核验证书的时候只需计算证书本书的多重散列值和链上作对比即可。</p>
      <p>举例:多重散列值 = SM3(SM3(name)+SM3(age)+SM3(…))</p>
    </section>
    <!-- 结果 -->
    <section class="compareRes">
      <h2>比对结果：</h2>
      <p>链上的哈希值：</p>
      <p>{{certify.hashValue}}</p>
      <p>本地计算的哈希值：</p>
      <p>{{calcHashCont}}</p>
    </section>
    <!-- 计算比对 -->
    <button class="button" @click="cale">计算比对</button>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import tokenSDKClient from 'token-sdk-client'
import JsBarcode from 'jsbarcode'
export default {
  props: {},
  data () {
    return {
      templateId: this.$route.query.templateId,
      temporaryID: this.$route.query.temporaryID,
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
      chainData: {},
      calcHashCont: ''
    }
  },
  computed: {
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      if (this.certify.claim_sn && this.templateId) {
        this.getCertifyTemplat()
        this.getCertifyFingerPrint()
      } else {
        this.getTemporaryCertifyData()
      }
    },
    // 请求临时数据
    getTemporaryCertifyData () {
      tokenSDKClient.getTemporaryCertifyData(this.temporaryID).then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 请求模板
    getCertifyTemplat () {
      tokenSDKClient.getTemplate(this.templateId).then(res => {
        let {title, desc, background} = res.data.data
        this.certify.title = title
        this.certify.cont = desc
        // 从pvdata中取出证书数据嵌入到模板中。
        let certifyData = this.$store.getters.getPvData.manageCertifies.filter((item) => {
          return item.claim_sn === this.certify.claim_sn
        })[0].data || {}
        this.certify.data = JSON.parse(JSON.stringify(certifyData)) // 这样避免浅复制
        for (let [key, value] of Object.entries(this.certify.data)) {
          let reg = new RegExp(`\\$${key}\\$`, 'gm')
          // desc = desc.replace(reg, value)
          this.certify.cont = this.certify.cont.replace(reg, value)
        }
        this.certify.background = background
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 请求证书指纹
    getCertifyFingerPrint () {
      tokenSDKClient.getCertifyFingerPrint(this.certify.claim_sn).then(res => {
        this.certify.hashValue = res.data.data.hashCont || 'none hash value.'
        // 渲染barcode
        JsBarcode('#bar', this.certify.hashValue)
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
      }).catch((err) => {
        console.log('err', err)
      })
    },
    cale () {
      var sm3 = new tokenSDKClient.sm3()
      var digest = sm3.sum(this.certify.cont)
      // console.log(digest)
      // [233, 66, 140, 98, 38, 46, 230, 146, 17, 110, 103, 24, 130, 69, 210, 226, 102, 10, 185, 65, 73, 23, 68, 210, 78, 245, 19, 44, 117, 13, 65, 194]
      let str = this.bytesToStrHex(digest)
      // console.log(str)
      // e9428c62262ee692116e67188245d2e2660ab941491744d24ef5132c750d41c2
      this.calcHashCont = str
      alert(`${str === this.certify.hashValue ? '比对结果相同' : '比对结果不同'}`)
    },
    bytesToStrHex(arr) {
      var str = ''
      for (var i = 0; i < arr.length; i++) {
        var temp = parseInt(arr[i], 10).toString(16)
        if (temp.length < 2) {
          temp = '0' + temp
        }
        str += temp
      }
      return str
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .cerifyCheck
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

    .chainData
      display: flex
      flex-wrap: wrap

      p
        flex-basis: 100%
        margin: 5px 0
        display: flex
        word-break: break-all

        .k
          flex-basis: 100px
          flex-grow: 0
          flex-shrink: 0

        .value
          flex-grow: 0
          flex-shrink: 0
          flex-basis: 80%

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
