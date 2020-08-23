<template>
  <div class="toSignCertify">
    <h2>待签发证书</h2>
    <button class="refresh" @click="refresh"> 刷新</button>
    <div class="pendingTaskItem item" v-for="(item, key, index) in certifyList" :key="index" @click="gotoCertifySign(key)">
      <div class="left">
        <h3>{{getName(item)}}</h3>
        <p class="block">
          <span class="key">种类</span>
          <span class="value">{{getType(item.type)}}</span>
        </p>
        <p class="block">
          <span class="key">父did是否签名</span>
          <span class="value">{{opResult(item.isPdidCheck)}}</span>
        </p>
        <p class="block">
          <span class="key">人工审核是否签名</span>
          <span class="value">{{opPerson(item)}}</span>
        </p>
      </div>
      <img :src="arrows" alt="" class="arrows">
    </div>
    <!-- <p v-for="(item, key, index) in certifyList" :key="index" class="item" @click="gotoCertifySign(key)">
      <span>{{getName(item)}}</span>
      <span>{{getType(item.type)}}</span>
      <img :src="arrows" alt="">
    </p> -->
    <!-- <basicvue></basicvue> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
import arrows from '@/lib/images/arrows.png'
export default {
  props: {},
  data () {
    return {
      arrows: arrows,
      certifyList: {}
    }
  },
  computed: {
  },
  components: {
    // basicvue
  },
  methods: {
    init () {
      this.getData()
    },
    getData () {
      instance({
        url: '/claim/pendingTask',
        method: 'get'
      }).then(res => {
        this.certifyList = res.data.data
      }).catch(error => {
        if (error.response.status === 401) {
          this.$router.push({
            path: '/login'
          })
        }
      })
    },
    gotoCertifySign (claim_sn) {
      this.$router.push({
        path: '/server/personCheck',
        query: {
          claim_sn: claim_sn
        }
      })
    },
    getName (item) {
      // console.log(item)
      let name = ''
      switch (item.type) {
        case 'businessLicenseConfirm':
          name = item.msgObj.content.businessLicenseData.ocrData.name
          break
        default:
          name = ''
          break
      }
      return name
    },
    getType (type) {
      let resType = ''
      switch(type) {
        case 'businessLicenseConfirm':
          resType = '营业执照'
          break
        default:
          resType = ''
          break
      }
      return resType
    },
    opResult (result) {
      if (result === null) {
        return '未处理'
      } else if (result) {
        return '已通过'
      } else {
        return '未通过'
      }
    },
    opPerson (item) {
      if (item.auditor) {
        if (item.isPersonCheck) {
          return '已通达'
        } else {
          return '未通过'
        }
      } else {
        return '未处理'
      }
    },
    refresh () {
      this.init()
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .toSignCertify
    display: flex
    flex-wrap: wrap

    h2
      flex-basis: 100%
      flex-shrink: 0

      .refresh
        font-size: 14px

    .item
      display: flex
      align-items: center
      background: #ddd
      flex-basis: 360px
      flex-grow: 0
      margin: 10px
      padding: 10px
      justify-content: space-between
      cursor: pointer

      .left
        flex-basis: 90%
        display: flex
        flex-wrap: wrap

        p
          margin: 4px 0

        .block
          display: flex
          flex-basis: 100%

          .key
            flex-basis: 60%

          .value
            flex-basis: 40%

      arrows
        width: 20px
        height: 20px

</style>
