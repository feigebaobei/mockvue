import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../page/index.vue'
import login from '../page/login.vue'
import cont from '../page/cont.vue'
import pvdata from '../page/pvdata.vue'
import staticp from '../page/staticp.vue'
import testTokenSDKClient from '../page/testTokenSDKClient.vue'
import certifyList from '../page/certifyList.vue'
import applyCertify from '../page/applyCertify.vue'
import certifyOfServer from '../page/certifyOfServer.vue'
import toSignCertify from '../page/toSignCertify.vue'
import uploadDidttm from '../page/uploadDidttm.vue'

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
  },
  {
    path: '/testTokenSDKClient',
    name: 'testTokenSDKClient',
    component: testTokenSDKClient
  },
  {
    path: '/applyCertify',
    name: 'applyCertify',
    component: applyCertify
  },
  {
    path: '/certifyList',
    name: 'certifyList',
    component: certifyList
  },
  {
    path: '/certifyOfServer',
    name: 'certifyOfServer',
    component: certifyOfServer
  },
  {
    path: '/toSignCertify',
    name: 'toSignCertify',
    component: toSignCertify
  },
  {
    path: '/uploadDidttm',
    name: 'uploadDidttm',
    component: uploadDidttm
  }
]
const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
export default router