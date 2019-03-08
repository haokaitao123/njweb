/**
 * Created by Aaron on 2018/04/08.
 */

import paySalItemManage from  '@/pages/payroll/paySalItem/paySalItemManage'
import paySalSetManage from '@/pages/payroll/paySalSet/paySalSetManage'
import paySalplanManage from '@/pages/payroll/paySalplan/paySalplanManage'
import paySalplanConfirmManage from '@/pages/payroll/PaySalplanConfirm/paySalplanManage'
import paySalplanPostManage from '@/pages/payroll/paySalplanPost/paySalplanManage'
import payPlantemplateList from '@/pages/payroll/PayPlantemplate/payPlantemplateList'
import paySalplanCheckManage from '@/pages/payroll/paySalplanCheck/paySalplanManage'
import payCompList from '@/pages/payroll/payCompConfig/payCompList'
//薪资流程配置
import payProcess from '@/pages/payroll/PayProcessconfig/payProcess'
//入职薪资处理
import payAddCheck from '@/pages/payroll/payAddManage/payAddCheck/payAddList'
import payAddConfirm from '@/pages/payroll/payAddManage/payAddConfirm/payAddList'
import payAddSysUpd from '@/pages/payroll/payAddManage/payAddSysUpd/payAddList'
//离职薪资处理
import payEndCheck from '@/pages/payroll/payEndManage/payEndCheck/payEndList'
import payEndConfirm from '@/pages/payroll/payEndManage/payEndConfirm/payEndList'
import payEndSysUpd from '@/pages/payroll/payEndManage/payEndSysUpd/payEndList'
//薪资调整处理
import payAdjustApplication from '@/pages/payroll/payAdjustManage/payAdjustApplication/payAdjustList'
import payAdjustConfirm from '@/pages/payroll/payAdjustManage/payAdjustConfirm/payAdjustList'
import payAdjustSysUpd from '@/pages/payroll/payAdjustManage/payAdjustSysUpd/payAdjustList'
import empPayrollSalary from '@/pages/payroll/empPayrollSalary/salaryBaseManage'
//月度非周期性薪资收集
import payMonPeriodSubmit from '@/pages/payroll/PayMonPeriodManage/payMonSubmit/payMonPeriodManage'
import payMonPeriodConfirm from '@/pages/payroll/PayMonPeriodManage/payMonConfirm/payMonPeriodManage'
import payMonPeriodSysUpd from '@/pages/payroll/PayMonPeriodManage/payMonSysUpd/payMonPeriodManage'
// 薪资核算
import payAccountList from '@/pages/payroll/payAccount/payAccountList'
import payrollReportManage from '@/pages/payroll/payrollReport/payrollReportManage'
// 专项附加税
import SpecialSurtax from '@/pages/payroll/SpecialSurtax/SpecialSurtax'
// 员工薪资查询
import empPayrollList from '@/pages/payroll/emPayrollSearch/empPayrollList'



export default [
  {
    path: 'empPayrollList',
    name: 'empPayrollList',
    component: empPayrollList,
  },
  {
    path: 'paySalItemManage',
    name: 'paySalItemManage',
    component: paySalItemManage,
  },
  {
    path: 'paySalSetManage',
    name: 'paySalSetManage',
    component: paySalSetManage,
  },
  {
    path: 'paySalplanManage',
    name: 'paySalplanManage',
    component: paySalplanManage,
  },
  {
    path: 'paySalplanConfirmManage',
    name: 'paySalplanConfirmManage',
    component: paySalplanConfirmManage,
  },
  {
    path: 'paySalplanCheckManage',
    name: 'paySalplanCheckManage',
    component: paySalplanCheckManage,
  },
  {
    path: 'paySalplanPostManage',
    name: 'paySalplanPostManage',
    component: paySalplanPostManage,
  },
  {
    path: 'payPlantemplateList',
    name: 'payPlantemplateList',
    component: payPlantemplateList,
  },
  {
    path: 'payCompList',
    name: 'payCompList',
    component: payCompList,
  },
  {
    path: 'payProcess',
    name: 'payProcess',
    component: payProcess,
  },
  {
    path: 'payAddCheck',
    name: 'payAddCheck',
    component: payAddCheck,
  },
  {
    path: 'payAddConfirm',
    name: 'payAddConfirm',
    component: payAddConfirm,
  },
  {
    path: 'payAddSysUpd',
    name: 'payAddSysUpd',
    component: payAddSysUpd,
  },
  {
    path: 'payEndCheck',
    name: 'payEndCheck',
    component: payEndCheck,
  },
  {
    path: 'payEndConfirm',
    name: 'payEndConfirm',
    component: payEndConfirm,
  },
  {
    path: 'payEndSysUpd',
    name: 'payEndSysUpd',
    component: payEndSysUpd,
  },
  {
    path: 'payAdjustApplication',
    name: 'payAdjustApplication',
    component: payAdjustApplication,
  },
  {
    path: 'payAdjustConfirm',
    name: 'payAdjustConfirm',
    component: payAdjustConfirm,
  },
  {
    path: 'payAdjustSysUpd',
    name: 'payAdjustSysUpd',
    component: payAdjustSysUpd,
  },
  {
    path: 'empPayrollSalary',
    name: 'empPayrollSalary',
    component: empPayrollSalary,
  },
  {
    path: 'payMonPeriodSubmit',
    name: 'payMonPeriodSubmit',
    component: payMonPeriodSubmit,
  },
  {
    path: 'payMonPeriodConfirm',
    name: 'payMonPeriodConfirm',
    component: payMonPeriodConfirm,
  },
  {
    path: 'payMonPeriodSysUpd',
    name: 'payMonPeriodSysUpd',
    component: payMonPeriodSysUpd,
  },
  {
    path: 'payAccountList',
    name: 'payAccountList',
    component: payAccountList,
  },
  {
    path: 'payrollReportManage',
    name: 'payrollReportManage',
    component: payrollReportManage,
  },
  {
    path: 'SpecialSurtax',
    name: 'SpecialSurtax',
    component: SpecialSurtax,
  },

]
