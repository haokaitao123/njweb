<template>
	<div class="artcle" >
		<div style="border-bottom: solid 1px #DDDDDD;">
			<span>{{$t('lang_communication.commitWorkOrder.hotArticle')}}</span>
		</div>
		<div>
			<ul>
				<li v-for="(item, index) in hotIssueData" :key="index" @click="selectDetail(item)">
					{{item.cmutKldTitle}}
				</li>
			</ul>
		</div>
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
	</div>
</template>

<script>
	import { getDataLevelUserLogin } from '../../../axios/axios'
	import { isSuccess } from '../../../lib/util'

	export default{
	    data() {
	      return {
	      	isDetail: false,
	      	divheight: document.body.offsetHeight - 330,
	      	modal2: false,
	      	modalTitle: '',
	      	updateTime: '',
	      	divContent: '',
	      	filekey: '',
	      	clickDown: '',
	      }
	    },
	    computed: {
			hotIssueData() {
				return this.$store.state.workOrder.hotIssueData
			},
	    },
	    components: {
	    },
	    mounted() {
	    },
	    methods: {
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
	.artcle{
		border: solid 1px #DDDDDD;
		max-height: 329px;
		overflow: auto;
	}
	.artcle span{
		line-height: 40px;
		font-size: 14px;
		padding-left: 15px;
	}
	.artcle ul{
		padding-bottom: 12px;
	}
	.artcle ul li{
		padding: 12px 0 0 15px;
		list-style: none;
		cursor: pointer;
	}
	.artcle ul li:hover{
		color: #5cadff;
	}
	#divContent{
		margin-top: 10px;
	}
</style>
