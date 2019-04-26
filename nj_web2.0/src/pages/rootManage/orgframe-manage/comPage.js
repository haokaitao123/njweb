const commonPage = {
  namespaced: true,
  state: {
    columns: [], // 列表列

  },
  mutations: {
    setColumns(state, value) {
      state.columns = value
    }
  },
}

export default commonPage
