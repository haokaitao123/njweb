// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './vuex'
import 'lib-flexible/flexible'
import axios from 'axios'
import 'babel-polyfill'
import {
  ToastPlugin,
  XButton
} from 'vux'
import verify from "vue-verify-plugin";
import valid from './lib/pub_valid';
import {
  Picker,
  Popup,
  DatetimePicker,
  PullRefresh,
  List,
  Loading,
  search,
  ImagePreview,
  Notify,
  Dialog,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Icon,
   Row, 
   Col
} from 'vant';
Vue.use(DatetimePicker).use(Picker).use(Popup).use(PullRefresh).
use(List).use(Loading).use(search).use(ImagePreview).use(Notify)
  .use(Dialog).use(RadioGroup).use(Radio).use(Checkbox).use(CheckboxGroup).use(Icon).use(Row).use(Col);
Notify.setDefaultOptions.duration = '1000'
var myRules = {
  required: {
    test: function (val) {
      if (val.length == "") {
        return false
      }
      if (val.indexOf("请选择") != -1) {
        return false
      }
      return true;
    },
    message: ""
  },

  mobile: {
    test: function (val) {
      if (val !== "") {
        if (valid.val_mobile(val)) {
          return true;
        }
        return false;
      }
      return true;
    },
    message: ""
  },

  idNumber: {
    test: function (val) {
      if (val !== "") {
        if (valid.val_identity(val)) {
          return true;
        }
        return false;;
      }
      return true
    },
    message: ""
  },
  number: {
    test: function (val) {
      if (val !== "") {
        if (valid.val_number103(val)) {
          return true;
        }
        return false;
      }
      return true;
    },
    message: ""
  },
  email: {
    test: function (val) {
      if (val !== "") {
        if (valid.val_mail2(val)) {
          return true;
        }
        return false;
      }
      return true;
    },
    message: ""
  },
}
Vue.use(verify, {
  rules: myRules,
  blur: true
});
Vue.prototype.http = axios

Vue.use(ToastPlugin)
Vue.component('x-button', XButton)
// FastClick.attach(document.body)

Vue.config.productionTip = false

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
axios.interceptors.request.use(
  config => {
    store.commit('showLoading');
    return config
  },
  error => {
    store.commit('hideLoading');
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {

    return response
  },

  error => {
    store.commit('hideLoading');
    return Promise.reject(error)
  }
);

/* eslint-disable no-new */
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm
