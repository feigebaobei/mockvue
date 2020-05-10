// import {type, a, b, arr} from './mutation-types.js'
// console.log(arr[0])
const mutations = {
  // addAge: (state, payload) => {
  //   state.age += payload.num
  // },
  // // deAge: (state, payload) => {
  // //   console.log('age: ', state.age)
  // //   console.log('age不能减。')
  // // },
  // modifyName: (state, payload) => {
  //   state.name = payload.name
  // },
  // // [type.first]: (state) => {
  // //   state.age += 5
  // // },
  // // [a]: (state) => {
  // //   state.age += 2
  // // },
  // // [b]: (state) => {
  // //   state.age += 3
  // // },
  // // [arr[0]]: (state) => {
  // //   state.age += 4
  // // }
  modifySessionId: (state, payload) => {
    state.common.sessionId = payload.sessionId
  },
  modifyUuid: (state, payload) => {
    state.common.uuid = payload.uuid
  },
  modifyAdid: (state, payload) => {
    state.common.adid = payload.adid
  }
}
export default mutations
