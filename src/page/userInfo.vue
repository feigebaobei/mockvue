<!-- 
这个页面分为是否auditor以下，
operator以上。
 -->
<template>
  <div class="basic">
    <!-- <h2>用户信息</h2> -->
    <!-- <basicvue></basicvue> -->
    <component :is="comp"></component>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import userDefault from '@/page/userDefault.vue'
import userSelect from '@/page/server/userSelect.vue'
export default {
  props: {},
  data () {
    return {
      // comp: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    },
    comp () {
      let role = this.userInfo.role || ''
      let res = ''
      switch (role) {
        case 'superAdmin':
        case 'admin':
        case 'operator':
          // res = 'powerful'
          res = 'userSelect'
          break
        case 'auditor':
        case 'user':
        case 'guest':
        default:
          // res = 'powerless'
          res = 'userDefault'
          break
      }
      res = 'userSelect' // 测试用
      return res
    }
  },
  // filters: {},
  components: {
    // basicvue
    userDefault,
    userSelect
  },
  methods: {
    // init () {
    //   this.getData()
    // },
    // getData () {}
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>


</style>