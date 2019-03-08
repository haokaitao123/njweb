<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_role.suvadmin.title2')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_role.suvadmin.infoTitle')" style="width: 200px" v-model="platRcdSuvidDis"/>
          <Input :placeholder="$t('lang_role.que.platRasEmpName')" style="width: 200px" v-model="platRasEmpName"/>
          <Input :placeholder="$t('lang_role.que.platRasEmpNo')" style="width: 200px" v-model="platRasEmpNo"/>
          <span style="margin: 0;"><Button type="primary" icon="search"
                                           @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection"
                 :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp"
              @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './editResultQuery'
  import {getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../../axios/axios'

  import {isSuccess} from '../../../lib/util'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        opendialog: false,
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
//          {
//            title: '调查记录id',
//            key: 'platRasRcdid',
//            sortable: 'custom',
//            width: 150,
//          },
//          {
//            title: '调查分类id',
//            key: 'platRasCatid',
//            sortable: 'custom',
//            width: 150,
//          },
          {
            title: this.$t('lang_role.que.platRasEmpName'),
            key: 'platRasEmpName',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_role.que.platRasEmpNo'),
            key: 'platRasEmpNo',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_role.que.platRasEmpName'),
            key: 'platRcdSuvidDis',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_role.que.platRasQustidDis'),
            key: 'platRasQustidDis',
            sortable: 'custom',
//            width: 200,
          },
          {
            title: this.$t('lang_role.que.platRasAnsweren'),
            key: 'platRasAnsweren',
            sortable: 'custom',
//            width: 200,
          },
          {
            title: this.$t('lang_role.que.platRasAnswercn'),
            key: 'platRasAnswercn',
            sortable: 'custom',
//            width: 200,
          },
          {
            title: this.$t('lang_role.que.platRasValue'),
            key: 'platRasValue',
            sortable: 'custom',
//            width: 200,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
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
                      this.openUp(params.row.id, this.$t('button.view'))
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        index: 0,
        platRasEmpName: '',
        platRcdSuvidDis: '',
        platRasEmpNo: '',
        logType: '',
      }
    },
    computed: {},
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
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          _mt: 'platRecordanswer.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          platRasEmpName: t.platRasEmpName,
          platRcdSuvidDis: t.platRcdSuvidDis,
          platRasEmpNo: t.platRasEmpNo,
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
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
                _mt: 'authSysLog.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
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
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.openUpdate = true
        t.index = index
        t.logType = logType
        if (logType === this.$t('button.view')) {
          t.$refs.update.getData(t.updateId)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.platRasEmpName = ''
        t.$refs.update.formValidate.platRcdSuvidDis = ''
        t.$refs.update.formValidate.platRasQustidDis = ''
        t.$refs.update.formValidate.platRasAnsweren = ''
        t.$refs.update.formValidate.platRasValue = ''
        t.$refs.update.formValidate.platRasAnswercn = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

</style>
