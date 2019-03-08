/**
 * Created by Aaron on 2018/1/11.
 */
//知识库
import cmutKnowledgeList from '@/pages/cmutManage/cmutKnowledge/cmutKnowledgeList'
//知识库类型
import cmutKnowledgeType from '@/pages/cmutManage/cmutKnowledgeType/cmutKnowledgeType'
//财务管理 知识库类型
import financialManagement from '@/pages/financialManagement/financialManagement/cmutKnowledgeType'
//财务管理 服务费用统计
import servePriceCount from '@/pages/financialManagement/servePriceCount/servePriceCount'
//财务管理 知识库类型
import finServicesBoard from '@/pages/financialManagement/finServicesBoard/finServicesBoard'
//HRSSC 知识库管理
import cmutKnowledgeBusi from '@/pages/cmutManage/SSCcmutKnowledgeType/cmutKnowledgeType/cmutKnowledgeType'
//HRSSC 知识入库管理
import cmutKnowledgeAdd from '@/pages/cmutManage/SSCcmutKnowledgeType/cmutKnowledgeAdd/cmutKnowledgeList'
//HRSSC 知识查询
import cmutKnowledgeCom from '@/pages/cmutManage/SSCcmutKnowledgeType/cmutKnowledgeCom/cmutKnowledgeCom'
//HRSSC 知识查询
import cmutKnowledgeInv from '@/pages/cmutManage/SSCcmutKnowledgeType/cmutKnowledgeInv/cmutKnowledgeInv'
//HRSSC 知识查询
import cmutKnowledgeRel from '@/pages/cmutManage/SSCcmutKnowledgeType/cmutKnowledgeRel/cmutKnowledgeRel'
//HRSSC 知识查询
import cmutKnowledgeSel from '@/pages/cmutManage/SSCcmutKnowledgeType/cmutKnowledgeSel/cmutKnowledgeList'
//HRSSC 知识统计
import cmutKnowledgeNum from '@/pages/cmutManage/SSCcmutKnowledgeType/cmutKnowledgeNum/cmutKnowledgeNum'
//私有语料库
import cmutCorporaManage from '@/pages/cmutManage/cmutCorpora/cmutCorporaManage'
//财务管理 服务费用分析
import servePriceMsa from '@/pages/financialManagement/servePriceMsa/servePriceMsa'
//知识库树
import knowledgeStore from '@/pages/cmutManage/cmutKnowledgeBase/knowledgeStore'
//工单分配管理
import teamaswdtypeManage from '@/pages/cmutManage/cmutTeamaswdtype/teamaswdtypeManage'
//工单分配团队
import teamList from '@/pages/cmutManage/orderSupTeam/teamList'
//工单分配
import allotWorkOrder from '@/pages/workOrderManager/allotWorkOrder/allotWorkOrder'
//工单处理
import handleWorkOrder from '@/pages/workOrderManager/handleWorkOrder/handleWorkOrder'
//在线咨询消息记录
import cmutImmsgManage from '@/pages/cmutManage/cmutImmsg/cmutImmsgManage'

//我的工单处理
import myWorkOrder from '@/pages/workOrderManager/myWorkOrder/myOrder'
// 工单提交
import commitWorkOrder from '@/pages/workOrderManager/commitWorkOrder/commitWorkOrder'
import myWorkOrderNew from '@/pages/workOrderManager/myWorkOrderNew/myWorkOrderNew'

// 工单查询
import workOrderList from '@/pages/workOrderManager/workorderSearch/myOrder'
// 工单数量统计
import orderCountStatistic from '@/pages/opermonitorManage/orderCount/orderCountStatistic'
// 工单满意度统计
import orderSatisfaction from '@/pages/opermonitorManage/orderStatistic/orderSatisfaction'
// 工单执行统计
import orderFinishedStatistic  from '@/pages/opermonitorManage/finishedOrder/orderFinishedStatistic'

import flowBusinesStatistic from '@/pages/opermonitorManage/flowBusinesStatistic/flowBusinesStatistic'

