<template>
	<div :style="{height:boxheight + 'px'}">
		<div class="issueList" @click="typeClick(item.id,index)" v-for="(item,index) in issueListData" :key="index">
			{{item.cmutKntypeName}}
		</div>
	</div>
</template>

<script>
	import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

	export default{
	    data() {
	      return {
	      	boxheight: document.body.offsetHeight - 280,
	      }
	    },
	    computed: {
	    	issueListData() {
	    		return this.$store.state.workOrder.issueListData
	    	},
	    },
	    components: {
	    },
	    mounted() {
	    },
	    methods: {
	    	typeClick(id, index) {
          this.$store.commit('workOrder/setChildIssueListData', '')
          this.$store.commit('workOrder/setChildHotIssueData', '')
	    		this.$store.commit('workOrder/switchTab', 'name3')
	    		this.$store.commit('workOrder/setorderTypeId', id)
	    		this.$store.commit('workOrder/setIssueListDataOneList', this.issueListData[index])
	    		this.$store.commit('workOrder/setCmutKntypeBusprop', this.issueListData[index].cmutKntypeBusprop)
	    		this.$store.commit('workOrder/setCmutKntypeName', this.issueListData[index].cmutKntypeName)
	    	  this.getHotIssueData(id)
	    	  this.getQuestionData(id)
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
                this.$store.commit('workOrder/setChildHotIssueData', res.data.content[0].value)
                for (let i = 0; i < res.data.content[0].value.length; i++) {
                  res.data.content[0].value[i].cmutKldPublish = new Date(res.data.content[0].value[i].cmutKldPublish).format('yyyy-MM-dd')
                  res.data.content[0].value[i].cmutKldLosttime = new Date(res.data.content[0].value[i].cmutKldLosttime).format('yyyy-MM-dd')
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
                console.log(res.data.content[0], '11111111111111111111111111111')
                this.$store.commit('workOrder/setChildIssueListData', res.data.content[0].value)
                this.$store.commit('workOrder/setChildShow', false)
              } else {
                this.$store.commit('workOrder/setChildShow', true)
              }
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
	.issueList{
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		border-right: solid 1px #DDDDDD;
		border-left: solid 1px #DDDDDD;
		border-bottom: solid 1px #DDDDDD;
		box-sizing: border-box;
	}
	.issueList:hover{
		background: #F7F7F7;
		cursor: pointer;
	}
</style>
