<template>
  <div class="cerifyCheck">
    <!-- 渲染证书 -->
    <section class="certifyBox" :style="{background: `url(${certify.background})`}">
      <h2 class="title">{{certify.title}}</h2>
      <p>{{certify.cont}}</p>
      <p class="center">{{certify.hashValue}}</p>
    </section>
    <!-- 链上数据 -->
    <section class="chainData">
      <h2>链上数据</h2>
      <p v-for="(value, k, index) in chainData" :key="index">
        <span class="k">{{k}}</span>
        <span class="value">{{value}}</span>
      </p>
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
export default {
  props: {},
  data () {
    return {
      templateId: this.$route.query.templateId,
      certify:{
        title: '',
        cont: '',
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
      this.certify.claim_sn = '12345fd6d964575b3d42bf959' // 在测试是才写死
      this.getCertifyTemplat()
      this.getCertifyFingerPrint()
    },
    getCertifyTemplat () {
      tokenSDKClient.getTemplate(this.templateId).then(res => {
        let {title, desc, background} = res.data.data
        this.certify.title = title
        let certifyData = this.$store.getters.getPvData.manageCertifies.filter((item) => {
          return item.claim_sn === this.certify.claim_sn
        })[0].data || {}
        for (let [key, value] of Object.entries(certifyData)) {
          let reg = new RegExp(`\\$${key}\\$`, 'gm')
          desc = desc.replace(reg, value)
        }
        this.certify.cont = desc
        // this.getCertifyFingerPrint()
        this.certify.background = background
      }).catch(err => {
        console.log('err', err)
      })
    },
    getCertifyFingerPrint () {
      tokenSDKClient.getCertifyFingerPrint(this.certify.claim_sn).then(res => {
      //   // let {} = res.data.data
        this.certify.hashValue = res.data.data.hashCont || 'none hash value.'
        for (let [key, value] of Object.entries(res.data.data)) {
          // this.chainData[key] = JSON.stringify(value)
          this.chainData[key] = value
        }
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

</style>