import flowExecutStatistic from '@/pages/opermonitorManage/flowExecutStatistic/flowExecutStatistic'
import monitoringStatistics from '@/pages/opermonitorManage/monitoringStatistics/monitoringStatistics'
import flowWarningRecord from '@/pages/opermonitorManage/flowWarningRecord/flowWarningRecord'

export default [
  {
    path: 'cmutKnowledgeList',
    name: 'cmutKnowledgeList',
    component: cmutKnowledgeList,
  },
  {
    path: 'cmutKnowledgeType',
    name: 'cmutKnowledgeType',
    component: cmutKnowledgeType,
  },
  {
    path:'finServicesBoard',
    name:'finServicesBoard',
    component:finServicesBoard
  },
  {
    path: 'knowledgeStore',
    name: 'knowledgeStore',
    component: knowledgeStore,
  },
  {
    path: 'teamaswdtypeManage',
    name: 'teamaswdtypeManage',
    component: teamaswdtypeManage,
  },
  {
    path: 'teamList',
    name: 'teamList',
    component: teamList,
  },
  {
    path: 'allotWorkOrder',
    name: 'allotWorkOrder',
    component: allotWorkOrder,
  },
  {
    path: 'handleWorkOrder',
    name: 'handleWorkOrder',
    component: handleWorkOrder,
  },
  {
    path: 'cmutImmsgManage',
    name: 'cmutImmsgManage',
    component: cmutImmsgManage,
  },
  {
    path:'myWorkOrder',
    name:'myWorkOrder',
    component:myWorkOrder
  },
  {
    path:'commitWorkOrder',
    name:'commitWorkOrder',
    component:commitWorkOrder,
  },
  {
    path:'financialManagement',
    name:'financialManagement',
    component:financialManagement
  },
  {
    path:'servePriceCount',
    name:'servePriceCount',
    component:servePriceCount
  },
  {
    path:'servePriceMsa',
    name:'servePriceMsa',
    component:servePriceMsa
  },
  {
    path:'cmutKnowledgeBusi',
    name:'cmutKnowledgeBusi',
    component:cmutKnowledgeBusi
  },
  {
    path:'workOrderList',
    name:'workOrderList',
    component:workOrderList
  },
  {
    path:'cmutKnowledgeAdd',
    name:'cmutKnowledgeAdd',
    component:cmutKnowledgeAdd
  },
  {
    path:'cmutKnowledgeCom',
    name:'cmutKnowledgeCom',
    component:cmutKnowledgeCom
  },
  {
    path:'cmutKnowledgeInv',
    name:'cmutKnowledgeInv',
    component:cmutKnowledgeInv
  },
  {
    path:'cmutKnowledgeRel',
    name:'cmutKnowledgeRel',
    component:cmutKnowledgeRel
  },
  {
    path:'cmutKnowledgeSel',
    name:'cmutKnowledgeSel',
    component:cmutKnowledgeSel
  },
  {
    path:'cmutKnowledgeNum',
    name:'cmutKnowledgeNum',
    component:cmutKnowledgeNum
  },
  {
    path:'orderCountStatistic',
    name:'orderCountStatistic',
    component:orderCountStatistic
  },
  {
    path:'orderSatisfaction',
    name:'orderSatisfaction',
    component:orderSatisfaction
  },
  {
    path:'orderFinishedStatistic',
    name:'orderFinishedStatistic',
    component:orderFinishedStatistic
  },
  {
    path:'flowBusinesStatistic',
    name:'flowBusinesStatistic',
    component:flowBusinesStatistic
  },
  {
    path:'flowExecutStatistic',
    name:'flowExecutStatistic',
    component:flowExecutStatistic
  },
  {
    path:'monitoringStatistics',
    name:'monitoringStatistics',
    component:monitoringStatistics
  },
  {
    path:'flowWarningRecord',
    name:'flowWarningRecord',
    component:flowWarningRecord
  },
  {
    path:'myWorkOrderNew',
    name:'myWorkOrderNew',
    component:myWorkOrderNew
  },
  {
    path:'cmutCorporaManage',
    name:'cmutCorporaManage',
    component:cmutCorporaManage
  },
]
