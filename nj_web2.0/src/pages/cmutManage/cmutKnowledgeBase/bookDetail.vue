<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;知识库信息
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
    <Row>
      <Col span="24">
      	<div style="background:#eee;padding: 10px;">
	        <Card :bordered="false" style="height: 100%;">
	            <p slot="title">{{titleName}}</p>
	            <div id="content" :style="{height:contentHeight + 'px'}">

	            </div>
	            <span>附件：<a v-show="isDown" @click="download">{{clickDown}}</a></span>
	        </Card>
	    </div>
      </Col>
    </Row>
  </div>
  </div>
</template>

<script>
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
      	contentHeight: document.body.offsetHeight - 500,
        titleName: '',
        isDown: false,
        clickDown: '',
        filekey: '',
      }
    },
    computed: {

    },
    props: {
    	item: Object,
    },
    components: {
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData(item) {
      	const t = this
      	if (item) {
      		t.titleName = item.cmutKldTitle
      		document.getElementById('content').innerHTML = item.cmutKldContent
      		if (item.cmutKldAttach) {
	      		t.isDown = true
	      		t.clickDown = item.cmutKldAttach.split(':')[0]
	      		t.filekey = item.cmutKldAttach.split(':')[1]
	      	} else {
	      		t.isDown = false
	      	}
      	}
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
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
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
      handleReset() {
      	this.$emit('closeUp')
      },
  	},
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
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
  /*.box{
  	width: 950px;
  }*/
  #content{
		overflow: auto;
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-bottom: solid 1px #DADADA;
	}
  span{
		font-weight: bold;
		cursor: pointer;
		font-size: 15px;
	}
</style>
