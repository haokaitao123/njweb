const autoSearch = {
  namespaced: true,
  state: {
    row: '',
  },
  mutations: {
    //主表
    setRow(state, value) {
      state.row = value
    },
  },
}

export default autoSearch
