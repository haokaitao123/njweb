<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{titleName}}
        </p>
        <Row>
          <Button class="btns" v-for="(item, index) in btns" :key="index" :type="item.btn_id === 'button_del' ? 'error':'primary'" @click="btnFunction(item.btn_id)">{{item.btn_title}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select-changed="selectedtable" border :height="tableheight" size="small" ref="selection" :columns="columns" :loading="data.length === 0" :data="data"></Table>
        </row>
          <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <selCountry v-show="openSelCountry" selSort="id" selOrder="asc" @selOk="countrySelOk" @close="closeSelCountry" ref="selCountry"></selCountry>
    </transition>
    <commonFlowUpdate v-if="openTestUpd"
                      @close="closeTest"
                      ref="commonFlowUpdate"
                      @getData="getData"
                      :columns="columns"
                      :flowId="flowId"
                      :pkValue="pkValue"
                      :stepId="stepId"
                      :setpName="stepName"
                      :stepState="stepState">
    </commonFlowUpdate>
  </div>
</template>
<script>
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import selCountry from '../../../components/commonsel/selCountry'
  import commonFlowUpdate from './commonFlowUpdate'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        openTestUpd: false,
        updateId: NaN,
        tableselected: [],
        columns: [],
        tbName: '',
        btns: [],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        countryId: '',
        countryCn: '',
        openSelCountry: false,
        flowId: '',
        stepId: '',
        pkValue: '',
        funId: this.$store.state.user.childFunId,
        stepState: '',
        stepName: '',
        step: [],
        titleName: '',
        flowStep: {
          width: 65,
          title: '步骤',
          align: 'center',
        },
      }
    },
    computed: {

    },
    components: {
      selCountry,
      commonFlowUpdate,
//      update,
    },
//    created() {
//
//    },
    mounted() {
      this.getColumns()
    },
    methods: {
      refresh() {
        this.getColumns()
      },
      getColumns() {
        const t = this
        t.data = []
        getDataLevelUserLogin({
          _mt: 'platAutoLayoutGetFlowList.getListColumn',
          roleType: t.$store.state.user.roleType,
          logType: 'getListColumn',
        }).then((res) => {
          if (isSuccess(res, t)) {
            let aa = []
            t.flowId = res.data.content[0].flowId
            t.btns = res.data.content[0].btns
            t.titleName = res.data.content[0].flowName
            t.tbName = res.data.content[0].tbName
            aa = res.data.content[0].columns
            for (let i = 0; i < aa.length; i++) {
              aa[i].sortable = false
              if (!aa[i].width) {
                aa[i].width = 120
              } else {
                aa[i].width = 60
              }
              if (aa[i].className !== '') {
                aa[i].width = 120
                aa[i]['render'] = (h, params) => {
                  let bb = []
                  if (params.row[aa[i].key]) {
                    bb = params.row[aa[i].key].split('$')
                  }
                  let text = ''
                  let show = ''
                  switch (bb[3]) {
                    case 'p_flowst_0': show = '未开启'
                      break
                    case 'p_flowst_1': show = '待处理'
                      break
                    case 'p_flowst_2': show = '处理中'
                      break
                    case 'p_flowst_3': show = '已完成'
                      break
                  }
                  if (bb[2]) {
                    text = '[ ' + bb[2] + ' ]'
                  }
                  if (text !== '') {
                    return h('Tooltip', {
                      props: {
                        trigger: 'hover',
                        content: show,
                        placement: 'right',
                      },
                    }, [
                      h('div', {
                        style: {
                          width: '119px',
                          height: '100%',
                          'line-height': '40px',
                          'text-align': 'center',
                        },
                        on: {
                          click: async () => {
                            let stepId = params.row[params.column.key].split('$')[1]
//                            alert(stepId)
                            this.stepState = params.row[params.column.key].split('$')[3]
                            if (this.stepState === 'p_flowst_0') {
                              return
                            }
                            this.stepName = params.row[params.column.key].split('$')[5]
                            await this.getData()
                            this.openUp(params.row.id, stepId, params.index)
                          },
                        },
                      }, text),
                    ])
                  }
                  return h()
                }
              }
            }
            t.columns = aa
            if (this.$store.state.user.funId) {
              this.getData()
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      formColumns(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].className !== '') {
            this.step.push(data[i].key)
          }
        }
      },
      btnFunction(btnId) {
        if (btnId === 'button_add') {
          this.stepId = '0'
          this.stepState = ''
          this.pkValue = '0'
          this.openTestUpd = true
        }
      },
      openUp(pkValue, stepId, index) {
        this.stepId = stepId
        this.pkValue = pkValue
        this.index = index
        this.openTestUpd = true
      },
      closeTest() {
        this.stepName = ''
        this.openTestUpd = false
      },
      getData() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platAutoLayoutGetFlowList.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          roleType: t.$store.state.user.roleType,
          logType: 'getPage',
          data: '',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.data = JSON.parse(res.data.content[0].rows)
            for (let i = 0; i < t.data.length; i++) {
              t.data[i].cellClassName = {}
              for (let item in t.data[i]) {
                if (typeof t.data[i][item] === 'string') {
                  if (t.data[i][item].split('$').length > 1) {
                    t.data[i].cellClassName[item] = t.data[i][item].split('$')[3]
                  }
                }
              }
            }
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      addNewArray(res) {
        const t = this
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      sortable(column) {
        this.sort = column.key
        if (column.order !== 'normal') {
          this.order = column.order
          this.getData()
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: '请选择要删除的象',
          })
          return
        }
        getDataLevelUserLogin({
          _mt: '',
          logType: this.$t('button.del'),
          ids: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getData()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pickCountrySel() {
        this.$refs.selCountry.getData()
        this.openSelCountry = true
      },
      countrySelOk(countryId, countryCn) {
//        alert(countryId + ' ' + countryCn)
        this.countryId = countryId
        this.countryCn = countryCn
      },
      closeSelCountry() {
        this.openSelCountry = false
      },
    },
    watch: {
      $route(value, from) {
        if (value.name === 'commonFlowList') {
          console.log(from)
          this.getColumns()
        }
      },
    },
  }
</script>
<style lang="scss" >
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .btns{
    margin-right: 5px;
  }
  .table-form{
  margin-top: 10px;
  .ivu-table{
  .p_flowst_0{
  .ivu-table-cell{
    height: 40px;
    padding: 0;
  }
  }
  .p_flowst_1{
    background-color: #ffc100;
    color: #fff;
    cursor: pointer;
  .ivu-table-cell{
    height: 40px;
    padding: 0;
  }
  }
  .p_flowst_1:hover{
    transition: all .3s;
    background-color: #edb300;
  }
  .p_flowst_2{
    background-color: #4472c5;
    color: #fff;
    cursor: pointer;
  .ivu-table-cell{
    height: 40px;
    padding: 0;
  }
  }
  .p_flowst_2:hover{
    transition: all .3s;
    background-color: #395fa5;
  }
  .p_flowst_3{
    background-color: #70ad46;
    color: #fff;
    cursor: pointer;
  .ivu-table-cell{
    height: 40px;
    padding: 0;
  }
  }
  .p_flowst_3:hover{
    transition: all .3s;
    background-color: #598937;
  }
  }
  }

</style>

