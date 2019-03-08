/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const archives_borrow = {

  all_dis() {
    archives_borrow.borBorrower_set(this)
  },
  borBorrower_set(t) {
      if (t.valueMap.borBorrower) {
        t.$refs[t.valueMap.borBorrower][0].$set(t.$refs[t.valueMap.borBorrower][0].formDataSubmit, 'borBorrower',  t.$store.state.user.userId)
        t.$refs[t.valueMap.borBorrower][0].$refs.borBorrower.thisValue = t.$store.state.user.name
      }
  },
}

export default archives_borrow
