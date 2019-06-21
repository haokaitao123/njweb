/**
 * Created by Aaron on 2019/6/18.
 */
const atten_vacation = {
  all_dis(){

  },
  vacSdate(node) {
    atten_vacation.vacSdate_set(this.$parent)
  },
  vacSdate_set(t) {
    //如没勾选假后补办,开始日期不得小于[当天日期+请假天数]
    if (t.valueMap.vacSdate) {
      if (t.$refs[t.valueMap.vacIsreapply][0].formDataSubmit.vacIsreapply === '0' && t.$refs[t.valueMap.vacDay][0].formDataSubmit.vacDay) {
        var nowDate = new Date() //当前时间
        var tsday=t.$refs[t.valueMap.vacDay][0].formDataSubmit.vacDay//请假天数

        var dayF = parseFloat(tsday);
        var dayI = parseInt(tsday);
        if(dayF>dayI){
          dayI=dayI+1;
        }

        nowDate = nowDate.setDate(nowDate.getDate()+dayI); //当天日期+请假天数
        var edate =new Date(nowDate).format("yyyy-MM-dd")


        let vacSdt = t.$refs[t.valueMap.vacSdate][0].formDataSubmit.vacSdate //请假开始日期
        var sdate =new Date(vacSdt).format("yyyy-MM-dd")

        var veDate = new Date(vacSdt);
        var dayall=dayI-1;
        veDate=veDate.setDate(veDate.getDate()+dayall); //当天日期+请假天数
        var veDateDis =new Date(veDate).format("yyyy-MM-dd")

        if(sdate<edate){
          t.$refs[t.valueMap.vacSdate][0].$set(t.$refs[t.valueMap.vacSdate][0].formDataSubmit, 'vacSdate', null)
          t.$refs[t.valueMap.vacEdate][0].$set(t.$refs[t.valueMap.vacEdate][0].formDataSubmit, 'vacEdate', null)
        }else{
          t.$refs[t.valueMap.vacSdate][0].$set(t.$refs[t.valueMap.vacSdate][0].formDataSubmit, 'vacSdate', vacSdt)
          t.$refs[t.valueMap.vacEdate][0].$set(t.$refs[t.valueMap.vacEdate][0].formDataSubmit, 'vacEdate', veDateDis)
        }
       }else if (t.$refs[t.valueMap.vacIsreapply][0].formDataSubmit.vacIsreapply === '1' && t.$refs[t.valueMap.vacDay][0].formDataSubmit.vacDay) {
          var tsday=t.$refs[t.valueMap.vacDay][0].formDataSubmit.vacDay//请假天数

          var dayF = parseFloat(tsday);
          var dayI = parseInt(tsday);
          if(dayF>dayI){
            dayI=dayI+1;
          }
          let vacSdt = t.$refs[t.valueMap.vacSdate][0].formDataSubmit.vacSdate //请假开始日期
          var sdate =new Date(vacSdt).format("yyyy-MM-dd")

          var veDate = new Date(vacSdt);
          var dayall=dayI-1;
          veDate=veDate.setDate(veDate.getDate()+dayall); //当天日期+请假天数
          var veDateDis =new Date(veDate).format("yyyy-MM-dd")

          t.$refs[t.valueMap.vacSdate][0].$set(t.$refs[t.valueMap.vacSdate][0].formDataSubmit, 'vacSdate', vacSdt)
          t.$refs[t.valueMap.vacEdate][0].$set(t.$refs[t.valueMap.vacEdate][0].formDataSubmit, 'vacEdate', veDateDis)
      }
    }
  },
}
export default atten_vacation
