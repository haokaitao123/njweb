const commonFlowButton = {
  namespaced: true,
  state: {
    saveLoading: false,
    submitLoading: false
  },
  mutations: {
    setSaveLoading(state, value) {
      state.saveLoading = value
    },
    setSubmitLoading(state, value) {
      state.submitLoading = value
    },
  },
}

export default commonFlowButton
