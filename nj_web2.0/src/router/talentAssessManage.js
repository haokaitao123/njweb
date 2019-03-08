/*
 * Created by Erdong on 2018/10/18.
 */

//档案分类管理
import assessAnalysisReport from '@/pages/talentAssessManage/assessAnalysisReport/assessAnalysisReport'
//档案室管理
import assessNomalManage from '@/pages/talentAssessManage/assessNomalManage/assessNomalManage'
//档案柜管理
import assessPlanManage from '@/pages/talentAssessManage/assessPlanManage/assessPlanManage'
//档案查询管理
import assessResultManage from '@/pages/talentAssessManage/assessResultManage/assessResultManage'

export default[{
		path: 'assessNomalManage',
	    name: 'assessNomalManage',
	    component: assessNomalManage
	},{
		path: 'assessPlanManage',
	    name: 'assessPlanManage',
	    component: assessPlanManage
	},{
		path: 'assessResultManage',
	    name: 'assessResultManage',
	    component: assessResultManage
	},{
		path: 'assessAnalysisReport',
	    name: 'assessAnalysisReport',
	    component: assessAnalysisReport
	}]
