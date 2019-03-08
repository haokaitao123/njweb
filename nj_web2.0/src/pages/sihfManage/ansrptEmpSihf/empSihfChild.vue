<template>
  <div class="content-main">
    <Row>
      <!--<Input placeholder="请输入用户名/手机号搜索..." style="width: 200px" v-model="nameOrMobile"/>-->
      <!--<span style="margin: 0;"><Button type="primary" icon="search" @click="getdata">{{$t('button.ser')}}</Button></span>-->
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="445" size="small" border
             ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
          @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg" @hideMsg="hideMsg" :id="id" :logType="logType" :idname="idname" ref="contentMsg" @getData="addNewArray"
                @update="updateArray"></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './editSihfChild'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        total: NaN,
        logType: '',
        showMsg: false,
        nameOrMobile: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsInsurance'),
            key: 'empinsInsuranceDis',
//            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsBaseamt'),
            key: 'empinsBaseamt',
//            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsCompratio'),
            key: 'empinsCompratio',
//            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsCompamt'),
            key: 'empinsCompamt',
//            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsPersratio'),
            key: 'empinsPersratio',
//            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsPersamt'),
            key: 'empinsPersamt',
//            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsSdate'),
            key: 'empinsSdate',
//            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsEdate'),
            key: 'empinsEdate',
//            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showMsgBtn(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        params: {
          _mt: 'ansrptEmpSihfInsurance.getPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          logType: '',
          empinsEmpid: '',
          empinsType: '01social',
        },
        index: '',
        tableselected: '',
      }
    },
    props: {
      id: Number,
      idname: String,
    },
    components: {
      contentMsg,
    },
    methods: {
      getdata() {
        const t = this
        t.params.logType = '查询List信息'
        t.params.empinsEmpid = t.$store.state.ansrptEmpSihf.childId1
        const data = deepCopy(t.params)
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.total = res.data.content[0].records
            t.data = res.data.content[0].rows
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getdata()
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (this.params.order !== 'normal') {
          this.getdata()
        } else {
          this.params.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        t.index = index
        t.$refs.contentMsg.setRowId(id)
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
      hideMsg() {
        this.showMsg = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .content-main {
    height: 500px;
    .table-form {
      margin: 10px 0;
    }
  }
</style>
