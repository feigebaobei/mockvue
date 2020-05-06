import Vue from 'vue'
import App from './App.vue'
// import router from 'vue-router'
import router from './router/index.js'

Vue.config.productionTip = false // 是否启用生产环境的消息提示
// Vue.config.productionTip = true

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: {App}
// })

// Vue.use(router)

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
// Vue.use(router)