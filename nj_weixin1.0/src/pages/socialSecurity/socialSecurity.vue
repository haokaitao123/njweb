<template>
	<div>
		<socialSecurityMain v-if="mainShow" @baseEmitFn = "baseEmitFn"></socialSecurityMain>
		<socialSecurityQuery v-if="queryShow"></socialSecurityQuery>
	</div>
</template>

<script>
	import socialSecurityMain from "@/components/socialSecurity/socialSecurityMain"
	import socialSecurityQuery from "@/components/socialSecurity/socialSecurityQuery"
	export default {
		data(){
			return{
				mainShow: true,
				queryShow: false
			}
		},
		methods:{
			baseEmitFn(){
				this.mainShow = false;
				this.queryShow = true;				
			}
		},
		components:{
			socialSecurityMain,
			socialSecurityQuery
		}
	}
</script>

<style>
</style>