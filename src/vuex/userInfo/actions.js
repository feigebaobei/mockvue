const actions = {
  // addAge: ({commit}, payload) => {
  //   commit('addAge', payload)
  // },
  modifyName: ({commit}, payload) => {
    commit('modifyName', payload)
  },
  modifyAvatar: ({commit}, payload) => {
    commit('modifyAvatar', payload)
  },
  modifyUdid: ({commit}, payload) => {
    commit('modifyUdid', payload)
  },
  modifyPvData: ({commit}, payload) => {
    commit('modifyPvData', payload)
  },
  modifyKeyStore: ({commit}, payload) => {
    commit('modifyKeyStore', payload)
  },
  modifyHasPvData: ({commit}, payload) => {
    commit('modifyHasPvData', payload)
  },
  modifyUserInfo: ({commit}, payload) => {
    commit('modifyUserInfo', payload)
  },
  // modify
  // allData: (context) => {
  //   console.log(context)
  // }
}
export default actions
