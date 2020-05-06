<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h2>welcome to index page.</h2>
    <p>content of this page.</p> -->
    <div id="nav">
      <router-link to="/index" class="navItem">index</router-link>
      <router-link to="/login" class="navItem">login</router-link>
      <router-link to="/content" class="navItem">content</router-link>
    </div>
    <div id="cont">
      <router-view/>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
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

#nav
  border: 2px solid #ccc
  padding: 5px 10px

  .navItem
    margin-right: 8px
    text-decoration: none


</style>
