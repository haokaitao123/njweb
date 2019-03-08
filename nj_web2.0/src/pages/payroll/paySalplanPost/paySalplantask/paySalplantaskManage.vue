<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_payroll.paySalplan.paysalplantask')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <!-- 根据需求修改不需要了 -->
      <Row>
        <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
        <Button type="primary" @click="copy">{{$t('lang_payroll.paySalplan.copy')}}</Button>
        <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
      </Row>
      <row class="table-form" ref="table-form">
        <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
      </row>
      <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      <transition name="fade">
        <update v-show="openUpdate" :id="updateId" :logType="logType" @getPlanid="getPlanid" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
      </transition>
      <transition name="fade">
        <person v-show="openPersondate" @closePerson="closePerson" @getData="getData"  ref="person"></person>
      </transition>
    </div>
  </div>
</template>
<script>
  import update from './paySalplantaskView'
  import person from './../paySalplantaskperson/paySalplantaskpersonManage'
  import { isSuccess } from '../../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../..//../../axios/axios'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        openPersondate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkDate'),
            key: 'salpltkDate',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkTaskshort'),
            key: 'salpltkTaskshort',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkTaskname'),
            key: 'salpltkTaskname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkIskeyDis'),
            key: 'salpltkIskeyDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkTime'),
            key: 'salpltkTime',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 150,
            fixed: 'right',
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openPerson(params.row.id)
                    },
                  },
                }, this.$t('lang_payroll.paySalplan.person')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'salpltkTime',
        order: 'asc',
        rows: '10',
        page: '1',
        date: '',
        planId: '',
      }
    },
    computed: {
    },
    components: {
      update,
      person,
    },
    mounted() {
      // this.getData()
    },
    methods: {
      getPlanid(id) {
        const t = this
        t.planId = id
      },
      getData(date) {
        const t = this
        if (t.date === '') {
          t.date = date
        }
        const data = {
          _mt: 'paySalplantask.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          salpltkDate: t.date,
          salpltkPlanid: t.planId,
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
                _mt: 'paySalplantask.delByIds',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
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
            onCancel: () => {},
          })
        }
      },
      copy() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_payroll.paySalplan.iscopay'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'paySalplantask.copyByIds',
                logType: '复制',
                ids: t.tableselected.toString(),
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
        t.$refs.update.getPlanid(t.planId, t.date)
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
        t.$refs.update.formValidate = {}
      },
      openPerson(id) {
        const t = this
        t.openPersondate = true
//        t.$refs.update.getSelect()
        t.$refs.person.getData(id)
      },
      closePerson() {
        const t = this
        t.openPersondate = false
      },
      handleReset() {
        this.date = ''
        this.$emit('closeUp')
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
