<template>
  <div id="index">
    <h2>welcome to index page.</h2>
    <!-- <p>content of this page.</p> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import tokenSDKClient from 'token-sdk-client'

export default {
  name: 'index',
  data () {
    return {
      // 按照少玉给的名称来命名
      fdid: '0113912ede808d2a31a7abb6e458193d54a066c5da7aebc380f81f54a177ca156ee3e75f093ed4161e2970c231d69ede3966c44240bc7eaf61aba7e9331e714e212d8e6f8590263e631a14c78917b0e9bcc028b4e9fc32a8cee975dcd2b38c8f23761da61d761d2ce62af15da532e0933d21fbc9eaac3869a013e76ce51b50b01d4a9cac0fcac7be679c0c03d53e1e0b7bdbc6e4c3ce9fb799205fb878e4d2e3b9ea9842927d2d646d13eaf48c304e03930ff37ec94647ea951a781e6f4ff24b3ed1ef998cc93f26c743f1641208d6a0773a6afc0458a901726f90d43f35930dc372b98b05d07f7d49817e7bd0f0b696',
      udid: '1afe4926b44c7cb2ffe427c0c21f2e98fed4bd8edefff7f8d150266d038379d1eca9117ca9e887c64a3db0a39cea6ec59e6a69b049e6f88c07b1d9514463365993b1faef361738e3aa896bf03fca7448a931f5da3d0da49962ba37d756422a039479f7fb01804890eed6cd309707c105e16d1214b7a2a0ec363bdc3ee77feb94cc02156808bae98f94d121d7a52625e0829ce9cdce07be8a3d9f4299cc48bc4df5fbaa4881a99f5fec9cae6fa0d1197a0978fcba3e5cd128690c5f223f87f1a2b80ecda56aa5ac534c44692be1398263431b9b9d03c6bc4b65f41f970f2f5265a4da8bb054d3f7c8c3062cfdb3a4be49423b75be0fb0fc7f3c3f19acad1c93bb3bffb7e349a55e11121ebbe41436a895672df0ce0ab886c4f89a3f644898a6a43675c2d5f1643ba03b54eef3a379bcca9af853524ea9dfe6453f063e047c2b1481c498d194054697f592f038065ebbbd787939368023f929cbb273cb61752c506143ce240c2d2188b2021ce7399c5c7d188c37d0a350034af166c59a35405d2f',
      keystore: 'd470329bd4d9377fa37444ffe1123db165fe05f088168468640aa17618930d46c2f00f227bae0208bb4872e826bd8c9cf917446d8feedacc8e7ad78bbc90877e8bb262ddfd1bc2ea482f14d89eb36a0523229aa5523b3ea5b8a3763ad65f541da3ff5798ed5a81d89c94da1d22ce4fabd87dbe795fb4037afec9eba4bc92c031',
      qxct: 'f6d10d352134f2fb70506bee3f552d9d2d30a2f43f79effd15365b57351c85d857545b93c0eddd53bc779ca19dd276bd20a683043e3f5ec18cd6221490602eaae99784e69a7c0f6ed7caf13cbd1dbb7c64a4e8db13d65f4d399e39a8236b5be326499eba5cf4ef419060037436290bb0'
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    init () {
      // tokenSDKClient.decryptPvData('f6d10d352134f2fb70506bee3f552d9d2d30a2f43f79effd15365b57351c85d857545b93c0eddd53bc779ca19dd276bd20a683043e3f5ec18cd6221490602eaae99784e69a7c0f6ed7caf13cbd1dbb7c64a4e8db13d65f4d399e39a8236b5be326499eba5cf4ef419060037436290bb0', '5090ffff751b0e1d2b6170d66b2e47a4fe74e91e15f3dfd5e6840361e1f7fca4') // 可以解密
      // let byte = 
      // tokenSDKClient.decryptPvData(this.qxct, '5090ffff751b0e1d2b6170d66b2e47a4fe74e91e15f3dfd5e6840361e1f7fca4')
      // console.log('mt', this.asciiToStr(byte))
      tokenSDKClient.genKey('55c974f17a0b44178d982dcd478150b8a4c0f206f397d7880d06bf5a72932b81')
    },
    // getData () {}
    asciiToStr(arr) {
      var str = ''
      for (var i = 0; i < arr.length; i++) {
        str += String.fromCharCode(arr[i])
      }
      return str
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>
  p
    font-size: 36px
    color: #ccc
</style>
