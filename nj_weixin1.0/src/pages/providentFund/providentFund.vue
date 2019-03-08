<template>
	<div>
		<providentFundMain v-if="mainShow" @baseEmitFn = "baseEmitFn"></providentFundMain>
		<providentFundQuery v-if="queryShow"></providentFundQuery>
	</div>
</template>

<script>
	import providentFundMain from "@/components/providentFund/providentFundMain"
	import providentFundQuery from "@/components/providentFund/providentFundQuery"
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
			providentFundMain,
			providentFundQuery
		}
	}
</script>

<style>
</style>