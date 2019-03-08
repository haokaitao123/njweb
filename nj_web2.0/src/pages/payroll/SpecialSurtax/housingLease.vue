<template>
	<div>
		<div id="divContent">
			<Row>
				<i-col span="24" >
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"  :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </i-col>
			</Row>
  </div>
    <el-dialog title="住房租金" width='1000px' style="overflow-y: scroll" :visible.sync="openUpdate" append-to-body>
      <Row style="max-height: 420px;overflow-y: auto;">
        <Form :model="form" label-position="right" ref="form" :label-width="120">
          <i-col span="11">
            <FormItem label="主要工作省份">
              <Input v-model="form.taxHoulsWorkprovinceDis" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem label="主要工作城市">
              <Input v-model="form.taxHoulsWorkcityDis" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem label="出租类型">
              <Input v-model="form.taxHoulsTypeDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="出租方姓名(组织名称)">
              <Input v-model="form.taxHoulsName" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem label="出租方证件类型">
              <Input v-model="form.taxHoulsIdtypeDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem label="证件号码">
              <Input v-model="form.taxHoulsIdno" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="房屋坐落地址">
              <Input v-model="form.taxHoulsAddr" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="贷款合同编号">
              <Input v-model="form.taxHoulsConcode" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="租赁开始日期">
              <Input v-model="form.taxHoulsSdate" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem label="租赁结束日期">
              <Input v-model="form.taxHoulsEdate" disabled></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
    </el-dialog>
	</div>
</template>

<script>
	import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

	export default{
	    data() {
	      return {
          tableheight: document.body.offsetHeight - 250,
	      	messageData: [],
          openUpdate: false,
	      	oneType: '',
          tableselected: [],
//          mainId: '',
          taxHoulsUserid: '',
          columns: [
            {
              title: '主要工作省份',
              key: 'taxHoulsWorkprovinceDis',
              width: 100,
            },
            {
              title: '主要工作城市',
              key: 'taxHoulsWorkcityDis',
              width: 100,
            },
            {
              title: '出租类型',
              key: 'taxHoulsTypeDis',
              width: 100,
            },
            {
              title: '出租方姓名（组织名称）',
              key: 'taxHoulsName',
              width: 100,
            },
            {
              title: '出租方证件类型(统一社会信用代码)',
              key: 'taxHoulsIdtypeDis',
              width: 100,
            },
            {
              title: '证件号码',
              key: 'taxHoulsIdno',
              width: 100,
            },
            {
              title: '操作',
              key: 'payrlogFilename',
              ellipsis: true,
              width: 100,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
                    on: {
                      click: () => {
                        this.openSps(params.row.id)
                      },
                    },
                  }, '查看'),
                ])
              },
            },
          ],
          row: {}, // 主表数据
          // getPage查询参数
          data: [],
          total: 0,
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          form: {
            taxHoulsWorkprovince: '',
            taxHoulsWorkprovinceDis: '',
            taxHoulsWorkcity: '',
            taxHoulsWorkcityDis: '',
            taxHoulsType: '',
            taxHoulsTypeDis: '',
            taxHoulsName: '',
            taxHoulsIdtype: '',
            taxHoulsIdtypeDis: '',
            taxHoulsIdno: '',
            taxHoulsAddr: '',
            taxHoulsConcode: '',
            taxHoulsSdate: '',
            taxHoulsEdate: '',
          },
	      }
	    },
	    computed: {

	    },
	    components: {
	    },
      props: {
	      mainId: String,
      },
	    mounted() {
	    	this.getData()
	    },
	    methods: {
	    	getData() {
	    		const t = this
		        const data = {
		          _mt: 'taxHousinglease.getPage',
		          funId: 1,
              rows: t.rows,
              page: t.page,
              sort: t.sort,
              order: t.order,
              logType: this.$t('button.ser'),
              taxHoulsUserid: this.mainId,
            }
		        for (const dat in data) {
		          if (data[dat] === '') {
		            delete data[dat]
		          }
		        }
		        getDataLevelUserLoginNew(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	if (res.data.content[0]) {
                  t.data = res.data.content[0].rows
                  t.total = res.data.content[0].total
		          	}
		          }
		        }).catch(() => {
		          t.$Modal.error({
		            title: this.$t('reminder.err'),
		            content: this.$t('reminder.errormessage'),
		          })
		        })
	    	},
        getOneData(id) {
          const t = this
          getDataLevelUserLogin({
            _mt: 'taxHousinglease.getById',
            id: id,
            funId: '1',
            logType: this.$t('button.ser'),
          }).then((res) => {
            if (isSuccess(res, t)) {
              console.log(res.data.content[0])
              t.form.taxHoulsWorkprovinceDis = res.data.content[0].taxHoulsWorkprovinceDis
              t.form.taxHoulsWorkcityDis = res.data.content[0].taxHoulsWorkcityDis
              t.form.taxHoulsTypeDis = res.data.content[0].taxHoulsTypeDis
              t.form.taxHoulsName = res.data.content[0].taxHoulsName
              t.form.taxHoulsIdtypeDis = res.data.content[0].taxHoulsIdtypeDis
              t.form.taxHoulsIdno = res.data.content[0].taxHoulsIdno
              t.form.taxHoulsAddr = res.data.content[0].taxHoulsAddr
              t.form.taxHoulsConcode = res.data.content[0].taxHoulsConcode
              t.form.taxHoulsSdate = res.data.content[0].taxHoulsSdate
              t.form.taxHoulsEdate = res.data.content[0].taxHoulsEdate
              console.log(t.form)
            }
          }).catch(() => {
            this.$Modal.error({
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
        openSps(id) {
          this.getOneData(id)
	    	  this.openUpdate = true
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
