const actions = {
  // addAge: ({commit}, payload) => {
  //   commit('addAge', payload)
  // },
  // modifyName: ({commit}, payload) => {
  //   commit('modifyName', payload)
  // },
  // allData: (context) => {
  //   console.log(context)
  // }
  modifySessionId: ({commit}, payload) => {
    commit('modifySessionId', payload)
  },
  modifyUuid: ({commit}, payload) => {
    commit('modifyUuid', payload)
  },
  modifyAdid: ({commit}, payload) => {
    commit('modifyAdid', payload)
  }
}
export default actions
