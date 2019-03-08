const atsk = {
  namespaced: true,
  state: {
    childId1: '',
    atskdfMailvar: '',
    atskdfSurveyvar: '',
    atskdfSmsvar: '',
    atskdfWxvar: '',
    atskdfMailvar1: '',
    atskdfSurveyvar1: '',
    atskdfSmsvar1: '',
    atskdfWxvar1: '',
  },
  mutations: {
    setChildId1(state, value) {
      state.childId1 = value
    },
    setTempAlert(state, value) {
      state.atskdfMailvar = ''
      state.atskdfSurveyvar = ''
      state.atskdfSmsvar = ''
      state.atskdfWxvar = ''
    	if (value.indexOf('01mail') !== -1) {
    		state.atskdfMailvar = value
    	}
    	if (value.indexOf('02message') !== -1) {
        state.atskdfSmsvar = value
    	}
    	if (value.indexOf('03survey') !== -1) {
        state.atskdfSurveyvar = value
    	}
    	if (value.indexOf('04weixin') !== -1) {
        state.atskdfWxvar = value
    	}
    },
    setTempVar(state, value) {
    	state.atskdfMailvar1 = value.atskMailtemp
    	state.atskdfSurveyvar1 = value.atskSurvey
    	state.atskdfSmsvar1 = value.atskSms
      state.atskdfWxvar1 = value.atskWx
//  	if (param.flag === 'mail') {
//  		state.atskdfMailvar1 = param.value
//  		state.atskdfSurveyvar1 = ''
//  		state.atskdfSmsvar1 = ''
//  	}
//  	if (param.flag === 'sms') {
//  		state.atskdfSurveyvar1 = param.value
//  		state.atskdfMailvar1 = ''
//  		state.atskdfSmsvar1 = ''
//  	}
//  	if (param.flag === 'sur') {
//  		state.atskdfSmsvar1 = param.value
//  		state.atskdfMailvar1 = ''
//  		state.atskdfSurveyvar1 = ''
//  	}
    },
  },
}

export default atsk
