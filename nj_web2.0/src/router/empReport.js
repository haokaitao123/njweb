/**
 * Created by Aaron on 2019/04/03.
 */

//入职人员报表
const empReportList = resolve => require(['@/pages/report/empReportList'], resolve)

export default [
  {
    path: 'empReportList',
    name: 'empReportList',
    component: empReportList,
  },
]