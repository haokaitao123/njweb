import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		empId: '',
		loading: false,
		contractRenewal: '',
		pIndexKey: '',
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
		setPIndexKey(state, value) {
			state.pIndexKey = value;
		}
	},
	actions: {

	},
	modules: {

	}
});

export default store;
