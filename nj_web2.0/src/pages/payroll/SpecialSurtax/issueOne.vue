<template>
  <div>
    <div id="divContent">
      <Row>
        <i-col span="24">
          <Select style="width: 200px" clearable  placeholder="请输入继续教育类型" @on-change ="getPeriod">
            <Option :value="item.code" v-for="(item,index) in eduction" :key="index">{{item.name}}</Option>
          </Select>
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"
                 size="small" border ref="selection" :columns="eductionCode == '01degree' ? columns : columns1" :height="tableheight" :data="data"></Table>
        </i-col>
      </Row>
    </div>
    <Row>
    </Row>
    <el-dialog title="继续教育" width='1000px' style="overflow-y: scroll" :visible.sync="openUpdate" append-to-body>
      <Row style="max-height: 420px;overflow-y: auto;">
        <Form :model="form" label-position="right" ref="form" :label-width="110">
          <Row v-if="this.eductionCode == '01degree'">
            <i-col span="11">
              <FormItem label="继续教育阶段">
                <Input v-model="form.taxConeduLevelDis" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11"  offset="1">
              <FormItem label="入学日期">
                <Input v-model="form.taxConeduEntrydate" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="毕业日期">
                <Input v-model="form.taxConeduEnddate" disabled/>
              </FormItem>
            </i-col>
          </Row>
          <Row v-if="this.eductionCode == '02occupation'">
            <i-col span="11">
              <FormItem label="继续教育类型">
                <Input v-model="form.taxConeduProedutypeDis" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="发证批准日期">
                <Input v-model="form.taxConeduIssuedate" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11" >
              <FormItem label="证书名称" >
                <Input v-model="form.taxConeduIssue" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="证书编号">
                <Input v-model="form.taxConeduIssuecode" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="发证机关" >
                <Input v-model="form.taxConeduAgency" disabled/>
              </FormItem>
            </i-col>
          </Row>
          <!--<i-col span="11">-->
          <!--<FormItem label="继续教育类型">-->
          <!--<Input v-model="form.taxConeduType" disabled/>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11" offset="1">-->
          <!--<FormItem label="继续教育名称">-->
          <!--<Input v-model="form.taxConeduName" disabled/>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11">-->
          <!--<FormItem label="教育机构">-->
          <!--<Input v-model="form.taxConeduAgency" disabled/>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11" offset="1">-->
          <!--<FormItem label="继续教育阶段">-->
          <!--<Input v-model="form.taxConeduLevel" disabled></Input>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11">-->
          <!--<FormItem label="入学日期">-->
          <!--<Input v-model="form.taxConeduEntrydate" disabled/>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11" offset="1">-->
          <!--<FormItem label="员工类型">-->
          <!--<Input v-model="form.taxConeduEnddate" disabled></Input>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11">-->
          <!--<FormItem label="专业教育类型">-->
          <!--<Input v-model="form.taxConeduProedutype" disabled/>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11" offset="1">-->
          <!--<FormItem label="发证日期">-->
          <!--<Input v-model="form.taxConeduIssuedate" disabled></Input>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11">-->
          <!--<FormItem label="证书名称">-->
          <!--<Input v-model="form.taxConeduIssue" disabled/>-->
          <!--</FormItem>-->
          <!--</i-col>-->
          <!--<i-col span="11" offset="1">-->
          <!--<FormItem label="证书编号">-->
          <!--<Input v-model="form.taxConeduIssuecode" disabled></Input>-->
          <!--</FormItem>-->
          <!--</i-col>-->

        </Form>
      </Row>

    </el-dialog>
  </div>
</template>

