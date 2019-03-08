const platSysMailJS = {
  namespaced: true,
  state: {
    // 主表数据
    mainTable: [],
    // 子表1数据
    childTable1: [],
    // 主表id
    mainId: '',
    flowId: '',
    flowstepId: '',
    // 子表1id
    childId1: '',
    index: 0,
  },
  mutations: {
    setMainTable(state, value) {
      state.mainTable = value
    },
    addNewArrayMainTable(state, res) {
      state.mainTable.unshift(res)
    },
    updateArrayMainTable(state, res) {
      if (state.mainTable.length === 0) {
        state.mainTable.push(res)
      } else {
        state.mainTable.splice(state.index, 1, res)
      }
    },
    setChildTable1(state, value) {
      state.childTable1 = value
    },
    addNewArrayChildTable1(state, res) {
      state.childTable1.unshift(res)
    },
    updateArrayChildTable1(state, res) {
      if (state.childTable1.length === 0) {
        state.childTable1.push(res)
      } else {
        state.childTable1.splice(state.index, 1, res)
      }
    },
    setIndex(state, value) {
      state.index = value
    },
    setMainId(state, value) {
      state.mainId = value
    },
    setChildId1(state, value) {
      state.childId1 = value
    },
    setFlowId(state, value) {
      state.flowId = value
    },
    setFlowstepId(state, value) {
      state.flowstepId = value
    },
  },
}

export default platSysMailJS
