/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const visa_return = {
  all_dis() {
    visa_return.returnIsback_dis(this)
    visa_return.returnIspassport_dis(this)
  },
  // 是否回国
  returnIsback(node) {
    visa_return.returnIsback_set(this.$parent)
    visa_return.returnIsback_dis(this.$parent)
  },
  // 是否需要交回护照
  returnIspassport(node) {
    visa_return.returnIspassport_set(this.$parent)
    visa_return.returnIspassport_dis(this.$parent)
  },
  // 是否回国
  returnIsback_set(t) {
    if (t.valueMap.returnIsback && t.$refs[t.valueMap.returnIsback][0].formDataSubmit.returnIsback === '0') {
      if (t.valueMap.returnTime) {
        t.$refs[t.valueMap.returnTime][0].$set(t.$refs[t.valueMap.returnTime][0].formDataSubmit, 'returnTime', '')
      }
      if (t.valueMap.returnProveup) {
        t.$refs[t.valueMap.returnProveup][0].$set(t.$refs[t.valueMap.returnProveup][0].formDataSubmit, 'returnProveup', '')
      }
    }
  },
  returnIsback_dis(t) {
    if (t.valueMap.returnIsback) {
      if (t.$refs[t.valueMap.returnIsback][0].formDataSubmit.returnIsback === '0') {
        if (t.valueMap.returnTime) {
          t.$refs[t.valueMap.returnTime][0].$delete(t.$refs[t.valueMap.returnTime][0].formshow, 'returnTime')
        }
        if (t.valueMap.returnProveup) {
          t.$refs[t.valueMap.returnProveup][0].$delete(t.$refs[t.valueMap.returnProveup][0].formshow, 'returnProveup')
        }
      } else {
        if (t.valueMap.returnTime) {
          t.$refs[t.valueMap.returnTime][0].$set(t.$refs[t.valueMap.returnTime][0].formshow, 'returnTime', '')
        }
        if (t.valueMap.returnProveup) {
          t.$refs[t.valueMap.returnProveup][0].$set(t.$refs[t.valueMap.returnProveup][0].formshow, 'returnProveup', '')
        }
      }
    }
  },
  // 是否需要交回护照
  returnIspassport_set(t) {
    if (t.valueMap.returnIspassport && t.$refs[t.valueMap.returnIspassport][0].formDataSubmit.returnIspassport === '0') {
      if (t.valueMap.returnIspassreturn) {
        t.$refs[t.valueMap.returnIspassreturn][0].$set(t.$refs[t.valueMap.returnIspassreturn][0].formDataSubmit, 'returnIspassreturn', '')
      }
    }
  },
  returnIspassport_dis(t) {
    if (t.valueMap.returnIspassport) {
      if (t.$refs[t.valueMap.returnIspassport][0].formDataSubmit.returnIspassport === '0') {
        if (t.valueMap.returnIspassreturn) {
          t.$refs[t.valueMap.returnIspassreturn][0].$delete(t.$refs[t.valueMap.returnIspassreturn][0].formshow, 'returnIspassreturn')
        }
      } else {
        if (t.valueMap.returnIspassreturn) {
          t.$refs[t.valueMap.returnIspassreturn][0].$set(t.$refs[t.valueMap.returnIspassreturn][0].formshow, 'returnIspassreturn', '')
        }
      }
    }
  },
}

export default visa_return
