/**
 * Created by Aaron on 2018/1/2.
 */
//参数类型管理
import baseParamType from '@/pages/baseManage/baseparamtype/baseParamType'

//公共参数管理
import baseParamInfo from '@/pages/baseManage/baseparaminfo/baseParamInfo'

//国家信息管理
import countryManage from '@/pages/baseManage/country-manage/countryManage'

//省份城市管理
import cityManage from '@/pages/baseManage/city-manage/cityManage'

//微信消息日志
import baseWxmsgrecord from '@/pages/baseManage/baseWxmsgrecord/baseWxmsgrecord'

//税率表
import taxTaxrateManage from '@/pages/baseManage/taxrate-manage/taxrateManage'

//币种信息表
import currencyManage from '@/pages/baseManage/currency-manage/currencyManage'

//汇率表
import exrateManage from '@/pages/baseManage/exrate-manage/exrateManage'

//个税免征额
import taxexemptionManage from '@/pages/baseManage/taxexemption-manage/taxexemptionManage'

//银行信息
import bankinfoManage from '@/pages/baseManage/bankinfo-manage/bankinfoManage'

//离职补偿金免税信息管理
import levadfamountManage from '@/pages/baseManage/levadfamount-manage/levadfamountManage'

//离职原因信息管理
import levareasonManage from '@/pages/baseManage/levareason-manage/levareasonManage'

//未入职原因信息管理
import nereasonManage from '@/pages/baseManage/nereason-manage/nereasonManage'

//险种信息管理
import sscoverageManage from '@/pages/baseManage/sscoverage-manage/sscoverageManage'

//测试表单01
import testForm01Manager from '@/pages/baseManage/testForm01/commonList/commonSinglePageList'

//短信日志
import smsrecordManage from '@/pages/baseManage/smsrecord-manage/smsrecordManage'

//邮件日志
import emaillogManage from '@/pages/baseManage/emaillog-manage/emaillogManage'

//指定流程审批人
import procUserPost from '@/pages/baseManage/baseProceuser/procUserPost'

//消息提醒日志
import cmutRemind from '@/pages/baseManage/cmutRemind/cmutRemind'

//自动编码定义
import autocodeManage from '@/pages/baseManage/autocode-manage/autocodeManage'
//住房租金专项扣除
import baseHousinglease from '@/pages/baseManage/baseHousinglease/baseHousinglease'
export default [
  {
    path: 'baseParamInfo',
    name: 'baseParamInfo',
    component: baseParamInfo,
  },
  {
    path: 'baseParamType',
    name: 'baseParamType',
    component: baseParamType,
  },
  {
    path: 'countryManage',
    name: 'countryManage',
    component: countryManage,
  },
  {
    path: 'cityManage',
    name: 'cityManage',
    component: cityManage,
  },
  {
    path: 'baseWxmsgrecord',
    name: 'baseWxmsgrecord',
    component: baseWxmsgrecord,
  },
  {
    path: 'taxTaxrateManage',
    name: 'taxTaxrateManage',
    component: taxTaxrateManage,
  },
  {
    path: 'currencyManage',
    name: 'currencyManage',
    component: currencyManage,
  },
  {
    path: 'exrateManage',
    name: 'exrateManage',
    component: exrateManage,
  },
  {
    path: 'bankinfoManage',
    name: 'bankinfoManage',
    component: bankinfoManage,
  },
  {
    path: 'taxexemptionManage',
    name: 'taxexemptionManage',
    component: taxexemptionManage,
  },
  {
    path: 'levadfamountManage',
    name: 'levadfamountManage',
    component: levadfamountManage,
  },
  {
    path: 'levareasonManage',
    name: 'levareasonManage',
    component: levareasonManage,
  },
  {
    path: 'nereasonManage',
    name: 'nereasonManage',
    component: nereasonManage,
  },
  {
    path: 'sscoverageManage',
    name: 'sscoverageManage',
    component: sscoverageManage,
  },
  {
    path: 'testForm01Manager',
    name: 'testForm01Manager',
    component: testForm01Manager,
  },
  {
    path: 'smsrecordManage',
    name: 'smsrecordManage',
    component: smsrecordManage,
  },
  {
    path: 'emaillogManage',
    name: 'emaillogManage',
    component: emaillogManage,
  },
  {
    path: 'autocodeManage',
    name: 'autocodeManage',
    component: autocodeManage,
  },
  {
    path: 'cmutRemind',
    name: 'cmutRemind',
    component: cmutRemind,
  },
  {
    path: 'baseHousinglease',
    name: 'baseHousinglease',
    component: baseHousinglease,
  },
  {
    path: 'procUserPost',
    name: 'procUserPost',
    component: procUserPost,
  },
]
