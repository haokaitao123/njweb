<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_homePage.mailMsg.title')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
    <Row>
      <Col span="24">
      <card>
        <Row>
          <DatePicker type="date" :placeholder="$t('lang_homePage.mailMsg.mailTimeDis')" :editable="false" v-model="mailTime" style="width: 145px"></DatePicker>
          <DatePicker type="date" :placeholder="$t('lang_homePage.mailMsg.mailEtimeDis')" :editable="false" v-model="mailEtime" style="width: 145px"></DatePicker>
          <Input :placeholder="$t('lang_homePage.mailMsg.mailObjectDis')" style="width: 145px" v-model="mailObject"/>
          <Input :placeholder="$t('lang_homePage.mailMsg.mailContentDis')" style="width: 145px" v-model="mailContent"/>
          <Input :placeholder="$t('lang_homePage.mailMsg.mailStatusDis')" style="width: 145px" v-model="mailStatus"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="search">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
                <Row style="display: flex">          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
  </div>
</template>
<script>
  import update from './emaillogView'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew } from '../../../axios/axios'

  export default{
    data() {
      return {
        isHomePage: '0',
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
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
            title: this.$t('lang_homePage.mailMsg.mailTime'),
            key: 'mailTime',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_homePage.mailMsg.mailObject'),
            key: 'mailObject',
          },
          {
            title: this.$t('lang_homePage.mailMsg.mailTo'),
            key: 'mailTo',
          },
          {
            title: this.$t('lang_homePage.mailMsg.mailCc'),
            key: 'mailCc',
          },
          {
            title: this.$t('lang_homePage.mailMsg.mailStatus'),
            key: 'mailStatus',
          },
          {
            title: this.$t('lang_homePage.mailMsg.mailError'),
            key: 'mailError',
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
                      this.openUp(params.row.id, this.$t('lang_homePage.mailMsg.view'), params.index)
                    },
                  },
                },  this.$t('lang_homePage.mailMsg.view')),
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
        mailTime: '',
        mailEtime: '',
        mailObject: '',
        mailContent: '',
        mailStatus: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mounted() {
      this.getData()
    },
    methods: {
      search() {
        this.page = 1
        this.getData()
      },
      getData() {
        const t = this
        const data = {
          _mt: 'baseEmaillog.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          funId: t.funId,
          logType: this.$t('button.ser'),
          mailTime: t.mailTime,
          mailEtime: t.mailEtime,
          mailObject: t.mailObject,
          mailContent: t.mailContent,
          mailStatus: t.mailStatus,
          id: t.isHomePage,
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
        this.tableselected = newArr.toString()
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType ===  this.$t('lang_homePage.mailMsg.view')) {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      setView() {
        this.isHomePage = '1'
        this.sort = 'mailTime'
        this.getData()
      },
      handleReset() {
        this.$emit('closeMa')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
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
