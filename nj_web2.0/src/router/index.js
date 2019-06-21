import Vue from 'vue'
import main from '@/pages/main'
import home from '@/pages/homePage/home'
import authorization from './authorization'
import customOption from './customOption'
import platform from './platform'
import Router from 'vue-router'
import root from './root'
import login from './login'
import base from './base'
import userinfo from './userinfo'
import sihf from './sihf'
import manageInform from './manageInform'
import employee from './employee'
import common from './common'
import configManage from './configManage'
import payroll from './payroll'
import emp from './emp'
import cmut from './cmut'
import ansrpt from './ansrpt'
import personnelFile from './personnelfile'
import HRmanageDiagnosis from './HRmanageDiagnosis'
import laborEvaluation from './laborEvaluation'
import talentAssessManage from './talentAssessManage'
import evaluationManage from './evaluationManage'
import recruit from './recruit'
import remind from './remind'
import atten from './atten'
import perfAssess from './perfAssess'
Vue.use(Router)

export default new Router({
  // base: '/tshrssc3/',
  routes: [{
      path: '/',
      name: 'main',
      component: main,
      children: [{
          path: 'home',
          name: 'home',
          component: home,
        },

        ...root,
        ...authorization,
        ...customOption,
        ...platform,
        ...base,
        ...userinfo,
        ...sihf,
        ...manageInform,
        ...employee,
        ...common,
        ...configManage,
        ...payroll,
        ...cmut,
        ...ansrpt,
        ...personnelFile,
        ...HRmanageDiagnosis,
        ...laborEvaluation,
        ...talentAssessManage,
        ...evaluationManage,
        ...recruit,
        ...remind,
        ...atten,
        ...perfAssess
      ]
    },
    ...emp,
    ...login,
  ]
})
