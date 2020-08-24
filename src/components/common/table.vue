<template>
  <div class="table">
    <!-- <h2>基本样式</h2> -->
    <!-- <basicvue></basicvue> -->
    <div class="header">
      <div class="hi" v-for="(item, index) in headers" :key="index">
        <span>{{item.text}}</span>
      </div>
    </div>
    <div class="tbody">
      <div class="tbItem" v-for="(item, index) in tbodyData" :key="index" >
        <div v-for="(subItem, subIndex) in Object.keys(item)" :key="subIndex">
          <span v-if="!item[headers[subIndex].field].tag">{{item[headers[subIndex].field].value}}</span>
          <button v-else>{{item[headers[subIndex].field].value}}</button>
        </div>
      </div>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
export default {
  props: {
    headers: {
      type: Array,
      default () {
        return [
          // {
          //   text: '',
          //   field: ''
          // }
        ]
      }
    },
    // footer: {
    //   type: Array,
    //   default () {}
    // },
    tbodyData: {
      type: Array,
      default () {
        return [
          // [
          //   // {
          //   //   field: 'value',
          //   // },
          //   // {
          //   //   field: 'value',
          //   // },
          //   // {
          //   //   field: 'value',
          //   //   tag: 'button',
          //   //   eventType: ''
          //   // }
          // ]
        ]
      }
    }
  },
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
    // init () {
    //   this.getData()
    // },
    // getData () {}
    trigger (item) {
      if (this.eventType) {
        this.$emit(this.eventType, item)
      }
    }
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .table
    display: flex
    flex-basis: 100%
    flex-wrap: wrap

    .header
      display: flex
      flex-basis: 100%
      justify-content: space-around

      .hi
        font-weight: 600

    .tbody
      display: flex
      flex-basis: 100%
      justify-content: space-around
      flex-wrap: wrap
      
      .tbItem
        display: flex
        flex-basis: 100%
        justify-content: space-around


</style>
