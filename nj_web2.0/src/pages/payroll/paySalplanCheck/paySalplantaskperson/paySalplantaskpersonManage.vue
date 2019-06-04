<template>
  <div class="cover">
  <div class="box">
    <div class="title">
      <div class="title-text">
        <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
        &nbsp;{{$t('lang_payroll.paySalplan.person')}}
      </div>
      <Button type="text" @click="handleReset">
        <Icon type="close-round" size="16"></Icon>
      </Button>
    </div>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
  </div>
</template>
<script>
  import update from './paySalplantaskpersonView'
  import { isSuccess } from '../../../../lib/util'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
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
            title: this.$t('lang_payroll.paySalplan.salpltkpEmployeeNoDis'),
            key: 'salpltkpEmployeeNoDis',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpEmployeeDis'),
            key: 'salpltkpEmployeeDis',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpEmployeeCompanyDis'),
            key: 'salpltkpEmployeeCompanyDis',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpEmployeeDeptDis'),
            key: 'salpltkpEmployeeDeptDis',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpIsmainDis'),
            key: 'salpltkpIsmainDis',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpResdesc'),
            key: 'salpltkpResdesc',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpEmpstatusDis'),
            key: 'salpltkpEmpstatusDis',
          },
          // {
          //   title: this.$t('button.opr'),
          //   key: 'action',
          //   width: 70,
          //   fixed: 'right',
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'success',
          //           size: 'small',
          //         },
          //         on: {
          //           click: () => {
          //             this.openUp(params.row.id, this.$t('button.upd'), params.index)
          //           },
          //         },
          //       }, this.$t('button.upd')),
          //     ])
          //   },
          // },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: '1',
        taskId: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mounted() {
      // this.getData()
    },
    methods: {
      getData(taskId) {
        const t = this
        if (t.taskId === '') {
          t.taskId = taskId
        }
        const data = {
          _mt: 'paySalplantaskperson.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          salpltkpTaskid: t.taskId,
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
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'paySalplantaskperson.delByIds',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData()
                }
              }).catch((error) => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {},
          })
        }
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getTaskid(t.taskId)
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      handleReset() {
        this.taskId = ''
        this.$emit('closePerson')
        // this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd.scss";
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
