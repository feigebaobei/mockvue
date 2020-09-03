<template>
  <div class="personCheck">
    <!-- <h2>基本样式</h2> -->
    <!-- <basicvue></basicvue> -->
    <!-- 营业执照图片 -->
    <div v-if="claim.type === 'businessLicenseConfirm'">
      <!-- <p>w34rtrew</p> -->
      <h4>营业执照图片</h4>
      <!-- <img v-if="claim.businessLicenseData" :src="claim.businessLicenseData.ocrData.picBase64" alt=""> -->
      <img v-if="businessLicense" :src="businessLicense" alt="">
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
    </div>
    <!-- <div class="canvasBox">
      <canvas id="canvas" ref="qr"></canvas>
    </div> -->
    <!-- <div v-if="claim.isPersonCheck === null"> -->
    <div v-if="!claim.auditor">
      <button class="bt" @click="check(true)">通过</button>
      <button class="bt" @click="check(false)">不通过</button>
    </div>
    <div v-else>
      <!-- <p>{{opResult(claim.auditor)}}</p> -->
      <p>{{claim.auditor}} 已处理</p>
    </div>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
import proxyAxios from '@/lib/proxyAxios'
import tokenSDKClient from 'token-sdk-client'
// import QRCode from 'qrcode'
export default {
  props: {},
  data () {
    return {
      claim_sn: this.$route.query.claim_sn,
      // pic: '',
      claim: {},
      businessLicense: '',
      // orgName: claim.orgName
    }
  },
  computed: {
    ocrData: function () {
      // console.log(this)
      // console.log(value)
      // console.log(claim)
      if (this.claim.msgObj.content.businessLicenseData) {
        // let ocrData = JSON.parse(this.claim.businessLicenseData.ocrData)
        // words_result
        // return ocrData.words_result
        return this.claim.msgObj.content.businessLicenseData.ocrData
      } else {
        return {}
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
        if (response.data.result) {
          this.claim = response.data.data
          this.getBusinessLicense(this.claim.msgObj.content.businessLicenseData.ocrData.businessLicense)
          // this.renderQr(tokenSDKClient.genAuthQrStr([], 'N', '', '审核证书', new Date().getTime() + 5 * 60 * 1000))
          // this.renderQr()
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    getBusinessLicense (key) {
      proxyAxios({
        url: '/getBackupData',
        method: 'get',
        params: {
          key: key
        }
      }).then(response => {
        if (!response.data.data.result) {
          return Promise.reject(new Error(response.data.data.error))
        } else {
          return response.data.data.result.data
        }
      })
      .then(picCt => {
        let oriStr = `${this.claim.msgObj.content.businessLicenseData.applicantDid}${this.claim.msgObj.content.businessLicenseData.templateId}${this.claim.msgObj.content.businessLicenseData.createTime}`
        let key = tokenSDKClient.hashKeccak256(oriStr)
        let picMt = tokenSDKClient.decryptPic(picCt, key)
        this.businessLicense = 'data:image/png;base64,' + picMt
      })
      .catch(error => {
        console.log(error)
      })
    },
    check (bool) {
      // console.log('check', bool)
      instance({
        url: '/claim/personCheck',
        method: 'post',
        data: {
          opResult: bool,
          claim_sn: this.claim_sn
          // auditor: 'did:ttm:u01234b27c8e5160a907b1373f083af3d2eb64fd8ee9800998ecf8427eab11'
        }
      }).then((response) => {
        alert(response.data.message ? response.data.message : '请审核员在链信宝app上确认操作。')
      })
      .catch(error => {
        if (error.response.status === 401) {
          alert(response.data.message ? response.data.message : '没有权限')
        }
        else {
          alert('操作失败')
        }
      })
    },
    getType (type) {
      let resType = ''
      switch(type) {
        case 'businessLicenseConfirm':
          resType = '营业执照'
          break
        default:
          resType = ''
          break
      }
      return resType
    },
    // opResult (auditor) {
    //   // if (result === null) {
    //   //   return '未处理'
    //   // } else if (result) {
    //   //   return '已通过'
    //   // } else {
    //   //   return '未通过'
    //   // }
    //   return
    // },
    // renderQr () {
    //   instance({
    //     url: '/audit',
    //     method: 'get',
    //     params: {
    //       claim_sn: this.claim_sn
    //     }
    //   }).then(response => {
    //     let qrStr = response.data.data
    //     // console.log(JSON.parse(response.data.data))
    //     QRCode.toCanvas(this.$refs.qr, qrStr, error => {
    //       if (error) {
    //         console.log(error)
    //       }
    //     })
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // }
  },
  created () {},
  mounted () {
    this.init()
    // this.$router.push({
    //   path: '/login'
    // })
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
