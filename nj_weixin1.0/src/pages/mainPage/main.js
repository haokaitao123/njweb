
const Main = {
  namespaced: true,
  state: {
    childFlag:false,
    allOnline_save:[]
  },
  mutations: {
    setChildFlag(state,value) {
      state.childFlag = value
    },
    setAllOnline(state,value) {
      state.allOnline_save = value
    },
  },
};

export default Main;
