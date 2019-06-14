/**
 * Created by darren on 2018/08/04.
 */
export const getHash = (level) => {
  let ut = window.localStorage.getItem('webToken');
  if (level === 'None') {
    return 'www.hrocloud.com';
  } else if (ut) {
    return ut;
  } else {
    return window.localStorage.getItem('webToken');
  }
}

/*
 * expend Object
 * params: obj1,obj2
 * just like jQuery $expend()
 * */
export const extendObject = (obj1, obj2) => {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key) === true) {
      obj1[key] = obj2[key]
    }
  }
}

export const encrypt = (level, params) => {
  delete params._sig
  params._aid = pubsource.applicationId
  //   params._comid = pubsource.companyId
  //增加对data的trim处理  2018-10-17 darren
  for (let n in params) {
    // console.info(typeof params[n])
    // console.info(params[n])
    if (params[n] !== undefined && typeof params[n] === 'string') {
      params[n] = params[n].toString().trim();
    }
  }
  let s = "";
  let keys = [];
  for (let k in params) {
    keys.push(k);
  }
  keys.sort();
  for (let i = 0; i < keys.length; i++) {
    s = s + keys[i] + '=' + params[keys[i]];
  }
  s += getHash(level);
  params._sig = md5(s);
  if (level !== 'None') {
    let token = window.localStorage.getItem('token');
    if (token && token !== undefined) {
      params._tk = encodeURI(token);
    }
  }
  return params;
}

export const isSuccess = (data, t) => {
  let apicode = data.data.stat.code
  if (apicode === 0) {
    let buscode = data.data.stat.stateList[0].code
    if (buscode === 0) {
      return true;
    } else if (buscode !== 0) {
      if (buscode === 9402) {
        t.$notify({
          message: data.data.stat.stateList[0].desc,
          duration: 1500,
          background: '#f44'
        });
        return false;
      } else {
        t.$notify({
          message: data.data.stat.stateList[0].desc,
          duration: 1500,
          background: '#f44'
        });
        return false;
      }
    }
  } else if (apicode !== 0) {
    if (apicode === -300 || apicode === -320 || apicode === -340 || apicode === -360 || apicode === -380 || apicode === -370 || apicode === -163) {
      t.$notify({
        message: '登录信息已失效',
        duration: 1500,
        background: '#f44'
      });
      // t.$router.push('login');
      //   t.$router.push({
      //     name: 'login'
      //   })
    } else {
      t.$notify({
        message: '网络错误',
        duration: 1500,
        background: '#f44'
      });
    }
    return false;
  }
}

//判断字符串为空
export const strIsnull = (str) => {
  if (typeof (str) === 'object' && str === null) {
    return true
  }
  if (str === undefined) {
    return true
  }
  if (str === 'undefined' || str === 'null') {
    return true
  }
  let rtn = false,
    reg = /^\s*$/g;
  if (str.match(reg))
    rtn = true;
  return rtn;
}

// 复制对象
export const deepCopy = (obj) => {
  let gettype = Object.prototype.toString
  if (typeof obj != 'object' || gettype.call(obj) === '[object Date]') {
    return obj;
  }
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return obj
  }
  let newobj = {};
  for (let attr in obj) {
    newobj[attr] = deepCopy(obj[attr]);
  }
  return newobj;
}

// 获取路由传参
export const getUrlKey = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

