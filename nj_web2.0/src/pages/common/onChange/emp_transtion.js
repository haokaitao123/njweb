/**
 * Created by Pluto on 2018/4/22.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_transtion = {
  all_dis() {
    emp_transtion.transDate_set(this)
  },
  transDate_set(t) {
    if (t.valueMap.transDate) {
      if(t.$refs[t.valueMap.transDate][0].formDataSubmit.transDate.length<=0){
        t.$refs[t.valueMap.transDate][0].$set(t.$refs[t.valueMap.transDate][0].formDataSubmit, 'transDate',  new Date().format('yyyy-MM-dd'))
      }
    }
  },

}
export default emp_transtion
