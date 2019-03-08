import Vue from 'vue'
import Vuex from 'vuex'
import myOrderListState from '../pages/systemAction/myOrder/myOrderList/myOrderListState'
import dateList from '../pages/systemAction/programme/dateList'
import Main from '../pages/mainPage/Main'
import appOther from '../pages/appLink/appOther'
import goAbroad from '../pages/systemAction/goAbroadSure/goAbroad'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //
    start:'',
    end:'',
    dateMonthShow:false,
    selectDateTimeStart:localStorage.getItem('dateTime'),
    selectDateTimeEnd:localStorage.getItem('dateTime'),
    warn:'',
    warnNum:'',
    warnType:'',
    warnTitle:'',
    InviteName:[],
    InviteCount:[],
    invPeopleAll: [],
    salaryState: '',
    detail: [],
    socialSecurity: [],
    providentFund: [],
    InfoList: {},
    dateRemove: false
  },
  mutations: {
    dateMonthreveal(state,value) {
      state.dateMonthShow = value
    },
    selectDateTimeStart(state,value){
      state.selectDateTimeStart = value
    },
    selectDateTimeEnd(state,value){
      state.selectDateTimeEnd = value
    },
    startTime(state,value){
      state.start = value
    },
    startEnd(state,value){
      state.end = value
    },
    warn(state,value) {
      state.warn = value
    },
    warnNum(state,value) {
      state.warnNum = value
    },
    warnType(state,value) {
      state.warnType = value
    },
    warnTitle(state,value) {
      state.warnTitle = value
    },
    InviteName(state,value){
      state.InviteName = value
    },
    InviteCount(state,value){
      state.InviteCount = value
    },
    InfoList(state,value){
      state.InfoList = value
      console.log(state.InfoList)
    },
    dateRemove(state,value){
      state.dateRemove = value
    },
    InvPeopleAll(state,value){
      state.invPeopleAll = value
    }
  },
  actions: {

  },
  modules: {
    myOrderListState,
    dateList,
    Main,
    appOther,
    goAbroad,
  }
});

export default store;
