/**
 * Created by Aaron on 2018/4/19.
 */
const emp_flow_newhire = {
  all_dis() {
    emp_flow_newhire.empnhIsformer_dis(this)
    emp_flow_newhire.empnhOccupationhealth_dis(this)
    emp_flow_newhire.empnhAcceptoffer_dis(this)
    emp_flow_newhire.empnhIsentry_dis(this)
    emp_flow_newhire.empnhIsgreen_dis(this)
    emp_flow_newhire.empnhIsexpensecard_dis(this)
    emp_flow_newhire.empnhDataisok_dis(this)
    emp_flow_newhire.empnhTechnicaltitle_dis(this)
  },
  empnhTechnicaltitle(node) {
    emp_flow_newhire.empnhTechnicaltitle_set(this.$parent)
    emp_flow_newhire.empnhTechnicaltitle_dis(this.$parent)
  },
  empnhIsformer(node) {
    emp_flow_newhire.empnhIsformer_set(this.$parent)
    emp_flow_newhire.empnhIsformer_dis(this.$parent)
  },
  empnhOccupationhealth(node) {
    emp_flow_newhire.empnhOccupationhealth_set(this.$parent)
    emp_flow_newhire.empnhOccupationhealth_dis(this.$parent)
  },
  empnhAcceptoffer(node) {
    emp_flow_newhire.empnhAcceptoffer_set(this.$parent)
    emp_flow_newhire.empnhAcceptoffer_dis(this.$parent)
  },
  empnhIsentry(node) {
    emp_flow_newhire.empnhIsentry_set(this.$parent)
    emp_flow_newhire.empnhIsentry_dis(this.$parent)
  },
  empnhIsgreen(node) {
    emp_flow_newhire.empnhIsgreen_set(this.$parent)
    emp_flow_newhire.empnhIsgreen_dis(this.$parent)
  },
  empnhIsexpensecard(node) {
    emp_flow_newhire.empnhIsexpensecard_set(this.$parent)
    emp_flow_newhire.empnhIsexpensecard_dis(this.$parent)
  },
  empnhDataisok(node) {
    emp_flow_newhire.empnhDataisok_set(this.$parent)
    emp_flow_newhire.empnhDataisok_dis(this.$parent)
  },
  empnhConfirmentrydate(node) {
    emp_flow_newhire.empnhConfirmentrydate_set(this.$parent)
  },
  empnhProbation(node) {
    emp_flow_newhire.empnhConfirmentrydate_set(this.$parent)
  },
  empnhContractsdate(node) {
    emp_flow_newhire.empnhContractsdate_set(this.$parent)
  },
  empnhContractperiod(node) {
    emp_flow_newhire.empnhContractsdate_set(this.$parent)
  },
  empnhContracttype(node) {
    emp_flow_newhire.empnhContractsdate_set(this.$parent)
  },
  empnhHirelocation(node) {
    emp_flow_newhire.empnhHirelocation_set(this.$parent)
  },
  empnhWorklocation(node) {
    emp_flow_newhire.empnhWorklocation_set(this.$parent)
  },
  empnhTaxlocation(node) {
    emp_flow_newhire.empnhTaxlocation_set(this.$parent)
  },
  empnhBenefitlocation(node) {
    emp_flow_newhire.empnhBenefitlocation_set(this.$parent)
  },
  empnhHfundlocatio(node) {
    emp_flow_newhire.empnhHfundlocatio_set(this.$parent)
  },
  empnhEntrydate(node) {
    emp_flow_newhire.empnhEntrydate_set(this.$parent)
  },
  empnhIdtype(node) {
    emp_flow_newhire.empnhIdno_set(this.$parent)
  },
  empnhIdno(node) {
    emp_flow_newhire.empnhIdno_set(this.$parent)
  },
  empnhHirecompany(node) {
    emp_flow_newhire.empnhHirecompany_set(this.$parent)
  },
  empnhDept(node) {
    emp_flow_newhire.empnhDept_set(this.$parent)
  },
  empnhPost(node) {
    emp_flow_newhire.empnhPost_set(this.$parent)
  },
  empnhRegisterprovince(node) {
    emp_flow_newhire.empnhRegisterprovince_set(this.$parent)
  },
  empnhResideprovince(node) {
    emp_flow_newhire.empnhResideprovince_set(this.$parent)
  },
  empnhCname(node) {
    emp_flow_newhire.empnhCname_set(this.$parent)
  },
  empnhRegisterprovince_set(t) {
    t.$refs[t.valueMap.empnhRegistercity][0].$set(t.$refs[t.valueMap.empnhRegistercity][0].formDataSubmit, 'empnhRegistercity', '')
    t.$refs[t.valueMap.empnhRegistercity][0].$refs.empnhRegistercity.thisValue = ''
  },
  empnhResideprovince_set(t) {
    t.$refs[t.valueMap.empnhResidecity][0].$set(t.$refs[t.valueMap.empnhResidecity][0].formDataSubmit, 'empnhResidecity', '')
    t.$refs[t.valueMap.empnhResidecity][0].$refs.empnhResidecity.thisValue = ''
  },
  // 清除雇佣公司后，同时清楚已选择的部门及岗位信息
  empnhHirecompany_set(t) {
    let com
    let comDis
    if (t.valueMap.empnhHirecompany) {
      com = t.$refs[t.valueMap.empnhHirecompany][0].formDataSubmit.empnhHirecompany
      comDis = t.$refs[t.valueMap.empnhHirecompany][0].$refs.empnhHirecompany.thisValue
    }
    t.$refs[t.valueMap.empnhDept][0].$set(t.$refs[t.valueMap.empnhDept][0].formDataSubmit, 'empnhDept', '')
    t.$refs[t.valueMap.empnhDept][0].$refs.empnhDept.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhDept = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhPost][0].$set(t.$refs[t.valueMap.empnhPost][0].formDataSubmit, 'empnhPost', '')
    t.$refs[t.valueMap.empnhPost][0].$refs.empnhPost.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhPost = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhCostcenter][0].$set(t.$refs[t.valueMap.empnhCostcenter][0].formDataSubmit, 'empnhCostcenter', '')
    t.$refs[t.valueMap.empnhCostcenter][0].$refs.empnhCostcenter.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhCostcenter = ''

    t.$refs[t.valueMap.empnhBuspmp][0].$set(t.$refs[t.valueMap.empnhBuspmp][0].formDataSubmit, 'empnhBuspmp', '')
    t.$refs[t.valueMap.empnhBuspmp][0].$refs.empnhBuspmp.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhBuspmp = ''

    t.$refs[t.valueMap.empnhFunpmp][0].$set(t.$refs[t.valueMap.empnhFunpmp][0].formDataSubmit, 'empnhFunpmp', '')
    t.$refs[t.valueMap.empnhFunpmp][0].$refs.empnhFunpmp.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhFunpmp = ''

    t.$refs[t.valueMap.empnhRecruiter][0].$set(t.$refs[t.valueMap.empnhRecruiter][0].formDataSubmit, 'empnhRecruiter', '')
    t.$refs[t.valueMap.empnhRecruiter][0].$refs.empnhRecruiter.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhRecruiter = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhHr][0].$set(t.$refs[t.valueMap.empnhHr][0].formDataSubmit, 'empnhHr', '')
    t.$refs[t.valueMap.empnhHr][0].$refs.empnhHr.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhHr = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhDeptsiger][0].$set(t.$refs[t.valueMap.empnhDeptsiger][0].formDataSubmit, 'empnhDeptsiger', '')
    t.$refs[t.valueMap.empnhDeptsiger][0].$refs.empnhDeptsiger.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhDeptsiger = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhCompsiger][0].$set(t.$refs[t.valueMap.empnhCompsiger][0].formDataSubmit, 'empnhCompsiger', '')
    t.$refs[t.valueMap.empnhCompsiger][0].$refs.empnhCompsiger.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhCompsiger = ''  //弹出框，清空存放的值
  },
  // 清除部门，同时清除已选择的岗位及成本中心信息
  empnhDept_set(t) {
    let dept
    let deptDis
    if (t.valueMap.empnhDept) {
      dept = t.$refs[t.valueMap.empnhDept][0].formDataSubmit.empnhDept
      deptDis = t.$refs[t.valueMap.empnhDept][0].$refs.empnhDept.thisValue
    }
    t.$refs[t.valueMap.empnhPost][0].$set(t.$refs[t.valueMap.empnhPost][0].formDataSubmit, 'empnhPost', '')
    t.$refs[t.valueMap.empnhPost][0].$refs.empnhPost.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhPost = ''  //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhCostcenter][0].$set(t.$refs[t.valueMap.empnhCostcenter][0].formDataSubmit, 'empnhCostcenter', '')
    t.$refs[t.valueMap.empnhCostcenter][0].$refs.empnhCostcenter.thisValue = ''
    t.$store.state.flowClmkMap.popForm.empnhCostcenter = ''  //弹出框，清空存放的值
  },
  // 清除岗位后，同时清楚已选择的成本中心
  empnhPost_set(t) {
    let post
    let postDis
    if (t.valueMap.empnhPost) {
      post = t.$refs[t.valueMap.empnhPost][0].formDataSubmit.empnhPost
      postDis = t.$refs[t.valueMap.empnhPost][0].$refs.empnhPost.thisValue
    }
    if (post.length <= 0 || postDis.length <= 0) {  // 级联获取的，需要加判断，不然，级联获取之后，又会清空
      t.$refs[t.valueMap.empnhCostcenter][0].$set(t.$refs[t.valueMap.empnhCostcenter][0].formDataSubmit, 'empnhCostcenter', '')
      t.$refs[t.valueMap.empnhCostcenter][0].$refs.empnhCostcenter.thisValue = ''
      t.$store.state.flowClmkMap.popForm.empnhCostcenter = ''
    }
  },

  empnhIsformer_set(t) {
    // 是否公司前员工隐藏前清空字段值
    if (t.valueMap.empnhIsformer && t.$refs[t.valueMap.empnhIsformer][0].formDataSubmit.empnhIsformer === '0') {
      if (t.valueMap.empnhFormercomp) {
        t.$refs[t.valueMap.empnhFormercomp][0].$set(t.$refs[t.valueMap.empnhFormercomp][0].formDataSubmit, 'empnhFormercomp', '')
        t.$refs[t.valueMap.empnhIsformer][0].$refs.empnhFormercomp.thisValue = ''
      }
      if (t.valueMap.empnhFormerdept) {
        t.$refs[t.valueMap.empnhFormerdept][0].$set(t.$refs[t.valueMap.empnhFormerdept][0].formDataSubmit, 'empnhFormerdept', '')
      }
      if (t.valueMap.empnhFormerpost) {
        t.$refs[t.valueMap.empnhFormerpost][0].$set(t.$refs[t.valueMap.empnhFormerpost][0].formDataSubmit, 'empnhFormerpost', '')
      }
    }
  },

  empnhIsformer_dis(t) {
    // 是否公司前员工显示隐藏
    if (t.valueMap.empnhIsformer) {
      // alert(t.$refs[t.valueMap.empnhIsformer][0].formDataSubmit.empnhIsformer)
      if (t.$refs[t.valueMap.empnhIsformer][0].formDataSubmit.empnhIsformer === '0') {
        if (t.valueMap.empnhFormercomp) {
          t.$refs[t.valueMap.empnhFormercomp][0].$delete(t.$refs[t.valueMap.empnhFormercomp][0].formshow, 'empnhFormercomp')
        }
        if (t.valueMap.empnhFormerdept) {
          t.$refs[t.valueMap.empnhFormerdept][0].$delete(t.$refs[t.valueMap.empnhFormerdept][0].formshow, 'empnhFormerdept')
        }
        if (t.valueMap.empnhFormerpost) {
          t.$refs[t.valueMap.empnhFormerpost][0].$delete(t.$refs[t.valueMap.empnhFormerpost][0].formshow, 'empnhFormerpost')
        }
        if (t.valueMap.empnhIsrehire) {
          t.$refs[t.valueMap.empnhIsrehire][0].$delete(t.$refs[t.valueMap.empnhIsrehire][0].formshow, 'empnhIsrehire')
        }
      } else {
        if (t.valueMap.empnhFormercomp) {
          t.$refs[t.valueMap.empnhFormercomp][0].$set(t.$refs[t.valueMap.empnhFormercomp][0].formshow, 'empnhFormercomp', '')
        }
        if (t.valueMap.empnhFormerdept) {
          t.$refs[t.valueMap.empnhFormerdept][0].$set(t.$refs[t.valueMap.empnhFormerdept][0].formshow, 'empnhFormerdept', '')
        }
        if (t.valueMap.empnhFormerpost) {
          t.$refs[t.valueMap.empnhFormerpost][0].$set(t.$refs[t.valueMap.empnhFormerpost][0].formshow, 'empnhFormerpost', '')
        }
        if (t.valueMap.empnhIsrehire) {
          t.$refs[t.valueMap.empnhIsrehire][0].$set(t.$refs[t.valueMap.empnhIsrehire][0].formshow, 'empnhIsrehire', '')
          t.$refs[t.valueMap.empnhIsrehire][0].$set(t.$refs[t.valueMap.empnhIsrehire][0].formDataSubmit, 'empnhIsrehire', '0')
        }
      }
    }
  },

  empnhOccupationhealth_set(t) {
    // 是否职业健康体检隐藏前清空字段值
    if (t.valueMap.empnhOccupationhealth && t.$refs[t.valueMap.empnhOccupationhealth][0].formDataSubmit.empnhOccupationhealth === '0') {
      if (t.valueMap.empnhOccuphthdesc) {
        t.$refs[t.valueMap.empnhOccuphthdesc][0].$set(t.$refs[t.valueMap.empnhOccuphthdesc][0].formDataSubmit, 'empnhOccuphthdesc', '')
      }
    }
  },
  empnhOccupationhealth_dis(t) {
    // 是否需要职业健康体检
    if (t.valueMap.empnhOccupationhealth) {
      if (t.$refs[t.valueMap.empnhOccupationhealth][0].formDataSubmit.empnhOccupationhealth === '0') {
        if (t.valueMap.empnhOccuphthdesc) {
          t.$refs[t.valueMap.empnhOccuphthdesc][0].$delete(t.$refs[t.valueMap.empnhOccuphthdesc][0].formshow, 'empnhOccuphthdesc')
        }
      } else {
        if (t.valueMap.empnhOccuphthdesc) {
          t.$refs[t.valueMap.empnhOccuphthdesc][0].$set(t.$refs[t.valueMap.empnhOccuphthdesc][0].formshow, 'empnhOccuphthdesc', '')
        }
      }
    }
  },
  // 是否接受Offer
  empnhAcceptoffer_set(t) {
    // 是否职业健康体检隐藏前清空字段值
    if (t.valueMap.empnhAcceptoffer && t.$refs[t.valueMap.empnhAcceptoffer][0].formDataSubmit.empnhAcceptoffer === '1') {
      if (t.valueMap.empnhRejectreason) {
        t.$refs[t.valueMap.empnhRejectreason][0].$set(t.$refs[t.valueMap.empnhRejectreason][0].formDataSubmit, 'empnhRejectreason', '')
      }
    }
  },
  empnhAcceptoffer_dis(t) {
    // 是否需要职业健康体检
    if (t.valueMap.empnhAcceptoffer) {
      if (t.$refs[t.valueMap.empnhAcceptoffer][0].formDataSubmit.empnhAcceptoffer === '1') {
        if (t.valueMap.empnhRejectreason) {
          t.$refs[t.valueMap.empnhRejectreason][0].$delete(t.$refs[t.valueMap.empnhRejectreason][0].formshow, 'empnhRejectreason')
        }
      } else {
        if (t.valueMap.empnhRejectreason) {
          t.$refs[t.valueMap.empnhRejectreason][0].$set(t.$refs[t.valueMap.empnhRejectreason][0].formshow, 'empnhRejectreason', '')
        }
      }
    }
  },
  // 员工是否入职
  empnhIsentry_dis(t) {
    if (t.valueMap.empnhIsentry) {
      if (t.$refs[t.valueMap.empnhIsentry][0].formDataSubmit.empnhIsentry === '1') {
        if (t.valueMap.empnhNoentryreason) { // empnhNoentryreason
          t.$refs[t.valueMap.empnhNoentryreason][0].$delete(t.$refs[t.valueMap.empnhNoentryreason][0].formshow, 'empnhNoentryreason')
        }
      } else {
        if (t.valueMap.empnhNoentryreason) {
          t.$refs[t.valueMap.empnhNoentryreason][0].$set(t.$refs[t.valueMap.empnhNoentryreason][0].formshow, 'empnhNoentryreason', '')
        }
      }
    }
  },
  // 员工是否入职选择否清空未入职原因
  empnhIsentry_set(t) {
    if (t.valueMap.empnhIsentry && t.$refs[t.valueMap.empnhIsentry][0].formDataSubmit.empnhIsentry === '1') {
      if (t.valueMap.empnhNoentryreason) {
        t.$refs[t.valueMap.empnhNoentryreason][0].$set(t.$refs[t.valueMap.empnhNoentryreason][0].formDataSubmit, 'empnhNoentryreason', '')
        t.$refs[t.valueMap.empnhIsentry][0].$refs.empnhNoentryreason.thisValue = ''
      }
    }
  },
  // 是否有绿卡
  empnhIsgreen_dis(t) {
    if (t.valueMap.empnhIsgreen) {
      if (t.$refs[t.valueMap.empnhIsgreen][0].formDataSubmit.empnhIsgreen === '0') {
        if (t.valueMap.empnhGreencardcuntry) {
          t.$refs[t.valueMap.empnhGreencardcuntry][0].$delete(t.$refs[t.valueMap.empnhGreencardcuntry][0].formshow, 'empnhGreencardcuntry')
        }
        if (t.valueMap.empnhGreencardsdate) {
          t.$refs[t.valueMap.empnhGreencardsdate][0].$delete(t.$refs[t.valueMap.empnhGreencardsdate][0].formshow, 'empnhGreencardsdate')
        }
        if (t.valueMap.empnhGreencardedate) {
          t.$refs[t.valueMap.empnhGreencardedate][0].$delete(t.$refs[t.valueMap.empnhGreencardedate][0].formshow, 'empnhGreencardedate')
        }
      } else {
        if (t.valueMap.empnhGreencardcuntry) {
          t.$refs[t.valueMap.empnhGreencardcuntry][0].$set(t.$refs[t.valueMap.empnhGreencardcuntry][0].formshow, 'empnhGreencardcuntry', '')
        }
        if (t.valueMap.empnhGreencardsdate) {
          t.$refs[t.valueMap.empnhGreencardsdate][0].$set(t.$refs[t.valueMap.empnhGreencardsdate][0].formshow, 'empnhGreencardsdate', '')
        }
        if (t.valueMap.empnhGreencardedate) {
          t.$refs[t.valueMap.empnhGreencardedate][0].$set(t.$refs[t.valueMap.empnhGreencardedate][0].formshow, 'empnhGreencardedate', '')
        }
      }
    }
  },

  empnhIsgreen_set(t) {
    if (t.valueMap.empnhIsgreen && t.$refs[t.valueMap.empnhIsgreen][0].formDataSubmit.empnhIsgreen === '0') {
      if (t.valueMap.empnhGreencardcuntry) {
        t.$refs[t.valueMap.empnhGreencardcuntry][0].$set(t.$refs[t.valueMap.empnhGreencardcuntry][0].formDataSubmit, 'empnhGreencardcuntry', '')
        t.$refs[t.valueMap.empnhIsgreen][0].$refs.empnhGreencardcuntry.thisValue = ''
      }
      if (t.valueMap.empnhGreencardsdate) {
        t.$refs[t.valueMap.empnhGreencardsdate][0].$set(t.$refs[t.valueMap.empnhGreencardsdate][0].formDataSubmit, 'empnhGreencardsdate', '')
      }
      if (t.valueMap.empnhGreencardedate) {
        t.$refs[t.valueMap.empnhGreencardedate][0].$set(t.$refs[t.valueMap.empnhGreencardedate][0].formDataSubmit, 'empnhGreencardedate', '')
      }
    }
  },
  // 报销是否令卡发放
  empnhIsexpensecard_dis(t) {
    if (t.valueMap.empnhIsexpensecard) {
      if (t.$refs[t.valueMap.empnhIsexpensecard][0].formDataSubmit.empnhIsexpensecard === '0') {
        if (t.valueMap.empnhExpensebank) {
          t.$refs[t.valueMap.empnhExpensebank][0].$delete(t.$refs[t.valueMap.empnhExpensebank][0].formshow, 'empnhExpensebank')
        }
        if (t.valueMap.empnhExpenseaccount) {
          t.$refs[t.valueMap.empnhExpenseaccount][0].$delete(t.$refs[t.valueMap.empnhExpenseaccount][0].formshow, 'empnhExpenseaccount')
        }
        if (t.valueMap.empnhExpenseaccname) {
          t.$refs[t.valueMap.empnhExpenseaccname][0].$delete(t.$refs[t.valueMap.empnhExpenseaccname][0].formshow, 'empnhExpenseaccname')
        }
      } else {
        if (t.valueMap.empnhExpensebank) {
          t.$refs[t.valueMap.empnhExpensebank][0].$set(t.$refs[t.valueMap.empnhExpensebank][0].formshow, 'empnhExpensebank', '')
        }
        if (t.valueMap.empnhExpenseaccount) {
          t.$refs[t.valueMap.empnhExpenseaccount][0].$set(t.$refs[t.valueMap.empnhExpenseaccount][0].formshow, 'empnhExpenseaccount', '')
        }
        if (t.valueMap.empnhExpenseaccname) {
          t.$refs[t.valueMap.empnhExpenseaccname][0].$set(t.$refs[t.valueMap.empnhExpenseaccname][0].formshow, 'empnhExpenseaccname', '')
        }
      }
    }
  },
  empnhIsexpensecard_set(t) {
    if (t.valueMap.empnhIsexpensecard && t.$refs[t.valueMap.empnhIsexpensecard][0].formDataSubmit.empnhIsexpensecard === '0') {
      if (t.valueMap.empnhExpensebank) {
        t.$refs[t.valueMap.empnhExpensebank][0].$set(t.$refs[t.valueMap.empnhExpensebank][0].formDataSubmit, 'empnhExpensebank', '')
        t.$refs[t.valueMap.empnhIsexpensecard][0].$refs.empnhExpensebank.thisValue = ''
      }
      if (t.valueMap.empnhExpenseaccount) {
        t.$refs[t.valueMap.empnhExpenseaccount][0].$set(t.$refs[t.valueMap.empnhExpenseaccount][0].formDataSubmit, 'empnhExpenseaccount', '')
      }
      if (t.valueMap.empnhExpenseaccname) {
        t.$refs[t.valueMap.empnhExpenseaccname][0].$set(t.$refs[t.valueMap.empnhExpenseaccname][0].formDataSubmit, 'empnhExpenseaccname', '')
      }
    }
  },
  empnhTechnicaltitle_set(t) {
    if (t.$refs[t.valueMap.empnhTechnicaltitle][0].formDataSubmit.empnhTechnicaltitle === '04other') {
      if (t.valueMap.empnhTechspec) {
        t.$refs[t.valueMap.empnhTechspec][0].$set(t.$refs[t.valueMap.empnhTechspec][0].formDataSubmit, 'empnhTechspec', '')
      }
      if (t.valueMap.empnhTechdate) {
        t.$refs[t.valueMap.empnhTechdate][0].$set(t.$refs[t.valueMap.empnhTechdate][0].formDataSubmit, 'empnhTechdate', '')
      }
    }
  },
  empnhTechnicaltitle_dis(t) {
    if (t.valueMap.empnhTechnicaltitle) {
      if (t.$refs[t.valueMap.empnhTechnicaltitle][0].formDataSubmit.empnhTechnicaltitle === '04other') {
        if (t.valueMap.empnhTechspec) {
          t.$refs[t.valueMap.empnhTechspec][0].$delete(t.$refs[t.valueMap.empnhTechspec][0].formshow, 'empnhTechspec')
        }
        if (t.valueMap.empnhTechdate) {
          t.$refs[t.valueMap.empnhTechdate][0].$delete(t.$refs[t.valueMap.empnhTechdate][0].formshow, 'empnhTechdate')
        }
      } else {
        if (t.valueMap.empnhTechspec) {
          t.$refs[t.valueMap.empnhTechspec][0].$set(t.$refs[t.valueMap.empnhTechspec][0].formshow, 'empnhTechspec', '')
        }
        if (t.valueMap.empnhTechdate) {
          t.$refs[t.valueMap.empnhTechdate][0].$set(t.$refs[t.valueMap.empnhTechdate][0].formshow, 'empnhTechdate', '')
        }
      }
    }
  },
  empnhTechnicaltitle__set(t) {
    if (t.valueMap.empnhTechnicaltitle && t.$refs[t.valueMap.empnhTechnicaltitle][0].formDataSubmit.empnhTechnicaltitle === '04other') {
      if (t.valueMap.empnhTechspec) {
        t.$refs[t.valueMap.empnhTechspec][0].$set(t.$refs[t.valueMap.empnhTechspec][0].formDataSubmit, 'empnhTechspec', '')
      }
      if (t.valueMap.empnhTechdate) {
        t.$refs[t.valueMap.empnhTechdate][0].$set(t.$refs[t.valueMap.empnhTechdate][0].formDataSubmit, 'empnhTechdate', '')
      }
    }
  },
  // 员工资料是否符合公司要求
  empnhDataisok_dis(t) {
    if (t.valueMap.empnhDataisok) {
      if (t.$refs[t.valueMap.empnhDataisok][0].formDataSubmit.empnhDataisok === '0') {
        if (t.valueMap.empnhDataexpdesc) {
          t.$refs[t.valueMap.empnhDataexpdesc][0].$set(t.$refs[t.valueMap.empnhDataexpdesc][0].formshow, 'empnhDataexpdesc', '')
        }
      } else {
        if (t.valueMap.empnhDataexpdesc) {
          t.$refs[t.valueMap.empnhDataexpdesc][0].$delete(t.$refs[t.valueMap.empnhDataexpdesc][0].formshow, 'empnhDataexpdesc')
        }
      }
    }
  },
  empnhDataisok_set(t) {
    if (t.valueMap.empnhDataisok && t.$refs[t.valueMap.empnhDataisok][0].formDataSubmit.empnhDataisok === '0') {
      if (t.valueMap.empnhDataexpdesc) {
        t.$refs[t.valueMap.empnhDataexpdesc][0].$set(t.$refs[t.valueMap.empnhDataexpdesc][0].formDataSubmit, 'empnhDataexpdesc', '')
      }
    }
  },
  // 计算试用期到期日
  empnhConfirmentrydate_set(t) {
    let entrydate
    if (t.valueMap.empnhEntrydate) {
      entrydate = new Date(t.$refs[t.valueMap.empnhEntrydate][0].formDataSubmit.empnhEntrydate)
    }
    let proPeriod
    if (t.valueMap.empnhProbation) {
      proPeriod = t.$refs[t.valueMap.empnhProbation][0].formDataSubmit.empnhProbation
    }
    entrydate.setMonth(entrydate.getMonth() + Number(proPeriod))
    entrydate.setDate(entrydate.getDate() - 1)
    t.$refs[t.valueMap.empnhProbationdate][0].$set(t.$refs[t.valueMap.empnhProbationdate][0].formDataSubmit, 'empnhProbationdate', entrydate.getFullYear() + '-' + (entrydate.getMonth() + 1) + '-' + entrydate.getDate())
  },
  empnhContractsdate_set(t) {
    if (t.$refs[t.valueMap.empnhContracttype][0].formDataSubmit.empnhContracttype === '01fixedperiod') {
      let consdate
      if (t.valueMap.empnhContractsdate) {
        consdate = new Date(t.$refs[t.valueMap.empnhContractsdate][0].formDataSubmit.empnhContractsdate)
      }
      let conperiod
      if (t.valueMap.empnhContractperiod) {
        conperiod = t.$refs[t.valueMap.empnhContractperiod][0].formDataSubmit.empnhContractperiod
      }
      if (conperiod === '0.5') {
        consdate.setMonth(consdate.getMonth() + 6)
        consdate.setDate(consdate.getDate() - 1)
        t.$refs[t.valueMap.empnhContractedate][0].$set(t.$refs[t.valueMap.empnhContractedate][0].formDataSubmit, 'empnhContractedate', consdate.getFullYear() + '-' + (consdate.getMonth() + 1) + '-' + consdate.getDate())
      }
      if (conperiod !== '0.5' && conperiod !== '99') {
        let conperiodnum = Number(conperiod)
        consdate.setFullYear(consdate.getFullYear() + conperiodnum)
        consdate.setDate(consdate.getDate() - 1)
        t.$refs[t.valueMap.empnhContractedate][0].$set(t.$refs[t.valueMap.empnhContractedate][0].formDataSubmit, 'empnhContractedate', consdate.getFullYear() + '-' + (consdate.getMonth() + 1) + '-' + consdate.getDate())
      }
    } else {
      t.$refs[t.valueMap.empnhContractedate][0].$set(t.$refs[t.valueMap.empnhContractedate][0].formDataSubmit, 'empnhContractedate', '9999-12-31')
    }
  },
  // 雇佣地点 选取后同步更新其他地点
  empnhHirelocation_set(t) {
    let location
    let locationDis
    if (t.valueMap.empnhHirelocation) {
      location = t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation
      locationDis = t.$refs[t.valueMap.empnhHirelocation][0].$refs.empnhHirelocation.thisValue
    }
    if (t.valueMap.empnhWorklocation && !t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation) {
      t.$refs[t.valueMap.empnhWorklocation][0].$set(t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit, 'empnhWorklocation', location)
      t.$refs[t.valueMap.empnhWorklocation][0].$refs.empnhWorklocation.thisValue = locationDis
    }
    if (t.valueMap.empnhTaxlocation && !t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation) {
      t.$refs[t.valueMap.empnhTaxlocation][0].$set(t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit, 'empnhTaxlocation', location)
      t.$refs[t.valueMap.empnhTaxlocation][0].$refs.empnhTaxlocation.thisValue = locationDis
    }
    if (t.valueMap.empnhBenefitlocation && !t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit.empnhBenefitlocation) {
      t.$refs[t.valueMap.empnhBenefitlocation][0].$set(t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit, 'empnhBenefitlocation', location)
      t.$refs[t.valueMap.empnhBenefitlocation][0].$refs.empnhBenefitlocation.thisValue = locationDis
    }
    if (t.valueMap.empnhHfundlocatio && !t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio) {
      t.$refs[t.valueMap.empnhHfundlocatio][0].$set(t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit, 'empnhHfundlocatio', location)
      t.$refs[t.valueMap.empnhHfundlocatio][0].$refs.empnhHfundlocatio.thisValue = locationDis
    }
  },
  // 工作地点 选取后同步更新其他地点
  empnhWorklocation_set(t) {
    let location
    let locationDis
    if (t.valueMap.empnhWorklocation) {
      location = t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation
      locationDis = t.$refs[t.valueMap.empnhWorklocation][0].$refs.empnhWorklocation.thisValue
    }
    if (t.valueMap.empnhHirelocation && !t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation) {
      t.$refs[t.valueMap.empnhHirelocation][0].$set(t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit, 'empnhHirelocation', location)
      t.$refs[t.valueMap.empnhHirelocation][0].$refs.empnhHirelocation.thisValue = locationDis
    }
    if (t.valueMap.empnhTaxlocation && !t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation) {
      t.$refs[t.valueMap.empnhTaxlocation][0].$set(t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit, 'empnhTaxlocation', location)
      t.$refs[t.valueMap.empnhTaxlocation][0].$refs.empnhTaxlocation.thisValue = locationDis
    }
    if (t.valueMap.empnhBenefitlocation && !t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit.empnhBenefitlocation) {
      t.$refs[t.valueMap.empnhBenefitlocation][0].$set(t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit, 'empnhBenefitlocation', location)
      t.$refs[t.valueMap.empnhBenefitlocation][0].$refs.empnhBenefitlocation.thisValue = locationDis
    }
    if (t.valueMap.empnhHfundlocatio && !t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio) {
      t.$refs[t.valueMap.empnhHfundlocatio][0].$set(t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit, 'empnhHfundlocatio', location)
      t.$refs[t.valueMap.empnhHfundlocatio][0].$refs.empnhHfundlocatio.thisValue = locationDis
    }
  },
  // 个税缴纳地地点 选取后同步更新其他地点
  empnhTaxlocation_set(t) {
    let location
    let locationDis
    if (t.valueMap.empnhTaxlocation) {
      location = t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation
      locationDis = t.$refs[t.valueMap.empnhTaxlocation][0].$refs.empnhTaxlocation.thisValue
    }
    if (t.valueMap.empnhHirelocation && !t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation) {
      t.$refs[t.valueMap.empnhHirelocation][0].$set(t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit, 'empnhWorklocation', location)
      t.$refs[t.valueMap.empnhHirelocation][0].$refs.empnhHirelocation.thisValue = locationDis
    }
    if (t.valueMap.empnhWorklocation && !t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation) {
      t.$refs[t.valueMap.empnhWorklocation][0].$set(t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit, 'empnhWorklocation', location)
      t.$refs[t.valueMap.empnhWorklocation][0].$refs.empnhWorklocation.thisValue = locationDis
    }
    if (t.valueMap.empnhBenefitlocation && !t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit.empnhBenefitlocation) {
      t.$refs[t.valueMap.empnhBenefitlocation][0].$set(t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit, 'empnhBenefitlocation', location)
      t.$refs[t.valueMap.empnhBenefitlocation][0].$refs.empnhBenefitlocation.thisValue = locationDis
    }
    if (t.valueMap.empnhHfundlocatio && !t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio) {
      t.$refs[t.valueMap.empnhHfundlocatio][0].$set(t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit, 'empnhHfundlocatio', location)
      t.$refs[t.valueMap.empnhHfundlocatio][0].$refs.empnhHfundlocatio.thisValue = locationDis
    }
  },
  // 社保缴纳地 选取后同步更新其他地点
  empnhBenefitlocation_set(t) {
    let location
    let locationDis
    if (t.valueMap.empnhBenefitlocation) {
      location = t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit.empnhBenefitlocation
      locationDis = t.$refs[t.valueMap.empnhBenefitlocation][0].$refs.empnhBenefitlocation.thisValue
    }
    if (t.valueMap.empnhHirelocation && !t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation) {
      t.$refs[t.valueMap.empnhHirelocation][0].$set(t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit, 'empnhWorklocation', location)
      t.$refs[t.valueMap.empnhHirelocation][0].$refs.empnhHirelocation.thisValue = locationDis
    }
    if (t.valueMap.empnhWorklocation && !t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation) {
      t.$refs[t.valueMap.empnhWorklocation][0].$set(t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit, 'empnhWorklocation', location)
      t.$refs[t.valueMap.empnhWorklocation][0].$refs.empnhWorklocation.thisValue = locationDis
    }
    if (t.valueMap.empnhTaxlocation && !t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation) {
      t.$refs[t.valueMap.empnhTaxlocation][0].$set(t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit, 'empnhTaxlocation', location)
      t.$refs[t.valueMap.empnhTaxlocation][0].$refs.empnhTaxlocation.thisValue = locationDis
    }
    if (t.valueMap.empnhHfundlocatio && !t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio) {
      t.$refs[t.valueMap.empnhHfundlocatio][0].$set(t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit, 'empnhHfundlocatio', location)
      t.$refs[t.valueMap.empnhHfundlocatio][0].$refs.empnhHfundlocatio.thisValue = locationDis
    }
  },
  // 公积金缴纳地 选取后同步更新其他地点
  empnhHfundlocatio_set(t) {
    let location
    let locationDis
    if (t.valueMap.empnhHfundlocatio) {
      location = t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio
      locationDis = t.$refs[t.valueMap.empnhHfundlocatio][0].$refs.empnhHfundlocatio.thisValue
    }
    if (t.valueMap.empnhHirelocation && !t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation) {
      t.$refs[t.valueMap.empnhHirelocation][0].$set(t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit, 'empnhWorklocation', location)
      t.$refs[t.valueMap.empnhHirelocation][0].$refs.empnhHirelocation.thisValue = locationDis
    }
    if (t.valueMap.empnhWorklocation && !t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation) {
      t.$refs[t.valueMap.empnhWorklocation][0].$set(t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit, 'empnhWorklocation', location)
      t.$refs[t.valueMap.empnhWorklocation][0].$refs.empnhWorklocation.thisValue = locationDis
    }
    if (t.valueMap.empnhTaxlocation && !t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation) {
      t.$refs[t.valueMap.empnhTaxlocation][0].$set(t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit, 'empnhTaxlocation', location)
      t.$refs[t.valueMap.empnhTaxlocation][0].$refs.empnhTaxlocation.thisValue = locationDis
    }
    if (t.valueMap.empnhBenefitlocation && !t.$refs[t.valueMap.empnhHfunempnhBenefitlocationdlocatio][0].formDataSubmit.empnhBenefitlocation) {
      t.$refs[t.valueMap.empnhBenefitlocation][0].$set(t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit, 'empnhBenefitlocation', location)
      t.$refs[t.valueMap.empnhBenefitlocation][0].$refs.empnhBenefitlocation.thisValue = locationDis
    }
  },
  // 计算试用期到期日
  empnhEntrydate_set(t) {
    let entrydate
    if (t.valueMap.empnhEntrydate) {
      entrydate = t.$refs[t.valueMap.empnhEntrydate][0].formDataSubmit.empnhEntrydate
    }
    if (t.valueMap.empnhContractsdate) {
      t.$refs[t.valueMap.empnhContractsdate][0].$set(t.$refs[t.valueMap.empnhContractsdate][0].formDataSubmit, 'empnhContractsdate', entrydate)
    }
    if (t.valueMap.empnhServicedate) {
      t.$refs[t.valueMap.empnhServicedate][0].$set(t.$refs[t.valueMap.empnhServicedate][0].formDataSubmit, 'empnhServicedate', entrydate)
    }
    if (t.valueMap.empnhCertificatedate) {
      t.$refs[t.valueMap.empnhCertificatedate][0].$set(t.$refs[t.valueMap.empnhCertificatedate][0].formDataSubmit, 'empnhCertificatedate', entrydate)
    }
    if (t.valueMap.empnhConfirmentrydate) {
      t.$refs[t.valueMap.empnhConfirmentrydate][0].$set(t.$refs[t.valueMap.empnhConfirmentrydate][0].formDataSubmit, 'empnhConfirmentrydate', entrydate)
    }
  },
  // 根据身份证号码获取性别
  empnhIdno_set(t) {
    let idcard
    if (t.$refs[t.valueMap.empnhIdtype][0].formDataSubmit.empnhIdtype === '01id') {
      if (t.valueMap.empnhIdno) {
        idcard = t.$refs[t.valueMap.empnhIdno][0].formDataSubmit.empnhIdno
        if (idcard.length === 18) {
          if (idcard.substr(16, 1) % 2 === 1) {
            t.$refs[t.valueMap.empnhGender][0].$set(t.$refs[t.valueMap.empnhGender][0].formDataSubmit, 'empnhGender', '01male')
          } else {
            t.$refs[t.valueMap.empnhGender][0].$set(t.$refs[t.valueMap.empnhGender][0].formDataSubmit, 'empnhGender', '02female')
          }
        }
      }
    }
  },
  // 根据中文名获取last name; first name
  empnhCname_set(t) {
    let cname
    if (t.valueMap.empnhCname) {
      cname = t.$refs[t.valueMap.empnhCname][0].formDataSubmit.empnhCname
    }
    if (cname.length <= 0) {
      t.$refs[t.valueMap.empnhLastname][0].$set(t.$refs[t.valueMap.empnhLastname][0].formDataSubmit, 'empnhLastname', '')
      t.$refs[t.valueMap.empnhFirstname][0].$set(t.$refs[t.valueMap.empnhFirstname][0].formDataSubmit, 'empnhFirstname', '')
    } else {
      getDataLevelUserLogin({
        _mt: 'basePubTools.getPinYinByName',
        name: cname,
      }).then((res) => {
        if (isSuccess(res, this.$parent)) {
          const data = JSON.parse(res.data.content[0].value)
          t.$refs[t.valueMap.empnhLastname][0].$set(t.$refs[t.valueMap.empnhLastname][0].formDataSubmit, 'empnhLastname', data.Lname)
          t.$refs[t.valueMap.empnhFirstname][0].$set(t.$refs[t.valueMap.empnhFirstname][0].formDataSubmit, 'empnhFirstname', data.Fname)
        }
      }).catch(() => {
        this.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    }
  },
}

export default emp_flow_newhire
// export default flow1
