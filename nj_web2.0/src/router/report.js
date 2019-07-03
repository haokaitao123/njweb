/**
 * Created by Aaron on 2019/07/03.
 */

//入职人员报表
const empReportList = resolve => require(['@/pages/report/empReportList'], resolve)
//离职员工名单
const empdimReportList = resolve => require(['@/pages/report/empdimReportList'], resolve)
//异动员工名单
const empTransReportList = resolve => require(['@/pages/report/empTransReportList'], resolve)

export default [
  {
    path: 'empReportList',
    name: 'empReportList',
    component: empReportList,
  },
  {
    path: 'empdimReportList',
    name: 'empdimReportList',
    component: empdimReportList,
  },
  {
    path: 'empTransReportList',
    name: 'empTransReportList',
    component: empTransReportList,
  },
]