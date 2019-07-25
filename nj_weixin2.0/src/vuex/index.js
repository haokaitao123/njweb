import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    empId: '',
    loading: false,
    contractRenewal: '',
    attenMonthrevi: '',
    pIndexKey: '',
	tipNum: 0
  },
  mutations: {
    setEmpId(state, value) {
      state.empId = value
    },
    showLoading(state) {
      state.loading = true
    },
    hideLoading(state) {
      state.loading = false
    },
    setContractRenewal(state, value) {
      state.contractRenewal = value
    },
    setAttenMonthrevi(state, value) {
      state.attenMonthrevi = value
    },
    setPIndexKey(state, value) {
      state.pIndexKey = value;
    },
    tabarTip(state,value){
			state.tipNum = value
	}
  },
  actions: {

  },
  modules: {

  }
});

export default store;
