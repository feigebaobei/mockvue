import Vue from 'vue'
// import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// import router from 'vue-router'
import router from './router/index.js'
import modules from './vuex/modules.js'

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
  store: modules,
  render: h => h(App)
}).$mount('#app')
// Vue.use(router)