import Vue from 'vue'
import router from './router'
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dialog
} from 'element-ui'
import iView from 'iview'
import jsp from 'jsplumb'
import App from './App'
import 'babel-polyfill'
import 'iview/dist/styles/iview.css'
import VCalendar from '../static/v-calendar/lib/v-calendar.min';
import '../static/v-calendar//lib/v-calendar.min.css';
import VueI18n from 'vue-i18n'
import echarts from 'echarts'
import Locales from '@/local/lang'
import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'
import store from './vuex'
import './assets/iconfont/iconfont.css';
import isIE from '../src/lib/isIE'
import {
  getDataLevelUserLogin
} from './axios/axios'
import {
  isSuccess
} from './lib/util'
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
const lang = window.localStorage.lang || localLang || 'zh-CN'


Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(iView)
Vue.use(VCalendar);
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Dialog)
Vue.use(MenuItemGroup)
Vue.prototype.$jsplumb = jsp.jsPlumb
Vue.prototype.$util = jsp.jsPlumbUtil
Vue.prototype.$echarts = echarts

Vue.config.lang = lang
// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN'])
const mergeEN = Object.assign(enLocale, locales['en-US'])
Vue.locale('zh-CN', mergeZH)
Vue.locale('en-US', mergeEN)

/*
 * 格式化日期时间
 * */
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
Vue.prototype.isIE = isIE
/*
 * 路由设置
 * */
router.afterEach((to, from) => {
  if (to.query.id === undefined) {
    store.commit('setFunId', '2')
  } else {
    store.commit('setFunId', to.query.id)
  }
  store.commit('setFunCode', to.query.code)
})
router.beforeEach((to, from, next) => {
  const t = Vue;
  if (to.query.id === undefined) {
    store.commit('setFunId', '2')
  } else {
    store.commit('setFunId', to.query.id)
  }
  if (to.path.indexOf('loginmain') == -1 && to.path != "/" && to.path != "/home" && to.path != "/ansrptToDoList") {
    const t = this
    let data = {
      _mt: 'sysFunctions.getStatusBtnByAuth',
    }
    getDataLevelUserLogin(data).then((res) => {
      if (isSuccess(res, t)) {
        let modityList = res.data.content[0].rows;
        let isFlowNode = res.data.content[0].isFlowNode;
        store.commit('btnOperate/setBtnData', modityList);
        store.commit('btnOperate/setIsFlowNode', isFlowNode);
        if (isFlowNode == "1") {
          let result = modityList.some(function (item, index, array) {
            return item.funIsdefault == "1";
          })
          let statusDis = "";
          let status = ""
          if (result) {
            for (let v of modityList) {
              if (v.funIsdefault == "1") {
                statusDis = v.funName;
                status = v.funStatecode;
                store.commit('btnOperate/setModity', status)
              }
            }
          } else {
            statusDis = modityList[0].funName;
            status = modityList[0].funStatecode;
            store.commit('btnOperate/setModity', status);
          }
          next();
        } else {
          next();
        }
      }
    })
  } else {
    next()
  }
});
/*
 * 数组是否包含元素
 * */
Array.prototype.contains = function (needle) {
  for (let i in this) {
    if (this[i] == needle) return true
  }
  return false
}
/*
 * 数组是否包含对象（通过id判断）
 * */
Array.prototype.containsObj = function (needle) {
  if (needle) {
    for (let i in this) {
      if (this[i].id == needle.id) return true
    }
  }
  return false
}

layui.use('layer', function () {
  var layer = layui.layer;
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {
    App
  },
})
