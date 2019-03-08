<template>
	<div>
		<div id="divContent">
			<Row>
				<i-col span="24" >
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"  :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </i-col>
			</Row>
		</div>

    <el-dialog title="大病医疗" width='1000px' style="overflow-y: scroll" :visible.sync="openUpdate" append-to-body>
      <Row style="max-height: 420px;overflow-y: auto;">
        <Form :model="form" label-position="right" ref="form" :label-width="110">
          <i-col span="11">
            <FormItem label="医疗机构名称">
              <Input v-model="form.taxMedAgency" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="就诊日期">
              <Input v-model="form.taxMedVisitdate" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="结算日期">
              <Input v-model="form.taxMedCleardate" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="费用总额">
              <Input v-model="form.taxMedToltalcost" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="医保外自付">
              <Input v-model="form.taxMedSelp" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="自费金额">
              <Input v-model="form.taxMedSelfcost" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="就诊信息">
              <Input v-model="form.taxMedDesc" disabled/>
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
	      	oneType: '',
          tableselected: [],
          openUpdate: false,
          data: [],
          form: {
            taxMedUserid: '',
            taxMedAgency: '',
            taxMedVisitdate: '',
            taxMedCleardate: '',
            taxMedToltalcost: '',
            taxMedSelp: '',
            taxMedSelfcost: '',
            taxMedDesc: '',
          },
          columns: [
            {
              title: '医疗机构名称',
              key: 'taxMedAgency',
              width: 100,
            },
            {
              title: '就诊日期',
              key: 'taxMedVisitdate',
              width: 100,
            },
            {
              title: '结算日期',
              key: 'taxMedCleardate',
              width: 100,
            },
            {
              title: '费用总额',
              key: 'taxMedToltalcost',
              width: 100,
            },
            {
              title: '医保外自付',
              key: 'taxMedSelp',
              width: 100,
            },
            {
              title: '自费金额',
              key: 'taxMedSelfcost',
              width: 100,
            },
            {
              title: '就诊信息',
              key: 'taxMedDesc',
              width: 100,
            },
            {
              title: '操作',
              key: 'aciton',
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
                        this.openSps(params.row.id, params.index)
                      },
                    },
                  }, '查看'),
                ])
              },
            },
          ],
          sort: 'id',
          order: 'desc',
          rows: '10',
          page: '1',
	      }
	    },
	    computed: {

	    },
	    components: {
	    },
	    mounted() {
	    	this.getData(1)
	    },
      props: {
        mainId: String,
      },
	    methods: {
        getData(page) {
          const t = this
          if (page) {
            t.page = page
          }
          if (this.order === 'normal') {
            this.order = 'desc'
          }
          const data = {
            _mt: 'taxMedical.getPage',
            funId: 1,
            taxMedUserid: this.mainId,
            sort: t.sort,
            order: t.order,
            rows: t.rows,
            page: t.page,
            logType: this.$t('button.ser'),
          }
          for (const dat in data) {
            if (data[dat] === '') {
              delete data[dat]
            }
          }
          getDataLevelUserLoginNew(data).then((res) => {
            if (isSuccess(res, t)) {
              t.data = res.data.content[0].rows
              t.total = res.data.content[0].records
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        },
        getById(id) {
          const t = this
          getDataLevelUserLogin({
            _mt: 'taxMedical.getById',
            id: id,
            logType: '根据id获取信息',
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.form.taxMedUserid = res.data.content[0].taxMedUserid
              t.form.taxMedAgency = res.data.content[0].taxMedAgency
              t.form.taxMedVisitdate = res.data.content[0].taxMedVisitdate
              t.form.taxMedCleardate = res.data.content[0].taxMedCleardate
              t.form.taxMedToltalcost = res.data.content[0].taxMedToltalcost
              t.form.taxMedSelp = res.data.content[0].taxMedSelp
              t.form.taxMedSelfcost = res.data.content[0].taxMedSelfcost
              t.form.taxMedDesc = res.data.content[0].taxMedDesc
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
        openSps(id, index) {
          this.openUpdate = true
          this.getById(id)
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
