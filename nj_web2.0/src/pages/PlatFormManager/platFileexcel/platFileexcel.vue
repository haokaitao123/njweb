<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;
          {{$t('lang_role.imp.title')}}
        </p>
        <Row>
          <Input v-model="paramCode" :placeholder="$t('lang_role.imp.paramCode')"
					@on-enter="enterEvent"
                 style="width: 200px"/>
          <Input v-model="fileName" :placeholder="$t('lang_role.imp.pfileName')"
					@on-enter="enterEvent"
                 style="width: 200px"/>
          <span style="margin: 0;"><Button type="primary" icon="search"
                                           @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>

          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection"
                 :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange"
                @on-change="pageChange" :page-size=[rows] :page-size-opts="[10, 20, 50, 100]"></Page>
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
  import update from './editPlatFileexcel'
  import {getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../../axios/axios'
  import {isSuccess} from '../../../lib/util'

  export default {
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
            title: this.$t('lang_role.imp.fileName'),
            key: 'fileName',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_role.imp.fileFuncode'),
            key: 'fileFuncode',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_role.imp.fileFuncodeDis'),
            key: 'fileFuncodeDis',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 64,
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
                      this.openUp(params.row.id, this.$t('button.upd'))
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        searchText: this.$t('lang_role.imp.searchText'),
        searchCloumns: [
          {
            title: this.$t('lang_role.imp.pmtypeCode'),
            key: 'pmtypeCode',
            sortable: 'custom',
            width: 379,
          },
          {
            title: this.$t('lang_role.imp.pmtypeName'),
            key: 'pmtypeName',
            sortable: 'custom',
            width: 380,
          },
        ],
        params: {
          _mt: 'baseParmType.selectParamTypeByColumn',
          sort: 'id',
          order: 'desc',
          rows: '10',
          page: '1',
        },
        data: [],
        total: NaN, // 总页数
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        paramCode: '',
        fileName: '',
        paramName: '',
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
          _mt: 'platFileexcel.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          fileFuncode: t.paramCode,
          fileName: t.fileName,
          logType: '主表查询',
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
                _mt: 'platFileexcel.delByIds',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(t.updateId)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.$refs.update.formValidate.fileFuncode = ''
        t.$refs.update.fileFuncodeDis = ''
        t.$refs.update.formValidate.comment = ''
        t.$refs.update.formValidate.fileKey = ''
        t.$refs.update.formValidate.fileName = ''
        t.openUpdate = false
        t.openPick = false
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
