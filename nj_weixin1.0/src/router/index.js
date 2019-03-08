import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import testParams from '@/pages/testparameter'
import wxLoginRedirectUrl from '@/pages/wxLoginRedirectUrl'
import mains from '@/pages/mainPage/mainView'
import spectaculars from '@/pages/mainPage/spectaculars'
import Online from '@/pages/mainPage/Online'
import mainActions from '@/pages/mainPage/mainAction'
import mainMine from '@/pages/mainPage/mainMine'
import salary from '@/pages/salary/salary'
import salaryChild from '@/pages/salary/salary'
import salaryBase from '@/pages/salary/salaryBase'
import salaryDetail from '@/pages/salary/salaryDetail'
import socialSecurity from '@/pages/socialSecurity/socialSecurity'
import socialSecurityChild from '@/pages/socialSecurity/socialSecurity'
import socialSecurityBase from '@/pages/socialSecurity/socialSecurityBase'
import socialSecurityDetail from '@/pages/socialSecurity/socialSecurityDetail'
import providentFund from '@/pages/providentFund/providentFund'
import providentFundChild from '@/pages/providentFund/providentFund'
import providentFundBase from '@/pages/providentFund/providentFundBase'
import providentFundDetail from '@/pages/providentFund/providentFundDetail'

import InformNotice from '@/pages/systemAction/informNotice/informNotice'
import backlogMatter from '@/pages/systemAction/backlogMatter/backlogMatter'
import LeaveApproval from '@/pages/systemAction/backlogMatter/LeaveApproval/LeaveApproval'
import approvalSet from '@/pages/systemAction/backlogMatter/approvalSet/approvalSet'
import redeployApproval from '@/pages/systemAction/backlogMatter/redeployApproval/redeployApproval'
import InformDetails from '@/pages/systemAction/informNotice/informDetails'
import policySystem from '@/pages/systemAction/policySystem/policySystem'
import policyDetails from '@/pages/systemAction/policySystem/policyDetails'
import entrySubmit from '@/pages/systemAction/entrySubmit/entrySubmit'
import probationPeriod from '@/pages/systemAction/ProbationPeriod/probationPeriod'
import probationPeriodChild from '@/pages/systemAction/ProbationPeriod/probationPeriod'
import probationPeriodList from '@/pages/systemAction/ProbationPeriod/probationPeriodList'
import internaltransferConfirm from '@/pages/systemAction/internaltransferConfirm/internaltransferConfirm'
import internaltransferConfirmChild from '@/pages/systemAction/internaltransferConfirm/internaltransferConfirm'
import internaltransferConfirmList from '@/pages/systemAction/internaltransferConfirm/internaltransferConfirmList'
import about from '@/pages/mine/about.vue'
import customerService from '@/pages/mine/service/customerService.vue'
import flowContract from '@/pages/systemAction/flowContract/flowContract'
import flowContractChild from '@/pages/systemAction/flowContract/flowContract'
import flowContractList from '@/pages/systemAction/flowContract/flowContractList'
import responsibleTask from '@/pages/systemAction/programme/responsibleTask'
import teamMemberList from '@/pages/systemAction/teamMember/teamMemberList'
import teamMemberDetails from '@/pages/systemAction/teamMember/teamMemberDetails'
import personInfoDetails from '@/pages/systemAction/personInfo/personInfoDetails'
import fireMemberList from '@/pages/systemAction/fireMember/fireMemberList'
import fireMemberDetails from '@/pages/systemAction/fireMember/fireMemberDetails'
import subordinateList from '@/pages/systemAction/fireMember/subordinateList'
import dimissionList from '@/pages/systemAction/flowDimission/dimissionList'
import dimissionListChild from '@/pages/systemAction/flowDimission/dimissionList'
import dimissionDetails from '@/pages/systemAction/flowDimission/dimissionDetails'
import dimissionsubordinateList from '@/pages/systemAction/flowDimission/dimissionsubordinateList'
import probaMemberList from '@/pages/systemAction/probaMember/probaMemberList'
import probaMemberDetails from '@/pages/systemAction/probaMember/probaMemberDetails'
import contrMemberList from '@/pages/systemAction/contrMember/contrMemberList.vue'
import contrMemberDetails from '@/pages/systemAction/contrMember/contrMemberDetails.vue'

import goAbroadSureDetails from '@/pages/systemAction/goAbroadSure/goAbroadSureDetails'
import goAbroadSureList from '@/pages/systemAction/goAbroadSure/goAbroadSureList'

