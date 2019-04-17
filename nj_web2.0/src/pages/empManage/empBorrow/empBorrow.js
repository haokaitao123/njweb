const empBorrow = {
  namespaced: true,
  state: {
    // 主表id
    mainId: '',
    logType: ''
  },
  mutations: {
    setMainId(state, value) {
      state.mainId = value
    },
    setLogType(state, value) {
      state.logType = value
    },
  },
}

export default empBorrow
