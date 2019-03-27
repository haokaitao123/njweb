<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_homePage.messageList.title')}}
        </p>
        <Row :style="{height:divheight + 'px'}" :gutter="20">
          <Col span="4" class="colTree">
            <Menu theme="primary" :active-name="$store.state.message.isread" width="auto" style="height: 100%;" @on-select="pageTo">
			        <MenuGroup :title="$t('lang_homePage.messageList.allMessage')">
				            <MenuItem name="unread">
				                <Icon type="email-unread"></Icon>
                      {{$t('lang_homePage.messageList.unread')}}
				            </MenuItem>
				            <MenuItem name="readed">
				                <Icon type="ios-chatboxes"></Icon>
                      {{$t('lang_homePage.messageList.readed')}}
				            </MenuItem>
			        </MenuGroup>
			    	</Menu>
          </Col>
          <Col span="20">
          <Row>
            <i-col>
            	<div>
	            	<unreadmessage v-if="$store.state.message.read1" ref="unreadmessage" ></unreadmessage>
	            	<unreaddetail v-if="$store.state.message.read2" ref="unreaddetail" ></unreaddetail>
	            	<readedmessage v-if="$store.state.message.read3" ref="readedmessage" ></readedmessage>
	            	<readeddetail v-if="$store.state.message.read4" ref="readeddetail" ></readeddetail>
            	</div>
            </i-col>
          </Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import unreadmessage from './unreadMessage'
  import unreaddetail from './unreadDetail'
  import readedmessage from './readedMessage'
  import readeddetail from './readedDetail'

  export default{
    data() {
      return {
      	divheight: document.body.offsetHeight - 200,
      }
    },
    computed: {

    },
    components: {
    	unreadmessage,
    	unreaddetail,
    	readedmessage,
    	readeddetail,
    },
    mounted() {
    },
    methods: {
      pageTo(name) {
	      if (name === 'readed') {
	      	//点亮已读
	      	this.$store.commit('message/isRead', 'is2')
	      	//打开已读列表
	      	this.$store.commit('message/readIndex', 'r3')
	      }
	      if (name === 'unread') {
	      	//点亮未读
	      	this.$store.commit('message/isRead', 'is1')
	      	//打开未读列表
	      	this.$store.commit('message/readIndex', 'r1')
	      }
    	},

    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .colTree{
    /*min-height: 600px;*/
   	height: 100%;
    /*min-height: 100%;*/
    /*overflow-y: auto;*/
    position: relative;
  }
  .routerLink{
  	color: #4D4D64;
  }
</style>
