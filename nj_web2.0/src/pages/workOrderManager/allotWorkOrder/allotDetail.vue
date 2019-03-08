<template>
	<div style="background: white;width: 900px;border-radius: 10px;padding: 10px">
		<Row>
      <Row>
        <i-col span="24" style="margin-right: 60px;">
          <p class="pTitle">
							<span>
                 <Icon type="mouse"></Icon>
                &nbsp;{{$t('lang_communication.allotWorkOrder.detailTitle')}}
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
				<Row class="class1" v-if="allotClickDetail.catchOrder">
					<span>{{$t('lang_communication.allotWorkOrder.dealPeople')}}：</span>{{allotClickDetail.catchOrder}}
				</Row>
				<Row class="class2">
					<i-col span="24">
            <Row style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: flex;">
							<span>{{$t('lang_communication.allotWorkOrder.questionTitle')}}：{{allotClickDetail.cmwdDesc}}</span>
						</Row>
						<Row>
							<i-col span="6">
								<span>{{$t('lang_communication.allotWorkOrder.cmwdCode')}}：</span>{{allotClickDetail.cmwdCode}}
							</i-col>
              <i-col span="6">
                <span>{{$t('lang_communication.allotWorkOrder.cmwdProperty')}}：</span>{{allotClickDetail.cmwdPropertyDis}}
              </i-col>
							<i-col span="6">
								<span>{{$t('lang_communication.allotWorkOrder.createTime')}}：</span>{{allotClickDetail.createTime}}
							</i-col>
							<i-col span="6">
								<span>{{$t('lang_communication.allotWorkOrder.cmwdStatus')}}：</span>{{allotClickDetail.cmwdStatusDis}}
							</i-col>
						</Row>
					</i-col>
				</Row>

				<Row class="class22" :style="{height: divHeight + 'px'}">
					<div class="class3">
						<div class="class31">{{$t('lang_communication.allotWorkOrder.cmwdContent')}}</div>
						<Spin fix size="large" v-if="isSpin"></Spin>
						<div class="class32">
							<Row class="classContent">
								<i-col span="1">
									<img src="../../../../static/workOrderImg/commitperson.png" style="width: 65%;"/>
								</i-col>
								<i-col span="23">
									<p class="recordP1">{{allotClickDetail.cmwdAuthorDis}} ： {{$t('lang_communication.allotWorkOrder.cmwdDesc')}} ： {{allotClickDetail.cmwdDesc}}</p>
									<p v-if="allotClickDetail.cmwdAttach">{{$t('lang_communication.allotWorkOrder.cmwdAttach')}}：
										<span v-for="(item2, index2) in allotClickDetail.cmwdAttach" :key="index2">
											<img v-if="item2.kType === 'jpg' || item2.kType === 'gif' || item2.kType === 'png' || item2.kType === 'jpeg'" :src="item2.upUrl" style="width: 50px;height: 50px;margin-right: 10px;" @click="lookBig2(item2)">
											<a v-else class="recordAClass" @click="downloadAttach(item2.vname)">{{item2.kname}}</a>
										</span>
									</p>
									<p class="recordP1" v-if="allotClickDetail.cmwdConfidentialinfo">{{$t('lang_communication.allotWorkOrder.cmwdConfidentialinfo')}}：***********</p>
									<p class="recordP2">{{allotClickDetail.createTime}}</p>
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
									<p class="recordP11" v-if="item.cmwdrdFeedbacktype === '0' || item.cmwdrdFeedbacktype === '1'">{{$t('lang_communication.allotWorkOrder.handlePeople')}}{{item.handlePeople}}{{$t('lang_communication.allotWorkOrder.number')}} ： {{item.cmwdrdDesc}}</p>
									<p v-if="item.cmwdrdAttach">{{$t('lang_communication.allotWorkOrder.cmwdrdAttach')}}：
										<span v-for="(item2, index2) in item.cmwdrdAttach" :key="index2">
											<img v-if="item2.kType === 'jpg' || item2.kType === 'gif' || item2.kType === 'png' || item2.kType === 'jpeg'" :src="item2.upUrl" style="width: 50px;height: 50px;margin-right: 10px;" @click="lookBig2(item2)">
											<a v-else class="recordAClass" @click="downloadAttach(item2.vname)">{{item2.kname}}</a>
										</span>
									</p>
									<p class="recordP2">{{item.createTime}}</p>
								</i-col>
							</Row>
							<Modal :title="$t('lang_communication.allotWorkOrder.browerImage')" v-model="visible2" width="600" :styles="{top: '20px'}">
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
	      	visible2: false,
	      	isSpin: true,
	      }
	    },
	    computed: {
	    	allRecordData() {
	    		return this.$store.state.workOrder.allotCommunRecordData
	    	},
	    	allotClickDetail() {
	    		return this.$store.state.workOrder.allotClickDetail
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
        	data['cmwdrdWdid'] = t.allotClickDetail.id
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
               t.$store.commit('workOrder/setAllotRecordData', res.data.content[0].value)
               t.isSpin = false
             }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
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
	      lookBig2(tItem) {
	      	const t = this
	      	t.imgItem = tItem.upUrl
	      	t.visible2 = true
	      },
        backList() {
          this.$store.commit('workOrder/setAllotDetail', true)
        },
	    },
	}
</script>

<style lang="scss" scoped>
	.class1{
		line-height: 32px;
		border: solid 1px #DADADA;
		background: #F0F0F0;
		padding-left: 10px;
		margin-bottom: 10px;
	}
	.class1 span{
		color: #9499A8;
	}
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
</style>
