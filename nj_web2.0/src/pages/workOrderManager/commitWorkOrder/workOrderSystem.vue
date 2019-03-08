<template>
  <div class="table" style="margin-top: 46px;">
        <Row :style="{height:divheight + 'px'}">
        	<i-col span="3" style="height: 100%;">
        		<Menu :active-name="$store.state.workOrder.witchItem" width="auto" style="height: 100%;background: #f0f0f0;" @on-select="pageTo">
			        <MenuGroup title="工单系统">
			            <MenuItem name="myorder">
			                <Icon type="clipboard"></Icon>
			                	我的工单
			                	 <Badge :count="badgeCount"></Badge>
			            </MenuItem>
			            <MenuItem name="commitOrder">
			                <Icon type="paper-airplane"></Icon>
			                	提交工单
			            </MenuItem>
			        </MenuGroup>
			    	</Menu>
        	</i-col>
        	<i-col span="21" style="height: 100%;background: #FFFFFF;padding:10px;">
        		<myorder v-if="$store.state.workOrder.isMyOrder"></myorder>
        		<commitorder v-if="!$store.state.workOrder.isMyOrder"></commitorder>
        	</i-col>
        </Row>
  </div>
</template>
<script>
  import myorder from '../myWorkOrder/myOrder'
  import commitorder from './commitWorkOrder'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        divheight: document.body.offsetHeight - 47,
      }
    },
    computed: {
			badgeCount() {
				return this.$store.state.workOrder.allTotal
			},
    },
    components: {
    	myorder,
    	commitorder,
    },
    mounted() {
    },
    methods: {
    	pageTo(name) {
    		const t = this
    		t.$store.commit('workOrder/setWitchItem', name)
    		if (name === 'myorder') {
    			t.$store.commit('workOrder/setIsMyOrder', true)
    			t.$store.commit('workOrder/setOrderTemp', 'list')
    		} else {
    			t.$store.commit('workOrder/setIsMyOrder', false)
    		}
    	},
    },
  }
</script>
<style>
	 .ivu-badge-count{
	 	background: #2d8cf0;	
	 	margin-left: 5px;
	 	height: 16px;
 		line-height: 14px;
	 }
</style>
<style lang="scss" scoped>
 .ivu-menu-item{
 	font-size: 15px;
 	color: #000000;
 }
 .ivu-menu-vertical .ivu-menu-item:hover{
 	background: #FFFFFF;
 }
</style>
