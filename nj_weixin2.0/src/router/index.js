import Vue from 'vue'
import Router from 'vue-router'
import {
  resolve
} from 'path';

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login/login'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: resolve => require(['@/pages/forgetPwd/forgetPwd'], resolve),
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/function',
      name: 'function',
      component: resolve => require(['@/pages/main/function'], resolve),
      meta: {
        showTar: true,
        title: "功能"
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/pages/main/mine'], resolve),
      meta: {
        showTar: true,
        title: "我的"
      }
    },
    {
      path: '/approve',
      name: 'approve',
      component: resolve => require(['@/pages/approve/approve'], resolve),
      meta: {
        showTar: true,
        title: "审批"
      }
    },
    {
      path: '/apprInfo',
      name: 'apprInfo',
      component: resolve => require(['@/pages/approve/apprInfo'], resolve),
      meta: {
        title: "审批详情"
      }
    },
    {
      path: '/interview',
      name: 'interview',
      component: resolve => require(['@/pages/function/interview/interview'], resolve),
      meta: {
        title: '面试预约'
      }
    },
    {
      path: '/addInterview',
      name: 'addInterview',
      component: resolve => require(['@/pages/function/interview/addInterview'], resolve),
      meta: {
        title: '新增预约'
      }
    },
    {
      path: '/interviewMes',
      name: 'interviewMes',
      component: resolve => require(['@/pages/function/interview/interviewMes'], resolve),
      meta: {
        title: '预约信息'
      }
    },
    {
      path: '/interviewOpinion',
      name: 'interviewOpinion',
      component: resolve => require(['@/pages/function/interview/interviewOpinion'], resolve),
      meta: {
        title: '面试意见'
      }
    },
    {
      path: '/interviewSuccess',
      name: 'interviewSuccess',
      component: resolve => require(['@/pages/function/interview/interviewSuccess'], resolve),
      meta: {
        title: '简历信息'
      }
    },
    {
      path: '/resumeInfo',
      name: 'resumeInfo',
      component: resolve => require(['@/pages/function/interview/resumeInfo'], resolve),
      meta: {
        title: '简历信息'
      }
    },
    {
      path: '/educationMes',
      name: 'educationMes',
      component: resolve => require(['@/pages/function/interview/educationMes'], resolve),
      meta: {
        title: '教育信息'
      }
    },
    {
      path: '/workExp',
      name: 'workExp',
      component: resolve => require(['@/pages/function/interview/workExp'], resolve),
      meta: {
        title: '工作经历'
      }
    },
    {
      path: '/family',
      name: 'family',
      component: resolve => require(['@/pages/function/interview/family'], resolve),
      meta: {
        title: '家庭成员'
      }
    },
    {
      path: '/employInfoChange',
      name: 'employInfoChange',
      component: resolve => require(['@/pages/function/employInfoChange/employInfoChange'], resolve),
      meta: {
        title: '员工信息修改'
      }
    },
    {
      path: '/empChangeDeatail',
      name: 'empChangeDeatail',
      component: resolve => require(['@/pages/function/employInfoChange/empChangeDeatail'], resolve),
      meta: {
        title: '员工信息修改'
      }
    },
    //  {
    //    path: '/empChange',
    //    name: 'empChange',
    //    component: resolve => require(['@/pages/function/employInfoChange/empChange'], resolve),
    //    meta: {
    //      title: '员工信息修改'
    //    }
    //  },
    {
      path: '/empContractRenewal',
      name: 'empContractRenewal',
      component: resolve => require(['@/pages/function/empContractRenewal/empContractRenewal'], resolve),
      meta: {
        title: '合同续签'
      }
    },
    {
      path: '/contractRenewalDetail',
      name: 'contractRenewalDetail',
      component: resolve => require(['@/pages/function/empContractRenewal/contractRenewalDetail'], resolve),
      meta: {
        title: '合同续签确认'
      }
    },
    {
      path: '/dimission',
      name: 'dimission',
      component: resolve => require(['@/pages/function/dimission/dimission'], resolve),
      meta: {
        title: '员工离职申请'
      }
    },
    {
      path: '/dimissionDetail',
      name: 'dimissionDetail',
      component: resolve => require(['@/pages/function/dimission/dimissionDetail'], resolve),
      meta: {
        title: '员工离职申请'
      }
    },
    {
      path: '/survey',
      name: 'survey',
      component: resolve => require(['@/pages/function/dimission/survey'], resolve),
      meta: {
        title: '问卷调查'
      }
    },
    {
      path: '/informNotice',
      name: 'informNotice',
      component: resolve => require(['@/pages/function/informNotice/informNotice'], resolve),
      meta: {
        title: '通知公告'
      }
    },
    {
      path: '/informDetails',
      name: 'informDetails',
      component: resolve => require(['@/pages/function/informNotice/informDetails'], resolve),
      meta: {
        title: '通知公告详情'
      }
    },
    {
      path: '/empInfo',
      name: 'empInfo',
      component: resolve => require(['@/pages/function/empInfo/empInfo'], resolve),
      meta: {
        title: '员工信息填写'
      }
    },
    {
      path: '/empEducation',
      name: 'empEducation',
      component: resolve => require(['@/pages/function/empInfo/empEducation'], resolve),
      meta: {
        title: '学历信息管理'
      }
    },
    {
      path: '/empFamily',
      name: 'empFamily',
      component: resolve => require(['@/pages/function/empInfo/empFamily'], resolve),
      meta: {
        title: '家庭成员管理'
      }
    },
    {
      path: '/empWorkExp',
      name: 'empWorkExp',
      component: resolve => require(['@/pages/function/empInfo/empWorkExp'], resolve),
      meta: {
        title: '工作经历管理'
      }
    },
    {
      path: '/searchCountry',
      name: 'searchCountry',
      component: resolve => require(['@/components/search/searchCountry'], resolve),
      meta: {
        title: '选择国家'
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  let isLogin = window.localStorage.getItem('token');
  let empId = window.localStorage.getItem('empId');
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 已登录状态；当路由到login时，跳转至home 
  if (to.name === 'login') {
    if (isLogin && empId) {
      router.push({
        name: 'function'
      });
      next('/function')
    }
  } else {
    if (to.name !== 'resumeInfo' && to.name !== 'interviewSuccess') {
      if (!isLogin || !empId) {
        router.push({
          name: 'login'
        });
      }
    }
  }
  next();
});

export default router;
