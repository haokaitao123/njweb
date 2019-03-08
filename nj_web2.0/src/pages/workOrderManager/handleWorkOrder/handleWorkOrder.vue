<template>
	<div class="=table">
		<Row>
	      <Col span="24">
	      <card>
	        <p slot="title">
	          <Icon type="mouse"></Icon>
            &nbsp;{{$t('lang_communication.handleWorkOrder.title')}}
	        </p>
	        <Row :style="{height:divheight + 'px'}">
	        	<i-col span="3" style="height: 100%;">
	        		<Menu :active-name="$store.state.workOrder.handleWitchItem" width="auto" style="height: 100%;" @on-select="pageTo">
				        <MenuGroup :title="$t('lang_communication.handleWorkOrder.menuTitle')">
				            <MenuItem name="nohandle">
				                <Icon type="briefcase"></Icon>
                      {{$t('lang_communication.handleWorkOrder.noHandleTotal')}}
				                	<Badge :count="$store.state.workOrder.noHandleTotal"></Badge>
				            </MenuItem>
				            <MenuItem name="handleing">
				                <Icon type="ios-information"></Icon>
                      {{$t('lang_communication.handleWorkOrder.handleing')}}
				                	<Badge :count="$store.state.workOrder.handleIngTotal"></Badge>
				            </MenuItem>
				            <MenuItem name="yeshandle">
				                <Icon type="checkmark-circled"></Icon>
                      {{$t('lang_communication.handleWorkOrder.yeshandle')}}
				            </MenuItem>
				        </MenuGroup>
				    </Menu>
	        	</i-col>
	        	<i-col span="21" style="height: 100%;background: #FFFFFF;padding:10px;" v-if="isLook">
	        		<nohandle v-if="$store.state.workOrder.nHandle"></nohandle>
	        		<handleing v-if="$store.state.workOrder.Handlei" ref="handleing"></handleing>
	        		<yeshandle v-if="$store.state.workOrder.yHandle"></yeshandle>
	        	</i-col>
	        	<i-col span="21" style="height: 100%;background: #FFFFFF;padding:10px;" v-if="!isLook">
              <transition name="fade">
                <div class="background" v-if="!isLook">
                  <handledetail></handledetail>
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
	import nohandle from './noHandle'
	import handleing from './handleing'
	import yeshandle from './yesHandle'
	import handledetail from './handleDetail'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

	export default{
    data() {
      return {
        divheight: document.body.offsetHeight - 200,
        nHandle: true,
        Handlei: false,
        yHandle: false,
        nHData: [], // 未接单数量
        HandldData: [], // 已接单数量
        total1: NaN,
        total2: NaN,
      }
    },
    computed: {
		isLook() {
			return this.$store.state.workOrder.handleDetailTemp
		},
    },
    components: {
    	nohandle,
    	handleing,
    	yeshandle,
    	handledetail,
    },
    mounted() {
      this.getDataNoHandle()
      this.getDataHandleing()
    },
    methods: {
    	pageTo(name) {
    		const t = this
    		t.$store.commit('workOrder/setHandleItem', name)
    		t.$store.commit('workOrder/setHandleDetail', true)
    	},
      // 处理中
      getDataHandleing() {
        const t = this
        const data = {
          _mt: 'cmutWorkorder.getPage',
          sort: 'cmwdCode',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '查询List1',
          handleStatus: '3',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.HandldData = res.data.content[0].rows
            t.total2 = res.data.content[0].records
            t.$store.commit('workOrder/setHandleIngTotal', res.data.content[0].records)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 待接单
      getDataNoHandle() {
        const t = this
        const data = {
          _mt: 'cmutWorkorder.getPage',
          sort: 'cmwdCode',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '查询List2',
          handleStatus: '2',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.nHData = res.data.content[0].rows
            t.total1 = res.data.content[0].records
            t.$store.commit('workOrder/setNoHandleTotal', res.data.content[0].records)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
	 .ivu-badge-count{
	 	background: #2d8cf0 !important;
	 	margin-left: 10px;
	 	font-size: 5px;
	 }
/*	 .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
	 	padding: 14px 0;
	 }*/
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
