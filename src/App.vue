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
        <router-link to="/cont" class="navItem">content</router-link>
        <router-link to="/pvdata" class="navItem">pvdata</router-link>
        <router-link to="/testTokenSDKClient" class="navItem">testTokenSDKClient</router-link>
        <router-link to="/server/uploadDidttm" class="navItem">上传私密文件</router-link>
        <router-link to="/server/pvdata" class="navItem">服务端pvdata</router-link>
        <router-link to="/server/certifyList" class="navItem">申请证书</router-link>
        <router-link to="/server/toSignCertify" class="navItem">待签发证书</router-link>
        <router-link to="/server/webSocket" class="navItem">webSocket</router-link>
        <router-link to="/server/webSocket2" class="navItem">webSocket2</router-link>
        <router-link to="/personIndex" class="navItem">个人首页</router-link>
        <!-- <router-link to="/server/certifyOfServer" class="navItem">服务端的证书</router-link> -->
      </div>
      <div>
        <!-- <span @click="logout" style="{cursor: pointer;}">登出</span> -->
      </div>
      <div class="userInfoBox" v-if="userInfo.email">
        <span class="name">{{userInfo.email}} 已登录</span>
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

export default {
  name: 'App',
  data () {
    return {
      // name: '',
      // avatar: '',
      // userInfo: {}
    }
  },
  computed: {
    userInfo () {
      // let userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || ''
      // return userInfo

      // let u = this.$store.getters.getUserInfo
      // console.log(u)
      // return u

      return this.$store.getters.getUserInfo
    },
    name () {
      // // let temp = this.$store.getters.getName
      // // if (temp) {}
      // // return this.$store.getters.getName ? this.$store.getters.getName : ''
      // let pvData = this.$store.getters.getPvData
      // return JSON.stringify(pvData) === '{}' ? '' : pvData.property.nickName

      // console.log(JSON.parse(sessionStorage.getItem('userInfo')))
      // let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
      // this.userInfo = userInfo
      // if (userInfo.name) {
      //   return userInfo.name
      // } else {
      //   return ''
      // }
      return ''
    },
    avatar: function () {
      let pvData = this.$store.getters.getPvData
      return JSON.stringify(pvData) === '{}' ? '' : pvData.property.avatar
      // return this.$store.getters.getAvatar ? this.$store.getters.getAvatar : ''
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    init () {
      let userInfoStr = sessionStorage.getItem('userInfo')
      // console.log('userInfoStr', userInfoStr)
      // this.$store.
      // console.log(ss)
      // store.
      // console.log(this.$store)
      // this.$store.dispatch('modifyName', {name: '3453'})
      // this.$store.dispatch('modifyUserInfo', {userInfo: {name: '3453'}})
      if (userInfoStr) {
        this.$store.dispatch('modifyUserInfo', {userInfo: JSON.parse(userInfoStr)})
      }
      // 测试能否取得保存在vuex里的数据。
      // 结果是可以取得。
      // let that = this
      // setTimeout(function () {
      //   console.log(that.$store)
      //   let n = that.$store.getters.getUserInfo
      //   console.log('getter name', n)
      // }, 1000)
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
