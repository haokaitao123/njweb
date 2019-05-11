/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const recruit_process = {
  all_dis() {
    recruit_process.relibApplytype_dis(this)
    recruit_process.relibFirstus_set(this)
    recruit_process.relibIsrelatives_dis(this)
    recruit_process.relibIsguaran_dis(this)
    recruit_process.relibReexamus_set(this)
  },
  relibIdno(node) {
    recruit_process.relibIdno_set(this.$parent)
  },
  relibApplytype(node) {
    recruit_process.relibApplytype_dis(this.$parent)
    recruit_process.relibApplytype_set(this.$parent)
  },
  relibReexamus(node) {
    recruit_process.relibReexamus_set(this)
  },
  relibFirstus(node) {
    recruit_process.relibFirstus_set(this)
  },
  relibIsrelatives(node) {
    recruit_process.relibIsrelatives_dis(this.$parent)
    recruit_process.relibIsrelatives_set(this.$parent)
  },
  relibIsguaran(node) {
    recruit_process.relibIsguaran_dis(this.$parent)
    recruit_process.relibIsguaran_set(this.$parent)
  },
  // 根据身份证号码获取性别 出生日期
  relibIdno_set(t) {
    let idcard
    if (t.valueMap.relibIdno) {
      idcard = t.$refs[t.valueMap.relibIdno][0].formDataSubmit.relibIdno
      if (idcard.length === 18) {
        if (idcard.substr(16, 1) % 2 === 1) {
          t.$refs[t.valueMap.relibGender][0].$set(t.$refs[t.valueMap.relibGender][0].formDataSubmit, 'relibGender', '01male')
        } else {
          t.$refs[t.valueMap.relibGender][0].$set(t.$refs[t.valueMap.relibGender][0].formDataSubmit, 'relibGender', '02female')
        }
        t.$refs[t.valueMap.relibBirtday][0].$set(t.$refs[t.valueMap.relibBirtday][0].formDataSubmit, 'relibBirtday', idcard.substr(6, 4) + '-' + idcard.substr(10, 2) + '-' + idcard.substr(12, 2))
      }
    }
  },
  // 介绍人显示隐藏与设置值
  relibApplytype_set(t) {
    if (t.valueMap.relibApplytype && t.$refs[t.valueMap.relibApplytype][0].formDataSubmit.relibApplytype !== '03introducer') {
      if (t.valueMap.relibIntrname) {
        t.$refs[t.valueMap.relibIntrname][0].$set(t.$refs[t.valueMap.relibIntrname][0].formDataSubmit, 'relibIntrname', '')
      }
    }
  },

  relibApplytype_dis(t) {
    if (t.valueMap.relibApplytype) {
      if (t.$refs[t.valueMap.relibApplytype][0].formDataSubmit.relibApplytype === '03introducer') {
        if (t.valueMap.relibIntrname) {
          t.$refs[t.valueMap.relibIntrname][0].$set(t.$refs[t.valueMap.relibIntrname][0].formshow, 'relibIntrname', '')
        }
      } else {
        if (t.valueMap.relibIntrname) {
          t.$refs[t.valueMap.relibIntrname][0].$delete(t.$refs[t.valueMap.relibIntrname][0].formshow, 'relibIntrname')
        }
      }
    }
  },
  //默认复试人
  relibReexamus_set(t) {
    const th = this.$parent
    if (t.valueMap.relibReexamus) {
      if (t.$refs[t.valueMap.relibReexamus][0].formDataSubmit.relibReexamus.length <= 0 || t.$refs[t.valueMap.relibReexamus][0].formDataSubmit.relibReexamus === '0') {
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.getSysUserinfoByUserId',
          logType: '查询复试者',
          id: t.$store.state.user.userId,
        }).then((res) => {
          if (isSuccess(res, this.$parent)) {
          t.$refs[t.valueMap.relibReexamus][0].$set(t.$refs[t.valueMap.relibReexamus][0].formDataSubmit, 'relibReexamus', res.data.content[0].sysUsempid)
          t.$refs[t.valueMap.relibReexamus][0].$refs.relibReexamus.thisValue = res.data.content[0].sysUsempidDis
        }
      }).catch(() => {
          this.$Modal.error({
          title: '错误',
          content: '网络错误',
        })
      })
      }
    }
    //debugger
    if (t.valueMap.relibReexamtm) {
      if (t.$refs[t.valueMap.relibReexamtm][0].formDataSubmit.relibReexamtm.length <= 0) {
        t.$refs[t.valueMap.relibReexamtm][0].$set(t.$refs[t.valueMap.relibReexamtm][0].formDataSubmit, 'relibReexamtm', new Date().format('yyyy-MM-dd hh:mm:ss'))
      }
    }

  },
  // 默认初始者与初试时间
  relibFirstus_set(t) {
    const th = this.$parent
    if (t.valueMap.relibFirstus) {
      if (t.$refs[t.valueMap.relibFirstus][0].formDataSubmit.relibFirstus.length <= 0 || t.$refs[t.valueMap.relibFirstus][0].formDataSubmit.relibFirstus === '0') {
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.getSysUserinfoByUserId',
          logType: '查询初试者',
          id: t.$store.state.user.userId,
        }).then((res) => {
          if (isSuccess(res, this.$parent)) {
            t.$refs[t.valueMap.relibFirstus][0].$set(t.$refs[t.valueMap.relibFirstus][0].formDataSubmit, 'relibFirstus', res.data.content[0].sysUsempid)
            t.$refs[t.valueMap.relibFirstus][0].$refs.relibFirstus.thisValue = res.data.content[0].sysUsempidDis
          }
        }).catch(() => {
          this.$Modal.error({
            title: '错误',
            content: '网络错误',
          })
        })
      }
    }
    if (t.valueMap.relibFirsttm) {
      if (t.$refs[t.valueMap.relibFirsttm][0].formDataSubmit.relibFirsttm.length <= 0) {
        t.$refs[t.valueMap.relibFirsttm][0].$set(t.$refs[t.valueMap.relibFirsttm][0].formDataSubmit, 'relibFirsttm', new Date().format('yyyy-MM-dd hh:mm:ss'))
      }
    }
  },

  // 是否有亲朋在本公司任职
  relibIsrelatives_set(t) {
    if (t.valueMap.relibIsrelatives && t.$refs[t.valueMap.relibIsrelatives][0].formDataSubmit.relibIsrelatives === '0') {
      if (t.valueMap.relibRelatname) {
        t.$refs[t.valueMap.relibRelatname][0].$set(t.$refs[t.valueMap.relibRelatname][0].formDataSubmit, 'relibRelatname', '')
      }
      if (t.valueMap.relibRelatdept) {
        t.$refs[t.valueMap.relibRelatdept][0].$set(t.$refs[t.valueMap.relibRelatdept][0].formDataSubmit, 'relibRelatdept', '')
      }
    }
  },

  relibIsrelatives_dis(t) {
    if (t.valueMap.relibIsrelatives) {
      if (t.$refs[t.valueMap.relibIsrelatives][0].formDataSubmit.relibIsrelatives === '0') {
        if (t.valueMap.relibRelatname) {
          t.$refs[t.valueMap.relibRelatname][0].$delete(t.$refs[t.valueMap.relibRelatname][0].formshow, 'relibRelatname')
        }
        if (t.valueMap.relibRelatdept) {
          t.$refs[t.valueMap.relibRelatdept][0].$delete(t.$refs[t.valueMap.relibRelatdept][0].formshow, 'relibRelatdept')
        }
      } else {
        if (t.valueMap.relibRelatname) {
          t.$refs[t.valueMap.relibRelatname][0].$set(t.$refs[t.valueMap.relibRelatname][0].formshow, 'relibRelatname', '')
        }
        if (t.valueMap.relibRelatdept) {
          t.$refs[t.valueMap.relibRelatdept][0].$set(t.$refs[t.valueMap.relibRelatdept][0].formshow, 'relibRelatdept', '')
        }
      }
    }
  },
  // 是否担保
  relibIsguaran_set(t) {
    if (t.valueMap.relibIsguaran && t.$refs[t.valueMap.relibIsguaran][0].formDataSubmit.relibIsguaran === '0') {
      if (t.valueMap.relibGuarantee) {
        t.$refs[t.valueMap.relibGuarantee][0].$set(t.$refs[t.valueMap.relibGuarantee][0].formDataSubmit, 'relibGuarantee', '')
        t.$refs[t.valueMap.relibGuarantee][0].$refs.relibGuarantee.thisValue = ''
      }
    }
  },
// 是否担保
  relibIsguaran_dis(t) {
    if (t.valueMap.relibIsguaran) {
      if (t.$refs[t.valueMap.relibIsguaran][0].formDataSubmit.relibIsguaran === '0') {
        if (t.valueMap.relibGuarantee) {
          t.$refs[t.valueMap.relibGuarantee][0].$delete(t.$refs[t.valueMap.relibGuarantee][0].formshow, 'relibGuarantee')
        }
      } else {
        if (t.valueMap.relibGuarantee) {
          t.$refs[t.valueMap.relibGuarantee][0].$set(t.$refs[t.valueMap.relibGuarantee][0].formshow, 'relibGuarantee', '')
        }
      }
    }
  },

}
  export default recruit_process
// export default flow1 612731199608271618
