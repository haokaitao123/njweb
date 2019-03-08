<template>
	<div class="table">
		<Row>
			<Col span="24">
				<Row>
					<i-col span="24" style="margin-right: 60px;">
						<p class="pTitle">
							<span>
                 <Icon type="mouse"></Icon>
                &nbsp;{{$t('lang_communication.workorderSearch.detailTitle')}}
              </span>
              <Button type="text"  @click="close">
                <Icon type="close-round" size="16"></Icon>
              </Button>
						</p>
					</i-col>
				</Row>
      <div class="tableList" :style="{height:tableheight + 'px'}">
				<Row style="margin-top: 10px;margin-left: 15px">
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
							<span>{{$t('lang_communication.workorderSearch.orderTitle')}}：</span>{{detailMessage.cmwdDesc}}
						</Row>
						<Row>
							<i-col span="5">
								<span>{{$t('lang_communication.workorderSearch.cmwdCode')}}：</span>{{detailMessage.cmwdCode}}
							</i-col>
							<i-col span="8">
								<span>{{$t('lang_communication.workorderSearch.createTime')}}：</span>{{detailMessage.createTime}}
							</i-col>
							<i-col span="8">
								<span>{{$t('lang_communication.workorderSearch.cmwdStatus')}}：</span>{{detailMessage.cmwdStatusDis}}
							</i-col>
							<i-col span="3" style="text-align: end;" v-if="backOrEvalu">
								<div class="qrjd" @click="endOrder">{{$t('lang_communication.workorderSearch.endOrder')}}</div>
							</i-col>
							<!--<i-col span="3" style="text-align: end;" v-if="!backOrEvalu">
								<div class="qrjd" @click="endOrder2">删除工单</div>
							</i-col>-->
						</Row>
					</i-col>
				</Row>
        <Row>
          <Row :style="{height: divHeight + 'px'}" class="divclass">
            <div class="commitRecord" >
              <div class="div1">{{$t('lang_communication.workorderSearch.cmwdRecord')}}</div>
              <Spin fix size="large" v-if="isSpin"></Spin>
              <div class="div22">
                <Row class="div2">
                  <i-col span="1">
                    <img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
                  </i-col>
                  <i-col span="23">
                    <p class="recordP1">{{detailMessage.cmwdAuthorDis}} ： {{$t('lang_communication.workorderSearch.cmwdDesc')}} ： {{detailMessage.cmwdDesc}}</p>
                    <p v-if="detailMessage.cmwdAttach">{{$t('lang_communication.workorderSearch.cmwdAttach')}}：
                      <span v-for="(item2, index2) in detailMessage.cmwdAttach" :key="index2">
												<img v-if="item2.kType === 'jpg' || item2.kType === 'gif' || item2.kType === 'png' || item2.kType === 'jpeg'" :src="item2.upUrl" style="width: 50px;height: 50px;margin-right: 10px;" @click="lookBig2(item2)">
												<a v-else class="recordAClass" @click="downloadAttach(item2.vname)">{{item2.kname}}</a>
											</span>
                    </p>
                    <p class="recordP1" v-if="detailMessage.cmwdConfidentialinfo">{{$t('lang_communication.workorderSearch.cmwdrdConfidentialinfo')}}：***********</p>
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
                    <!--{{item.cmwdrdDistype}}-->
                    <p class="recordP1" v-if="item.cmwdrdFeedbacktype === '2'">{{item.handlePeople}} ： {{item.cmwdrdDesc}}</p>
                    <p class="recordP11" v-if="item.cmwdrdFeedbacktype === '0' || item.cmwdrdFeedbacktype === '1'">{{$t('lang_communication.workorderSearch.handlePeople')}}{{item.handlePeople}}{{$t('lang_communication.workorderSearch.number')}} : {{item.cmwdrdDesc}}</p>
                    <p v-if="item.cmwdrdAttach">{{$t('lang_communication.workorderSearch.cmwdrdAttach')}}：
                      <span v-for="(item2, index2) in item.cmwdrdAttach" :key="index2">
												<img v-if="item2.kType === 'jpg' || item2.kType === 'gif' || item2.kType === 'png' || item2.kType === 'jpeg'" :src="item2.upUrl" style="width: 50px;height: 50px;margin-right: 10px;" @click="lookBig2(item2)">
												<a v-else class="recordAClass" @click="downloadAttach(item2.vname)">{{item2.kname}}</a>
											</span>
                    </p>
                    <p class="recordP1" v-if="item.cmwdrdConfidentialinfo">{{$t('lang_communication.workorderSearch.cmwdrdConfidentialinfo')}} ：***********</p>
                    <p class="recordP2">{{item.createTime}}</p>
                  </i-col>
                </Row>
                <Row class="div2" v-if="detailMessage.cmwdEvaluate">
                  <i-col span="1">
                    <img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
                  </i-col>
                  <i-col span="23">
                    <p class="recordP1">{{detailMessage.cmwdAuthorDis}} ：{{$t('lang_communication.workorderSearch.evaluated')}}</p>
                    <p class="recordP1">{{$t('lang_communication.workorderSearch.cmwdEvaluate')}} ： {{detailMessage.cmwdEvaluate}}{{$t('lang_communication.workorderSearch.level')}}</p>
                    <p class="recordP1">{{$t('lang_communication.workorderSearch.cmwdIssolved')}} ： {{detailMessage.cmwdIssolvedDis}}</p>
                    <p class="recordP1">{{$t('lang_communication.workorderSearch.cmwdEvaluatedesc')}} ： {{detailMessage.cmwdEvaluatedesc}}</p>
                    <p class="recordP2">{{detailMessage.updateTime}}</p>
                  </i-col>
                </Row>

              </div>
            </div>
            <Modal :title="$t('lang_communication.workorderSearch.browerImage')" v-model="visible2" width="600" :styles="{top: '20px'}">
              <img :src="imgItem" v-if="visible2" style="width: 100%">
              <div slot="footer">
                <div style="display: flex;justify-content: flex-end;">
					        		<span>
					        			<Button type="primary" @click="visible2 = false">{{$t('button.clo')}}</Button>
					        		</span>
                </div>
              </div>
            </Modal>
            <div v-if="$store.state.workOrder.onlyRecord">
              <Row v-if="backOrEvalu">

                <div class="wantBack" v-if="this.$store.state.workOrder.orderBusiPro !== '02busprocess'">
                  <div class="div1">{{$t('lang_communication.workorderSearch.IfeedBack')}}</div>
                  <div class="div2">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                      <Row>
                        <FormItem :label="$t('lang_communication.workorderSearch.Message')" prop="cmwdrdDesc" style="margin-bottom: 5px">
                          <Input  type="textarea"  v-model="formValidate.cmwdrdDesc" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_communication.workorderSearch.cmwdrdDescDis')"></Input>
                        </FormItem>
                      </Row>
                      <Row>
                        <FormItem :label="$t('lang_communication.workorderSearch.cmwdrdConfidentialinfoNo')" style="margin-bottom: 5px">
                          <Input  type="textarea" v-model="formValidate.cmwdrdConfidentialinfo" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_communication.workorderSearch.cmwdrdConfidentialinfoDis')"></Input>
                        </FormItem>
                      </Row>

                      <Row>
                        <FormItem :label="$t('lang_communication.workorderSearch.UploadAttach')" class="updFJ" style="margin-bottom: 5px">
                          <Upload action="1" :before-upload="handleUpload">
                            <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('lang_communication.workorderSearch.UploadAttach')}}</Button>
                          </Upload>
                          <div v-for="(item,index) in fileList" class="upBtn" :key="index">
                            {{item.fName}}
                            <Button type="text" size="small" @click="deleteFile(item)">{{$t('button.del')}}</Button>
                          </div>
                          <div v-for="(item,index) in imgList" class="upBtn" :key="index">
                            <img :src="item.upUrl" style="width: 50px;height: 50px;" @click="lookBig(item)">
                            <Button type="text" size="small" @click="deleteFile(item)">{{$t('button.del')}}</Button>
                          </div>
                          <div style="color: firebrick;height: 22px;">{{$t('lang_communication.workorderSearch.uploadCondition1')}}</div>
                          <div style="height: 22px;color: #808080;">{{$t('lang_communication.workorderSearch.uploadCondition2')}}：'jpg','gif','png','jpeg','txt','doc','docx','xlsx','xls','pdf'</div>
                        </FormItem>
                      </Row>

                      <Row>
                        <FormItem style="margin-bottom: 5px">
                          <Button type="primary" @click="submit">{{$t('button.subm')}}</Button>
                        </FormItem>
                      </Row>
                      <Modal :title="$t('lang_communication.workorderSearch.browerImage')" v-model="visible" width="600" :styles="{top: '20px'}">
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

              <Row v-if="!backOrEvalu">
                <div class="wantBack" v-if="this.$store.state.workOrder.orderBusiPro !== '02busprocess'">
                  <div class="div1">{{$t('lang_communication.workorderSearch.waitEvaluate')}}</div>
                  <div class="div2">
                    <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="100">
                      <Row>
                        <FormItem :label="$t('lang_communication.workorderSearch.cmwdEvaluate')" prop="cmwdEvaluate">
                          <Rate v-model="formValidate2.cmwdEvaluate"></Rate>
                          <div>
                            <Tag color="yellow" v-if="formValidate2.cmwdEvaluate === 1">{{$t('lang_communication.workorderSearch.cmwdEvaluate1')}}</Tag>
                            <Tag color="yellow" v-if="formValidate2.cmwdEvaluate > 1">{{$t('lang_communication.workorderSearch.cmwdEvaluate2')}}</Tag>
                            <Tag color="yellow" v-if="formValidate2.cmwdEvaluate > 2">{{$t('lang_communication.workorderSearch.cmwdEvaluate3')}}</Tag>
                            <Tag color="yellow" v-if="formValidate2.cmwdEvaluate > 3">{{$t('lang_communication.workorderSearch.cmwdEvaluate4')}}</Tag>
                            <Tag color="yellow" v-if="formValidate2.cmwdEvaluate > 4">{{$t('lang_communication.workorderSearch.cmwdEvaluate5')}}</Tag>
                          </div>
                        </FormItem>
                      </Row>
                      <Row>
                        <FormItem :label="$t('lang_communication.workorderSearch.cmwdIssolved')">
                          <RadioGroup v-model="formValidate2.cmwdIssolved">
                            <Radio label="1">{{$t('lang_communication.workorderSearch.solved')}}</Radio>
                            <Radio label="0">{{$t('lang_communication.workorderSearch.nosolve')}}</Radio>
                          </RadioGroup>
                        </FormItem>
                      </Row>
                      <Row>
                        <FormItem :label="$t('lang_communication.workorderSearch.IfeedBack')">
                          <Input  type="textarea" v-model="formValidate2.cmwdEvaluatedesc" :autosize="{minRows: 3,maxRows: 6}" :placeholder="$t('lang_communication.workorderSearch.cmwdEvaluatedescDis')"></Input>
                        </FormItem>
                      </Row>
                      <Row>
                        <FormItem>
                          <Button type="primary" @click="submitE">{{$t('button.subm')}}</Button>
                        </FormItem>
                      </Row>
                    </Form>
                  </div>
                </div>
              </Row>
            </div>
          </Row>
        </Row>
      </div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
	import { isSuccess, deepCopy } from '../../../lib/util'
