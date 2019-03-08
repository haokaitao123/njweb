<template>
	<div style="background: white;width: 900px;border-radius: 10px;padding: 10px">
		<Row>
      <Row>
        <i-col span="24" style="margin-right: 60px;">
          <p class="pTitle">
							<span>
                 <Icon type="mouse"></Icon>
                &nbsp;{{$t('lang_communication.handleWorkOrder.detailTitle')}}
              </span>
            <Button type="text"  @click="backList">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </p>
        </i-col>
        <!--<i-col span="2" style="margin-top: 15px;">-->
        <!--&lt;!&ndash;<div class="pTitle2" @click="backList">-->
        <!--<Icon type="ios-undo-outline" style="margin-right: 5px;" size="16"></Icon>返回列表-->
        <!--</div>		&ndash;&gt;-->
        <!--&lt;!&ndash;<Button type="ghost" shape="circle" icon="ios-undo-outline" size="small" @click="backList">返回列表</Button>&ndash;&gt;-->
        <!--</i-col>-->
      </Row>
			<i-col span="24">
				<Row class="class2">
					<i-col span="24">
            <Row style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: flex;">
              <span>{{$t('lang_communication.handleWorkOrder.questionTitle')}}：{{handleClickDetail.cmwdDesc}}</span>
            </Row>
						<Row>
              <i-col span="6">
								<span>{{$t('lang_communication.handleWorkOrder.cmwdCode')}}：</span>{{handleClickDetail.cmwdCode}}
							</i-col>
              <i-col span="6">
								<span>{{$t('lang_communication.handleWorkOrder.cmwdProperty')}}：</span>{{handleClickDetail.cmwdPropertyDis}}
							</i-col>
							<i-col span="6">
								<span>{{$t('lang_communication.handleWorkOrder.createTime')}}：</span>{{handleClickDetail.createTime}}
							</i-col>
							<i-col span="6">
								<span>{{$t('lang_communication.handleWorkOrder.cmwdStatus')}}：</span>{{handleClickDetail.cmwdStatusDis}}
							</i-col>
						</Row>
					</i-col>
				</Row>

				<Row class="class22" :style="{height: divHeight + 'px'}">
					<div class="class3">
						<div class="class31">{{$t('lang_communication.handleWorkOrder.cmwdContent')}}</div>
						<Spin fix size="large" v-if="isSpin"></Spin>
						<div class="class32">
							<Row class="classContent">
								<i-col span="1">
									<img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
								</i-col>
								<i-col span="23">
									<p class="recordP1">{{handleClickDetail.cmwdAuthorDis}} ： {{$t('lang_communication.handleWorkOrder.cmwdDesc')}} ： {{handleClickDetail.cmwdDesc}}</p>
									<p v-if="handleClickDetail.cmwdAttach">{{$t('lang_communication.handleWorkOrder.cmwdAttach')}}：
										<span v-for="(item2, index2) in handleClickDetail.cmwdAttach" :key="index2">
											<img v-if="item2.kType === 'jpg' || item2.kType === 'gif' || item2.kType === 'png' || item2.kType === 'jpeg'" :src="item2.upUrl" style="width: 50px;height: 50px;margin-right: 10px;" @click="lookBig2(item2)">
											<a v-else class="recordAClass" @click="downloadAttach(item2.vname)">{{item2.kname}}</a>
										</span>
									</p>
									<p class="recordP1" v-if="handleClickDetail.cmwdConfidentialinfo">{{$t('lang_communication.handleWorkOrder.cmwdConfidentialinfo')}}：***********</p>
									<p class="recordP2">{{handleClickDetail.createTime}}</p>
								</i-col>
							</Row>
							<Row class="classContent" v-for="(item, index) in allRecordData" :key="index">
									<!--循环体-->
								<i-col span="1" v-if="item.cmwdrdFeedbacktype === '0' || item.cmwdrdFeedbacktype === '1'">
									<img src="../../../../static/workOrderImg/allotperson.png" style="width: 65%;"/>
								</i-col>
								<i-col span="1" v-if="item.cmwdrdFeedbacktype === '2'">
									<img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
								</i-col>
								<i-col span="23">
									<p class="recordP1" v-if="item.cmwdrdFeedbacktype === '2'">{{item.handlePeople}} ： {{item.cmwdrdDesc}}</p>
									<p class="recordP11" v-if="item.cmwdrdFeedbacktype === '0' || item.cmwdrdFeedbacktype === '1'">{{$t('lang_communication.handleWorkOrder.handlePeople')}}{{item.handlePeople}}{{$t('lang_communication.handleWorkOrder.number')}} ： {{item.cmwdrdDesc}}</p>
									<p v-if="item.cmwdrdAttach">{{$t('lang_communication.handleWorkOrder.cmwdrdAttach')}}：
										<span v-for="(item2, index2) in item.cmwdrdAttach" :key="index2">
											<img v-if="item2.kType === 'jpg' || item2.kType === 'gif' || item2.kType === 'png' || item2.kType === 'jpeg'" :src="item2.upUrl" style="width: 50px;height: 50px;margin-right: 10px;" @click="lookBig2(item2)">
											<a v-else class="recordAClass" @click="downloadAttach(item2.vname)">{{item2.kname}}</a>
										</span>
									</p>
									<p class="recordP2">{{item.createTime}}</p>
								</i-col>
							</Row>
							<Row class="classContent" v-if="handleClickDetail.cmwdEvaluate">
								<i-col span="1">
									<img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
								</i-col>
								<i-col span="23">
									<p class="recordP1">{{handleClickDetail.cmwdAuthorDis}} ：{{$t('lang_communication.handleWorkOrder.evaluated')}}</p>
									<p class="recordP1">{{$t('lang_communication.handleWorkOrder.cmwdEvaluate')}} ： {{handleClickDetail.cmwdEvaluate}}{{$t('lang_communication.handleWorkOrder.level')}}</p>
									<p class="recordP1">{{$t('lang_communication.handleWorkOrder.cmwdIssolved')}} ： {{handleClickDetail.cmwdIssolvedDis}}</p>
									<p class="recordP1">{{$t('lang_communication.handleWorkOrder.cmwdEvaluatedesc')}} ： {{handleClickDetail.cmwdEvaluatedesc}}</p>
									<p class="recordP2">{{handleClickDetail.updateTime}}</p>
								</i-col>
							</Row>
						</div>
						<Modal :title="$t('lang_communication.handleWorkOrder.browerImage')" v-model="visible2" width="600" :styles="{top: '20px'}">
					        <img :src="imgItem" v-if="visible2" style="width: 100%">
					        <div slot="footer">
					        	<div style="display: flex;justify-content: flex-end;">
					        		<span>
					        			<Button type="primary" @click="visible2 = false">{{$t('button.clo')}}</Button>
					        		</span>
					        	</div>
					        </div>
					    </Modal>
					</div>
					<div class="class4" v-show="$store.state.workOrder.isYesHandle">
						<div class="class41">{{$t('lang_communication.handleWorkOrder.feedback')}}</div>
						<div class="class42">
							<Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
								<Row>
									<FormItem :label="$t('lang_communication.handleWorkOrder.Message')" prop="cmwdrdDesc">
										<Input  type="textarea" v-model="formValidate.cmwdrdDesc" :autosize="{minRows: 3,maxRows: 10}" :placeholder="$t('lang_communication.handleWorkOrder.MessageDis')"></Input>
									</FormItem>
								</Row>
								<!--<Row>
									<FormItem label="机密信息(非必填项)">
										<Input  type="textarea" v-model="formValidate.cmwdrdConfidentialinfo" :autosize="{minRows: 2,maxRows: 5}" placeholder="请在此处填写实例名、账号、密码等机密信息,提交后机密信息将做加密处理..."></Input>
									</FormItem>
								</Row>-->

								<Row>
									<FormItem :label="$t('lang_communication.handleWorkOrder.UploadAttach') + '：'" class="updFJ">
										<Upload action="1" :before-upload="handleUpload">
									        <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('lang_communication.handleWorkOrder.UploadAttach')}}</Button>
									    </Upload>
										    <div v-for="(item,index) in fileList" class="upBtn" :key="index">
										    	{{item.fName}}
										    	<Button type="text" size="small" @click="deleteFile(item)">{{$t('button.del')}}</Button>
										    </div>
											<div v-for="(item,index) in imgList" class="upBtn" :key="index">
										    	<img :src="item.upUrl" style="width: 50px;height: 50px;" @click="lookBig(item)">
										    	<Button type="text" size="small" @click="deleteFile(item)">{{$t('button.del')}}</Button>
										    </div>
										<div style="color: firebrick;height: 22px;">{{$t('lang_communication.handleWorkOrder.uploadCondition1')}}</div>
										<div style="height: 22px;color: #808080;">{{$t('lang_communication.handleWorkOrder.uploadCondition2')}}</div>
									</FormItem>
								</Row>

								<Row v-show="$store.state.workOrder.isCommit">
									<FormItem>
										<Button type="primary" @click="submit($t('lang_communication.handleWorkOrder.back'))">{{$t('button.subm')}}</Button>
									</FormItem>
								</Row>
								<Row v-show="!$store.state.workOrder.isCommit">
									<FormItem>
										<Button type="primary" @click="submit($t('lang_communication.handleWorkOrder.back'))">{{$t('lang_communication.handleWorkOrder.waitBack')}}</Button>
										<Button type="primary" @click="submit($t('lang_communication.handleWorkOrder.confirm'))">{{$t('lang_communication.handleWorkOrder.waitConfirm')}}</Button>
									</FormItem>
								</Row>
								<Modal :title="$t('lang_communication.handleWorkOrder.browerImage')" v-model="visible" width="600" :styles="{top: '20px'}">
							        <img :src="imgItem" v-if="visible" style="width: 100%">
							        <div slot="footer">
							        	<div style="display: flex;justify-content: flex-end;">
							        		<span>
							        			<Button type="primary" @click="visible = false">{{$t('button.clo')}}</Button>
							        		</span>
							        	</div>
							        </div>
							    </Modal>
							</Form>
						</div>
					</div>
				</Row>
			</i-col>
		</Row>
	</div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
	import { isSuccess, deepCopy } from '../../../lib/util'

	export default{
	    data() {
	      return {
	      	divHeight: document.body.offsetHeight - 220,
	      	formValidate: {
	      		cmwdrdDesc: '',
//    			cmwdrdConfidentialinfo: '',
      			cmwdrdAttach: '',
	      	},
	      	ruleValidate: {
	      		cmwdrdDesc: [
		          	{ required: true, message: this.$t('lang_communication.handleWorkOrder.MessageDis'), trigger: 'blur' },
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
	    		return this.$store.state.workOrder.handleCommunRecordData
	    	},
			handleClickDetail() {
				return this.$store.state.workOrder.handleClickDetail
			},
	    },
	    components: {
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
        	data['cmwdrdWdid'] = t.handleClickDetail.id
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
               t.$store.commit('workOrder/setHandleRecordData', res.data.content[0].value)
               t.isSpin = false
             }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
	    	////////////上传附件相关函数
		    handleUpload(file) {
		        const t = this
		        if (file.size > 8388608) {
		        	t.$Message.error({
			           content: this.$t('lang_communication.handleWorkOrder.errReminder'),
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
		           content: this.$t('lang_communication.handleWorkOrder.errReminder2'),
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
	        		this.$Message.warning(this.$t('lang_communication.handleWorkOrder.errReminder'))
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
	      submit(oStatus) {
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
	          	data['cmwdrdWdid'] = t.handleClickDetail.id
	          	data['cmwdrdFeedback'] = t.$store.state.user.userId
	          	data['cmwdrdFeedbacktype'] = '1'
	          	if (oStatus === this.$t('lang_communication.handleWorkOrder.back')) {
	          		data['orderStatus'] = '03tobefeedback'
	          	} else if (oStatus === this.$t('lang_communication.handleWorkOrder.confirm')) {
	          		data['orderStatus'] = '04tobeconfirmed'
	          	}
	          	for (const dat in data) {
	              if (data[dat] === '') {
	                delete data[dat]
	              }
	            }
	          	getDataLevelUserLoginNew(data).then((res) => {
	              if (isSuccess(res, t)) {
	                t.$Message.success({
		                content: this.$t('lang_communication.handleWorkOrder.backSuccess'),
		                duration: 3
		            })
	                t.getCommunRecordData()
	                t.$refs.formValidate.resetFields()
//	                t.formValidate.cmwdrdConfidentialinfo = ''
	                t.attachArr = []
			      	t.attachArr2 = []
			      	t.fileList = []
			      	t.imgList = []
			      	t.imgList2 = []
			      	t.fileArr = []
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
	          	window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vname)
	          }
	        }).catch(() => {
	          t.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
	      },
        backList() {
          this.$store.commit('workOrder/setHandleDetail', true)
        },
	    },
	}
</script>

<style lang="scss" scoped>
	/*.class1{
		line-height: 32px;
		border: solid 1px #DADADA;
		background: #F0F0F0;
		padding-left: 10px;
		margin-bottom: 10px;
	}
	.class1 span{
		color: #9499A8;
	}*/
	.class2{
		background: #D5ECFA;
		padding-left: 10px;
		margin-bottom: 10px;
	}
	.class2 span{
		color: #9499A8;
		line-height: 32px;
    flex: auto;
	}
	.class22{
		/*border: solid 1px #18BE6A;*/
		overflow: auto;
	}
	.class3{
		border: solid 1px #DADADA;
	}
	.class31{
		padding-left: 10px;
		line-height: 32px;
		background: #F0F0F0;
		font-weight: bold;
	}
	.class32{
		min-height: 200px;
		/*max-height: 550px;*/
		overflow-y: auto;
	}
	.class4{
		border: solid 1px #DADADA;
		margin-top: 10px;
	}
	.class41{
		padding-left: 10px;
		line-height: 32px;
		background: #F0F0F0;
		font-weight: bold;
	}
	.class42{
		width: 70%;
		padding: 20px 20px 20px 40px;
	}
	.upBtn button{
		 color: #3399FF;
		 margin-left: 10px;
	}
	.updFJ div img:hover{
		border: dashed 1px #19be6b;
		cursor: pointer;
	}
	.classContent{
		margin: 10px 60px;
		padding-top: 15px;
		padding-bottom: 5px;
	}
	.classContent + .classContent{
		margin: 10px 60px;
		padding-top: 15px;
		padding-bottom: 5px;
		border-top: dashed 1px #CCCCCC;
	}
	.recordP1, .recordP2{
		line-height: 20px;
		font-size: 13px;
		color: #808080;
	}
	.recordP11{
		line-height: 20px;
		font-size: 13px;
		font-weight: bold;
	}
	.recordAClass{
		margin-right: 10px;
	}
	.recordAClass:hover{
		text-decoration: underline;
	}
	.classContent span img:hover{
		border: dashed 1px #19be6b;
		cursor: pointer;
	}
  .pTitle{
    line-height: 30px;
    font-size: 14px;
    /*width:100px;*/
    padding-bottom: 10px;
    color: #1c2438;
    font-weight:700;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
</style>
