/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_empdim = {
  all_dis() {
    emp_empdim.empdimApplicant_set(this)
  },
  dimLevday(node) {
    emp_empdim.dimLevday_set(this.$parent)
    emp_empdim.dimLevday_dis(this.$parent)
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

  dimLevday_set(t) {
      let entrydate
      if (t.valueMap.dimLevday) {
        entrydate = new Date(t.$refs[t.valueMap.dimLevday][0].formDataSubmit.dimLevday)
      }
      entrydate.setDate(entrydate.getDate() - 1)
      t.$refs[t.valueMap.dimLaswkday][0].$set(t.$refs[t.valueMap.dimLaswkday][0].formDataSubmit, 'dimLaswkday',entrydate.getFullYear() + '-' + (entrydate.getMonth() + 1) + '-' + entrydate.getDate())
    },

}
export default emp_empdim
