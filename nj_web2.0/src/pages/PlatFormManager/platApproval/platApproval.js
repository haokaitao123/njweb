/**
 * Created by Aaron on 2018/1/19.
 */
const platApproval = {
  namespaced: true,
  state: {
    // 主表数据
    mainTable: [],
    // 子表1数据
    childTable1: [],
    // 邮件list
    childTable2: [],
    // 子表3数据
    childTable3: [],
    // 子表4数据
    childTable4: [],
    // 子表5数据
    childTable5: [],
    // 子表6数据
    childTable6: [],
    // 邮件变量子表
    childTable7: [],
    // 短信变量子表
    childTable8: [],
    // 微信变量子表
    childTable9: [],
    // 主表id
    mainId: '',
    // 主表操作日志 新增 /修改
    mainLogType: '',
    // 子表1id
    childId1: '',
    // 子表2id
    childId2: '',
    // 子表3id
    childId3: '',
    // 子表4id
    childId4: '',
    // 子表5id
    childId5: '',
    // 子表6id
    childId6: '',
    // 邮件变量子表id
    childId7: '',
    // 短信变量子表id
    childId8: '',
    // 微信变量子表id
    childId8: '',
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
      console.log(res)
      state.childTable3.unshift(...res)
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
    // 邮件变量子表
    setChildTable7(state, value) {
      state.childTable7 = value
    },
    addNewArrayChildTable7(state, res) {
      state.childTable7.unshift(res)
    },
    updateArrayChildTable7(state, res) {
      if (state.childTable7.length === 0) {
        state.childTable7.push(res)
      } else {
        state.childTable7.splice(state.index, 1, res)
      }
    },
    // 短信变量子表
    setChildTable8(state, value) {
      state.childTable8 = value
    },
    addNewArrayChildTable8(state, res) {
      state.childTable8.unshift(res)
    },
    updateArrayChildTable8(state, res) {
      if (state.childTable8.length === 0) {
        state.childTable8.push(res)
      } else {
        state.childTable8.splice(state.index, 1, res)
      }
    },
    // 微信变量子表
    setChildTable9(state, value) {
      state.childTable9 = value
    },
    addNewArrayChildTable9(state, res) {
      state.childTable9.unshift(res)
    },
    updateArrayChildTable9(state, res) {
      if (state.childTable9.length === 0) {
        state.childTable9.push(res)
      } else {
        state.childTable9.splice(state.index, 1, res)
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
    setChildId8(state, value) {
      state.childId8 = value
    },
    setChildId9(state, value) {
      state.childId9 = value
    },
    setmainLogType(state, value) {
      state.mainLogType = value
    },
  },
}

export default platApproval
