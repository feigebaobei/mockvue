<template>
  <div class="pvdata">
    <p>服务端pvdata页面。这个页面一共有5个部分。</p>
    <h3 class="title">身份属性</h3>
    <p v-for="(item, index) in Object.keys(pvData.property)" :key="index">
      <span class="key">{{item}}: </span>
      <span class="value">{{pvData.property[item]}}</span>
    </p>
    <h3 class="title">身份证书</h3>
    <section class="certifyBox">
      <section class="certifyItem" v-for="(item, index) in pvData.manageCertifies" :key="index" @click="gotoCertifyDetail(item.templateId, item.claim_sn)">
        <div class="left">
          <h4 class="title">{{item.templateTitle}}</h4>
          <p>{{item.claim_sn}}</p>
        </div>
        <img :src="arrows" alt="" class="right">
      </section>
    </section>
    <h3 class="title">关联证书</h3>
    <p>您的关联证书里没有内容！</p>
    <h3 class="title">私有数据</h3>
    <p>您的私有数据里没有内容！</p>
    <h3 class="title">通讯录</h3>
    <p>您的通讯录里没有内容！</p>
      <!-- <section class="ui">
        <p v-for="(value, item, index) in pvData.property" :key="index" class="item">
          <span>{{item}}: </span>
          <img class="avatar" :src="pvData.property.avatar" alt="" v-if="item === 'avatar'">
          <span v-else>{{pvData.property[item]}}</span>
        </p>
      <h3 class="title">验证过的证书 通用证书</h3>
      <section class="certifyBox">
        <section class="certifyItem" v-for="(item, index) in pvData.manageCertifies" :key="index" @click="gotoCertifyDetail(item.templateId, item.claim_sn)">
          <div class="left">
            <h4 class="title">{{item.templateTitle}}</h4>
            <p>{{item.claim_sn}}</p>
          </div>
          <img :src="arrows" alt="" class="right">
        </section>
      </section>
      <h3 class="title">通讯录</h3>
      <section>
        <p v-for="(item, index) in pvData.contacts" :key="index">
          <span>{{item.name}}: </span>
          <span>{{item.phone}}</span>
        </p>
      </section>
      <h3 class="title">身份证书</h3>
      <section class="certifyBox">
        <section class="certifyItem" v-for="(item, index) in pvData.identityCertifies" :key="index" @click="gotoCertifyDetail(item.templateId, item.claim_sn)">
          <div class="left">
            <h4 class="title">{{item.templateTitle}}</h4>
            <p>{{item.claim_sn}}</p>
          </div>
          <img :src="arrows" alt="" class="right">
        </section>
      </section>
      <button id="getPvDataBox" @click="getPvDataBox">刷新pvdata</button>
    </section> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
// import QRCode from 'qrcode'
// import tokenSDKClient from 'token-sdk-client'
import arrows from '@/lib/images/arrows.png'

export default {
  props: {},
  data () {
    return {
      // did: 'did:ttm:u043829681e922731094502ebffdf1f10389c3ad11c8a67847c68f0482e608',
      arrows: arrows,
      // formData: {
      //   phone: '12345',
      //   checkCode: '2456',
      //   udidList: [{
      //     title: '',
      //     udid: ''
      //   }],
      //   selectedUdid: '',
      //   idpwd: ''
      // },
      // certifyData: {
      //   title: '',
      //   content: '',
      //   signList: []
      // },
      // checkSignCertifyData: {
      //   title: '',
      //   content: '',
      //   signList: []
      // },
      // // manageCertifies: [],
      // pvData: this.$store.state.userInfo.pvData,
      pvData: {
        contacts: [],
        did: '',
        identityCertifies: [],
        manageCertifies: [],
        property: {},
        relationDid: '',
        superDid: '',
        version: ''
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
      this.getPvData()
    },
    getPvData () {
      instance({
        url: '/private/pvdata',
        method: 'get',
        params: {
          did: 'a012349681e922731094502ebffdf1f10389c3ad11c8a67847c68f0482e608',
          method: 'get'
          // method: 'update'
        }
      }).then(res => {
        console.log('res', res)
        // this.pvData = res.data.data
        this.pvData.contacts = res.data.data.contacts
        this.pvData.did = res.data.data.did
        this.pvData.identityCertifies = res.data.data.identityCertifies
        this.pvData.manageCertifies = res.data.data.manageCertifies
        this.pvData.property = res.data.data.property
        this.pvData.relationDid = res.data.data.relationDid
        this.pvData.superDid = res.data.data.superDid
        this.pvData.version = res.data.data.version
      }).catch(err => {
        console.log('err', err)
      })
    }
    // opCont (desc, data) {
    //   for (let [key, value] of Object.entries(data)) {
    //     let reg = new RegExp(`\\$${key}\\$`, 'gm')
    //     desc = desc.replace(reg, value)
    //   }
    //   return desc
    // },
    // gotoCertifyDetail (templateId, claim_sn) {
    //   this.$router.push({
    //     path: '/certifyDetail',
    //     query: {
    //       templateId: templateId,
    //       claim_sn: claim_sn
    //     }
    //   })
    // }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

    .signItem
      word-break: break-word

      .cont
        // width: 350px

    .qrBox
      display: flex
      justify-content: space-around

      .item
        p
          text-align: center

  .logined
    .ui
      .item
        display: flex
        align-items: center

  .avatar
    width: 100px

  #getPvDataBox
    margin: 16px 0
    display: block
    width: 160px
    height: 40px
    padding: 8px
    // margin: 0 10px
    border-radius: 8px

  .certifyBox
    .certifyItem
      display: flex
      justify-content: space-around
      width: 420px
      padding: 15px
      background: #f1f1f1
      margin: 0 0 6px 0

      .left
        flex-grow: 1
      .right
        flex-grow: 0
</style>
