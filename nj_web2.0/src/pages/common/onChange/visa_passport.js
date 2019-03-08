/**
 * Created by Aaron on 2018/4/19.
 */
const visa_passport = {
  all_dis() {
    visa_passport.passHaspass_dis(this)
  },
  passHaspass(node) {
    visa_passport.passHaspass_set(this.$parent)
    visa_passport.passHaspass_dis(this.$parent)
  },


  passHaspass_set(t) {
    if (t.valueMap.passHaspass && t.$refs[t.valueMap.passHaspass][0].formDataSubmit.passHaspass === '0') {
      if (t.valueMap.passArea) {
        t.$refs[t.valueMap.passArea][0].$set(t.$refs[t.valueMap.passArea][0].formDataSubmit, 'passArea', '')
      }
      if (t.valueMap.passNumber) {
        t.$refs[t.valueMap.passNumber][0].$set(t.$refs[t.valueMap.passNumber][0].formDataSubmit, 'passNumber', '')
      }
    }
  },

  passHaspass_dis(t) {
    if (t.valueMap.passHaspass) {
      if (t.$refs[t.valueMap.passHaspass][0].formDataSubmit.passHaspass === '0') {
        if (t.valueMap.passArea) {
          t.$refs[t.valueMap.passArea][0].$delete(t.$refs[t.valueMap.passArea][0].formshow, 'passArea')
        }
        if (t.valueMap.passNumber) {
          t.$refs[t.valueMap.passNumber][0].$delete(t.$refs[t.valueMap.passNumber][0].formshow, 'passNumber')
        }
      } else {
        if (t.valueMap.passArea) {
          t.$refs[t.valueMap.passArea][0].$set(t.$refs[t.valueMap.passArea][0].formshow, 'passArea', '')
        }
        if (t.valueMap.passNumber) {
          t.$refs[t.valueMap.passNumber][0].$set(t.$refs[t.valueMap.passNumber][0].formshow, 'passNumber', '')
        }
      }
    }
  },
}

export default visa_passport
// export default flow1
