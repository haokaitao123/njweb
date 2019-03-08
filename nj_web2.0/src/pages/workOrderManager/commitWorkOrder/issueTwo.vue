<template>
	<div>
		<Row>
			<i-col span="24" class="hIssue">
				<div>{{$t('lang_communication.commitWorkOrder.step2Title')}}</div>
			</i-col>
		</Row>
		<Row :gutter="20">
			<i-col span="12">
				<div class="divBox" >
					<issuelist v-if="true" ></issuelist>
				</div>
			</i-col>
			<i-col span="12">
				<hotissue v-if="true"></hotissue>
			</i-col>
		</Row>
	</div>
</template>

<script>
	import issuelist from './issueList'
	import hotissue from './hotIssue'

	export default{
	    data() {
	      return {
	      }
	    },
	    computed: {
	    },
	    components: {
	    	issuelist,
	    	hotissue,
	    },
	    mounted() {
	    },
	    methods: {
	    },
	}
</script>

<style lang="scss" scoped>
	.hIssue div{
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		font-size: 15px;
		background: #EFEFEF;
	}
	.hIssue{
		margin-bottom: 15px;
	}
	.divBox{
		border-top: solid 1px #DDDDDD;
		overflow: auto;
	}
</style>
