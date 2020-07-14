<template>
  <div class="testTokenSDKClient">
    <h2>测试 tokenSDKClient</h2>
    <p>client</p>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import tokenSDKClient from 'token-sdk-client'
// import tokenSDKServer from 'token-sdk-server'
// import {Base64} from 'js-base64'
// import api from '@/lib/axiosInstance'
import photo from '@/data/business_license.jpeg'
// import idCardFront from '@/data/idCardFront.jpeg'
// import half from '@/data/half.png'
// import small from '@/data/small.png'

export default {
  props: {},
  data () {
    return {
      priStr: '4d8126a957af5a3fbfc3e5125dafcc72fab20a15ee71174a21e37ce88b7d0124',
      hashStr: '1234561234567890abcdef',
      photo: photo
    }
  },
  computed: {
    // keyStore () {
    //   return this.$store.getters.getKeyStore
    // },
    // pvData () {
    //   return this.$store.getters.getPvData
    // },
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      this.test()
      this.getBase64Image()
    },
    // getData () {},
    test () {
      let keys = tokenSDKClient.sm2.genKeyPair(this.priStr)
      console.log('keys', keys)
      var ct = keys.encrypt(this.hashStr)
      console.log('ct', ct, tokenSDKClient.utils.arrToStrHex(ct))
      ct = '8e67359679aa3be7bcd6edf85674eb818a590c2dbda2445acbb85324871a2ca9ad29d191a6a6a21d929d6d99e1bb158be758bf9c2334b2dc045ef6e100b1694b3714649d56ae272df6eb61d6663779cd075991f64480613163cf68f0b9d5144d3a0a8db607e16392dff420'
      let mt = keys.decrypt(ct)
      console.log('mt', mt)
      let signData = keys.signSha512(this.hashStr)
      console.log('signData', signData)
      let isok = keys.verify512(this.hashStr, signData.r, signData.s)
      console.log('isok', isok)
    },
    getBase64Image() {
      // var base64 = ''
      var img = new Image()
      img.src = this.photo
      img.onload = () => {
        let canvas = document.createElement('canvas')
        // let img = this.photo
        canvas.width = img.width
        canvas.height = img.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height)
        var dataURL = canvas.toDataURL('image/png')
        console.log(dataURL)
      }
    }

  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  // .testTokenSDKClient

</style>
