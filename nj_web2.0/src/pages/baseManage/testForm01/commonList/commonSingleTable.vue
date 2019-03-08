<template>
  <Row>
    <Col span="24">
    <Row>
      <Button class="btns" v-for="(item, index) in btns" :key="index" type="primary" @click="btnFunction(item.btn_id)">{{item.btn_title}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-select-changed="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
            <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    </Col>
    <transition name="fade">
      <selCountry v-show="openSelCountry" selSort="id" selOrder="asc" @selOk="countrySelOk" @close="closeSelCountry" ref="selCountry"></selCountry>
    </transition>
    <testUpdPage v-if="openTestUpd" @close="closeTest" ref="testUpdPage" :tbName="tbName" :id="formNo"></testUpdPage>
  </Row>
</template>
<script>
  import { getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'
  import selCountry from '../../../../components/commonsel/selCountry'
  import testUpdPage from './commonSinglePageUpdate'

  export default{
    data() {
      return {
        value: '',
        logType: '',
        openUpdate: false,
        openTestUpd: false,
        updateId: NaN,
        tableselected: [],
        columns: [],
        tbName: '',
        btns: [],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        countryId: '',
        countryCn: '',
        openSelCountry: false,
        formNo: '',
        revise: {
          width: 65,
          title: this.$t('button.opr'),
          key: 'action',
          fixed: 'right',
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
                    this.openUp(params.row.id, params.index)
                  },
                },
              }, this.$t('button.upd')),
            ])
          },
        },
      }
    },
    props: {
      pklv: String,
      tableheight: {
        type: String,
        default: document.body.offsetHeight - 280 + '',
      },
    },
    computed: {

    },
    components: {
      selCountry,
      testUpdPage,
    },
    created() {
      this.getColumns()
    },
    mounted() {
    },
    methods: {
      getColumns() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platAutoLayoutGetList.getListColumn',
          logType: 'getListColumn',
        }).then((res) => {
          if (isSuccess(res, t)) {
            let aa = []
            t.btns = res.data.content[0].btns
            t.tbName = res.data.content[0].tbName
            aa = res.data.content[0].columns
            for (let i = 0; i < aa.length; i++) {
              if (!aa[i].width) {
                aa[i].width = 140
              } else {
                aa[i].width = 60
              }
            }
            t.columns = aa
            for (let i = 0; i < t.btns.length; i++) {
              if (t.btns[i].btn_id === 'button_code7') {
                t.btns.splice(i, 1)
                t.columns.push(t.revise)
                break
              }
            }
            this.getData()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      btnFunction(btnId) {
        if (btnId === 'button_code1') {
          this.formNo = '0'
          this.openTestUpd = true
        }
      },
      openUp(id, index) {
        this.formNo = id
        this.openTestUpd = true
      },
      closeTest() {
        this.openTestUpd = false
      },
      getData() {
        const t = this
        const data = {
          _mt: 'platAutoLayoutGetList.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: 'getPage2',
          data: '',
        }
        if (t.pklv !== '') {
          data.data = JSON.stringify({
            pklv: t.pklv,
          })
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = JSON.parse(res.data.content[0].rows)
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
      sortable(column) {
        this.sort = column.key
        if (column.order !== 'normal') {
          this.order = column.order
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
        this.tableselected = newArr.toString()
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: '请选择要删除的象',
          })
          return
        }
        getDataLevelUserLogin({
          _mt: '',
          logType: this.$t('button.del'),
          ids: t.tableselected,
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
      pickCountrySel() {
        this.$refs.selCountry.getData()
        this.openSelCountry = true
      },
      countrySelOk(countryId, countryCn) {
//        alert(countryId + ' ' + countryCn)
        this.countryId = countryId
        this.countryCn = countryCn
      },
      closeSelCountry() {
        this.openSelCountry = false
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
  .btns{
    margin-right: 5px;
  }
</style>
