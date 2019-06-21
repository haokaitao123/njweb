/**
 * Created by Aaron on 2019/6/18.
 * muyu
 */
import {
    getDataLevelUserLogin
  } from '../../../axios/axios'
  import {
    isSuccess
  } from '../../../lib/util'

  const atten_ckappeal = {
    all_dis() {
   
      atten_ckappeal.attenckappeal_set(this)
    },


    attenckappeal_set(t) {
        if (t.valueMap.dimApplicant) {
          //alert(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant)
          if (t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant.length <= 0 || t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant === '0') {
            t.$refs[t.valueMap.dimApplicant][0].$set(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit, 'dimApplicant', t.$store.state.user.userId)
            t.$refs[t.valueMap.dimApplicant][0].$refs.dimApplicant.thisValue = t.$store.state.user.name
          }
        }
        if (t.valueMap.dimApplydate) {
          //alert(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit.dimApplydate)
          if (t.$refs[t.valueMap.dimApplydate][0].formDataSubmit.dimApplydate.length <= 0) {
            t.$refs[t.valueMap.dimApplydate][0].$set(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit, 'dimApplydate', new Date().format('yyyy-MM-dd'))
          }
        }
        if (t.valueMap.dimLevsqday) {
          if (t.$refs[t.valueMap.dimLevsqday][0].formDataSubmit.dimLevsqday.length <= 0) {
            t.$refs[t.valueMap.dimLevsqday][0].$set(t.$refs[t.valueMap.dimLevsqday][0].formDataSubmit, 'dimLevsqday', new Date().format('yyyy-MM-dd'))
          }
        }
      },
  }
  export default emp_empdim