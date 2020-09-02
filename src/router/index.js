import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../page/index.vue'
import login from '../page/login.vue' // 未使用懒加载
const tokenLogin = () => import('../page/loginToken') // 使用import方式懒加载
const test = () => import('../page/test')
// const personIndex = () => import('../page/personIndex')
// import signup from '../page/signup.vue'
// import cont from '../page/cont.vue'
// import pvdata from '../page/pvdata.vue'
// import staticp from '../page/staticp.vue'
// import testTokenSDKClient from '../page/testTokenSDKClient.vue'

// const signup = () => import('../page/signup.vue')
const cont = () => import('../page/cont.vue')
const pvdata = () => import('../page/pvdata.vue')
const staticp = () => import('../page/staticp.vue')
const testTokenSDKClient = () => import('../page/testTokenSDKClient.vue')

const certifyList = () => import('../page/server/certifyList.vue')
const applyCertify = () => import('../page/server/applyCertify.vue')
const certifyOfServer = () => import('../page/server/certifyOfServer.vue')
const toSignCertify = () => import('../page/server/toSignCertify.vue')
const certifyDetail = () => import('../page/server/certifyDetail.vue')
const certifyCheck = () => import('../page/server/certifyCheck.vue')
const certifySign = () => import('../page/server/certifySign.vue')
const certifyPoster = () => import('../page/server/certifyPoster.vue')

const serverIndex = () => import('../page/server/index.vue')
const serverUploadDidttm = () => import('../page/server/uploadDidttm.vue')
const serverPvData = () => import('../page/server/pvdata.vue')
const serverCertifyDetail = () => import('../page/server/certifyDetail.vue')
const serverPersonCheck = () => import('../page/server/personCheck.vue')
const serverWebSocket = () => import('../page/server/webSocket.vue')
const serverWebSocket2 = () => import('../page/server/webSocket2.vue')

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
    component: login,
    // beforeEnter: (to, from, next) => {
    //   next()
    // }
  },
  {
    path: '/tokenLogin',
    name: 'tokenLogin',
    component: tokenLogin
  },
  {
    path: '/personIndex',
    name: 'personIndex',
    // component: personIndex
    component: resolve => (require(['../page/personIndex'], resolve)) // 使用require方式懒加载
  },
  {
    path: '/signup',
    name: 'signup',
    // component: signup()
    component: resolve => (require(['../page/signup'], resolve))
  },
  {
    path: '/cont',
    name: 'cont',
    component: cont()
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
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/server',
    // name: 'server',
    // component: serverIndex,
    component: serverIndex,
    children: [
      {
        path: 'uploadDidttm',
        // name: 'uploadDidttm',
        component: serverUploadDidttm
      },
      {
        path: 'certifyDetail',
        component: serverCertifyDetail
      },
      {
        path: 'personCheck',
        component: serverPersonCheck
      },
      {
        path: 'webSocket',
        component: serverWebSocket
      },
      {
        path: 'webSocket2',
        component: serverWebSocket2
      },
      {
        path: 'pvdata',
        component: serverPvData
      },
      {
        path: 'certifyList',
        name: 'certifyList',
        component: certifyList
      },
      {
        path: 'certifyOfServer',
        name: 'certifyOfServer',
        component: certifyOfServer
      },
      {
        path: 'toSignCertify',
        name: 'toSignCertify',
        component: toSignCertify
      },
      {
        path: 'certifyDetail',
        name: 'certifyDetail',
        component: certifyDetail
      },
      {
        path: 'certifyCheck',
        name: 'certifyCheck',
        component: certifyCheck
      },
      {
        path: 'certifySign',
        name: 'certifySign',
        component: certifySign
      },
      {
        path: 'certifyPoster',
        name: 'certifyPoster',
        component: certifyPoster
      }
    ]
  },
]
const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
export default router