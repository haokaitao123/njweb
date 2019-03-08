const finServicesBoard = {
  namespaced: true,
  state: {
    companyOrderData: {},
    companyOrderNumObj: [],
    OrderClassNumData: {},
    OrderClassNumObj: [],
    companyOrderPriceData: {},
    companyOrderPricePieObj: [],
    OrderClassPriceData: {},
    OrderClassPricePieObj: [],
  },
  mutations: {
    // 按照公司统计工单数量
    setcompanyOrderData(state, value) {
      state.companyOrderData = value
    },
    setcompanyOrderNumObj(state, value) {
      state.companyOrderNumObj = value
    },
    // 按照工单大类统计工单数量
    setOrderClassNumData(state, value) {
      state.OrderClassNumData = value
    },
    setOrderClassNumObj(state, value) {
      state.OrderClassNumObj = value
    },
    // 按照公司统计工单费用
    setcompanyOrderPriceData(state, value) {
      state.companyOrderPriceData = value
    },
    setcompanyOrderPricePieObj(state, value) {
      state.companyOrderPricePieObj = value
    },
    // 按照工单大类统计工单费用
    setOrderClassPriceData(state, value) {
      state.OrderClassPriceData = value
    },
    setOrderClassPricePieObj(state, value) {
      state.OrderClassPricePieObj = value
    },
  },
}

export default finServicesBoard
