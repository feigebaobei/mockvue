<template>
  <div class="pvdata">
    <!-- <h2>基本样式</h2> -->
    <!-- <basicvue></basicvue> -->
    <section v-if="hasPvData">刷新pvdata</section>
    <section>
      <p>输入信息后拉取pvdata</p>
      <form action="#">
        <div>
          <label for="phone">手机号</label>
          <input type="text" id="phone" name="phone" v-model="formData.phone">
        </div>
        <div>
          <label for="checkCode">验证码</label>
          <input type="text" id="checkCode" name="checkCode" v-model="formData.checkCode">
        </div>
        <div>
          <button id="getCheckCode" @click="getCheckCode">获得验证码</button>
        </div>
        <div>
          <button id="getUdidList" @click="getUdidList">请求udid列表</button>
        </div>
        <!-- <div class="udidBlocd"> -->
          <div>
            <label for="udid">udid</label>
            <select name="udid" id="udid" v-model="formData.selectedUdid">
              <option v-for="(item, index) in formData.udidList" :key="index" :value="item.udid">{{item.title}} {{item.udid}}</option>
            </select>
          </div>
          <div>
            <!-- <span>{{udid}}</span>
            <span>{{udid}}</span> -->
          </div>
          <div>
            <label for="idpwd">身份密码</label>
            <input type="password" id="idpwd" name="idpwd" v-model="formData.idpwd">
          </div>
          <div>
            <button id="getPvDataBox" @click="getPvDataBox">拉取pvdata</button>
          </div>
        <!-- </div> -->
      </form>
    </section>
    <p>这个页面一共有5个部分。</p>
    <h3 class="title">用户属性</h3>
    <section class="ui">
      <p v-for="(value, item, index) in pvData.property" :key="index">
        <span>{{item}}: </span>
        <span>{{pvData.property[item]}}</span>
      </p>
    </section>
    <h3 class="title">证书（身份证书、通用证书）</h3>
    <section class="certifyItem">
      <h4 class="title">{{certifyData.title}}</h4>
      <p class="cont">{{certifyData.content}}</p>
    </section>
    <h3 class="title">通讯录</h3>
    <section>
      <p>
        <span>NAME0: </span>
        <span>18512345678</span>
      </p>
      <p>
        <span>NAME1: </span>
        <span>18523456789</span>
      </p>
      <p>
        <span>NAME2: </span>
        <span>18534567890</span>
      </p>
    </section>
    <h3 class="title">验证过的证书</h3>
    <section class="certifyItem">
      <h4 class="title">{{certifyData.title}}</h4>
      <p class="cont">{{certifyData.content}}</p>
    </section>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
import tokenSDKClient from 'token-sdk-client'

export default {
  props: {},
  data () {
    return {
      formData: {
        phone: '12345',
        checkCode: '2456',
        udidList: [{
          title: '',
          udid: ''
        }],
        selectedUdid: '',
        idpwd: ''
      },
      certifyData: {
        title: '',
        content: '',
      },
      checkSignCertifyData: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    hasPvData () {
      return this.$store.state.userInfo.hasPvData
    },
    pvData () {
      // let a = this.$store.state.userInfo.pvData
      // console.log(a)
      return this.$store.state.userInfo.pvData
    },
    // ui () {
    //   this.pvData.
    // }
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      // this.getData()
      this.fnTest()
    },
    fnTest() {
      tokenSDKClient.main()
    },
    // getData () {}
    getCheckCode (event) {
      // console.log(this)
      event.preventDefault()
      instance.get(`/node/vcode/${this.formData.phone}`).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    getUdidList (event) {
      event.preventDefault()
      instance({
        url: `/node/udidList`,
        method: 'get',
        data: {
          phone: this.formData.phone,
          checkCode: this.formData.checkCode
        }
      }).then(res => {
      // console.log(res)
        this.formData.udidList = res.data.data.udidList

      }).catch(error => {
        console.log(error)
      })
    },
    getPvDataBox (event) {
      console.log(this)
      event.preventDefault()
      Promise.all([
        instance({
          url: `/did/keystore/${this.formData.selectedUdid}`,
          method: 'get'
        }),
        instance({
          url: `/did/pvdata/${this.formData.selectedUdid}`,
          method: 'get'
        })
      ]).then(([keyStoreCt, pvDataCt]) => {
        // 解密
        // 使用sm4、idpwd解密keyStoreCt
        // let keyStore = tokenSDKClient.decryptKeyStore(keyStoreCt.data.data, this.formData.idpwd)
        let keyStore = keyStoreCt.data.data
        // 保存keyStore
        this.$store.dispatch('modifyKeyStore', {keyStore: keyStore}).catch((err) => {
        // this.$store.dispatch('modifyKeyStore', {keyStore: keyStoreCt.data.data}).catch((err) => {
          console.log(err)
        })
        // 解密
        // 使用sm2、私钥解密pvDataCt
        // let pvData = tokenSDKClient.decryptPvData(pvDataCt.data.data, keyStore)
        let pvData = pvDataCt.data.data
        // 保存pvData
        // this.$store.dispatch('modifyPvData', {pvData: pvData}).then(() => {
        this.$store.dispatch('modifyPvData', {pvData: pvData}).then(() => {
          this.$store.dispatch('modifyHasPvData', {hasPvData: true})
          // 渲染我的证书
          this.opCertify(pvData.submitCertifies, true)
          // 渲染我验证过的证书
          this.opCertify(pvData.validatedCertifies, false)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    opCertify (certify, bool) {
      instance({
        url: `/claim/template/${certify.templateId}`,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        let desc = data.desc
        for (let key in data.data) {
          let str = '\\$' + key + '\\$'
          let reg = new RegExp(str, 'gm')
          desc = desc.replace(reg, data.data[key])
        }
        if (bool) {
          this.certifyData.title = data.title
          this.certifyData.content = desc
        } else {
          this.checkSignCertifyData.title = data.title
          this.checkSignCertifyData.content = desc
        }
      })
    }
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>

  // .pvdata
  .certifyItem
    width: 350px
    background: #ddd
    padding: 15px

    .title
      text-align: center

      .cont
        // width: 350px


</style>
