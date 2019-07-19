<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_approval.platapprovallist.title')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_approval.platapprovallist.aprvNameDis')" @on-enter="enterEvent" style="width: 200px" v-model="aprvName"/>
          <Dropdown>
            <Button type="primary">
              {{statusDis}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" v-show="aprvStatus === '' || aprvStatus === '01draft'" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="primary" v-show="aprvStatus === '02valid'"  @click="modifystatu('01draft')">{{$t('status.draft')}}</Button>
          <Button type="success" v-show="aprvStatus === '01draft' || aprvStatus === '03invalid'" @click="modifystatu('02valid')">{{$t('status.valid')}}</Button>
          <Button type="error" v-show="aprvStatus === '02valid'" @click="modifystatu('03invalid')">{{$t('status.invalid')}}</Button>
          <!--<Button type="error" v-show="aprvStatus === '01draft' || aprvStatus === '03invalid'" @click="deletemsg">{{$t('button.del')}}</Button>-->
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable"@on-sort-change="sortable"   @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="$store.state.platApproval.mainTable"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUp="closeUp" ref="update"></update>
    </transition>
    <flowchart @closeUp="close" v-show="flowchart" ref="flowchart"></flowchart>
  </div>
</template>
<script>
  import update from './platApprovalBase'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import flowchart from './flowchart/flowchartMain'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        logType: '',
        statusDis: this.$t('status.valid'),
        openUpdate: false,
        flowchart: false,
        dropdownMenuList: [],
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'left',
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvCode'),
            key: 'aprvCode',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvName'),
            key: 'aprvName',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvFormtype'),
            key: 'aprvFormtypeDis',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvForm'),
            key: 'aprvFormDis',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvVersion'),
            key: 'aprvVersion',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvStatus'),
            key: 'aprvStatusDis',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.aprvStatus === '01draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'))
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.aprvStatus !== '01draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.open(params.row.id)
                    },
                  },
                }, this.$t('lang_approval.platapprovallist.flowConfig')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        select: this.$t('status.valid'),
        name: '',
        aprvStatus: '02valid',
        aprvCode: '',
        aprvName: '',
      }
    },
    computed: {

    },
    components: {
      update,
      flowchart,
    },
    mounted() {
      this.getSelect()
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
          _mt: 'platApproval.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          aprvStatus: t.aprvStatus,
//          aprvCode: t.aprvCode,
          aprvName: t.aprvName,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            this.$store.commit('platApproval/setMainTable', res.data.content[0].rows)
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 获取下拉状态
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.dropdownMenuList = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
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
          _mt: 'platApproval.delByIds',
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
        		onCancel: () => {},
        	})
        }
      },
      open(id) {
        const t = this
        t.$store.commit('platApproval/setIndex')
        t.$refs.flowchart.flstepFlow = id
        t.$refs.flowchart.open(id)
        t.flowchart = true
      },
      close() {
        const t = this
        t.flowchart = false
      },
      openUp(id, logType, index) {
        const t = this
        t.$store.state.platApproval.mainLogType = logType
        t.openUpdate = true
        t.logType = logType
        t.$store.commit('platApproval/setIndex', index)
        t.$refs.update.setMainId(id)
        t.index = index
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      /**
       * 状态的更改
       * @param paramCode
       * @param paramInfoName
       */
      getPageByState(paramCode, paramInfoName) {
        const t = this
        if (paramCode === '00all') {
          t.aprvStatus = ''
        } else {
          t.aprvStatus = paramCode
        }
        t.getData(1)
        t.statusDis = paramInfoName
      },
      // 更新数据的状态
      modifystatu(state) {
        const t = this
        let logType = ''
        if (state === '02valid') {
          logType = this.$t('status.valid')
        } else if (state === '03invalid') {
          logType = this.$t('status.invalid')
        } else if (state === '01draft') {
          logType = this.$t('status.draft')
        }
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          getDataLevelUserLogin({
            _mt: 'platApproval.modifystatus',
            logType: logType,
            status: state,
            ids: t.tableselected.toString(),
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.getData(1)
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('lang_approval.platapprovallist.oprclosed'),
              })
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
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
