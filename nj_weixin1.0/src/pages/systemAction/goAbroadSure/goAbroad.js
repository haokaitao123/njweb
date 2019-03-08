
const goAbroad = {
  namespaced: true,
  state: {
    cityFlag: false,
    areaContryDis: false,
    passNowareaId: '',
    empprobSelfeva: {},
  },
  mutations: {
    setcityFlag(state,value) {
      state.cityFlag = value
    },
    setareaContryDis(state,value) {
      state.areaContryDis = value
    },
  },
};

export default goAbroad;
