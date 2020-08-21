import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../page/index.vue'
import login from '../page/login.vue' // 未使用懒加载
const tokenLogin = () => import('../page/loginToken') // 使用import方式懒加载
// const personIndex = () => import('../page/personIndex')
import signup from '../page/signup.vue'
import cont from '../page/cont.vue'
import pvdata from '../page/pvdata.vue'
import staticp from '../page/staticp.vue'
import testTokenSDKClient from '../page/testTokenSDKClient.vue'

import certifyList from '../page/server/certifyList.vue'
import applyCertify from '../page/server/applyCertify.vue'
import certifyOfServer from '../page/server/certifyOfServer.vue'
import toSignCertify from '../page/server/toSignCertify.vue'
import certifyDetail from '../page/server/certifyDetail.vue'
import certifyCheck from '../page/server/certifyCheck.vue'
import certifySign from '../page/server/certifySign.vue'
import certifyPoster from '../page/server/certifyPoster.vue'

import serverIndex from '../page/server/index.vue'
import serverUploadDidttm from '../page/server/uploadDidttm.vue'
import serverPvData from '../page/server/pvdata.vue'
import serverCertifyDetail from '../page/server/certifyDetail.vue'
import serverPersonCheck from '../page/server/personCheck.vue'
import serverWebSocket from '../page/server/webSocket.vue'
import serverWebSocket2 from '../page/server/webSocket2.vue'


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
    beforeEnter: (to, from, next) => {
      // console.log(to, from)
      // to = `${to}?purposeUrl=${from.fullPath}`
      // to.query = {}
      // if ()
      // next(to)
      // to.fullPath = from.fullPath
      // to.query.purposeUrl = from.fullPath
      // console.log(to, from)
      // next(to)
      // to.fullPath += '2345t=dff'
      next()
    }
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
    component: signup
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
    path: '/server',
    // name: 'server',
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
        component: serverPersonCheck,
        // beforeEnter: (to, from, next) => {
        //   console.log(to, from)
        //   next()
        // }
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