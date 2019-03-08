/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_flow_dimission = {
  all_dis() {
    emp_flow_dimission.empdimCompany_dis(this)
    emp_flow_dimission.empdimIsalcompens_dis(this)
    emp_flow_dimission.empdimApplicant_set(this)
  },
  empdimIsalcompens(node) {
    emp_flow_dimission.empdimIsalcompens_set(this.$parent)
    emp_flow_dimission.empdimIsalcompens_dis(this.$parent)
  },
  empdimIsdimcompens(node) {
    emp_flow_dimission.empdimIsdimcompens_set(this.$parent)
    emp_flow_dimission.empdimIsdimcompens_dis(this.$parent)
  },
  // empdimCompany(node) {
  //   // node是子对象，this是父级对象
  //   delete this.formshow.empdimDept
  //   delete this.formshow.empdimCname
  // },
  empdimCompany_dis(t) {
    // alert(t.$store.state.user.name)
    // alert(t.$store.state.user.userId)
    // empdimApplicant
    // t.$refs[t.valueMap.empdimDept][0].$delete(t.$refs[t.valueMap.empdimDept][0].formshow, 'empdimDept')
    // t.$refs[t.valueMap.empdimCname][0].$delete(t.$refs[t.valueMap.empdimCname][0].formshow, 'empdimCname')
  },
  empdimApplicant_set(t) {
      if (t.valueMap.empdimApplicant) {
        t.$refs[t.valueMap.empdimApplicant][0].$set(t.$refs[t.valueMap.empdimApplicant][0].formDataSubmit, 'empdimApplicant',  t.$store.state.user.userId)
        t.$refs[t.valueMap.empdimApplicant][0].$refs.empdimApplicant.thisValue = t.$store.state.user.name
      }
    if (t.valueMap.empdimApplydate) {
      t.$refs[t.valueMap.empdimApplydate][0].$set(t.$refs[t.valueMap.empdimApplydate][0].formDataSubmit, 'empdimApplydate',  new Date().format('yyyy-MM-dd'))
    }
  },
  empdimWorkno(node) {
    const t = this.$parent
    // if (this.$parent.valueMap.empdimWorkno && this.$parent.$refs[this.$parent.valueMap.empdimWorkno][0].formDataSubmit.empdimWorkno !== '') {
      getDataLevelUserLogin({
        _mt: 'empPayrollSalaryBase.getByEmpWorkno',
        empWorkno: this.$parent.$refs[this.$parent.valueMap.empdimWorkno][0].formDataSubmit.empdimWorkno,
      }).then((res) => {
        if (isSuccess(res, this.$parent)) {
          t.$refs[t.valueMap.empdimPostlevel][0].$set(t.$refs[t.valueMap.empdimPostlevel][0].formDataSubmit, 'empdimPostlevel', res.data.content[0].empsalbsPostlevel)
          t.$refs[t.valueMap.empdimSalarylevel][0].$set(t.$refs[t.valueMap.empdimSalarylevel][0].formDataSubmit, 'empdimSalarylevel', res.data.content[0].empsalbsSalarylevel)
          t.$refs[t.valueMap.empdimTravellevel][0].$set(t.$refs[t.valueMap.empdimTravellevel][0].formDataSubmit, 'empdimTravellevel', res.data.content[0].empsalbsTravellevel)
          t.$refs[t.valueMap.empdimAdminlevel][0].$set(t.$refs[t.valueMap.empdimAdminlevel][0].formDataSubmit, 'empdimAdminlevel', res.data.content[0].empsalbsAdminlevel)
        }
      }).catch(() => {
        this.$Modal.error({
          title: '错误',
          content: '网络错误',
        })
      })
    // }
  },
  empdimIsdimcompens_dis(t) {
    if (t.valueMap.empdimIsdimcompens) {
      if (t.$refs[t.valueMap.empdimIsdimcompens][0].formDataSubmit.empdimIsdimcompens === '0') {
        if (t.valueMap.empdimDimamt) {
          t.$refs[t.valueMap.empdimDimamt][0].$delete(t.$refs[t.valueMap.empdimDimamt][0].formshow, 'empdimDimamt')
        }
        if (t.valueMap.empdimDimamttax) {
          t.$refs[t.valueMap.empdimDimamttax][0].$delete(t.$refs[t.valueMap.empdimDimamttax][0].formshow, 'empdimDimamttax')
        }
        if (t.valueMap.empdimDimamtmonth) {
          t.$refs[t.valueMap.empdimDimamtmonth][0].$delete(t.$refs[t.valueMap.empdimDimamtmonth][0].formshow, 'empdimDimamtmonth')
        }
      } else {
        if (t.valueMap.empdimAllegaldays) {
          t.$refs[t.valueMap.empdimDimamt][0].$set(t.$refs[t.valueMap.empdimDimamt][0].formshow, 'empdimDimamt', '')
        }
        if (t.valueMap.empdimDimamttax) {
          t.$refs[t.valueMap.empdimDimamttax][0].$set(t.$refs[t.valueMap.empdimDimamttax][0].formshow, 'empdimDimamttax', '')
        }
        if (t.valueMap.empdimDimamtmonth) {
          t.$refs[t.valueMap.empdimDimamtmonth][0].$set(t.$refs[t.valueMap.empdimDimamtmonth][0].formshow, 'empdimDimamtmonth', '')
        }
      }
    }
  },
  empdimIsdimcompens_set(t) {
    if (t.valueMap.empdimIsdimcompens && t.$refs[t.valueMap.empdimIsdimcompens][0].formDataSubmit.empdimIsdimcompens === '0') {
      if (t.valueMap.empdimDimamt) {
        t.$refs[t.valueMap.empdimDimamt][0].$set(t.$refs[t.valueMap.empdimDimamt][0].formDataSubmit, 'empdimDimamt', '')
        // t.$refs[t.valueMap.empdimAllegaldays][0].$refs.empdimAllegaldays.thisValue = ''
      }
      if (t.valueMap.empdimDimamttax) {
        t.$refs[t.valueMap.empdimDimamttax][0].$set(t.$refs[t.valueMap.empdimDimamttax][0].formDataSubmit, 'empdimDimamttax', '')
      }
      if (t.valueMap.empdimDimamtmonth) {
        t.$refs[t.valueMap.empdimDimamtmonth][0].$set(t.$refs[t.valueMap.empdimDimamtmonth][0].formDataSubmit, 'empdimDimamtmonth', '')
      }
    }
  },
  empdimIsalcompens_dis(t) {
    if (t.valueMap.empdimIsalcompens) {
      if (t.$refs[t.valueMap.empdimIsalcompens][0].formDataSubmit.empdimIsalcompens === '0') {
        if (t.valueMap.empdimAllegaldays) {
          t.$refs[t.valueMap.empdimAllegaldays][0].$delete(t.$refs[t.valueMap.empdimAllegaldays][0].formshow, 'empdimAllegaldays')
        }
        if (t.valueMap.empdimAllegalamt) {
          t.$refs[t.valueMap.empdimAllegalamt][0].$delete(t.$refs[t.valueMap.empdimAllegalamt][0].formshow, 'empdimAllegalamt')
        }
        if (t.valueMap.empdimAlcompdays) {
          t.$refs[t.valueMap.empdimAlcompdays][0].$delete(t.$refs[t.valueMap.empdimAlcompdays][0].formshow, 'empdimAlcompdays')
        }
        if (t.valueMap.empdimAlcompamt) {
          t.$refs[t.valueMap.empdimAlcompamt][0].$delete(t.$refs[t.valueMap.empdimAlcompamt][0].formshow, 'empdimAlcompamt')
        }
        if (t.valueMap.empdimAlmonth) {
          t.$refs[t.valueMap.empdimAlmonth][0].$delete(t.$refs[t.valueMap.empdimAlmonth][0].formshow, 'empdimAlmonth')
        }
      } else {
        if (t.valueMap.empdimAllegaldays) {
          t.$refs[t.valueMap.empdimAllegaldays][0].$set(t.$refs[t.valueMap.empdimAllegaldays][0].formshow, 'empdimAllegaldays', '')
        }
        if (t.valueMap.empdimAllegalamt) {
          t.$refs[t.valueMap.empdimAllegalamt][0].$set(t.$refs[t.valueMap.empdimAllegalamt][0].formshow, 'empdimAllegalamt', '')
        }
        if (t.valueMap.empdimAlcompdays) {
          t.$refs[t.valueMap.empdimAlcompdays][0].$set(t.$refs[t.valueMap.empdimAlcompdays][0].formshow, 'empdimAlcompdays', '')
        }
        if (t.valueMap.empdimAlcompamt) {
          t.$refs[t.valueMap.empdimAlcompamt][0].$set(t.$refs[t.valueMap.empdimAlcompamt][0].formshow, 'empdimAlcompamt', '')
        }
        if (t.valueMap.empdimAlmonth) {
          t.$refs[t.valueMap.empdimAlmonth][0].$set(t.$refs[t.valueMap.empdimAlmonth][0].formshow, 'empdimAlmonth', '')
        }
      }
    }
  },
  empdimIsalcompens_set(t) {
    if (t.valueMap.empdimIsalcompens && t.$refs[t.valueMap.empdimIsalcompens][0].formDataSubmit.empdimIsalcompens === '0') {
      if (t.valueMap.empdimAllegaldays) {
        t.$refs[t.valueMap.empdimAllegaldays][0].$set(t.$refs[t.valueMap.empdimAllegaldays][0].formDataSubmit, 'empdimAllegaldays', '')
        // t.$refs[t.valueMap.empdimAllegaldays][0].$refs.empdimAllegaldays.thisValue = ''
      }
      if (t.valueMap.empdimAllegalamt) {
        t.$refs[t.valueMap.empdimAllegalamt][0].$set(t.$refs[t.valueMap.empdimAllegalamt][0].formDataSubmit, 'empdimAllegalamt', '')
      }
      if (t.valueMap.empdimAlcompdays) {
        t.$refs[t.valueMap.empdimAlcompdays][0].$set(t.$refs[t.valueMap.empdimAlcompdays][0].formDataSubmit, 'empdimAlcompdays', '')
      }
      if (t.valueMap.empdimAlcompamt) {
        t.$refs[t.valueMap.empdimAlcompamt][0].$set(t.$refs[t.valueMap.empdimAlcompamt][0].formDataSubmit, 'empdimAlcompamt', '')
      }
      if (t.valueMap.empdimAlmonth) {
        t.$refs[t.valueMap.empdimAlmonth][0].$set(t.$refs[t.valueMap.empdimAlmonth][0].formDataSubmit, 'empdimAlmonth', '')
      }
    }
  },
}

export default emp_flow_dimission