import goAbroadPreLis from '@/pages/systemAction/goAbroadPreparation/goAbroadSureList'
import goAbroadPreDet from '@/pages/systemAction/goAbroadPreparation/goAbroadSureDetails'


import backHome from '@/pages/systemAction/backHome/goAbroadSureDetails'
import backHomeList from '@/pages/systemAction/backHome/goAbroadSureList'
import backHomeInformation from '@/pages/systemAction/backHomeInformation/goAbroadSureDetails'
import backHomeInformationList from '@/pages/systemAction/backHomeInformation/goAbroadSureList'

import dateDetails from '@/pages/systemAction/programme/dateDetails'
import EditdateDetails from '@/pages/systemAction/programme/EditdateDetails'
import warn from '@/pages/systemAction/programme/warn'
import invitePeople from '@/pages/systemAction/programme/invitePeople'
import myOrderList from '@/pages/systemAction/myOrder/myOrderList/myOrderList'
import orderDetails from '@/pages/systemAction/myOrder/myOrderList/orderDetails'
import evaluate from '@/pages/systemAction/myOrder/evaluate/evaluate'
import OrderMessage from '@/pages/systemAction/myOrder/OrderMessage/OrderMessage'
import submitOrder from '@/pages/systemAction/myOrder/myOrderList/submitOrder'
import OrderList from '@/pages/systemAction/myOrder/myOrderList/OrderList'
import dateManage from '@/pages/systemAction/programme/dateManage'
import dateTaskManage from '@/pages/systemAction/programme/dateTaskManage'
import TakeResponsibleTask from '@/pages/systemAction/ParticipateManage/TakeResponsibleTask'
import TakeDateManage from '@/pages/systemAction/ParticipateManage/TakeDateManage'
import TakedateTaskManage from '@/pages/systemAction/ParticipateManage/TakedateTaskManage'
import setPassword from '@/pages/mine/setPassword/setPassword'
import newPassword from '@/pages/mine/setPassword/newPassword'

