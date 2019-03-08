<template>
	<div>
		<salaryLogin v-if="loginShow" @toLoginFn = "toLoginFn"></salaryLogin>
		<salaryMain v-if="mainShow" @baseEmitFn = "baseEmitFn"></salaryMain>
		<salaryQuery v-if="queryShow"></salaryQuery>
	</div>
</template>

<script>
	import salaryLogin from "@/components/salary/salaryLogin"
	import salaryMain from "@/components/salary/salaryMain"
	import salaryQuery from "@/components/salary/salaryQuery"
	export default {
		data(){
			return{
				loginShow: true,
				mainShow: false,
				queryShow: false
			}
		},
		methods:{
			baseEmitFn(){
				this.loginShow = false,
				this.mainShow = false,
				this.queryShow = true
			},
			toLoginFn(){
				this.loginShow = false,
				this.mainShow = true,
				this.queryShow = false
			}
		},
		components:{
			salaryLogin,
			salaryMain,
			salaryQuery
		}
	}	
</script>

<style type="text/less" lang="less" scoped>
</style>