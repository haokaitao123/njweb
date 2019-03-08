
const dateList = {
  namespaced: true,
  state: {
    dataList:{},
    warnTime:false,
    invitTime:false,
    EdinvitTime:false,
    peoRows: 60,
    invPeopleAll: []
  },
  mutations: {
    setDataList(state,value){
      state.dataList = value
    },
    setwarnTime(state,value){
      state.warnTime = value
    },
    setInvitTime(state,value){
      state.invitTime = value
    },
    setEdinvitTime(state,value){
      state.invitTime = value
    },
    setpeoRows(state,value){
      state.peoRows = value
    },
    setInvPeopleAll(state,value){
      state.invPeopleAll = value
    },
  },
};

export default dateList;
