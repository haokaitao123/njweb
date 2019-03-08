/*
 * Created by Erdong on 2018/10/18.
 */

//档案分类管理
import diagnosticAnalysisReport from '@/pages/HRmanageDiagnosis/diagnosticAnalysisReport/diagnosticAnalysisReport'
//档案室管理
import diagnosticNormManage from '@/pages/HRmanageDiagnosis/diagnosticNormManage/diagnosticNormManage'
//档案柜管理
import diagnosticPlanManage from '@/pages/HRmanageDiagnosis/diagnosticPlanManage/diagnosticPlanManage'
//档案查询管理
import diagnosticResultManage from '@/pages/HRmanageDiagnosis/diagnosticResultManage/diagnosticResultManage'

export default[{
		path: 'diagnosticNormManage',
	    name: 'diagnosticNormManage',
	    component: diagnosticNormManage
	},{
		path: 'diagnosticPlanManage',
	    name: 'diagnosticPlanManage',
	    component: diagnosticPlanManage
	},{
		path: 'diagnosticResultManage',
	    name: 'diagnosticResultManage',
	    component: diagnosticResultManage
	},{
		path: 'diagnosticAnalysisReport',
	    name: 'diagnosticAnalysisReport',
	    component: diagnosticAnalysisReport
	}]
