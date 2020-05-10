import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../page/index.vue'
import login from '../page/login.vue'
import cont from '../page/cont.vue'
import pvdata from '../page/pvdata.vue'
import staticp from '../page/staticp.vue'

// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: index
  },
  {
    path: '/index',
    redirect: '/'
    // name: 'Index',
    // component: index
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/cont',
    name: 'cont',
    component: cont
  },
  {
    path: '/pvdata',
    name: 'pvdata',
    component: pvdata
  },
  {
    path: '/staticp',
    name: 'staticp',
    component: staticp
  }
]
const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
export default router