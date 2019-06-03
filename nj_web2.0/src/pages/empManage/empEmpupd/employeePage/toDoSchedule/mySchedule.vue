<template>
  <div style="margin-top: 46px;">
  	<Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;待办事项
        </p>
        <Row :style="{height: rowHeight + 'px'}" class="divContent">
        	<div>
           		<Spin fix size="large" v-if="isSpin"></Spin>
			        <div v-for="(item, index) in toDoAllData" class="dataClass" @click="doAnsrpt(item)">
			            	{{item.apblTitlecn}}
			        </div>
        	</div>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
	    <commonFlowUpdate v-if="openTestUpd"
	                      @close="closeTest"
	                      ref="commonFlowUpdate"
	                      :pkValue="pkValue"
	                      :aprvrelaStepidAll="flowId"
	                      :aprdApprover="aprdApprover"
	                      :aprvrelaApproverid="aprvrelaApproverid"
                        :aprvrelaRecordidAll="aprvrelaRecordidAll"
	                      :aprdBillid="aprdBillid">
	    </commonFlowUpdate>
    </transition>
  </div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLoginSenior } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import commonFlowUpdate from './commonFlowUpdate'

  export default{
    data() {
      return {
      	rowHeight: document.body.offsetHeight - 150,
      	userTodoKey: '',
      	toDoAllData: [],
      	fID: '',
      	isSpin: true,
      	id: '',
      	openTestUpd: false,
      	flowId: '',
        pkValue: '',
        aprdBillid: '',
        aprdApprover: '',
        aprvrelaApproverid: '',
        aprvrelaRecordidAll: '',
      }
    },
    computed: {

    },
    props: {
    },
    components: {
    	commonFlowUpdate,
    },
    mounted() {
    	this.getAllData()
    },
    methods: {
    	getAllData() {
    		const t = this
    		const data = {
    			_mt: 'ansrptTodoList.getAllTodo',
    			logType: '查询所有待办2',
    			roleType: localStorage.roleType,
    		}
    		getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.userTodoKey = res.data.content[0].value
            if (res.data.content[0].value) {
            	t.setInterFunc()
            } else {
              this.isSpin = false
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
    	setInterFunc() {
    		const t = this
      		t.fID = setInterval(function() {
      			t.setInterData()
      		}, 3000)
    	},
    	setInterData() {
    		const t = this
    		const data = {
    			_mt: 'ansrptTodoList.queryGetAllTodo',
    			logType: '查询所有待办1',
    			roleType: localStorage.roleType,
    			todoKey: t.userTodoKey,
    		}
    		getDataLevelUserLogin(data).then((res) => {
	          if (isSuccess(res, t)) {
              if(res.data.content[0].todoStatus === 100){
                if (res.data.content[0].todoList[0]) {
                  let json = res.data.content[0].todoList[0].todo_data
                  t.toDoAllData = JSON.parse(json)
                }
              }
          		//100停止调用
	          	if (res.data.content[0].todoStatus === 100) {
	          		clearInterval(t.fID)
	          		t.isSpin = false
	          	}
	          }
	        }).catch(() => {
	          t.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
    	},
    	doAnsrpt(item) {
      	const t = this
      	t.flowId = item.aprvrelaStepid
        t.pkValue = item.apblDataid
        t.aprdBillid = item.aprdBillid
        t.aprdApprover = item.aprvrelaApproveridDis
        t.aprvrelaApproverid = item.aprvrelaApproverid
        t.aprvrelaRecordidAll = item.aprvrelaRecordid
      	t.openTestUpd = true
//    	console.log(item)
//	      let { href } = this.$router.resolve({
//	        path: '/main/commonFlowUpdate',
//	      })
//	      window.open(href, '_blank')
      },
      closeTest() {
      	const t = this
      	t.openTestUpd = false
      },
    },
  }
</script>

<style lang="scss" scoped>
	.divContent{
		overflow: auto;
	}
	.dataClass{
		border: solid 1px #CCCCCC;
		height: 40px;
		line-height: 40px;
		margin-bottom: -1px;
		padding-left: 20px;
		overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
	.dataClass:hover{
		background: #F7F7F7;
		cursor: pointer;
		color: #2D8CF0;
	}
</style>
