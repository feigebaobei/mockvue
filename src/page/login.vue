<template>
  <div id="login">
    <h2>welcome to login page.</h2>
    <p>content of this page.</p>
    <canvas id="canvas" ref="qr"></canvas>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import instance from '@/lib/axiosInstance'
import QRCode from 'qrcode'

export default {
  name: 'Login',
  data () {
    return {}
  },
  computed: {},
  components: {
    // HelloWorld
  },
  methods: {
    init () {
      this.getData()
    },
    getData () {
      instance.get('/users/loginui').then(response => {
        // console.log('response', JSON.stringify(response.data))
        QRCode.toCanvas(this.$refs.qr, JSON.stringify(response.data), error => {
          if (error) {
            console.log('error', error)
          }
          // console.log('success')
        })
      }).catch(error => {
        console.log('error', error)
      })
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus">
  p
    font-size: 36px
    color: #ccc
</style>
