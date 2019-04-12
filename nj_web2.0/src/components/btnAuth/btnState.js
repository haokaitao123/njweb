/**
 * Created by cy on 2019/03/27.
 */
const btnOperate = {
  namespaced: true,
  state: {
    btnData: [],
    btnOperate: '',
    modity: '',
    pageOperate: [],
    pageShow: '',
    tableButton: '',
    tableOperate: true,
    isFlowNode: '',
    searchLoading: false
  },
  mutations: {
    setBtnData(state, value) {
      state.btnData = value
    },
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
    },
    setTableButton(state, value) {
      state.tableButton = value
    },
    setTableOperate(state, value) {
      state.tableOperate = value
    },
    setTableOperate(state, value) {
      state.tableOperate = value
    },
    setIsFlowNode(state, value) {
      state.isFlowNode = value
    },
    setSearchLoading(state, value) {
      state.searchLoading = value
    }
  },
  actions: {
    SEtPAGESHOW(context) {
      context.commit("setPageShow");
    },
  }
}

export default btnOperate
