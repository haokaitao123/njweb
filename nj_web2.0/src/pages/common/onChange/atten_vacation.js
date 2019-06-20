/**
 * Created by Aaron on 2019/6/18.
 */
const atten_vacation = {
  vacSdate(node) {
    atten_vacation.vacSdate_set(this.$parent)
  },
  vacSdate_set(t) {
    //如没勾选假后补办,开始日期不得小于[当天日期+请假天数]
    if (t.valueMap.vacSdate) {
      if (t.$refs[t.valueMap.vacIsreapply][0].formDataSubmit.vacIsreapply === '0') {
        let nowDate = new Date() //当前时间

        let sdate = t.$refs[t.valueMap.vacSdate][0].formDataSubmit.vacSdate //请假开始日期
        //let nowFt =new Date(sdate).format("yyyy-mm-dd")
        let tsday=t.$refs[t.valueMap.vacDay][0].formDataSubmit.vacDay//请假天数
        nowDate = new Date(nowDate).setDate(new Date(nowDate).getDate()+tsday); //可入职当前时间时间戳
        let edate =new Date(nowDate).format("yyyy-mm-dd")

        alert(edate);
        //if (sdate<edate) {

       // }
       }
    }
  },
}
export default atten_vacation
