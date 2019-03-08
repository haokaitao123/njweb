/**
 * Created by Aaron on 2018/3/2.
 */

//用户普通角色组管理
import sihfPolicy from '@/pages/sihfManage/sihfPolicy-manage/sihfPolicyManage'
import providFund from '@/pages/sihfManage/providFund-manage/providFundManage'

import ansrptEmpSihfa from '@/pages/sihfManage/ansrptEmpSihf/ansrptEmpSihfa'
import ansrptHosf from '@/pages/sihfManage/ansrptHosfSihf/ansrptHosf'

//社保报增
import benefitaddApplication from '@/pages/sihfManage/benefitadd-manage/benefitadd-application/benefitaddList'
import benefitaddConfirm from '@/pages/sihfManage/benefitadd-manage/benefitadd-confirm/benefitaddList'
import benefitaddresult from '@/pages/sihfManage/benefitadd-manage/benefitadd-result/benefitaddList'
//社保报减
import benefitendApplication from '@/pages/sihfManage/benefitend-manage/benefitend-application/benefitendList'
import benefitendConfirm from '@/pages/sihfManage/benefitend-manage/benefitend-confirm/benefitendList'
import benefitendResult from '@/pages/sihfManage/benefitend-manage/benefitend-result/benefitendList'
//公积金报增
import hfundaddApplication from '@/pages/sihfManage/hfundadd-manage/hfundadd-application/hfundaddList'
import hfundaddConfirm from '@/pages/sihfManage/hfundadd-manage/hfundadd-confirm/hfundaddList'
import hfundaddResult from '@/pages/sihfManage/hfundadd-manage/hfundadd-result/hfundaddList'
//公积金报减
import hfundendApplication from '@/pages/sihfManage/hfundend-manage/hfundend-application/hfundendList'
import hfundendConfirm from '@/pages/sihfManage/hfundend-manage/hfundend-confirm/hfundendList'
import hfundendResult from '@/pages/sihfManage/hfundend-manage/hfundend-result/hfundendList'
//社保补缴
import sihfRepayApply from '@/pages/sihfManage/repay/apply/sihfRepayApply'
import sihfRepayConfirm from '@/pages/sihfManage/repay/confirm/sihfRepayConfirm'
import sihfRepayResult from '@/pages/sihfManage/repay/result/sihfRepayResult'
import sihfHfrepayApply from '@/pages/sihfManage/hfrepay/apply/sihfHfrepayApply'
import sihfHfrepayConfirm from '@/pages/sihfManage/hfrepay/confirm/sihfHfrepayConfirm'
import sihfHfrepayResult from '@/pages/sihfManage/hfrepay/result/sihfHfrepayResult'
import sihfCalc from '@/pages/sihfManage/calc/sihfCalc'
import sihfHfCalc from '@/pages/sihfManage/hfcalc/sihfHfcalc'

export default [
  {
    path: 'sihfPolicy',
    name: 'sihfPolicy',
    component: sihfPolicy,
  },
  {
    path: 'providFund',
    name: 'providFund',
    component: providFund,
  },
  {
    path: 'ansrptEmpSihfa',
    name: 'ansrptEmpSihfa',
    component: ansrptEmpSihfa,
  },
  {
    path: 'ansrptHosf',
    name: 'ansrptHosf',
    component: ansrptHosf,
  },
  {
    path: 'benefitaddApplication',
    name: 'benefitaddApplication',
    component: benefitaddApplication,
  },
  {
    path: 'benefitaddConfirm',
    name: 'benefitaddConfirm',
    component: benefitaddConfirm,
  },
  {
    path: 'benefitaddresult',
    name: 'benefitaddresult',
    component: benefitaddresult,
  },
  {
    path: 'benefitendApplication',
    name: 'benefitendApplication',
    component: benefitendApplication,
  },
  {
    path: 'benefitendConfirm',
    name: 'benefitendConfirm',
    component: benefitendConfirm,
  },
  {
    path: 'benefitendResult',
    name: 'benefitendResult',
    component: benefitendResult,
  },
  {
    path: 'hfundaddApplication',
    name: 'hfundaddApplication',
    component: hfundaddApplication,
  },
  {
    path: 'hfundaddConfirm',
    name: 'hfundaddConfirm',
    component: hfundaddConfirm,
  },
  {
    path: 'hfundaddResult',
    name: 'hfundaddResult',
    component: hfundaddResult,
  },
  {
    path: 'hfundendApplication',
    name: 'hfundendApplication',
    component: hfundendApplication,
  },
  {
    path: 'hfundendConfirm',
    name: 'hfundendConfirm',
    component: hfundendConfirm,
  },
  {
    path: 'hfundendResult',
    name: 'hfundendResult',
    component: hfundendResult,
  },
  {
    path: 'sihfRepayApply',
    name: 'sihfRepayApply',
    component: sihfRepayApply,
  },
  {
    path: 'sihfRepayConfirm',
    name: 'sihfRepayConfirm',
    component: sihfRepayConfirm,
  },
  {
    path: 'sihfRepayResult',
    name: 'sihfRepayResult',
    component: sihfRepayResult,
  },
  {
    path: 'sihfHfrepayApply',
    name: 'sihfHfrepayApply',
    component: sihfHfrepayApply,
  },
  {
    path: 'sihfHfrepayConfirm',
    name: 'sihfHfrepayConfirm',
    component: sihfHfrepayConfirm,
  },
  {
    path: 'sihfHfrepayResult',
    name: 'sihfHfrepayResult',
    component: sihfHfrepayResult,
  },
  {
    path: 'sihfCalc',
    name: 'sihfCalc',
    component: sihfCalc,
  },
  {
    path: 'sihfHfCalc',
    name: 'sihfHfCalc',
    component: sihfHfCalc,
  },
]
