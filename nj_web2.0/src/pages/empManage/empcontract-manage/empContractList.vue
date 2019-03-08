<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_employee.empContractList.title')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_employee.empContractList.empctWorkNoDis')" style="width: 200px" v-model="empctWorkNoDis"/>
          <Input :placeholder="$t('lang_employee.empContractList.empctNameDis')" style="width: 200px" v-model="empctNameDis"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange"
              @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp"  ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './empContractEdit'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_employee.empContractList.empctWorkNo'),
            key: 'empctWorkNoDis',
            width: 100,
          },
          {
            title: this.$t('lang_employee.empContractList.empctName'),
            key: 'empctNameDis',
            width: 100,
          },
          {
            title: this.$t('lang_employee.empContractList.empctHirecompany'),
            key: 'empctHirecompanyDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.empContractList.empctDept'),
            key: 'empctDeptDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.empContractList.empctContracttype'),
            key: 'empctContracttypeDis',
            sortable: 'custom',
            width: 120,
          },
          {
            title: this.$t('lang_employee.empContractList.empctContractperiod'),
            key: 'empctContractperiodDis',
            sortable: 'custom',
            width: 120,
          },
          {
            title: this.$t('lang_employee.empContractList.empctContractsdate'),
            key: 'empctContractsdate',
            sortable: 'custom',
            width: 120,
          },
          {
            title: this.$t('lang_employee.empContractList.empctContractedate'),
            key: 'empctContractedate',
            sortable: 'custom',
            width: 120,
          },
          {
            title: this.$t('lang_employee.empContractList.empctProbation'),
            key: 'empctProbationDis',
            sortable: 'custom',
            width: 120,
          },
          {
            title: this.$t('lang_employee.empContractList.empctProbationdate'),
            key: 'empctProbationdate',
            sortable: 'custom',
            width: 120,
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
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        funId: '1000',
        empctWorkNoDis: '',
        empctNameDis: '',
      }
    },
    computed: {

    },
    components: {
      update,
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
        const data = {
          _mt: 'empContract.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          empctWorkNoDis: t.empctWorkNoDis,
          empctNameDis: t.empctNameDis,
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
      /**
       * 排序
       * @param column
       */
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
      /**
       * 打开编辑页面
       * @param id
       * @param logType
       * @param index
       */
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getData(id)
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
    },
  }
</script>
<style lang="scss" scoped>
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
</style>
