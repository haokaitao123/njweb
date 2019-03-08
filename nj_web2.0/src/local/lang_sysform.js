export default {
  'zh-CN': {
    sysForm: {
      title: '系统表单配置',
      sformCode: '编号',
      sformName: '表单名称',
      sformTbname: '物理表名',
      sformParentfield: '父表关联字段',
      sformAfthdClass: '后置处理类',
      comment: '备注',

      // 填写提示信息
      p_sformCode: '请输入编号',
      p_sformName: '请输入表单名称',
      p_sformTbname: '请输入物理表名',
      p_sformParentfield: '请输入父表关联字段',
      p_sformAfthdClass: '请输入后置处理类',
      p_comment: '请输入备注...',

      // 非空校验信息
      rule_sformCode: '编号不能为空',
      rule_sformName: '表单名称不能为空',
      rule_sformTbname: '物理表名不能为空',

      // 子表标题
      option: '系统表单配置',
      content: '表单字段设置',
      field: '表单字段验证',
    },
    formField: {
      sffOrder: '编号',
      sffPhyfield: '物理字段名',
      sffFieldNameCnDis: '字段中文名',
      sffFieldNameEnDis: '字段英文名',
      sffType: '字段类型',
      sffIsvalid: '是否启用',
      sffLayout: '布局类型',
      sffProperty: '字段属性',
      sffFilter: '过滤条件',
      sffCascadeget: '级联获取',
      sffDisdefault: '默认是否显示',
      sffIsupdate: '是否可修改',
      sffLength: '长度',
      sffPrecision: '精度',
      sffSelopt: '选项类型',
      sffSysoptDis: '系统选项配置',
      sffCustoptshow: '自定义选项配置',
      sffDefault: '默认值',
      sffIslist: '是否列表显示',
      sffComplexsearch: '是否高级查询',
      sffQuicksearche: '是否快速查询',
      sffUpdformat: '上传格式',
      sffLowersize: '文件大小下限',
      sffUppersize: '文件大小上限',
      sffDesc: '字段简要说明',
      sffSetvalue: '设置逻辑值',
      sffDislogic: '显示逻辑值',
      comment: '备注',

      // 填写提示信息
      p_sffOrder: '请输入编号',
      p_sffPhyfield: '请输入物理字段名称',
      p_sffFieldNameCnDis: '请输入字段中文名',
      p_sffFieldNameEnDis: '请输入字段英文名',
      p_sffType: '请选择布局类型',
      p_sffLayout: '请选择布局类型',
      p_sffProperty: '请选择字段属性',
      p_sffFilter: '请输入过滤条件',
      p_sffCascadeget: '请输入级联获取内容',
      p_sffLength: '请输入数值长度',
      p_sffPrecision: '请输入数值精度',
      p_sffSelopt: '请选择选项类型',
      p_sffSysoptDis: '请选择系统配置',
      p_sffCustoptshow: '请增加自定义选项配置',
      p_sffDefault: '请增加认值',
      p_sffLowersize: '请输入文件大小下限',
      p_sffUppersize: '请输入文件大小上限',
      p_sffDesc: '请输入字段简要说明',
      p_sffSetvalue: '请输入设置逻辑值',
      p_sffDislogic: '请输入显示逻辑值',
      p_comment: '请输入备注',
      p_cnen: '请输入中文/英文名称',
      // 非空校验信息
      rule_sffOrder: '显示顺序不能为空',
      rule_sffPhyfield: '物理字段不能为空',
      rule_sffFieldNameCnDis: '字段中文名称不能为空',
      rule_sffFieldNameEnDis: '字段英文名称不能为空',
      rule_sffIsvalid: '是否启用必须选择',
      rule_sffLayout: '布局类型不能为空',


      selCode: '选项编号',
      selMark: '选项标识',
      selName: '选项名称',
      searchTitle: '选择系统选项',
      searchText: '请输入选项名称',

    },
    Sffvalid: {
      sffvFieldname: '物理字段名',
      sffvStyle: '校验方式',
      sffvValidvalue: '校验值',
      sffvIsmust: '是否必须',
      sffvPrommsg: '提醒的提示信息',
      sffvMustmsg: '必须的提示信息',

      // 填写提示信息
      p_sffvFieldname: '请选择物理字段',
      p_sffvStyle: '请选择校验方式',
      p_sffvValidvalue: '请填写校验值',
      p_sffvPrommsg: '请选择提醒信息',
      p_sffvMustmsg: '请选择提示信息',

      // 非空校验信息
      rule_sffvFieldname: '字段不能为空',
      rule_sffvStyle: '检验方式不能为空',
      rule_sffvIsmust: '字段校验是否必须',
      rule_sffvMustmsg: '必须提示信息不能为空',
    },
    // 弹出选择 searchTable
    fieldCloumns: {
      sffPhyfield: '物理字段名称',
      sffFieldNameCnDis: '字段名称',
      title1: '选择流程字段',
      searchText1: '请输入物理字段名称',
      searchText2: '请输入字段名称',
    },
    promCloumns: {
      lanCode: '多语言编码',
      lanCn: '提示中文',
      lanEn: '提示中文',
      title2: '选择提示信息',
      searchText3: '请输入中/英文名称',
    },


  },
  'en-US': {
    sysForm: {
      title: 'System form setting ',
      sformCode: 'Order',
      sformName: 'Form Name',
      sformTbname: 'Physical form name',
      sformParentfield: 'Parent field',
      sformAfthdClass: 'After handle class',
      comment: 'comment',

      // 填写提示信息
      p_sformCode: 'Please input order',
      p_sformName: 'Please input form name',
      p_sformTbname: 'Please input physical form name',
      p_sformParentfield: 'Please input parent field',
      p_sformAfthdClass: 'Please input After handle Class',
      p_comment: 'Please input comment',

      // 非空校验信息
      rule_sformCode: 'Order must be not null',
      rule_sformName: 'Form name must be not null',
      rule_sformTbname: 'Physical form name must be not null',

      // 子表标题
      option: 'sys form setting',
      content: 'form field setting',
      field: 'form field valid',
    },
    formField: {
      sffOrder: 'Order',
      sffPhyfield: 'Physical field',
      sffFieldNameCnDis: 'Chinese Name',
      sffFieldNameEnDis: 'English Name',
      sffType: 'Field type',
      sffIsvalid: 'Is enable',
      sffLayout: 'Layout',
      sffProperty: 'Field attribute',
      sffFilter: 'Filter condition',
      sffCascadeget: 'Cascade acquisition',
      sffDisdefault: 'Is default display',
      sffIsupdate: 'Is modifiable',
      sffLength: 'Length',
      sffPrecision: 'Accuracy',
      sffSelopt: 'Option type',
      sffSysoptDis: 'System Options Configuration',
      sffCustoptshow: 'Custom Options Configuration',
      sffDefault: 'Default valueS',
      sffIslist: 'Is list display',
      sffComplexsearch: 'Is Advanced Query',
      sffQuicksearche: 'Is quick query',
      sffUpdformat: 'Upload format',
      sffLowersize: 'Lower limit',
      sffUppersize: 'Maximum file size',
      sffDesc: 'Description ',
      sffSetvalue: 'Logical values setting',
      sffDislogic: 'Display logical setting',
      comment: 'comment',

      // 填写提示信息
      p_sffOrder: 'Please input order',
      p_sffPhyfield: 'Please input physical field',
      p_sffFieldNameCnDis: 'Please input chinese name',
      p_sffFieldNameEnDis: 'Please input english name',
      p_sffType: 'Please input field type',
      p_sffLayout: 'Please select layout',
      p_sffProperty: 'Please chose field attribute',
      p_sffFilter: 'Please input filter condition',
      p_sffCascadeget: 'Please input cascade acquisition',
      p_sffLength: 'Please enter numerical length',
      p_sffPrecision: 'Please input numerical accuracy',
      p_sffSelopt: 'Please select the option type',
      p_sffSysoptDis: 'Please select system configuration',
      p_sffCustoptshow: 'Please add custom options configuration',
      p_sffDefault: 'Please add default value',
      p_sffLowersize: 'Please enter the lower limit of file size',
      p_sffUppersize: 'Please enter the file size cap',
      p_sffDesc: 'Please input desc.',
      p_sffSetvalue: 'Please enter a brief description of the field',
      p_sffDislogic: 'Please enter the display logic value',
      p_comment: 'Please input comment',
      p_cnen: 'please input chinese or english name',
      // 非空校验信息
      rule_sffOrder: 'The order must be not null',
      rule_sffPhyfield: 'Physical field must be not null',
      rule_sffFieldNameCnDis: 'Chinese name must be not null',
      rule_sffFieldNameEnDis: 'English name must be not null',
      rule_sffIsvalid: 'Is enable must be chosed',
      rule_sffLayout: 'Layout must be not null',


      selCode: 'Option order',
      selMark: 'Option Mark',
      selName: 'OPtion Name',
      searchTitle: 'Please select system option',
      searchText: 'Please input option',

    },
    Sffvalid: {
      sffvFieldname: 'Physical Field',
      sffvStyle: 'Verification mode',
      sffvValidvalue: 'Check value',
      sffvIsmust: 'Is must',
      sffvPrommsg: 'Tips for reminders',
      sffvMustmsg: 'Necessary prompt information',

      // 填写提示信息
      p_sffvFieldname: 'Please select field',
      p_sffvStyle: 'Please select verification mode',
      p_sffvValidvalue: 'Please input value',
      p_sffvPrommsg: 'Please select the tip',
      p_sffvMustmsg: 'Please select the tip',

      // 非空校验信息
      rule_sffvFieldname: 'Field must be not null',
      rule_sffvStyle: 'Verification mode must be not null',
      rule_sffvIsmust: 'Please select the option',
      rule_sffvMustmsg: 'The tip  must be not null',
    },
    // 弹出选择 searchTable
    fieldCloumns: {
      sffPhyfield: 'Physical field',
      sffFieldNameCnDis: 'Field Name',
      title1: 'Physical field list',
      searchText1: 'Physical fieldS',
      searchText2: 'Field name',
    },
    promCloumns: {
      lanCode: 'Code',
      lanCn: 'Cn',
      lanEn: 'En',
      title2: 'Tips List',
      searchText3: 'Please input cn or en',
    },
  },
}
