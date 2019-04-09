/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_empdim = {
  all_dis() {
    emp_empdim.empdimApplicant_set(this)
  },

  empdimApplicant_set(t) {
    debugger
      if (t.valueMap.dimApplicant) {
        //alert(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant)
        if(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant.length<=0 || t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant === '0'){
          t.$refs[t.valueMap.dimApplicant][0].$set(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit, 'dimApplicant',  t.$store.state.user.userId)
          t.$refs[t.valueMap.dimApplicant][0].$refs.dimApplicant.thisValue = t.$store.state.user.name
        }
      }
    if (t.valueMap.dimApplydate) {
      //alert(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit.dimApplydate)
      if(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit.dimApplydate.length<=0){
        t.$refs[t.valueMap.dimApplydate][0].$set(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit, 'dimApplydate',  new Date().format('yyyy-MM-dd'))
      }
    }
  },

}
export default emp_empdim
