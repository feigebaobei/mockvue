<template>
  <div class="certifyList">
    <p>请选择需要创建的证书模板。</p>
    <section class="certifyBox">
      <section class="item" v-for="(item, index) in certifyList" :key="index" @click="gotoApplyCertify(item.templateId)">
        <img :src="item.example" alt="" class="img">
      </section>
    </section>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
// import instance from '@/lib/axiosInstance'
import tokenSDKServer from 'token-sdk-server'
export default {
  props: {},
  data () {
    return {
      certifyList: [
        // {
        //   templateId: '',
        //   example: '',
        // }
      ]
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
      // instance({
      //   url: '/claim/templateList',
      //   method: 'get'
      // })
      tokenSDKServer.getTemplateList()
      .then(res => {
        console.log(res)
        this.certifyList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    gotoApplyCertify (id) {
      this.$router.push({
        path: '/applyCertify',
        query: {
          templateId: id
        }
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

  .certifyList

    .certifyBox
      display: flex
      flex-wrap: wrap
      justify-content: space-between

      .item
        flex-basis: 30%
        height: 220px
        background: #ddd
        display: flex
        align-item: center
        justify-content: center
        flex-grow: 0
        flex-shrink: 0

        .img
          width: auto
          height: 100%


</style>
