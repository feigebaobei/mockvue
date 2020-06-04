<template>
  <div class="toSignCertify">
    <h2>待签发证书</h2>
    <p v-for="(item, index) in certifyList" :key="index" class="item" @click="gotoCertifySign(item)">
      <span>{{item}}</span>
      <img :src="arrows" alt="">
    </p>
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
      certifyList: []
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
        url: '/claim/needSignCertify',
        method: 'get'
      }).then(res => {
        this.certifyList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    gotoCertifySign (certifySignUuid) {
      this.$router.push({
        path: '/server/certifySign',
        query: {
          certifySignUuid: certifySignUuid
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

  .toSignCertify
    display: flex
    flex-wrap: wrap

    h2
      flex-basis: 100%
      flex-shrink: 0

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

      img
        width: 30px
        height: 30px

</style>
