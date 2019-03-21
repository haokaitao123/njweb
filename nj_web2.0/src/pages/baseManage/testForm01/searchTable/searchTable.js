/**
 * Created by Aaron on 2018/3/14.
 */
const searchTable = {
  /*
  * 国家
  * */
  'base-cuntry-std': {
    searchText: '请输入国家',
    valueText: 'countryName',
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
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
    },
  },
  /*
  * 省份
  * */
  'base-province-std': {
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
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
      cityType: '01prov',
      cityIsvalid: '1',
    },
  },
  /*
  * 城市
  * */
  'base-city-std': {
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
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
      cityType: '02city',
      cityIsvalid: '1',
    },
  },
  /*
  * 选择币种
  * */
  'base-currency-std': {
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
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
    },
  },
  /*
   * 选择银行
   * */
  'base-bankdetail-std': {
    searchText: '请输入银行',
    valueText: 'bankCode',
    searchCloumns: [
      {
        title: '银行代码/行号',
        key: 'bankCode',
      },
      {
        title: '所属城市',
        key: 'bankCityName',
      },
    ],
    param: {
      _mt: 'baseBankinfo.getPage',
      sort: 'id',
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
    },
  },
  /*
  * 选择离职原因
  * */
  'base-leaveReason-std': {
    searchText: '请输入离职原因',
    valueText: 'levaName',
    searchCloumns: [
      {
        title: '离职原因',
        key: 'levaName',
      },
    ],
    param: {
      _mt: 'baseLevareason.getPage',
      sort: 'id',
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
    },
  },
  /*
   * 选择未入职原因
   * */
  'base-noEntryReason-std': {
    searchText: '请输入未入职原因',
    valueText: 'nerName',
    searchCloumns: [
      {
        title: '未入职原因',
        key: 'nerName',
      },
    ],
    param: {
      _mt: 'baseNereason.getPage',
      sort: 'id',
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
    },
  },
  /*
   * 选择社保险种信息
   * */
  'base-socialIns-std': {
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
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
    },
  },
  /*
   * 选择公司
   * */
  'org-company-std': {
    searchText: '请输入公司',
    valueText: 'unitsName',
    searchCloumns: [
      {
        title: '公司编码',
        key: 'unitCode',
      },
      {
        title: '公司名称',
        key: 'unitsName',
      },
    ],
    param: {
      _mt: 'orgUnits.getByOrgFramePageList',
      sort: 'id',
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
      unitType: '01company',
    },
  },
  /*
   * 选择部门
   * */
  'org-department-std': {
    searchText: '请输入部门',
    valueText: 'unitsName',
    searchCloumns: [
      {
        title: '公司编码',
        key: 'unitCode',
      },
      {
        title: '公司名称',
        key: 'unitsName',
      },
    ],
    param: {
      _mt: 'orgUnits.getByOrgFramePageList',
      sort: 'id',
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
      unitType: '02dept',
    },
  },
  /*
   * 选择岗位
   * */
  'org-post-std': {
    searchText: '请输入岗位',
    valueText: 'postFnameDis',
    searchCloumns: [
      {
        title: '岗位编码',
        key: 'postCode',
      },
      {
        title: '岗位名称',
        key: 'postFnameDis',
      },
    ],
    param: {
      _mt: 'orgPost.getPage',
      sort: 'id',
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
    },
  },
  /*
   * 选择成本中心
   * */
  'org-costcenter-std': {
    searchText: '请输入成本中心',
    valueText: 'name',
    searchCloumns: [
      {
        title: '成本中心编码',
        key: 'costCode',
      },
      {
        title: '成本中心名称',
        key: 'costName',
      },
    ],
    param: {
      _mt: 'orgCostcenter.getPage',
      sort: 'id',
      order: 'desc',
      rows: '10',
      page: '1',
      logType: '查询',
    },
  },
  /*
* 选择社保政策
* */
  'sihf-policy-std': {
    searchText: '请输入社保中文名称',
    valueText: 'sihfpcyCn',
    code: 'sihfpcyCn',
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
      rows: '10',
      page: '1',
      sihfpcyType: '01social',
      logType: '查询',
    },
  },
  /*
* 选择公积金政策
* */
  'sihf-HFpolicy-std': {
    searchText: '请输入公积金中文名称',
    valueText: 'sihfpcyCn',
    code: 'sihfpcyCn',
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
      rows: '10',
      page: '1',
      sihfpcyType: '02hfund',
      logType: '查询',
    },
  },
}
export default searchTable
