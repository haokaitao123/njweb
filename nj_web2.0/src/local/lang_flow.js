export default {
  'zh-CN': {
    flowcommon: {
      plat_condition: '条件设置',
      var_setting: '变量设置',
    },
    flow: {
      title: '业务流程配置',
      detailTitle: '编辑流程图',
      flowCode: '流程编号',
      flowName: '流程名称',
      flowFormtype: '表单类型',
      flowForm: '流程表单',
      flowVersion: '流程版本',
      flowStatus: '流程状态',
      flowAfthdClass: '后置处理类',
      comment: '备注',

      // 填写提示信息
      p_flowCode: '请输入流程编号',
      p_flowName: '请输入流程名称',
      p_flowFormtype: '选择表单类型',
      p_flowForm: '请选择流程表单',
      p_flowVersion: '请输入流程版本',
      p_flowStatus: '选择流程状态',
      p_flowAfthdClass: '请输入备注',
      p_comment: '备注',

      // 非空校验信息
      rule_flowCode: '流程编码不能为空',
      rule_flowName: '流程名称不能为空',
      rule_flowForm: '流程表单不能为空',
      rule_flowFormtype: '流程表单类型不能为空',

      // 弹出选择
      searchTitle: '选择表单',
      searchText: '请输入表单名称',
      sformName: '表单名称',
      sformTbname: '物理表名',

      // 按钮
      flowSetting: '流程配置',
    },
    step: {
      // 选项标题
      baseInfo: '步骤详细信息',
      dataBlock: '步骤表单定义',
      genDocument: '步骤文件模板',
      mailList: '步骤邮件模板',
      smsList: '步骤短信模板',
      wxList: '步骤微信模板',

      flstepDisorder: '显示序号',
      flstepFlow: '流程名称',
      flstepCode: '步骤编码',
      flstepCnName: '步骤名称',
      flstepEnName: '步骤名称',
      flstepStddealtime: '标准处理时间',
      flstepCaudealtime: '警示处理时间',
      flstepIsapprove: '是否审批节点',
      flstepApprove: '审批定义',
      comment: '备注',


      // 填写提示信息
      p_flstepDisorder: '请输入显示序号',
      p_flstepCode: '请输入步骤编码',
      p_flstepCnName: '请输入步骤名称',
      p_flstepEnName: '请输入步骤名称',
      p_flstepStddealtime: '请输入标准处理时间',
      p_flstepCaudealtime: '请输入警示处理时间',
      p_flstepIsapprove: '是否审批节点',
      p_flstepApprove: '请选择审批定义',
      p_comment: '备注',

      // 非空校验信息
      rule_flstepCode: '步骤编码不能为空',
      rule_flstepDisorder: '步骤序号不能为空',
      rule_flstepCnName: '步骤名称不能为空',
      rule_flstepEnName: '步骤名称不能为空',
      rule_flstepStddealtime: '标准处理时间不能为空',
      rule_flstepCaudealtime: '警示处理时间不能为空',


      aprvCode: '审批流程编号',
      aprvName: '审批流程名称',
      searchTitle: '选择审批流程',
      searchText: '请输入审批流程编码或者名称',

    },
    dataBlock: {
      flsdbOrder: '序号',
      flsdbType: '数据块类型',
      flsdbCnName: '数据块名称',
      flsdbDisclms: '字段显示列',
      flsdbSubformtype: '子集表单类型',
      flsdbSubform: '子集表单',
      flsdbSubisupd: '子集是否可修改',
      flsdbOptauth: '操作权限',
      flsdbSubfilter: '子集数据过滤',
      flsdbDiscondition: '显示条件',
      comment: '备注',

      // 填写提示信息
      p_flsdbOrder: '请输入序号',
      p_flsdbType: '请选择数据块类型',
      p_flsdbCnName: '请输入数据块名称',
      p_flsdbEnName: '请输入数据块名称',
      p_flsdbDisclms: '请选择字段显示列',
      p_flsdbSubformtype: '请选择子集表单类型',
      p_flsdbSubform: '请选择子集表单',
      p_flsdbOptauth: '请选择操作权限',
      p_flsdbSubfilter: '请输入子集数据过滤',
      p_flsdbDiscondition: '请选择显示条件',
      p_comment: '请输入备注',

      // 非空校验信息
      rule_flsdbOrder: '序号不能为空',
      rule_flsdbType: '数据块类型不能为空',
      rule_flsdbCnName: '数据块名称不能为空',
      rule_flsdbEnName: '数据块英文名称不能为空',
      rule_flsdbOptauth: '操作权限不能为空',
      rule_flsdbDiscondition: '显示条件不能为空',

      // 按钮
      btn_fielddef: '字段定义',

    },
/*    condition: {
      title: '条件设置',
      p_platvar: '请选择变量...',
      p_parameter: '请输入参数值',
      p_parameter1: '请选择参数值',
      p_parameter2: '请选择时间...',
      p_parameter3: '请设置参数值...',


      beequal: '等于',
      notequal: '不等于',
      greater: '大于',
      greaterequal: '大于等于',
      smaller: '小于',
      smallerequal: '小于等于',
      conditionValue: '条件值',

      And: '与',
      Or: '或',

      btn_valid: '检验',


    }, */
    docTemplate: {
      flsdcOrder: '序号',
      flsdcType: '模板类型',
      flsdcTempname: '文档名称',
      flsdcOtherdcidDis: '其他流程文档',
      flsdcDoctemp: '文档模板',
      flsdcGenconditionDis: '生成条件',
      flsdcIsvalid: '是否有效',
      flsdcInvreason: '失效原因',
      comment: '备注',

      // 填写提示信息
      p_flsdcOrder: '请输入序号',
      p_flsdcType: '请选择模板类型',
      p_flsdcTempname: '请输入文档名称',
      p_flsdcOtherdcidDis: '青选择其他流程文档',
      p_flsdcDoctemp: '请上传文档模板',
      p_flsdcGenconditionDis: '请选择生成条件',
      p_flsdcInvreason: '请输入失效原因',
      p_comment: '请输入备注',

      // 非空校验信息
      rule_flsdcOrder: '序号不能为空',
      rule_flsdcType: '文档类型不能为空',
      rule_flsdcTempname: '请输入文档名称',
      rule_flsdcDoctemp: '请上传文档',
      rule_flsdcInvreason: '请输入失效原因',

      plat_upload: '上传',
      plat_download: '下载',
      plat_scan: '浏览',
      plat_condition: '条件设置',
      var_setting: '变量设置',

    },
    mail: {
      flsmlOrder: '序号',
      flsmlObject: '邮件主题',
      flsmlContent: '邮件内容',
      flsmlSendstyle: '发送方式',
      flsmlSendconditionDis: '发送条件',
      flsmlIsencrypt: '是否加密发送',
      flsmlIsvalid: '是否有效',
      flsmlInvreason: '失效原因',
      comment: '备注',
      flsmlReciever: '接收人',
      flsmlCC: '抄送人',

      flsmlRandCC: '配置接收人和抄送人',
      flsmlVar: '变量',
      flsmlAttach: '附件',

      // 填写提示信息
      p_flsmlOrder: '请输入序号',
      p_flsmlObject: '请输入邮件主题',
      p_flsmlSendstyle: '请选择发送方式',
      p_flsmlSendconditionDis: '请选择发送条件',
      p_flsmlInvreason: '请输入失效原因',
      p_comment: '请输入备注',

      // 非空校验信息
      rule_flsmlOrder: '序号不能为空',
      rule_flsmlObject: '邮件主题不能为空',
      rule_flsmlContent: '邮件内容不能为空',
      rule_flsmlSendstyle: '邮件发送方式不能为空',
      rule_flsmlInvreason: '失效原因不能为空',

    },
    mailCon: {
      title: '邮件联系人',
      flsmlrContact: '联系人',
      flsmlrIsvalid: '是否有效',
      flsmlrConditionDis: '发送条件',

      p_flsmlSendconditionDis: '请选择发送条件',
      title1: '邮件联系人',
      contactMark: '联系人标识',
      contactName: '标识名称',
    },
    mailAttach: {
      title: '邮件附件',
      flsmlatOrder: '序号',
      flsmlatSource: '附件来源',
      flsmlatAttach: '固定附件',
      flsmlatGendocid: '流程生成文件',
      flsmlatUpdfield: '流程上传附件',
      flsmlatConditionDis: '附件条件',
      flsmlatIsvalid: '是否有效',
      flsmlatInvreason: '失效原因',
      comment: '备注',
      flsmlatNameDis: '附件名称',

      p_flsmlatOrder: '请输入序号',
      p_flsmlatSource: '请选择附件来源',
      p_flsmlatAttach: '请选择固定附件',
      p_flsmlatGendocid: '请选择流程生成文件',
      p_flsmlatUpdfield: '请选择流程上传文件',
      p_flsmlatInvreason: '请输入失效原因',
      p_comment: '请输入备注',
      p_flsmlatConditionDis: '请选择产生条件',

      rule_flsmlatOrder: '序号不能为空',
      rule_flsmlatSource: '附件来源不能为空',
      rule_flsmlatInvreason: '失效原因不能为空',

      // searchTable
      searchTitle: '选择流程文档',
      searchText: '请输入文档名称',
      flsdcTempname: '文档名称',
      flsdcStepDis: '步骤名称',


      searchTitle1: '选择流程上传文档',
      searchText1: '请输入物理字段名称',
      searchText2: '请输入字段名称',
      sffPhyfield: '物理字段名称',
      sffFieldNameCnDis: '字段名称',

    },
    SMS: {
      flsmsOrder: '序号',
      flsmsContent: '短信内容',
      flsmsSendstyle: '发送方式',
      flsmsSendconditionDis: '发送条件',
      flsmsIsvalid: '是否有效',
      flsmsInvreason: '失效原因',
      comment: '备注',
      reciever: '接收人',

      recieverSet: '配置接收人',
      flsmlVar: '变量',

      // 填写提示信息
      p_flsmsOrder: '请输入序号',
      p_flsmsContent: '请输入短信内容',
      p_flsmlSendstyle: '请选择发送方式',
      p_flsmlSendconditionDis: '请选择发送条件',
      p_flsmlInvreason: '请输入失效原因',
      p_comment: '请输入备注',

      // 非空校验信息
      rule_flsmsOrder: '序号不能为空',
      rule_flsmsContent: '短信内容不能为空',
      rule_flsmsSendstyle: '发送方式不能为空',
      rule_flsmsInvreason: '失效原因不能为空',

    },
    SMSCon: {
      title: '短信联系人',
      flsmsrContactDis: '联系人',
      flsmsrIsvalid: '是否有效',
      flsmsrConditionDis: '发送条件',

      p_flsmsrConditionDis: '请选择发送条件',
      title1: '短信联系人',
      contactMark: '联系人标识',
      contactName: '标识名称',
    },
    weixin: {
      flwxOrder: '序号',
      flwxType: '消息类型',
      flwxTitle: '消息标题',
      flwxContent: '微信内容',
      flwxLink: '卡片链接',
      flwxSendstyle: '发送方式',
      flwxSendconditionDis: '发送条件',
      flwxIsvalid: '是否有效',
      flwxInvreason: '失效原因',
      comment: '备注',
      reciever: '接收人',

      recieverSet: '配置接收人',
      flsmlVar: '变量',

      // 填写提示信息
      p_flwxOrder: '请输入微信序号',
      p_flwxTitle: '请输入消息标题',
      p_flwxContent: '请输入',
      p_flwxLink: '请输入卡片链接',
      p_flwxSendconditionDis: '请选择发送条件',
      p_flwxInvreason: '请输入失效原因',
      p_comment: '请输入备注',

      // 非空校验信息
      rule_flwxOrder: '序号不能为空',
      rule_flwxContent: '短信内容不能为空',
      rule_flwxSendstyle: '发送方式不能为空',
      rule_flwxInvreason: '失效原因不能为空',
      rule_flwxType: '消息类型不能为空',
      rule_flwxTitle: '消息标题不能为空',
      rule_flwxLink: '卡片链接不能为空',

    },
    weixinCon: {
      title: '微信联系人',
      flwxrContactDis: '联系人',
      flwxrIsvalid: '是否有效',
      flwxrConditionDis: '发送条件',

      p_flwxrConditionDis: '请选择发送条件',
      title1: '微信联系人',
      contactMark: '联系人标识',
      contactName: '标识名称',
    },
    varList: {
      title: '文档变量维护',
      title1: '短信变量维护',
      title2: '微信变量维护',
      flspvarMark: '变量标识',
      flspvarName: '变量名称',

      // 填写提示信息
      p_flspvarMark: '请输入变量标识',
      p_flspvarName: '请输入变量名称',
      // 非空校验信息
      rule_flspvarMark: '变量标识不能为空',
    },

    // 弹出选择 searchTable
    searchCloumns: {
      sformName: '表单名称',
      sformTbname: '物理表名',
      searchTitle: '选择表单',
      searchText: '请输入表单名称',


      flvarName: '流程变量名称',
      flvarMark: '流程变量标识',
      searchTitle1: '选择变量',
      searchText1: '请选择流程变量名称',


    },
  },
  'en-US': {
    flowcommon: {
      // 按钮
      plat_condition: 'Condition',
      var_setting: 'Var Setting',
    },
    flow: {
      title: 'Plat Flow Configuration',
      detailTitle: 'EditFlowChart',
      flowCode: 'Code',
      flowName: 'Flow Name',
      flowFormtype: 'Form Type',
      flowForm: 'Flow Form',
      flowVersion: 'Flow Version',
      flowStatus: 'Flow Status',
      flowAfthdClass: 'After Handle Class',
      comment: 'Comment',

      // 填写提示信息
      p_flowCode: 'Please input code',
      p_flowName: 'Please input flow name',
      p_flowFormtype: 'Please select form type',
      p_flowForm: 'Please select flow form',
      p_flowVersion: 'Please select flow version',
      p_flowStatus: 'Please select flow status',
      p_flowAfthdClass: 'Please input atter handle class',
      p_comment: 'Please input comment',

      // 非空校验信息
      rule_flowCode: 'code must be not null',
      rule_flowName: 'name must be not null',
      rule_flowForm: 'form must be not null',
      rule_flowFormtype: 'form type must be not null',

      // 弹出选择
      searchTitle: 'Form List',
      searchText: 'Please input form name',
      sformName: 'Form Name',
      sformTbname: 'Table Name',

      // 按钮
      flowSetting: 'Flow Setting',
    },
    step: {
      // 选项标题
      baseInfo: 'Detail Info',
      dataBlock: 'DataBlock Info',
      genDocument: 'Doc Template',
      mailList: 'Mail Template',
      smsList: 'SMS Template',
      wxList: 'WeChat Template',

      flstepDisorder: 'Order',
      flstepFlow: 'Step Name',
      flstepCode: 'Step Code',
      flstepCnName: 'Step CName',
      flstepEnName: 'Step EName',
      flstepStddealtime: 'Standard deal time',
      flstepCaudealtime: 'Caution deal time',
      flstepIsapprove: 'Is Approve Node',
      flstepApprove: 'Approve flow',
      comment: 'Comment',


      // 填写提示信息
      p_flstepDisorder: 'Please input order',
      p_flstepCode: 'Please input Step Code',
      p_flstepCnName: 'Please input Step CName',
      p_flstepEnName: 'Please input Step EName',
      p_flstepStddealtime: 'Please select time',
      p_flstepCaudealtime: 'Please select time',
      p_flstepApprove: 'Please select Approve flow',
      p_comment: 'Please input comment',

      // 非空校验信息
      rule_flstepCode: 'order must be not null',
      rule_flstepDisorder: 'Step Code must be not null',
      rule_flstepCnName: 'name must be not null',
      rule_flstepEnName: 'name must be not null',
      rule_flstepStddealtime: 'time must be not null',
      rule_flstepCaudealtime: 'time must be not null',


      aprvCode: 'Approve Code',
      aprvName: 'Approve Name',
      searchTitle: 'Flow list',
      searchText: 'Please input code or name',

    },
    dataBlock: {
      flsdbOrder: 'Order',
      flsdbType: 'Block Type',
      flsdbCnName: 'Block Name',
      flsdbEnName: 'Block Ename',
      flsdbDisclms: 'Display Cloumn',
      flsdbSubformtype: 'Sub Form Type',
      flsdbSubform: 'Sub Form',
      flsdbSubisupd: 'Form Update',
      flsdbOptauth: 'Operation Auth',
      flsdbSubfilter: 'Data Filter',
      flsdbDiscondition: 'Display Condition',
      comment: 'Comment',

      // 填写提示信息
      p_flsdbOrder: 'Please input order',
      p_flsdbType: 'Please select the type',
      p_flsdbCnName: 'Please input the name',
      p_flsdbEnName: 'Please input the name',
      p_flsdbDisclms: 'Please select the dsiplay column',
      p_flsdbSubformtype: 'Please select the form type',
      p_flsdbSubform: 'Please select the form',
      p_flsdbOptauth: 'Please select the auth',
      p_flsdbSubfilter: 'Please input the filter',
      p_flsdbDiscondition: 'Please select the conditions',
      p_comment: 'Please input the comment',

      // 非空校验信息
      rule_flsdbOrder: 'The Order must be not null',
      rule_flsdbType: 'The block type must be not null',
      rule_flsdbCnName: 'The Name must be not null',
      rule_flsdbEnName: 'The Name must be not null',
      rule_flsdbOptauth: 'The Auth must be not null',
      rule_flsdbDiscondition: 'The conditions must be not null',
      btn_fielddef: 'Field Def',

    },
    docTemplate: {
      flsdcOrder: 'Order',
      flsdcType: 'Template Type',
      flsdcTempname: 'Template Name',
      flsdcOtherdcidDis: 'Other Flow Document',
      flsdcDoctemp: 'Document Template',
      flsdcGenconditionDis: 'Generating conditions',
      flsdcIsvalid: 'Is valid',
      flsdcInvreason: 'Invalid Reson',
      comment: 'Comment',

      // 填写提示信息
      p_flsdcOrder: 'Please input order',
      p_flsdcType: 'Please select Tem Type',
      p_flsdcTempname: 'Please input doc name',
      p_flsdcOtherdcidDis: 'Please select other flow doc',
      p_flsdcDoctemp: 'Please upload doc',
      p_flsdcGenconditionDis: 'Please select condition',
      p_flsdcInvreason: 'Please input invalid reason',
      p_comment: 'Please input comment',

      // 非空校验信息
      rule_flsdcOrder: 'Order must be not null',
      rule_flsdcType: 'Doc Type must be not null',
      rule_flsdcTempname: 'Temp name must be not null',
      rule_flsdcDoctemp: 'Doc Temp must be not null',
      rule_flsdcInvreason: 'Invalid reason must be not null',

      plat_upload: 'Uploading',
      plat_download: 'Down',
      plat_scan: 'Scan',
      // 按钮
      plat_condition: 'Condition',
      var_setting: 'Var Setting',

    },
    mail: {
      flsmlOrder: 'Order',
      flsmlObject: 'Subject',
      flsmlContent: 'Content',
      flsmlSendstyle: 'Sending Type',
      flsmlSendconditionDis: 'Condition',
      flsmlIsencrypt: 'Is encrypt',
      flsmlIsvalid: 'Is valid',
      flsmlInvreason: 'Invalid reason',
      flsmlReciever: 'Reciver',
      flsmlCC: 'CC',
      comment: 'Comment',
      flsmlRandCC: 'Reciver and CC Setting',
      flsmlVar: 'Var',
      flsmlAttach: 'Attach',


      // 填写提示信息
      p_flsmlOrder: 'Please input Order',
      p_flsmlObject: 'Please input subject',
      p_flsmlSendstyle: 'Please select send style',
      p_flsmlSendconditionDis: 'Please select conditions',
      p_flsmlInvreason: 'Please input invalid reason',
      p_comment: 'Please input comment',

      // 非空校验信息
      rule_flsmlOrder: 'Order must be not null',
      rule_flsmlObject: 'Subject must be not null',
      rule_flsmlContent: 'Content must be not null',
      rule_flsmlSendstyle: 'Sending style must be not null',
      rule_flsmlInvreason: 'Invalid reason must be not null',

    },
    mailCon: {
      title: 'Mail Contact',
      flsmlrContact: 'Contact',
      flsmlrIsvalid: 'Is valid',
      flsmlrConditionDis: 'Condition',

      p_flsmlrConditionDis: 'Please select conditions',
      title1: 'Select contact',
      contactMark: 'Mark',
      contactName: 'Name',

    },
    mailAttach: {
      title: 'Mail Attach',
      flsmlatOrder: 'Order',
      flsmlatSource: 'Attach Source',
      flsmlatAttach: 'Fix Attach',
      flsmlatGendocid: 'Flow Doc',
      flsmlatUpdfield: 'Upload Doc',
      flsmlatConditionDis: 'Conditions',
      flsmlatIsvalid: 'Is valid',
      flsmlatInvreason: 'Invalid reason',
      comment: 'Comment',
      flsmlatNameDis: 'Attach Name',

      p_flsmlatOrder: 'Please input Order',
      p_flsmlatSource: 'Please select Source',
      p_flsmlatAttach: 'Please select fixed Attach',
      p_flsmlatGendocid: 'Please select flow doc',
      p_flsmlatUpdfield: 'Please select up doc',
      p_flsmlatInvreason: 'Please input invalid reason',
      p_flsmlatConditionDis: 'Please select condition',
      p_comment: 'Please input comment',

      rule_flsmlatOrder: 'order must be not null',
      rule_flsmlatSource: 'source must be not null',
      rule_flsmlatInvreason: 'invalid reason must not null',

      // searchTable
      searchTitle: 'Flow Doc',
      searchText: 'Please input doc name',
      flsdcTempname: 'Doc Name',
      flsdcStepDis: 'Step Name',


      searchTitle1: 'Upload Doc',
      searchText1: 'Please physical field name',
      searchText2: 'Please field name',
      sffPhyfield: 'Physical Name',
      sffFieldNameCnDis: 'Field Name',

    },
    SMS: {
      flsmsOrder: 'Order',
      flsmsContent: 'Content',
      flsmsSendstyle: 'Sending Type',
      flsmsSendconditionDis: 'Condition',
      flsmsIsvalid: 'Is valid',
      flsmsInvreason: 'Invalid reason',
      comment: 'Comment',
      reciever: 'Reciver',

      recieverSet: 'Reciver Setting',
      flsmlVar: 'Var',

      // 填写提示信息
      p_flsmsOrder: 'Please input Order',
      p_flsmsContent: 'Please input content',
      p_flsmlSendstyle: 'Please select send style',
      p_flsmlSendconditionDis: 'Please select conditions',
      p_flsmlInvreason: 'Please input invalid reason',
      p_comment: 'Please input comment',

      // 非空校验信息
      rule_flsmsOrder: 'Order must be not null',
      rule_flsmsContent: 'Content must be not null',
      rule_flsmsSendstyle: 'Sending style must be not null',
      rule_flsmsInvreason: 'Invalid reason must be not null',

    },
    SMSCon: {
      title: 'SMS Contact',
      flsmsrContactDis: 'Contact',
      flsmsrIsvalidDis: 'Is valid',
      flsmsrConditionDis: 'Condition',

      p_flsmsrConditionDis: 'Please select conditions',
      title1: 'Select contact',
      contactMark: 'Mark',
      contactName: 'Name',

    },
    weixin: {
      flwxOrder: 'Order',
      flwxType: 'Type',
      flwxTitle: 'Subject',
      flwxContent: 'Content',
      flwxLink: 'Link',
      flwxSendstyle: 'Sending Type',
      flwxSendconditionDis: 'Condition',
      flwxIsvalid: 'Is valid',
      flwxInvreason: 'Invalid reason',
      comment: 'Comment',
      reciever: 'Reciver',

      recieverSet: 'Reciver Setting',
      flsmlVar: 'Var',

      // 填写提示信息
      p_flwxOrder: 'Please input Order',
      p_flwxTitle: 'Please input subject',
      p_flwxContent: 'Please input content',
      p_flwxLink: 'Please input link',
      p_flwxSendconditionDis: 'Please select conditions',
      p_flwxInvreason: 'Please input invalid reason',
      p_comment: 'Please input comment',

      // 非空校验信息
      rule_flwxOrder: 'Order must be not null',
      rule_flwxContent: 'Content must be not null',
      rule_flwxSendstyle: 'Sending style must be not null',
      rule_flwxInvreason: 'Invalid reason must be not null',
      rule_flwxType: 'Type must be not null',
      rule_flwxTitle: 'subject must be not null',
      rule_flwxLink: 'link must be not null',

    },
    weixinCon: {
      title: 'WeChat Contact',
      flwxrContactDis: 'Contact',
      flwxrIsvalid: 'Is valid',
      flwxrConditionDis: 'Condition',

      p_flwxrConditionDis: 'Please select conditions',
      title1: 'Select contact',
      contactMark: 'Mark',
      contactName: 'Name',
    },
    varList: {
      title: 'Doc Var',
      title1: 'SMS Var',
      title2: 'WeChat Var',
      flspvarMark: 'Var Mark',
      flspvarName: 'Var Name',

      // 填写提示信息
      p_flspvarMark: 'Please input mark',
      p_flspvarName: 'Please input name',
      // 非空校验信息
      rule_flspvarMark: 'Mark must be not null',
    },

    // 弹出选择 searchTable
    searchCloumns: {
      sformName: 'Form Name',
      sformTbname: 'Table Name',
      searchTitle: 'Form List',
      searchText: 'Please input the name',

      flvarName: 'Flowvar name',
      flvarMark: 'Flowvar mark',
      searchTitle1: 'Var List',
      searchText1: 'Please select the var',

    },
  },
}
