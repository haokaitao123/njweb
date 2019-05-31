const empMaster = {
  namespaced: true,
  state: {
    mainId: '', // 主表id
    logType: '', // 主表操作类型
    childId: '', //子表id
    childLogType: '', //子表操作类型
    deptId: '' // 部门Id
  },
  mutations: {
    //主表
    setMainId(state, value) {
      state.mainId = value
    },
    setLogType(state, value) {
      console.log(value, "value")
      state.logType = value
    },
    //子表
    setChildId(state, value) {
      state.childId = value
    },
    setChildLogType(state, value) {
      state.childLogType = value
    },
    //设置部门Id
    setDeptId(state, value) {
      state.deptId = value
    }
  },
}

export default empMaster
