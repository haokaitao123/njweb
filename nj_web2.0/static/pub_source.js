var pubsource = {
  // 以下为开发环境变量配置

  pub_getlink: "http://najie.hrocloud.com:8099/api/v1",
  pub_getCaptcha: "http://najie.hrocloud.com:8099/api/v1",
  pub_pubf_uploadlink: "http://najie.hrocloud.com:9709/upload?groupId=0",
  pub_prvf_uploadlink: "http://najie.hrocloud.com:9709/upload?groupId=1",
  pub_pubf_downlink: "http://najiefile.hrocloud.com:8088/",
  pub_prvf_downlink: "http://najie.hrocloud.com:9709/file?",
  pub_knowledge: "http://192.168.101.155/api/exam/",

  //以下测试环境
  /*
      pub_getlink: "http://njtest.hrocloud.com:8099/api/v1",
      pub_getCaptcha: "http://njtest.hrocloud.com:8099/api/v1",
      pub_pubf_uploadlink: "http://njtest.hrocloud.com:9709/upload?groupId=0",
      pub_prvf_uploadlink: "http://njtest.hrocloud.com:9709/upload?groupId=1",
      pub_pubf_downlink: "http://njtestfile.hrocloud.com:8088/",
      pub_prvf_downlink: "http://njtest.hrocloud.com:9709/file?",
       pub_knowledge: "http://192.168.101.155/api/exam/",
  */

  //以下为生产环境变量配置
  /*
  pub_getlink: "http://hr.333job.com:19102/api/v1",
  pub_getCaptcha: "http://hr.333job.com:19102/api/v1",
  pub_pubf_uploadlink: "http://hr.333job.com:19101/upload?groupId=0",
  pub_prvf_uploadlink: "http://hr.333job.com:19101/upload?groupId=1",
  pub_pubf_downlink: "http://hr.333job.com:19004/",
  pub_prvf_downlink: "http://hr.333job.com:19101/file?",
   pub_knowledge: "http://hr.333job.com:18888/api/exam/",
  */
  // 以下为该变量收尾，新增的请放到该变量前面
  clientId: '1000',
  clientPass: '6cc1c430aed64d3bb8516011195a5b56',
  webSocketURL: 'ws://192.168.11.66:3048/ws',
  // webSocketURL: 'ws://192.168.11.75:3048/ws',
  webSocketDevice: 'pc',
  applicationId: '10',
  pub_pubsources_end: '该变量收尾，新增的请放到该变量前面',
};
// export default pubsource
