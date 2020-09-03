<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h2>welcome to index page.</h2>
    <p>content of this page.</p> -->
    <header class="header">
      <div id="nav">
        <router-link to="/index" class="navItem">index</router-link>
        <router-link to="/login" class="navItem">login</router-link>
        <router-link to="/signup" class="navItem">signup</router-link>
        <router-link to="/server/toSignCertify" class="navItem">待办项</router-link>
        <router-link to="/userInfo" class="navItem">用户信息</router-link>
        <div class="" v-if="!config.env">
          <router-link to="/cont" class="navItem">content</router-link>
          <router-link to="/pvdata" class="navItem">pvdata</router-link>
          <router-link to="/testTokenSDKClient" class="navItem">testTokenSDKClient</router-link>
          <router-link to="/server/uploadDidttm" class="navItem">上传私密文件</router-link>
          <router-link to="/server/pvdata" class="navItem">服务端pvdata</router-link>
          <router-link to="/server/certifyList" class="navItem">申请证书</router-link>
          <router-link to="/server/webSocket" class="navItem">webSocket</router-link>
          <router-link to="/server/webSocket2" class="navItem">webSocket2</router-link>
          <!-- <router-link to="/personIndex" class="navItem">个人首页</router-link> -->
          <router-link to="/test" class="navItem">test</router-link>
        </div>
        <!-- <router-link to="/server/certifyOfServer" class="navItem">服务端的证书</router-link> -->
      </div>
      <div>
        <!-- <span @click="logout" style="{cursor: pointer;}">登出</span> -->
      </div>
      <div class="userInfoBox" v-if="opName">
        <span class="name">{{opName | filtLong}} 已登录</span>
        <span @click="logout">登出</span>
      </div>
      <div class="userInfoBox" v-else>
        <span>请登录</span>
      </div>
      <!-- <span class="name">{{name}} 已登录</span> -->
      <!-- <div class="userInfoBox" v-if="name || avatar">
        <span class="name">{{name}}</span>
        <img :src="avatar" alt="" class="avatar">
      </div> -->
      <!-- <div class="userInfoBox" v-else>
        <span>请登录</span>
      </div> -->
    </header>
    <div id="cont">
      <router-view/>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import instance from '@/lib/axiosInstance'
// import {mapActions} from 'vuex'
import config from '@/lib/config'

export default {
  name: 'App',
  data () {
    return {
      // name: '',
      // avatar: '',
      // userInfo: {}
      config: config
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    },
    opName () {
      let ui = this.userInfo
      return ui.name || ui.email || ui.token || ui.github
    },
    name () {
      return ''
    },
    avatar: function () {
      let pvData = this.$store.getters.getPvData
      return JSON.stringify(pvData) === '{}' ? '' : pvData.property.avatar
      // return this.$store.getters.getAvatar ? this.$store.getters.getAvatar : ''
    }
  },
  filters: {
    filtLong (value) {
      return `...${value.slice(-4)}`
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    init () {
      // 刷新页面时把session里的用户数据保存在vuex里。
      let userInfoStr = sessionStorage.getItem('userInfo')
      if (userInfoStr) {
        let userInfo = JSON.parse(userInfoStr)
        console.log(userInfo)
        this.$store.dispatch('modifyUserInfo', {userInfo: userInfo})
        // this.userInfo = userInfo
      }
    },
    logout () {
      instance({
        url: '/users/logout',
        method: 'post',
        data: {}
      }).then(() => {
        // console.log(response.data)
        sessionStorage.removeItem('userInfo')
        this.$store.dispatch('modifyUserInfo', {userInfo: {}})
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style>
  body {
    font-size: 16px;
  }
</style>

<style lang="stylus">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: #2c3e50
  margin-top: 60px
  margin: 0 auto
  max-width: 900px

.header
  display: flex
  justify-content: space-between

  #nav
    width: 100%
    border: 2px solid #ccc
    padding: 5px 10px
    flex-grow: 1
    flex-wrap: wrap
    display: flex
    align-items: center
    margin-right: 20px

    .navItem
      margin: 10px 12px
      text-decoration: none

  .userInfoBox
    display: flex
    align-items: center
    flex-basis: 100px
    font-size: 18px
    word-break: keep-all
    cursor: pointer

    .name
      // font-size: 28px
      margin-right: 10px

    .avatar
      width: 60px
      border-radius: 100px

.button
  width: 100%
  height: 40px
  padding: 8px
  border-radius: 8px
  margin-bottom: 6px
</style>
