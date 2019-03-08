/**
 * Created by xionglei on 2018/12/25.
 */
const flowClmkMap = {
  namespaced: true,
  state: {
   // 弹出选择，(物理列表名称: 字段名称)
    clmkvMap: {},
    // 该步骤，所有表单，布局为弹出框的数据 key, value
    popForm: {}
  },
  mutations: {
    setClmkvMap(state, value) {
      state.clmkvMap = value
    },
    setPopForm(state, value) {
      state.popForm = value
    },
  },
}

export default flowClmkMap
