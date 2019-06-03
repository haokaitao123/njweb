const recruitProcess = {
  namespaced: true,
  state: {
    entry: 'true',
  },
  mutations: {
    //主表
    setEntry(state, value) {
      state.entry = value
    },
  },
}

export default recruitProcess
