<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>
            &nbsp;员工转正管理
          </p>
          <Row>
            <Col span="18"
                 style="width: 100% !important">
              <Row>
                <Input placeholder="请输入员工姓名"
                       style="width: 200px"
                       v-model="empIdName"/>
                <Input placeholder="请输入证件号码"
                       style="width: 200px"
                       v-model="empIdIden"/>
                <!--状态选择框-->
                <template>
                  <Select v-model="state" clearable style="width:200px" @on-change="getData()">
                    <Option v-for="item in StateCode" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </template>
                <span style="margin: 0;">
                          <Button type="primary" icon="search" @click="search()">查询</Button>
                        </span>
                <span style="margin: 0;" v-show="state ==='01empoff' ? true : false">
                            <Button type="success" @click="openUp(NaN,$t('button.add'))">新增</Button>
                        </span>
                <span style="margin: 0;" v-show="state ==='01empoff' ? true : false">
                            <Button type="success" @click="deletemsg()">删除</Button>
                        </span>
                <span style="margin: 0;" v-show="state ==='01empoff' ? true : false">
                            <Button type="primary" @click="setState('02empoff')">转正</Button>
                        </span>
                <span style="margin: 0;" v-show="state ==='01empoff' ? true : false">
                            <Button type="error" @click="">导入</Button>
                        </span>
                <span style="margin: 0;" v-show="true">
                            <Button type="success" @click="">导出</Button>
                        </span>
              </Row>
              <!--table-->
              <row class="table-form"
                   ref="table-form">
                <Table @on-select="selectedtable"
                       @on-select-cancel="selectedtable"
                       @on-select-all="selectedtable"
                       @on-sort-change="sortable"
                       :height="tableheight"
                       size="small"
                       border
                       ref="selection"
                       :columns="columns"
                       :data="data">
                </Table>
              </row>
              <!--page-->
              <Row style="display: flex">
                <Page :total="total"
                      size="small"
                      :current="page"
                      show-elevator
                      show-sizer
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]">
                </Page>
                <Button type="ghost"
                        size="small"
                        shape="circle"
                        icon="refresh"
                        style="margin-left: 20px;display: inline-block;"
                        @click="search()">
                </Button>
              </Row>
            </Col>
          </Row>
        </card>
      </Col>
    </Row>
    <!--切换-->
   <transition name="fade">
      <update v-show="openUpdate"
              :id="updateId"
              :logType="logType"
              :index="index"
              @closeUp="closeUp"
              ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './addEmpofficial'
  //import searchOrgframe from '../../../components/searchTable/searchOrgframe'
  import {isSuccess} from '../../../lib/util'
  // import { getBtnAuth } from '../../../lib/authorityBtn'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'

  export default {
    data() {
      return {
        /*状态code*/
        StateCode: [
          {
            value: '01empoff',
            label: '待转正'
          },
          {
            value: '02empoff',
            label: '已转正'
          }
        ],
        openChart: false,
        loading: true,
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        stateDis: "全部",
        unitTypeId: NaN,
        state: '01empoff',
        columns: [
          {
            type: 'selection',
            width: 54,
            fixed: 'left',
            align: 'center',
          },
          {
            title: "员工姓名",
            key: 'empIdName',
            width: 140,
            fixed: 'left',
            sortable: 'empId',
          },
          {
            title: "证件号码",
            width: 180,
            key: 'empIdIden',
          },
          {
            title: "部门",
            width: 140,
            key: 'deptIdDis',
            sortable: 'deptId',
          },
          {
            title: "岗位",
            width: 180,
            key: 'postIdDis',
            sortable: 'postId',
          },
          {
            title: "员工类型",
            key: 'empoffType',
            width: 140,
          },
          {
            title: "试用期评价",
            key: 'empoffResult',
            width: 140,
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
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        compFnameCnDis: '',
        treeid: '',
        empIdName: '',
        empIdIden: '',
        openPick: false,
        params: {
          _mt: 'empEmpnh.getPage',
          sort: 'id',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '员工转正查询',
          data: '{}',
        },
        modify: 'false',
        btnList: {
          // button_draft: '',    //编辑
          // button_upd: '',      //修改
          // button_del: '',      //删除
          // button_add: '',      //新增
          // button_save: '',     //保存
          // button_submit: '',   //提交
          // button_return: '',   //返回
          // button_cancel: '',   //取消
          // button_confirm: '',  //确认
          // button_invalid: '',  //失效
          // button_valid: '',    //生效
          // button_export: '',   //导出
          // button_import: '',   //导入
        },
      }
    },
    computed: {},
    /*引入子页面初始化，js不需要*/
    components: {
      update,
    },
    mounted() {
      this.getData();
    },
    methods: {
      // 勾选数据方法 无需更改
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      // 删除方法 无需更改
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: '提示',
            content: '请至少选择一条数据',
          })
        } else {
          t.$Modal.confirm({
            title: '提示',
            content: '请确定删除数据',
            onOk: () => {
              getDataLevelUserLogin({
                // 设置删除mt参数 其余无需更改
                _mt: 'empEmpofficial.deleteByIds',
                logType: '删除',
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: '错误',
                  content: '网络错误',
                })
              })
            },
            onCancel: () => {},
          })
        }
      },

      // 删除方法 无需更改
      setState(data) {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: '提示',
            content: '请至少选择一条数据',
          })
        } else {
          t.$Modal.confirm({
            title: '提示',
            content: '请确定转正员工',
            onOk: () => {
              getDataLevelUserLogin({
                // 设置删除mt参数 其余无需更改
                _mt: 'empEmpofficial.setState',
                logType: '转正',
                ids: t.tableselected.toString(),
                state:data,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: '错误',
                  content: '网络错误',
                })
              })
            },
            onCancel: () => {},
          })
        }
      },

      /*导入*/
      import() {
      },
      /*导出*/
      export() {
      },
      closeFrame() {
        const t = this
        t.openPick = false
      },//关闭Frame
      closeChart() {
        this.openChart = false
      },//关闭员工转正图
      getData(id) {
        const t = this
        const data = {
          _mt: 'empEmpofficial.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '员工转正查询',
          empIdName: t.empIdName,
          empIdIden: t.empIdIden,
          state:t.state,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            // forEach(item )
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
          this.getData(this.treeid)
        } else {
          this.order = 'desc'
        }
      },//排序
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData(this.treeid)
      },//分页
      pageChange(page) {
        const t = this
        t.page = page
        t.getData(this.treeid)
      },//分页
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },//列表中选中的item
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }
      },
      /*addNewArray (res) {
        const t = this
        t.data.unshift(res)
        t.getTree()
      },
      updateArray (res) {
        const t = this
        t.data.splice(t.index, 1, res)
        t.getTree()
      },*/
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.empId = ''
        t.$refs.update.formValidate.empIdName = ''
        t.$refs.update.formValidate.deptIdDis = ''
        t.$refs.update.formValidate.postIdDis = ''
        t.$refs.update.formValidate.empoffResult = ''
        t.$refs.update.formValidate.empoffDocument = ''
      },//关闭窗口
      selected(key, name) {
        this.select = name
        this.cityTypeName = key
        this.getData()
      },//下拉选中
      search() {
        this.treeid = ''
        this.page = 1
        this.getData()
      },
    },
  }
</script>
