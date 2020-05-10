import Vue from 'vue'
import Vuex from 'vuex'
// import state from '../state.js'
// import getters from '../getters.js'
// import mutations from '../mutations.js'
// import actions from '../actions.js'
// import stateone from './pageInfo/state.js'
// import gettersone from './pageInfo/getters.js'
// import mutationsone from './pageInfo/mutations.js'
// import actionsone from './pageInfo/actions.js'

// import statetwo from './userInfo/state.js'
// import getterstwo from './userInfo/getters.js'
// import mutationstwo from './userInfo/mutations.js'
// import actionstwo from './userInfo/actions.js'

import stateUser from './userInfo/state.js'
import gettersUser from './userInfo/getters.js'
import mutationsUser from './userInfo/mutations.js'
import actionsUser from './userInfo/actions.js'

import statePage from './pageInfo/state.js'
import gettersPage from './pageInfo/getters.js'
import mutationsPage from './pageInfo/mutations.js'
import actionsPage from './pageInfo/actions.js'

Vue.use(Vuex)

const userInfo = {
  // namespaced: true,
  // // state,
  // // getters,
  // // mutations,
  // // actions,
  // state: statetwo,
  // getters: getterstwo,
  // mutations: mutationstwo,
  // actions: actionstwo,
  // modules: {
  //   pageInfo: {
  //     namespaced: true,
  //     state: statetwo,
  //     getters: getterstwo,
  //     mutations: mutationstwo,
  //     actions: actionstwo
  //   },
  //   panl: {// 继承父模块的命名空间
  //     namespaced: true,
  //     // state,
  //     // getters,
  //     // mutations,
  //     // actions
  //     state: statetwo,
  //     getters: getterstwo,
  //     mutations: mutationstwo,
  //     actions: actionstwo
  //   }
  // }
  state: stateUser,
  getters: gettersUser,
  mutations: mutationsUser,
  actions: actionsUser
}

// console.log('userInfo', userInfo)

const pageInfo = {
  // namespaced: true,
  // state: stateone,
  // getters: gettersone,
  // mutations: mutationsone,
  // actions: actionsone
  state: statePage,
  getters: gettersPage,
  mutations: mutationsPage,
  actions: actionsPage
}

export default new Vuex.Store({
  modules: {
    pageInfo: pageInfo,
    // pageInfo: Object.assign(
    //   pageInfo,
    //   {namespaced: true},
    //   modules: {
    //     first: Object.assign(
    //       first,
    //       {namespaced: true}
    //     ),
    //   }
    // )
    // pageInfo: {
    //   namespaced: true,
    //   state,
    //   getters,
    //   mutations,
    //   actions,
    //   modules: {
    //     first: {
    //       namespaced: true,
    //       state2,
    //       getters2,
    //       mutations2,
    //       actions2
    //     }
    //   }
    // }
    // first: first
    userInfo
    // pageInfo: pageInfo,
    // modules: {
    //   first: first
    // }
  }
})
