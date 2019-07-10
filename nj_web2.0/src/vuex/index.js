/**
 * Created by Aaron on 2017/12/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import sysData from '../pages/PlatFormManager/systemForm/sysData'
import platRole from '../pages/PlatFormManager/platRolecontact/platRole'
import flowStepData from '../pages/PlatFormManager/platFlowStep/flowStepData'
import platFis from '../pages/platFormManager/platFiscalyear-manage/platFis'
import sihfPo from '../pages/sihfManage/sihfPolicy-manage/sihfPo'
import providFund from '../pages/sihfManage/providFund-manage/providFund'
import empPo from '../pages/empManage/empmaster-manage/empPo'
import atsk from '../pages/PlatFormManager/autoTask/atsk'
import platSysMailJS from '../pages/PlatFormManager/platSysmail/platSysMailJS'
import docTemp from '../pages/PlatFormManager/platDocTemplate/docTemp'
import platGetValDefine from '../pages/PlatFormManager/platGetValDefine/platGetValDefine'
import paySalSet from '../pages/payroll/paySalSet/paySalSet'
import message from '../pages/manageInform/message/message'
import orderTeam from '../pages/cmutManage/orderSupTeam/orderTeam'
import workOrder from '../pages/workOrderManager/commitWorkOrder/workOrder'
import myWorkOrderNew from '../pages/workOrderManager/myWorkOrderNew/WorkOrderNew'
import platApproval from '../pages/PlatFormManager/platApproval/platApproval'
import toDoCommon from '../pages/employeePage/toDoSchedule/toDoCommon'
import ansrptEmpSihf from '../pages/sihfManage/ansrptEmpSihf/ansrptEmpSihf'
import ansrptHosfSihf from '../pages/sihfManage/ansrptHosfSihf/ansrptHosfSihf'
import repayApply from '../pages/sihfManage/repay/apply/repayApply'
import repayConfirm from '../pages/sihfManage/repay/confirm/repayConfirm'
import repayResult from '../pages/sihfManage/repay/result/repayResult'
import repayHfrepay from '../pages/sihfManage/hfrepay/apply/repayHfrepay'
import hfrepayConfirm from '../pages/sihfManage/hfrepay/confirm/hfrepayConfirm'
import hfrepayResult from '../pages/sihfManage/hfrepay/result/hfrepayResult'
import calcJsBase from '../pages/sihfManage/calc/calcJsBase'
import hfcalcJsBase from '../pages/sihfManage/hfcalc/hfcalcJsBase'
import finServicesBoardList from '../pages/financialManagement/finServicesBoard/finServicesBoardList'
import flowClmkMap from '../pages/common/entryFlow/flowClmkMap'
import btnOperate from '../components/btnAuth/btnState'
import empBorrow from '../pages/empManage/empBorrow/empBorrow'
import commonPage from '../components/commonPage/comPage'
import empMaster from '../pages/empManage/empmaster-manage3/empmaster'
import recruitProcess from '../pages/common/commonFlowList/recruitProcess'
import attenQuotainfo from '../pages/attenManage/attenQuotainfo/attenQuotainfo'
import autoSearch from '../pages/common/searchTable/autoSearch'
import empdim from '../pages/common/onBlur/empdim_store'
import payEntrybase from '../pages/payroll/payEntrybaseManage/payEntrybase'
import payLeaveprop from '../pages/payroll/payLeavepropManage/payLeaveprop'
import payProjbase from '@/pages/payroll/payProjbase/payProjbase'
import changePwd from '@/pages/useinfo/changePwd'
import commonFlowButton from '@/pages/common/commonFlowList/commonFlowButton'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {

  },
  modules: {
    payEntrybase,
    payLeaveprop,
    app,
    user,
    sysData,
    platRole,
    flowStepData,
    platFis,
    sihfPo,
    providFund,
    paySalSet,
    empPo,
    atsk,
    platSysMailJS,
    docTemp,
    platGetValDefine,
    message,
    orderTeam,
    workOrder,
    platApproval,
    toDoCommon,
    ansrptEmpSihf,
    ansrptHosfSihf,
    repayApply,
    repayConfirm,
    repayResult,
    repayHfrepay,
    hfrepayConfirm,
    hfrepayResult,
    calcJsBase,
    hfcalcJsBase,
    finServicesBoardList,
    myWorkOrderNew,
    flowClmkMap,
    btnOperate,
    empBorrow,
    commonPage,
    empMaster,
    recruitProcess,
    autoSearch,
    empdim,
    attenQuotainfo,
    payProjbase,
    changePwd,
    commonFlowButton
  },
});

export default store;
