/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_empdim = {
  all_dis() {emp_empdim.dimLevday_dis
    emp_empdim.dimIsreceive_dis(this)
    emp_empdim.empdimApplicant_set(this)
    emp_empdim.dimSalday_set(this)
  },
  dimLevday(node) {
    emp_empdim.dimLevday_set(this.$parent)
   // emp_empdim.dimLevday_dis(this.$parent)
  },
  dimIsreceive(node) {
    emp_empdim.dimIsreceive_set(this.$parent)
    emp_empdim.dimIsreceive_dis(this.$parent)
  },
  empdimApplicant_set(t) {
      if (t.valueMap.dimApplicant) {
        //alert(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant)
        if(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant.length<=0 || t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant === '0'){
          t.$refs[t.valueMap.dimApplicant][0].$set(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit, 'dimApplicant',  t.$store.state.user.userId)
          t.$refs[t.valueMap.dimApplicant][0].$refs.dimApplicant.thisValue = t.$store.state.user.name
        }
      }
    if (t.valueMap.dimApplydate) {
      //alert(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit.dimApplydate)
      if(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit.dimApplydate.length<=0){
        t.$refs[t.valueMap.dimApplydate][0].$set(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit, 'dimApplydate',  new Date().format('yyyy-MM-dd'))
      }
    }
  },

//工资发放日期：系统默认20号之后的第一个星期三
  dimSalday_set(t) {

    if (t.valueMap.dimSalday) {
      //alert(t.$refs[t.valueMap.dimSalday][0].formDataSubmit.dimSalday)
      //debugger
      if(t.$refs[t.valueMap.dimSalday][0].formDataSubmit.dimSalday.length<=0){
        //当月的20号
        let nowDate = new Date()
        //当前月的20号
        let entrydate = new Date(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-20')
        let flag = true
        while(flag){
          entrydate.setDate(entrydate.getDate() + 1)//当前日期加1天
          let week = entrydate.getDay();//当前星期的第几天
          if(week === 3){//星期三
            flag = false
          }
        }
        let day1 = nowDate.getDate()//当前
        let day2 = entrydate.getDate()//20号之后的第一个星期三
        let resDate
        if(day1<day2){
          resDate = entrydate
        }else {
          //下个月的20号
          let date1 = new Date(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 2) + '-20')
          let flag1 = true
          while(flag1){
            date1.setDate(date1.getDate() + 1)//当前日期加1天
            let week = date1.getDay();//当前星期的第几天
            if(week === 3){//星期三
              flag1 = false
            }
          }
          resDate = date1
        }
        t.$refs[t.valueMap.dimSalday][0].$set(t.$refs[t.valueMap.dimSalday][0].formDataSubmit, 'dimSalday',  resDate.format('yyyy-MM-dd'))
      }
    }
  },
//最后工作日：离职日期前一天
  dimLevday_set(t) {
      let entrydate
      if (t.valueMap.dimLevday) {
        entrydate = new Date(t.$refs[t.valueMap.dimLevday][0].formDataSubmit.dimLevday)
      }
      entrydate.setDate(entrydate.getDate() - 1)
      t.$refs[t.valueMap.dimLaswkday][0].$set(t.$refs[t.valueMap.dimLaswkday][0].formDataSubmit, 'dimLaswkday',entrydate.getFullYear() + '-' + (entrydate.getMonth() + 1) + '-' + entrydate.getDate())
    },


  dimIsreceive_dis(t) {
    if (t.valueMap.dimIsreceive) {
      if (t.$refs[t.valueMap.dimIsreceive][0].formDataSubmit.dimIsreceive === '0') {
        if (t.valueMap.dimReceive) {
          t.$refs[t.valueMap.dimReceive][0].$delete(t.$refs[t.valueMap.dimReceive][0].formshow, 'dimReceive')
          t.$refs[t.valueMap.dimIsreceive][0].$refs.dimReceive.thisValue = ''
        }
      } else {
        if (t.valueMap.dimReceive) {
          console.log(t.$refs[t.valueMap.dimReceive],"123");
          console.log(t.$refs[t.valueMap.dimIsreceive],"123");
          t.$refs[t.valueMap.dimReceive][0].$set(t.$refs[t.valueMap.dimReceive][0].formshow, 'dimReceive', '')

        }
      }
    }
  },

  dimIsreceive_set(t) {
    //清空
    if (t.valueMap.dimIsreceive && t.$refs[t.valueMap.dimIsreceive][0].formDataSubmit.dimIsreceive === '0') {
      if (t.valueMap.dimReceive) {
          t.$refs[t.valueMap.dimReceive][0].$set(t.$refs[t.valueMap.dimReceive][0].formDataSubmit, 'dimReceive', '')
      }
    }
  },

}
export default emp_empdim
