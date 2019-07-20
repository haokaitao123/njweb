<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_role.adminpminfo.pminfotitle')}}
        </p>
        <Row>
          <Input v-model="paramCode" :placeholder="$t('lang_role.adminpminfo.pparamCode')"
                 style="width: 200px" @on-enter="enterEvent"/>
          <Input v-model="paramInfoName" :placeholder="$t('lang_role.adminpminfo.pparamInfoName')"
                 style="width: 200px" @on-enter="enterEvent"/>
          <span @dblclick="clear">
            <Input v-model="paramName" icon="search" :placeholder="$t('lang_role.adminpminfo.pparamName')"
                   :readonly="true"  style="width: 200px" @on-enter="enterEvent"
                   @on-click="pickData"/>
          </span>
          <span style="margin: 0;"><Button type="primary" icon="search"
                                           @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'),0)">{{$t('button.add')}}</Button>

          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection"
                 :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" :showTotal="showTotal" size="small" show-elevator show-sizer placement="top"
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
    <transition name="fade">
      <searchTable v-show="openPick" @closeUp="closeUp" @changeinput="changeinput" @clear="clear"
                   ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import update from './updateParamInfo'
  import {getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess} from '../../../lib/util'
  import searchTable from '../../../components/searchTable/searchParamType'

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
            title: this.$t('lang_role.adminpminfo.paramCode'),
            key: 'paramCode',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_role.adminpminfo.paramTypeDis'),
            key: 'paramTypeDis',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_role.adminpminfo.paramInfoName'),
            key: 'paramInfoName',
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        showTotal: true,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        paramCode: '',
        paramType: '',
        paramName: '',
        paramInfoName: '',
      }
    },
    computed: {},
    components: {
      update,
      searchTable,
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
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getParamInfoByPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          paramCode: t.paramCode,
          paramType: t.paramType,
          paramInfoName: t.paramInfoName,
        }).then((res) => {
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
      changeinput(name, id) {
        const t = this
        t.paramName = name
        t.paramType = id
      },
      clear() {
        const t = this
        t.paramName = ''
        t.paramType = ''
      },
      pickData() {
        this.$refs.searchTable.getData()
        this.openPick = true
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
          this.getData(1)
        } else {
          this.order = 'desc'
        }
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
                _mt: 'baseParmInfo.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected,
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
        t.$refs.searchTable.pmtypeCode = ''
        t.$refs.update.paramName = ''
        t.$refs.update.formValidate.paramType = ''
        t.$refs.update.formValidate.paramCode = ''
        t.$refs.update.formValidate.paramInfoName = ''
        t.$refs.update.formValidate.comment = ''
        t.$refs.update.paramTypeDis = ''
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
