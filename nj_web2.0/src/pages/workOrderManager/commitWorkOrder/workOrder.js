const workOrder = {
  namespaced: true,
  state: {
  	tabValue: '',
  	issueListData: [],
    issueListDataOneList: [],
    ChildissueListData: [],
    ChildHotIssueData: [],
    cmwdMarkno: [],
    isfunId: '1126',
  	hotIssueData: [],
  	listTemp: true,
  	detailTemp: false,
  	orderTypeId: '',
  	orderDetail: '',
  	lookBackOrEvalu: true,
  	onlyRecord: true,
  	stepStaus: 0,
  	stepTitle1: '待处理',
  	stepTitle2: '处理中',
  	stepTitle3: '待确认',
  	stepTitle4: '已关闭',
  	content1: '',
  	content2: '',
  	content3: '',
  	content4: '',
    disabledShow: true,
  	disabled2: true,
  	disabled3: true,
  	disabled4: true,
  	allotDetailTemp: true,
  	handleDetailTemp: true,
  	isYesHandle: true,
  	handleClickDetail: '',
  	allotClickDetail: '',
  	isCommit: true,
    cmutKntypeBusprop: '',  //   流程属性
  	//我的工单沟通记录
  	myCommunRecordData: [],
  	//分配工单沟通记录
  	allotCommunRecordData: [],
  	//处理工单沟通记录
  	handleCommunRecordData: [],
  	//徽章数
  	allTotal: 0,
  	noAllotTotal: 0, // 工单待分配
  	noHandleTotal: 0, // 工单待接单
  	handleIngTotal: 0, // 工单处理中数据
  	// 员工端导航切换
  	witchItem: 'myorder',
  	//员工端我的工单或提交工单
  	isMyOrder: true,
  	//处理工单导航切换
  	handleWitchItem: 'nohandle',
  	//处理的状态
  	nHandle: true,
		Handlei: false,
		yHandle: false,
    orderBusiPro: '', /// "02busprocess"
    btnShow: '',  // 控制查询按钮的显示与隐藏
    cmutKntypeName: '',
    childShow: false,
  },
  mutations: {
  	//切换tab页
    switchTab(state, value) {
    	state.tabValue = value
    	if (value === 'name1') {
    		state.disabled2 = true
    		state.disabled3 = true
    		state.disabled4 = true
        state.disabledShow = true
    	} else if (value === 'name2') {
    		state.disabled2 = false
    		state.disabled3 = true
    		state.disabled4 = true
        state.disabledShow = true
    	} else if (value === 'name3') {
    		state.disabled2 = false
    		state.disabled3 = false
    		state.disabled4 = true
        state.disabledShow = true
    	} else if (value === 'name4') {
    		state.disabled2 = false
    		state.disabled3 = false
    		state.disabled4 = false
    	}
    },
    //设置问题类型
    setIssueListData(state, value) {
    	state.issueListData = value
    },
    setChildIssueListData(state, value) {
    	state.ChildissueListData = value
    },
    setChildHotIssueData(state, value) {
    	state.ChildHotIssueData = value
    },
    setCmutKntypeName(state, value) {
    	state.cmutKntypeName = value
    },
    setChildShow(state, value) {
    	state.childShow = value
    },
    //设置切换我的订单中的组件
    setOrderTemp(state, value) {
    	if (value === 'list') {
    		state.listTemp = true
    		state.detailTemp = false
    	} else if (value === 'detail') {
    		state.listTemp = false
    		state.detailTemp = true
    	}
    },
    //存一条数据进行判断是否显示业务流程
    setIssueListDataOneList(state, value) {
      state.issueListDataOneList = value
    },
    //存一条流程属性传给后台
    setCmutKntypeBusprop(state, value) {
      state.cmutKntypeBusprop = value
    },
    setIsfunId(state, value) {
      state.isfunId = value
    },
    setCmwdMarkno(state, value) {
      state.cmwdMarkno = value
    },
    setCmwdMarknoId(state, value) {
      state.cmwdMarkno = value
    },
    setOrderBusiPro(state, value) {
      state.orderBusiPro = value
    },
    setDisabledShow(state, value) {
      state.disabledShow = value
    },
    setbtnShow(state, value) {
      state.btnShow = value
    },
    //提交订单时设置问题分类id
    setorderTypeId(state, value) {
    	state.orderTypeId = value
    },
    //设置热点文章
    setHotIssueData(state, value) {
    	state.hotIssueData = value
    },
    //查看订单详情
    seachOrderDetail(state, value) {
    	state.orderDetail = value
    },
    //切换反馈和评价页面
    setBackOrEvalu(state, value) {
    	state.lookBackOrEvalu = value
    },
    //已关闭时只显示记录
    setOnlyRecord(state, value) {
    	state.onlyRecord = value
    },
    //设置步骤条状态
    setStepStaus(state, value) {
    	state.stepStaus = value
    },
    //设置步骤标题
    setStepTitle1(state, value) {
    	state.stepTitle1 = value
    },
    setStepTitle2(state, value) {
    	state.stepTitle2 = value
    },
    setStepTitle3(state, value) {
    	state.stepTitle3 = value
    },
    setStepTitle4(state, value) {
    	state.stepTitle4 = value
    },
    //设置步骤内容
    setStepContent1(state, value) {
    	state.content1 = value
    },
    setStepContent2(state, value) {
    	state.content2 = value
    },
    setStepContent3(state, value) {
    	state.content3 = value
    },
    setStepContent4(state, value) {
    	state.content4 = value
    },
    //查看分配详情
    setAllotDetail(state, value) {
    	if (value === true) {
    		state.allotDetailTemp = true
    	} else {
    		state.allotDetailTemp = false
    	}
      // state.allotDetailTemp = false
    },
    //查看处理详情
    setHandleDetail(state, value) {
    	if (value === true) {
    		state.handleDetailTemp = true
    	} else {
    		state.handleDetailTemp = false
    	}
    },
    //处理详情是否显示反馈
    setIsYesHandle(state, value) {
    	if (value === true) {
    		state.isYesHandle = true
    	} else {
    		state.isYesHandle = false
    	}
    },
    //处理详情的提交按钮
    setIsCommit(state, value) {
    	if (value === true) {
    		state.isCommit = true
    	} else {
    		state.isCommit = false
    	}
    },
    //处理工单点击详情
    setHandleClick(state, value) {
    	state.handleClickDetail = value
    },
    //分配工单点击详情
    setAllotClick(state, value) {
    	state.allotClickDetail = value
    },
    //设置我的工单沟通记录
    setMyOrderRecordData(state, value) {
    	state.myCommunRecordData = value
    },
    //设置分配工单沟通记录
    setAllotRecordData(state, value) {
    	state.allotCommunRecordData = value
    },//设置处理工单沟通记录
    setHandleRecordData(state, value) {
    	state.handleCommunRecordData = value
    },
    //设置反馈、确认条数
    setAllTotal(state, value) {
    	state.allTotal = value
    },
    //切换员工端的导航
    setWitchItem(state, value) {
    	state.witchItem = value
    },
    //切换我的工单和提交工单
    setIsMyOrder(state, value) {
    	state.isMyOrder = value
    },
    //设置未分配的数量
    setNoAllotToatl(state, value) {
    	state.noAllotTotal = value
    },
    //设置未处理的数量
    setNoHandleTotal(state, value) {
    	state.noHandleTotal = value
    },
    //设置处理中数量
    setHandleIngTotal(state, value) {
    	state.handleIngTotal = value
    },
    //切换处理工单服务的导航
    setHandleItem(state, value) {
    	state.handleWitchItem = value
    	if (value === 'nohandle') {
				state.nHandle = true
				state.Handlei = false
				state.yHandle = false
			} else if (value === 'handleing') {
				state.nHandle = false
				state.Handlei = true
				state.yHandle = false
			} else if (value === 'yeshandle') {
				state.nHandle = false
				state.Handlei = false
				state.yHandle = true
			}
    },
  },
}

export default workOrder
