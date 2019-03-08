/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const visa_abroad = {
  all_dis() {
    visa_abroad.createBy_set(this)
    visa_abroad.abroPubresu_dis(this)
    visa_abroad.abroIfout_dis(this)
  },
  abroPubresu(node) {
    visa_abroad.abroPubresu_dis(this.$parent)
  },
  abroIfout(node) {
    visa_abroad.abroIfout_dis(this.$parent)
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
  abroPubresu_dis(t) {
    if (t.valueMap.abroPubresu) {
      if (t.$refs[t.valueMap.abroPubresu][0].formDataSubmit.abroPubresu === '1') {
        if (t.valueMap.abroPubopinion) {
          t.$refs[t.valueMap.abroPubopinion][0].$delete(t.$refs[t.valueMap.abroPubopinion][0].formshow, 'abroPubopinion')
        }
      } else {
        if (t.valueMap.abroPubopinion) {
          t.$refs[t.valueMap.abroPubopinion][0].$set(t.$refs[t.valueMap.abroPubopinion][0].formshow, 'abroPubopinion', '')
        }
      }
    }
  },
  abroIfout_dis(t) {
    if (t.valueMap.abroIfout) {
      if (t.$refs[t.valueMap.abroIfout][0].formDataSubmit.abroIfout === '1') {
        if (t.valueMap.abroIfcause) {
          t.$refs[t.valueMap.abroIfcause][0].$delete(t.$refs[t.valueMap.abroIfcause][0].formshow, 'abroIfcause')
        }
        if (t.valueMap.abroCauseselet) {
          t.$refs[t.valueMap.abroCauseselet][0].$delete(t.$refs[t.valueMap.abroCauseselet][0].formshow, 'abroCauseselet')
        }
      } else {
        if (t.valueMap.abroIfcause) {
          t.$refs[t.valueMap.abroIfcause][0].$set(t.$refs[t.valueMap.abroIfcause][0].formshow, 'abroIfcause', '')
        }
        if (t.valueMap.abroCauseselet) {
          t.$refs[t.valueMap.abroCauseselet][0].$set(t.$refs[t.valueMap.abroCauseselet][0].formshow, 'abroCauseselet', '')
        }
      }
    }
  },
}

export default visa_abroad
