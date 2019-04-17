<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>
            &nbsp;押金退款管理
          </p>
          <Row>
            <Col span="18"
                 style="width: 100% !important">
              <Row>
                <Input placeholder="请输入员工姓名"
                       style="width: 200px"
                       v-model="empIdName"/>
                <span @dblclick="cleardeptId()">
              <Input
                v-model="deptIdDis"
                style="width: 200px"
                icon="search"
    
                :readonly="true"
                placeholder="请选择部门"
                @on-click="pickDeptData"
              />
            </span>
                <!--状态选择框-->
                <btnList :btnData="btnData"   :FlowNode="FlowNode" 
                         @buttonExport="expData"
                         @buttonSearch="search"
                         @buttonImport="importExcel"
                         @moditySelect="changemodity"
                         @buttonDraft="modifystatus('01draft')"
                         @buttonRefund = "modifystatus('02valid')"
                         @buttonAdd="openUp(NaN,'新增')"
                         @buttonDel="deletemsg()"
                         ></btnList>
              </Row>
              <!--table-->
              <row class="table-form"
                   ref="table-form">
                <Table :loading="loading"
                       @on-selection-change="selectedtable"
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
              @newdata="addNewArray"
              @update="updateArray"
              ref="update"></update>
    </transition>
    <!--部门-->
    <transition name="fade">
      <searchTable
        v-show="openDeptPick"
        :searchDeptClo="searchDeptCloumns"
        :params="Params"
        @closeDept="closeDept"
        @inputDept="inputPost"
        @changeinput="changeDeptInput"
        ref="searchTable"
      ></searchTable>
    </transition>
    <!--导入导出子页面 若没有导入导出可以去掉-->
    <transition>
      <expwindow
        v-show="openExp"
        :id="tableselected"
        @setFileKey="setFileKey"
        :logType="logType"
        :index="index"
        @closeExp="closeExp"
        ref="expwindow"
      ></expwindow>
    </transition>
    <transition>
      <expdow
        v-show="openExpDow"
        :filekey="filekey"
        :filename="filename"
        @closeExpDowMain="closeExpDowMain"
        ref="expdow"
      ></expdow>
    </transition>
    <transition name="fade">
      <importExcel
        v-show="openImport"
        :impid="updateId"
        :imp_mt="imp_mt"
        @getData="getData"
        @closeImport="closeImport"
        ref="importExcel"
      ></importExcel>
    </transition>
  </div>
