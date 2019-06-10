import valid from '@/lib/pub_valid'

const emp_empdim = {
	empnhSalaccount(node) {
		emp_empdim.empnhSalaccount_set(this.$parent)
	},

	// 根据身份证号码获取性别 出生日期 籍贯
	empnhSalaccount_set(t) {
		let bankNumber = t.$refs[t.valueMap.empnhSalaccount][0].formDataSubmit.empnhSalaccount
		console.log(1111)
		if(bankNumber !== '') {
			if(valid.val_bank(bankNumber) == 1) {
				t.$Message.warning("银行卡号长度必须在16到19之间")
				t.$store.commit('setBankName',false)
			} else if(valid.val_bank(bankNumber) == 2) {
				t.$Message.warning("银行卡号码必须全为数字")
				t.$store.commit('setBankName',false)
			} else if(valid.val_bank(bankNumber) == 3) {
				t.$Message.warning("银行卡号开头6位不符合规范")
				t.$store.commit('setBankName',false)
			} else {
				console.log('istrue')
				t.$store.commit('setBankName',true)
			}
		}
	},

}
export default emp_empdim