<template>
	<div>
		<Row>
	      <Col span="24">
		      <Row class="rowClass">
		      	<div style="border-bottom: solid 1px #CCCCCC;font-weight: bold;font-size: 15px;">{{$t('lang_communication.handleWorkOrder.noHandleTotal')}}</div>
		      </Row>
		      <Row  class="rowClass">
            	<Table  :height="tableheight" size="small" ref="selection" :columns="columns" :data="data"></Table>
		      </Row>
		      <Row  class="rowClass">
		      	<Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
		      </Row>
	      </Col>
	    </Row>
	</div>
</template>

<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        showAllot: false,
        updateId: NaN,
        dropdownMenuList: [],
        tableselected: [],
        columns: [
          {
            title: this.$t('lang_communication.handleWorkOrder.cmwdCode'),
            key: 'cmwdCode',
            width: '200',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.handleWorkOrder.cmwdDesc'),
            key: 'cmwdDesc',
            sortable: 'custom',
            ellipsis: true,
            width: '250',
//            render: (h, params) => {
//              return h('div', [
//                h('a', {
//                  style: {
//                    color: '#2db7f5',
//                  },
//                  on: {
//                    click: () => {
//                      this.lookDetail(params.row)
//                    },
//                  },
//                }, params.row.cmwdDesc),
//              ])
//            },
          },
          {
            title: this.$t('lang_communication.handleWorkOrder.cmwdType'),
            key: 'cmwdTypeDis',
            width: '150',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.handleWorkOrder.cmwdPriority'),
            key: 'cmwdPriorityDis',
            width: '160',
//          align: 'center',
          },
          {
            title: this.$t('lang_communication.handleWorkOrder.createTime'),
            key: 'createTime',
            width: '150',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.handleWorkOrder.cmwdExpfeedbacktime'),
            key: 'cmwdExpfeedbacktime',
            align: 'left',
            width: '150',
          },
          {
            title: this.$t('lang_communication.handleWorkOrder.cmwdAuthor'),
            key: 'cmwdAuthorDis',
            sortable: 'custom',
            width: '150',
          },
          {
            title: this.$t('lang_communication.handleWorkOrder.cmwdMobile'),
            key: 'cmwdMobile',
//          align: 'center',
            width: '140',
          },
          {
            title: this.$t('lang_communication.handleWorkOrder.cmwdStatus'),
            key: 'cmwdStatusDis',
            sortable: 'custom',
            width: '150',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
              h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                        this.openUp2(params.row, this.$t('button.view'))
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                        this.openUp(params.row, this.$t('lang_communication.handleWorkOrder.cmwdOrder'))
                    },
                  },
                }, this.$t('lang_communication.handleWorkOrder.cmwdOrder')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                        this.openAllot(params.row, this.$t('lang_communication.handleWorkOrder.cmwdTranfer'))
                    },
                  },
                }, this.$t('lang_communication.handleWorkOrder.cmwdTranfer')),
              ])
            },
      },
    ],
        index: 0,
        companyId: 1,
        data: [],
        total: NaN,
        sort: 'cmwdCode',
        order: 'asc',
        rows: 10,
        page: 1,
        select: '已生效',
        name: '',
//        isFirst: true,
      }
    },
    computed: {

    },
    components: {
    },
    props: {
//      nHData: Array,
//      total1: Number,
    },
    mounted() {
//      if (!this.isFirst) {
        this.getData()
//      } else {
//        this.data = this.nHData
//        this.total = this.total1
//      }
    },
    methods: {
      getData() {
        const t = this
//        t.isFirst = false
        const data = {
          _mt: 'cmutWorkorder.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List3',
          handleStatus: '2',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
            t.$store.commit('workOrder/setNoHandleTotal', res.data.content[0].records)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      openAllot(row) {
      	const t = this
      	t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_communication.handleWorkOrder.confirmOrder'),
            onOk: () => {
                const data = {
		        	_mt: 'cmutWorkorderrecord.addOrUpd',
		        	logType: '转接工单',
		        	cmwdrdWdid: row.id,
		        	cmwdrdFeedback: t.$store.state.user.userId,
		        	cmwdrdFeedbacktype: '1',
		        	orderStatus: '0203open-waiting',
		        	cmwdrdDesc: '工单正在转接中',
		        }
		        for (const dat in data) {
		          if (data[dat] === '') {
		            delete data[dat]
		          }
		        }
		        getDataLevelUserLoginNew(data).then((res) => {
		          if (isSuccess(res, t)) {
		            t.$Notice.success({
		                title: this.$t('lang_communication.handleWorkOrder.tranferSuccess'),
		            })
		            t.getData()
		          }
		        }).catch(() => {
		          t.$Modal.error({
		            title: this.$t('reminder.err'),
		            content: this.$t('reminder.errormessage'),
		          })
		        })
            },
        })
      },
      openUp(row) {
      	const t = this
      	const data = {
        	_mt: 'cmutWorkorderrecord.addOrUpd',
        	logType: '接单',
        	cmwdrdWdid: row.id,
        	cmwdrdFeedback: t.$store.state.user.userId,
        	cmwdrdFeedbacktype: '1',
        	orderStatus: '0202open',
        	cmwdrdDesc: '工程师正在为您处理，请耐心等待',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$Notice.success({
                title: this.$t('lang_communication.handleWorkOrder.OrderSuccess'),
            })
//          t.getCommunRecordData(row.id)
			      t.getFirstAttachData(row)
//	      	t.$store.commit('workOrder/setHandleClick', row)
//	      	t.$store.commit('workOrder/setHandleDetail', false)
//	      	t.$store.commit('workOrder/setIsYesHandle', true)
//	      	t.$store.commit('workOrder/setIsCommit', true)
	      	t.getData()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      openUp2(row) {
      	const t = this
      	t.getFirstAttachData(row)
//    	t.getCommunRecordData(row.id)
      	t.$store.commit('workOrder/setHandleClick', row)
      	t.$store.commit('workOrder/setHandleDetail', false)
      	t.$store.commit('workOrder/setIsYesHandle', false)
      },
        //获取第一条沟通记录的附件信息
	        getFirstAttachData(pRow) {
	        	const t = this
	        	if (pRow.cmwdAttach) {
               		let attachData = pRow.cmwdAttach.split('|')
               		let resAttch = []
               		let fileType = ''
               		for (let x = 0; x < attachData.length; x++) {
       					const t = this
			    		let data = {
				          _mt: 'userMgmt.getfiletoken',
				          isprivate: true,
				          logType: '下载图片',
				          filekey: attachData[x].split(':')[1],
				          expiresecs: 180,
				        }
				        getDataLevelUserLogin(data).then((res) => {
				          if (isSuccess(res, t)) {
				          	resAttch.push({
				          		kname: attachData[x].split(':')[0],
                   			 	vname: attachData[x].split(':')[1],
                   			 	kType: attachData[x].split(':')[0].split('.')[1],
				          		upUrl: pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(attachData[x].split(':')[1]),
				          	})
				          }
				        }).catch(() => {
				          t.$Modal.error({
				            title: this.$t('reminder.err'),
				            content: this.$t('reminder.errormessage'),
				          })
				        })
               		}
               		pRow.cmwdAttach = resAttch
               	}
	        },
    },
  }
</script>

<style lang="scss" scoped>
	.rowClass{
		margin-bottom: 10px;
	}
</style>
