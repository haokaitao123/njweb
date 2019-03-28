/**
 * Created by cy on 2019/03/27.
 */
const btnOperate = {
  namespaced: true,
  state: {
    btnOperate: '',
    modity: '',
    pageOperate: [],
    pageShow: ''
  },
  mutations: {
    setbtnOperate(state, value) {
      state.btnOperate = value
    },
    setModity(state, value) {
      state.modity = value
    },
    setPageOperate(state, value) {
      state.pageOperate = value
    },
    setPageShow(state, value) {
      state.pageShow = value
    }
  },
}

export default btnOperate
