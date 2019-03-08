/*
 * Created by Erdong on 2018/10/18.
 */

//档案分类管理
import evaluationAnalysisReport from '@/pages/laborEvaluation/evaluationAnalysisReport/evaluationAnalysisReport'
//档案室管理
import evaluationNomalManage from '@/pages/laborEvaluation/evaluationNomalManage/evaluationNomalManage'
//档案柜管理
import evaluationPlanManage from '@/pages/laborEvaluation/evaluationPlanManage/evaluationPlanManage'
//档案查询管理
import evaluationResultManage from '@/pages/laborEvaluation/evaluationResultManage/evaluationResultManage'

export default[{
		path: 'evaluationNomalManage',
	    name: 'evaluationNomalManage',
	    component: evaluationNomalManage
	},{
		path: 'evaluationPlanManage',
	    name: 'evaluationPlanManage',
	    component: evaluationPlanManage
	},{
		path: 'evaluationResultManage',
	    name: 'evaluationResultManage',
	    component: evaluationResultManage
	},{
		path: 'evaluationAnalysisReport',
	    name: 'evaluationAnalysisReport',
	    component: evaluationAnalysisReport
	}]