export const encryptNew = (level, params) => {
  /* 删除jqgrid中下一页的时候默认参数中包含上一次的_sig参数 */
  delete params._sig;
  delete params.data;
  params._aid = pubsource.applicationId
  let param = {};
  param._mt = params._mt;
  delete params._mt;
  // 分页使用的条件数据
  if (params.rows != undefined) {
    param.rows = params.rows;
    delete params.rows;
  }
  if (params.page != undefined) {
    param.page = params.page;
    delete params.page;
  }
  if (params.sort != undefined) {
    param.sort = params.sort;
    delete params.sort;
  }
  if (params.order != undefined) {
    param.order = params.order;
    delete params.order;
  }
  if (params.funId != undefined) {
    param.funId = params.funId;
    delete params.funId;
  }
  if (params.logType != undefined) {
    param.logType = params.logType;
    delete params.logType;
  }
  if (params.funId != undefined) {
    param.funId = params.funId
    delete params.funId;
  }
  if (params.clmMap != undefined) {
    param.clmMap = params.clmMap
    delete params.clmMap;
  }
  if (params.tbName != undefined) {
    param.tbName = params.tbName
    delete params.tbName;
  }
  if (params.roleType != undefined) {
    param.roleType = params.roleType
    delete params.roleType;
  }
  if (params.stepId != undefined) {
    param.stepId = params.stepId
    delete params.stepId;
  }
  if (params.pkValue != undefined) {
    param.pkValue = params.pkValue
    delete params.pkValue;
  }
  if (params.empId != undefined) {
    param.empId = params.empId
    delete params.empId;
  }
  if (params.userId != undefined) {
    param.userId = params.userId
    delete params.userId;
  }
  if (params.stepCode != undefined) {
    param.stepCode = params.stepCode
    delete params.stepCode;
  }
  if (params.dataId != undefined) {
    param.dataId = params.dataId
    delete params.dataId;
  }
  if (params.selType != undefined) {
    param.selType = params.selType
    delete params.selType;
  }
  param.companyId = params.companyId
  delete params.companyId;
  param._aid = params._aid
  delete params._aid;

  //增加对data的trim处理  2018-10-17 darren
  for (let n in params) {
    // console.info(typeof params[n])
    // console.info(params[n])
    if (params[n] !== undefined && typeof params[n] === 'string') {
      params[n] = params[n].toString().trim();
    }
  }


  param.data = JSON.stringify(params);
  let s = "",
    keys = [];
  for (let k in param) {
    keys.push(k);
  }
  keys.sort();
  for (let i = 0; i < keys.length; i++) {
    s = s + keys[i] + "=" + param[keys[i]];
  }
  s += getHash(level);
  param._sig = md5(s);
  if (level !== 'None') {
    let token = window.localStorage.getItem('token');
    if (token && token !== undefined) {
      param._tk = encodeURI(token);
    }
  }
  return param;
}
/* 特殊处理放在data外面 */

export const encryptEmpId = (level, params) => {

  /* 删除jqgrid中下一页的时候默认参数中包含上一次的_sig参数 */
  delete params._sig;
  delete params.data;
  params._aid = pubsource.applicationId
  let param = {};
  param._mt = params._mt;
  delete params._mt;
  // 分页使用的条件数据
  if (params.rows != undefined) {
    param.rows = params.rows;
    delete params.rows;
  }
  if (params.page != undefined) {
    param.page = params.page;
    delete params.page;
  }
  if (params.sort != undefined) {
    param.sort = params.sort;
    delete params.sort;
  }
  if (params.order != undefined) {
    param.order = params.order;
    delete params.order;
  }
  if (params.logType != undefined) {
    param.logType = params.logType;
    delete params.logType;
  }
  if (params.pkValue != undefined) {
    param.pkValue = params.pkValue
    delete params.pkValue;
  }
  if (params.userId != undefined) {
    param.userId = params.userId
    delete params.userId;
  }
  param.companyId = params.companyId
  delete params.companyId;
  param._aid = params._aid
  delete params._aid;
  for (let n in params) {
    if (params[n] !== undefined && typeof params[n] === 'string') {
      params[n] = params[n].toString().trim();
    }
  }

  param.data = JSON.stringify(params);
  let s = "",
    keys = [];
  for (let k in param) {
    keys.push(k);
  }
  keys.sort();
  for (let i = 0; i < keys.length; i++) {
    s = s + keys[i] + "=" + param[keys[i]];
  }
  s += getHash(level);
  param._sig = md5(s);
  if (level !== 'None') {
    let token = window.localStorage.getItem('token');
    if (token && token !== undefined) {
      param._tk = encodeURI(token);
    }
  }
  return param;
}
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
export const setCookie = (name, value) => {
  let Days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + escape(value) + ';expires=' +
    exp.toGMTString() + '; path=/';
};
export const getCookie = (name) => {
  let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
};
