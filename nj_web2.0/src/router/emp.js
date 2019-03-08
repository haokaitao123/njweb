import employeeHome from '@/pages/employeePage/employeeHome/employeeHome'
import employeeHomeNew from '@/pages/employeePage/employeeHome/employeeHomeNew'
import essAdminInfo from '@/pages/employeePage/essAdminInfo/essAdminInfo'
import main from '@/pages/employeePage/main/main'
import commonFlowList from '@/pages/common/commonFlowList/commonFlowList1'
import workOrder from './workOrder'
import subordinatesManage from '@/pages/employeePage/subordinatesPage/subordinatesManage'
import remindCalendar from '@/pages/employeePage/remind/remindCalendar'
//待办事项
import mySchedule from '@/pages/employeePage/toDoSchedule/mySchedule'
//规章制度
import ruleSearch from '@/pages/employeePage/ruleInstitution/ruleSearch'
//待办审批自动布局
import commonFlowUpdate from '@/pages/employeePage/toDoSchedule/commonFlowUpdate'

// 及时通讯知识库弹出框
import knowledgeView from '@/pages/cmutManage/cmutKnowledgeBase/knowledgeView'

export default [
  {
    path: '/knowledgeView',
    name: 'knowledgeView',
    component: knowledgeView,
  },
  {
    path: '/employeeHome',
    name: 'employeeHome',
    component: employeeHome,
  },
  {
    path: '/employeeHomeNew',
    name: 'employeeHomeNew',
    component: employeeHomeNew,
  },
  {
    path: '/main',
    name: 'empMain',
    component: main,
    children: [
      {
        path: 'essAdminInfo',
        name: 'essAdminInfo',
        component: essAdminInfo,
      },
      {
        path: 'commonFlowList',
        name: 'commonFlowList',
        component: commonFlowList,
      },
      {
        path: 'subordinatesManage',
        name: 'subordinatesManage',
        component: subordinatesManage,
      },
      {
        path: 'remindCalendar',
        name: 'remindCalendar',
        component: remindCalendar,
      },
      {
      	path: 'mySchedule',
      	name: 'mySchedule',
      	component: mySchedule,
      },
      {
      	path: 'ruleSearch',
      	name: 'ruleSearch',
      	component: ruleSearch,
      },
      {
      	path: 'commonFlowUpdate',
      	name: 'commonFlowUpdate',
      	component: commonFlowUpdate,
      },
      ...workOrder,
    ],
  },
]
