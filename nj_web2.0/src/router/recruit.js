/**
 * Created by Aaron on 2019/04/03.
 */

//招聘黑名单
import recruitBlackList from '@/pages/recruitManage/recruitBlackListManage'
//招聘信息报表
import RecruitReport from '@/pages/RecruitReManage/recruitReManage'
//招聘报表统计
import RecruitCensus from '@/pages/RecruitCensus/RecruitCensusList'
export default [

    {
      path: 'recruitBlackList',
      name: 'recruitBlackList',
      component: recruitBlackList,
    },
    {
      path: 'RecruitReport',
      name: 'RecruitReport',
      component: RecruitReport,
    },
    {
      path: 'RecruitCensus',
      name: 'RecruitCensus',
      component: RecruitCensus,
    },
]