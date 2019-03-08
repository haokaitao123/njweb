<template>
	<div class="table">
		<Row>
			<Col span="24">
				<Row>
					<i-col span="1" style="margin-right: 60px;">
						<p class="pTitle">
              <Icon type="mouse"></Icon>
              &nbsp;工单详情
						</p>
					</i-col>
					<i-col span="2" style="margin-top: 15px;">
						<!--<div class="pTitle2" @click="backList">
							<Icon type="ios-undo-outline" style="margin-right: 5px;" size="16"></Icon>返回列表
						</div>		-->
						<Button type="ghost" shape="circle" icon="ios-undo-outline" size="small" @click="backList">返回列表</Button>
					</i-col>
				</Row>
				<Row style="margin-top: 10px;margin-left: 16px">
					<i-col span="24">
						<Steps :current="current">
					        <Step :title="stepTitle1" :content="content1"></Step>
					        <Step :title="stepTitle2" :content="content2"></Step>
					        <Step :title="stepTitle3" :content="content3"></Step>
					        <Step :title="stepTitle4" :content="content4"></Step>
					    </Steps>
					</i-col>
				</Row>
				<Row class="yfpClass">
					<i-col>
						<Row style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							<span>问题标题：</span>{{detailMessage.cmwdDesc}}
						</Row>
						<Row>
							<i-col span="5">
								<span>工单编号：</span>{{detailMessage.cmwdCode}}
							</i-col>
							<i-col span="5">
								<span>提交时间：</span>{{detailMessage.createTime}}
							</i-col>
							<i-col span="11">
								<span>状态：</span>{{detailMessage.cmwdStatusDis}}
							</i-col>
						</Row>
					</i-col>
				</Row>
				<div :style="{height: divHeight + 'px'}" class="divclass">
          <Tabs type="card" @on-click="table">
            <TabPane label="工单信息管理" name="name7" >
              <Row>
                <div class="commitRecord" >
                  <div class="div1">沟通记录</div>
                  <Spin fix size="large" v-if="isSpin"></Spin>
                  <div class="div22">
                    <Row class="div2">
                      <i-col span="1">
                        <img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
                      </i-col>
                      <i-col span="23">
                        <p class="recordP1">{{detailMessage.cmwdAuthorDis}} ： 问题描述 ： {{detailMessage.cmwdDesc}}</p>
                        <p v-if="detailMessage.cmwdAttach">附件信息：
                          <span v-for="(item2, index2) in detailMessage.cmwdAttach" :key="index2">
												<img v-if="item2.kType === 'jpg' || item2.kType === 'gif' || item2.kType === 'png' || item2.kType === 'jpeg'" :src="item2.upUrl" style="width: 50px;height: 50px;margin-right: 10px;" @click="lookBig2(item2)">
												<a v-else class="recordAClass" @click="downloadAttach(item2.vname)">{{item2.kname}}</a>
											</span>
                        </p>
                        <p class="recordP1" v-if="detailMessage.cmwdConfidentialinfo">机密信息：***********</p>
                        <p class="recordP2">{{detailMessage.createTime}}</p>
                      </i-col>
                    </Row>
                    <Row class="div2" v-for="(item, index) in allRecordData" :key="index">
                      <!--循环体-->
                      <i-col span="1" v-if="item.cmwdrdFeedbacktype === '0' || item.cmwdrdFeedbacktype === '1'">
                        <img src="../../../../static/workOrderImg/allotperson.png" style="width: 65%;"/>
                      </i-col>
                      <i-col span="1" v-if="item.cmwdrdFeedbacktype === '2'">
                        <img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
                      </i-col>
                      <i-col span="23">
                        <p class="recordP1" v-if="item.cmwdrdFeedbacktype === '2'">{{item.handlePeople}} ： {{item.cmwdrdDesc}}</p>
                        <p class="recordP11" v-if="item.cmwdrdFeedbacktype === '0' || item.cmwdrdFeedbacktype === '1'">工程师{{item.handlePeople}}号 : {{item.cmwdrdDesc}}</p>
                        <p v-if="item.cmwdrdAttach">附件信息：
                          <span v-for="(item2, index2) in item.cmwdrdAttach" :key="index2">
												<img v-if="item2.kType === 'jpg' || item2.kType === 'gif' || item2.kType === 'png' || item2.kType === 'jpeg'" :src="item2.upUrl" style="width: 50px;height: 50px;margin-right: 10px;" @click="lookBig2(item2)">
												<a v-else class="recordAClass" @click="downloadAttach(item2.vname)">{{item2.kname}}</a>
											</span>
                        </p>
                        <p class="recordP1" v-if="item.cmwdrdConfidentialinfo">机密信息：***********</p>
                        <p class="recordP2">{{item.createTime}}</p>
                      </i-col>
                    </Row>
                    <Row class="div2" v-if="detailMessage.cmwdEvaluate">
                      <i-col span="1">
                        <img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
                      </i-col>
                      <i-col span="23">
                        <p class="recordP1">{{detailMessage.cmwdAuthorDis}} ：已评价！</p>
                        <p class="recordP1">整体评价 ： {{detailMessage.cmwdEvaluate}}星</p>
                        <p class="recordP1">问题是否解决 ： {{detailMessage.cmwdIssolvedDis}}</p>
                        <p class="recordP1">评价内容 ： {{detailMessage.cmwdEvaluatedesc}}</p>
                        <p class="recordP2">{{detailMessage.updateTime}}</p>
                      </i-col>
                    </Row>
                  </div>
                </div>
                <Modal title="浏览大图" v-model="visible2" width="600" :styles="{top: '20px'}">
                  <img :src="imgItem" v-if="visible2" style="width: 100%">
                  <div slot="footer">
                    <div style="display: flex;justify-content: flex-end;">
					        		<span>
					        			<Button type="primary" @click="visible2 = false">关闭</Button>
					        		</span>
                    </div>
                  </div>
                </Modal>
              </Row>
            </TabPane>
            <TabPane label="业务信息管理" name="name8" v-if="this.$store.state.workOrder.orderBusiPro == '02busprocess'">
              <commonFlowList ref="commonFlowList"></commonFlowList>
            </TabPane>
          </Tabs>

					<div v-if="$store.state.workOrder.onlyRecord">
					</div>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
	import { isSuccess, deepCopy } from '../../../lib/util'
  import commonFlowList from '../commonFlowList/commonFlowList.vue'
	export default{
    data() {
        const validatecmwdEvaluate = (rule, value, callback) => {
            if (value === 0) {
                callback(new Error('请对本次服务评价'))
            } else {
                callback()
            }
        }
      return {
      	divHeight: document.body.offsetHeight - 240,
//    	recordHeight: document.body.offsetHeight - 400,
//    	backHeight: document.body.offsetHeight - 620,
      	formValidate: {
      		cmwdrdDesc: '',
      		cmwdrdConfidentialinfo: '',
      		cmwdrdAttach: '',
      	},
      	ruleValidate: {
      		cmwdrdDesc: [
	          	{ required: true, message: '请填写留言信息', trigger: 'blur' },
	        ],
      	},
      	formValidate2: {
      		cmwdEvaluate: 0,
      		cmwdEvaluatedesc: '',
      		cmwdIssolved: '1',
      	},
      	ruleValidate2: {
      		cmwdEvaluate: [
      			{ validator: validatecmwdEvaluate, trigger: 'blur,change',required: true },
      		],
      	},
      	updName: '',
      	file: '',
      	attachArr: [],
      	attachArr2: [],
      	fileList: [],
      	imgList: [],
      	imgList2: [],
      	filekey: '',
      	fileArr: [],
      	imgItem: '',
      	visible: false,
      	visible2: false,
      	fx: 0,
	    iy: 0,
	    iy2: 0,
	    isSpin: true,
      }
    },
    computed: {
    	allRecordData() {
    		return this.$store.state.workOrder.myCommunRecordData
    	},
		detailMessage() {
			return this.$store.state.workOrder.orderDetail
		},
		backOrEvalu() {
			return this.$store.state.workOrder.lookBackOrEvalu
		},
		current() {
			return this.$store.state.workOrder.stepStaus
		},
		stepTitle1() {
			return this.$store.state.workOrder.stepTitle1
		},
		stepTitle2() {
			return this.$store.state.workOrder.stepTitle2
		},
		stepTitle3() {
			return this.$store.state.workOrder.stepTitle3
		},
		stepTitle4() {
			return this.$store.state.workOrder.stepTitle4
		},
		content1() {
			return this.$store.state.workOrder.content1
		},
		content2() {
			return this.$store.state.workOrder.content2
		},
		content3() {
			return this.$store.state.workOrder.content3
		},
		content4() {
			return this.$store.state.workOrder.content4
		},
    },
    components: {
      commonFlowList
    },
    mounted() {
    	this.getCommunRecordData()
    },
    methods: {
    	//获取沟通记录信息
	        getCommunRecordData() {
	        	const t = this
	        	const data = {
	        		_mt: 'cmutWorkorderrecord.getObject',
	        		logType: '查看记录',
	        		sort: 'id',
	        		order: 'asc',
	        	}
	        	data['cmwdrdWdid'] = t.detailMessage.id
	        	getDataLevelUserLoginNew(data).then((res) => {
                  if (isSuccess(res, t)) {
                   let resData = res.data.content[0].value
                   if (resData) {
                   		for (let i = 0; i < resData.length; i++) {
		                   	if (resData[i].cmwdrdAttach) {
		                   		let attachData = resData[i].cmwdrdAttach.split('|')
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
		                   		res.data.content[0].value[i].cmwdrdAttach = resAttch
		                   	}
		                }
                   }
                   t.$store.commit('workOrder/setMyOrderRecordData', res.data.content[0].value)
                   t.isSpin = false
                 }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
	        },
    	backList() {
    		this.$store.commit('workOrder/setOrderTemp', 'list')
        /*
            点击列表返回清空流程传向后台的字段
        */
        this.$store.state.workOrder.functionId = ''
        this.$store.state.workOrder.cmwdMarkno = ''
        this.$store.state.workOrder.orderBusiPro = ''
        this.$store.state.workOrder.btnShow = ''
    	},
    	endOrder() {
    		const t = this
    		t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: '当您确认工单问题已经得到解决，您可关闭工单。关闭工单后如果有新的问题，您可以提交新的工单咨询',
            onOk: () => {
                const data = {
		        	_mt: 'cmutWorkorderrecord.addOrUpd',
		        	logType: '关闭工单',
		        	cmwdrdWdid: t.detailMessage.id,
		        	cmwdrdFeedback: t.$store.state.user.userId,
		        	cmwdrdFeedbacktype: '2',
		        	orderStatus: '05tobeevaluated',
		        	cmwdrdDesc: '用户前台关闭工单',
		        }
		        for (const dat in data) {
		          if (data[dat] === '') {
		            delete data[dat]
		          }
		        }
		        getDataLevelUserLoginNew(data).then((res) => {
		          if (isSuccess(res, t)) {
		            t.$Notice.success({
		                title: '已结束该工单！',
		            })
		            setTimeout(t.backList(), 2000)
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
    	endOrder2() {
    		const t = this
    		t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: '删除后，您将无法恢复和查看该工单，请谨慎操作',
            onOk: () => {
                const data = {
                    _mt: 'cmutWorkorder.delByIds',
                    logType: '删除工单',
                    delIds: t.detailMessage.id,
                }
                for (const dat in data) {
                    if (data[dat] === '') {
                        delete data[dat]
                    }
                }
                getDataLevelUserLogin(data).then((res) => {
                  if (isSuccess(res, t)) {
                  	t.$Message.success({
		                content: '删除成功！',
		                duration: 3
		            })
                  	setTimeout(t.backList(), 2000)
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
    	////////////上传附件相关函数
		    handleUpload(file) {
		        const t = this
		        if (file.size > 8388608) {
		        	t.$Message.error({
			           content: '文件大小超出最大范围！',
			           duration: 2,
			        })
		        	return false
		        }
		        t.updName = file.name
		        const fileName = file.name
		        let fileType = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()
		        if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
		          t.file = file
		          t.uploadFile1()
		        } else {
		          t.$Message.error({
		           content: '暂不支持该格式文件！',
		           duration: 2,
		          })
		        }
		         return false
		     },
	      uploadFile1() {
	        const t = this
	        const formData = new FormData()
	        let kName
	        let vName
	        let fileType = t.file.name.slice(t.file.name.lastIndexOf('.') + 1).toLowerCase()
	        formData.append('upfile', t.file)
	        uploadFile(formData).then(res => {
	        	for (let i in res.data) {
		            kName = i
		            vName = res.data[i]
		        }
	        	if (t.fileArr.length < 5) {
	        		t.fileArr.push('file') //记录上传数量
	        		if (fileType === 'png' || fileType === 'jpg' || fileType === 'gif' || fileType === 'jpeg') {
	        			t.download(vName)
	        			t.imgList2.push({
	        				fName: kName,
		        			fKey: vName,
		        			index: t.iy2 += 1
	        			})
	        		} else {
	        			t.fileList.push({
		        			fName: kName,
		        			fKey: vName,
		        			index: t.fx += 1
		        		})
	        		}
	        	} else {
	        		this.$Message.warning('最多只能上传5个附件');
	        	}
	        }).catch(() => {
	          t.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
	      },
	      deleteFile(item) {
	      	const t = this
	      	if (item.upUrl) { //图片数组
	      		for (let i = 0; i < t.imgList.length; i++) {
	      			if (item.index === t.imgList[i].index) {
	      				t.imgList.splice(i, 1)
	      				t.imgList2.splice(i, 1)
	      				t.fileArr.splice(0, 1)
	      			}
	      		}
	      	} else { //文件数组
	      		for (let x = 0; x < t.fileList.length; x++) {
	      			if (item.index === t.fileList[x].index) {
	      				t.fileList.splice(x, 1)
	      				t.fileArr.splice(0, 1)
	      			}
	      		}
	      	}
	      },
	      download(vName) {
	      	const t = this
	    		let data = {
		          _mt: 'userMgmt.getfiletoken',
		          isprivate: true,
		          logType: '下载公告消息',
		          filekey: vName,
		          expiresecs: 180,
		        }
		        getDataLevelUserLogin(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	t.imgList.push({
		          		upUrl: pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vName),
		          		index: t.iy += 1
		          	})
		          }
		        }).catch(() => {
		          t.$Modal.error({
		            title: this.$t('reminder.err'),
		            content: this.$t('reminder.errormessage'),
		          })
		        })
	      },
	      download2(vName) {
	      	const t = this
	    		let data = {
		          _mt: 'userMgmt.getfiletoken',
		          isprivate: true,
		          logType: '下载公告消息',
		          filekey: vName,
		          expiresecs: 180,
		        }
		        getDataLevelUserLogin(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	t.imgList.push({
		          		upUrl: pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vName),
		          		index: t.iy += 1
		          	})
		          }
		        }).catch(() => {
		          t.$Modal.error({
		            title: this.$t('reminder.err'),
		            content: this.$t('reminder.errormessage'),
		          })
		        })
	      },
	      lookBig(tItem) {
	      	const t = this
	      	t.imgItem = tItem.upUrl
	      	t.visible = true
	      },
	      lookBig2(tItem) {
	      	const t = this
	      	t.imgItem = tItem.upUrl
	      	t.visible2 = true
	      },
	      submit() {
	      	const t = this
	      	t.attachArr2 = []
	      	t.$refs.formValidate.validate((valid) => {
	          if (valid) {
	          	t.attachArr = t.fileList.concat(t.imgList2)
		      	for (let i = 0; i < t.attachArr.length; i++) {
		      		t.attachArr2.push({
		      			cumtAttach: t.attachArr[i].fName + ':' + t.attachArr[i].fKey
		      		})
		      	}
	          	for (let i = 0; i < t.attachArr2.length; i++) {
	          		t.formValidate.cmwdrdAttach += t.attachArr2[i].cumtAttach + '|'
	          	}
	          	t.formValidate.cmwdrdAttach = t.formValidate.cmwdrdAttach.substring(0, t.formValidate.cmwdrdAttach.length - 1)
	          	const data = deepCopy(t.formValidate)
	          	data['_mt'] = 'cmutWorkorderrecord.addOrUpd'
	          	data['logType'] = '反馈工单'
	          	data['cmwdrdWdid'] = t.detailMessage.id
	          	data['cmwdrdFeedback'] = t.$store.state.user.userId
	          	data['cmwdrdFeedbacktype'] = '2'
	          	if (t.detailMessage.cmwdStatus === '01waiting') {
	          		data['orderStatus'] = '01waiting'
	          	} else {
	          		data['orderStatus'] = '0202open'
	          	}
	          	for (const dat in data) {
	              if (data[dat] === '') {
	                delete data[dat]
	              }
	            }
	          	getDataLevelUserLoginNew(data).then((res) => {
	              if (isSuccess(res, t)) {
	                t.$Message.success({
		                content: '反馈成功，请等待处理！',
		                duration: 3
		            })
	                t.$refs.formValidate.resetFields()
	                t.formValidate.cmwdrdConfidentialinfo = ''
	                t.attachArr = []
			      	t.attachArr2 = []
			      	t.fileList = []
			      	t.imgList = []
			      	t.imgList2 = []
			      	t.fileArr = []
			      	t.getCommunRecordData()
//			      	setTimeout(t.backList(), 2000)
	              }
	            }).catch(() => {
	              t.$Modal.error({
	                title: this.$t('reminder.err'),
	                content: this.$t('reminder.errormessage'),
	              })
	            })
	          }
	        })
	      },
	      submitE() {
	      	const t = this
	      	t.$refs.formValidate2.validate((valid) => {
	          if (valid) {
	          	const data = deepCopy(t.formValidate2)
	          	data['_mt'] = 'cmutWorkorder.addOrUpd'
	          	data['logType'] = '评价工单'
	          	data['id'] = t.detailMessage.id
	          	data['cmwdStatus'] = '06closed'
	          	for (const dat in data) {
	              if (data[dat] === '') {
	                delete data[dat]
	              }
	            }
	          	getDataLevelUserLoginNew(data).then((res) => {
	              if (isSuccess(res, t)) {
	                t.$Message.success({
		                content: '感谢您的评价！',
		                duration: 3
		            })
	                t.$refs.formValidate2.resetFields()
//	                t.getCommunRecordData()
	                setTimeout(t.backList(), 2000)
	              }
	            }).catch(() => {
	              t.$Modal.error({
	                title: this.$t('reminder.err'),
	                content: this.$t('reminder.errormessage'),
	              })
	            })
	          }
	        })
	      },
	      // 沟通记录中附件下载
	      downloadAttach(vname) {
	      	const t = this
    		let data = {
	          _mt: 'userMgmt.getfiletoken',
	          isprivate: true,
	          logType: '下载附件消息',
	          filekey: vname,
	          expiresecs: 180,
	        }
	        getDataLevelUserLogin(data).then((res) => {
	          if (isSuccess(res, t)) {
              localStorage.pageOpenedListAll = localStorage.pageOpenedList
	          	window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vname)
              this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
	          }
	        }).catch(() => {
	          t.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
	      },
        table(name) {
          let t = this
          if (name === 'name8') {
            t.$refs.commonFlowList.getData()
            t.$refs.commonFlowList.getColumns()
          }
        },
    },
  }
</script>

<style lang="scss" scoped>
  .table{
    background: white;
  }
	.pTitle{
		line-height: 30px;
		font-size: 14px;
    width:100px;
    padding: 10px 16px;
    color: #1c2438;
    font-weight:700;
    box-sizing: border-box
	}
	.pTitle2{
		color: #2D8CF0;
		text-align: center;
		line-height: 25px;
		font-size: 14px;
		border: solid 1px #EFEFEF;
		border-radius: 10px;
	}
	.pTitle2:hover{
		cursor: pointer;
		color: #5CADFF;
		border: solid 1px #5CADFF;
		font-size: 15px;
		border-radius: 10px;
	}
	.ivu-steps{
		/*width: 120%;*/
		/*background: #F0F0F0;*/
		line-height: 2;
	}
	.yfpClass{
		background: #D5ECFA;
		font-size: 13px;
		padding: 5px;
		padding-left: 10px;
		padding-right: 20px;
	}
	.yfpClass span{
		line-height: 30px;
		color: #9499A8;
	}
	.qrjd{
		color: #2D8CF0;
		cursor: pointer;
	}
	.divclass{
		overflow: auto;
		/*border: solid 1px #18BE6A;*/
	}
	.commitRecord{
		margin-top: 5px;
		border: solid 1px #CCCCCC;
	}
	.commitRecord img{
		/*display:block;*/
		/*margin:auto;*/
	}
	.commitRecord .div1{
		padding-left: 10px;
		line-height: 32px;
		background: #F0F0F0;
		font-weight: bold;
	}
	.commitRecord .div22{
		/*max-height: 500px;*/
		min-height: 300px;
		overflow-y: auto;
	}
	.commitRecord .div2{
		margin: 10px 60px;
		padding-top: 15px;
		padding-bottom: 5px;
	}
	.commitRecord .div2 + .div2{
		margin: 10px 60px;
		padding-top: 15px;
		padding-bottom: 5px;
		border-top: dashed 1px #CCCCCC;
	}
	.recordP1, .recordP2{
		line-height: 25px;
		font-size: 13px;
		color: #808080;
	}
	.recordP11{
		line-height: 25px;
		font-size: 13px;
		font-weight: bold;
	}
	.wantBack{
		margin-top: 5px;
		border: solid 1px #CCCCCC;
	}
	.wantBack .div1{
		padding-left: 10px;
		line-height: 32px;
		background: #F0F0F0;
		font-weight: bold;
	}
	.wantBack .div2{
		margin-top: 15px;
		margin-left: 60px;
		width: 70%;
	}
	.upBtn button{
		 color: #3399FF;
		 margin-left: 10px;
	}
	.updFJ div img:hover{
		border: dashed 1px #19be6b;
		cursor: pointer;
	}
	.recordAClass{
		margin-right: 10px;
	}
	.recordAClass:hover{
		text-decoration: underline;
	}
	.commitRecord .div22 span img:hover{
		border: dashed 1px #19be6b;
		cursor: pointer;
	}
</style>
