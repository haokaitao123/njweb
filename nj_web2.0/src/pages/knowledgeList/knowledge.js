const konwledge = {
  state: {
    id: '',
	name:'',
	departmentId:'',
  },
  mutations: {
    KonwId(state,id) {
        state.id = id
    },
	KonwName(state,name){
		state.name = name
	},
	KonwDe(state,departmentId){
		 state.departmentId = departmentId
	}
  },
}

export default konwledge