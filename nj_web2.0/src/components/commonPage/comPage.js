  const commonPage = {
  namespaced: true,
  state: {
    columns: [], // 列表列
    params: {},
    childColumns: [],
    childParams: {},
  },
  mutations: {
    setColumns(state, value) {
      state.columns = value
    },
    setParams(state, value) {
      state.params = value
    },
    setChildColumns(state, value) {
      state.childColumns = value
    },
    setChildParams(state, value) {
      state.childParams = value
    },
  },
}

export default commonPage