import appLink from '@/pages/appLink/appLink'
import surveyOne from '@/pages/appSurvey/surveyOne'
import surveyTwo from '@/pages/appSurvey/surveyTwo'
import evaluateView from '@/pages/evaluateView/evaluateView'
// 知识点详情
import knowledgeView from '@/pages/knowledgeView/knowledgeView'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{
        vShow: true
      }
    },
    {
      path: '/testparam',
      name: 'testParams',
      component: testParams,
      meta:{
        vShow: true
      }
    },
    {
      path: '/wxloginredirect',
      name: 'wxLoginRedirectUrl',
      component: wxLoginRedirectUrl,
      meta:{
        vShow: true
      }
    },
    {
      path:'/',
      name:'mains',
      component:mains,
      meta:{
        vShow: true
      },
      children:[
        {
          path: '/mains/spectaculars',
          name: 'spectaculars',
          component: spectaculars,
		      meta:{
		        vShow: true,
            title: "看板"
		      }
        },
        {
          path: '/mains/Online',
          name: 'Online',
          component: Online,
		      meta:{
		        vShow: true,
            title: "HR助理"
		      },
          children:[
            {
              path:'/mains/Online/knowledgeView',
              name:'knowledgeView',
              component:knowledgeView,
              meta:{
                vShow: true,
                title:'知识库详情'
              }
            },
            {
              path:'/mains/Online/internaltransferConfirmChild',
              name:'internaltransferConfirmChild',
              component:internaltransferConfirmChild,
              meta:{
                vShow: true,
                title:'调动确认'
              }
            },
            {
              path:'/mains/Online/flowContractChild',
              name:'flowContractChild',
              component:flowContractChild,
              meta:{
                vShow: true,
                title:'续签自评'
              }
            },
            {
              path:'/mains/Online/probationPeriodChild',
              name:'probationPeriodChild',
              component:probationPeriodChild,
              meta:{
                vShow: true,
                title:'转正自评'
              }
            },
            {
              path:'/mains/Online/dimissionListChild',
              name:'dimissionListChild',
              component:dimissionListChild,
              meta:{
                vShow: true,
                title:'离职申请'
              }
            },
            {
              path:'/mains/Online/salaryChild',
              name:'salaryChild',
              component:salaryChild,
              meta:{
                vShow: true,
                title:'薪资查询'
              }
            },
            {
              path:'/mains/Online/socialSecurityChild',
              name:'socialSecurityChild',
              component:socialSecurityChild,
              meta:{
                vShow: true,
                title:'社保查询'
              }
            },
            {
              path:'/mains/Online/providentFundChild',
              name:'providentFundChild',
              component:providentFundChild,
              meta:{
                vShow: true,
                title:'公积金查询'
              }
            },
            {
              path:'/mains/Online/teamMemberList',
              name:'teamMemberList',
              component:teamMemberList,
              meta:{
                vShow: true,
                title:'我的团队成员'
              }
            },
            {
              path:'/mains/Online/contrMemberList',
              name:'contrMemberList',
              component:contrMemberList,
              meta:{
                vShow: true,
                title:'续签评估'
              }
            },
            {
              path:'/mains/Online/probaMemberList',
              name:'probaMemberList',
              component:probaMemberList,
              meta:{
                vShow: true,
                title:'转正评估'
              }
            },
            {
              path:'/mains/Online/fireMemberList',
              name:'fireMemberList',
              component:fireMemberList,
              meta:{
                vShow: true,
                title:'离职发起'
              }
            },
          ]
        },
        {
          path:'/mains/mainActions',
          name:'mainActions',
          component:mainActions,
          meta:{
		        vShow: true,
            title: "功能"
		      }
        },
        {
          path:'/mains/mainMine',
          name:'mainMine',
          component:mainMine,
          meta:{
		        vShow: true,
            title: "我的"
		      }
        },
        {
          path:'/mains/about',
          name:'about',
          component:about,
          meta:{
		        vShow: true
		      }
        },
        {
          path:'/mains/customerService',
          name:'customerService',
          component:customerService,
          meta:{
		        vShow: true
		      }
        },
        {
          path:'/mains/salary',
          name:'salary',
          component:salary,
          meta:{
          	vShow: false,
          	title: "薪资查询"
          }
	      },
	      {
          path:'/mains/salaryBase',
          name:'base',
          component:salaryBase,
          meta:{
          	vShow: false,
          	title: "薪资基本信息详情"
          }
	      },
	      {
	      	path:'/mains/salaryDetail',
          name:'detail',
          component:salaryDetail,
          meta:{
          	vShow: false,
          	title: "薪资核算明细"
          }
	      },
	      {
	      	path:'/mains/socialSecurity',
          name:'socialSecurity',
          component:socialSecurity,
          meta:{
          	vShow: false,
          	title: "社保查询"
          }
	      },
	      {
	      	path:'/mains/socialSecurityBase',
          name:'socialSecurityBase',
          component:socialSecurityBase,
          meta:{
          	vShow: false,
          	title: "社保基本信息详情"
          }
	      },
	      {
	      	path:'/mains/socialSecurityDetail',
          name:'socialSecurityDetail',
          component:socialSecurityDetail,
          meta:{
          	vShow: false,
          	title: "社保核算明细"
          }
	      },
	      {
	      	path:'/mains/providentFund',
          name:'providentFund',
          component:providentFund,
          meta:{
          	vShow: false,
          	title: "公积金查询"
          }
	      },
	      {
	      	path:'/mains/providentFundBase',
          name:'providentFundBase',
          component:providentFundBase,
          meta:{
          	vShow: false,
          	title: "公积金基本信息详情"
          }
	      },
	      {
	      	path:'/mains/providentFundDetail',
          name:'providentFundDetail',
          component:providentFundDetail,
          meta:{
          	vShow: false,
          	title: "公积金核算明细"
          }
	      }
      ]
    },
    {
      path:'/InformNotice',
      name:'InformNotice',
      component:InformNotice,
      meta:{
		    vShow: true,
        title:'通知公告'
		  }
    },
    {
      path:'/InformDetails',
      name:'InformDetails',
      component:InformDetails,
      meta:{
		    vShow: true,
        title:'通知公告详情'
		  }
    },
    {
      path:'/policySystem',
      name:'policySystem',
      component:policySystem,
      meta:{
		    vShow: true,
        title:'政策制度'
		  }
    },
    {
      path:'/EditdateDetails',
      name:'EditdateDetails',
      component:EditdateDetails,
      meta:{
		    vShow: true,
        title:'修改日程'
		  }
    },
    {
      path:'/policyDetails',
      name:'policyDetails',
      component:policyDetails,
      meta:{
		    vShow: true,
        title:'政策具体描述'
		  }
    },
    {
      path:'/entrySubmit',
      name:'entrySubmit',
      component:entrySubmit,
      meta:{
		    vShow: true,
        title:'入职材料提交'
		  }
    },
    {
      path:'/probationPeriod',
      name:'probationPeriod',
      component:probationPeriod,
      meta:{
		    vShow: true,
        title:'转正自评'
		  }
    },
    {
      path:'/probationPeriodList',
      name:'probationPeriodList',
      component:probationPeriodList,
      meta:{
		    vShow: true,
        title:'试用期自评'
		  }
    },
    {
      path:'/internaltransferConfirm',
      name:'internaltransferConfirm',
      component:internaltransferConfirm,
      meta:{
		    vShow: true,
        title:'调动确认'
		  }
    },
    {
      path:'/internaltransferConfirmList',
      name:'internaltransferConfirmList',
      component:internaltransferConfirmList,
      meta:{
		    vShow: true,
        title:'调动确认'
		  }
    },
    {
      path:'/flowContract',
      name:'flowContract',
      component:flowContract,
      meta:{
		    vShow: true,
        title:'续签自评'
		  }
    },
    {
      path:'/flowContractList',
      name:'flowContractList',
      component:flowContractList,
      meta:{
		    vShow: true,
        title:'合同续签自评'
		  }
    },
    {
      path:'/responsibleTask',
      name:'responsibleTask',
      component:responsibleTask,
      meta:{
		    vShow: true,
        title:'负责任务'
		  }
    },
    {
      path:'/teamMemberList',
      name:'teamMemberList',
      component:teamMemberList,
      meta:{
		    vShow: true,
        title:'团队成员'
		  }
    },
    {
      path:'/teamMemberDetails',
      name:'teamMemberDetails',
      component:teamMemberDetails,
      meta:{
		    vShow: true,
        title:'团队成员'
		  }
    },
    {
      path:'/personInfoDetails',
      name:'personInfoDetails',
      component:personInfoDetails,
      meta:{
        vShow: true,
        title:'我的档案'
      }
    },
    {
      path:'/fireMemberList',
      name:'fireMemberList',
      component:fireMemberList,
      meta:{
		    vShow: true,
        title:'离职发起'
		  }
    },
    {
      path:'/fireMemberDetails',
      name:'fireMemberDetails',
      component:fireMemberDetails,
      meta:{
		    vShow: true,
        title:'下属离职发起'
		  }
    },
    {
      path:'/dimissionList',
      name:'dimissionList',
      component:dimissionList,
      meta:{
        vShow: true,
        title:'离职申请'
      }
    },
    {
      path:'/backlogMatter',
      name:'backlogMatter',
      component:backlogMatter,
      meta:{
        vShow: true,
        title:'待办事项'
      }
    },
    {
      path:'/LeaveApproval',
      name:'LeaveApproval',
      component:LeaveApproval,
      meta:{
        vShow: true,
        title:'离职审批'
      }
    },
    {
      path:'/approvalSet',
      name:'approvalSet',
      component:approvalSet,
      meta:{
        vShow: true,
        title:'平台设置'
      }
    },
    {
      path:'/redeployApproval',
      name:'redeployApproval',
      component:redeployApproval,
      meta:{
        vShow: true,
        title:'调动审批'
      }
    },
    {
      path:'/dimissionDetails',
      name:'dimissionDetails',
      component:dimissionDetails,
      meta:{
        vShow: true,
        title:'主动离职发起'
      }
    },
    {
      path:'/probaMemberList',
      name:'probaMemberList',
      component:probaMemberList,
      meta:{
		    vShow: true,
        title:'转正评估'
		  }
    },
    {
      path:'/probaMemberDetails',
      name:'probaMemberDetails',
      component:probaMemberDetails,
      meta:{
		    vShow: true,
        title:'试用期评估'
		  }
    },
    {
      path:'/dateDetails',
      name:'dateDetails',
      component:dateDetails,
      meta:{
		    vShow: true,
        title:'创建日程'
		  }
    },
    {
      path:'/warn',
      name:'warn',
      component:warn,
      meta:{
		    vShow: true,
        title:'选择时间'
		  }
    },
    {
      path:'/invitePeople',
      name:'invitePeople',
      component:invitePeople,
      meta:{
		    vShow: true,
        title:'邀请参与人员'
		  }
    },
    {
      path:'/subordinateList',
      name:'subordinateList',
      component:subordinateList,
      meta:{
		    vShow: true,
        title:'选择下属'
		  }
    },
    {
      path:'/dimissionsubordinateList',
      name:'dimissionsubordinateList',
      component:dimissionsubordinateList,
      meta:{
        vShow: true,
        title:'选择下属'
      }
    },
    {
      path:'/dateManage',
      name:'dateManage',
      component:dateManage,
      meta:{
		    vShow: true,
        title:'日程管理'
		  }
    },
    {
      path:'/dateTaskManage',
      name:'dateTaskManage',
      component:dateTaskManage,
      meta:{
		    vShow: true,
        title:'日程详情'
		  }
    },
    {
      path:'/TakeResponsibleTask',
      name:'TakeResponsibleTask',
      component:TakeResponsibleTask,
      meta:{
		    vShow: true,
        title:'参与任务'
		  }
    },
    {
      path:'/TakeDateManage',
      name:'TakeDateManage',
      component:TakeDateManage,
      meta:{
		    vShow: true,
        title:'日程管理'
		  }
    },
    {
      path:'/TakedateTaskManage',
      name:'TakedateTaskManage',
      component:TakedateTaskManage,
      meta:{
		    vShow: true,
        title:'日程详情'
		  }
    },
    {
      path:'/setPassword',
      name:'setPassword',
      component:setPassword,
      meta:{
        vShow: true,
        title:'修改薪资密码'
      }
    },
    {
      path:'/newPassword',
      name:'newPassword',
      component:newPassword,
      meta:{
        vShow: true,
        title:'设置薪资密码'
      }
    },
    {
      path:'/contrMemberList',
      name:'contrMemberList',
      component:contrMemberList,
      meta:{
        vShow: true,
        title:'续签评估'
      }
    },
    {
      path:'/contrMemberDetails',
      name:'contrMemberDetails',
      component:contrMemberDetails,
      meta:{
        vShow: true,
        title:'合同续签评估'
      }
    },
    {
      path:'/appLink',
      name:'appLink',
      component:appLink,
      meta:{
        vShow: true,
        title:'入职材料提交'
      }
    },

    {
      path:'/surveyOne',
      name:'surveyOne',
      component:surveyOne,
      meta:{
        vShow: true,
        title:''
      }
    },
    {
      path:'/evaluateView',
      name:'evaluateView',
      component:evaluateView,
      meta:{
        vShow: true,
        title:''
      }
    },
    {
      path:'/surveyTwo',
      name:'surveyTwo',
      component:surveyTwo,
      meta:{
        vShow: true,
        title:''
      }
    },
    {
      path:'/myOrderList',
      name:'myOrderList',
      component:myOrderList,
      meta:{
        vShow: true,
        title: '我的工单'
      }
    },
    {
      path:'/OrderList',
      name:'OrderList',
      component:OrderList,
      meta:{
        vShow: true,
        title: '选择工单类型'
      }
    },
    {
      path:'/submitOrder',
      name:'submitOrder',
      component:submitOrder,
      meta:{
        vShow: true,
        title: '提交工单'
      }
    },
    {
      path:'/OrderMessage',
      name:'OrderMessage',
      component:OrderMessage,
      meta:{
        vShow: true,
        title: '继续留言'
      }
    },
    {
      path:'/orderDetails',
      name:'orderDetails',
      component:orderDetails,
      meta:{
        vShow: true,
        title: '工单详情'
      }
    },
    {
      path:'/goAbroadSureDetails',
      name:'goAbroadSureDetails',
      component:goAbroadSureDetails,
      meta:{
        vShow: true,
        title: '出国确认'
      }
    },
    {
      path:'/backHome',
      name:'backHome',
      component:backHome,
      meta:{
        vShow: true,
        title: '回国确认'
      }
    },
    {
      path:'/backHomeList',
      name:'backHomeList',
      component:backHomeList,
      meta:{
        vShow: true,
        title: '回国确认'
      }
    },
    {
      path:'/goAbroadPreLis',
      name:'goAbroadPreLis',
      component:goAbroadPreLis,
      meta:{
        vShow: true,
        title: '出国资料准备'
      }
    },
    {
      path:'/goAbroadPreDet',
      name:'goAbroadPreDet',
      component:goAbroadPreDet,
      meta:{
        vShow: true,
        title: '出国资料准备'
      }
    },
    {
      path:'/backHomeInformation',
      name:'backHomeInformation',
      component:backHomeInformation,
      meta:{
        vShow: true,
        title: '回国资料提交'
      }
    },
    {
      path:'/backHomeInformationList',
      name:'backHomeInformationList',
      component:backHomeInformationList,
      meta:{
        vShow: true,
        title: '回国资料提交'
      }
    },
    {
      path:'/goAbroadSureList',
      name:'goAbroadSureList',
      component:goAbroadSureList,
      meta:{
        vShow: true,
        title: '出国确认'
      }
    },
    {
      path:'/evaluate',
      name:'evaluate',
      component:evaluate,
      meta:{
        vShow: true,
        title: '用户评价'
      }
    },
  ]
})
