<template>
  <div class="personCheck">
    <!-- <h2>基本样式</h2> -->
    <!-- <basicvue></basicvue> -->
    <!-- 营业执照图片 -->
    <h4>营业执照图片</h4>
    <img v-if="claim.businessLicenseData" :src="claim.businessLicenseData.picBase64" alt="">
    <!-- 组织名 -->
    <h4>组织名</h4>
    <p>
      <span class="key">组织名</span>
      <span class="value">{{claim.orgName}}</span>
    </p>
    <!-- ocrData -->
    <!-- <p>从营业执照上识别出的数据</p> -->
    <h4>从营业执照上识别出的数据</h4>
    <!-- <p v-if="claim.businessLicenseData" v-for="(item, key, index) in claim.businessLicenseData.ocrData.words_result || {}" :key="index">
      <span class="key">{{key}}</span>
      <span class="value">{{item.words || ''}}</span>
    </p> -->
    <p v-for="(item, key, index) in ocrData" :key="index">
      <span class="key">{{key}}</span>
      <span class="value">{{item.words || ''}}</span>
    </p>
    <!-- <p>{{ocrData}}</p> -->
    <!-- 银行信息 -->
    <h4>对公账号信息</h4>
    <p>
      <span class="key">申请者银行开户名字</span>
      <span class="value">{{claim.applicantBankAccountName}}</span>
    </p>
    <p>
      <span class="key">申请者银行账号</span>
      <span class="value">{{claim.applicantBankAccountNumber}}</span>
    </p>
    <p>
      <span class="key">申请者开户银行名字</span>
      <span class="value">{{claim.applicantBankName}}</span>
    </p>
    <p>
      <span class="key">接收方银行开户名字</span>
      <span class="value">{{claim.receiveBankAccountName}}</span>
    </p>
    <p>
      <span class="key">接收方银行银行账号</span>
      <span class="value">{{claim.receiveBankAccountNumber}}</span>
    </p>
    <p>
      <span class="key">接收方开户银行名字</span>
      <span class="value">{{claim.receiveBankName}}</span>
    </p>
    <p>
      <span class="key">金额</span>
      <span class="value">{{claim.verificationMoney}}</span>
    </p>
    <!-- 位置信息 -->
    <h4>位置信息</h4>
    <p v-if="claim.businessLicenseData">
      <span class="key">纬度</span>
      <span class="value">{{claim.businessLicenseData.addressInfo.latitude}}</span>
    </p>
    <p v-if="claim.businessLicenseData">
      <span class="key">经度</span>
      <span class="value">{{claim.businessLicenseData.addressInfo.longitude}}</span>
    </p>
    <p v-if="claim.businessLicenseData">
      <span class="key">拍照时间</span>
      <span class="value">{{claim.businessLicenseData.addressInfo.time}}</span>
    </p>
    <!-- 注释 -->
    <h4>对公账号信息</h4>
    <p>
      <span class="key">注释</span>
      <span class="value">{{claim['注释']}}</span>
    </p>
    <!-- 父did -->
    <h4>父did</h4>
    <p>
      <span class="key">父did是否签名</span>
      <span class="value">{{claim.isPdidCheck ? '是' : '否'}}</span>
    </p>
    <button class="bt" @click="check(true)">通过</button>
    <button class="bt" @click="check(false)">不通过</button>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
// import tokenSDKClient from 'token-sdk-client'
export default {
  props: {},
  data () {
    return {
      claim_sn: this.$route.query.claim_sn,
      // pic: '',
      claim: {}
      // orgName: claim.orgName
    }
  },
  computed: {
    ocrData: function () {
      // console.log(this)
      // console.log(value)
      // console.log(claim)
      if (this.claim.businessLicenseData) {
        let ocrData = JSON.parse(this.claim.businessLicenseData.ocrData)
        // words_result
        return ocrData.words_result
      } else {
        return ''
      }
    }
  },
  filters: {
    fOcr: (claim) => {
      let ocr = claim.ocrData.words_result
      for (let [key, value] in Object.entries(ocr)) {
        console.log(key, value)
      }
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
      instance({
        url: '/claim/pendingTask',
        methods: 'get',
        params: {
          claim_sn: this.claim_sn
        }
      }).then(response => {
        // console.log(response.data.data)
        if (response.data.result) {
          // console.log(JSON.stringify(response.data.data))
          this.claim = response.data.data
        }
      }).catch(error => {
        console.log(error)
      })
    },
    check (bool) {
      console.log('check', bool)
      instance({
        url: '/claim/personCheck',
        methods: 'post',
        data: {
          operator: bool
        }
      }).then((response) => {
        // console.log(response.data)
        if (response.data.result) {
          this.$router.go(-1)
        } else {
          alert('出错了')
        }
      }).catch(error => {
        alert('失败')
        console.log(error)
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

  .personCheck

    .key
      width: 120px
      display: inline-block

    .value
      color: #000

    .bt
      margin: 10px
      padding: 5px
      width: 120px

</style>
