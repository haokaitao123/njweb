<template>
	<div class="table">
		<Row>
			<Col span="24">
				<Row style="padding: 10px 16px;box-sizing: border-box">
          <p class="p1">
            <Icon type="mouse"></Icon>
            &nbsp;我的工单
          </p>
				</Row>
				<Row v-if="totalQ > 0 || totalF > 0">
					<p class="pTitle2">
						我的工单提醒：<a v-if="totalF > 0">待您反馈 [ {{totalF}} ]</a>  <span v-if="totalQ > 0 && totalF > 0">/</span>  <a v-if="totalQ > 0">待您确认 [ {{totalQ}} ]</a>
					</p>
				</Row>

          <Row style="padding: 10px 16px;box-sizing: border-box">
            <i-col span="24">
              <!--@on-click="pickData" @on-click="pickData"-->
			            <span @dblclick="clearKnowType">
			              问题类型：<Input v-model="cmwdTypeDis" icon="search" :readonly="true" placeholder="请选择问题类型" style="width: 160px;margin-right: 10px;"/>
			            </span>
              工单编号：<Input placeholder="请输入工单编号..." v-model="cmwdCode" style="width: 150px;margin-right: 10px;"  @on-change="getData"/>
              提交时间：<DatePicker type="datetime" v-model="ranTimeLeft" @on-change="getData"  placeholder="请选择开始时间..."  style="width: 160px;"></DatePicker><span style="color: #C3C3C3;"> — </span><DatePicker type="datetime" v-model="ranTimeRight"  @on-change="getData" placeholder="请选择结束时间..." style="width: 160px;margin-right: 10px;"></DatePicker>
              关键字：<Input placeholder="请输入关键字..."  @on-change="getData" v-model="cmwdkeyWord" style="width: 150px;margin-right: 10px;"  />
              <Button type="primary" @click="getData">{{$t('button.ser')}}</Button>
            </i-col>
          </Row>
          <Row>
            <i-col span="24">
              <Row style="margin: 10px 0;">
                <Table style="width:100% !important;" :height="tableheight" size="small" :columns="columns" :data="data"></Table>
              </Row>
              <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
            </i-col>
          </Row>

			</Col>
		</Row>
	    <transition name="fade">
	      <searchTable v-show="openPick" :searchCloumns="searchCloumns"  :params="params" @closeUp="closeUp" @changeinput="changeinput" ref="searchTable"></searchTable>
	    </transition>
	</div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
	import { isSuccess, deepCopy } from '../../../lib/util'
  	import searchTable from '../../../components/searchTable/searchKnowType'

	export default{
	    data() {
	      return {
          openPick: false,
	        tableheight: document.body.offsetHeight - 300,
	        totalF: 0,
	        totalQ: 0,
	        data: [],
	        cmwdCode: '',
          cmwdType: '',
          cmwdTypeDis: '',
          cmwdkeyWord: '',
          ranTimeLeft: '',
          ranTimeRight: '',
	        sort: 'id',
          order: 'desc',
          rows: 20,
          page: '1',
	        total: NaN,
          searchCloumns: [
            {
              title: '知识库类型编码',
              key: 'cmutKntypeCode',
              sortable: 'custom',
              width: 253,
            },
            {
              title: '知识库类型名称',
              key: 'cmutKntypeName',
              sortable: 'custom',
              width: 253,
            },
          ],
          params: {
            _mt: 'cmutKnlType.getPage',
            sort: 'cmutKntypeCode',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1',
            logType: this.$t('button.ser'),
          },
	        columns: [
	        	{
	        		title: '工单编号',
            		key: 'cmwdCode',
            		width: '200',
              align: 'center',
	        	},
	        	{
	        		title: '工单内容',
          		key: 'cmwdDesc',
            		ellipsis: true,
              width: '200',
              align: 'center',
//          		className: 'table-column',
            		render: (h, params) => {
		             	return h('div', [
			                h('a', {
			                  style: {
			                		color: '#2db7f5',
			                  },
			                  on: {
			                    click: () => {
			                      this.lookDetail(params.row)
			                    },
			                  },
			                }, params.row.cmwdDesc),
			             ])
		            },
	        	},
	        	{
	        		title: '工单分类',
            		key: 'cmwdTypeDis',
          		align: 'center',
              width: '200',
	        	},
	        	{
	        		title: '提交时间',
            		key: 'createTime',
            		width: '200',
              align: 'center',
	        	},
            {
              title: '工单属性',
              key: 'cmwdPropertyDis',
              align: 'center',
              width: '200',
            },
	        	{
	        		title: '工单状态',
            		key: 'cmwdStatusDis',
            		width: '200',
              align: 'center',
            		filters: [
                        {
                            label: '待处理',
                            value: 1
                        },
                        {
                            label: '处理中-已分派',
                            value: 2
                        },
                        {
                            label: '处理中/正在为您处理',
                            value: 3
                        },
                        {
                            label: '处理中-转交待接单',
                            value: 4
                        },
                        {
                            label: '待您反馈',
                            value: 5
                        },
                        {
                            label: '待您确认',
                            value: 6
                        },
                        {
                            label: '待您评价',
                            value: 7
                        },
                        {
                            label: '已关闭',
                            value: 8
                        },
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
						if (value === 1) {
                            return row.cmwdStatusDis === '待处理'
                        } else if (value === 2) {
                            return row.cmwdStatusDis === '处理中-已分派'
                        } else if (value === 3) {
                        	return row.cmwdStatusDis === '处理中/正在为您处理'
                        } else if (value === 4) {
                        	return row.cmwdStatusDis === '处理中-转交待接单'
                        } else if (value === 5) {
                        	return row.cmwdStatusDis === '待您反馈'
                        } else if (value === 6) {
                        	return row.cmwdStatusDis === '待您确认'
                        } else if (value === 7) {
                        	return row.cmwdStatusDis === '待您评价'
                        } else if (value === 8) {
                        	return row.cmwdStatusDis === '已关闭'
                        }
                    }
	        	},
	        	{
	        		title: this.$t('button.opr'),
            		key: '',
            		width: '140',
              align: 'center',
//          		fixed: 'right',
            		render: (h, params) => {
		             if (params.row.cmwdStatusDis === '待处理') {
		             	return h('div', [
			                h('a', {
			                  style: {
			                  	fontSize: '13px',
			                  	color: '#2db7f5',
			                  },
			                  on: {
			                    click: () => {
			                      this.lookDetail(params.row)
			                    },
			                  },
			                }, '查看'),
			             ])
		             } else if (params.row.cmwdStatusDis === '待您评价') {
		             	return h('div', [
			                h('a', {
			                  style: {
			                    marginRight: '10px',
			                    fontSize: '13px',
			                    color: '#2db7f5',
			                  },
			                  on: {
			                    click: () => {
			                      this.lookDetail(params.row)
			                    },
			                  },
			                }, '查看'),
//			                h('a', {
//			                  style: {
//			                  	marginRight: '10px',
//			                  	fontSize: '13px',
//			                  	color: '#2db7f5',
//			                  },
//			                  on: {
//			                    click: () => {
//			                      this.deleteOrder(params.row.id)
//			                    },
//			                  },
//			                }, '删除'),
			                h('a', {
			                  style: {
			                  	fontSize: '13px',
			                  	color: '#2db7f5',
			                  },
			                  on: {
			                    click: () => {
			                      this.evaluate(params.row)
			                    },
			                  },
			                }, '评价'),
			             ])
		             } else {
		             	return h('div', [
			                h('a', {
			                  style: {
			                    marginRight: '10px',
			                    fontSize: '13px',
			                    color: '#2db7f5',
			                  },
			                  on: {
			                    click: () => {
			                      this.lookDetail(params.row)
			                    },
			                  },
			                }, '查看'),
//			                h('a', {
//			                  style: {
//			                  	fontSize: '13px',
//			                  	color: '#2db7f5',
//			                  },
//			                  on: {
//			                    click: () => {
//			                      this.deleteOrder(params.row.id)
//			                    },
//			                  },
//			                }, '删除'),
			             ])
		             }
		            },
	        	},
	        ],
	      }
	    },
	    computed: {

	    },
	    components: {
        searchTable,
	    },
	    mounted() {
	    	this.getData()
	    	this.getTotal()
	    },
	    methods: {
	    	getTotal() {
	    		const t = this
	    		const data = {
	    			_mt: 'cmutWorkorder.getCountByState',
	    		}
	    		getDataLevelUserLoginNew(data).then((res) => {
	                if (isSuccess(res, t)) {
	                	t.totalF = res.data.content[0].value.split(',')[0]
	                	t.totalQ = res.data.content[0].value.split(',')[1]
	                	t.$store.commit('workOrder/setAllTotal', Number(t.totalF) + Number(t.totalQ) )
	                }
	            }).catch(() => {
	                t.$Modal.error({
	                    title: this.$t('reminder.err'),
	                    content: this.$t('reminder.errormessage'),
	                })
	            })
	    	},
        pickData() {
          const t = this
          t.$refs.searchTable.getData(this.params)
          t.openPick = true
        },
        changeinput(name, id) {
          const t = this
          t.cmwdTypeDis = name
          t.cmwdType = id
          t.getData()
        },
        closeUp() {
          const t = this
          t.openPick = false
        },
        clearKnowType() {
	    	  const t = this
          t.cmwdTypeDis = ''
          t.cmwdType = ''
          t.getData()
        },
	    	getData() {
	    		const t = this
	    		const data = {
	              _mt: 'cmutWorkorder.getPage',
	              sort: t.sort,
	              order: t.order,
	              rows: t.rows,
	              page: t.page,
	              logType: this.$t('button.ser'),
	              data: '',
	            }
	    		data['cmwdCode'] = t.cmwdCode
	    		data['cmwdType'] = t.cmwdType
	    		data['cmwdkeyWord'] = t.cmwdkeyWord
          if (t.ranTimeLeft !== undefined) {
            data['ranTimeLeft'] = t.ranTimeLeft === '' ? '' : new Date(t.ranTimeLeft).format('yyyy-MM-dd hh:mm:ss')
          }
          if (t.ranTimeRight !== undefined) {
            data['ranTimeRight'] = t.ranTimeRight === '' ? '' : new Date(t.ranTimeRight).format('yyyy-MM-dd hh:mm:ss')
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
                console.log(t.data)
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
	        //查看
	        lookDetail(pRow) {
	    	  console.log(pRow)
            /// 点击查看的时候存取funID cmwdMarkno orderBusiPro
            this.$store.commit('workOrder/setIsfunId', pRow.functionId)
            this.$store.commit('workOrder/setCmwdMarkno', pRow.cmwdMarkno)
            this.$store.commit('workOrder/setOrderBusiPro', pRow.orderBusiPro)
            this.$store.commit('workOrder/setbtnShow', false)
	        	this.getFirstAttachData(pRow)
//	        	this.getCommunRecordData(pRow.id)
	        	//切换到详情页面
	        	this.$store.commit('workOrder/setOrderTemp', 'detail')
	        	//提交详情信息
	        	this.$store.commit('workOrder/seachOrderDetail', pRow)
	        	//切换到评价或反馈
	        	if(pRow.cmwdStatusDis === '待您评价') {
	        		this.$store.commit('workOrder/setOnlyRecord', true)
	        		this.$store.commit('workOrder/setBackOrEvalu', false)
	        	} else if (pRow.cmwdStatusDis === '已关闭') {
	        		this.$store.commit('workOrder/setOnlyRecord', false)
	        		this.$store.commit('workOrder/setBackOrEvalu', false)
	        	} else {
	        		this.$store.commit('workOrder/setBackOrEvalu', true)
	        		this.$store.commit('workOrder/setOnlyRecord', true)
	        	}
	        	//切换步骤条状态
	        	if (pRow.cmwdStatusDis === '待处理') {
	        		this.$store.commit('workOrder/setStepStaus', 0) //第一步
	        		this.$store.commit('workOrder/setStepTitle1', '待分派')
	        		this.$store.commit('workOrder/setStepTitle2', '处理中')
	        		this.$store.commit('workOrder/setStepTitle3', '待您处理')
	        		this.$store.commit('workOrder/setStepTitle4', '已关闭')
	        		this.$store.commit('workOrder/setStepContent1', '系统正在为您分派')
	        		this.$store.commit('workOrder/setStepContent2', '')
	        		this.$store.commit('workOrder/setStepContent3', '')
	        		this.$store.commit('workOrder/setStepContent4', '')
	        	} else if (pRow.cmwdStatusDis === '待您反馈' || pRow.cmwdStatusDis === '待您确认' || pRow.cmwdStatusDis === '待您评价') {
	        		this.$store.commit('workOrder/setStepStaus', 2) //第三步
	        		this.$store.commit('workOrder/setStepTitle1', '已受理')
	        		this.$store.commit('workOrder/setStepTitle2', '已处理')
	        		this.$store.commit('workOrder/setStepTitle3', '待您处理')
	        		this.$store.commit('workOrder/setStepTitle4', '已关闭')
	        		this.$store.commit('workOrder/setStepContent1', '')
	        		this.$store.commit('workOrder/setStepContent2', '')
	        		this.$store.commit('workOrder/setStepContent3', pRow.cmwdStatusDis)
	        		this.$store.commit('workOrder/setStepContent4', '')
	        	} else if (pRow.cmwdStatusDis === '已关闭') {
	        		this.$store.commit('workOrder/setStepStaus', 3) //第四步
	        		this.$store.commit('workOrder/setStepTitle1', '已受理')
	        		this.$store.commit('workOrder/setStepTitle2', '已处理')
	        		this.$store.commit('workOrder/setStepTitle3', '已评价')
	        		this.$store.commit('workOrder/setStepTitle4', '已关闭')
	        		this.$store.commit('workOrder/setStepContent1', '')
	        		this.$store.commit('workOrder/setStepContent2', '')
	        		this.$store.commit('workOrder/setStepContent3', '')
	        		this.$store.commit('workOrder/setStepContent4', '实际处理时长：')
	        	} else {
	        		this.$store.commit('workOrder/setStepStaus', 1) //第二步
	        		this.$store.commit('workOrder/setStepTitle1', '已受理')
	        		this.$store.commit('workOrder/setStepTitle2', '处理中')
	        		this.$store.commit('workOrder/setStepTitle3', '待您处理')
	        		this.$store.commit('workOrder/setStepTitle4', '已关闭')
	        		this.$store.commit('workOrder/setStepContent1', '')
	        		this.$store.commit('workOrder/setStepContent2', pRow.cmwdStatusDis)
	        		this.$store.commit('workOrder/setStepContent3', '')
	        		this.$store.commit('workOrder/setStepContent4', '')
	        	}
	        },
	        //删除
	        deleteOrder(id) {
	        	const t = this
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: '删除后，您将无法恢复和查看该工单，请谨慎操作',
                    onOk: () => {
                        const data = {
                            _mt: 'cmutWorkorder.delByIds',
                            logType: '删除工单',
                            delIds: id,
                        }
                        for (const dat in data) {
                            if (data[dat] === '') {
                                delete data[dat]
                            }
                        }
                        getDataLevelUserLogin(data).then((res) => {
                          if (isSuccess(res, t)) {
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
	        //评价
	        evaluate(pRow) {
	        	this.getFirstAttachData(pRow)
//	        	this.getCommunRecordData(pRow.id)
	        	//切换到详情页面
	        	this.$store.commit('workOrder/setOrderTemp', 'detail')
	        	//提交详情信息
	        	this.$store.commit('workOrder/seachOrderDetail', pRow)
	        	this.$store.commit('workOrder/setOnlyRecord', true)
	        	//切换到评价
	        	this.$store.commit('workOrder/setBackOrEvalu', false)
	        	//第三步
	        	this.$store.commit('workOrder/setStepStaus', 2) //第三步
        		this.$store.commit('workOrder/setStepTitle1', '已受理')
        		this.$store.commit('workOrder/setStepTitle2', '已处理')
        		this.$store.commit('workOrder/setStepTitle3', '待您处理')
        		this.$store.commit('workOrder/setStepTitle4', '已关闭')
        		this.$store.commit('workOrder/setStepContent1', '')
        		this.$store.commit('workOrder/setStepContent2', '')
        		this.$store.commit('workOrder/setStepContent3', pRow.cmwdStatusDis)
        		this.$store.commit('workOrder/setStepContent4', '')
	        },
	        //获取沟通记录信息
	        getCommunRecordData(orderId) {
	        	const t = this
	        	const data = {
	        		_mt: 'cmutWorkorderrecord.getObject',
	        		logType: '查看记录',
	        		sort: 'id',
	        		order: 'asc',
	        	}
	        	data['cmwdrdWdid'] = orderId
	        	getDataLevelUserLoginNew(data).then((res) => {
                  if (isSuccess(res, t)) {
                   let resData = res.data.content[0].value
                   if (resData) {
                   		for (let i = 0; i < resData.length; i++) {
		                   	if (resData[i].cmwdrdAttach) {
		                   		let attachData = resData[i].cmwdrdAttach.split('|')
		                   		let resAttch = []
		                   		for (let x = 0; x < attachData.length; x++) {
		                   			 resAttch.push({
		                   			 	kname: attachData[x].split(':')[0],
		                   			 	vname: attachData[x].split(':')[1],
		                   			 })
		                   		}
		                   		res.data.content[0].value[i].cmwdrdAttach = resAttch
		                   	}
		                }
                   }
                   t.$store.commit('workOrder/setMyOrderRecordData', res.data.content[0].value)
                 }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
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
<style>
	.ivu-table td.table-column{
        color: #2db7f5;
    }

  .single-page{
    /*background: white;*/
    /*height: 660px;*/
    /*overflow-y: scroll;*/
  }
  .p1{
    font-size: 14px;
    color: #1c2438;
    font-weight:700;
  }
</style>
<style lang="scss" scoped>
  .table{
    padding-bottom: 20px;
    .tableList{
      width:100%;
      overflow-y: scroll;
      border:2px solid rgb(240, 240, 240);
    }
  }
	.pTitle{
		line-height: 30px;
		font-size: 14px;
		/*border-bottom: solid 1px #CCCCCC;*/
	}
	.pTitle2{
		line-height: 30px;
		font-size: 14px;
		border: solid 1px #CCCCCC;
		margin-top: 10px;
		background: #EFEFEF;
		padding-left: 5px;
	}
</style>