<script>
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default {
    data() {
      return {
        messageData: [],
        oneType: '',
        tableselected: [],
        openUpdate: false,
        tableheight: document.body.offsetHeight - 300,
        data: [],
        form: {
          taxConeduType: '',
          taxConeduName: '',
          taxConeduAgency: '',
          taxConeduLevel: '',
          taxConeduEntrydate: '',
          taxConeduEnddate: '',
          taxConeduProedutype: '',
          taxConeduIssuedate: '',
          taxConeduIssue: '',
          taxConeduIssuecode: '',
          taxConeduLevelDis: '',
          taxConeduProedutypeDis: '',
        },
        columns: [
          {
            title: '入学日期',
            key: 'taxConeduEntrydate',
          },
          {
            title: '毕业时间',
            key: 'taxConeduEnddate',
          },
          {
            title: '继续教育阶段',
            key: 'taxConeduLevelDis',
          },
          {
            title: '操作',
            key: 'action',
            ellipsis: true,
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
        columns1: [
          {
            title: '继续教育类型',
            key: 'taxConeduProedutypeDis',
          },
          {
            title: '发证批准日期',
            key: 'taxConeduIssuedate',
          },
          {
            title: '证书名称',
            key: 'taxConeduIssue',
          },
          {
            title: '证书编号',
            key: 'taxConeduIssuecode',
          },
          {
            title: '发证机关',
            key: 'taxConeduAgency',
          },
          {
            title: '操作',
            key: 'action',
            ellipsis: true,
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
        eductionCode: '01degree',
        eduction: [
          {
            name: '学历(学位)继续教育',
            code: '01degree',
          },
          {
            name: '职业资格继续教育',
            code: '02occupation',
          },
        ],
      }
    },
    computed: {},
    components: {},
    props: {
      mainId: String,
      selectFyear: Array,
      ChildHeight: Number,
    },
    mounted() {
      this.getData(1)
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
          _mt: 'taxCont.getPage',
          funId: 1,
          taxConeduUserid: this.mainId,
          taxConeduType: this.eductionCode,
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
          _mt: 'taxCont.getById',
          id: id,
          logType: '根据id获取信息',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.taxConeduType = res.data.content[0].taxConeduType
            t.form.taxConeduName = res.data.content[0].taxConeduName
            t.form.taxConeduAgency = res.data.content[0].taxConeduAgency
            t.form.taxConeduLevel = res.data.content[0].taxConeduLevel
            t.form.taxConeduEntrydate = res.data.content[0].taxConeduEntrydate
            t.form.taxConeduEnddate = res.data.content[0].taxConeduEnddate
            t.form.taxConeduProedutype = res.data.content[0].taxConeduProedutype
            t.form.taxConeduIssuedate = res.data.content[0].taxConeduIssuedate
            t.form.taxConeduIssue = res.data.content[0].taxConeduIssue
            t.form.taxConeduIssuecode = res.data.content[0].taxConeduIssuecode
            t.form.taxConeduLevelDis = res.data.content[0].taxConeduLevelDis
            t.form.taxConeduProedutypeDis = res.data.content[0].taxConeduProedutypeDis
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
      getPeriod(value) {
        this.eductionCode = value
        this.getData(1)
      },
    },
  }
</script>

<style lang="scss" scoped>
  #divContent {
    width: 100%;
    /*overflow-y: auto;*/
    /*background: #18BE6A;*/
    /*border: solid 1px #DDDDDD;*/
  }

  .colStyle {
    font-size: 14px;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    border: dashed 1px #DADADA;
    margin-bottom: 5px;
    margin-right: -1px;
  }

  .colStyle:hover {
    background: #F2F2F2;
  }

  .colStyle span {
    color: #9499A8;
    padding-left: 10px;
    font-size: 12px;
    /*width: 25%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;*/
  }

  .btnStyle {
    display: flex;
    justify-content: flex-end;
  }

  .ivu-icon {
    border: solid 1px #444444;
    padding: 3px;
    border-radius: 7px;
    margin-right: 5px;
  }

  .spanTopStyle {
    margin-top: 10px;
  }

  .inlineClass {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: text-top;
    font-size: 12px;
  }

  .orderText {
    width: 120px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: text-top;
  }
</style>
