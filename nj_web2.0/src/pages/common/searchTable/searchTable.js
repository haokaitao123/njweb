/**
 * Created by Aaron on 2018/3/14.
 */
const searchTable = {
  /*
  * 国家
  * */
  'base-cuntry-std': {
    title: '选择国家',
    searchText: '请输入国家中文',
    valueText: 'countryCname',
    searchCloumns: [
      {
        title: '国家中文',
        key: 'countryCname',
        // sortable: 'custom',
      },
      {
        title: '国家英文',
        key: 'countryEname',
        // sortable: 'custom',
      },
    ],
    param: {
      _mt: 'baseCountry.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
  * 省份
  * */
  'base-province-std': {
    title: '选择省份',
    searchText: '请输入省份',
    valueText: 'cityName',
    searchCloumns: [
      {
        title: '省份名称',
        key: 'cityName',
      },
    ],
    param: {
      _mt: 'baseCity.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
      cityType: '01prov',
      cityIsvalid: '1',
    },
  },
  /*
  * 城市
  * */
  'base-city-std': {
    title: '选择城市',
    searchText: '请输入城市',
    valueText: 'cityName',
    searchCloumns: [
      {
        title: '城市名称',
        key: 'cityName',
      },
    ],
    param: {
      _mt: 'baseCity.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
      cityType: '02city',
      cityIsvalid: '1',
    },
  },
  /*
  * 选择币种
  * */
  'base-currency-std': {
    title: '选择币种',
    searchText: '请输入币种',
    valueText: 'currCurrency',
    searchCloumns: [
      {
        title: '币种名称',
        key: 'currCurrency',
      },
    ],
    param: {
      _mt: 'baseCurrency.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
   * 选择银行
   * */
  'base-bankdetail-std': {
    title: '选择银行',
    searchText: '请输入银行名称',
    valueText: 'bankCname',
    searchCloumns: [
      {
        title: '银行代码/行号',
        key: 'bankCode',
      },
      {
        title: '银行中文名',
        key: 'bankCname',
      },
    ],
    param: {
      _mt: 'baseBankinfo.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
  * 选择离职原因
  * */
  'base-leaveReason-std': {
    title: '选择离职',
    searchText: '请输入离职原因',
    valueText: 'levaName',
    searchCloumns: [
      {
        title: '离职原因中文',
        key: 'levaCname',
      },
      {
        title: '离职原因英文',
        key: 'levaEname',
      },
    ],
    param: {
      _mt: 'baseLevareason.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
   * 选择未入职原因
   * */
  'base-noEntryReason-std': {
    title: '选择未入职原因',
    searchText: '请输入未入职原因',
    valueText: 'nerName',
    searchCloumns: [
      {
        title: '未入职原因中文',
        key: 'nerCname',
      },
      {
        title: '未入职原因英文',
        key: 'nerEname',
      },
    ],
    param: {
      _mt: 'baseNereason.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
   * 选择社保险种信息
   * */
  'base-socialIns-std': {
    title: '选择社保险种',
    searchText: '请输入社保险种信息',
    valueText: 'sscName',
    searchCloumns: [
      {
        title: '社保险种名称',
        key: 'sscName',
      },
      {
        title: '社保险种类别',
        key: 'sscTypeName',
      },
    ],
    param: {
      _mt: 'baseSscoverage.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
   * 选择公司
   * */
  'org-company-std': {
    title: '选择公司',
    searchText: '请输入公司',
    valueText: 'unitFname',
    searchCloumns: [
      {
        title: '公司编码',
        key: 'unitCode',
      },
      {
        title: '公司名称',
        key: 'unitFname',
      },
    ],
    param: {
      _mt: 'orgUnits.getByOrgFramePageList',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
      unitType: '01company',
    },
  },
  /*
   * 选择部门
   * */
  'org-department-std': {
    title: '选择部门',
    searchText: '请输入部门名称',
    valueText: 'unitFname',
    searchCloumns: [
      {
        title: '部门编码',
        key: 'unitCode',
      },
      {
        title: '部门名称',
        key: 'unitFname',
      },
    ],
    param: {
      _mt: 'orgUnits.getByOrgFramePageList',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
   * 选择岗位
   * */
  'org-post-std': {
    title: '选择岗位',
    searchText: '请输入岗位名称',
    valueText: 'postFname',
    searchCloumns: [
      {
        title: '岗位编码',
        key: 'postCode',
      },
      {
        title: '岗位名称',
        key: 'postFname',
      },
    ],
    param: {
      _mt: 'orgPost.getPopupPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
   * 选择成本中心
   * */
  'org-costcenter-std': {
    title: '选择费用中心',
    searchText: '请输入成本中心名称',
    valueText: 'name',
    searchCloumns: [
      {
        title: '成本中心编码',
        key: 'costCode',
      },
      {
        title: '成本中心名称',
        key: 'name',
      },
    ],
    param: {
      _mt: 'orgCostcenter.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
   * 选择员工
   * */
  'emp-base-std': {
    title: '选择员工',
    searchText: '请输入员工姓名',
    valueText: 'empCname',
    searchCloumns: [
      {
        title: '员工工号',
        key: 'empkiWorkno',
      },
      {
        title: '中文名',
        key: 'empCname',
      },
      {
        title: '英文名',
        key: 'empEname',
      },
      {
        title: '公司',
        key: 'empcompHirecompanyDis',
      },
      {
        title: '部门',
        key: 'empcompDeptDis',
      },
      {
        title: '岗位',
        key: 'empcompPostDis',
      },
    ],
    param: {
      _mt: 'viewEmpMaster.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      empkiStatus: '\'00probation\',\'01active\'',
      logType: '查询',
    },
  },
  /*
   * 选择民族
   * */
  'param-nationtype': {
    title: '选择民族',
    searchText: '请输入中文名称',
    valueText: 'paramInfoName',
    code: 'paramCode',
    searchCloumns: [
      {
        title: '中文名称',
        key: 'paramInfoCn',
        width: 380,
      },
      {
        title: '英文名称',
        key: 'paramInfoEn',
        width: 379,
      },
    ],
    param: {
      _mt: 'baseParmInfo.getParamInfoByPage',
      sort: 'id',
      order: 'desc',
      rows: 10,
      page: 1,
      paramTypeDis: 'nationtype',
      logType: '查询',
    },
  },
  /*
* 薪资项目
* */
  'pay-salitem-std': {
    title: '选择薪资项目',
    searchText: '请输入项目名称',
    valueText: 'paysiCN',
    searchCloumns: [
      {
        title: '项目编码',
        key: 'paysiCode',
        // sortable: 'custom',
      },
      {
        title: '项目名称',
        key: 'paysiCN',
        // sortable: 'custom',
      },
    ],
    param: {
      _mt: 'paySalItem.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
 * 选择员工号
 * */
  'emp-workno-std': {
    title: '选择员工工号',
    searchText: '请输入员工工号',
    valueText: 'empkiWorkno',
    code: 'empkiWorkno',
    searchCloumns: [
      {
        title: '中文名',
        key: 'empCname',
      },
      {
        title: '英文名',
        key: 'empEname',
      },
      {
        title: '员工号',
        key: 'empkiWorkno',
      },
    ],
    param: {
      _mt: 'viewEmpMaster.getPage',
      empkiStatus: '\'00probation\',\'01active\'',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
* 选择社保政策
* */
  'sihf-policy-std': {
    title: '选择社保政策',
    searchText: '请输入社保中文名称',
    valueText: 'sihfpcyCn',
    searchCloumns: [
      {
        title: '社保中文名',
        key: 'sihfpcyCn',
      },
      {
        title: '社保英文名',
        key: 'sihfpcyEn',
      },
      {
        title: '社保地区',
        key: 'sihfpcyAreaName',
      },
    ],
    param: {
      _mt: 'sihfPolicy.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      sihfpcyType: '01social',
      logType: '查询',
    },
  },
  /*
* 选择公积金政策
* */
  'sihf-HFpolicy-std': {
    title: '选择公积金',
    searchText: '请输入公积金中文名称',
    valueText: 'sihfpcyCn',
    searchCloumns: [
      {
        title: '公积金中文名',
        key: 'sihfpcyCn',
      },
      {
        title: '公积金英文名',
        key: 'sihfpcyEn',
      },
      {
        title: '公积金地区',
        key: 'sihfpcyAreaName',
      },
    ],
    param: {
      _mt: 'sihfPolicy.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      sihfpcyType: '02hfund',
      logType: '查询',
    },
  },
  /*
* 选择在职员工信息
* */
  'ansp-emp': {
    title: '选择员工工号',
    searchText: '请输入员工工号',
    valueText: 'empkiWorkno',
    code: 'empkiWorkno',
    searchCloumns: [
      {
        title: '中文名',
        key: 'empCname',
      },
      {
        title: '英文名',
        key: 'empEname',
      },
      {
        title: '员工工号',
        key: 'empkiWorkno',
      },
    ],
    param: {
      _mt: 'ansrptEmpMaster.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },

  /*
* 选择档案分类
* */
  'archives-classification-std': {
    title: '选择档案',
    searchText: '请输入档案名称',
    valueText: 'claName',
   // code: 'claName',
    searchCloumns: [
      {
        title: '档案分类名称',
        key: 'claName',
      },
      {
        title: '编码',
        key: 'claNo',
      },
      {
        title: '上级分类',
        key: 'claPidDis',
      },
    ],
    param: {
      _mt: 'archivesClassification.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },

  /*
* 选择档案室
* */
  'archives-center-std': {
    title: '选择档案室',
    searchText: '请输入档案室名称',
    valueText: 'cenName',
    // code: 'claName',
    searchCloumns: [
      {
        title: '档案室名称',
        key: 'cenName',
      },
      {
        title: '档案室编码',
        key: 'cenNo',
      }
    ],
    param: {
      _mt: 'archivesCenter.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },

  /*
 * 选择档案柜
 * */
  'archives-cabinet-std': {
    title: '选择档案柜',
    searchText: '请输入档案柜名称',
    valueText: 'cabNo',
    // code: 'claName',
    searchCloumns: [
      {
        title: '档案柜编码',
        key: 'cabNo',
      },
      {
        title: '档案室名称',
        key: 'cabCenidDis',
      },
    ],
    param: {
      _mt: 'archivesCabinet.getPage',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
* 选择用户
* */
  'user-info-std': {
    title: '选择用户',
    searchText: '请输入用户姓名',
    valueText: 'name',
    searchCloumns: [
      {
        title: '姓名',
        key: 'name',
      },
      {
        title: '证件号码',
        key: 'idNo',
      }
    ],
    param: {
      _mt: 'userMgmt.userpage',
      status: '02valid',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /*
* 选择用户
* */
  'employee-visaArea-std': {
    title: '签证领区',
    searchText: '请选择受理区域范围',
    valueText: 'areaScope',
    searchCloumns: [
      {
        title: '领区',
        key: 'areaDistrictDis',
      },
      {
        title: '受理区域范围',
        key: 'areaScope',
      }
    ],
    param: {
      _mt: 'visaArea.getPage',
      isValid: '1',
      sort: 'id',
      order: 'asc',
      rows: 10,
      page: 1,
      logType: '查询',
    },
  },
  /**
   * 选择纳杰员工
   */
  'empnh-base-std': {
    title: '选择员工',
    searchText: '请输入员工姓名',
    valueText: 'empnhName',
    searchCloumns: [
      {
        title: '员工姓名',
        key: 'empnhName',
      },
      {
        title: '证件号码',
        key: 'empnhIdno',
      }
    ],
    param: {
      _mt: 'empEmpnh.getPage',
      sort: 'id',
      order: 'desc',
      rows: 10,
      page: 1,
      state:'02empstate',
      logType: '员工弹出框',
    },
  },
}
export default searchTable
