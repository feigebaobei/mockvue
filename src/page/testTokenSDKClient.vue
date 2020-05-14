<template>
  <div class="testTokenSDKClient">
    <h2>测试 tokenSDKClient</h2>
    <!-- <basicvue></basicvue> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
// import tokenSDKClient from 'token-sdk-client'
import instance from '@/lib/axiosInstance'

export default {
  props: {},
  data () {
    return {
      // keyStore: '{"privatekey":"01837f014db7fc5acd914f53839bdb5dbf4cd80ecbbb7bf966ba9619f34b627a"}',
      // test: {
      //   "did": "did:ttm:u043829681e922731094502ebffdf1f10389c3ad11c8a67847c68f0482e608",
      //   "phone": "15652684614",
      //   "subDids": [{
      //     "did": "did:ttm:f08ae17a9f890e251f51d161c3d7e064a742714522c8a67847c68f0482a796",
      //     "idpwd": "111111",
      //     "relationDid": "did:ttm:a0_app_001_did",
      //     "type": "f"
      //   }],
      //   "version": "1588985429",
      //   "property": {
      //     "nickName": "tank",
      //     "avatar": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1718143317,3612074652&fm=26&gp=0.jpg"
      //   },
      //   "submitCertifies": [{
      //     "id": "a68c5fd6d964575b3d42bf959",
      //     "type": "validated",
      //     "templateId": "t001",
      //     "templateTitle": "荣誉证书",
      //     "hashCont": "dad9ae7815efe9800998ecf8427e8d74",
      //     "content": {
      //       "name": "abc",
      //       "age": "18"
      //     }
      //   }],
      //   "contacts": [
      //     {
      //       name: 'first',
      //       phone: '18512345678'
      //     },
      //     {
      //       name: 'second',
      //       phone: '18523456789'
      //     },
      //     {
      //       name: 'third',
      //       phone: '18534567890'
      //     }
      //   ],
      //   "validatedCertifies": [{
      //     "id": "a68c5fd6d964575b3d42bf959",
      //     "type": "validated",
      //     "templateId": "t001",
      //     "templateTitle": "荣誉证书",
      //     "hashCont": "dad9ae7815efe9800998ecf8427e8d74",
      //     "content": {
      //       "name": "abc",
      //       "age": "18"
      //     }
      //   }]
      // }
    }
  },
  computed: {
    keyStore () {
      return this.$store.getters.getKeyStore
    },
    pvData () {
      return this.$store.getters.getPvData
    },
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      // this.getData()
      // tokenSDKClient.test1()
      // tokenSDKClient.test0()
      // tokenSDKClient.main()
      // console.log('end')
      // tokenSDKClient.test1()
      // instance({
      //   url: `/did/keystore/${this.test.did}`,
      //   method: 'get'
      // }).then(res => {
      //   console.log('res', res)
      //   let sm4 = new tokenSDKClient.sm4({
      //     key: 'JeF8U9wHFOMfs2Y8',
      //     mode: 'cbc', // default
      //     iv: 'UISwD9fW6cFh9SNS', // default is null
      //     cipherType: 'base64' // default is base64
      //   })
      //   // let ct = sm4.encrypt(this.keyStore)
      //   // console.log('ct', ct)
      //   let mt = sm4.decrypt(res.data.data)
      //   console.log('mt', mt)
      // }).catch(err => {
      //   console.log('err', err)
      // })
      instance({
        url: `/did/pvdata/${this.pvData.did}`,
        method: 'get'
      }).then(res => {
        console.log('res', res)
        
      }).catch(err => {
        console.log('err', err)
      })


      // let keyes = tokenSDKClient.sm2.genKeyPair(this.keyStore.privatekey)
      // console.log('keyes', keyes)
      // console.log('pvdata', this.test)
      // let ct = keyes.encrypt(JSON.stringify(this.test))
      // console.log('ct', ct, `[${ct.join(', ')}]`)
      // keyes.decrypt()



      // const sm4 = require('sm-crypto').sm4;
      // const key = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10];
      // let encryptData = tokenSDKClient.sm4.encrypt([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10], key); // 加密
      // console.log('encryptData', encryptData)
    },
    // getData () {}
  },
  created () {},
  mounted () {
     console.log(this)
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  // .testTokenSDKClient

</style>
