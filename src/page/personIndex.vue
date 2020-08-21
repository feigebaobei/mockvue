<template>
  <div class="personIndex">
    <!-- <h2>基本样式</h2> -->
    <!-- <basicvue></basicvue> -->
    <p>姓名</p>
    <p>{{name}}</p>
    <p>性别</p>
    <p>{{gender}}</p>
    <p>头像</p>
    <p>{{picture}}</p>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
// import instance from '@/lib/axiosInstance'
export default {
  props: {},
  data () {
    return {
      name: '',
      gender: '',
      picture: ''
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
      this.getData()

    },
    getData () {
      let ui = this.$store.getters.getUserInfo
      this.name = ui.profile.name
      this.gender = ui.profile.gender
      this.picture = ui.profile.picture
      // instance({
      //   url: '/users/userInfo',
      //   // method: 'get'
      // }).then(response => {
      //   console.log(response.data)
      // }).catch(() => {
      //   this.$router.push({
      //     path: '/login',
      //     query: {
      //       purposeUrl: '/personIndex'
      //     }
      //   })
      // })
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .personIndex

    h2
      font-size: .36rem

</style>
