const getters = {
  // getAge: state => state.age,
  // getName: state => state.name,
  // getSex: state => state.sex,
  // getColor: state => state.color,
  // getAll: state => state,
  // getAgeFive: (state, payload) => { return state.age + payload.num },
  // getAgeDouble: (state, getAge) => {
  //   return state.age + getAge.getAge
  //   // return 2
  // }
  getName: state => state.name,
  getAvatar: state => state.avatar,
  getUdid: state => state.udid,
  getPvData: state => state.pvData,
  getKeyStore: state => state.keyStore,
  getUserInfo: state => state.userInfo,
}
export default getters
