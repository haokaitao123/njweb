<template>
	<div class="aaa">
		<!--<Row>-->
			<!--&lt;!&ndash;<i-col span="24" class="hIssue">&ndash;&gt;-->
				<!--&lt;!&ndash;<div>提交工单：</div>&ndash;&gt;-->
			<!--&lt;!&ndash;</i-col>&ndash;&gt;-->
		<!--</Row>-->
    <Row style="margin: 5px 0;height: 550px">
      <submitOrder></submitOrder>
      <!--<Col span="24" class="demo-tabs-style2">-->
      <!--<Tabs type="card"  @on-click="table">-->
        <!--<TabPane label="工单提交" name="name5" >-->
          <!---->
        <!--</TabPane>-->
        <!--&lt;!&ndash;&ndash;&gt;-->
        <!--&lt;!&ndash;<TabPane label="业务流程" name="name6" v-if="list.cmutKntypeBusprop == '02busprocess'" :disabled="disabledShow">&ndash;&gt;-->
          <!--&lt;!&ndash;<commonFlowList ref="commonFlowList"></commonFlowList>&ndash;&gt;-->
        <!--&lt;!&ndash;</TabPane>&ndash;&gt;-->
      <!--</Tabs>-->
      <!--</Col>-->
    </Row>
	</div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
	import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
  import submitOrder from './submitOrder.vue'
  import commonFlowList from '../commonFlowList/commonFlowList.vue'
	export default{
	    data() {
        return {

        }
      },
      components: {
        submitOrder,
        commonFlowList,
      },
    computed: {
	      list() {
	        return this.$store.state.workOrder.issueListDataOneList
        },
        disabledShow() {
	        return this.$store.state.workOrder.disabledShow
        },
    },
    methods: {
      table(name) {
        let t = this
        if (name === 'name6') {
          ///  存流程funId
  //        alert(getUrlKey('id'))
          if (getUrlKey('id') === '1196') {
//            alert(111)
            this.$store.commit('workOrder/setRoleType', '03user')
          }
          this.$store.commit('workOrder/setIsfunId', this.list.cmutKntypeProcessid)
          this.$store.state.workOrder.btnShow = true
          t.$refs.commonFlowList.getData()
          t.$refs.commonFlowList.getColumns()
        }
      },

    },
	}
</script>

<style lang="scss" scoped>

</style>
