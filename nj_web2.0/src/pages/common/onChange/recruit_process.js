/**
 * Created by Aaron on 2018/4/19.
 */
import {
  getDataLevelUserLogin
} from '../../../axios/axios'
import {
  isSuccess
} from '../../../lib/util'
import valid from '@/lib/pub_valid'
import city from '@/lib/cityData'
const recruit_process = {
  all_dis() {
    recruit_process.relibApplytype_dis(this)
    recruit_process.relibFirstus_set(this)
    recruit_process.relibIsrelatives_dis(this)
    recruit_process.relibIsguaran_dis(this)
    recruit_process.relibReexamus_set(this)
    // recruit_process.relibReexampass_set(this)
    recruit_process.relibGuarantee_set(this);
    recruit_process.relibTrysqus_set(this);
    recruit_process.relibTrypsus_set(this);
    recruit_process.relibApplypost_set(this);
    recruit_process.relibTrysqtime_set(this);
    recruit_process.relibApproval_set(this);
		recruit_process.relibAppsqus_set(this);
  },
  relibScore(node) {
    recruit_process.relibScore_set(this.$parent)
  },
  relibApplytype(node) {
    recruit_process.relibApplytype_dis(this.$parent)
    recruit_process.relibApplytype_set(this.$parent)
  },
  // relibReexamus(node) {
  //   recruit_process.relibReexamus_set(this)
  // },
  // relibFirstus(node) {
  //   recruit_process.relibFirstus_set(this)
  // },
  relibIsrelatives(node) {
    recruit_process.relibIsrelatives_dis(this.$parent)
    recruit_process.relibIsrelatives_set(this.$parent)
  },
  relibIsguaran(node) {
    recruit_process.relibIsguaran_dis(this.$parent)
    recruit_process.relibIsguaran_set(this.$parent)
  },

  //入职岗位默认应聘岗位的值
  relibApplypost_set(t) {
    let post
    if (t.valueMap.relibHirepost) {
      post = t.$refs[t.valueMap.relibApplypost][0].formDataSubmit.relibApplypost;
      console.log(t.$refs[t.valueMap.relibHirepost][0], " t.$refs[t.valueMap.relibApplypost][0]")
      console.log(123, post);
      console.log(t.$refs[t.valueMap.relibHirepost][0].formData1.columns[0].clmDisValue)
      t.$refs[t.valueMap.relibHirepost][0].$set(t.$refs[t.valueMap.relibHirepost][0].formDataSubmit, 'relibHirepost', post)
      t.$refs[t.valueMap.relibHirepost][0].$refs.relibHirepost.thisValue = t.$refs[t.valueMap.relibApplypost][0].formData1.columns[0].clmDisValue
    }
  },


  //根据分数判断是否通过考试
  relibScore_set(t) {
    let score
    if (t.valueMap.relibScore) {
      score = t.$refs[t.valueMap.relibScore][0].formDataSubmit.relibScore
      if (score >= 80) {
        t.$refs[t.valueMap.relibExamina][0].$set(t.$refs[t.valueMap.relibExamina][0].formDataSubmit, 'relibExamina', '1')
        t.$refs[t.valueMap.relibExamina][0].$refs.relibExamina.thisValue = '1'
      } else {
        t.$refs[t.valueMap.relibExamina][0].$set(t.$refs[t.valueMap.relibExamina][0].formDataSubmit, 'relibExamina', '0')
        t.$refs[t.valueMap.relibExamina][0].$refs.relibExamina.thisValue = '0'
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
  //默认试岗申请时间为当前时间
  relibTrysqtime_set(t) {
		
    if (t.valueMap.relibTrysqtime && t.$refs[t.valueMap.relibTrysqtime][0].formDataSubmit.relibTrysqtime === '') {
		
      let nowDate = new Date()
      t.$refs[t.valueMap.relibTrysqtime][0].$set(t.$refs[t.valueMap.relibTrysqtime][0].formDataSubmit, 'relibTrysqtime', nowDate.format('yyyy-MM-dd'))
			t.$refs[t.valueMap.relibTrysqtime][0].$refs.relibTrysqtime.thisValue = nowDate.format('yyyy-MM-dd');

    }
  },
  //试岗必须3天后再入职,试岗申请时间与可入职当前时间
  relibApproval_set(t) {
    if (t.valueMap.relibTrypspass) {
      let nowDate = new Date() //可入职当前时间
      nowDate = new Date(nowDate).getTime(); //可入职当前时间时间戳
      let day1 = t.$refs[t.valueMap.relibTrysqtime][0].formDataSubmit.relibTrysqtime //试岗申请时间
      day1 = new Date(day1).getTime()
      let day2 = 3 * 24 * 60 * 60 * 1000
      if (t.valueMap.relibTrysqtime) {
        if ((nowDate - day1) > day2) { //可入职时间-试岗申请时间大于3，不可入职
          t.$refs[t.valueMap.relibTrypspass][0].$set(t.$refs[t.valueMap.relibTrypspass][0].formDataSubmit, 'relibTrypspass', '1');
          t.$store.commit('recruitProcess/setEntry', 'true');
          t.$refs[t.valueMap.relibTrypspass][0].$refs.relibTrypspass.thisValue = '1'
        } else {
          t.$refs[t.valueMap.relibTrypspass][0].$set(t.$refs[t.valueMap.relibTrypspass][0].formDataSubmit, 'relibTrypspass', '0');
          t.$store.commit('recruitProcess/setEntry', 'false')
          t.$refs[t.valueMap.relibTrypspass][0].$refs.relibTrypspass.thisValue = '0'
        }
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
  //筛选是否通过  与复试意见相同
  relibReexampass_set(t) {
    if (t.valueMap.relibReexampass && t.valueMap.relibScreeyn) {
      if (t.$refs[t.valueMap.relibReexampass][0].formDataSubmit.relibReexampass === '0') {
        t.$refs[t.valueMap.relibScreeyn][0].$set(t.$refs[t.valueMap.relibScreeyn][0].formDataSubmit, 'relibScreeyn', '0');
        t.$refs[t.valueMap.relibScreeyn][0].$refs.relibScreeyn.thisValue = 0;
      } else if (t.$refs[t.valueMap.relibReexampass][0].formDataSubmit.relibReexampass === '1') {
        t.$refs[t.valueMap.relibScreeyn][0].$set(t.$refs[t.valueMap.relibScreeyn][0].formDataSubmit, 'relibScreeyn', '1');
        t.$refs[t.valueMap.relibScreeyn][0].$refs.relibScreeyn.thisValue = 1;
      }
    }
  },
  //默认担保人
  relibGuarantee_set(t) {
    const th = this.$parent
    if (t.valueMap.relibGuarantee) {
      if (t.$refs[t.valueMap.relibGuarantee][0].formDataSubmit.relibGuarantee === '' || t.$refs[t.valueMap.relibGuarantee][0].formDataSubmit.relibGuarantee === '0') {
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.getSysUserinfoByUserId',
          logType: '查询担保人',
          id: t.$store.state.user.userId,
        }).then((res) => {
          if (isSuccess(res, this.$parent)) {
            t.$refs[t.valueMap.relibGuarantee][0].$set(t.$refs[t.valueMap.relibGuarantee][0].formDataSubmit, 'relibGuarantee', res.data.content[0].sysUsempid)
            t.$refs[t.valueMap.relibGuarantee][0].$refs.relibGuarantee.thisValue = res.data.content[0].sysUsempidDis
          }
        }).catch(() => {
          t.$Message.error('网络错误')
        })
      }
    }
  },
  //试岗申请人
  relibTrysqus_set(t) {
    const th = this.$parent
    if (t.valueMap.relibTrysqus) {
      if (t.$refs[t.valueMap.relibTrysqus][0].formDataSubmit.relibTrysqus === '' || t.$refs[t.valueMap.relibTrysqus][0].formDataSubmit.relibTrysqus === '0') {
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.getSysUserinfoByUserId',
          logType: '查询试岗申请人',
          id: t.$store.state.user.userId,
        }).then((res) => {
          if (isSuccess(res, this.$parent)) {
            t.$refs[t.valueMap.relibTrysqus][0].$set(t.$refs[t.valueMap.relibTrysqus][0].formDataSubmit, 'relibTrysqus', res.data.content[0].sysUsempid)
            t.$refs[t.valueMap.relibTrysqus][0].$refs.relibTrysqus.thisValue = res.data.content[0].sysUsempidDis
          }
        }).catch(() => {
          t.$Message.error('网络错误')
        })
      }
    }
  },
  //试岗审批人
  relibTrypsus_set(t) {
    const th = this.$parent
    if (t.valueMap.relibTrypsus) {
      if (t.$refs[t.valueMap.relibTrypsus][0].formDataSubmit.relibTrypsus === '' || t.$refs[t.valueMap.relibTrypsus][0].formDataSubmit.relibTrypsus === '0') {
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.getSysUserinfoByUserId',
          logType: '查询试岗审批人',
          id: t.$store.state.user.userId,
        }).then((res) => {
          if (isSuccess(res, this.$parent)) {
						
            t.$refs[t.valueMap.relibTrypsus][0].$set(t.$refs[t.valueMap.relibTrypsus][0].formDataSubmit, 'relibTrypsus', res.data.content[0].sysUsempid)
            t.$refs[t.valueMap.relibTrypsus][0].$refs.relibTrypsus.thisValue = res.data.content[0].sysUsempidDis
          }
        }).catch(() => {
					console.log('123',res.data.content[0].sysUsempid)
          t.$Message.error('网络错误')
        })
      }
    }
  },
	//初始的审批人，默认是当前用户
	relibAppsqus_set(t){
		 const th = this.$parent
		 	console.log('123677',t.valueMap.relibAppsqus)
		if (t.valueMap.relibAppsqus) {
		  if (t.$refs[t.valueMap.relibAppsqus][0].formDataSubmit.relibAppsqus === '' ) {
				 t.$refs[t.valueMap.relibAppsqus][0].$set(t.$refs[t.valueMap.relibAppsqus][0].formDataSubmit, 'relibAppsqus',t.$store.state.user.userId)
				 t.$refs[t.valueMap.relibAppsqus][0].$refs.relibAppsqus.thisValue = t.$store.state.user.name
		  }
		}
	},
  //默认复试人
  relibReexamus_set(t) {
    const th = this.$parent
    if (t.valueMap.relibReexamus) {
      if (t.$refs[t.valueMap.relibReexamus][0].formDataSubmit.relibReexamus === '' || t.$refs[t.valueMap.relibReexamus][0].formDataSubmit.relibReexamus === '0') {
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
    if (t.valueMap.relibReexamtm) {
      if (t.$refs[t.valueMap.relibReexamtm][0].formDataSubmit.relibReexamtm === '') {
        t.$refs[t.valueMap.relibReexamtm][0].$set(t.$refs[t.valueMap.relibReexamtm][0].formDataSubmit, 'relibReexamtm', new Date().format('yyyy-MM-dd hh:mm:ss'))
      }
    }

  },
  // 默认初始者与初试时间
  relibFirstus_set(t) {
    const th = this.$parent
    if (t.valueMap.relibFirstus) {
      if (t.$refs[t.valueMap.relibFirstus][0].formDataSubmit.relibFirstus === '' || t.$refs[t.valueMap.relibFirstus][0].formDataSubmit.relibFirstus === '0') {
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
      if (t.$refs[t.valueMap.relibFirsttm][0].formDataSubmit.relibFirsttm === '') {
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
