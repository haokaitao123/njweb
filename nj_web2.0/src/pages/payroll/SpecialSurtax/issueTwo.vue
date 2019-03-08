<template>
  <div>
    <div id="divContent">
      <Row>
        <i-col span="24" >
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"  :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </i-col>
      </Row>
    </div>


    <el-dialog title="子女教育" width='1000px' style="overflow-y: scroll" :visible.sync="openUpdate" append-to-body>
      <Row style="max-height: 420px;overflow-y: auto;">
        <Form :model="form" label-position="right" ref="form" :label-width="110">
          <i-col span="11">
            <FormItem label="姓名">
              <Input v-model="form.taxChdeduName" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="证件类型">
              <Input v-model="form.taxChdeduIdtypeDis" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="证件号码">
              <Input v-model="form.taxChdeduIdno" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="出生日期">
              <Input v-model="form.taxChdeduBirth" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="国籍">
              <Input v-model="form.taxChdeduNation" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="当前受教育阶段">
              <Input v-model="form.taxChdeduLevel" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="教育机构名称">
              <Input v-model="form.taxChdeduAgency" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="入学日期">
              <Input v-model="form.taxChdeduEntrydate" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="毕业日期">
              <Input v-model="form.taxConeduEnddate" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="教育终止日期">
              <Input v-model="form.taxChdeduExpdate" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="就读国家">
              <Input v-model="form.taxChdeduCountry" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="本人扣除比例">
              <Input v-model="form.taxChdeduDedrate" disabled></Input>
            </FormItem>
          </i-col>

          <!--<i-col span="11">-->
            <!--<FormItem label="关系">-->
              <!--<Input v-model="form.taxChdeduRelation" disabled/>-->
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
          taxChdeduUserid: '',
          taxChdeduName: '',
          taxChdeduIdtype: '',
          taxChdeduIdno: '',
          taxChdeduBirth: '',
          taxChdeduNation: '',
          taxChdeduLevel: '',
          taxChdeduLevelDis: '',
          taxChdeduAgency: '',
          taxChdeduEntrydate: '',
          taxConeduEnddate: '',
          taxChdeduExpdate: '',
          taxChdeduCountry: '',
          taxChdeduDedrate: '',
          taxChdeduRelation: '',
          taxChdeduIdtypeDis: '',
        },
        columns: [
          {
            title: '姓名',
            key: 'taxChdeduName',
            width: 60,
          },
          {
            title: '证件类型',
            key: 'taxChdeduIdtype',
            width: 100,
          },
          {
            title: '证件号码',
            key: 'taxChdeduIdno',
            width: 100,
          },
          {
            title: '出生日期',
            key: 'taxChdeduBirth',
            width: 100,
          },
          {
            title: '国籍',
            key: 'taxChdeduNation',
            width: 60,
          },
          {
            title: '入学日期',
            key: 'taxChdeduEntrydate',
            width: 100,
          },
          {
            title: '毕业日期',
            key: 'taxConeduEnddate',
            width: 100,
          },
          {
            title: '本人扣除比例',
            key: 'taxChdeduDedrate',
            width: 100,
          },
          {
            title: '操作',
            key: 'action',
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
          _mt: 'taxChi.getPage',
          funId: 1,
          taxChdeduUserid: this.mainId,
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
          _mt: 'taxChi.getById',
          id: id,
          logType: '根据id获取信息',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.taxChdeduUserid = res.data.content[0].taxChdeduUserid
            t.form.taxChdeduName = res.data.content[0].taxChdeduName
            t.form.taxChdeduIdtype = res.data.content[0].taxChdeduIdtype
            t.form.taxChdeduIdno = res.data.content[0].taxChdeduIdno
            t.form.taxChdeduBirth = res.data.content[0].taxChdeduBirth
            t.form.taxChdeduNation = res.data.content[0].taxChdeduNation
            t.form.taxChdeduLevel = res.data.content[0].taxChdeduLevel
            t.form.taxChdeduLevelDis = res.data.content[0].taxChdeduLevelDis
            t.form.taxChdeduAgency = res.data.content[0].taxChdeduAgency
            t.form.taxChdeduEntrydate = res.data.content[0].taxChdeduEntrydate
            t.form.taxConeduEnddate = res.data.content[0].taxConeduEnddate
            t.form.taxChdeduExpdate = res.data.content[0].taxChdeduExpdate
            t.form.taxChdeduCountry = res.data.content[0].taxChdeduCountry
            t.form.taxChdeduDedrate = res.data.content[0].taxChdeduDedrate
            t.form.taxChdeduRelation = res.data.content[0].taxChdeduRelation
            t.form.taxChdeduIdtypeDis = res.data.content[0].taxChdeduIdtypeDis
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