//  import commonFlowList from '../commonFlowList/commonFlowList.vue'
  import Bus from '../bus'
	export default{
    data() {
        const validatecmwdEvaluate = (rule, value, callback) => {
            if (value === 0) {
                callback(new Error(this.$t('lang_communication.workorderSearch.errorRemind1')))
            } else {
                callback()
            }
        }
      return {
        tableheight: document.body.offsetHeight - 140,
        divHeight: document.body.offsetHeight - 300,
        boxleheight: document.body.offsetHeight - 100,
//    	recordHeight: document.body.offsetHeight - 400,
//    	backHeight: document.body.offsetHeight - 620,
      	formValidate: {
      		cmwdrdDesc: '',
      		cmwdrdConfidentialinfo: '',
      		cmwdrdAttach: '',
      	},
      	ruleValidate: {
      		cmwdrdDesc: [
	          	{ required: true, message: this.$t('lang_communication.workorderSearch.messageDis'), trigger: 'blur' },
	        ],
      	},
      	formValidate2: {
      		cmwdEvaluate: 0,
      		cmwdEvaluatedesc: '',
      		cmwdIssolved: '1',
      	},
      	ruleValidate2: {
      		cmwdEvaluate: [
      			{ validator: validatecmwdEvaluate, trigger: 'blur,change', required: true },
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
      list() {
        return this.$store.state.workOrder.issueListDataOneList
      },
    },
    components: {
//      commonFlowList,
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
            dian
        */
        this.$store.state.workOrder.functionId = ''
        this.$store.state.workOrder.cmwdMarkno = ''
        this.$store.state.workOrder.orderBusiPro = ''
    	},
    	endOrder() {
    		const t = this
    		t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_communication.workorderSearch.confirmRemind1'),
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
		                title: this.$t('lang_communication.workorderSearch.successRemind1'),
		            })
                this.$refs.formValidate.resetFields()
                t.getWorkorderById()
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
      // 通过id获取工单信息
      getWorkorderById() {
        const t = this
        const data = {
          _mt: 'cmutWorkorder.getById',
          logType: '根据id查询工单',
          funId: '0',
          id: t.detailMessage.id,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            let redData = res.data.content[0]
            setTimeout(t.backList(), 2000)
            t.$emit('getData')
            t.$emit('getTotal')
            t.$emit('lookDetailNew', redData)
            this.getCommunRecordData()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    	endOrder2() {
    		const t = this
    		t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_communication.workorderSearch.confirmRemind2'),
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
		                content: this.$t('lang_communication.workorderSearch.successRemind2'),
		                duration: 3,
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
			           content: this.$t('lang_communication.workorderSearch.errorRemind2'),
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
		           content: this.$t('lang_communication.workorderSearch.errorRemind3'),
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
		        			index: t.iy2 += 1,
	        			})
	        		} else {
	        			t.fileList.push({
		        			fName: kName,
		        			fKey: vName,
		        			index: t.fx += 1,
		        		})
	        		}
	        	} else {
	        		this.$Message.warning(this.$t('lang_communication.workorderSearch.uploadCondition1'))
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
	      	if (item.upUrl) { // 图片数组
	      		for (let i = 0; i < t.imgList.length; i++) {
	      			if (item.index === t.imgList[i].index) {
	      				t.imgList.splice(i, 1)
	      				t.imgList2.splice(i, 1)
	      				t.fileArr.splice(0, 1)
	      			}
	      		}
	      	} else { // 文件数组
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
		                content: this.$t('lang_communication.workorderSearch.successRemind3'),
		                duration: 3,
		            })
                  this.getCommunRecordData()
	                t.$refs.formValidate.resetFields()
	                t.formValidate.cmwdrdConfidentialinfo = ''
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
		                content: this.$t('lang_communication.workorderSearch.successRemind4'),
		                duration: 3
		            })
                  t.getWorkorderById()
	                t.$refs.formValidate2.resetFields()
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
	      //沟通记录中附件下载
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
              localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
              if (this.isIE()) {
                window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vname)
              } else {
                let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vname)
                let link = document.createElement('a')
                link.href = doclink
                link.download = 'downloadfiletemp'
                link.click()
              }
              this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
              localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
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
      close() {
        Bus.$emit('orderDetailList')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .table{
    width:900px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    .tableList{
      width:100%;
      /*overflow-y: scroll;*/
      border:2px solid rgb(240, 240, 240);
    }
  }
	.pTitle{
		line-height: 30px;
		font-size: 14px;
    /*width:100px;*/
    padding: 10px 16px;
    color: #1c2438;
    font-weight:700;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
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
    padding-top: 5px;
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
		/*min-height: 300px;*/
		overflow-y: auto;
	}
	.commitRecord .div2{
		margin: 10px 60px;
		/*padding-top: 15px;*/
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
