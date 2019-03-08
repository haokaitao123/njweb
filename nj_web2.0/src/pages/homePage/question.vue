<template>
  <i-col class="col" span="8">
    <card :bordered="false">
      <p slot="title" class="title"><Icon type="android-textsms"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.question.title')}}</span></p>
      <a href="#" slot="extra" @click="clickHandle">
        <Icon type="more"></Icon>
      </a>
      <div class="block short">
        <div class="ask_block_main">
          <div class="ask_item">
            <div class="item_left">
              <Icon type="ios-help-outline" color="#fff"></Icon>
            </div>
            <div class="item_right">
              <div class="number" style="color:#41b3f9">{{waitNum}}</div>
              <div>{{$t('lang_homePage.question.waitFeedback')}}</div>
            </div>
          </div>
          <div class="ask_item">
            <div class="item_left">
              <Icon type="ios-plus-outline" color="#fff" ></Icon>
            </div>
            <div class="item_right">
              <div class="number" style="color:#ff9900">{{addNum}}</div>
              <div>{{$t('lang_homePage.question.dayAdd')}}</div>
            </div>
          </div>
          <div class="ask_item">
            <div class="item_left">
              <Icon type="ios-minus-outline" color="#fff"></Icon>
            </div>
            <div class="item_right">
              <div class="number" style="color:#64d572">{{delNum}}</div>
              <div>{{$t('lang_homePage.question.dayDeal')}}</div>
            </div>
          </div>
        </div>
        <div class="block_row" v-for="(item, index) in feedBackData" @click="clickHandleing(item)">
        	<Icon class="icon" type="chatbubble-working"  color="#41b3f9"></Icon>
        	<div class="div">{{item.cmwdDesc}}</div>
        	<div style="border: 1px solid #ff9900;color:#ff9900" class="icon_end">
        		<Icon type="ios-chatboxes-outline"></Icon>
        	</div>
        </div>
      </div>
    </card>
  </i-col>
</template>

<script>
	import { isSuccess } from '../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../axios/axios'

	export default{
    data() {
      return {
      	sort: 'cmwdCode',
        order: 'asc',
        rows: '10',
        page: '1',
        waitNum: 0,
        addNum: 0,
        delNum: 0,
        feedBackData: [],
        id: '',
      }
    },
    computed: {

    },
    components: {

    },
    mounted() {
    	this.getData()
    	this.getNum()
    },
    methods: {
    	//获取数据
    	getData() {
    		const t = this
    		const data2 = {
    			handleStatus: '3',
    		}
        const data = {
          _mt: 'cmutWorkorder.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: 1,
          logType: '查询List',
          data: JSON.stringify(data2),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	if (res.data.content[0].rows.length <= 4) {
        			t.feedBackData = res.data.content[0].rows
        		} else {
        			for (let i = 0; i < 4; i++) {
        				t.feedBackData.push(res.data.content[0].rows[i])
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
    	//获取数量
    	getNum() {
    		const t = this
    		const data = {
    			_mt: 'cmutWorkorder.getOrderCount',
    		}
    		getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	t.waitNum = res.data.content[0].value.split(',')[0]
          	t.addNum = res.data.content[0].value.split(',')[1]
          	t.delNum = res.data.content[0].value.split(',')[2]
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
    	//点击到工单处理中的详情
    	clickHandleing(item) {
    		const t = this
    		//根据code获取id 360200
    		const data = {
    			_mt: 'sysFunctions.getFunByCode',
    			funCode: '360200',
    		}
    		getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	t.id = res.data.content[0].id
          	const tag = {
			        title: '工单服务处理',
			        path: '/handleWorkOrder',
			        name: 'handleWorkOrder',
			        query: { id: t.id, code: '360200' },
			      }
		      	this.$router.push({path: 'handleWorkOrder',query: {
			      		id: t.id,
			      		code: '360200',
		      		}
		      	})
		      	this.$store.commit('increateTag', tag)
		      	t.$store.commit('workOrder/setHandleItem', 'handleing')
		      	t.openUp(item)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
    	//处理工单服务
    	clickHandle() {
    		const t = this
    		//根据code获取id 360200
    		const data = {
    			_mt: 'sysFunctions.getFunByCode',
    			funCode: '360200',
    		}
    		getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	t.id = res.data.content[0].id
          	const tag = {
			        title: '工单服务处理',
			        path: '/handleWorkOrder',
			        name: 'handleWorkOrder',
			        query: { id: t.id, code: '360200' },
			      }
		      	this.$router.push({path: 'handleWorkOrder',query: {
		      		id: t.id,
		      		code: '360200',
		      		}
		      	})
		      	this.$store.commit('increateTag', tag)
		      	t.$store.commit('workOrder/setHandleItem', 'nohandle')
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
    	//打开沟通详情
    	openUp(row) {
      	const t = this
      	t.getFirstAttachData(row)
      	t.$store.commit('workOrder/setHandleClick', row)
      	t.$store.commit('workOrder/setHandleDetail', false)
      	t.$store.commit('workOrder/setIsYesHandle', true)
      	t.$store.commit('workOrder/setIsCommit', false)
      },
    	//获取第一条沟通记录的附件信息
        getFirstAttachData(pRow) {
        	const t = this
        	if (pRow.cmwdAttach) {
           		let attachData = pRow.cmwdAttach.split('|')
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
           		pRow.cmwdAttach = resAttch
           	}
        },
    },
  }
</script>

<style lang="scss" scoped>
  .block{
    font-size: 12px;
    height: 280px;
    overflow-y: auto;
    overflow-x: hidden;
  .block_row{
    height: 36px;
    position: relative;
    cursor: pointer;
    transition: all .3s;
    line-height: 36px;
  .icon{
    line-height: 36px;
    position: absolute;
  }
  .div{
    padding-left: 20px;
    padding-right: 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .icon_end{
    position: absolute;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;
    right: 0;
    top: 5px;
  }
  }
  .block_row:hover{
    color: #2d8cf0;
  }
  }
  .short{
    height: 220px;
  }
  .ask_block_main{
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 15px;
    height: 60px;
  .ask_item{
    width: 31%;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 3px 3px 5px #ddd;
    display: flex;
  .item_left{
    width: 40px;
    background-color: #ddd;
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    line-height: 60px;
  }
  .item_right{
    width: 100%;
    text-align: center;
    color: #ccc;
  div{
    width: 100%;
  }
  .number{
    height: 40px;
    line-height: 40px;
    font-size: 24px;
  }
  }
  }
  }
</style>
