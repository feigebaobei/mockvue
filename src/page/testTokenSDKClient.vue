<template>
  <div class="testTokenSDKClient">
    <h2>测试 tokenSDKClient</h2>
    <!-- <basicvue></basicvue> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import tokenSDKClient from 'token-sdk-client'

export default {
  props: {},
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
    //   this.getData()
    // tokenSDKClient.test1()
    // tokenSDKClient.test0()
    tokenSDKClient.main()
    // console.log('end')
    // tokenSDKClient.test1()
    },
    // getData () {}
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
