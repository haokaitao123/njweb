<template>
  <div>
    <div id="divContent">
      <Row>
        <i-col span="24" >
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"  :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </i-col>
      </Row>
    </div>

    <el-dialog title="住房贷款" width='1000px' style="overflow-y: scroll" :visible.sync="openUpdate" append-to-body>
      <Row style="max-height: 420px;overflow-y: auto;">
        <Form :model="form" label-position="right" ref="form" :label-width="120">
          <i-col span="11">
            <FormItem label="本人是否借款人">
              <!--<Input v-model="form.taxHoulnIsselfDis" disabled/>-->
              <RadioGroup v-model="form.taxHoulnIsselfDis">
                <Radio label="是" disabled>是</Radio>
                <Radio label="否" disabled>否</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem label="房屋证书类型">
              <Input v-model="form.taxHoulnTypeDis" disabled/>
            </FormItem>
          </i-col>
          <i-col span="22" >
            <FormItem label="房屋证书号码">
              <Input v-model="form.taxHoulnCode" disabled/>
            </FormItem>
          </i-col>
          <i-col span="22" >
            <FormItem label="房屋坐落地址">
              <Input v-model="form.taxHoulnAddress" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem label="是否婚前各自首套贷款，且婚后分别扣除50%">
              <Input v-model="form.taxHoulnIsmarriedDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" style="margin-bottom: 20px">
            <FormItem label="贷款类型">
              <Input v-model="form.taxHoulnLoantypeDis" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" v-show="form.taxHoulnLoantype === '01fund' || form.taxHoulnLoantype === '03port'?true:false">
            <FormItem label="公积金贷款银行">
              <Input v-model="form.taxHoulnLoanbank" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" v-show="form.taxHoulnLoantype === '01fund' || form.taxHoulnLoantype === '03port'?true:false">
            <FormItem label="公积金贷款合同编号">
              <Input v-model="form.taxHoulnLoanconcode" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11"v-show="form.taxHoulnLoantype === '01fund' || form.taxHoulnLoantype === '03port'?true:false">
            <FormItem label=" 公积金贷款首次还款日期">
              <Input v-model="form.taxHoulnSdate" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11"  v-show="form.taxHoulnLoantype === '01fund' || form.taxHoulnLoantype === '03port'?true:false">
            <FormItem label="公积金贷款贷款期限（月数）">
              <Input v-model="form.taxHoulnMonths" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" v-show="form.taxHoulnLoantype === '02busi' || form.taxHoulnLoantype === '03port'?true:false">
            <FormItem label="商业贷款银行">
              <Input v-model="form.taxHoulnBusiloanbank" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11"  v-show="form.taxHoulnLoantype === '02busi' || form.taxHoulnLoantype === '03port'?true:false">
            <FormItem label="商业贷款合同编号">
              <Input v-model="form.taxHoulnBusiloanconcode" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="商业贷款首次还款日期" v-show="form.taxHoulnLoantype === '02busi' || form.taxHoulnLoantype === '03port'?true:false">
              <Input v-model="form.taxHoulnBusisdate" disabled/>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem label="商业贷款期限（月数）" v-show="form.taxHoulnLoantype === '02busi' || form.taxHoulnLoantype === '03port'?true:false">
              <Input v-model="form.taxHoulnBusimonths" disabled></Input>
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
        data: [],
        openUpdate: false,
        form: {
          taxHoulnUserid: '',
          taxHoulnType: '',
          taxHoulnTypeDis: '',
          taxHoulnCode: '',
          taxHoulnAddress: '',
          taxHoulnIsmarried: '',
          taxHoulnIsmarriedDis: '',
          taxHoulnLoantype: '',
          taxHoulnLoantypeDis: '',
          taxHoulnLoanbank: '',
          taxHoulnIsself: '',
          taxHoulnIsselfDis: '是',
          taxHoulnLoanconcode: '',
          taxHoulnSdate: '',
          taxHoulnMonths: '',
          taxHoulnBusiloanbank: '',
          taxHoulnBusiloanconcode: '',
          taxHoulnBusisdate: '',
          taxHoulnBusimonths: '',
        },
        columns: [
          {
            title: '姓名',
            key: 'taxHoulnUserid',
            width: 60,
          },
          {
            title: '房屋证书类型',
            key: 'taxHoulnTypeDis',
            width: 100,
          },
          {
            title: '房屋证书号码',
            key: 'taxHoulnCode',
            width: 100,
          },
          {
            title: '房屋坐落地址',
            key: 'taxHoulnAddress',
            width: 60,
          },
          {
            title: '贷款类型',
            key: 'taxHoulnLoantypeDis',
            width: 100,
          },
          {
            title: '贷款银行',
            key: 'taxHoulnLoanbank',
            width: 100,
          },
          {
            title: '本人是否借款人',
            key: 'taxHoulnIsselfDis',
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
    props: {
      mainId: String,
    },
    components: {
    },
    mounted() {
      this.getData()
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
          _mt: 'taxHou.getPage',
          funId: 1,
          taxHoulnUserid: this.mainId,
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
          _mt: 'taxHou.getById',
          id: id,
          logType: '根据id获取信息',
        }).then((res) => {
          if (isSuccess(res, t)) {
            console.log(res,'44444')
            t.form.taxHoulnBusimonths = res.data.content[0].taxHoulnBusimonths
            t.form.taxHoulnBusisdate = res.data.content[0].taxHoulnBusisdate
            t.form.taxHoulnBusiloanconcode = res.data.content[0].taxHoulnBusiloanconcode
            t.form.taxHoulnMonths = res.data.content[0].taxHoulnMonths
            t.form.taxHoulnBusiloanbank = res.data.content[0].taxHoulnBusiloanbank
            t.form.taxHoulnSdate = res.data.content[0].taxHoulnSdate
            t.form.taxHoulnLoanconcode = res.data.content[0].taxHoulnLoanconcode
            t.form.taxHoulnIsself = res.data.content[0].taxHoulnIsself
            t.form.taxHoulnIsselfDis = res.data.content[0].taxHoulnIsselfDis
            t.form.taxHoulnLoanbank = res.data.content[0].taxHoulnLoanbank
            t.form.taxHoulnLoantype = res.data.content[0].taxHoulnLoantype
            t.form.taxHoulnLoantypeDis = res.data.content[0].taxHoulnLoantypeDis
            t.form.taxHoulnIsmarried = res.data.content[0].taxHoulnIsmarried
            t.form.taxHoulnIsmarriedDis = res.data.content[0].taxHoulnIsmarriedDis
            t.form.taxHoulnAddress = res.data.content[0].taxHoulnAddress
            t.form.taxHoulnCode = res.data.content[0].taxHoulnCode
            t.form.taxHoulnType = res.data.content[0].taxHoulnType
            t.form.taxHoulnTypeDis = res.data.content[0].taxHoulnTypeDis
            t.form.taxHoulnUserid = res.data.content[0].taxHoulnUserid
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
