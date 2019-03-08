/**
 * Created by jack on 2018/5/5.
 */
const emp_flow_contract = {
  all_dis() {
    emp_flow_contract.empconIsextension_dis(this)
    emp_flow_contract.empconHrsysupdate_dis(this)
    emp_flow_contract.empconIsextendofbusines_dis(this)
  },
  empconIsextension(node) {
    emp_flow_contract.empconIsextension_set(this.$parent)
    emp_flow_contract.empconIsextension_dis(this.$parent)
  },
  empconIsextendofbusines(node) {
    emp_flow_contract.empconIsextendofbusines_set(this.$parent)
    emp_flow_contract.empconIsextendofbusines_dis(this.$parent)
  },
  empconHrsysupdate(node) {
    emp_flow_contract.empconHrsysupdate_set(this.$parent)
    emp_flow_contract.empconHrsysupdate_dis(this.$parent)
  },
  empconIsextension_set(t) {
    // 是否续签合同，清空合同信息
    if (t.valueMap.empconIsextension && t.$refs[t.valueMap.empconIsextension][0].formDataSubmit.empconIsextension === '0') {
      if (t.valueMap.empconContracttype) {
        t.$refs[t.valueMap.empconContracttype][0].$set(t.$refs[t.valueMap.empconContracttype][0].formDataSubmit, 'empconContracttype', '')
      }
      if (t.valueMap.empconContractperiod) {
        t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].formDataSubmit, 'empconContractperiod', '')
      }
      if (t.valueMap.empconContractsdate) {
        t.$refs[t.valueMap.empconContractsdate][0].$set(t.$refs[t.valueMap.empconContractsdate][0].formDataSubmit, 'empconContractsdate', '')
      }
      if (t.valueMap.empconContractedate) {
        t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formDataSubmit, 'empconContractedate', '')
      }
      if (t.valueMap.empconConfidential) {
        t.$refs[t.valueMap.empconConfidential][0].$set(t.$refs[t.valueMap.empconConfidential][0].formDataSubmit, 'empconConfidential', '')
      }
      if (t.valueMap.empconContractworktime) {
        t.$refs[t.valueMap.empconContractworktime][0].$set(t.$refs[t.valueMap.empconContractworktime][0].formDataSubmit, 'empconContractworktime', '')
      }
    }
  },

  empconIsextension_dis(t) {
    // 是否续签合同，显示隐藏合同信息
    if (t.valueMap.empconIsextension) {
      if (t.$refs[t.valueMap.empconIsextension][0].formDataSubmit.empconIsextension === '0') {
        if (t.valueMap.empconContracttype) {
          t.$refs[t.valueMap.empconContracttype][0].$delete(t.$refs[t.valueMap.empconContracttype][0].formshow, 'empconContracttype')
        }
        if (t.valueMap.empconContractperiod) {
          t.$refs[t.valueMap.empconContractperiod][0].$delete(t.$refs[t.valueMap.empconContractperiod][0].formshow, 'empconContractperiod')
        }
        if (t.valueMap.empconContractsdate) {
          t.$refs[t.valueMap.empconContractsdate][0].$delete(t.$refs[t.valueMap.empconContractsdate][0].formshow, 'empconContractsdate')
        }
        if (t.valueMap.empconContractedate) {
          t.$refs[t.valueMap.empconContractedate][0].$delete(t.$refs[t.valueMap.empconContractedate][0].formshow, 'empconContractedate')
        }
        if (t.valueMap.empconConfidential) {
          t.$refs[t.valueMap.empconConfidential][0].$delete(t.$refs[t.valueMap.empconConfidential][0].formshow, 'empconConfidential')
        }
        if (t.valueMap.empconContractworktime) {
          t.$refs[t.valueMap.empconContractworktime][0].$delete(t.$refs[t.valueMap.empconContractworktime][0].formshow, 'empconContractworktime')
        }
      } else {
        if (t.valueMap.empconContracttype) {
          t.$refs[t.valueMap.empconContracttype][0].$set(t.$refs[t.valueMap.empconContracttype][0].formshow, 'empconContracttype', '')
        }
        if (t.valueMap.empconContractperiod) {
          t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].formshow, 'empconContractperiod', '')
        }
        if (t.valueMap.empconContractsdate) {
          t.$refs[t.valueMap.empconContractsdate][0].$set(t.$refs[t.valueMap.empconContractsdate][0].formshow, 'empconContractsdate', '')
        }
        if (t.valueMap.empconContractedate) {
          t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formshow, 'empconContractedate', '')
        }
        if (t.valueMap.empconConfidential) {
          t.$refs[t.valueMap.empconConfidential][0].$set(t.$refs[t.valueMap.empconConfidential][0].formshow, 'empconConfidential', '')
        }
        if (t.valueMap.empconContractworktime) {
          t.$refs[t.valueMap.empconContractworktime][0].$set(t.$refs[t.valueMap.empconContractworktime][0].formshow, 'empconContractworktime', '')
        }
      }
    }
  },
  //
  empconIsextendofbusines_set(t) {
    // 上级经理觉得是否续签员工合同, 清空信息
    if (t.valueMap.empconIsextendofbusines && t.$refs[t.valueMap.empconIsextendofbusines][0].formDataSubmit.empconIsextendofbusines === '0') {
      if (t.valueMap.empconRenewsugg) {
        t.$refs[t.valueMap.empconRenewsugg][0].$set(t.$refs[t.valueMap.empconRenewsugg][0].formDataSubmit, 'empconContracttype', '')
      }
    } else {
      if (t.valueMap.empconNorereason) {
        t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formDataSubmit, 'empconNorereason', '')
      }
    }
  },
  empconIsextendofbusines_dis(t) {
    // 上级经理觉得是否续签员工合同, 显示隐藏
    if (t.valueMap.empconIsextendofbusines) {
      if (t.$refs[t.valueMap.empconIsextendofbusines][0].formDataSubmit.empconIsextendofbusines === '0') {
        if (t.valueMap.empconRenewsugg) {
          t.$refs[t.valueMap.empconRenewsugg][0].$delete(t.$refs[t.valueMap.empconRenewsugg][0].formshow, 'empconRenewsugg')
        }
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason', '')
        }
      } else {
        if (t.valueMap.empconRenewsugg) {
          t.$refs[t.valueMap.empconRenewsugg][0].$set(t.$refs[t.valueMap.empconRenewsugg][0].formshow, 'empconRenewsugg')
        }
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$delete(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason', '')
        }
      }
    }
  },
  empconHrsysupdate_set(t) {
    // HR系统是否更新
    if (t.valueMap.empconHrsysupdate && t.$refs[t.valueMap.empconHrsysupdate][0].formDataSubmit.empconHrsysupdate === '0') {
      if (t.valueMap.empconHrsysfinishdate) {
        t.$refs[t.valueMap.empconHrsysfinishdate][0].$set(t.$refs[t.valueMap.empconHrsysfinishdate][0].formDataSubmit, 'empconHrsysfinishdate', '')
      }
    }
  },
  empconHrsysupdate_dis(t) {
    // HR系统是否更新
    if (t.valueMap.empconHrsysupdate) {
      if (t.$refs[t.valueMap.empconHrsysupdate][0].formDataSubmit.empconHrsysupdate === '0') {
        if (t.valueMap.empconHrsysfinishdate) {
          t.$refs[t.valueMap.empconHrsysfinishdate][0].$delete(t.$refs[t.valueMap.empconHrsysfinishdate][0].formshow, 'empconHrsysfinishdate')
        }
      } else {
        if (t.valueMap.empconHrsysfinishdate) {
          t.$refs[t.valueMap.empconHrsysfinishdate][0].$set(t.$refs[t.valueMap.empconHrsysfinishdate][0].formshow, 'empconHrsysfinishdate', '')
        }
      }
    }
  },
}
export default emp_flow_contract
