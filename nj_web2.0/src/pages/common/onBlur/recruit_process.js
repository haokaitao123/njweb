import valid from '@/lib/pub_valid'
import city from '@/lib/cityData'
const recruit_process = {
  relibIdno(node) {
    recruit_process.relibIdno_set(this.$parent)
  },
  // 根据身份证号码获取性别 出生日期 籍贯
  relibIdno_set(t) {
    let idcard
    if (t.valueMap.relibIdno) {
      idcard = t.$refs[t.valueMap.relibIdno][0].formDataSubmit.relibIdno
      console.log(idcard, "idcard")
      if (valid.val_identity(idcard)) {
        if (idcard.substr(16, 1) % 2 === 1) {
          t.$refs[t.valueMap.relibGender][0].$set(t.$refs[t.valueMap.relibGender][0].formDataSubmit, 'relibGender', '01male')
        } else {
          t.$refs[t.valueMap.relibGender][0].$set(t.$refs[t.valueMap.relibGender][0].formDataSubmit, 'relibGender', '02female')
        }
        t.$refs[t.valueMap.relibBirtday][0].$set(t.$refs[t.valueMap.relibBirtday][0].formDataSubmit, 'relibBirtday', idcard.substr(6, 4) + '-' + idcard.substr(10, 2) + '-' + idcard.substr(12, 2))
        for (let v of city.cityData) {
          if (idcard.substring(0, 6) == v.code) {
            t.$refs[t.valueMap.relibBirtplace][0].$set(t.$refs[t.valueMap.relibBirtplace][0].formDataSubmit, 'relibBirtplace', v.title)
            t.$refs[t.valueMap.relibBirtplace][0].$refs.relibBirtplace.thisValue = v.title
          }
        }

      } else {
        t.$Message.warning("请填写正确的证件号码")
      }

    } else {
      t.$Message.warning("请填写正确的证件号码")
    }
  },
}
export default recruit_process
