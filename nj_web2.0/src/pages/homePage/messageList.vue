<template>
  <div class="main">
    <div class="title">
      <Icon type="chatbox"></Icon><span style="margin-left: 10px">{{$t('lang_homePage.messageList.title')}}</span>
    </div>
    <div class="message_box">
      <div class="message" v-for="(item,index) in messageData" @click="linkToDetail(item)">
        <div class="left">
          <Icon type="record" :style="{color:item.msgReadflag==='1'?'#dddddd':'#ed3f14'}"></Icon>
        </div>
        <!--<div class="right">{{item.noticbaseTitle}}&nbsp;&nbsp;{{item.noticbasePublish}}</div>-->
        <div class="right">{{item.msgTitle}}&nbsp;&nbsp;</div>
      </div>
    </div>
		<div class="footer" @click="linkToMessage()">
      <Icon type="more" size="24" color="#2d8cf0"></Icon>
    </div>
  </div>
</template>
<script>
	import bus from '../manageInform/message/bus'
	import { getDataLevelUserLoginNew, getDataLevelUserLogin2, getDataLevelUserLoginSenior } from '../../axios/axios'
	import { isSuccess } from '../../lib/util'

	export default{
    data() {
      return {
      	messageData: [],
      }
    },
    computed: {

    },
    components: {
    },
    mounted() {
    	this.getData()
    },
    methods: {
    	getData() {
    		const t = this
    		const nowDate = {nowDate: new Date().format('yyyy-MM-dd')}
    		const data = {
    			_mt: 'baseMsgrecord.getBList',
    			funId: 1,
    			logType: '查询消息',
    			data: JSON.stringify(nowDate),
    		}
			  getDataLevelUserLogin2(data).then((res) => {
	        if (isSuccess(res, t)) {
	        		if (res.data.content[0].value) {
	        			t.messageData = []
//	        			for (let i = 0; i < res.data.content[0].value.length; i++) {
//	        				res.data.content[0].value[i].noticbasePublish = new Date(res.data.content[0].value[i].noticbasePublish).format('yyyy-MM-dd')
//	        			}
	        			if (res.data.content[0].value.length <= 3) {
		        			t.messageData = res.data.content[0].value
		        		} else {
		        			for (let i = 0; i < 3; i++) {
		        				t.messageData.push(res.data.content[0].value[i])
		        			}
		        		}
	        		}
	        }
	        }).catch(() => {
	            t.$Modal.error({
	                title: this.$t('reminder.err'),
	                content: this.$t('reminder.errormessage'),
	            })
	        })
    	},
      linkToMessage() {
      	const tag = {
	        title: this.$t('lang_homePage.messageList.title'),
	        path: '/messageNoticeManage',
	        name: 'messageNoticeManage',
	      }
      	//创建标签
      	this.$store.commit('increateTag', tag)
      	//路由中打开
      	this.$router.push('/messageNoticeManage')
      	//点亮未读
      	this.$store.commit('message/isRead', 'is1')
      	//未读列表打开
      	this.$store.commit('message/readIndex', 'r1')
      },
      linkToDetail(item) {
      	//提交数据
      	 this.$store.commit('message/setValue', item)
      	const tag = {
	        title: this.$t('lang_homePage.messageList.title'),
	        path: '/messageNoticeManage',
	        name: 'messageNoticeManage',
	      }
      	this.$store.commit('increateTag', tag)
      	if (item.msgReadflag === '1') {
      		this.$router.push({name: 'messageNoticeManage'})
      		//点亮已读
      		this.$store.commit('message/isRead', 'is2')
      		//打开已读详情
      		this.$store.commit('message/readIndex', 'r4')
      	} else {
      		//未读状态点击改变颜色
      				const t = this
			    		const nowDate = {
                noticereadMsgid: item.id,
			    		}
			    		const data = {
			    			_mt: 'baseMsgrecord.addBaseNoticeread',
			    			funId: 1,
			    			logType: '新增已读记录',
			    			data: JSON.stringify(nowDate),
			    		}
			    		//修改状态
							getDataLevelUserLogin2(data).then((res) => {
					        if (isSuccess(res, t)) {
					        	this.getData()
					        }
				        }).catch(() => {
				            t.$Modal.error({
				                title: this.$t('reminder.err'),
				                content: this.$t('reminder.errormessage'),
				            })
				      })
      		this.$router.push({name: 'messageNoticeManage'})
      		//点亮未读
      		this.$store.commit('message/isRead', 'is1')
      		//打开未读列表
      		this.$store.commit('message/readIndex', 'r2')
      	}
      },
    },
  }
</script>
<style lang="scss" scoped>
  .main{
    width: 100%;
    .title{
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid #ddd;
    }
    .message_box{
      width: 100%;
      .message{
        height: 60px;
        display: flex;
        cursor: pointer;
        transition: all .3s;
        border-bottom: 1px solid #ddd;
        .left{
          font-size: 12px;
          line-height: 30px;
          padding: 10px;
          width: 30px;
        }
        .right{
          width:100%;
          /*height: 50px;*/
          line-height: 30px;
          padding: 10px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
    .message:hover{
      background-color: rgba(100,100,100,.1);
    }
    .footer{
      padding: 0 10px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      transition: all .3s;
      height: 40px;
    }
    .footer:hover{
      background-color: rgba(100,100,100,.1);
    }
  }
</style>
