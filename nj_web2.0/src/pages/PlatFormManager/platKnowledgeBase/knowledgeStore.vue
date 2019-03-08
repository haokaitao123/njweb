<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;系统知识库
        </p>
        <Row>
          <Col span="4" class="colTree">
            <div class="divtree" :style="{height:treeheight + 'px'}">
              <Tree :data="dataTree"  @on-select-change="selectChange" ref="tree"></Tree>
            </div>
          </Col>
          <Col span="20">
          <Row>
            <Input style="width: 300px;" size="large" v-model="keyWords" placeholder="请输入知识库关键字..." >
		        	<Button slot="append" icon="ios-search" @click="searchKnowledge"></Button>
		    		</Input>
          </Row>
          <row class="table-form" ref="table-form">
          	<div class="message_box" :style="{height:tableheight + 'px'}" v-show="isList">
	            <div class="message" v-for="(item,index) in messageData" :key="index" @click="selectDetail(item)">
				        <div class="left1"><h3><Icon type="ios-book" style="margin-right: 5px;"/>{{item.platKldTitle}}</h3></div>
				        <div class="left3">有效日期： {{item.platKldPublish}} — {{item.platKldLosttime}}</div>
				      </div>
			      </div>
			      <div class="message_box" :style="{height:tableheight + 'px'}" v-show="!isList">
				        <div style="background:#eee;padding: 10px 20px;">
				        	<span @click="fhsj" class="clickSpan">
					        	 <Icon type="ios-undo" style="margin-right: 5px;" size="16" ></Icon>返回上级
					        </span>
					        <Card :bordered="false" style="height: 100%;margin-top: 10px;">
					            <p slot="title" style="font-size: 16px;color: #4D4D64;">{{titleName}}</p>
					            <div id="content" :style="{height:contentHeight + 'px'}">

					            </div>
					            <span>附件：<a v-show="isDown" @click="download">{{clickDown}}</a></span>
					        </Card>
					    	</div>
			      </div>
          </row>
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

  export default{
    data() {
      return {
        treeheight: document.body.offsetHeight - 210,
        tableheight: document.body.offsetHeight - 255,
        contentHeight: document.body.offsetHeight - 425,
        dataTree: [],
        messageData: [],
        keyWords: '',
        isList: true,
        titleName: '',
        clickDown: '',
        isDown: false,
        filekey: '',
      }
    },
    computed: {

    },
    components: {

    },
    mounted() {
      this.getTree()
      this.setDetail()
      this.getAllData()
    },
    methods: {
    	getAllData() {
    		const t = this
				const data = {
          _mt: 'platKnowledge.getList',
         	funId: 1,
          logType: this.$t('button.ser'),
          sort: 'platKldPublish',
        	order: 'desc',
        }
				getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	if (res.data.content[0].value) {
            	for (let i = 0; i < res.data.content[0].value.length; i++) {
	            	res.data.content[0].value[i].platKldPublish = new Date(res.data.content[0].value[i].platKldPublish).format('yyyy-MM-dd')
	            	res.data.content[0].value[i].platKldLosttime = new Date(res.data.content[0].value[i].platKldLosttime).format('yyyy-MM-dd')
	            }
            	t.messageData = res.data.content[0].value
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
    	getData(id) {
        const t = this
        const tData = {
        	platKldType: id,
        }
        const data = {
          _mt: 'platKnowledge.getObject',
         	funId: 1,
          logType: this.$t('button.ser'),
          sort: 'id',
        	order: 'desc',
          data: JSON.stringify(tData),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].value) {
            	for (let i = 0; i < res.data.content[0].value.length; i++) {
	            	res.data.content[0].value[i].platKldPublish = new Date(res.data.content[0].value[i].platKldPublish).format('yyyy-MM-dd')
	            	res.data.content[0].value[i].platKldLosttime = new Date(res.data.content[0].value[i].platKldLosttime).format('yyyy-MM-dd')
	            }
            }
            t.messageData = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    	//获取树
    	getTree() {
        const t = this
        const data = {
          _mt: 'platKnlType.getMainTypeTree',
          funId: 1,
          logType: this.$t('button.ser'),
          id: '0',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	if (res.data.content[0].value) {
          		res.data.content[0].value.push({
	              id: '0',
	              platKntypeName: '全部知识类型',
	            })
	            t.dataTree = t.toTree(res.data.content[0].value)
          	}
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
//      console.log(t.$refs.tree)
      },
      /* 树点击事件 */
      selectChange(e) {
      	this.isList = true
      	if (e.length !== 0) {
      		if (e[0].id === '0') {
      			this.getAllData()
      		} else {
      			this.getData(e[0].id)
      		}
      	}
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.platKntypeName
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.platKntypePid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            val.push(item)
          }
        })
        return val
      },
      //点击查看详情
      selectDetail(item) {
      	const t = this
      	t.isList = false
      	t.titleName = item.platKldTitle
      	document.getElementById('content').innerHTML = item.platKldContent
      	if (item.platKldAttach) {
      		t.isDown = true
      		t.clickDown = item.platKldAttach.split(':')[0]
      		t.filekey = item.platKldAttach.split(':')[1]
      	} else{
      		t.isDown = false
      	}
      },
      //创建时显示
      setDetail() {
      	if (JSON.parse(localStorage.getItem('bookStoreItem'))) {
      		this.selectDetail(JSON.parse(localStorage.getItem('bookStoreItem')))
      		localStorage.removeItem('bookStoreItem')
      	}
      },
      fhsj() {
      	this.isList = true
      },
      //下载附件
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
      //查找关键字
      searchKnowledge() {
      	const t = this
      	const data = {
          _mt: 'platKnowledge.getByKeyWords',
         	funId: 1,
          logType: this.$t('button.ser'),
          sort: 'id',
        	order: 'desc',
          keyWords: t.keyWords ? t.keyWords : '',
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	t.isList = true
            if (res.data.content[0].value) {
            	for (let i = 0; i < res.data.content[0].value.length; i++) {
	            		res.data.content[0].value[i].platKldPublish = new Date(res.data.content[0].value[i].platKldPublish).format('yyyy-MM-dd')
	            		res.data.content[0].value[i].platKldLosttime = new Date(res.data.content[0].value[i].platKldLosttime).format('yyyy-MM-dd')
	            }
            }
            t.messageData = res.data.content[0].value
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
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
  	padding-left: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }
  .message_box{
  	border: 1px #efefef solid;
  	overflow: auto;
  }
  .message{
  	height: 70px;
  	border-bottom: 1px #efefef solid;
  	padding: 10px;
  	cursor: pointer;
  }
  .message:hover{
      background-color: rgba(100,100,100,.1);
  }
  .left1{
  	color: #5cadff;
  	overflow: hidden;
/*    text-overflow:ellipsis;*/
    white-space: nowrap;
  }
  .left3{
  	padding-left: 20px;
  	font-size: 14px;
  	color: #9499A8;
  }
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
	.clickSpan:hover{
		color: #2d8cf0;
	}
	.ivu-tree ul {
		font-size: 14px;
	}
	.ivu-tree-title {
		font-size: 14px;
	}
</style>
