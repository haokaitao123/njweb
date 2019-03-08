<template>
	<div style="width: 1000px;background: white;height: 500px;border-radius: 10px">
		<Row>
			<i-col span="24">
				<Row>
					<p class="pTitle">
						<span>
              <Icon type="mouse"></Icon>
              &nbsp;{{$t('lang_communication.commitWorkOrder.title')}}
            </span>
            <Button type="text"  @click="close">
              <Icon type="close-round" size="16"></Icon>
            </Button>
					</p>
				</Row>
				<Row style="margin: 5px 0;">
					<Col span="24" class="demo-tabs-style2">
						<Tabs type="card" :value="$store.state.workOrder.tabValue" @on-click="tabClick">
              <TabPane :label="$t('lang_communication.commitWorkOrder.step1')"  name="name1">
                <issueone v-if="true" ></issueone>
              </TabPane>
              <TabPane :label="$t('lang_communication.commitWorkOrder.step2')" name="name2" :disabled="disabled2">
                <issuetwo v-if="true" ></issuetwo>
              </TabPane>
              <TabPane :label="$t('lang_communication.commitWorkOrder.step3')" name="name3" :disabled="disabled3">
                <issuethree v-if="true"></issuethree>
              </TabPane>
              <TabPane :label="$t('lang_communication.commitWorkOrder.step4')" name="name4" :disabled="disabled4">
                <issuefour v-if="true"></issuefour>
              </TabPane>
            </Tabs>
					</Col>
				</Row>
			</i-col>
		</Row>
	</div>
</template>

<script>
	import issueone from './issueOne'
	import issuetwo from './issueTwo'
	import issuethree from './issueThree'
	import issuefour from './issueFour'
  import Bus from  '../bus'
	export default{
	    data() {
	      return {
          tableheight: document.body.offsetHeight - 400,
//	        divheight: document.body.offsetHeight - 47,
	      }
	    },
    created() {
      this.$store.commit('workOrder/switchTab', name)
      this.$store.commit('workOrder/setDisabledShow', true)
    },
	    computed: {
			disabled2() {
				return this.$store.state.workOrder.disabled2
			},
			disabled3() {
				return this.$store.state.workOrder.disabled3
			},
			disabled4() {
				return this.$store.state.workOrder.disabled4
			},
	    },
	    components: {
	    	issueone,
	    	issuetwo,
	    	issuethree,
	    	issuefour,
	    },
	    mounted() {
	    },
	    methods: {
	    	tabClick(name) {
	    		this.$store.commit('workOrder/switchTab', name)
          switch (name) {
            case  'name1' : Bus.$emit('change')
              break
            case  'name2' : Bus.$emit('change')
              break
            case  'name3' : Bus.$emit('change')
              break
          }
	    	},
        close() {
          Bus.$emit('closeAll', false)
        },
	    },
	}
</script>
<style>
	.demo-tabs-style2 .ivu-tabs-nav-scroll{
		width: 100%;
	}
	.demo-tabs-style2 .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
        width:190px;
        text-align: center;
        height: 31px;
    }
    .demo-tabs-style2 .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar{
    	width: 100%;
    	/*background: #18BE6A;*/
      margin-bottom: 5px;
    }
    .demo-tabs-style2 .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
    	background: #318EF0;
    	color: #FFFFFF;
    }
    .demo-tabs-style2 .ivu-tabs-nav-container{
    	font-size: 14px;
    }
</style>
<style lang="scss" scoped>
	.pTitle{
		line-height: 30px;
		font-size: 14px;
		/*border-bottom: solid 1px #CCCCCC;*/
    padding: 7px 0 0 16px;
    color: #1c2438;
    font-weight:700;
    display:flex;
    justify-content: space-between;
	}
</style>
