<template>
	<div class="=table">
		<Row>
	      <Col span="24">
	      <card>
	        <p slot="title">
	          <Icon type="mouse"></Icon>
	          &nbsp;{{$t('lang_communication.allotWorkOrder.title')}}
	        </p>
	        <Row :style="{height:divheight + 'px'}">
	        	<i-col span="3" style="height: 100%;">
	        		<Menu active-name="noallot" width="auto" style="height: 100%;" @on-select="pageTo">
				        <MenuGroup :title="$t('lang_communication.allotWorkOrder.menuTitle')">
				            <MenuItem name="noallot">
				                <Icon type="briefcase"></Icon>
                      {{$t('lang_communication.allotWorkOrder.noAllotTotal')}}
				                	<Badge :count="$store.state.workOrder.noAllotTotal"></Badge>
				            </MenuItem>
				            <MenuItem name="yesallot">
				                <Icon type="checkmark-circled"></Icon>
                      {{$t('lang_communication.allotWorkOrder.yesallot')}}
				            </MenuItem>
				        </MenuGroup>
				    </Menu>
	        	</i-col>
	        	<i-col span="21" style="height: 100%;background: #FFFFFF;padding:10px;" v-if="isLook">
	        		<noallot v-if="isAllot"></noallot>
	        		<yesallot v-if="!isAllot"></yesallot>
	        	</i-col>
	        	<i-col span="21" style="height: 100%;background: #FFFFFF;padding:10px;" v-if="!isLook">

              <transition name="fade">
                <div class="background" v-if="!isLook">
                  <allotdetail></allotdetail>
                </div>
              </transition>
	        	</i-col>
	        </Row>

	      </card>
	      </Col>
	    </Row>
	</div>
</template>

<script>
	import noallot from './noAllot'
	import yesallot from './yesAllot'
	import allotdetail from './allotDetail'

	export default{
    data() {
      return {
        divheight: document.body.offsetHeight - 200,
        isAllot: true,
      }
    },
    computed: {
		isLook() {
			return this.$store.state.workOrder.allotDetailTemp
		},
    },
    components: {
    	noallot,
    	yesallot,
    	allotdetail,
    },
    mounted() {
    },
    methods: {
    	pageTo(name) {
    		const t = this
    		t.$store.commit('workOrder/setAllotDetail', true)
    		if (name === 'noallot') {
    			t.isAllot = true
    		} else {
    			t.isAllot = false
    		}
    	},
    },
  }
</script>

<style type="text/scss">
 .ivu-badge-count{
 	background: #2d8cf0 !important;
 	margin-left: 0px;
 	height: 16px;
 	line-height: 14px;
 }
/* .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
 	padding: 14px 0;
 }*/
 .ivu-table-cell{
   white-space:nowrap;
 }
 .background{
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 1000;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: rgba(0,0,0,0.5);
   -webkit-overflow-scrolling: touch;
   outline: 0;
   border-radius: 10px;
 }
</style>
