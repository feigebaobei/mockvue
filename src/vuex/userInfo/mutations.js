
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
  modifyName: (state, payload) => {
    state.nickName = payload.nickName
  },
  modifyAvatar: (state, payload) => {
    state.avatar = payload.avatar
  },
  modifyUdid: (state, payload) => {
    state.udid = payload.udid
  },
  modifyUserInfo: (state, payload) => {
    state.pvData.property = payload.userInfo
  },
  modifyPvData: (state, payload) => {
    // console.log('payload', payload)
    state.pvData = payload.pvData
  },
  modifyKeyStore: (state, payload) => {
    state.keyStore = payload.keyStore
  },
  modifyHasPvData: (state, payload) => {
    state.hasPvData = payload.hasPvData
  },
  // modifyUuid: (state, payload) => {
  //   state.uuid = payload.uuid
  // }
}
export default mutations
