<template>
  <div class="cerifySign">
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
    <!-- 签发 -->
    <button class="button" @click="openModel">签发</button>
    <!-- 弹层 -->
    <section class="confirmModel" v-show="formData.show" @click.self="closeModel">
      <section class="cont">
        <p>您现在要签发该证书了。</p>
        <h2>请输入身份密码：</h2>
        <!-- <form action="#">
          <label for="password">身份官</label>
        </form> -->
        <input type="password" class="input" v-model="formData.idpwd">
        <button class="button" @click="signCertify">确定</button>
      </section>
    </section>
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
      // temporaryID: this.$route.query.temporaryID,
      certifySignUuid: this.$route.query.certifySignUuid,
      certify:{
        title: '',
        cont: '',
        desc: '',
        data: {},
        hashValue: '',
        claim_sn: '',
        templateId: '',
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
      calcHashCont: '',
      formData: {
        show: false,
        idpwd: ''
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
      this.getData()
    },
    getData () {
      tokenSDKClient.getCertifySignData(this.certifySignUuid).then(res => {
        this.certify.data = res.data.data.certifyData
        this.certify.claim_sn = res.data.data.claim_sn
        this.certify.templateId = res.data.data.templateId
        this.getCertifyTemplate()
        this.getCertifyFingerPrint()
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 请求模板
    getCertifyTemplate () {
      tokenSDKClient.getTemplate(this.templateId).then(res => {
        let {title, desc, background} = res.data.data
        this.certify.title = title
        this.certify.desc = desc
        this.certify.cont = desc
        for (let [key, {value, hasHash}] of Object.entries(this.certify.data)) {
          if (hasHash) {
            value = tokenSDKClient.bytesToStrHex(value)
          }
          this.certify.data[key] = {
            value: value,
            hasHash: hasHash
          }
          let reg = new RegExp(`\\$${key}\\$`, 'gm')
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
      let resStr = ''
      for (let [key, {value, hasHash}] of Object.entries(this.certify.data)) {
        let reg = new RegExp(`\\$${key}\\$`, 'gm')
        if (!hasHash) {
          value = new tokenSDKClient.sm3().sum(value)
        }
        value = tokenSDKClient.bytesToStrHex(value)
        resStr = this.certify.desc.replace(reg, value)
      }
      let digest = new tokenSDKClient.sm3().sum(resStr)
      let str = tokenSDKClient.bytesToStrHex(digest)
      this.calcHashCont = str
      alert(`${str === this.certify.hashValue ? '比对结果相同' : '比对结果不同'}`)
    },
    openModel () {
      this.formData.show = true
    },
    closeModel () {
      this.formData.show = false
    },
    // 签发证书
    signCertify () {
      // var r = confirm('是')
      // 是否可以解密
      tokenSDKClient.getDidttm(this.pvData.did).then(res => {
        return tokenSDKClient.decryptDidttm(res.data.data, this.$store.getters.getKeyStore.privatekey)
      }).then(bool => {
        if (bool) {
          let keys = tokenSDKClient.sm2.genKeyPair(this.$store.getters.getKeyStore.privatekey)
          let now = new Date().getTime()
          let sign = keys.signSha512(`the claimSN=${this.certify.claim_sn}and${this.certify.templateId}=${this.certify.hashValue}end at${now}validated by${this.pvData.did}`)
          tokenSDKClient.signCertify(this.pvData.did, this.certify.claim_sn, this.certify.templateId, this.certify.hashValue, now, sign).then(res => {
            // console.log('res', res)
            if (res.data.result) {
              alert('签发成功')
            } else {
              alert('签发失败')
            }
          }).catch(err => {
            alert('签发失败')
            console.log('err', err)
          })
        } else {
          alert('身份密码不正确')
        }
      })
      this.formData.idpwd = ''
      this.closeModel()
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .cerifySign
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

    .confirmModel
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

        .input
          height: 28px
          width: 360px
          margin-bottom: 20px

        .item
          display: flex
          margin-bottom: 6px

          .label
            width: 100px


</style>
