<template>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <!-- <Button type="primary" @click="defineField">字段定义</Button> -->
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="$store.state.flowStepData.childTable1"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>

    <!-- 新增页面 -->
    <updDataBloack v-show="showMsg" @hideMsg="hideMsg" ref="updDataBloack" :logType="logType"></updDataBloack>

    <!-- 字段定义页面 -->
    <fieldDefinition v-show="showField" @hideField="hideField" ref="fieldDefinition"></fieldDefinition>

  </div>
</template>
<script>
  import updDataBloack from './updDataBloack'
  import fieldDefinition from './fieldDefinition'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  //  引入字段定义页面

  export default {
    data() {
      return {
        logType: '',
        total: NaN,
        sort: 'flsdbOrder',
        order: 'asc',
        rows: 10,
        page: 1,
        tableselected: [],
        showMsg: false,
        showField: false, //  控制字段定义页面是否显示
        getId: '',  //  获取步骤表单定义id
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_flow.dataBlock.flsdbOrder'),
            key: 'flsdbOrder',
            width: 80,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_flow.dataBlock.flsdbCnName'),
            key: 'flsdbCnName',
//            align: 'center',
          },
          {
            title: this.$t('lang_flow.dataBlock.flsdbEnName'),
            key: 'flsdbEnName',
//            align: 'center',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '8px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.flsdbType === '02subtable' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.defineField(params.row.id)
                    },
                  },
                }, this.$t('lang_flow.dataBlock.btn_fielddef')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updDataBloack,
      fieldDefinition,
    },
    methods: {
      getdata(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platflsDBlock.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          flsdbStep: t.$store.state.flowStepData.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('flowStepData/setChildTable1', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('flowStepData/setChildTable1', [])
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
              // 添加请求模块
              getDataLevelUserLogin({
                _mt: 'platflsDBlock.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
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
            onCancel: () => {},
          })
        }
      },
      openUp(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        this.$store.commit('flowStepData/setIndex', index)
        this.$store.commit('flowStepData/setChildId1', id)
        if (id) {
          t.$refs.updDataBloack.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      // 字段定义页面显示 start
      defineField(id) {
        const t = this
        this.showField = true
        t.$refs.fieldDefinition.getOptional(id)
        t.$refs.fieldDefinition.getselected(id)
        t.$refs.fieldDefinition.resetField()
      },
      hideField() {
        this.showField = false
      },
      // 字段定义页面显示 end
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
