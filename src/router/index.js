import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../page/index.vue'
import login from '../page/login.vue'
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
        component: serverPersonCheck
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