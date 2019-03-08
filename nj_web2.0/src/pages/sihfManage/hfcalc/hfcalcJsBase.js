const hfcalcJsBase = {
  namespaced: true,
  state: {
    // 主表数据
    mainTable: [],
    // 子表1数据
    childTable1: [],
    // 主表id
    mainId: '',
    // 子表1id
    childId1: '',
    grandId1: '',
    // 状态
    status: '',
    dataType: '',
    index: 0,
    // 核算轮次下拉数据
    calcround: [],
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
    setGrandId1(state, value) {
      state.grandId1 = value
    },
    setCalcround(state, value) {
      // 核算轮次下拉数据
      state.calcround = value
    },
    setStatus(state, value) {
      // 核算轮次下拉数据
      state.status = value
    },
    setDataType(state, value) {
      state.dataType = value
    },
  },
}

export default hfcalcJsBase
