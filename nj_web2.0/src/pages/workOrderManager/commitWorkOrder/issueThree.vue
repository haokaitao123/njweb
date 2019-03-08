<template>
	<div>
		<Row>
			<i-col span="24" class="hIssue">
				<div>{{$t('lang_communication.commitWorkOrder.step2Title')}}</div>
			</i-col>
		</Row>
		<Row :gutter="20">
			<i-col span="8">
				<div class="divBox" >
          <p style="font-size: 14px"  v-if="this.$store.state.workOrder.childShow">{{this.$store.state.workOrder.cmutKntypeName}}</p>
          <p style="font-size: 14px" :class="{ChildissueListData : DataNum === index }"  v-for="item,index in ChildissueListData" @click="sureData(index)">{{item.cmutKntypeName}}</p>
        </div>
			</i-col>
			<i-col span="16">
				<div :style="{height:answerBoxheight + 'px'}" class="answer">
					<div class="answerBox">
						<div class="answerTitle">{{$t('lang_communication.commitWorkOrder.hotArticle')}}</div>
							<div class="answerList" v-for="item in this.$store.state.workOrder.ChildHotIssueData" @click="selectDetail(item)">
                {{item.cmutKldTitle}}
							</div>
					</div>
					<div class="quickCommit">
						<div class="quickTitle">
              {{$t('lang_communication.commitWorkOrder.quickTitle')}}
						</div>
						<div class="quickIcon" @click="commitWOrder">
							<div class="quickIcon2">
								<Icon type="clipboard" size="40"></Icon>
							</div>
							<div class="quickIcon2">
								<p style="font-weight: bold;font-size: 14px;">{{$t('lang_communication.commitWorkOrder.title')}}</p>
								<p>{{$t('lang_communication.commitWorkOrder.label1')}}</p>
							</div>
						</div>
						<div class="quickIcon" @click="openIM">
							<div class="quickIcon2">
								<Icon type="social-buffer" size="40"></Icon>
							</div>
							<div class="quickIcon2">
								<p style="font-weight: bold;font-size: 14px;">{{$t('lang_communication.commitWorkOrder.onlineQues')}}</p>
								<p>{{$t('lang_communication.commitWorkOrder.label2')}}</p>
							</div>
						</div>
					</div>
				</div>
			</i-col>
      <Modal
        v-model="modal2"
        :title="modalTitle"
        width="1000">
        <div :style="{height:divheight + 'px',overflow:'auto'}">
          <!--<span style="font-size: 15px;color: #9499A8;">
                更新时间：{{updateTime}}
            </span>-->
          <div id="divContent" v-html="divContent"></div>
        </div>
        <div slot="footer">
          <div style="display: flex;justify-content: space-between;">
        		<span style="font-size: 16px;font-weight: bold;">
        			{{$t('lang_communication.commitWorkOrder.attach')}}<a @click="download">{{clickDown}}</a></span>
            </span>
            <span v-show="false">{{filekey}}</span>
            <span>
        			<Button type="primary" @click="modal2 = false">{{$t('button.clo')}}</Button>
        		</span>
          </div>
        </div>
      </Modal>
		</Row>

		<transition name="fade">
	    	 <loginim v-show="showIM" ref="loginim"></loginim>
	    </transition>
	</div>
</template>

<script>
	import issuelist from './issueList'
	import loginim from '../../homePage/loginIM'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
	export default{
	    data() {
	      return {
	      	showIM: false,
	      	answerBoxheight: document.body.offsetHeight - 280,
          divheight: document.body.offsetHeight - 330,
          modal2: false,
          modalTitle: '',
          updateTime: '',
          divContent: '',
          filekey: '',
          clickDown: '',
          DataNum: 0,
	      }
	    },
	    computed: {
        ChildissueListData() {
           return this.$store.state.workOrder.ChildissueListData
        },
	    },
	    components: {
	    	issuelist,
	    	loginim,
	    },
	    mounted() {
	    },
	    methods: {
	    	commitWOrder() {
	    		this.$store.commit('workOrder/switchTab', 'name4')
	    	},
        sureData(index) {
	    	  this.DataNum = index
        },
	    	openIM() {
	    		const t = this
		      	t.$refs.loginim.loginIM()
	    	},
        selectDetail(item) {
          const t = this
          t.modal2 = true
          t.modalTitle = item.cmutKldTitle
          t.updateTime = item.updateTime
          t.divContent = item.cmutKldContent
          t.clickDown = item.cmutKldAttach ? item.cmutKldAttach.split(':')[0] : ''
          t.filekey = item.cmutKldAttach ? item.cmutKldAttach.split(':')[1] : ''
        },
        download() {
          const t = this
          let data = {
            _mt: 'userMgmt.getfiletoken',
            isprivate: true,
            logType: '下载公告消息',
            filekey: t.filekey,
            expiresecs: 180,
          }
          getDataLevelUserLogin(data).then((res) => {
            console.log(res)
            if (isSuccess(res, t)) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
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
	.hIssue div{
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		font-size: 15px;
		background: #EFEFEF;
	}
	.hIssue{
		margin-bottom: 15px;
	}
	.divBox{
		/*border-top: solid 1px #DDDDDD;*/
		overflow: auto;
    p{
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
    }
	}
  .answer{
    overflow-y: scroll;
  }
	.answerBox{
		border: solid 1px #DDDDDD;
		padding: 0 15px;
		box-sizing: border-box;
		max-height: 400px;
		overflow: auto;
	}
	.answerTitle{
		line-height: 30px;
		font-size: 15px;
		border-bottom: dashed 1px #DDDDDD;
	}
	.answerList{
		line-height: 20px;
		width: 49%;
		margin-right: 5px;
		cursor: pointer;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
    margin-bottom: 5px;
	}
	.answerList:hover{
		color: #5cadff;
	}
	.quickCommit{
		border-left: solid 1px #DDDDDD;
		border-right: solid 1px #DDDDDD;
		border-bottom: solid 1px #DDDDDD;
    line-height: 40px;
    padding-left: 10px;
	}
  .ChildissueListData{
    border: solid 1px #DDDDDD;
    background: #f7f7f7;
  }
  .ChildissueListData:hover{
    border: solid 1px #DDDDDD;
    background: #f7f7f7;
  }
  .quickTitle{
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 15px;
	}
	.quickIcon{
		width: 47%;
		/*height: 120px;*/
		background: #CFE8F3;
		text-align: left;
		padding: 16px;
		padding-right: 0;
		margin-bottom: 15px;
		cursor: pointer;
		display: inline-block;
		margin-right: 15px;
	}
	.quickIcon:hover{
		transition: all .5s;
		background: #00c1e0;
		color: #FFFFFF;
	}
	.quickIcon .ivu-icon{
		font-size: 80px;
		/*color: #2DB7F5;*/
	}
	.quickIcon div{
		font-size: 15px;
	}
	.quickIcon2{
		margin-right: 10px;
		display: inline-block;

	}
	.quickIcon2 p{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
