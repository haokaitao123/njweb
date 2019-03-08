<template>
	<div>
		<div id="divContent">
			<Row>
				<i-col span="24" >
          <Tabs type="card">
            <TabPane label="被赡养人信息" name="name1">
              <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"  :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
            </TabPane>
            <TabPane label="共同赡养人信息" name="name2">
                <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"  :height="tableheight" size="small" border ref="selection" :columns="iScolumns" :data="isdata"></Table>
            </TabPane>
          </Tabs>
        </i-col>
			</Row>
        <el-dialog title="被赡养人信息" width='1000px' style="overflow-y: scroll" :visible.sync="openUpdate" append-to-body>
          <Row style="max-height: 420px;overflow-y: auto;">
            <Form :model="form" label-position="right" ref="form" :label-width="110">
              <i-col span="11">
                <FormItem label="是否独生子女" style="margin-bottom: 10px">
                  <!--<Input v-model="form.onlyChid" disabled/>-->
                  <RadioGroup v-model="form.onlyChid">
                    <Radio label="是" disabled>是</Radio>
                    <Radio label="否" disabled>否</Radio>
                  </RadioGroup>
                </FormItem>
              </i-col>
              <i-col span="11" style="margin-bottom: 10px">
                <FormItem label="关系">
                  <Input v-model="form.taxSupRelation" disabled></Input>
                </FormItem>
              </i-col>
              <i-col span="11" >
                <FormItem label="分摊方式">
                  <Input v-model="form.shareTypeDis" disabled/>
                </FormItem>
              </i-col>
              <i-col span="11">
                <FormItem label="姓名">
                  <Input v-model="form.taxSupName" disabled></Input>
                </FormItem>
              </i-col>
              <i-col span="11" >
                <FormItem label="证件类型">
                  <Input v-model="form.taxSupIdtypeDis" disabled></Input>
                </FormItem>
              </i-col>
              <i-col span="11" >
                <FormItem label="证件号码">
                  <Input v-model="form.taxSupIdno" disabled></Input>
                </FormItem>
              </i-col>
              <i-col span="11">
                <FormItem label="出生日期">
                  <Input v-model="form.taxSupBirth" disabled></Input>
                </FormItem>
              </i-col>
              <i-col span="11">
                <FormItem label="国籍">
                  <Input v-model="form.taxSupNation" disabled></Input>
                </FormItem>
              </i-col>
              <i-col span="11">
                <FormItem label="本年度月扣除金额">
                  <Input v-model="form.amout" disabled></Input>
                </FormItem>
              </i-col>
            </Form>
          </Row>
        </el-dialog>
        <el-dialog title="共同赡养人信息" width='1000px' style="overflow-y: scroll" :visible.sync="isopenUpdate" append-to-body>
        <Row style="max-height: 420px;overflow-y: auto;">
          <Form :model="form1" label-position="right" ref="form" :label-width="120">
            <i-col span="11">
              <FormItem label="姓名">
                <Input v-model="form1.taxShareName" disabled></Input>
              </FormItem>
            </i-col>
            <i-col span="11" >
              <FormItem label="证件类型">
                <Input v-model="form1.taxShareIdtypeDis" disabled></Input>
              </FormItem>
            </i-col>
            <i-col span="11" >
              <FormItem label="证件号码">
                <Input v-model="form1.taxShareIdno" disabled></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="国籍">
                <Input v-model="form1.taxShareCountry" disabled></Input>
              </FormItem>
            </i-col>
          </Form>
        </Row>
      </el-dialog>

    </div>
	</div>
</template>

