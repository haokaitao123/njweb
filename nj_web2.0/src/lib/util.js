/**
 * Created by Aaron on 2017/12/18.
 */
// import pubsource from './pub_source';

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

export const encrypt = (level, params) => {
  delete params._sig
  params._aid = pubsource.applicationId
  let s = "";

  //增加对data的trim处理  2018-10-17 darren
  // console.info(params);
  // console.info('encrypt')
  for (let n in params) {
    // console.info(typeof params[n])
    // console.info(params[n])
    if (params[n] !== undefined && typeof params[n] === 'string') {
      params[n] = params[n].toString().trim();
    }
  }
  // console.info(params);

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
  return params;
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
  if (params.subFromId != undefined) {
    param.subFromId = params.subFromId
    delete params.subFromId;
  }
  if (params.filter != undefined) {
    param.filter = params.filter
    delete params.filter;
  }
  if (params.flowDataId != undefined) {
    param.flowDataId = params.flowDataId
    delete params.flowDataId;
  }
  if (params.subFormType != undefined) {
    param.subFormType = params.subFormType
    delete params.subFormType;
  }
  if (params.flowId != undefined) {
    param.flowId = params.flowId
    delete params.flowId;
  }
  if (params.funCode != undefined) {
    param.funCode = params.funCode
    delete params.funCode;
  }
  if (params.usNname != undefined) {
    param.usNname = params.usNname
    delete params.usNname;
  }
  param.companyId = params.companyId
  delete params.companyId;
  param._aid = params._aid
  delete params._aid;

  //增加对data的trim处理  2018-10-17 darren
  // console.info(params);
  // console.info('encryptNew')
  for (let n in params) {
    // console.info(typeof params[n])
    // console.info(params[n])
    if (params[n] !== undefined && typeof params[n] === 'string') {
      params[n] = params[n].toString().trim();
    }
  }
  // console.info(params);

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
  return param;
}
export const encryptNew2 = (level, params) => {
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
  if (params.flowId != undefined) {
    param.flowId = params.flowId
    delete params.flowId;
  }
  if (params.cmutType != undefined) {
    param.cmutType = params.cmutType
    delete params.cmutType;
  }
  param.companyId = params.companyId
  delete params.companyId;
  param._aid = params._aid
  delete params._aid;

  //增加对data的trim处理  2018-10-17 darren
  // console.info(params);
  // console.info('encryptNew2')
  for (let n in params) {
    // console.info(typeof params[n])
    // console.info(params[n])
    if (params[n] !== undefined && typeof params[n] === 'string') {
      params[n] = params[n].toString().trim();
    }
  }
  // console.info(params);

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
  return param;
}
//  李琪专用
export const encryptNew3 = (level, params) => {
  /* 删除jqgrid中下一页的时候默认参数中包含上一次的_sig参数 */
  delete params._sig;

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
  if (params.flowId != undefined) {
    param.flowId = params.flowId
    delete params.flowId;
  }
  param.companyId = params.companyId
  delete params.companyId;
  param._aid = params._aid
  delete params._aid;

  //增加对data的trim处理  2018-10-17 darren
  // console.info(params);
  // console.info('encryptNew3')
  for (let n in params) {
    // console.info(typeof params[n])
    // console.info(params[n])
    if (params[n] !== undefined && typeof params[n] === 'string') {
      params[n] = params[n].toString().trim();
    }
  }
  // console.info(params);

  param.data = params.data;;
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
  return param;
}

export const encryptSenior = (level, params, arr, arr2) => {
  /* 删除jqgrid中下一页的时候默认参数中包含上一次的_sig参数 */
  delete params._sig;
  delete params.data;
  params._aid = pubsource.applicationId
  let param = {};
  //独立的参数（仅仅需要一次）
  for (const k in arr) {
    if (typeof arr[k] !== 'function')
      param[arr[k]] = params[arr[k]];
    delete params[arr[k]];
  }
  //独立的参数（data中也需要的参数）
  if (arr2 != null && arr2 != undefined) {
    for (let k in arr2) {
      param[arr2[k]] = params[arr2[k]];
    }
  }
  //增加对data的trim处理  2018-10-17 darren
  // console.info(params);
  // console.info('encryptSenior')
  for (let n in params) {
    // console.info(typeof params[n])
    // console.info(params[n])
    if (params[n] !== undefined && typeof params[n] === 'string') {
      params[n] = params[n].toString().trim();
    }
  }
  // console.info(params);

  param.data = JSON.stringify(params);
  let s = "",
    keys = [];
  for (const k in param) {
    keys.push(k);
  }
  keys.sort();
  for (let i = 0; i < keys.length; i++) {
    s = s + keys[i] + '=' + param[keys[i]];
  }
  s += getHash(level);
  param._sig = md5(s);
  return param;
};

export const getHash = (level) => {
  let ut = getCookie('wtk')
  if (level === 'None') {
    return 'www.hrocloud.com';
  } else if (ut) {
    return ut;
  } else {
    return window.localStorage.getItem('CF_TOKEN');
  }
}

export const isSuccess = (data, t) => {
  let apicode = data.data.stat.code
  if (apicode === 0) {
    let buscode = data.data.stat.stateList[0].code
    if (buscode === 0) {
      return true;
    } else if (buscode !== 0) {
      if (buscode === -100) {
        t.$Message.error("网络错误");
      } else {
        t.$Message.error(data.data.stat.stateList[0].desc);
      }
      return false;
    }
  } else if (apicode !== 0) {
    if (apicode === -100 || apicode === -120 || apicode === -140 || apicode === -200 || apicode === -280 || apicode === -300 || apicode === -360) {
      t.$Message.error("网络错误");
    } else {
      t.$Message.error(data.data.stat.stateList[0].desc);
    }
    if (apicode === -300 || apicode === -320 || apicode === -340 || apicode === -360 || apicode === -380 || apicode === -370 || apicode === -163) {
      layer.closeAll() //关闭即时通讯
      t.$router.push('/loginmain/login')
    }
    return false;
  }
}

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
export const getUrlKey = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
export const GetQueryString = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
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
// Find components upward
export const findComponentUpward = (context, componentName, componentNames) => {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
