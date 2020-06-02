<template>
  <div class="applyCertify">
    <!-- 展示区 -->
    <section class="showBox" :style="[mBg]">
      <h2 class="title">{{template.title}}</h2>
      <p>{{mCont}}</p>
    </section>
    <!-- 输入区 -->
    <section class="inputBox">

      <form action="" class="form">
        <!-- <div class="item" v-for="(value, item, index) in template.keys" :key="index"> -->
        <div class="item" v-for="(value, item, index) in formData.keys" :key="index">
          <!-- label的for属性是与input的id属性协同工作的，但是这里不能使用id值。因为为确定该id值是否在该页面的别的地方有使用。 -->
          <label :for="value.name" class="label">{{value.label}}</label>
          <!-- <input type="text" v-if="value.type === 'text'" :name="value.name" class="input" @change="changeCertCont(value.name, event)"> -->
          <!-- <input type="text" v-if="value.type === 'text'" :name="value.name" class="input" v-model="changeCertCont"> -->
          <!-- <input type="text" v-if="value.type === 'text'" :name="value.name" class="input" @input="changeCertCont"> -->
          <input type="text" v-if="value.type === 'text'" :name="value.name" class="input" :value="value.default" @input="changeCertCont">
          <div v-if="value.type === 'radio'" class="radioIf">
            <div v-for="(subItem, subIndex) in value.options" :key="subIndex" class="radioFor">
              <input type="radio" :name="value.name" :value="subItem" :ref="`certify${value.name}`" @input="changeCertCont">
              <label for="">{{subItem}}</label>
            </div>
          </div>
        </div>
        <div class="item">
          <label for="" class="label">过期时间</label>
          <input type="date" v-model="expire" class="input">
        </div>
        <div class="item">
          <button class="button" @click="applyCertify">提交</button>
        </div>
      </form>
    </section>
    <!-- 示例 -->
    <section class="exampleBox">
      <div class="questionMark" v-if="!model.open" @click="openModel">
        <span>示例</span>
      </div>
      <div class="modelBg" v-else @click="closeModel">
        <div class="mContBox">
          <img :src="template.example" alt="">
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import instance from '@/lib/axiosInstance'
import tokenSDKClient from 'token-sdk-client'
export default {
  props: {},
  data () {
    return {
      templateId: this.$route.query.templateId,
      template: { // 获得的模板数据
        // background: ''
      },
      expire: '',
      mBg: {},
      mCont: '',
      model: {
        open: false
      },
      formData: {
        // keys: [{

        // }]
      }
    }
  },
  computed: {
    cCont: function () {
      let desc = this.template.desc
      // desc.
      return desc
    }
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      this.getData()
    },
    getData () {
      // instance({
      //   url: '/claim/template',
      //   method: 'get',
      //   params: {
      //     templateId: this.templateId
      //   }
      // })
      tokenSDKClient.getTemplate(this.templateId)
      .then(res => {
        this.template = res.data.data
        this.formData.keys = res.data.data.keys
        this.mBg = {
          background: `url(${this.template.background})`
        }
        this.mCont = this.template.desc
        this.replaceCont()
      }).catch(err => {
        console.log(err)
      })
    },
    replaceCont () {
      this.mCont = this.template.desc
      for (let [k, {default: v}] of Object.entries(this.formData.keys)) {
        let reg = new RegExp(`\\$${k}\\$`)
        this.mCont = this.mCont.replace(reg, v === '' ? `$${k}$` : v)
      }
    },
    changeCertCont (event) {
      let {name, value} = event.target
      this.formData.keys[name].default = value
      this.replaceCont()
    },
    openModel () {
      this.model.open = true
    },
    closeModel () {
      this.model.open = false
    },
    applyCertify (event) {
      event.preventDefault()
      // instance()
      let expire = this.expire
      // // console.log(expire)
      let [y, m, d] = expire.split(/[，,/-\s\\]/)
      let date = new Date()
      date.setFullYear(y)
      date.setMonth(m - 1)
      date.setDate(d)
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      // date.setMilliseconds(0)
      // let hashCont = ''
      // for (let [k, obj] of Object.entries(this.formData.keys)) {
      //   let hashStr = tokenSDKClient.bytesToStrHex(new tokenSDKClient.sm3().sum(obj.default))
      //   let reg = new RegExp(`\\$${k}\\$`, 'gm')
      //   hashCont = this.template.desc.replace(reg, hashStr)
      // }
      // hashCont = tokenSDKClient.bytesToStrHex(new tokenSDKClient.sm3().sum(hashCont))
      // // sign
      // let sign = ''
      let certifyData = {
        // key: value
      }

      // tokenSDKClient.applyCertify(this.templateId, hashCont, date.getTime(), sign)
      // instance(this.templateId, certifyData)
      instance({
        url: '/claim/applyCertify',
        method: 'post',
        data: {
          templateId: this.templateId,
          certifyData: certifyData,
          expire: date.getTime()
        }
      })
      .then(res => {
        console.log('res', res)
        let r = confirm('已经创建成功证书。是否进入该证书详情页面。')
        if (r) {
          this.$router.push({
            path: '/server/certifyDetail',
            query: {
              templateId: res.data.data.templateId,
              claim_sn: res.data.data.claim_sn
            }
          })
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    calcHashCont () {
      return tokenSDKClient
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .button
    width: 100%
    height: 40px
    padding: 8px
    border-radius: 8px

  .applyCertify
    margin: 30px 0

    .showBox
      border: 2px solid #ccc
      padding: 20px
      margin-bottom: 20px

      .title
        text-align: center

    .inputBox

      .form
        width: 360px

        .item
          display: flex
          align-items: center
          margin-bottom: 10px

          .label
            margin-right: 6px

          .input
          .select
            flex-grow: 1
            height: 28px

          .radioIf
            display: flex
            justify-content: flex-end
            flex-grow: 1

            .radioFor
              margin-left: 20px

  .exampleBox
    .questionMark
      background-color: rgba(130, 250, 110, .5)
      position: fixed
      right: 20px
      top: 120px
      width: 60px
      height: 60px
      border-radius: 200px
      display: flex
      justify-content: center
      align-items: center
      font-size: 20px

    .modelBg
      background-color: rgba(0, 0, 0, .2)
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      display: flex
      align-items: center
      justify-content: center

      .mContBox
        width: 900px
        margin: 0 auto
        display: flex
        align-items: center
        justify-content: center

        img
          height: 500px


</style>
