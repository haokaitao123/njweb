
//全部待办事项
import ansrptToDoList from '@/pages/ansrptManage/toDoListManage/ansrptToDoList'
//用户权限查询：查询用户分配的功能权限
import ansrptSysFunctions from '@/pages/ansrptManage/ansrptSysFunctions/ansrptSysFunctions'
//用户访问功能统计
import functionStatistic from '@/pages/ansrptManage/functionStatistic/functionStatistic'
// 用户工单统计及满意度
import userWrderSatisfaction from '@/pages/ansrptManage/worderSatifacStatistic/userWrderSatisfaction'
export default [
  {
    path: 'ansrptSysFunctions',
    name: 'ansrptSysFunctions',
    component: ansrptSysFunctions,
  },
  {
    path: 'ansrptToDoList',
    name: 'ansrptToDoList',
    component: ansrptToDoList,
  },
  {
  	path: 'functionStatistic',
    name: 'functionStatistic',
    component: functionStatistic,
  },
  {
  	path: 'userWrderSatisfaction',
    name: 'userWrderSatisfaction',
    component: userWrderSatisfaction,
  }
]
