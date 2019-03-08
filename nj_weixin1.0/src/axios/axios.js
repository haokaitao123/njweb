/**
 * Created by darren on 2018/08/04.
 */
import axios from 'axios';
import { encrypt, encryptNew,encryptNew1,encryptNew2} from '../lib/util';

/*
* 获取后台数据的公用方法
* 安全级别None
* params 为对象
* */
export const getDataLevelNone = (params) => {
  const requestData = {
    data: params,
    level: "None"
  };
  const data = encrypt(requestData.level, requestData.data);
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    params:data
  })
};

export const getDataLevelNoneNew = (params) => {
  const requestData = {
    data: params,
    level: "None"
  };
  const data = encryptNew(requestData.level, requestData.data);
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    params:data
  })
};


/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * params 为对象
 * */
 export const getDataLevelUserLogin=(params) => {
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  const data = encrypt(requestData.level, requestData.data);
  // console.log(data)
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    params:data,
  })
}
/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * params 为对象
 * 不加companyid
 * */
export const getDataLevelUserLoginNew=(params) => {
  params.companyId = pubsource.companyId
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  // console.log(params)
  const data = encryptNew(requestData.level, requestData.data);
  console.log(data)
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    params:data,
  })
}
/* 特殊处理 */
export const getDataLevelUserLoginNew1=(params) => {
  console.log(params)
  params.companyId = pubsource.companyId
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  // console.log(params)
  const data = encryptNew1(requestData.level, requestData.data);
  console.log(data)
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    params:data,
  })
}

/* 特殊处理 */
export const getDataLevelUserLoginNew2=(params) => {
  console.log(params)
  params.companyId = pubsource.companyId
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  // console.log(params)
  const data = encryptNew2(requestData.level, requestData.data);
  console.log(data)
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    params:data,
  })
}

//上传头像
export const uploadimage=(data)=>{
  let url = pubsource.pub_pubf_uploadlink
  return axios({
    withCredentials: true,
    headers:{'Content-Type':'multipart/form-data'},
    method: 'post',
    url: url,
    data: data,
  })
}
//上传文件私有云
export const uploadFile=(data)=>{
  let storage = window.localStorage;
  // console.log(storage.token)
  let url = pubsource.pub_prvf_uploadlink+"&_tk="+encodeURIComponent(storage.token)
  return axios({
    withCredentials: true,
    headers:{'Content-Type':'multipart/form-data'},
    method: 'post',
    url: url,
    data: data,
  })
}

