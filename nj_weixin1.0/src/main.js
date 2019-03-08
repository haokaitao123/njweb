// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'
import 'lib-flexible/flexible'
import Mint from 'mint-ui';
import'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(MuseUI)

// 对话框
import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';
Vue.use(Message);

// 转动
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';
Vue.use(Loading);
import axios from 'axios'
Vue.prototype.http = axios
Vue.use(Mint);
import * as colors from 'muse-ui/lib/theme/colors'
Vue.config.productionTip = false
theme.use('light')
import $ from 'jquery'
import { Datetime, Group } from 'vux'
Vue.component(Datetime.name, Datetime);
Vue.component(Group.name, Group);
// 图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import NoInfo from './components/NoInfo.vue';
Vue.component('no-Info',NoInfo)
import 'babel-polyfill'
/*
* 格式化日期时间
* */
Date.prototype.format = function(fmt) {
  let o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(let k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
