/**
 * Created by Aaron on 2018/4/19.
 */
const emp_flow_internaltransfer = {
  all_dis() {
    emp_flow_internaltransfer.empintIsmanager_dis(this)
    emp_flow_internaltransfer.empintIschgsalary_dis(this)
    emp_flow_internaltransfer.empintIsconfirm_dis(this)
  },
  empintIsmanager(node) {
    emp_flow_internaltransfer.empintIsmanager_set(this.$parent)
    emp_flow_internaltransfer.empintIsmanager_dis(this.$parent)
  },
  empintIschgsalary(node) {
    emp_flow_internaltransfer.empintIschgsalary_set(this.$parent)
    emp_flow_internaltransfer.empintIschgsalary_dis(this.$parent)
  },
  empintIsconfirm(node) {
    emp_flow_internaltransfer.empintIsconfirm_set(this.$parent)
    emp_flow_internaltransfer.empintIsconfirm_dis(this.$parent)
  },
  empintHirecompany(node) {
    emp_flow_internaltransfer.empintHirecompany_set(this.$parent)
  },
  empintDept(node) {
    emp_flow_internaltransfer.empintDept_set(this.$parent)
  },
  empintNewdept(node) {
    emp_flow_internaltransfer.empintNewdept_set(this.$parent)
  },
  empintNewpost(node) {
    emp_flow_internaltransfer.empintNewpost_set(this.$parent)
  },


  empintIsmanager_set(t) {
    // 是否上级经理清空继任者员工号与继任者姓名
    if (t.valueMap.empintIsmanager && t.$refs[t.valueMap.empintIsmanager][0].formDataSubmit.empintIsmanager === '0') {
      if (t.valueMap.empintPmpnext) {
        t.$refs[t.valueMap.empintPmpnext][0].$set(t.$refs[t.valueMap.empintPmpnext][0].formDataSubmit, 'empintPmpnext', '')
        t.$refs[t.valueMap.empintIsmanager][0].$refs.empintPmpnext.thisValue = ''
      }
      if (t.valueMap.empintPmpnextname) {
        t.$refs[t.valueMap.empintPmpnextname][0].$set(t.$refs[t.valueMap.empintPmpnextname][0].formDataSubmit, 'empintPmpnextname', '')
      }
    }
  },

  empintIsmanager_dis(t) {
    // 是否上级经理显隐继任者员工号与继任者姓名
    if (t.valueMap.empintIsmanager) {
      if (t.$refs[t.valueMap.empintIsmanager][0].formDataSubmit.empintIsmanager === '0') {
        if (t.valueMap.empintPmpnext) {
          t.$refs[t.valueMap.empintPmpnext][0].$delete(t.$refs[t.valueMap.empintPmpnext][0].formshow, 'empintPmpnext')
        }
        if (t.valueMap.empintPmpnextname) {
          t.$refs[t.valueMap.empintPmpnextname][0].$delete(t.$refs[t.valueMap.empintPmpnextname][0].formshow, 'empintPmpnextname')
        }
      } else {
        if (t.valueMap.empintPmpnext) {
          t.$refs[t.valueMap.empintPmpnext][0].$set(t.$refs[t.valueMap.empintPmpnext][0].formshow, 'empintPmpnext', '')
        }
        if (t.valueMap.empintPmpnextname) {
          t.$refs[t.valueMap.empintPmpnextname][0].$set(t.$refs[t.valueMap.empintPmpnextname][0].formshow, 'empintPmpnextname', '')
        }
      }
    }
  },

  empintIschgsalary_set(t) {
    // 是否调整基本工资清空
    if (t.valueMap.empintIschgsalary && t.$refs[t.valueMap.empintIschgsalary][0].formDataSubmit.empintIschgsalary === '0') {
      if (t.valueMap.empintSalbase) {
        t.$refs[t.valueMap.empintSalbase][0].$set(t.$refs[t.valueMap.empintSalbase][0].formDataSubmit, 'empintSalbase', '')
      }
    }
  },

  empintIschgsalary_dis(t) {
    // 是否调整基本工资显示隐藏
    if (t.valueMap.empintIschgsalary) {
      if (t.$refs[t.valueMap.empintIschgsalary][0].formDataSubmit.empintIschgsalary === '0') {
        if (t.valueMap.empintSalbase) {
          t.$refs[t.valueMap.empintSalbase][0].$delete(t.$refs[t.valueMap.empintSalbase][0].formshow, 'empintSalbase')
        }
      } else {
        if (t.valueMap.empintSalbase) {
          t.$refs[t.valueMap.empintSalbase][0].$set(t.$refs[t.valueMap.empintSalbase][0].formshow, 'empintSalbase', '')
        }
      }
    }
  },
  empintIsconfirm_set(t) {
    // 是否同意调动
    if (t.valueMap.empintIsconfirm && t.$refs[t.valueMap.empintIsconfirm][0].formDataSubmit.empintIsconfirm === '1') {
      if (t.valueMap.empintNocmreason) {
        t.$refs[t.valueMap.empintNocmreason][0].$set(t.$refs[t.valueMap.empintNocmreason][0].formDataSubmit, 'empintNocmreason', '')
      }
    }
  },

  empintIsconfirm_dis(t) {
    // 是否同意调动显示隐藏
    if (t.valueMap.empintIsconfirm) {
      if (t.$refs[t.valueMap.empintIsconfirm][0].formDataSubmit.empintIsconfirm === '1' ) {
        if (t.valueMap.empintNocmreason) {
          t.$refs[t.valueMap.empintNocmreason][0].$delete(t.$refs[t.valueMap.empintNocmreason][0].formshow, 'empintNocmreason')
        }
      } else {
        if (t.valueMap.empintNocmreason) {
          t.$refs[t.valueMap.empintNocmreason][0].$set(t.$refs[t.valueMap.empintNocmreason][0].formshow, 'empintNocmreason', '')
        }
      }
    }
  },
  empintHirecompany_set(t) {
    let com
    let comDis
    if (t.valueMap.empintHirecompany) {
      com = t.$refs[t.valueMap.empintHirecompany][0].formDataSubmit.empintHirecompany
      comDis = t.$refs[t.valueMap.empintHirecompany][0].$refs.empintHirecompany.thisValue
    }
    t.$refs[t.valueMap.empintDept][0].$set(t.$refs[t.valueMap.empintDept][0].formDataSubmit, 'empintDept', '')
    t.$refs[t.valueMap.empintDept][0].$refs.empintDept.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empintDept = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empintWorkno][0].$set(t.$refs[t.valueMap.empintWorkno][0].formDataSubmit, 'empintWorkno', '')
    t.$refs[t.valueMap.empintWorkno][0].$refs.empintWorkno.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empintWorkno = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empintOldbuspmp][0].$set(t.$refs[t.valueMap.empintOldbuspmp][0].formDataSubmit, 'empintOldbuspmp', '')
    t.$refs[t.valueMap.empintOldbuspmp][0].$refs.empintOldbuspmp.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empintOldbuspmp = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empintOldhr][0].$set(t.$refs[t.valueMap.empintOldhr][0].formDataSubmit, 'empintOldhr', '')
    t.$refs[t.valueMap.empintOldhr][0].$refs.empintOldhr.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empintOldhr = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empintNewhr][0].$set(t.$refs[t.valueMap.empintNewhr][0].formDataSubmit, 'empintNewhr', '')
    t.$refs[t.valueMap.empintNewhr][0].$refs.empintNewhr.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empintNewhr = ''  //弹出框，清空存放的值
  },
  empintDept_set(t) {
    let com
    let comDis
    if (t.valueMap.empintDept) {
      com = t.$refs[t.valueMap.empintDept][0].formDataSubmit.empintDept
      comDis = t.$refs[t.valueMap.empintDept][0].$refs.empintDept.thisValue
    }
    t.$refs[t.valueMap.empintWorkno][0].$set(t.$refs[t.valueMap.empintWorkno][0].formDataSubmit, 'empintWorkno', '')
    t.$refs[t.valueMap.empintWorkno][0].$refs.empintWorkno.thisValue = ''
  },
  empintNewdept_set(t) {
    let com
    let comDis
    if (t.valueMap.empintNewdept) {
      com = t.$refs[t.valueMap.empintNewdept][0].formDataSubmit.empintNewdept
      comDis = t.$refs[t.valueMap.empintNewdept][0].$refs.empintNewdept.thisValue
    }
    if (com.length <= 0 || comDis.length <= 0) {
      t.$refs[t.valueMap.empintNewpost][0].$set(t.$refs[t.valueMap.empintNewpost][0].formDataSubmit, 'empintNewpost', '')
      t.$refs[t.valueMap.empintNewpost][0].$refs.empintNewpost.thisValue = ''

      t.$refs[t.valueMap.empintNewcostcenter][0].$set(t.$refs[t.valueMap.empintNewcostcenter][0].formDataSubmit, 'empintNewcostcenter', '')
      t.$refs[t.valueMap.empintNewcostcenter][0].$refs.empintNewcostcenter.thisValue = ''

      t.$refs[t.valueMap.empintNewpostlevel][0].$set(t.$refs[t.valueMap.empintNewpostlevel][0].formDataSubmit, 'empintNewpostlevel', '')
      t.$refs[t.valueMap.empintNewsalarylevel][0].$set(t.$refs[t.valueMap.empintNewsalarylevel][0].formDataSubmit, 'empintNewsalarylevel', '')
      t.$refs[t.valueMap.empintNewtravellevel][0].$set(t.$refs[t.valueMap.empintNewtravellevel][0].formDataSubmit, 'empintNewtravellevel', '')
    }
  },
  empintNewpost_set(t) {
    let com
    let comDis
    if (t.valueMap.empintNewpost) {
      com = t.$refs[t.valueMap.empintNewpost][0].formDataSubmit.empintNewpost
      comDis = t.$refs[t.valueMap.empintNewpost][0].$refs.empintNewpost.thisValue
    }
    if (com.length <= 0 || comDis.length <= 0) {
      t.$refs[t.valueMap.empintNewcostcenter][0].$set(t.$refs[t.valueMap.empintNewcostcenter][0].formDataSubmit, 'empintNewcostcenter', '')
      t.$refs[t.valueMap.empintNewcostcenter][0].$refs.empintNewcostcenter.thisValue = ''

      t.$refs[t.valueMap.empintNewpostlevel][0].$set(t.$refs[t.valueMap.empintNewpostlevel][0].formDataSubmit, 'empintNewpostlevel', '')
      t.$refs[t.valueMap.empintNewsalarylevel][0].$set(t.$refs[t.valueMap.empintNewsalarylevel][0].formDataSubmit, 'empintNewsalarylevel', '')
      t.$refs[t.valueMap.empintNewtravellevel][0].$set(t.$refs[t.valueMap.empintNewtravellevel][0].formDataSubmit, 'empintNewtravellevel', '')
    }
  },
}

export default emp_flow_internaltransfer
// export default flow1
