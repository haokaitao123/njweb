/**
 * Created by Aaron on 2019/07/03.
 */

//入职人员报表
const empReportList = resolve => require(['@/pages/report/empReportList'], resolve)
//离职员工名单
const empdimReportList = resolve => require(['@/pages/report/empdimReportList'], resolve)

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
]