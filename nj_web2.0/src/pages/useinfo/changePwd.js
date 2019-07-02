/**
 * Created by cy on 2019/03/27.
 */
const changePwd = {
  namespaced: true,
  state: {
    status: false,
  },
  mutations: {
    setChangePwd(state, value) {
      state.status = value
    },
  },
}

export default changePwd
