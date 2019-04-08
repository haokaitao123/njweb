/**
 * Created by Aaron on 2018/4/19.
 */
import emp_flow_dimission from './flow_dimission'
import emp_flow_newhire from './flow_newhire'
import emp_flow_internaltransfer from './flow_internaltransfer'
import emp_flow_contract from  './flow_contract'
import visa_abroad from  './visa_abroad'
import visa_passport from './visa_passport'
import visa_return from './visa_return'
import emp_empdim from './emp_empdim.js'

export const onChange = {
  emp_flow_dimission: emp_flow_dimission,
  emp_flow_newhire: emp_flow_newhire,
  emp_flow_internaltransfer: emp_flow_internaltransfer,
  emp_flow_contract: emp_flow_contract,
  visa_abroad: visa_abroad,
  visa_passport: visa_passport,
  visa_return: visa_return,
  emp_empdim: emp_empdim,
}

