<template>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="$store.state.orderTeam.childTable1"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" :showTotal="showTotal" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updTeamMember v-show="showMsg" @hideMsg="hideMsg" ref="updTeamMember" :logType="logType"></updTeamMember>
  </div>
</template>
<script>
  import updTeamMember from './updTeamMember'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        logType: '',
        total: NaN,
        showTotal: true,
        sort: 'cmstmCode',
        order: 'asc',
        rows: 10,
        page: 1,
        showMsg: false,
        tableselected: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_cmut.TeamMem.cmstmStid'),
            key: 'cmstmStidDis',
            align: 'left',
          },
          {
            title: this.$t('lang_cmut.TeamMem.cmstmCode'),
            key: 'cmstmCode',
            align: 'left',
          },
          {
            title: this.$t('lang_cmut.TeamMem.cmstmUserid'),
            key: 'cmstmUseridDis',
            align: 'left',
          },
          {
            title: this.$t('lang_cmut.TeamMem.cmstmDistribute'),
            key: 'cmstmDistributeDis',
            align: 'left',
          },
          {
            title: this.$t('lang_cmut.TeamMem.cmstmIsvalid'),
            key: 'cmstmIsvalidDis',
            align: 'left',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updTeamMember,
    },
    methods: {
      getdata() {
        const t = this
        const data = {
          _mt: 'cmutSupteammember.getPage',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          cmstmStid: t.$store.state.orderTeam.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('orderTeam/setChildTable1', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('orderTeam/setChildTable1', [])
              t.total = res.data.content[0].records
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getdata()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getdata()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getdata()
        } else {
          this.order = order
        }
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
        if (t.tableselected.length > 0) {
          getDataLevelUserLogin({
            _mt: 'cmutSupteammember.delByIds',
            funId: '1',
            companyId: '1',
            logType: this.$t('button.del'),
            delIds: t.tableselected.toString(),
          }).then((res) => {
            t.$Modal.confirm({
              onOk: () => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getdata()
                }
              },
              title: this.$t('reminder.remind'),
              content: this.$t('reminder.confirmdelete'),
            })
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        } else {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        }
      },
      showMsgBtn() {
        this.showMsg = true
      },
      openUp(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        this.$store.commit('orderTeam/setChildId1', id)
        this.$store.commit('orderTeam/setIndex', index)
        if (id) {
          t.$refs.updTeamMember.getFormData()
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      close() {
        this.$emit('hideMsg')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .content-main{
    height: 500px;
    .table-form{
      margin: 10px 0;
    }
  }
</style>

