<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{row.period + ' ' + row.paccSalarysetDis + ' '  + row.pacemCname + ' ' + $t('lang_payroll.payAccItem.title')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="content-main">
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        <transition name="fade">
          <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import update from './accEmpItemView'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        logType: '',
        updateId: NaN,
        openUpdate: false,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemEmpworkno'),
            key: 'pacemEmpworkno',
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemCname'),
            key: 'pacemCname',
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemimItem'),
            key: 'pacemimItemDis',
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemimValue'),
            key: 'pacemimValueDis',
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemimCurrency'),
            key: 'pacemimCurrencyDis',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 64,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        empRow: {}, // 员工信息
        data: [],
        total: 0,
        index: 0,
        sort: 'paceminOrder',
        order: 'asc',
        rows: 10,
        page: 1,
        funId: '1000',
        pacemimPacemid: '',
        pacemEmpworkno: '',
        pacemCname: '',
      }
    },
    props: {
      row: Object,
    },
    computed: {
    },
    components: {
      update,
    },
    mounted() {
    },
    methods: {
      getEmpRow(empRow) {
        const t = this
        t.pacemimPacemid = empRow.id
        t.pacemEmpworkno = empRow.pacemEmpworkno
        t.pacemCname = empRow.pacemCname
        t.getData()
      },
      getData() {
        const t = this
        const data = {
          _mt: 'payAccountEmpitem.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          pacemimPacemid: t.pacemimPacemid, // 主表(核算员工表)id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            for (let i = 0; i < t.data.length; i++) {
              t.data[i].pacemEmpworkno = t.pacemEmpworkno
              t.data[i].pacemCname = t.pacemCname
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
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
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
        this.tableselected = newArr
      },
      openUp(row, logType, index) {
        const t = this
        t.updateId = parseInt(row.id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getData(row)
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      handleReset() {
        const t = this
        t.$emit('closeItem')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .content-main{
    height: 430px;
    .table-form{
      margin: 10px 0;
    }
  }
</style>
