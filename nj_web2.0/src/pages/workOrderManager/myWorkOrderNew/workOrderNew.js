/// 存咨询工单
const workOrderNew = {
  namespaced: true,
  state: {
    ProblemTypes: false,
    ProblemTypeName: '',
    ProblemTypeId: '',
    ProblemTypesList: {},
    commonFlowUpdate: false,
    isfunId: '',
    isflowId: '',
    thisStepId: '',
    stepState: '',
    thisPkValue: '',
    orderTypeId: '',
    problemCmwdMarkno: '',
    flowShow: false,
    entryId: '',
  },
  mutations: {
    setProblemTypes(state, value) {
      state.ProblemTypes = value
    },
    setProblemTypeName(state, value) {
      state.ProblemTypeName = value
    },
    setProblemTypeId(state, value) {
      state.ProblemTypeId = value
    },
    setCommonFlowUpdate(state, value) {
      state.commonFlowUpdate = value
    },
    setProblemTypesList(state, value) {
      state.ProblemTypesList = value
    },
    setthisStepId(state, value) {
      state.thisStepId = value
    },
    setstepState(state, value) {
      state.stepState = value
    },
    setthisPkValue(state, value) {
      state.thisPkValue = value
    },
    setisflowId(state, value) {
      state.isflowId = value
    },
    setisfunId(state, value) {
      state.isfunId = value
    },
    setorderTypeId(state, value) {
      state.orderTypeId = value
    },
    setproblemCmwdMarkno(state, value) {
      state.problemCmwdMarkno = value
    },
    setflowShow(state, value) {
      state.flowShow = value
    },
    setentryId(state, value) {
      state.entryId = value
    },
  },
}

export default workOrderNew
