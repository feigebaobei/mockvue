<template>
  <div class="signUp">
    <h2>基本样式</h2>
    <form action="#" class="form">
      <div class="item">
        <label for="email">email</label>
        <input type="text" id="email" name="email" class="input" v-model="formData.email" placeholder="请输入email">
      </div>
      <div class="item">
        <label for="password">password</label>
        <input type="password" id="password" name="password" class="input" v-model="formData.password" placeholder="请输入password">
      </div>
      <div class="item">
        <button class="button submit" @click="submit">提交</button>
        <button class="button reset" @click="reset">重置</button>
      </div>
    </form>
    <!-- <basicvue></basicvue> -->
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
export default {
  props: {},
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
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
    submit () {
      instance({
        url: '/users/signup',
        method: 'post',
        data: {
          email: this.formData.email,
          password: this.formData.password
        }

      })
    },
    reset () {
      this.formData.email = ''
      this.formData.password = ''
    }
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .form
    width: 360px

    .item
      width: 100%
      display: flex
      align-items: center
      margin-bottom: 10px
      justify-content: space-between

      .label
        margin-right: 6px

      .input
      .select
        flex-grow: 1
        height: 28px

      .button
        width: 100%
        height: 34px
        padding: 8px
        border-radius: 8px
        margin-bottom: 15px

      .submit
      .reset
        width: 46%


</style>
