<template>
  <div class="content-main">
    <Row>
    </Row>
    <row class="table-form1" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="420" size="small" border
             ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :current="params.page" :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
          @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg" @hideMsg="hideMsg"  ref="contentMsg" @getData="addNewArray"
                @update="updateArray"></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './hfcalcChildBase'
  import {getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        total: NaN,
        showMsg: false,
        nameOrMobile: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_sihfCalc.sihfHfcalc.sihfccempCompany'),
            key: 'sihfccempCompanyDis',
            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_sihfCalc.sihfHfcalc.sihfccempDept'),
            key: 'sihfccempDeptDis',
            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_sihfCalc.sihfHfcalc.sihfccempCname'),
            key: 'sihfccempCname',
            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_sihfCalc.sihfHfcalc.sihfccempEmpworkno'),
            key: 'sihfccempEmpworkno',
            sortable: 'custom',
            width: 180,
          },
          {
            title: this.$t('lang_sihfCalc.sihfHfcalc.sihfccempEmpgid'),
            key: 'sihfccempEmpgid',
            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_sihfCalc.sihfHfcalc.sihfccempPersttamt'),
            key: 'sihfccempPersttamt',
            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_sihfCalc.sihfHfcalc.sihfccempCompttamt'),
            key: 'sihfccempCompttamt',
            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 120,
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
                      this.showMsgBtn(params.row, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                  },
                  on: {
                    click: () => {
                      this.detail(params.row, this.$t('button.det'), params.index)
                    },
                  },
                }, this.$t('button.det')),
              ])
            },
          },
        ],
        data: [],
        params: {
          _mt: 'sihfHfcalc.getPageChild',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          logType: '',
          sihfccempHfcalcid: '',
        },
        index: '',
        tableselected: '',
      }
    },
    props: {
//      id: Number,
      idname: String,
      sihfcalcPeriodDis: String,
    },
    components: {
      contentMsg,
    },
    methods: {
      getdata(page) {
        const t = this
        if (page) {
          t.params.page = page
        }
        t.params.logType = '查询List信息'
        t.params.sihfccempHfcalcid = t.$store.state.hfcalcJsBase.mainId
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
      showMsgBtn(row, logType, index) {
        const t = this
        t.showMsg = true
        this.$store.commit('hfcalcJsBase/setDataType', 'check')
        t.index = index
        if (row.id) {
          this.$store.commit('hfcalcJsBase/setChildId1', row.id)
          t.$refs.contentMsg.getOptionData(row)
        }
        t.$refs.contentMsg.getOption(logType)
      },
      detail(row, logType, index) {
        const t = this
        t.showMsg = true
        t.index = index
        this.$store.commit('hfcalcJsBase/setDataType', 'detail')
        if (row.id) {
          this.$store.commit('hfcalcJsBase/setChildId1', row.id)
          t.$refs.contentMsg.getOptionData(row)
        }
        console.log(this.sihfcalcPeriodDis + ' ' + row.sihfccempCname)
        let te = this.sihfcalcPeriodDis + ' ' + row.sihfccempCname
        t.$refs.contentMsg.getOption(te)
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
        t.getdata(1)
//        t.data.splice(t.index, 1, res)
      },
      hideMsg() {
        this.showMsg = false
//        this.getdata()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .content-main {
    /*height: 550px;*/
    .table-form1 {
      margin: 10px 0;
    }
  }
</style>
