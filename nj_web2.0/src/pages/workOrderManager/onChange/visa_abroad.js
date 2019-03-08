/**
 * Created by Aaron on 2018/4/19.
 */
import {getDataLevelUserLogin} from '../../../axios/axios'
import {isSuccess} from '../../../lib/util'

const visa_abroad = {
  all_dis() {
    visa_abroad.createBy_set(this)
  },
  abroDaynum(node) {
    visa_abroad.abroDaynum_set(this.$parent)
  },
  abroDatestop(node) {
    visa_abroad.abroDatestop_set(this.$parent)
  },
  createBy_set(t) {
    if (t.valueMap.createBy) {
      t.$refs[t.valueMap.createBy][0].$set(t.$refs[t.valueMap.createBy][0].formDataSubmit, 'createBy', t.$store.state.user.userId)
      t.$refs[t.valueMap.createBy][0].$refs.createBy.thisValue = t.$store.state.user.name
    }
    if (t.valueMap.createTime) {
      t.$refs[t.valueMap.createTime][0].$set(t.$refs[t.valueMap.createTime][0].formDataSubmit, 'createTime', new Date().format('yyyy-MM-dd'))
    }
  },
  abroDaynum_set(t) {
    let consdate
    if (t.valueMap.abroDatesta) {
      consdate = new Date(t.$refs[t.valueMap.abroDatesta][0].formDataSubmit.abroDatesta)
    }
    let conperiod
    if (t.valueMap.abroDaynum) {
      conperiod = t.$refs[t.valueMap.abroDaynum][0].formDataSubmit.abroDaynum
    }
    consdate.setDate(consdate.getDate() + parseInt(conperiod))
    t.$refs[t.valueMap.abroDatestop][0].$set(t.$refs[t.valueMap.abroDatestop][0].formDataSubmit, 'abroDatestop', consdate.getFullYear() + '-' + (consdate.getMonth() + 1) + '-' + consdate.getDate())
  },
  abroDatestop_set(t) {
    let consdate
    if (t.valueMap.abroDatesta) {
      consdate = Math.ceil((new Date(t.$refs[t.valueMap.abroDatesta][0].formDataSubmit.abroDatesta).getTime()) / 1000)
    }
    let conedate
    if (t.valueMap.abroDatestop) {
      conedate = Math.ceil((new Date(t.$refs[t.valueMap.abroDatestop][0].formDataSubmit.abroDatestop).getTime()) / 1000)
    }
    let conperiod
    if (t.valueMap.abroDaynum) {
      conperiod = Math.ceil((conedate - consdate) / 86400)
      if (parseInt(conperiod) > 0) {
        t.$refs[t.valueMap.abroDaynum][0].$set(t.$refs[t.valueMap.abroDaynum][0].formDataSubmit, 'abroDaynum', parseInt(conperiod))
      }
    }
  },
}

export default visa_abroad
