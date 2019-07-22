/**
 * Created by Aaron on 2018/4/19.
 */
import {
  getDataLevelUserLogin
} from '../../../axios/axios'
import {
  isSuccess
} from '../../../lib/util'

const emp_empdim = {
  all_dis() {
    //emp_empdim.dimLevday_dis
    emp_empdim.dimIsreceive_dis(this)
    emp_empdim.empdimApplicant_set(this)
    emp_empdim.dimSalday_set(this)
    // emp_empdim.dimLevsqday_dis(this)
    emp_empdim.dimReason_dis(this)
    emp_empdim.dimType_dis(this)

  },

  dimLevsqday(node) {
    emp_empdim.dimLevsqday_set(this.$parent)
  },
  dimLevday(node) {
    // emp_empdim.dimLevday_set(this.$parent)
    // emp_empdim.dimLevday_dis(this.$parent)
  },
  empId(node) {
    emp_empdim.empId_set(this.$parent)
  },
  dimIsreceive(node) {
    emp_empdim.dimIsreceive_set(this.$parent)
    emp_empdim.dimIsreceive_dis(this.$parent)
  },
  dimReason(node) {
    //  emp_empdim.dimReason_set(this.$parent)
    emp_empdim.dimReason_dis(this.$parent)
  },
  empdimApplicant_set(t) {
    if (t.valueMap.dimApplicant) {
      //alert(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant)
      if (t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant.length <= 0 || t.$refs[t.valueMap.dimApplicant][0].formDataSubmit.dimApplicant === '0') {
        t.$refs[t.valueMap.dimApplicant][0].$set(t.$refs[t.valueMap.dimApplicant][0].formDataSubmit, 'dimApplicant', t.$store.state.user.userId)
        t.$refs[t.valueMap.dimApplicant][0].$refs.dimApplicant.thisValue = t.$store.state.user.name
      }
    }
    if (t.valueMap.dimApplydate) {
      //alert(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit.dimApplydate)
      if (t.$refs[t.valueMap.dimApplydate][0].formDataSubmit.dimApplydate.length <= 0) {
        t.$refs[t.valueMap.dimApplydate][0].$set(t.$refs[t.valueMap.dimApplydate][0].formDataSubmit, 'dimApplydate', new Date().format('yyyy-MM-dd'))
      }
    }
    if (t.valueMap.dimLevsqday) {
      if (t.$refs[t.valueMap.dimLevsqday][0].formDataSubmit.dimLevsqday.length <= 0) {
        t.$refs[t.valueMap.dimLevsqday][0].$set(t.$refs[t.valueMap.dimLevsqday][0].formDataSubmit, 'dimLevsqday', new Date().format('yyyy-MM-dd'))
        t.$refs[t.valueMap.dimLevsqday][0].$refs.dimLevsqday.thisValue = new Date().format('yyyy-MM-dd')
      }
    }
  },

  //工资发放日期：系统默认20号之后的第一个星期三
  /*  dimSalday_set(t) {

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
    },*/

  dimSalday_set(t) {
    if (t.valueMap.dimSalday) {
      //alert(t.$refs[t.valueMap.dimSalday][0].formDataSubmit.dimSalday)
      if (t.$refs[t.valueMap.dimSalday][0].formDataSubmit.dimSalday.length <= 0 && t.$refs[t.valueMap.dimLastsalday][0].formDataSubmit.dimLastsalday.length <= 0) {
        //当月的20号
        let nowDate = new Date()
        //当前月的20号
        let entrydate = new Date(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-20')

        let day1 = nowDate.getDate() //当前
        let day2 = entrydate.getDate() //20号
        let resDate //当前月
        let resLastDate //下个月
        if (day1 < day2) {
          resDate = new Date(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-27')
          resLastDate = new Date(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 2) + '-27')
          t.$refs[t.valueMap.dimSalday][0].$set(t.$refs[t.valueMap.dimSalday][0].formDataSubmit, 'dimSalday', resDate.format('yyyy-MM-dd'))
          t.$refs[t.valueMap.dimSalday][0].$refs.dimSalday.thisValue = resDate.format('yyyy-MM-dd')
        } else {
          //resDate = new Date(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-20')
          t.$refs[t.valueMap.dimSalday][0].$set(t.$refs[t.valueMap.dimSalday][0].formDataSubmit, 'dimSalday', '')
          resLastDate = new Date(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 2) + '-27')
        }
        t.$refs[t.valueMap.dimLastsalday][0].$set(t.$refs[t.valueMap.dimLastsalday][0].formDataSubmit, 'dimLastsalday', resLastDate.format('yyyy-MM-dd'))
        t.$refs[t.valueMap.dimLastsalday][0].$refs.dimLastsalday.thisValue = resLastDate.format('yyyy-MM-dd')
      }
    }
  },
  empId_set(t) {
    if (t.valueMap.dimLevsqday) {
      let time1 = new Date(t.$store.state.autoSearch.row.empnhEntrydate);
      let dimLevsqDate = t.$refs[t.valueMap.dimLevsqday][0].$refs.dimLevsqday.thisValue;
      let time2 = ""
      if (dimLevsqDate !== "") {
        time2 = new Date(dimLevsqDate);
      } else {
        time2 = new Date(dimLevsqDate);
      }

      let diffyear = time2.getFullYear() - time1.getFullYear();
      let diffmonth = diffyear * 12 + time2.getMonth() - time1.getMonth();
      if (diffmonth < 0) {
        emp_empdim.getSevenDayAfter(t, time2)
        return
      }
      let diffDay = time2.getDate() - time1.getDate();

      if (diffmonth < 3 || (diffmonth == 3 && diffDay <= 0)) {

        if (diffmonth == 3 && diffDay == 0) {
          let timeA = time1.getHours() * 3600 + 60 * time1.getMinutes() + time1.getSeconds();
          let timeB = time2.getHours() * 3600 + 60 * time2.getMinutes() + time2.getSeconds();
          if (timeB - timeA < 0) {
            emp_empdim.getSevenDayAfter(t, time2)
            return
          }
        }
        emp_empdim.getSevenDayAfter(t, time2)
        return
      }
      emp_empdim.getOneMonthAfter(t, time2)
      return
    }
  },
  //获取7天后的日期
  getSevenDayAfter(t, date) {
    let day = date.setDate(date.getDate() + 7);
    day = new Date(day).format("yyyy-MM-dd");
    t.$refs[t.valueMap.dimLevday][0].$set(t.$refs[t.valueMap.dimLevday][0].formDataSubmit, 'dimLevday', day);
    t.$refs[t.valueMap.dimLevday][0].$refs.dimLevday.thisValue = day;

  },
  //获取一个月后的日期
  getOneMonthAfter(t, date) {
    let Month = date.setMonth(date.getMonth() + 1);
    Month = new Date(Month).format("yyyy-MM-dd");
    t.$refs[t.valueMap.dimLevday][0].$set(t.$refs[t.valueMap.dimLevday][0].formDataSubmit, 'dimLevday', Month);
    t.$refs[t.valueMap.dimLevday][0].$refs.dimLevday.thisValue = Month;
  },
  //申请离职日期默认
  //   dimLevsqday_dis(t) {
  //     debugger;
  //     console.log(t.$refs[t.valueMap.dimLevsqday][0].formDataSubmit.dimLevsqday, "123")
  //     if (t.valueMap.dimLevsqday && t.$refs[t.valueMap.dimLevsqday][0].formDataSubmit.dimLevsqday === '') {
  //       t.$refs[t.valueMap.dimLevsqday][0].$set(t.$refs[t.valueMap.dimLevsqday][0].formDataSubmit, 'dimLevsqday', new Date().format('yyyy-MM-dd'));
  //       t.$refs[t.valueMap.dimLevsqday][0].$refs.dimLevsqday.thisValue = new Date().format('yyyy-MM-dd')
  //     }
  //   },
  dimLevsqday_set(t) {

    let empnhEntrydate = t.$store.state.autoSearch.row.empnhEntrydate;
    if (t.valueMap.dimLevsqday && empnhEntrydate) {
      let time2 = new Date(t.$refs[t.valueMap.dimLevsqday][0].$refs.dimLevsqday.thisValue);
      let time1 = new Date(t.$store.state.autoSearch.row.empnhEntrydate);
      let diffyear = time2.getFullYear() - time1.getFullYear();
      let diffmonth = diffyear * 12 + time2.getMonth() - time1.getMonth();
      if (diffmonth < 0) {
        emp_empdim.getSevenDayAfter(t, time2)
        return
      }
      let diffDay = time2.getDate() - time1.getDate();

      if (diffmonth < 3 || (diffmonth == 3 && diffDay <= 0)) {

        if (diffmonth == 3 && diffDay == 0) {
          let timeA = time1.getHours() * 3600 + 60 * time1.getMinutes() + time1.getSeconds();
          let timeB = time2.getHours() * 3600 + 60 * time2.getMinutes() + time2.getSeconds();
          if (timeB - timeA < 0) {
            emp_empdim.getSevenDayAfter(t, time2)
            return
          }
        }
        emp_empdim.getSevenDayAfter(t, time2)
        return
      }
      emp_empdim.getOneMonthAfter(t, time2)
      return
    }
  },
  //   //最后工作日：离职日期前一天
  //   dimLevday_set(t) {
  //     let entrydate
  //     if (t.valueMap.dimLevday) {
  //       entrydate = new Date(t.$refs[t.valueMap.dimLevday][0].formDataSubmit.dimLevday)
  //     }
  //     entrydate.setDate(entrydate.getDate() - 1)
  //     t.$refs[t.valueMap.dimLaswkday][0].$set(t.$refs[t.valueMap.dimLaswkday][0].formDataSubmit, 'dimLaswkday', entrydate.getFullYear() + '-' + (entrydate.getMonth() + 1) + '-' + entrydate.getDate())
  //   },
  dimIsreceive_dis(t) {
    if (t.valueMap.dimIsreceive) {
      if (t.$refs[t.valueMap.dimIsreceive][0].formDataSubmit.dimIsreceive === '0') {
        if (t.valueMap.dimReceive) {
          t.$refs[t.valueMap.dimReceive][0].$delete(t.$refs[t.valueMap.dimReceive][0].formshow, 'dimReceive')
          t.$refs[t.valueMap.dimIsreceive][0].$refs.dimReceive.thisValue = ''
        }
      } else {
        if (t.valueMap.dimReceive) {
          console.log(t.$refs[t.valueMap.dimReceive], "123");
          console.log(t.$refs[t.valueMap.dimIsreceive], "123");
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
  //离职原因是其他，显示其他离职原因文本框
  dimReason_dis(t) {
    if (t.valueMap.dimReason) {
      if (t.$refs[t.valueMap.dimReason][0].formDataSubmit.dimReason === '9080') {
        if (t.valueMap.dimReasonother) {
          t.$refs[t.valueMap.dimReasonother][0].$set(t.$refs[t.valueMap.dimReasonother][0].formshow, 'dimReasonother', '')
        }
      } else {
        if (t.valueMap.dimReasonother) {
          t.$refs[t.valueMap.dimReasonother][0].$refs.dimReasonother.thisValue = ''
          t.$refs[t.valueMap.dimReasonother][0].$delete(t.$refs[t.valueMap.dimReasonother][0].formshow, 'dimReasonother')

        }
      }
    }
  },
  dimType_dis(t) {
    if (t.valueMap.dimType) {
      if (t.$refs[t.valueMap.dimType][0].formDataSubmit.dimType === '01voluntary') {
        //if (t.valueMap.dimReceive) {
        t.$refs[t.valueMap.dimAttday][0].$delete(t.$refs[t.valueMap.dimAttday][0].formshow, 'dimAttday')
        t.$refs[t.valueMap.dimActlevday][0].$delete(t.$refs[t.valueMap.dimActlevday][0].formshow, 'dimActlevday')
        t.$refs[t.valueMap.dimLastsalday][0].$delete(t.$refs[t.valueMap.dimLastsalday][0].formshow, 'dimLastsalday')
        // t.$refs[t.valueMap.dimType][0].$refs.dimReceive.thisValue = ''
        //}
      } else {
        if (t.valueMap.dimReceive) t.$refs[t.valueMap.dimReceive][0].$set(t.$refs[t.valueMap.dimReceive][0].formshow, 'dimReceive', '')
        if (t.valueMap.dimActlevday)
          t.$refs[t.valueMap.dimActlevday][0].$set(t.$refs[t.valueMap.dimActlevday][0].formshow, 'dimActlevday', '')
        if (t.valueMap.dimLastsalday)
          t.$refs[t.valueMap.dimLastsalday][0].$set(t.$refs[t.valueMap.dimLastsalday][0].formshow, 'dimLastsalday', '')

        // }
      }
    }
  },

}
export default emp_empdim
