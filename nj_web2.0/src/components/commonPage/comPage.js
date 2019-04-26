const commonPage = {
  namespaced: true,
  state: {
    columns: [], // 列表列
    params: {}
  },
  mutations: {
    setColumns(state, value) {
      state.columns = value
    },
    setParams(state, value) {
      state.params = value
    }
  },
}

export default commonPage
