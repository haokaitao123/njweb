<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_platform.platFlowVar.platFlowVar')}}
        </p>
        <Row>
            <span @dblclick="clearPlatFlowcontactsid">
              <Input v-model="flvarFlowDis" icon="search" :readonly="true" :placeholder="$t('lang_platform.platFlowVar.flvarFlowIns')" style="width: 200px" @on-click="pickData" />
            </span>
          <Input :placeholder="$t('lang_platform.platFlowVar.flvarMarkIns2')" style="width: 200px" v-model="flvarMark"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <searchPlatFlowcontacts v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close1" @changeinput="changeinput" ref="searchPlatFlowcontacts"></searchPlatFlowcontacts>
    </transition>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @setData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './addNewPlatFlowVar'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import searchPlatFlowcontacts from '../../../components/searchTable/searchPlatSysform'

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
            title: this.$t('lang_platform.platFlowVar.flvarFormtype'),
            key: 'flvarFormtypeDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platFlowVar.flvarFlow'),
            key: 'flvarFlowDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platFlowVar.flvarMark'),
            key: 'flvarMark',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platFlowVar.flvarName'),
            key: 'flvarName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platFlowVar.flvarValresource'),
            key: 'flvarValresourceDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platFlowVar.flvarField'),
            key: 'flvarField',
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
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        funId: '1000',
        flvarMark: '',
        flvarFlow: '',
        openPick: false,
        flvarFlowDis: '',
        params: {
          _mt: 'platSysform.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns: [
          {
            title: this.$t('lang_platform.platFlowVar.sformName'),
            key: 'sformName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_platform.platFlowVar.sformTbname'),
            key: 'sformTbname',
            sortable: 'custom',
            width: 379,
          },
        ],
      }
    },
    computed: {

    },
    components: {
      searchPlatFlowcontacts,
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
          _mt: 'platFlowVar.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          flvarMark: t.flvarMark,
          flvarFlow: t.flvarFlow,
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
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      render1() {
        this.$Modal.confirm({
          ref: 'imgEdit',
          onOk: () => {
            const formData = new FormData(document.getElementById('fileinput1'))
            uploadimage(formData).then((res) => {
              alert(res)
            }).catch((res) => {
              alert(res)
            })
          },
          attrs: {
            id: 'foo',
          },
          render: (h) => {
            return h(imgEdit, {
              props: {
                value: this.value,
              },
              on: {
                change: (val) => {
                  this.value = val
                },
              },

            })
          },

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
      close1() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
        t.flvarFlowDis = name
        t.flvarFlow = id
      },
      pickData() {
        const t = this
        t.$refs.searchPlatFlowcontacts.getData(this.params)
        t.openPick = true
      },
      clearPlatFlowcontactsid() {
        const t = this
        t.flvarFlowDis = ''
        t.flvarFlow = ''
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
                _mt: 'platFlowVar.delByIds',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
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
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }
        if (logType === this.$t('button.add')) {
          t.$refs.update.setData()
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.flvarName = ''
        t.$refs.update.formValidate.flvarFlow = ''
        t.$refs.update.flvarFlowDis = ''
        t.$refs.update.formValidate.flvarMark = ''
        t.$refs.update.formValidate.flvarValresource = ''
        t.$refs.update.formValidate.flvarSysval = ''
        t.$refs.update.formValidate.flvarFiled = ''
        t.$refs.update.flvarFiledDis = ''
        t.$refs.update.formValidate.flvarGetvalbyfiled = ''
        t.$refs.update.flvarGetvalbyfiledDis = ''
        t.$refs.update.formValidate.flvarRtndatafmt = ''
        t.$refs.update.formValidate.flvarDatefmt = ''
        t.$refs.update.formValidate.comment = ''
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
