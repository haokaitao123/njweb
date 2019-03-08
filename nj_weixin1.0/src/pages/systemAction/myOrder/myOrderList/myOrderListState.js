
const myOrderListState = {
  namespaced: true,
  state: {
    dateMonthreveal: false,
    selectDateTime: '',
    note: '',
    impUrl: [],
    orderListFrom: {
      cmwdPriority: '01common', // 优先级
      cmwdDesc: '',
      cmwdConfidentialinfo: '', // 机密信息
      cmwdExpfeedbacktime: '', // 期望反馈时间
      cmwdMobile: localStorage.getItem('wx_mobile'), // 手机号
      cmwdSmsprom: '', // 短信接收时段
      cmwdMail: localStorage.getItem('wx_email'), // 邮箱
      cmwdAttach: '', // 附件
      cmwdStatus: '01waiting', // 默认
      cmwdProperty: '01manual', // 默认
      cmwdType: '', // 类型Id
      cmwdWotypeprop: '01consultation', // 默认咨询工单
    },
  },
  mutations: {
    setDateMonthreveal(state,value) {
      state.dateMonthreveal = value
    },
    setSelectDateTime(state,value) {
      state.orderListFrom.cmwdExpfeedbacktime = value
    },
  },
};

export default myOrderListState;
