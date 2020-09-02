<template>
  <div class="webSocket">
    <h2>from</h2>
    <!-- <basicvue></basicvue> -->
    <button @click="fillFrom('did:ttm:u055806a0396f78a19cc350f7e6869b939677751ab2b84938f26f024cf8854')">did:ttm:u055806a0396f78a19cc350f7e6869b939677751ab2b84938f26f024cf8854</button>
    <button @click="fillFrom('did:ttm:o04d88758f182adbf2e936a4be7b8129ef13fc0f1de9800998ecf8427e54ee')">did:ttm:o04d88758f182adbf2e936a4be7b8129ef13fc0f1de9800998ecf8427e54ee</button>
    <!-- <button @click="fillFrom('did:ttm:u031b13098469b14ce277f18d028a00068b4aaf6b80f618b7c574017486712')">did:ttm:u031b13098469b14ce277f18d028a00068b4aaf6b80f618b7c574017486712</button> -->
    <button @click="fillFrom('did:ttm:a0e09fb5c4f53eee7f8f4fff4429d072381b1b2c23e9800998ecf8427ebc1e')">did:ttm:a0e09fb5c4f53eee7f8f4fff4429d072381b1b2c23e9800998ecf8427ebc1e</button>
    <br>
    <textarea name="" id="" cols="30" rows="10" v-model="fromDid" placeholder="请输入did"></textarea>
    <h2>to</h2>
    <button @click="fillTo('did:ttm:u055806a0396f78a19cc350f7e6869b939677751ab2b84938f26f024cf8854')">did:ttm:u055806a0396f78a19cc350f7e6869b939677751ab2b84938f26f024cf8854</button>
    <button @click="fillTo('did:ttm:o04d88758f182adbf2e936a4be7b8129ef13fc0f1de9800998ecf8427e54ee')">did:ttm:o04d88758f182adbf2e936a4be7b8129ef13fc0f1de9800998ecf8427e54ee</button>
    <!-- <button @click="fillTo('did:ttm:u031b13098469b14ce277f18d028a00068b4aaf6b80f618b7c574017486712')">did:ttm:u031b13098469b14ce277f18d028a00068b4aaf6b80f618b7c574017486712</button> -->
    <button @click="fillTo('did:ttm:a0e09fb5c4f53eee7f8f4fff4429d072381b1b2c23e9800998ecf8427ebc1e')">did:ttm:a0e09fb5c4f53eee7f8f4fff4429d072381b1b2c23e9800998ecf8427ebc1e</button>
    <button @click="fillTo('did:ttm:a0e01cb27c8e5160a907b1373f083af3d2eb64fd8ee9800998ecf8427eab11')">远端认证应用 did:ttm:a0e01cb27c8e5160a907b1373f083af3d2eb64fd8ee9800998ecf8427eab11</button>
    <button @click="fillTo('did:ttm:a0d931d76818589a79f63bd2576d867bf45bd6464be9800998ecf8427e8344')">本地认证应用 did:ttm:a0d931d76818589a79f63bd2576d867bf45bd6464be9800998ecf8427e8344</button>
    <br>
    <textarea name="" id="" cols="30" rows="10" v-model="toDid" placeholder="请输入did"></textarea>
    <h2>message</h2>
    <textarea name="" id="" cols="30" rows="10" v-model="cont" placeholder="请输入稍息"></textarea>
    <br>
    <form action="#">
      <input type="radio" name="inline" id="prod" value="prod" v-model="environment">
      <label for="prod">生产</label>
      <input type="radio" name="inline" id="dev" value="dev" v-model="environment">
      <label for="dev">开发</label>
    </form>
    <br>
    <form action="#">
      <input type="radio" name="method" id="auth" value="auth" v-model="method">
      <label for="auth">auth</label>
      <input type="radio" name="method" id="bind" value="bind" v-model="method">
      <label for="bind">bind</label>
      <input type="radio" name="method" id="confirm" value="confirm" v-model="method">
      <label for="confirm">confirm</label>
      <input type="radio" name="method" id="verification" value="verification" v-model="method">
      <label for="verification">verification</label>
    </form>
    <br>
    <button @click="linkws">链接</button>
    <button @click="unlinkws">断开</button>
    <button @click="packAndSendMessage">封装后发送</button>
    <br>
    <textarea name="" id="" cols="30" rows="10" v-model="msgId" placeholder="请输入稍息id"></textarea>
    <button @click="confirmReceiveMsg">接收</button>
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
      // pdid: '',
      fromDid: 'did:ttm:u055806a0396f78a19cc350f7e6869b939677751ab2b84938f26f024cf8854',
      toDid: 'did:ttm:a0e01cb27c8e5160a907b1373f083af3d2eb64fd8ee9800998ecf8427eab11',
      cont: '',
      msg: {
          "content":{
              "messageId":"4c52c917-1489-4126-9de8-412907b3fe3b",
              "msgContentType":"receiptContentType",
              "result":"received"
          },
          "createTime":"1595828928000",
          "messageId":"4c52c917-1489-4126-9de8-412907b3fe3b",
          "method":"receipt",
          "receiver":[
              "did:ttm:u03e1f7d80a0af1d55488f5502ebbae61f832388952b84938f26f024cfbf02"
          ],
          "sender":"did:ttm:u011b80743b5fa85ade3a5696eef660b2bae1ba4ba2b84938f26f024cf3fcd"
      },
      msgId: '',
      environment: 'prod',
      method: 'auth'
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
      // this.linkws()
      // console.log(this)
    },
    linkws () {
      this.initWebSocket()
    },
    unlinkws () {
      this.ws.close()
    },
    initWebSocket () {
      // let url = utils.isOnline() ? 'ws://www.lixiaodan.org:9875' : 'ws://localhost:9875'
      let url = this.environment === 'prod' ? 'ws://www.lixiaodan.org:9875' : 'ws://localhost:9875'
      // let did = 'did:ttm:o04d88758f182adbf2e936a4be7b8129ef13fc0f1de9800998ecf8427e54ee'
      url += `?did=${this.fromDid}`
      this.ws = new WebSocket(url)
      // console.log('initWebSocket', this.ws.url)
      this.ws.onopen = function (e) {
        console.log('client: linked', e)
      }
      this.ws.onclose = function (e) {
        console.log('close', e)
      }
      this.ws.onerrro = function (e) {
        console.log('error', e)
      }
      // this.ws.onmessage = function (e) {
      //   console.log('message', e.data, e)
      //   console.log(this.createMessage('', [], 'read'))
      //   // this.ws.send(this.createMessage('', [], 'read'))
      //   // this.sendMessage()
      // }
      this.ws.onmessage = (e) => {
        // let data = JSON.parse(e.data)
        // console.log('message', data, e)
        console.log('message', e)
        // console.log(this.createMessage('', [], 'read'))
        // let msgIds = data.reduce((res, cur) => {
        //   res.push(cur.messageId)
        //   return res
        // }, [])
        // console.log('msgIds', msgIds)
        // this.ws.send(this.createMessage('', [], 'read', msgIds))

      }
    },
    // sendMessage (cont = this.cont) {
    sendMessage () {
      this.ws.send(this.cont)
      // this.ws.send(this.createMessage(this.cont, [this.toDid], 'auth'))
      // this.ws.send(JSON.stringify(this.msg))
      // this.ws.send(this.cont)

    },
    packAndSendMessage () {
      let msg = this.createMessage(JSON.parse(this.cont), [this.toDid], this.method)
      console.log(msg)
      this.ws.send(msg)
    },
    createMessage (content = '', receiver = [], method = '', messageId = utils.getUuid(), createTime = new Date().getTime()) {
      return JSON.stringify({
      // return {
        method: method,
        content: content,
        messageId: messageId,
        createTime: createTime,
        receiver: receiver
      })
      // }
    },
    confirmReceiveMsg () {
      // let arr = [
      //   '3e54d7e2-c0b6-4791-85cd-f87d5c1a1ebc',
      //   'bb217068-b659-4121-9871-68e639a0676f',
      //   '7849bf47-78f2-4a61-8722-ada87147d4aa'
      // ]
      // arr.map(item => {
      //   this.ws.send(this.createMessage({messageId: item}, ['did:ttm:u0394ba69487cc435bd2556d30f2f2afe8d82018d22b84938f26f024cfc2f0'], 'receipt', '12345'))
      // })
      this.ws.send(this.createMessage({messageId: this.msgId}, [this.fromDid], 'receipt', '12345'))

    },
    fillFrom (did) {
      this.fromDid = did
    },
    fillTo (did) {
      this.toDid = did
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

</style>
