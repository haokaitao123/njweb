/**
 * Created by Aaron on 2018/1/11.
 */

//角色管理
import platSelectDefine from '@/pages/platformmanager/platSelectDefine/platSelectDefine'
import platFormVar from '@/pages/platformmanager/platFormVar/platFormVar'
import customOptions from '@/pages/platformmanager/customOptions/customOptions'
import systemForm from '@/pages/platformmanager/systemForm/systemForm'
import platFlowList from '@/pages/platformmanager/platFlow/platFlowList'
//联系人角色定义
import platRolecontact from '@/pages/platformmanager/platRolecontact/platRolecontact'
//员工号
import platEmpno from '@/pages/PlatFormManager/platEmpno-manage/platEmpnoManage'
//职位号
import platPostno from '@/pages/PlatFormManager/platPostno-manage/platPostnoManage'
// //反查服务
// import platGetValDefine from '@/pages/PlatFormManager/platGetValDefine/platGetValDefine'
import platGetValDefineList from '@/pages/PlatFormManager/platGetValDefine/platGetValDefineList'
//财年
import platFiscalyear from '@/pages/PlatFormManager/platFiscalyear-manage/platFiscalyearManage'
//工作日历
import platCalendar from '@/pages/PlatFormManager/platCalendar-manage/platCalendarManage'
//流程联系人
import platFlowcontacts from '@/pages/PlatFormManager/platFlowcontacts-manage/platFlowcontactsManage'
//流程变量
import platFlowVar from '@/pages/PlatFormManager/platFlowVar-manage/platFlowVarManage'
//流程变量
import platFileexcel from '@/pages/PlatFormManager/platFileexcel/platFileexcel'
//自动任务配置
import autoTask from '@/pages/PlatFormManager/autoTask/autoTaskManage'
//系统邮件模板
import platSysMail from '@/pages/PlatFormManager/platSysmail/platsysMail'
//自动任务日志
import autoTasklog from '@/pages/PlatFormManager/platAutotasklog-manage/platAutotasklogManage'
//系统短信模板
import platSyssms from '@/pages/PlatFormManager/platSyssms/platSyssms'
//系统微信模版
import platSyswx from '@/pages/PlatFormManager/platSyswx/platSyswx'
//系统文档模板
import platDocTemplate from '@/pages/PlatFormManager/platDocTemplate/platDocTemplate'
//知识库
 import platKnowledgeList from '@/pages/PlatFormManager/platKnowledge/platKnowledgeList'
//知识库类型
import platKnowledgeType from '@/pages/PlatFormManager/platKnowledgeType/platKnowledgeType'
//知识库树
// import knowledgeStore from '@/pages/PlatFormManager/platKnowledgeBase/knowledgeStore'
//业务联系人
import  platBusirelManage from '@/pages/PlatFormManager/platBusirel/platBusirelManage'
//业务联系人详情
import openBusiCon from '@/pages/PlatFormManager/platBusirel/homePage/openBusiCon'
//审批流程定义
import platApprovalList from '@/pages/PlatFormManager/platApproval/platApprovalList'

import platAprvbill from '@/pages/PlatFormManager/platAprvbill/platAprvbill'

//社保区域维护
import platBenefitarea from '@/pages/PlatFormManager/platBenefitarea-manage/platBenefitareaManage.vue'

export default [{
		path: 'platSelectDefine',
		name: 'platSelectDefine',
		component: platSelectDefine,
	},
	{
		path: 'platFormVar', //浏览器访问路劲中会加上这一名称
		name: 'platFormVar', //可加可不加
		component: platFormVar, //对应上面引入的名称
	},
	{
		path: 'customOptions',
		name: 'customOptions',
		component: customOptions,
	},
	{
		path: 'systemForm',
		name: 'systemForm',
		component: systemForm,
	},
	{
		path: 'platFlowList',
		name: 'platFlowList',
		component: platFlowList,
	},
	{
		path: 'platRolecontact',
		name: 'platRolecontact',
		component: platRolecontact,
	},
	{
		path: 'platEmpno',
		name: 'platEmpno',
		component: platEmpno,
	},
	{
		path: 'platPostno',
		name: 'platPostno',
		component: platPostno,
	},
	{
		path: 'platGetValDefineList',
		name: 'platGetValDefineList',
		component: platGetValDefineList,
	},
	{
		path: 'platFiscalyear',
		name: 'platFiscalyear',
		component: platFiscalyear,
	},
	{
		path: 'platCalendar',
		name: 'platCalendar',
		component: platCalendar,
	},
	{
		path: 'platFlowcontacts',
		name: 'platFlowcontacts',
		component: platFlowcontacts,
	},
	{
		path: 'platFlowVar',
		name: 'platFlowVar',
		component: platFlowVar,
	},
	{
		path: 'platFileexcel',
		name: 'platFileexcel',
		component: platFileexcel,
	},
	{
		path: 'autoTask',
		name: 'autoTask',
		component: autoTask,
	},
	{
    path: 'platSysMail',
    name: 'platSysMail',
    component: platSysMail,
  },
  {
    path: 'autoTasklog',
    name: 'autoTasklog',
    component: autoTasklog,
  },
  {
    path: 'platSyssms',
    name: 'platSyssms',
    component: platSyssms,
  },
  {
    path: 'platSyswx',
    name: 'platSyswx',
    component: platSyswx,
  },
  {
    path: 'platDocTemplate',
    name: 'platDocTemplate',
    component: platDocTemplate,
  },
  {
    path: 'platKnowledgeList',
    name: 'platKnowledgeList',
    component: platKnowledgeList,
  },
  {
    path: 'platKnowledgeType',
    name: 'platKnowledgeType',
    component: platKnowledgeType,
  },
  // {
  // 	path: 'knowledgeStore',
  // 	name: 'knowledgeStore',
  // 	component: knowledgeStore,
  // },
  {
    path: 'platBusirelManage',
    name: 'platBusirelManage',
    component: platBusirelManage,
  },
  {
  	path: 'openBusiCon',
  	name: 'openBusiCon',
  	component: openBusiCon,
  },
  {
  	path: 'platApprovalList',
  	name: 'platApprovalList',
  	component: platApprovalList,
  },
  {
  	path: 'platAprvbill',
  	name: 'platAprvbill',
  	component: platAprvbill,
  },
  {
    path: 'platBenefitarea',
    name: 'platBenefitarea',
    component: platBenefitarea,
  },
]