</template>
<script>
  import update from './empRefundBase'
  import searchTable from "../../../components/searchTable/searchDept";
  import {isSuccess} from '../../../lib/util'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import btnList from '../../../components/btnAuth/btnAuth.js'
  import expwindow from "../../../components/fileOperations/expSms";
  import expdow from "../../../components/fileOperations/expdow";
  import importExcel from "../../../components/importModel/importParam";

  export default {
    data() {
      return {
       
        // 导入导出默认参数 无需变更
        openImport: false,
        openExpDow: false,
        openExp: false,
        filekey: "",
        filename: "",
        imp_mt: "empEmpofficial.importData",
        // 导出字段设置, code字段名 name列名
        expDataTital: [
          { code: "empIdName", name: "员工姓名" },
          { code: "empIdIden", name: "证件号码" },
          { code: "deptIdDis", name: "部门" },
          { code: "postIdDis", name: "岗位" },
          { code: "refuBgdate", name: "退款开始日期" },
          { code: "totalSum", name: "总金额" },
          { code: "note", name: "备注" },
        ],
        //高度设置
        tableheight: document.body.offsetHeight-280,
        logType: '',
        openUpdate: false,
        updateId: NaN,
        //下拉框选择数据idarray
        tableselected: [],
        //页面初始化默认状态
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: "员工姓名",
            key: 'empIdName',
            width: 140,
            sortable: 'empId',
          },
          {
            title: "证件号码",
            width: 140,
            key: 'empIdIden',
          },
          {
            title: "部门",
            width: 140,
            key: 'deptIdDis',
          },
          {
            title: "岗位",
            width: 140,
            key: 'postIdDis',

          },
          {
            title: "退款开始日期",
            width: 140,
            key: 'refuBgdate',

          },
          {
            title: "总金额",
            width: 140,
            key: 'totalSum',

          },
        ],
        /*列表操作项*/
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
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        compFnameCnDis: '',
        empIdName: '',
        deptId: '',
        deptIdDis: '',
        openPick: false,
        openDeptPick: false,
        state: this.modity,
        loading: "",
        //部门
      searchDeptCloumns: [
        {
          title: "部门编码",
          key: "unitCode",
          sortable: "custom"
        },
        {
          title: "部门名称",
          key: "unitFname"
        }
      ],
      Params: {
        _mt: "orgUnits.getByOrgFramePageList",
        rows: 10,
        page: 1,
        sort: "id",
        order: "desc",
        logType: "部门",
        unitType: "02dept",
        state: "02valid"
      },
      }
    },
    computed:{
      pageShow () {
        return this.$store.state.btnOperate.pageShow
      },
      tableButton () {
        return this.$store.state.btnOperate.tableButton
      },
     tableOperate() {
      return this.$store.state.btnOperate.tableOperate;
    },
    modity() {
      return this.$store.state.btnOperate.modity;
    },
      btnData() {
        return this.$store.state.btnOperate.btnData
      },
      FlowNode() {
        return this.$store.state.btnOperate.isFlowNode
      },
    },

    /*引入子页面初始化，js不需要*/
    components: {
      update,
      btnList,
      expwindow,
      expdow,
      importExcel,
      searchTable
    },
    //按钮权限控制
  pickData() {
    const t = this;
    t.$refs.searchOrgframe.getData(this.params);
    t.openPick = true;
  },
    //列表项的默认显示隐藏
    created () {
      if (this.pageShow !== "") {
        this.columns.push(this.tableBtn);
        this.$store.commit("btnOperate/setTableOperate", "true");
      }
    },
    //单表不需要
    watch:{
      pageShow (val) {
        if (val ==="" && this.tableOperate === true) {
          this.columns.pop();
          this.$store.commit("btnOperate/setTableOperate", "false");
        } else if (this.tableOperate === false) {
          this.columns.push(this.tableBtn);
          this.$store.commit("btnOperate/setTableOperate", "true");
        }
      }
    },
    mounted() {
      //this.getData();
      this.search();
    },
    methods: {
      changemodity(res){
        this.page = 1
        this.getData()
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
          this.$Message.warning('请至少选择一条数据')
        } else {
          t.$Modal.confirm({
            title: '提示',
            content: '请确定删除数据',
            onOk: () => {
              getDataLevelUserLogin({
                // 设置删除mt参数 其余无需更改
                _mt: 'empRefund.delByIds',
                logType: '删除',
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                  this.$Message.success('操作成功');
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
      modifystatus(state) {
        const t = this
        if (t.tableselected.length === 0) {
          this.$Message.warning('请至少选择一条数据')
        } else {
          t.$Modal.confirm({
            title: '提示',
            content: '请确定退款员工',
            onOk: () => {
              getDataLevelUserLogin({
                // 设置删除mt参数 其余无需更改
                _mt: 'empRefund.setState',
                logType: '退款',
                state: state,
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                  this.$Message.success('操作成功');
                }
              }).catch(() => {
                  t.tableselected = [];
                this.$Message.error(this.$t("reminder.errormessage"));
              })
            },
            onCancel: () => {},
          })
        }
      },
      closeFrame() {
        const t = this
        t.openPick = false
      },//关闭Frame
      closeChart() {
        this.openChart = false
      },//关闭借支信息图
      getData(page) {
        const t = this
        t.loading = true; //请求之前重置状态
         if (page == undefined) {
            this.page = 1;
        } 
        const data = {
          _mt: 'empRefund.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          funId: t.funId,
          logType: '押金退款信息查询',
          empIdName: t.empIdName,
          deptId: t.deptId,
          state: t.modity
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
        }).finally(() => {
          t.loading = false; //在成功之后改状态
        })
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },//排序
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },//分页
      pageChange(page) {
        const t = this
        t.page = page
        t.getData(t.page)
      },//分页
      openUp(id, logType, index) {
        const t = this
        //debugger
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType !='新增') {
          t.$refs.update.getOption(id, logType)
        }
      },
      search() {
      this.page = 1;
      //this.$store.commit('btnOperate/setSearchLoading',true)
      this.getData();
    },
      //关闭,并清除弹出页面的值
      closeUp() {
        const t = this
        t.openUpdate = false//控制修改窗口的显示和隐藏
      },//关闭窗口
      selected(key, name) {
        this.select = name
        this.cityTypeName = key
        this.getData()
      },//下拉选中
    //   search() {
    //     this.page = 1
    //     this.getData()
    //   },
      /*导入、导出*/
      // 导入导出默认方法 无需更改
      closeImport() {
        const t = this;
        t.openImport = false;
      },
      // 导入导出默认方法 无需更改
      importExcel() {
        const t = this;
        t.openImport = true;
        t.$refs.importExcel.getDowModelFile();
      },
      // 导入导出默认方法
      expData() {
        const t = this;
        // 填装查询条件
        const data = {
          empIdName: t.empIdName,
          //empIdIden: t.empIdIden,
          deptId: t.deptId,
          state: t.modity
        };
        // 设置导出mt参数
        this.$refs.expwindow.getData(this.expDataTital, "empRefund.export", data);
        this.openExp = true;
      },
      // 导入导出默认方法 无需更改
      closeExp() {
        const t = this;
        t.openExp = false;
      },
      // 导入导出默认方法 无需更改
      closeExpDowMain() {
        const t = this;
        t.openExpDow = false;
      },
      // 导入导出默认方法 无需更改
      setFileKey(filekey, filename, openExpDow) {
        const t = this;
        t.filekey = filekey;
        t.filename = filename;
        t.openExpDow = openExpDow;
        t.$refs.expdow.getPriToken(t.filekey);
      },
      //数据修改更新表格数据
      updateArray(res) {
        const t = this;
        t.data.splice(t.index, 1, res);
      },
      // 子页面新增数据后添加到本页面分页第一行  无需更改
      addNewArray(res) {
        const t = this;
        t.data.unshift(res);
      },
      //部门
    cleardeptId() {
      const t = this;
      t.deptIdDis = "";
      t.deptId = "";
    },
    pickDeptData() {
      const t = this;
      //const paramsDept = deepCopy(t.deptParams);
      t.$refs.searchTable.getData(t.Params);
      t.openDeptPick = true;
    },
    closeDept() {
      const t = this;
      t.$refs.searchTable.unitCode = "";
      t.openDeptPick = false;
    },
    inputPost(name, id, deptIdDis, form) {
      const t = this;
      t.deptId = id;
      t.deptIdDis = name;
    },
    changeDeptInput(name, id) {
      const t = this;
      t.deptIdDis = name;
      t.deptId = id;
    },
    },
  }
</script>
