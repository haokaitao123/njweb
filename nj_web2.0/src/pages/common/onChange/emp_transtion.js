/**
 * Created by Pluto on 2018/4/22.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_transtion = {
  all_dis() {
    emp_transtion.transDate_set(this)
    emp_transtion.transPostinfo_dis(this)
    emp_transtion.postIdnew_dis(this)
  },
  transPostinfo(node) {
    emp_transtion.transPostinfo_set(this.$parent)
    emp_transtion.transPostinfo_dis(this.$parent)
  },
  postIdnew(node) {
    emp_transtion.postIdnew_dis(this.$parent)
  },
  transDate_set(t) {
    if (t.valueMap.transDate) {
      if(t.$refs[t.valueMap.transDate][0].formDataSubmit.transDate.length<=0){
        t.$refs[t.valueMap.transDate][0].$set(t.$refs[t.valueMap.transDate][0].formDataSubmit, 'transDate',  new Date().format('yyyy-MM-dd'))
      }
    }
  },

  transPostinfo_dis(t) {
    if (t.valueMap.transPostinfo) {
      if (t.$refs[t.valueMap.transPostinfo][0].formDataSubmit.transPostinfo === '0') {
        if (t.valueMap.transMan) {
          t.$refs[t.valueMap.transMan][0].$delete(t.$refs[t.valueMap.transMan][0].formshow, 'transMan')
        }
        if (t.valueMap.fileKey) {
          t.$refs[t.valueMap.fileKey][0].$delete(t.$refs[t.valueMap.fileKey][0].formshow, 'fileKey')
        }
        if (t.valueMap.transHandok) {
          t.$refs[t.valueMap.transHandok][0].$delete(t.$refs[t.valueMap.transHandok][0].formshow, 'transHandok')
        }
      } else {
        if (t.valueMap.transMan) {
          t.$refs[t.valueMap.transMan][0].$set(t.$refs[t.valueMap.transMan][0].formshow, 'transMan', '')
          t.$refs[t.valueMap.fileKey][0].$set(t.$refs[t.valueMap.fileKey][0].formshow, 'fileKey', '')
          t.$refs[t.valueMap.transHandok][0].$set(t.$refs[t.valueMap.transHandok][0].formshow, 'transHandok', '')
          t.$refs[t.valueMap.transPostinfo][0].$refs.transMan.thisValue = ''
          t.$refs[t.valueMap.transPostinfo][0].$refs.fileKey.thisValue = ''
          t.$refs[t.valueMap.transPostinfo][0].$refs.transHandok.thisValue = ''
        }
      }
    }
  },

  transPostinfo_set(t) {
   if (t.valueMap.transPostinfo && t.$refs[t.valueMap.transPostinfo][0].formDataSubmit.transPostinfo === '0') {
      if (t.valueMap.transMan) {
        t.$refs[t.valueMap.transMan][0].$set(t.$refs[t.valueMap.transMan][0].formDataSubmit, 'transMan', '')
      }
     if (t.valueMap.fileKey) {
       t.$refs[t.valueMap.fileKey][0].$set(t.$refs[t.valueMap.fileKey][0].formDataSubmit, 'fileKey', '')
     }
     if (t.valueMap.transHandok) {
       t.$refs[t.valueMap.transHandok][0].$set(t.$refs[t.valueMap.transHandok][0].formDataSubmit, 'transHandok', '')
     }
    }
  },

  // 根据现岗位判断是否显示押金金额字段


/*
  postIdnew_dis(t) {
      postId = t.$refs[t.valueMap.postIdnew][0].formDataSubmit.postIdnew
      getDataLevelUserLogin({
        _mt: 'orgPost.getById',
        id: postId,
      }).then((res) => {
        if (isSuccess(res, this.$parent)) {
        const data = JSON.parse(res.data.content[0].value)
        if(data)
        t.$refs[t.valueMap.empnhLastname][0].$set(t.$refs[t.valueMap.empnhLastname][0].formDataSubmit, 'empnhLastname', data.Lname)
      }
    }).catch(() => {
        this.$Modal.error({
        title: this.$t('reminder.err'),
        content: this.$t('reminder.errormessage'),
      })
    })
  },
*/



}
export default emp_transtion
