/*
 * Created by Erdong on 2018/10/18.
 */

//档案分类管理
import evaluationActivityManage360 from '@/pages/evaluationManage/evaluationActivityManage360/evaluationActivityManage360'
//档案室管理
import evaluationAnalysisReport360 from '@/pages/evaluationManage/evaluationAnalysisReport360/evaluationAnalysisReport360'
//档案柜管理
import evaluationNomalManage360 from '@/pages/evaluationManage/evaluationNomalManage360/evaluationNomalManage360'
//档案查询管理
import evaluationPlanManage360 from '@/pages/evaluationManage/evaluationPlanManage360/evaluationPlanManage360'

export default[{
		path: 'evaluationNomalManage360',
	    name: 'evaluationNomalManage360',
	    component: evaluationNomalManage360
	},{
		path: 'evaluationPlanManage360',
	    name: 'evaluationPlanManage360',
	    component: evaluationPlanManage360
	},{
		path: 'evaluationActivityManage360',
	    name: 'evaluationActivityManage360',
	    component: evaluationActivityManage360
	},{
		path: 'evaluationAnalysisReport360',
	    name: 'evaluationAnalysisReport360',
	    component: evaluationAnalysisReport360
	}]
