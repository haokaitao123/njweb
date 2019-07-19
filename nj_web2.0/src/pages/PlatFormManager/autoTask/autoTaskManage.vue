<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_platform.autoTask.autoTask')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_platform.autoTask.atskNoIns')" style="width: 200px" @on-enter="enterEvent" v-model="autoTaskNo"/>
          <Input :placeholder="$t('lang_platform.autoTask.atskNameIns')" style="width: 200px" @on-enter="enterEvent" v-model="autoTaskName"/>
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
      <update v-show="openUpdate" :id="updateId" :logType="logType" @closeUp="closeUp" @getData="addNewArray" @update="updateArray"  ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './autoTaskBase'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        autoTaskNo: '',
        autoTaskName: '',
        value: '',
        logType: '',
        updateId: NaN,
        openUpdate: false,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_platform.autoTask.atskNo'),
            key: 'atskNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.atskName'),
            key: 'atskName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.atskClass'),
            key: 'atskClass',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.atskType'),
            key: 'atskTypeName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.atskFrequency'),
            key: 'atskFrequencyName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.atskTime'),
            key: 'atskRunTimeName',
          },
          {
            title: this.$t('lang_platform.autoTask.atskIsvalid'),
            key: 'atskIsvalidName',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 74,
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index, params.row.id)
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
        const data = {
          _mt: 'platAutotask.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          atskNo: t.autoTaskNo,
          atskName: t.autoTaskName,
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
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.confirmdelete'),
        		onOk: () => {
        			getDataLevelUserLogin({
			          _mt: 'platAutotask.delByIds',
			          funId: '1',
			          companyId: '1',
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
        		onCancel: () => {},
        	})
        }
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (t.logType === this.$t('button.upd')) {
        	t.$refs.update.getOption(id, logType)
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
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
