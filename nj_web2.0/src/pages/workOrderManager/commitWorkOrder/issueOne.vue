<template>
	<div>
		<div id="divContent" :style="{height:typeheight + 'px'}">
			<Row>
				<i-col span="6" class="colStyle" v-for="(item,index) in messageData" :key="index">
					<Row>
						<i-col span="18" class="inlineClass">
              <img :src="'../../../../static/indexImg/' + item.cmutKntypePic" alt="" style="width: 20px;height: 20px;">
							<span class="orderText">{{item.cmutKntypeName}}</span>
						</i-col>
						<i-col span="4" class="btnStyle">
							 <Button type="success" icon="ios-information-outline" size="small" @click="question(item.id)">{{$t('button.ask')}}</Button>
						</i-col>
					</Row>
					<Row class="spanTopStyle">
						<div class="inlineClass">
							<span>
								{{item.cmutKntypeDesc}}
							</span>
						</div>
					</Row>
				</i-col>
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
	      	typeheight: document.body.offsetHeight - 200,
	      	messageData: [],
	      	oneType: '',
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
	    	getData () {
	    		const t = this
		        const data = {
		          _mt: 'cmutKnlType.getSelfAndNext',
		          funId: 1,
		          logType: this.$t('button.ser'),
		          cmutKntypePid: '0',
              cmutKntypeBusprop: '01consultation',
            }
		        for (const dat in data) {
		          if (data[dat] === '') {
		            delete data[dat]
		          }
		        }
		        getDataLevelUserLogin(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	if (res.data.content[0].value) {
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
	    	question(id) {
	    		this.$store.commit('workOrder/switchTab', 'name2')
	    		this.getQuestionData(id)
	    		this.getHotIssueData(id)
	    	},
	    	getQuestionData(questionId) {
	    		const t = this
		        const data = {
		          _mt: 'cmutKnlType.getSelfAndNext',
		          funId: 1,
		          logType: this.$t('button.ser'),
		          cmutKntypePid: questionId,
              cmutKntypeBusprop: '01consultation',
		        }
		        for (const dat in data) {
		          if (data[dat] === '') {
		            delete data[dat]
		          }
		        }
		        getDataLevelUserLogin(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	if (res.data.content[0].value) {
		          		this.$store.commit('workOrder/setIssueListData', res.data.content[0].value)
		          	}
		          }
		        }).catch(() => {
		          t.$Modal.error({
		            title: this.$t('reminder.err'),
		            content: this.$t('reminder.errormessage'),
		          })
		        })
	    	},
	    	getHotIssueData(id) {
		        const t = this
		        const tData = {
		        	cmutKldType: id,
		        }
		        const data = {
		          _mt: 'cmutKnowledge.getObject',
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
			            	res.data.content[0].value[i].cmutKldPublish = new Date(res.data.content[0].value[i].cmutKldPublish).format('yyyy-MM-dd')
			            	res.data.content[0].value[i].cmutKldLosttime = new Date(res.data.content[0].value[i].cmutKldLosttime).format('yyyy-MM-dd')
			            }
		            }
		          	t.$store.commit('workOrder/setHotIssueData', res.data.content[0].value)
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
	#divContent{
		width: 100%;
		overflow-y: auto;
		/*background: #18BE6A;*/
		/*border: solid 1px #DDDDDD;*/
	}
	.colStyle{
		font-size: 14px;
		padding: 10px 0 10px 10px;
		box-sizing: border-box;
		border: dashed 1px #DADADA;
		margin-bottom: 5px;
		margin-right: -1px;
	}
	.colStyle:hover{
		background: #F2F2F2;
	}
	.colStyle span{
		color: #9499A8;
		padding-left: 10px;
		font-size: 12px;
		/*width: 25%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;*/
	}
	.btnStyle{
		display: flex;
		justify-content: flex-end;
	}
	.ivu-icon{
		border: solid 1px #444444;
		padding: 3px;
		border-radius: 7px;
		margin-right: 5px;
	}
	.spanTopStyle{
		margin-top: 10px;
	}
	.inlineClass{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
    vertical-align: text-top;
    font-size: 12px;
	}
  .orderText{
    width:120px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: text-top;
  }
</style>
