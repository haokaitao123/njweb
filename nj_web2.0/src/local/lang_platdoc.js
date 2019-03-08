export default {
  'zh-CN': {
    platDoc: {
      title: '文档模板管理',
      platDctpCode: '序号',
      platDctpName: '文档名称',
      platDctpAffix: '附件',
      platDctpValidDis: '是否有效',
      platDctpComment: '备注',

      // 填写提示信息
      p_platDctpCode: '请输入序号',
      p_platDctpName: '请输入文档名称',
      // p_platDctpAffix: '文档上传',
      // p_platDctpValidDis: '是否有效',
      p_platDctpComment: '请输入备注...',

      // 非空校验信息
      rule_platDctpCode: '请输入序号',
      rule_platDctpName: '请输入文档名称',
      rule_platDctpValidDis: '请选择是否有效',

      plat_upload: '上传',
      plat_download: '下载',
      plat_scan: '浏览',
      title1: '文档模板配置',
      title2: '文档变量维护',
    },
    docVar: {
      title: '文档变量维护',
      platDcvarCode: '变量标识',
      platDcvarCname: '变量中文名称',
      platDcvarEname: '变量英文名称',
      platDcvarDesc: '说明',
      platDcvarComment: '备注',

      // 填写提示信息
      p_platDcvarCode: '请输入变量标识',
      p_platDcvarCname: '请输入中文名称',
      p_platDcvarEname: '请输入英文名称',
      p_platDcvarDesc: '请输入变量说明',
      p_platDcvarComment: '请输入备注...',

      // 非空校验信息
      rule_platDcvarCode: '变量标识不能为空',
      rule_platDcvarCname: '中文名称不能为空',
      rule_platDcvarEname: '英文名称不能为空',
    },
    platSyssms: {
      title: '短信模板管理',
      menuTitle1: '短信模板信息',
      menuTitle2: '短信模板变量',
      syssmsNo: '模板编号',
      syssmsTitle: '标题',
      syssmsTo: '接收人',
      syssmsContent: '内容',
      syssmsSendcondition: '发送条件',
      syssmsIsvalid: '是否有效',
      syssmsInvreason: '失效原因',
      syssmsComment: '备注',
      // dis placehold
      syssmsNoDis: '请输入模板编号',
      syssmsTitleDis: '请输入标题',
      syssmsToDis: '请输入接收人',
      syssmsContentDis: '请输入内容',
      syssmsSendconditionDis: '请输入发送条件',
      syssmsIsvalidDis: '请选择是否有效',
      syssmsInvreasonDis: '请输入失效原因',
      syssmsCommentDis: '请输入备注',
      // remind
      syssmsNocheck: '仅支持数字格式模板编号',
    },
    platSyssmsVar: {
      syssmsvarMark: '变量标识',
      syssmsvarName: '变量名称',
      syssmsvarValdesc: '取值说明',
      syssmsvarComment: '备注',
      syssmsvarMarkDis: '请输入变量标识',
      syssmsvarNameDis: '请输入变量名称',
      syssmsvarValdescDis: '请输入取值说明',
      syssmsvarCommentDis: '请输入备注',
    },
    platMail: {
      title: '邮件模板管理',
      baseTitle1: '邮件模板信息',
      baseTitle2: '邮件模板附件',
      baseTitle3: '邮件模板变量',
      sysmailNo: '模板编号',
      sysmailName: '模板名称',
      sysmailObject: '主题',
      sysmailTo: '收件人',
      sysmailCc: '抄送人',
      sysmailContent: '内容',
      sysmailSendcondition: '发送条件',
      sysmailIsencrypt: '是否加密发送',
      sysmailFlow: '关联流程',
      sysmailFlowstep: '关联流程步骤',
      sysmailIsvalid: '是否有效',
      sysmailInvreason: '失效原因',
      sysmailComment: '备注',
      sysmailNoDis: '请输入模板编号',
      sysmailNameDis: '请输入模板名称',
      sysmailObjectDis: '请输入主题',
      sysmailToDis: '请输入收件人',
      sysmailCcDis: '请输入抄送人',
      sysmailContentDis: '请输入内容',
      sysmailSendconditionDis: '请输入发送条件',
      sysmailIsencryptDis: '请选择是否加密发送',
      sysmailFlowDis: '请选择关联流程',
      sysmailFlowstepDis: '请选择关联流程步骤',
      sysmailIsvalidDis: '请选择是否有效',
      sysmailInvreasonDis: '请输入失效原因',
      sysmailCommentDis: '请输入备注',
      // remind
      syssmsNocheck: '仅支持数字格式模板编号',
      selectFlowRemind: '请先选择流程',
      // searchTable
      searchTitle: '流程信息',
      flowName: '流程名称',
      flowNameDis: '请输入流程名称',
      searchTitle2: '流程步骤信息',
      flstepName: '流程步骤名称',
      flstepNameDis: '请输入流程步骤名称',
    },
    platMailAttach: {
      sysmlatOrder: '序号',
      sysmlatSource: '附件来源',
      sysmlatAttach: '固定附件',
      sysmlatFlowattach: '流程固定附件',
      sysmlatFlowupdfiled: '流程上传文件',
      sysmlatFlowgendocid: '流程生成文件',
      sysmlatCondition: '附件条件',
      sysmlatIsvalid: '是否有效',
      sysmlatInvreason: '失效原因',
      sysmlatComment: '备注',
      sysmlatOrderDis: '请输入序号',
      sysmlatSourceDis: '请选择附件来源',
      sysmlatAttachDis: '请选择固定附件',
      sysmlatFlowattachDis: '请选择流程固定附件',
      sysmlatFlowupdfiledDis: '请选择流程上传文件',
      sysmlatFlowgendocidDis: '请选择流程生成文件',
      sysmlatConditionDis: '请选择附件条件',
      sysmlatIsvalidDis: '请选择是否有效',
      sysmlatInvreasonDis: '请输入失效原因',
      sysmlatCommentDis: '请输入备注',
      // searchTable
      searchTitle: '选择文件',
      searchText: '请输入文档名称',
      platDctpName: '文档名称',
      flsdcDoctemp: '文档名称',
      flsdcStep: '步骤名称',
      flsdcDoctemp: '文档名称',
      flsdcStep: '步骤名称',
      searchText3: '请输入字段名称',
      sffFieldNameCn: '字段名称',
      sffPhyfield: '物理字段名',
    },
    platMailVar: {
      sysmlvarMark: '变量标识',
      sysmlvarName: '变量名称',
      sysmlvarValdesc: '取值说明',
      sysmlvarComment: '备注',
      sysmlvarMarkDis: '请输入变量标识',
      sysmlvarNameDis: '请输入变量名称',
      sysmlvarValdescDis: '请输入取值说明',
      sysmlvarCommentDis: '请输入备注',
    },
  },
  'en-US': {
    platDoc: {
      title: 'Document Template Management',
      platDctpCode: 'order',
      platDctpName: 'Document name',
      platDctpAffix: 'Attachment',
      platDctpValidDis: 'Is valid',
      platDctpComment: 'comment',

      // 填写提示信息
      p_platDctpCode: 'Please input order',
      p_platDctpName: 'Please input document',
      // p_platDctpAffix: '文档上传',
      // p_platDctpValidDis: '是否有效',
      p_platDctpComment: 'Please input comment...',

      // 非空校验信息
      rule_platDctpCode: 'Please input order',
      rule_platDctpName: 'Please input document',
      rule_platDctpValidDis: 'Please chose vaild',

      plat_upload: 'Upload',
      plat_download: 'Download',
      plat_scan: 'Scan',

      title1: 'Doc temp setting',
      title2: 'Doc var setting',
    },
    docVar: {
      title: 'Doc var setting',
      platDcvarCode: 'Code',
      platDcvarCname: 'Chinese Name',
      platDcvarEname: 'English Name',
      platDcvarDesc: 'Desc',
      platDcvarComment: 'Comment',

      // 填写提示信息
      p_platDcvarCode: 'Please input code',
      p_platDcvarCname: 'Please input Chinese Name',
      p_platDcvarEname: 'Please input English Name',
      p_platDcvarDesc: 'Please input Desc',
      p_platDcvarComment: 'Please input comment...',

      // 非空校验信息
      rule_platDcvarCode: 'Code must be not null',
      rule_platDcvarCname: 'Chinese Name must be not null',
      rule_platDcvarEname: 'English Name must be not null',
    },
    platSyssms: {
      title: 'SMS template management',
      menuTitle1: 'SMS template information',
      menuTitle2: 'SMS template variable',
      syssmsNo: 'Number',
      syssmsTitle: 'Title',
      syssmsTo: 'Recipient',
      syssmsContent: 'Content',
      syssmsSendcondition: 'SendConditions',
      syssmsIsvalid: 'Is Valid?',
      syssmsInvreason: 'InvalidReason',
      syssmsComment: 'Comment',
      syssmsNoDis: 'Please enter the template number',
      syssmsTitleDis: 'Please enter the title',
      syssmsToDis: 'Please enter the recipient',
      syssmsContentDis: 'Please enter content',
      syssmsSendconditionDis: 'Please enter the send condition',
      syssmsIsvalidDis: 'Please select whether it is valid',
      syssmsInvreasonDis: 'Please enter the cause of failure',
      syssmsCommentDis: 'Please enter remarks',
      // remind
      syssmsNocheck: 'Only numeric format template Numbers are supported',
    },
    platSyssmsVar: {
      syssmsvarMark: 'VariablesMark',
      syssmsvarName: 'VariableName',
      syssmsvarValdesc: 'ValuesDesc',
      syssmsvarComment: 'Comment',
      syssmsvarMarkDis: 'Please enter the variable id',
      syssmsvarNameDis: 'Please enter a variable name',
      syssmsvarValdescDis: 'Please enter the value description',
      syssmsvarCommentDis: 'Please enter remarks',
    },
    platMail: {
      title: 'Mail template management',
      baseTitle1: 'Mail template information',
      baseTitle2: 'Mail template attachment',
      baseTitle3: 'Mail template variables',
      sysmailNo: 'TemplateNumber',
      sysmailName: 'TemplateName',
      sysmailObject: 'Theme',
      sysmailTo: 'Recipient',
      sysmailCc: 'Ccpeople',
      sysmailContent: 'Content',
      sysmailSendcondition: 'SendConditions',
      sysmailIsencrypt: 'IsEncrypted?',
      sysmailFlow: 'Process',
      sysmailFlowstep: 'ProcessSteps',
      sysmailIsvalid: 'Isvalid?',
      sysmailInvreason: 'FailureReason',
      sysmailComment: 'Comment',
      sysmailNoDis: 'Please enter the template number',
      sysmailNameDis: 'Please enter a template name',
      sysmailObjectDis: 'Please enter subject',
      sysmailToDis: 'Please enter recipient',
      sysmailCcDis: 'Please enter cc person',
      sysmailContentDis: 'Please enter content',
      sysmailSendconditionDis: 'Please enter the send condition',
      sysmailIsencryptDis: 'Please select whether to send encrypted or not',
      sysmailFlowDis: 'Select the associated process',
      sysmailFlowstepDis: 'Select the associated process step',
      sysmailIsvalidDis: 'Please select whether it is valid',
      sysmailInvreasonDis: 'Please enter the cause of failure',
      sysmailCommentDis: 'Please enter remarks',
      // remind
      syssmsNocheck: 'Only numeric format template Numbers are supported',
      selectFlowRemind: 'Please select the process first',
      // searchTable
      searchTitle: 'Flow Information',
      flowName: 'FlowName',
      flowNameDis: 'Please enter flowName',
      searchTitle2: 'Flow step information',
      flstepName: 'FlowstepName',
      flstepNameDis: 'Please enter the name of the process step',
    },
    platMailAttach: {
      sysmlatOrder: 'Order',
      sysmlatSource: 'AttachmentSource',
      sysmlatAttach: 'FixedAttachment',
      sysmlatFlowattach: 'FlowAttachment',
      sysmlatFlowupdfiled: 'FlowUploadFile',
      sysmlatFlowgendocid: 'FlowGenerationFile',
      sysmlatCondition: 'AttachmentConditions',
      sysmlatIsvalid: 'Isvalid?',
      sysmlatInvreason: 'Failurereason',
      sysmlatComment: 'Comment',
      sysmlatOrderDis: 'Please enter the serial number',
      sysmlatSourceDis: 'Please select the attachment source',
      sysmlatAttachDis: 'Please select the attachment',
      sysmlatFlowattachDis: 'Please select the process attachment',
      sysmlatFlowupdfiledDis: 'Please select the process upload file',
      sysmlatFlowgendocidDis: 'Select the process generation file',
      sysmlatConditionDis: 'Please select the attached conditions',
      sysmlatIsvalidDis: 'Please select whether it is valid',
      sysmlatInvreasonDis: 'Please enter the cause of failure',
      sysmlatCommentDis: 'Please enter remarks',
      // searchTable
      searchTitle: 'Select Document',
      searchText: 'Please enter document\'s name',
      platDctpName: 'DocumentName',
      flsdcDoctemp: 'DocumentName',
      flsdcStep: 'StepName',
      flsdcDoctemp: 'DocumentName',
      flsdcStep: 'StepName',
      searchText3: 'Please enter field name',
      sffFieldNameCn: 'FieldName',
      sffPhyfield: 'PhysicalName',
    },
    platMailVar: {
      sysmlvarMark: 'VariablesIdentify',
      sysmlvarName: 'VariableName',
      sysmlvarValdesc: 'ValuesDescription',
      sysmlvarComment: 'Comment',
      sysmlvarMarkDis: 'Please enter the variable id',
      sysmlvarNameDis: 'Please enter a variable name',
      sysmlvarValdescDis: 'Please enter the value description',
      sysmlvarCommentDis: 'Please enter remarks',
    },
  },
}
