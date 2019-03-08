<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_approval.contract.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
  <div class="content-main">
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="420" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
  </div>
    </div>
  </div>
</template>
<script>

  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        tableselected: '',
        logType: '',
        total: NaN,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        showMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_approval.contract.contactMark'),
            key: 'contactMark',
            align: 'left',
          },
          {
            title: this.$t('lang_approval.contract.contactName'),
            key: 'contactName',
            align: 'left',
          },
        ],
        data: [],
      }
    },
    props: {
      conttype: String,
    },
    components: {
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt: 'vMailContact.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          contactflowType: 'approvalFlow',
          contactFlowid: t.$store.state.platApproval.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
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
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      showMsgBtn() {
        this.showMsg = true
      },
      close() {
        this.tableselected = ''
        this.$emit('hideMsg')
      },
      save() {
        const t = this
        const data = {
          _mt: 'vMailContact.aprAdd',
          funId: '1',
          logType: '新增',
          id: t.tableselected,
          receiveType: t.conttype,
          stepMailId: t.$store.state.platApproval.childId2,
        }

        if (!data.id) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
          return
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].value === undefined) {
              t.$Modal.error({
                title: this.$t('reminder.remind'),
                content: this.$t('reminder.dataExists'),
              })
            } else {
              t.$store.commit('platApproval/addNewArrayChildTable3', res.data.content[0].value)
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.addsuccess'),
              })
              t.close()
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .content-main{
    height: 500px;
    .table-form{
      margin: 10px 0;
    }
  }
  .btn{
    position: absolute;
    bottom: 50px;
    right: 36px;
  }
</style>
