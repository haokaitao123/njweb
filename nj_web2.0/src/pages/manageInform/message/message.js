const message = {
  namespaced: true,
  state: {
  	titleName: '',
  	content: '',
  	clickDown: '',
  	filekey: '',
  	read1: '',
  	read2: '',
  	read3: '',
  	read4: '',
  	isread: '',
  },
  mutations: {
    setValue(state, value) {
    	state.content = value.msgContent
    	state.titleName = value.msgTitle
    	if (value.msgAttachment) {
    		state.clickDown = value.msgAttachment.split(':')[0]
    		state.filekey = value.msgAttachment.split(':')[1]
    	} else {
    		state.clickDown = ''
    		state.filekey = ''
    	}
    },
    readIndex(state, value) {
    	if (value === 'r1') {
    		state.read1 = true
    		state.read2 = false
    		state.read3 = false
    		state.read4 = false
    	}
    	if (value === 'r2') {
    		state.read1 = false
    		state.read2 = true
    		state.read3 = false
    		state.read4 = false
    	}
    	if (value === 'r3') {
    		state.read1 = false
    		state.read2 = false
    		state.read3 = true
    		state.read4 = false
    	}
    	if (value === 'r4') {
    		state.read1 = false
    		state.read2 = false
    		state.read3 = false
    		state.read4 = true
    	}
    },
    isRead(state, value) {
    	if (value === 'is1') {
    		state.isread = 'unread'
    	} else if (value === 'is2') {
    		state.isread = 'readed'
    	}
    },
  },
}

export default message
