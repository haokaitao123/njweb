<template>
  <div>
  	<Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;待办事项
        </p>
        <Row :style="{height: rowHeight + 'px'}" class="divContent">
        	<div>
           		<Spin fix size="large" v-if="isSpin">
           			<!--<div>数据加载中...</div>-->
           		</Spin>
			        <div v-for="(item, index) in toDoAllData" :key="index" class="dataClass" @click="doAnsrpt(item)">
			            	<span v-if="item.todo_title">
			            		{{item.todo_title}}
			            	</span>
			            	<span v-if="item.apblTitlecn">
			            		{{item.apblTitlecn}}
			            	</span>
			        </div>
        	</div>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
	    <commonFlowUpdate v-if="openTestUpd"
	                      @close="closeTest"
	                      @getAllData="getAllDataList"
	                      ref="commonFlowUpdate"
	                      :pkValue="pkValue"
	                      :aprvrelaStepidAll="flowId"
	                      :aprdApprover="aprdApprover"
	                      :aprvrelaApproverid="aprvrelaApproverid"
                        :aprvrelaRecordidAll="aprvrelaRecordidAll"
                        :aprvrelTitle="aprvrelTitle"
	                      :aprdBillid="aprdBillid"
      >
	    </commonFlowUpdate>
    </transition>
  </div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLoginSenior } from '../../../axios/axios'
  import { isSuccess, getCookie } from '../../../lib/util'
  import commonFlowUpdate from './commonFlowUpdate'
  import Bus from '../../../lib/bus'
  export default{
    data() {
      return {
      	rowHeight: document.body.offsetHeight - 200,
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
        stop: true,
      }
    },
    props: {
    },
    components: {
    	commonFlowUpdate,
    },
    mounted() {
      Bus.$on('stopRequest', (res) => {
        clearInterval(this.fID)
      })
        this.getAllData()
    },
    methods: {
      clearAllToDoList() {
        console.log("clearAllToDoList")
//        clearInterval(this.fID)
      },
    	getAllData() {
    		const t = this
    		const data = {
    			_mt: 'ansrptTodoList.getAllTodo',
    			logType: '查询所有待办1',
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
    		t.fID = setInterval(function(){
    			t.setInterData()
    		}, 3000)
    	},
    	setInterData() {
    		const t = this
    		const data = {
    			_mt: 'ansrptTodoList.queryGetAllTodo',
    			logType: '查询所有待办2',
    			roleType: localStorage.roleType,
    			todoKey: t.userTodoKey,
    		}
    		getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if(res.data.content[0].todoStatus === 100){
              if (res.data.content[0].todoList) { //分有无title两种情况
                for (let i = 0; i < res.data.content[0].todoList.length; i++) {
                  if (res.data.content[0].todoList[i].todo_title) {
                    t.toDoAllData.push(res.data.content[0].todoList[i])
                  } else {
                    let noTitle = JSON.parse(res.data.content[0].todoList[i].todo_data)
                    for (let j = 0; j < noTitle.length; j++) {
                      t.toDoAllData.push(noTitle[j])
                    }
                  }
                }
            }

//        		console.log(t.toDoAllData)
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
      	console.log(item)
      	if (item.todo_title) {
      		const itemData = JSON.parse(item.todo_data)
	      	const data = {
	    			_mt: 'sysFunctions.getFunByCode',
	    			funCode: itemData.funCode,
	    		}
	    		getDataLevelUserLogin(data).then((res) => {
      		  console.log(res)
	          if (isSuccess(res, t)) {
	          	t.id = res.data.content[0].id
	          	const tag = {
				        title: itemData.title,
				        path: '/' + itemData.funAction,
				        name: itemData.funAction,
				        query: { id: t.id, code: itemData.funCode },
				      }
	          	this.$store.commit('increateTag', tag)
			      	this.$router.push({path: itemData.funAction,query: {
				      		id: t.id,
				      		code: itemData.funCode,
			      		}
			      	})
	          }
	        }).catch(() => {
	          t.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
      	} else {
      		console.log(item, 'item')
      		t.flowId = item.aprvrelaStepid
	        t.pkValue = item.apblDataid
	        t.aprdBillid = item.aprdBillid
	        t.aprdApprover = item.aprvrelaApproveridDis
	        t.aprvrelaApproverid = item.aprvrelaApproverid
          t.aprvrelaRecordidAll = item.aprvrelaRecordid
          t.aprvrelTitle = item.apblTitlecn
	      	t.openTestUpd = true
      	}
      },
      closeTest() {
      	const t = this
      	t.openTestUpd = false
      },
      getAllDataList() {
        const t = this
        t.toDoAllData = []
        t.getAllData()
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
