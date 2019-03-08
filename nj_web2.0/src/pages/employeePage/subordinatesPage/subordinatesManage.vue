<template>
  <div class="table">
    <Row>
      <i-Col span="24">
      <card>
        <Row>员工档案 在职<strong style="color: red">{{active}}</strong>人 试用期<strong style="color: red">{{probation}}</strong>人</Row>
        <Row>
          <Select style="width: 200px"  v-model="empcompDept"  placeholder="请选择部门">
            <Option :value="item.id"  v-for="(item,index) in selectDept" key="index">{{item.unitsName}}</Option>
          </Select>
          <Select style="width: 200px"  v-model="empcompPost"  placeholder="请选择岗位">
            <Option :value="item.id"  v-for="(item,index) in selectPost" key="index">{{item.postFnameDis}}</Option>
          </Select>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </i-Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUp="closeUp" @getData="getData" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './essAdminInfo'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        pklv: '',
        tableheight: document.body.offsetHeight - 200,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        selectDept: [],
        selectPost: [],
        tableselected: [],
        active: '',
        probation: '',
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_employee.employeeView.empName'),
            key: 'empName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.employeeView.empcompHirecompanyDis'),
            key: 'empcompHirecompanyDis',
          },
          {
            title: this.$t('lang_employee.employeeView.empcompDeptDis'),
            key: 'empcompDeptDis',
          },
          {
            title: this.$t('lang_employee.employeeView.empcompPostDis'),
            key: 'empcompPostDis',
          },
          {
            title: this.$t('lang_employee.employeeView.empidTypeDis'),
            key: 'empidTypeDis',
          },
          {
            title: this.$t('lang_employee.employeeView.empidNo'),
            key: 'empidNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.employeeView.empcompEntrydate'),
            key: 'empcompEntrydate',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.employeeView.empkiWorkno'),
            key: 'empkiWorkno',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.employeeView.empkiEmptypeDis'),
            key: 'empkiEmptypeDis',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 75,
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
                      this.openUp(params.row.id, '查看', params.index)
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        empcompDept: '',
        empcompPost: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mounted() {
      this.getSelect()
      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'viewEmpMaster.getSubordinatesPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          empId: this.$store.state.user.sysUsempid,
          empcompDept: t.empcompDept,
          empcompPost: t.empcompPost,
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
        getDataLevelUserLogin({
          _mt: 'viewEmpMaster.getEmpTotal',
          empId: this.$store.state.user.sysUsempid,
          logType: '根据员工id获取统计数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            const tot = res.data.content[0].value.split(',')
            this.active = tot[0]
            this.probation = tot[1]
          }
        }).catch(() => {
          this.$Modal.error({
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
      openUp(id, logType, index) {
        const t = this
        t.openUpdate = true
        t.logType = logType
//      将本条数据的id传入mainid（如果有的话）
//        this.$store.commit('subordinatesPo/setMainId', id)
//        this.$store.commit('subordinatesPo/setChildId1', id)
//        this.$store.commit('subordinatesPo/setIndex', index)
        t.$refs.update.getOptionData(id)
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        // t.$refs.update.clear()
      },
      getSelect() {
        const t = this
        const data = {
          _mt: 'orgUnits.getSelectValue',
          unitType: '02dept',
          logType: this.$t('button.ser'),
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.selectDept = (res.data.content[0].value)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        getDataLevelUserLogin({
          _mt: 'orgPost.getSelectValue',
          logType: this.$t('button.ser'),
          data: '{}',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectPost = (res.data.content[0].value)
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
  .table{
    margin-top: 46px;
  }
</style>
