<template>
  <div class="basic">
    <h2>基本样式</h2>
    <!-- <basicvue></basicvue> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import utils from '@/lib/utils'
import { newEnforcer } from 'casbin';



export default {
  props: {},
  data () {
    return {
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
      // this.getData()
      // const e = await newEnforcer('path/to/model.conf', 'path/to/policy.csv');
      // const e = newEnforcer('path/to/model.conf', 'path/to/policy.csv');
      // console.log(e)
    },
    // getData () {}
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .basic

    h2
      font-size: .36rem

</style>
