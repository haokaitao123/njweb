/**
 * Created by Aaron on 2018/3/19.
 */
import entryFlow from '@/pages/common/entryFlow/entryFlow'
import interFlow from '@/pages/common/interFlow/interFlow'
import dimFlow from '@/pages/common/dimFlow/dimFlow'
import proFlow from '@/pages/common/proFlow/proFlow'
import conextFlow from '@/pages/common/conextFlow/conextFlow'
import processFlow from '@/pages/common/processFlow/processFlow'
import commonFlowList from '@/pages/common/commonFlowList/commonFlowList'
import flowPayrollProcess from '@/pages/common/commonFlowList/flowPayrollProcess'
import commonList from '@/pages/common/commonList/commonSinglePageList'
import archivenFlow from '@/pages/common/archivenFlow/archivenFlow'
import archborFlow from '@/pages/common/archborFlow/archborFlow'
import abroadFlow from '@/pages/common/abroad/abroadFlow'
import passportFlow from '@/pages/common/passport/passportFlow'
import visareturnFlow from '@/pages/common/visareturn/visareturnFlow'
import recruitProcess from '@/pages/common/recruitProcessFlow/recruitProcess'
export default [
  {
    path: 'visareturnFlow',
    name: 'visareturnFlow',
    component: visareturnFlow,
  },
  {
    path: 'archborFlow',
    name: 'archborFlow',
    component: archborFlow,
  },
  {
    path: 'archivenFlow',
    name: 'archivenFlow',
    component: archivenFlow,
  },
  {
    path: 'commonFlowList',
    name: 'commonFlowList',
    component: commonFlowList,
  },
  {
    path: 'flowPayrollProcess',
    name: 'flowPayrollProcess',
    component: flowPayrollProcess,
  },
  {
    path: 'commonList',
    name: 'commonList',
    component: commonList,
  },
  {
    path: 'entryFlow',
    name: 'entryFlow',
    component: entryFlow,
  },
  {
    path: 'interFlow',
    name: 'interFlow',
    component: interFlow,
  },
  {
    path: 'dimFlow',
    name: 'dimFlow',
    component: dimFlow,
  },
  {
    path: 'proFlow',
    name: 'proFlow',
    component: proFlow,
  },
  {
    path: 'conextFlow',
    name: 'conextFlow',
    component: conextFlow,
  },
  {
    path: 'processFlow',
    name: 'processFlow',
    component: processFlow,
  },
  {
    path: 'abroadFlow',
    name: 'abroadFlow',
    component: abroadFlow,
  },
  {
    path: 'passportFlow',
    name: 'passportFlow',
    component: passportFlow,
  },
  {
    path: 'recruitProcess',
    name: 'recruitProcess',
    component: recruitProcess,
  },
]
