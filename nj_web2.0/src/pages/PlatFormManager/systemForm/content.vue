<template>
  <div class="content-main">
    <Row>
      <Input :placeholder="$t('lang_sysform.formField.p_sffPhyfield')" style="width: 200px" v-model="sffPhyfield"/>
      <Input :placeholder="$t('lang_sysform.formField.p_cnen')" style="width: 200px" v-model="sffFieldNameCnDis"/>
      <span style="margin: 0;"><Button type="primary" icon="search" @click="getdata(1)">{{$t('button.ser')}}</Button></span>
      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="$store.state.sysData.childTable1"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg" :logType="logType"  @hideMsg="hideMsg" ref="contentMsg"></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './contentMsg'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        logType: '',
        total: NaN,
        sort: 'sffOrder',
        order: 'asc',
        tableselected: [],
        rows: 10,
        page: 1,
        showMsg: false,
        sffPhyfield: '',
        sffFieldNameCnDis: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_sysform.formField.sffOrder'),
            key: 'sffOrder',
            width: 110,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sysform.formField.sffPhyfield'),
            key: 'sffPhyfield',
          },
          {
            title: this.$t('lang_sysform.formField.sffFieldNameCnDis'),
            key: 'sffFieldNameCnDis',
          },
          {
            title: this.$t('lang_sysform.formField.sffFieldNameEnDis'),
            key: 'sffFieldNameEnDis',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
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
      contentMsg,
    },
    methods: {
      getdata(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platSformfield.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          sffFieldNameCnDis: t.sffFieldNameCnDis,
          sffPhyfield: t.sffPhyfield,
          sffForm: t.$store.state.sysData.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
//          获取到表格数据存入vuex中
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('sysData/setChildTable1', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              t.total = 0
              this.$store.commit('sysData/setChildTable1', [])
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
          this.order = 'desc'
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
                _mt: 'platSformfield.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
                parentId: t.$store.state.sysData.mainId,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getdata()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {
            },
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
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('sysData/setChildId1', id)
        this.$store.commit('sysData/setIndex', index)
        if (id) {
          t.$refs.contentMsg.getFormData()
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      clear() {
        const t = this
        t.sffPhyfield = ''
        t.sffFieldNameCnDis = ''
        t.page = 1
        t.rows = 10
      }
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
