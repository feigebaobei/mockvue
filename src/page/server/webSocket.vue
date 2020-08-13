<template>
  <div class="webSocket">
    <h2>基本样式</h2>
    <!-- <basicvue></basicvue> -->
    <textarea name="" id="" cols="30" rows="10" v-model="did" placeholder="请输入did"></textarea>
    <br>
    <textarea name="" id="" cols="30" rows="10" v-model="cont" placeholder="请输入稍息"></textarea>
    <br>
    <button @click="linkws">链接</button>
    <button @click="sendMessage">发送</button>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import utils from '@/lib/utils.js'
export default {
  props: {},
  data () {
    return {
      ws: null,
      did: 'did:ttm:o04d88758f182adbf2e936a4be7b8129ef13fc0f1de9800998ecf8427e54ee',
      pdid: 'did:ttm:u055806a0396f78a19cc350f7e6869b939677751ab2b84938f26f024cf8854',
      pdid1: 'did:ttm:u055806a0396f78a19cc350f7e6869b939677751ab2b84938f26f024cf8851',
      pdid2: 'did:ttm:u055806a0396f78a19cc350f7e6869b939677751ab2b84938f26f024cf8852',
      cont: 'sdf'
    }
  },
  computed: {
  },
  // filters: {},
  components: {
    // basicvue
  },
  methods: {
    init () {
      // this.initWebSocket()
      this.linkws()
    },
    linkws () {
      this.initWebSocket()
    },
    initWebSocket () {
      console.log('utils.isOnline()', utils.isOnline())
      let url = utils.isOnline() ? 'ws://www.lixiaodan.org:9875' : 'ws://localhost:9875'
      // let did = 'did:ttm:o04d88758f182adbf2e936a4be7b8129ef13fc0f1de9800998ecf8427e54ee'
      url += `?did=${this.did}`
      this.ws = new WebSocket(url)
      // this.ws = new WebSocket('ws://127.0.0.1:9870')
      console.log('initWebSocket', this.ws.url)
      // this.ws = new WebSocket('ws://47.94.105.206:9870')
      // this.ws = new WebSocket('ws://lixiaodan:9870')
      // this.ws = new WebSocket('ws://172.25.0.51:9870')
      // this.ws = new WebSocket('ws://1234qwer:9870')
      // this.ws = new WebSocket('ws://0.0.0.0:9870')
      this.ws.onopen = function (e) {
        console.log('client: linked', e)
      }
      this.ws.onclose = function (e) {
        console.log('close', e)
      }
      this.ws.onerror = function (e) {
        console.log('error', e)
      }
      this.ws.onmessage = function (e) {
        // console.log('message', e.data, JSON.parse(e.data), e)
        console.log('message', e.data, e)
      }
    },
    sendMessage () {
      // this.ws.send(this.cont)
      this.ws.send(this.createMessage(this.cont, [this.pdid, this.pdid1, this.pdid2], 'confirm', new Date().getTime()))
    },
    createMessage (content = '', receiver = [], method = '', messageId = '', createTime = new Date().getTime()) {
      return JSON.stringify({
        method: method,
        content: content,
        messageId: messageId,
        createTime: createTime,
        receiver: receiver
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

  .webSocket

    h2
      font-size: .36rem

</style>