<script>
	import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

	export default{
	    data() {
	      return {
          tableheight: document.body.offsetHeight - 300,
	      	oneType: '',
          tableselected: [],
          openUpdate: false,
          isopenUpdate: false,
          form: {
            onlyChid: '是',
            shareTypeDis: '',
            taxSupRelation: '',
            taxSupName: '',
            taxSupIdtype: '',
            taxSupIdtypeDis: '',
            taxSupIdno: '',
            taxSupBirth: '',
            taxSupNation: '',
            amout: '',
          },
          form1: {
            taxShareName: '',
            taxShareIdtype: '',
            taxShareIdtypeDis: '',
            taxShareIdno: '',
            taxShareCountry: '',
          },
          columns: [
            {
              title: '关系',
              key: 'taxSupRelation',
              width: 100,
            },
            {
              title: '姓名',
              key: 'taxSupName',
              width: 100,
            },
            {
              title: '证件类型',
              key: 'taxSupIdtypeDis',
              width: 100,
            },
            {
              title: '证件号码',
              key: 'taxSupIdno',
              width: 100,
            },
            {
              title: '出生日期',
              key: 'taxSupBirth',
              width: 100,
            },
            {
              title: '是否独生子女',
              key: 'onlyChid',
              width: 100,
            },
            {
              title: '国籍(地区)',
              key: 'taxSupNation',
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
          iScolumns: [
            {
              title: '姓名',
              key: 'taxShareName',
              width: 100,
            },
            {
              title: '证件类型',
              key: 'taxShareIdtypeDis',
              width: 100,
            },
            {
              title: '证件号码',
              key: 'taxShareIdno',
              width: 100,
            },
            {
              title: '国籍(地区)',
              key: 'taxShareCountry',
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
                        this.isopenSps(params.row.id)
                      },
                    },
                  }, '查看'),
                ])
              },
            },
          ],
          isdata: [],
          data: [],
          total: 0,
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
	      }
	    },
	    computed: {

	    },
      props: {
        mainId: String,
        id: String,
      },
	    mounted() {
	    	this.getData()
	    	this.IsgetData()
	    },
	    methods: {
	      // 被赡养老人
	    	getData () {
	    		const t = this
		        const data = {
              _mt: 'taxSupport.getPage',
              funId: 1,
              taxSupUserid: this.id,
              rows: t.rows,
              page: t.page,
              sort: t.sort,
              order: t.order,
              logType: this.$t('button.ser'),
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
        // 共同瞻仰
        IsgetData () {
          const t = this
          const data = {
            _mt: 'taxShare.getPage',
            funId: 1,
            taxShareUseid: this.id,
            rows: t.rows,
            page: t.page,
            sort: t.sort,
            order: t.order,
            logType: this.$t('button.ser'),
          }
          for (const dat in data) {
            if (data[dat] === '') {
              delete data[dat]
            }
          }
          getDataLevelUserLoginNew(data).then((res) => {
            if (isSuccess(res, t)) {
              if (res.data.content[0]) {
                t.isdata = res.data.content[0].rows
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
        selectedtable(selection) {
          const newArr = []
          for (let i = 0; i < selection.length; i++) {
            newArr.push(selection[i].id)
          }
          this.tableselected = newArr
        },
        // 被赡养老人
        openSps(id) {
          this.getOneData(id)
          this.openUpdate = true
        },
        // 共同瞻仰
        isopenSps(id) {
          this.isgetOneData(id)
          this.isopenUpdate = true
        },
        // 被赡养老人
        getOneData(id) {
          const t = this
          getDataLevelUserLogin({
            _mt: 'taxSupport.getById',
            id: id,
            funId: '1',
            logType: this.$t('button.ser'),
          }).then((res) => {
            if (isSuccess(res, t)) {
              console.log(res.data.content[0].shareTypeDis)
              t.form.onlyChid = res.data.content[0].onlyChid
              t.form.shareTypeDis = res.data.content[0].shareType
              t.form.taxSupRelation = res.data.content[0].taxSupRelation
              t.form.taxSupName = res.data.content[0].taxSupName
              t.form.taxHoulsIdtype = res.data.content[0].taxHoulsIdtype
              t.form.taxSupIdtypeDis = res.data.content[0].taxSupIdtypeDis
              t.form.taxSupIdno = res.data.content[0].taxSupIdno
              t.form.taxSupBirth = res.data.content[0].taxSupBirth
              t.form.taxSupNation = res.data.content[0].taxSupNation
              t.form.amout = res.data.content[0].amout
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        },
        // 共同瞻仰
        isgetOneData(id) {
          const t = this
          getDataLevelUserLogin({
            _mt: 'taxShare.getById',
            id: id,
            funId: '1',
            logType: this.$t('button.ser'),
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.form1.taxShareName = res.data.content[0].taxShareName
              t.form1.taxShareIdtypeDis = res.data.content[0].taxShareIdtypeDis
              t.form1.taxShareIdno = res.data.content[0].taxShareIdno
              t.form1.taxShareCountry = res.data.content[0].taxShareCountry
            }
          }).catch(() => {
            this.$Modal.error({
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
