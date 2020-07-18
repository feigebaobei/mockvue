<template>
  <div class="toSignCertify">
    <h2>待签发证书</h2>
    <p v-for="(item, key, index) in certifyList" :key="index" class="item" @click="gotoCertifySign(key)">
      <!-- <span>{{key}}</span>
      <span>{{index}}</span>
      <span>{{item}}</span> -->
      <!-- <span>{{item}}</span> -->
      <span>{{item.businessLicenseData.ocrData.name}}</span>
      <img :src="arrows" alt="">
    </p>
    <!-- <basicvue></basicvue> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
import arrows from '@/lib/images/arrows.png'
export default {
  props: {},
  data () {
    return {
      arrows: arrows,
      certifyList: {}
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
      instance({
        // url: '/claim/needSignCertify',
        url: '/claim/pendingTask',
        method: 'get'
      }).then(res => {
        this.certifyList = res.data.data
        // this.certifyList = {
        //     "0x49ac373cca54410f4570540bb5925947bfd931bf5def21ee143774a924d55508": {
        //     "isPersonCheck": false,
        //     "isPdidCheck": false,
        //     "businessLicenseData": {
        //         "applicantDid": "did:ttm:o085219a4ead4ff8ebdbad72bc99bbf9dc47cd2f9ae9800998ecf8427e4a13",
        //         "applicantSuperDid": "did:ttm:u011b80743b5fa85ade3a5696eef660b2bae1ba4ba2b84938f26f024cf3fcd",
        //         "claim_sn": "0x49ac373cca54410f4570540bb5925947bfd931bf5def21ee143774a924d55508",
        //         "createTime": "1594864821000",
        //         "ocrData": {
        //             "unifiedSocialCreditCode": "91110108MA01BM825Q",
        //             "name": "北京投肯科技有限公司",
        //             "type": "其他有限责任公司",
        //             "residence": "北京市海淀区永澄北路2号院1号楼B座三层30099-244号",
        //             "legalRepresentative": "蔡明军",
        //             "registeredCapital": "621.7722万元",
        //             "dateOfEstablishment": "2018年04月23日",
        //             "operatingPeriod": "2068年04月22日",
        //             "businessScope": "数据处理旧(数据处理中的银行卡后不含立务承办展示活动组权文化艺术交流旧值在14以上的云计算数据中除外)(企业依法自主选择经营项目开展经营活动依法l须经批准的项目经相关部门批准后依批准的内容开展经营活动不得从事本市产业政策禁止和限制类项目的政管登记机关★在线扫码获取详细信息G提示每年1月1日至6月30日通过企业信用信息公示系统报送上一年度年度报告并公2018Goncocnacnanoaucuacn",
        //             "registrationAuthority": "北京市工商行政管理局",
        //             "businessLicense": "0x3d60ae00b09686201e845632da3a40c818836e2eb8fdb70abe073b2772e3da24",
        //             "longitude": "116.653648",
        //             "latitude": "40.12218",
        //             "applicantBankAccountName": "百度科技",
        //             "applicantBankName": "北京银行",
        //             "applicantBankAccountNumber": "6469494646",
        //             "receiveBankName": "北京银行",
        //             "receiveBankAccountName": "北京投肯科技",
        //             "receiveBankAccountNumber": "88888888888888888888",
        //             "verificationMoney": "0.13元"
        //         }
        //     },
        //     "sign": "0x4b6db5053f63939cad904da1fbf8cc5c809f8477d6c3938c6048c3bf61ecd8b623c5d7a2f5402951f380f4b668d1dc1084b82ea7bfffa838e638fd992e1f2e6101",
        //     "temporaryId": "0x46e853ace00525ef45e8a150942f4d13825f79045718ed70c6313c01450596b7",
        //     "createTime": "1594957075312"
        // }}
      }).catch(err => {
        console.log(err)
      })
    },
    gotoCertifySign (claim_sn) {
      this.$router.push({
        path: '/server/personCheck',
        query: {
          claim_sn: claim_sn
        }
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

  .toSignCertify
    display: flex
    flex-wrap: wrap

    h2
      flex-basis: 100%
      flex-shrink: 0

    .item
      display: flex
      align-items: center
      background: #ddd
      flex-basis: 360px
      flex-grow: 0
      margin: 10px
      padding: 10px
      justify-content: space-between
      cursor: pointer

      img
        width: 30px
        height: 30px

</style>
