<template>
	<div :style="{height:divheight + 'px'}">
		<Breadcrumb style="font-size: 15px;">
	        <span @click="fhsj" class="clickSpan">
	        	 <Icon type="ios-undo" style="margin-right: 5px;" size="18"></Icon>&nbsp;{{$t('lang_homePage.messageList.backTitle')}}
	        </span>
	    </Breadcrumb>
	    <div style="background:#eee;padding: 20px;height: 92%;margin-top: 10px;">
	        <Card :bordered="false" style="height: 100%;">
	            <p slot="title" style="font-size: 16px;color: #4D4D64;">{{titleName}}</p>
	            <div id="content" :style="{height:contentHeight + 'px'}" v-html="$store.state.message.content">
	            </div>
	            <span>{{$t('lang_homePage.messageList.attM')}}：<a v-if="isDown" @click="download">{{clickDown}}</a></span>
	            <span v-show="false">{{filekey}}</span>
	        </Card>
	    </div>
    </div>
</template>

<script>
	import bus from './bus'
	import { getDataLevelUserLoginNew, getDataLevelUserLogin2, getDataLevelUserLogin, getDataLevelUserLoginSenior } from '../../../axios/axios'
	import { isSuccess } from '../../../lib/util'

	export default{
    data() {
      return {
      	divheight: document.body.offsetHeight - 180,
      	contentHeight: document.body.offsetHeight - 420,
      	isDown: true,
      }
    },
    computed: {
      	titleName() {
        	return this.$store.state.message.titleName
      	},
      	clickDown() {
      		return this.$store.state.message.clickDown
      	},
      	filekey() {
      		return this.$store.state.message.filekey
      	},
    },
    watch: {

    },
    components: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
    	fhsj() {
    		//打开已读列表
    		this.$store.commit('message/readIndex', 'r3')
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
	span{
		font-weight: bold;
		cursor: pointer;
		font-size: 15px;
	}
	#content{
		overflow: auto;
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-bottom: solid 1px #DADADA;
	}
	.clickSpan:hover{
		color: #2d8cf0;
	}
</style>
