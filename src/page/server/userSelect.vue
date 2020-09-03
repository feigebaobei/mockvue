<template>
  <div class="userSelect">
    <!-- <h2>userSelect</h2> -->
    <!-- <basicvue></basicvue> -->
    <el-form ref="form" :model="form" label-width="60px" :inline="true">
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option v-for="(item, index) in form.selAbleOption" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="查询值">
        <elInput v-model="form.value" placeholder="请输入查询值"></elInput>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="select">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
import {Form, FormItem, Select, Option, Input, Button} from 'element-ui'
export default {
  props: {},
  data () {
    return {
      form: {
        type: '',
        value: '',
        selAbleOption: [
          {
            label: '邮箱',
            value: 'email'
          },
          {
            label: 'token',
            value: 'token'
          },
          {
            label: 'github',
            value: 'github'
          }
        ]
      }
    }
  },
  computed: {
  },
  // filters: {},
  components: {
    // basicvue
    elForm: Form,
    elFormItem: FormItem,
    elSelect: Select,
    elOption: Option,
    elInput: Input,
    elButton: Button,

  },
  methods: {
    // init () {
    //   this.getData()
    // },
    // getData () {}
    select () {
      instance({
        url: `/users/select`,
        params: {
          type: `${this.form.type}`,
          value: `${this.form.value}`
        }
      }).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    reset () {
      this.form.type = ''
      this.form.value = ''
    }

  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .userSelect
    margin: 15px 0

</style>
