<template>
	<div>
		<div id="divContent">
			<Row>
				<i-col span="24" >
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"  :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
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
          tableheight: document.body.offsetHeight - 550,
	      	messageData: [],
	      	oneType: '',
          tableselected: [],
          columns: [
            {
              title: '继续教育类型',
              key: 'payrlogSalsetDis',
              width: 100,
            },
            {
              title: '继续教育名称',
              key: 'payrlogPeriod',
              width: 100,
            },
            {
              title: '教育机构',
              key: 'payrlogTypeDis',
              width: 100,
            },
            {
              title: '操作',
              key: 'payrlogFilename',
              ellipsis: true,
              width: 100,
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
                    on: {
                      click: () => {
                        this.openSps()
                      },
                    },
                  }, '查看'),
                ])
              },
            },
          ],
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
        selectedtable(selection) {
          const newArr = []
          for (let i = 0; i < selection.length; i++) {
            newArr.push(selection[i].id)
          }
          this.tableselected = newArr
        },
	    },
	}
</script>

<style lang="scss" scoped>
	#divContent{
		width: 100%;
		/*overflow-y: auto;*/
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
