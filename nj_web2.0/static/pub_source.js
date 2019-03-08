var pubsource = {
	// 以下为开发环境变量配置

    pub_getlink: 'http://tgdev-apigw.hrocloud.com:8099/api/v1',
    // pub_getlink :'http://darren.hrocloud.com:8099/api/v1',
      clientId: '1000',
      clientPass: '6cc1c430aed64d3bb8516011195a5b56',
      pub_pubf_uploadlink: 'http://tgdev-filegw.hrocloud.com/upload?groupId=0',
      pub_prvf_uploadlink: 'http://tgdev-filegw.hrocloud.com/upload?groupId=1',
      pub_pubf_downlink: 'http://tgdev-publicfile.hrocloud.com/',
      pub_prvf_downlink: 'http://tgdev-filegw.hrocloud.com/file?',
      webSocketURL: 'ws://192.168.11.66:3048/ws',
      // webSocketURL: 'ws://192.168.11.75:3048/ws',

      // 以下为测试环境变量配置，新变量请同
  //
  // 开发增加
  //
  //     pub_getlink : "http://tgtest-gateway.hrocloud.com:8099/api/v6",
  //     clientId : "1000",
  //     clientPass : "6cc1c430aed64d3bb8516011195a5b56",
  //     pub_pubf_uploadlink : "http://tgtest-filegw.hrocloud.com/upload?groupId=0",
  //     pub_prvf_uploadlink : "http://tgtest-filegw.hrocloud.com/upload?groupId=1",
  //     pub_pubf_downlink : "http://tgtest-publicfile.hrocloud.com/",
  //     pub_prvf_downlink : "http://tgtest-filegw.hrocloud.com/file?",
  //     // 为了确保测试环境文件、图片可查看，使用开发环境
  //     // pub_pubf_uploadlink: 'http://tgdev-filegw.hrocloud.com/upload?groupId=0',
  //     // pub_prvf_uploadlink: 'http://tgdev-filegw.hrocloud.com/upload?groupId=1',
  //     // pub_pubf_downlink: 'http://tgdev-publicfile.hrocloud.com/',
  //     // pub_prvf_downlink: 'http://tgdev-filegw.hrocloud.com/file?',
  //     webSocketURL: 'ws://192.168.11.53:3048/ws',

	// 以下为生产环境变量配置，新变量请同开发增加
	/*
	pub_getlink : "https://apigw.hrocloud.com/api/v9",
	clientId : "1000",
	clientPass : "6cc1c430aed64d3bb8516011195a5b56",
	pub_pubf_uploadlink : "https://filegw.hrocloud.com/upload?groupId=0",
	pub_prvf_uploadlink : "https://filegw.hrocloud.com/upload?groupId=1",
	pub_pubf_downlink : "https://pubfile.hrocloud.com/",
	pub_prvf_downlink : "https://filegw.hrocloud.com/file?",
	webSocketURL: 'ws://192.168.11.63:3048/ws',
	*/
	// 以下为该变量收尾，新增的请放到该变量前面
  webSocketDevice: 'pc',
  applicationId: '10',
  pub_pubsources_end: '该变量收尾，新增的请放到该变量前面',
};
// export default pubsource
