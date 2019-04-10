/**
 * Created by Aaron on 2018/3/2.
 */

//用户普通角色组管理
import empOfficial from '@/pages/empManage/empofficial/empOfficial.vue'
import empMaster from '@/pages/empManage/empmaster-manage3/visaAreaList.vue'
import empContractList from '@/pages/empManage/empcontract-manage/empContractList'
import visaAreaList from '@/pages/empManage/visaArea-manage/visaAreaList'
import empDepminManage from '@/pages/empManage/empDepmin/empDepminRule'

// 出国统计看板
const abordeCountShow = resolve => require(['@/pages/empManage/aborde-count-show/abordeCountShow'], resolve)
// 逾期未回国查询
const laterreturnRecord = resolve => require(['@/pages/empManage/laterreturn-manage/laterreturnRecord'], resolve)

const goaborddetail = resolve => require(['@/pages/empManage/goaborddetail-manage/goaborddetail'], resolve)

const resumeNumMange = resolve => require(['@/pages/RmResumeMange/resumeNumMange'], resolve)

const depManage = resolve => require(['@/pages/empManage/depManage/depManage'], resolve)

const protocolManage = resolve => require(['@/pages/protocolManage/protocolManage'], resolve)

export default [{
    path: 'goaborddetail',
    name: 'goaborddetail',
    component: goaborddetail,
  },
  {
    path: 'laterreturnRecord',
    name: 'laterreturnRecord',
    component: laterreturnRecord,
  },
  {
    path: 'visaAreaList',
    name: 'visaAreaList',
    component: visaAreaList,
  },
  {
    path: 'empMaster',
    name: 'empMaster',
    component: empMaster,
  },
  {
    path: 'empContractList',
    name: 'empContractList',
    component: empContractList,
  },
  {
    path: 'abordeCountShow',
    name: 'abordeCountShow',
    component: abordeCountShow,
  },
  {
    path: 'empOfficial',
    name: 'empOfficial',
    component: empOfficial,
  },
  {
    path: 'rmResume',
    name: 'rmResume',
    component: resumeNumMange,
  },
  {
    path: 'depManage',
    name: 'depManage',
    component: depManage,
  },
  {
    path: 'empDepminManage',
    name: 'empDepminManage',
    component: empDepminManage,
  },
  {
    path: 'protocolManage',
    name: 'protocolManage',
    component: protocolManage,
  },
]
