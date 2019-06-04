<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_platdoc.platMail.title')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_platdoc.platMail.sysmailNoDis')" style="width: 160px" v-model="sysmailNo"/>
          <Input :placeholder="$t('lang_platdoc.platMail.sysmailNameDis')" style="width: 160px" v-model="sysmailName"/>
          <Input :placeholder="$t('lang_platdoc.platMail.sysmailObjectDis')" style="width: 160px" v-model="sysmailObject"/>
          <Input :placeholder="$t('lang_platdoc.platMail.sysmailToDis')" style="width: 160px" v-model="sysmailTo"/>
          <Input :placeholder="$t('lang_platdoc.platMail.sysmailCcDis')" style="width: 160px" v-model="sysmailCc"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="closeUp" ref="update" ></update>
    </transition>
  </div>
</template>
<script>
  import update from './platMailBase'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
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
            title: this.$t('lang_platdoc.platMail.sysmailNo'),
            key: 'sysmailNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailName'),
            key: 'sysmailName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailNo'),
            key: 'sysmailObject',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailTo'),
            key: 'sysmailTo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailCc'),
            key: 'sysmailCc',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailSendcondition'),
            key: 'sysmailSendcondition',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailIsvalid'),
            key: 'sysmailIsvalidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailIsencrypt'),
            key: 'sysmailIsencryptDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailFlow'),
            key: 'sysmailFlowDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailFlowstep'),
            key: 'sysmailFlowstepDis',
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 20,
        page: 1,
        sysmailNo: '',
        sysmailObject: '',
        sysmailTo: '',
        sysmailCc: '',
        sysmailName: '',
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
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platSysmail.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: '查询List',
          sysmailNo: t.sysmailNo,
          sysmailObject: t.sysmailObject,
          sysmailTo: t.sysmailTo,
          sysmailCc: t.sysmailCc,
          sysmailName: t.sysmailName,
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
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
                _mt: 'platSysmail.delByIds',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.deletesuccess'),
                  })
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
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.openUpdate = true
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('platSysMailJS/setMainId', id)
        this.$store.commit('platSysMailJS/setIndex', index)
        if (id) {
          t.$refs.update.getOptionData()
        }
        t.$refs.update.getOption(logType)
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        this.getData()
        t.$refs.update.clear()
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
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
