<template>
  <div class="personCheck">
    <!-- <h2>基本样式</h2> -->
    <!-- <basicvue></basicvue> -->
    <!-- 营业执照图片 -->
    <h4>营业执照图片</h4>
    <img v-if="claim.businessLicenseData" :src="claim.businessLicenseData.ocrData.picBase64" alt="">
    <h4>ocr识别的营业执照信息</h4>
    <p>
      <span class="key">统一社会信用代码</span>
      <span class="value">{{ocrData.unifiedSocialCreditCode}}</span>
    </p>
    <p>
      <span class="key">组织名</span>
      <span class="value">{{ocrData.name}}</span>
    </p>
    <p>
      <span class="key">类型</span>
      <span class="value">{{ocrData.type}}</span>
    </p>
    <p>
      <span class="key">住所</span>
      <span class="value">{{ocrData.residence}}</span>
    </p>
    <p>
      <span class="key">法定代表人</span>
      <span class="value">{{ocrData.legalRepresentative}}</span>
    </p>
    <p>
      <span class="key">注册资本</span>
      <span class="value">{{ocrData.registeredCapital}}</span>
    </p>
    <p>
      <span class="key">成立日期</span>
      <span class="value">{{ocrData.dateOfEstablishment}}</span>
    </p>
    <p>
      <span class="key">营业期限</span>
      <span class="value">{{ocrData.operatingPeriod}}</span>
    </p>
    <p>
      <span class="key">经营范围</span>
      <span class="value">{{ocrData.businessScope}}</span>
    </p>
    <p>
      <span class="key">登记机关</span>
      <span class="value">{{ocrData.registrationAuthority}}</span>
    </p>
    <p>
      <span class="key">经度</span>
      <span class="value">{{ocrData.longitude}}</span>
    </p>
    <p>
      <span class="key">纬度</span>
      <span class="value">{{ocrData.latitude}}</span>
    </p>
    <p>
      <span class="key">申请银行账户名</span>
      <span class="value">{{ocrData.applicantBankAccountName}}</span>
    </p>
    <p>
      <span class="key">申请银行名</span>
      <span class="value">{{ocrData.applicantBankName}}</span>
    </p>
    <p>
      <span class="key">申请银行账号</span>
      <span class="value">{{ocrData.applicantBankAccountNumber}}</span>
    </p>
    <p>
      <span class="key">接收银行名</span>
      <span class="value">{{ocrData.receiveBankName}}</span>
    </p>
    <p>
      <span class="key">接收银行名</span>
      <span class="value">{{ocrData.receiveBankAccountName}}</span>
    </p>
    <p>
      <span class="key">接收银行账号</span>
      <span class="value">{{ocrData.receiveBankAccountNumber}}</span>
    </p>
    <p>
      <span class="key">查验金额</span>
      <span class="value">{{ocrData.verificationMoney}}</span>
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
        // let ocrData = JSON.parse(this.claim.businessLicenseData.ocrData)
        // words_result
        // return ocrData.words_result
        return this.claim.businessLicenseData.ocrData
      } else {
        return {}
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
        method: 'get',
        params: {
          claim_sn: this.claim_sn
        }
      }).then(response => {
        // console.log(response.data.data)
        if (response.data.result) {
          // console.log(JSON.stringify(response.data.data))
          // this.claim = response.data.data
        }
          this.claim = {
              "isPersonCheck": false,
              "isPdidCheck": false,
              "businessLicenseData": {
                  "applicantDid": "did:ttm:o085219a4ead4ff8ebdbad72bc99bbf9dc47cd2f9ae9800998ecf8427e4a13",
                  "applicantSuperDid": "did:ttm:u011b80743b5fa85ade3a5696eef660b2bae1ba4ba2b84938f26f024cf3fcd",
                  "claim_sn": "0x49ac373cca54410f4570540bb5925947bfd931bf5def21ee143774a924d55508",
                  "createTime": "1594864821000",
                  "ocrData": {
                      "unifiedSocialCreditCode": "91110108MA01BM825Q",
                      "name": "北京投肯科技有限公司",
                      "type": "其他有限责任公司",
                      "residence": "北京市海淀区永澄北路2号院1号楼B座三层30099-244号",
                      "legalRepresentative": "蔡明军",
                      "registeredCapital": "621.7722万元",
                      "dateOfEstablishment": "2018年04月23日",
                      "operatingPeriod": "2068年04月22日",
                      "businessScope": "数据处理旧(数据处理中的银行卡后不含立务承办展示活动组权文化艺术交流旧值在14以上的云计算数据中除外)(企业依法自主选择经营项目开展经营活动依法l须经批准的项目经相关部门批准后依批准的内容开展经营活动不得从事本市产业政策禁止和限制类项目的政管登记机关★在线扫码获取详细信息G提示每年1月1日至6月30日通过企业信用信息公示系统报送上一年度年度报告并公2018Goncocnacnanoaucuacn",
                      "picBase64": "",
                      "registrationAuthority": "北京市工商行政管理局",
                      "businessLicense": "0x3d60ae00b09686201e845632da3a40c818836e2eb8fdb70abe073b2772e3da24",
                      "longitude": "116.653648",
                      "latitude": "40.12218",
                      "applicantBankAccountName": "百度科技",
                      "applicantBankName": "北京银行",
                      "applicantBankAccountNumber": "6469494646",
                      "receiveBankName": "北京银行",
                      "receiveBankAccountName": "北京投肯科技",
                      "receiveBankAccountNumber": "88888888888888888888",
                      "verificationMoney": "0.13元"
                  }
              },
              "sign": "0x4b6db5053f63939cad904da1fbf8cc5c809f8477d6c3938c6048c3bf61ecd8b623c5d7a2f5402951f380f4b668d1dc1084b82ea7bfffa838e638fd992e1f2e6101",
              "temporaryId": "0x46e853ace00525ef45e8a150942f4d13825f79045718ed70c6313c01450596b7",
              "createTime": "1594957075312"
          }
      }).catch(error => {
        console.log(error)
      })
    },
    check (bool) {
      console.log('check', bool)
      instance({
        url: '/claim/personCheck',
        method: 'post',
        data: {
          operator: bool,
          claim_sn: this.claim_sn
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
