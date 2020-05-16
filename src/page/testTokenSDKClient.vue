<template>
  <div class="testTokenSDKClient">
    <h2>测试 tokenSDKClient</h2>
    <button @click="fn">click</button>
    <button @click="getDidList">getDidList</button>
    <!-- <basicvue></basicvue> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import tokenSDKClient from 'token-sdk-client'
// import api from '@/lib/axiosInstance'

export default {
  props: {},
  data () {
    return {
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
      // tokenSDKClient.getKeyStore('922731094502ebffdf1f10389608')
      // tokenSDKClient.getPvData('922731094502ebffdf1f10389608')
    },
    // getData () {}
    fn () {
      tokenSDKClient.test0()
    },
    getDidList () {
      console.log(tokenSDKClient.getDidList('123456543'))
      // tokenSDKClient.getDidList('123456543').then(res => {
      //   console.log('res', res)
      // }).catch(err => {
      //   console.log('err', err)
      // })
    }
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>

  // .testTokenSDKClient

</style>
