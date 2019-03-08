/**
 * Created by Aaron on 2018/1/19.
 */
const flowStepData = {
  namespaced: true,
  state: {
    // 主表数据
    mainTable: [],
    // 数据块
    childTable1: [],
    // 文档
    childTable2: [],
    // 邮件
    childTable3: [],
    // 文档变量
    childTable4: [],
    // 邮件联系人
    childTable5: [],
    // 短信
    childTable6: [],
    // 短信联系人
    childTable7: [],
    // 主表id
    flowId: '',
    mainId: '',
    // 子表1id
    childId1: '',
    childId2: '',
    childId3: '',
    childId4: '',
    childId5: '',
    childId6: '',
    childId7: '',
    index: 0,
    // 控制步骤信息是否显示
    flstepDisorder: '',
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
    setChildTable2(state, value) {
      state.childTable2 = value
    },
    addNewArrayChildTable2(state, res) {
      state.childTable2.unshift(res)
    },
    updateArrayChildTable2(state, res) {
      if (state.childTable2.length === 0) {
        state.childTable2.push(res)
      } else {
        state.childTable2.splice(state.index, 1, res)
      }
    },
    setChildTable3(state, value) {
      state.childTable3 = value
    },
    addNewArrayChildTable3(state, res) {
      state.childTable3.unshift(res)
    },
    updateArrayChildTable3(state, res) {
      if (state.childTable3.length === 0) {
        state.childTable3.push(res)
      } else {
        state.childTable3.splice(state.index, 1, res)
      }
    },
    setChildTable4(state, value) {
      state.childTable4 = value
    },
    addNewArrayChildTable4(state, res) {
      state.childTable4.unshift(res)
    },
    updateArrayChildTable4(state, res) {
      if (state.childTable4.length === 0) {
        state.childTable4.push(res)
      } else {
        state.childTable4.splice(state.index, 1, res)
      }
    },
    setChildTable5(state, value) {
      state.childTable5 = value
    },
    addNewArrayChildTable5(state, res) {
      state.childTable5.unshift(...res)
    },
    updateArrayChildTable5(state, res) {
      if (state.childTable5.length === 0) {
        state.childTable5.push(res)
      } else {
        state.childTable5.splice(state.index, 1, res)
      }
    },
    setChildTable6(state, value) {
      state.childTable6 = value
    },
    addNewArrayChildTable6(state, res) {
      state.childTable6.unshift(res)
    },
    updateArrayChildTable6(state, res) {
      if (state.childTable6.length === 0) {
        state.childTable6.push(res)
      } else {
        state.childTable6.splice(state.index, 1, res)
      }
    },
    setChildTable7(state, value) {
      state.childTable7 = value
    },
    addNewArrayChildTable7(state, res) {
      state.childTable7.unshift(...res)
    },
    updateArrayChildTable7(state, res) {
      if (state.childTable7.length === 0) {
        state.childTable7.push(res)
      } else {
        state.childTable7.splice(state.index, 1, res)
      }
    },
    setIndex(state, value) {
      state.index = value
    },
    setMainId(state, value) {
      state.mainId = value
    },
    setflstepDisorder(state, value) {
      state.flstepDisorder = value
    },
    setChildId1(state, value) {
      state.childId1 = value
    },
    setChildId2(state, value) {
      state.childId2 = value
    },
    setChildId3(state, value) {
      state.childId3 = value
    },
    setChildId4(state, value) {
      state.childId4 = value
    },
    setChildId5(state, value) {
      state.childId5 = value
    },
    setChildId6(state, value) {
      state.childId6 = value
    },
    setChildId7(state, value) {
      state.childId7 = value
    },
    setFlowId(state, value) {
      state.flowId = value
    },
  },
}

export default flowStepData
