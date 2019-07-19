<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_baseManage.wxMsgRecord.wxMsgRecord')}}
        </p>
        <Row>
          <DatePicker type="date" :placeholder="$t('lang_baseManage.wxMsgRecord.sdateIns')" :editable="false" v-model="sdate" :transfer="true" ></DatePicker>
          <DatePicker type="date" :placeholder="$t('lang_baseManage.wxMsgRecord.edateIns')" :editable="false" v-model="edate" :transfer="true" ></DatePicker>
          <Input :placeholder="$t('lang_baseManage.wxMsgRecord.wxmsgSendeeIns')" style="width: 200px" @on-enter="enterEvent" v-model="wxmsgSendee"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"  @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
                <Row style="display: flex">          <Page :current="page"  :total="total"  :showTotal="showTotal" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './editBaseWxmsgrecord'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'

  import { isSuccess } from '../../../lib/util'

  export default{
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
          {
            title: this.$t('lang_baseManage.wxMsgRecord.wxmsgTime'),
            key: 'wxmsgTime',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_baseManage.wxMsgRecord.wxmsgBustype'),
            key: 'wxmsgBustype',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_baseManage.wxMsgRecord.wxmsgMsgtypeDis'),
            key: 'wxmsgMsgtypeDis',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_baseManage.wxMsgRecord.wxmsgDataid'),
            key: 'wxmsgDataid',
            sortable: 'custom',
//            width: 200,
          },
          {
            title: this.$t('lang_baseManage.wxMsgRecord.wxmsgSendee'),
            key: 'wxmsgSendee',
            sortable: 'custom',
//            width: 200,
          },
          {
            title: this.$t('lang_baseManage.wxMsgRecord.wxmsgContent'),
            key: 'wxmsgContent',
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
        showTotal: true,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        index: 0,
        sdate: '',
        edate: '',
        logType: '',
        wxmsgSendee: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mounted() {
      this.getData(1)
    },
    methods: {
				//enter事件
			enterEvent (e) {
			        this.getData(1)
			},
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          _mt: 'baseWxmsgrecord.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          sdate: t.sdate,
          edate: t.edate,
          wxmsgSendee: t.wxmsgSendee,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.sdate !== undefined && data.sdate !== '') {
          data.sdate = new Date(data.sdate).format('yyyy-MM-dd')
        }
        if (data.edate !== undefined && data.edate !== '') {
          data.edate = new Date(data.edate).format('yyyy-MM-dd')
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
        t.$refs.update.formValidate = { }
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

</style>
