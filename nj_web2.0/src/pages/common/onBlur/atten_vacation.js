const atten_vacation = {
  vacDay(node) {
    atten_vacation.vacDay_set(this.$parent)
  },
  vacDay_set(t) {
    //如没勾选假后补办,开始日期不得小于[当天日期+请假天数]
    if (t.valueMap.vacDay && t.$refs[t.valueMap.vacDay][0].formDataSubmit.vacDay > 0) {
      if (t.$refs[t.valueMap.vacIsreapply][0].formDataSubmit.vacIsreapply === '0') {
        var nowDate = new Date() //当前时间
        var tsday = t.$refs[t.valueMap.vacDay][0].formDataSubmit.vacDay //请假天数
        var dayF = parseFloat(tsday);
        var dayI = parseInt(tsday);
        if (dayF > dayI) {
          dayI = dayI + 1;
        }
        nowDate = nowDate.setDate(nowDate.getDate() + dayI); //当天日期+请假天数
        var edate = new Date(nowDate).format("yyyy-MM-dd");
        // let vacSdt = t.$refs[t.valueMap.vacSdate][0].$refs.vacSdate.thisValue //请假开始日期
        let vacSdt = t.$refs[t.valueMap.vacSdate][0].formDataSubmit.vacSdate
        var sdate = new Date(vacSdt).format("yyyy-MM-dd");
        var veDate = new Date(vacSdt);
        var dayall = dayI - 1;
        veDate = veDate.setDate(veDate.getDate() + dayall); //当天日期+请假天数
        var veDateDis = new Date(veDate).format("yyyy-MM-dd")
        if (sdate < edate) {
          t.$refs[t.valueMap.vacSdate][0].$set(t.$refs[t.valueMap.vacSdate][0].formDataSubmit, 'vacSdate', '');
          t.$refs[t.valueMap.vacSdate][0].$refs.vacSdate.thisValue = "";
          t.$refs[t.valueMap.vacEdate][0].$set(t.$refs[t.valueMap.vacEdate][0].formDataSubmit, 'vacEdate', '');
          t.$refs[t.valueMap.vacEdate][0].$refs.vacEdate.thisValue = "";
          t.$Message.warning("开始日期不得小于当前日期加请假天数");
        } else {
          t.$refs[t.valueMap.vacSdate][0].$set(t.$refs[t.valueMap.vacSdate][0].formDataSubmit, 'vacSdate', new Date(vacSdt).format("yyyy-MM-dd"));
          t.$refs[t.valueMap.vacSdate][0].$refs.vacSdate.thisValue = new Date(vacSdt).format("yyyy-MM-dd")
          t.$refs[t.valueMap.vacEdate][0].$set(t.$refs[t.valueMap.vacEdate][0].formDataSubmit, 'vacEdate', veDateDis);
          t.$refs[t.valueMap.vacEdate][0].$refs.vacEdate.thisValue = veDateDis
        }
      } else if (t.$refs[t.valueMap.vacIsreapply][0].formDataSubmit.vacIsreapply === '1') {
        var tsday = t.$refs[t.valueMap.vacDay][0].formDataSubmit.vacDay //请假天数
        var dayF = parseFloat(tsday);
        var dayI = parseInt(tsday);
        if (dayF > dayI) {
          dayI = dayI + 1;
        }
        let vacSdt = t.$refs[t.valueMap.vacSdate][0].$refs.vacSdate.thisValue //请假开始日期
        var sdate = new Date(vacSdt).format("yyyy-MM-dd")
        var veDate = new Date(vacSdt);
        var dayall = dayI - 1;
        veDate = veDate.setDate(veDate.getDate() + dayall); //当天日期+请假天数
        var veDateDis = new Date(veDate).format("yyyy-MM-dd")
        t.$refs[t.valueMap.vacSdate][0].$set(t.$refs[t.valueMap.vacSdate][0].formDataSubmit, 'vacSdate', new Date(vacSdt).format("yyyy-MM-dd"));
        t.$refs[t.valueMap.vacSdate][0].$refs.vacSdate.thisValue = new Date(vacSdt).format("yyyy-MM-dd")
        t.$refs[t.valueMap.vacEdate][0].$set(t.$refs[t.valueMap.vacEdate][0].formDataSubmit, 'vacEdate', veDateDis)
        t.$refs[t.valueMap.vacEdate][0].$refs.vacEdate.thisValue = veDateDis
      }
    }
  },

}
export default atten_vacation
