<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_communication.cmutImmsgLog.title')}}
        </p>
        <Row>
          <DatePicker type="datetime" :placeholder="$t('lang_communication.cmutImmsgLog.imsgSTime')" :editable="false" v-model="imsgSTime" style="width: 200px"></DatePicker>
          <DatePicker type="datetime" :placeholder="$t('lang_communication.cmutImmsgLog.imsgEtime')" :editable="false" v-model="imsgEtime" style="width: 200px"></DatePicker>
          <span @dblclick="clearSender">
            <Input v-model="imsgSenderDis" icon="search" :readonly="true" :placeholder="$t('lang_communication.cmutImmsgLog.imsgSenderDis')" style="width: 200px;" @on-click="pickSender" />
          </span>
          <Input :placeholder="$t('lang_communication.cmutImmsgLog.imsgKeyword')" style="width: 200px" v-model="imsgKeyword"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" :showTotal="showTotal" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <searchSender v-show="openPick" :searchCloumns="searchCloumns" :searchText="searchText" :params="params" @closeUp="closeUp1" @changeinput="changeinput" ref="searchSender"></searchSender>
    </transition>
  </div>
</template>
<script>
  import update from './cmutImmsgView'
  import searchSender from '../../../components/searchTable/searchSender'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew } from '../../../axios/axios'


  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        openPick: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.imsgSender'),
            key: 'imsgSenderDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.imsgSendtime'),
            width: 160,
            key: 'imsgSendtime',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.imsgReceiver'),
            key: 'imsgReceiverDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.imsgGroup'),
            key: 'imsgGroupDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.imsgMessagetype'),
            key: 'imsgMessagetypeDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.imsgContype'),
            key: 'imsgContypeDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.imsgContent'),
            key: 'imsgContent',
            sortable: 'custom',
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
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        searchCloumns: [
          {
            title: this.$t('lang_communication.cmutImmsgLog.name'),
            key: 'name',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.mobileNo'),
            key: 'mobileNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.cmutImmsgLog.email'),
            key: 'email',
            sortable: 'custom',
          },
        ],
        params: {
          _mt: 'userMgmt.userpage',
          sort: 'name',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
        data: [],
        total: 0,
        showTotal: true,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        imsgSTime: '',
        imsgEtime: '',
        imsgSender: '',
        imsgSenderDis: '',
        imsgKeyword: '',
      }
    },
    computed: {

    },
    components: {
      update,
      searchSender,
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
        const data = {
          _mt: 'cmutImmsg.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          funId: t.funId,
          logType: this.$t('button.ser'),
        }
        data['imsgSender'] = t.imsgSender
        data['imsgKeyword'] = t.imsgKeyword
        if (t.imsgSTime !== undefined) {
          data['imsgSTime'] = t.imsgSTime === '' ? '' : new Date(t.imsgSTime).format('yyyy-MM-dd hh:mm:ss')
        }
        if (t.imsgEtime !== undefined) {
          data['imsgEtime'] = t.imsgEtime === '' ? '' : new Date(t.imsgEtime).format('yyyy-MM-dd hh:mm:ss')
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
      pickSender() {
        const t = this
        t.$refs.searchSender.getData(this.params)
        t.openPick = true
      },
      changeinput(name, id) {
        const t = this
        t.imsgSenderDis = name
        t.imsgSender = id
      },
      closeUp1() {
        const t = this
        t.openPick = false
      },
      clearSender() {
        const t = this
        t.imsgSenderDis = ''
        t.imsgSender = ''
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
        this.expId = newArr
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType === this.$t('button.view')) {
          t.$refs.update.getData(id)
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
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
</style>
