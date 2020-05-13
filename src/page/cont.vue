<template>
  <div id="cont">
    <h2>welcome to content page.</h2>
    <section class="logined" v-if="userInfo">
      <p>登录后才能看到的内容。</p>
    </section>
    <section class="unlogin" v-else>
      <p>content of this page.</p>
      <p>未登录可看到的内容。</p>
    </section>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'cont',
  data () {
    return {}
  },
  computed: {
    userInfo () {
      let ui = this.$store.getters.getPvData.property
      console.log('ui', ui, JSON.stringify(ui))
      return JSON.stringify(ui) === '{}' ? '' : ui
    }
  },
  components: {
    // HelloWorld
  },
  mounted () {
    // console.log(this)
  }
}
</script>

<style lang="stylus" scoped>
  p
    font-size: 36px
    color: #ccc
</style>
