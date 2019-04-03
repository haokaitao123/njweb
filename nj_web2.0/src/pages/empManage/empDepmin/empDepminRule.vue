<template>
  <div class="table">
    <Row>
      <i-Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"> </Icon>
            &nbsp;最低押金规则
          </p>
          <Row>
            <template>
              <div class="table">
                <Input placeholder="请输入岗位" style="width: 200px" v-model="depPostDis"/>
                <!-- 页面中调用公共按钮组件标签<btnList> -->
                <!-- 调用公共按钮组件方法 -->
                <!-- @buttonAdd（配置的按钮对应方法名称） = "btnEvent"（是你当前页面对应点击事件） -->
                <btnList  @buttonSearch="getData(1)" @buttonAdd="openUp(NaN,'新增')" @buttonDel="deletemsg" :btnData="btnData" :FlowNode="FlowNode" ></btnList>

              </div>
            </template>
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable" @on-select-cancel="selectedtable"  @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
            <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
            <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
          </Row>
        </card>
      </i-Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  // 引用子页面
  import update from './addNewempDeomin'
  // 默认引用 无需变更
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'
  import btnList from '../../../components/btnAuth/btnAuth'

  export default{
    created () {
      if (this.pageShow != "") {
        this.columns.push(this.tableBtn);
        this.$store.commit('btnOperate/setTableOperate', 'true');
      }
    },
    computed:{
      pageShow () {
        return this.$store.state.btnOperate.pageShow
      },
      tableButton () {
        return this.$store.state.btnOperate.tableButton
      },
      tableOperate () {
        return this.$store.state.btnOperate.tableOperate
      },
      btnData () {
        return this.$store.state.btnOperate.btnData
      },
      FlowNode () {
        return this.$store.state.btnOperate.isFlowNode
      }
    },
    data() {
      return {
        // 导入的mt名称
        imp_mt: 'empDeposmin.importData',
        // 导出字段设置, code字段名 name列名
        expDataTital: [{ code: 'depPost', name: '岗位' }, { code: 'depMoney', name: '最低押金' },
          { code: 'depSdate', name: '押金补充时间' }, { code: 'depEdate', name: '补充结束时间' },
          { code: 'depPenalty', name: '低于最低扣款' }, { code: 'note', name: '备注' }],
        // 导入导出默认参数 无需变更
        openImport: false,
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        // 子页面所需参数 无需变更
        tableheight: document.body.offsetHeight - 280,
        logType: '',
        openUpdate: false,
        updateId: NaN,
        // 主页面已勾选数据list
        tableselected: [],
        // 分页列表显示字段
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '岗位',
            key: 'depPost',
            sortable: 'custom',
            width: 220,
          },
          {
            title: '最低押金',
            key: 'depMoney',
            sortable: 'custom',
            width: 220,
          },
          {
            title: '押金补充时间',
            key: 'depSdate',
            sortable: 'custom',
            width: 220,
          },
          {
            title: '补充结束时间',
            key: 'depEdate',
            sortable: 'custom',
            width: 220,
          },
          {
            title: '低于最低扣款',
            key: 'depPenalty',
            sortable: 'custom',
            width: 220,
          },
      ],
      tableBtn: {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (h, params) => {
      let child = [];
        for (let v of this.tableButton) {
          child.push(h('Button', {
              props: {
              type: v.type,
              size: 'small',
            },
            style: {
              marginRight: '5px',
              display: this.pageShow.indexOf(v.btnName) != -1 ? 'inline' : 'none',
            },
            on: {
              click: () => {
              this.openUp(params.row.id, v.name, params.index);
              },
            },
          }, v.name))
        };
          return h('div', [
          child,
          ])
        },
      },
      // 页面参数 无需更改
      data: [],
      total: 0,
      index: 0,
      sort: 'id', // 默认排序字段
      order: 'desc', // 默认排序方式
      rows: 10,
      page: 1,
      // 查询条件变量
      depPostDis: ''
    }
    },
    computed: {

    },
    components: {
      // 初始化子页面
      update,
      btnList   //将这个组件引用到当前文件， btnList是起的公共按钮组件名字
    },
    mounted() {
      // 页面打开自动调用查询方法 无需更改
      this.getData(1)
    },
    watch:{
      pageShow (val) {
        if (val == "" && this.tableOperate == 'true') {
          this.columns.pop();
          this.$store.commit('btnOperate/setTableOperate', 'false');
        } else if (this.tableOperate == 'false') {
          this.columns.push(this.tableBtn);
          this.$store.commit('btnOperate/setTableOperate', 'true');
        }
      }
    },
    methods: {
      // 查询方法
      getData(page) {
        const t = this
        // 是否重置页码 无需更改
        if (page) {
          t.page = page
        }
        // 分页查询mt
        const data = {
          _mt: 'empDeposmin.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '查看',
//          添加查询变量
          depPostDis: t.depPostDis,
        }
        // 删除空字段 无需更改
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        // 发送请求 返回分页list与总行数  无需更改
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
          t.data = res.data.content[0].rows
          t.total = res.data.content[0].records
        }
      }).catch(() => {
          t.$Modal.error({
          title: '错误',
          content: '网络错误',
        })
      })
      },
      // 导入导出默认方法 无需更改
      closeImport() {
        const t = this
        t.openImport = false
      },
      // 导入导出默认方法 无需更改
      importExcel() {
        const t = this
        t.openImport = true
        t.$refs.importExcel.getDowModelFile()
      },
      // 导入导出默认方法
      expData() {
        const t = this
        // 填装查询条件
        const data = {
          bankCode: t.bankCode,
          bankCname: t.bankCname,
          bankSwiftcode: t.bankSwiftcode,
        }
        // 设置导出mt参数
        this.$refs.expwindow.getData(this.expDataTital, 'empDeposmin.export', data)
        this.openExp = true
      },
      // 导入导出默认方法 无需更改
      closeExp() {
        const t = this
        t.openExp = false
      },
      // 导入导出默认方法 无需更改
      closeExpDowMain() {
        const t = this
        t.openExpDow = false
      },
      // 导入导出默认方法 无需更改
      setFileKey(filekey, filename, openExpDow) {
        const t = this
        t.filekey = filekey
        t.filename = filename
        t.openExpDow = openExpDow
        t.$refs.expdow.getPriToken(t.filekey)
      },
      // 子页面新增数据后添加到本页面分页第一行  无需更改
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      // 子页面修改数据后 本页面修改对应行数的数据 无需更改
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      // 点击列表表头 调用排序方法 无需更改
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
        } else {
          this.order = 'desc'
        }
      },
      // 变更列表显示行数方法 无需更改
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData(1)
      },
      // 翻页方法 无需更改
      pageChange(page) {
        const t = this
        t.page = page
        t.getData(1)
      },
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
                _mt: 'empDeposmin.delByIds',
                logType: '删除',
                ids: t.tableselected.toString(),
        }).then((res) => {
            if (isSuccess(res, t)) {
            t.tableselected = []
            t.getData(1)
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
      // 打开子页面 传递本页面ID 无需更改
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
//        t.$refs.update.getSelect()
        if (logType === '修改') {
          t.$refs.update.getData(id)
        }
      },
      // 关闭子页面 无需更改
      closeUp() {
        const t = this
        t.openUpdate = false
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
