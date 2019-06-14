/**
 * Created by Aaron on 2017/12/26.
 */

//多语言
import baseLangList from '@/pages/rootManage/baselang/baseLangList'

//多语言
import baseMappingList from '@/pages/rootManage/basemapping/baseMappingList'

//公司信息维护
import orgUnitsList from '@/pages/rootManage/orgunits/orgUnitsList'

//公司信息维护
import baseLangTypeList from '@/pages/rootManage/baselangtype/baseLangTypeList'

//组织架构信息维护

import orgFrameList from '@/pages/rootManage/orgframe-manage/orgframeManage'

//成本中心
import orgCostcenterList from '@/pages/rootManage/orgcostcenter-manage/orgcostcenterManage'

//部门岗位维护
import orgDeptpostList from '@/pages/rootManage/orgDeptpost/orgDeptpost'

//岗位信息
import orgPostList from '@/pages/rootManage/orgpost-manage/orgpostManage'
//公司公告
import OrgNotice from '@/pages/rootManage/orgNotice-manage/manageIndex'
export default [

  {
    path: 'baseLangList',
    name: 'baseLangList',
    component: baseLangList,
  },
  {
    path: 'baseMappingList',
    name: 'baseMappingList',
    component: baseMappingList,
  },

  {
    path: 'orgUnitsList',
    name: 'orgUnitsList',
    component: orgUnitsList,
  },
  {
    path: 'baseLangTypeList',
    name: 'baseLangTypeList',
    component: baseLangTypeList,
  },
  {
    path: 'orgFrameList',
    name: 'orgFrameList',
    component: orgFrameList,
  },
  {
    path: 'orgCostcenterList',
    name: 'orgCostcenterList',
    component: orgCostcenterList,
  },
  {
    path: 'orgDeptpostList',
    name: 'orgDeptpostList',
    component: orgDeptpostList,
  },
  {
    path: 'orgPostList',
    name: 'orgPostList',
    component: orgPostList,
  }, {
    path: 'OrgNotice',
    name: 'OrgNotice',
    component: OrgNotice,
  },
]
