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
                <btnList @buttonExport="expData"
                         @buttonSearch="getData"
                         @buttonImport="importExcel"
                         @moditySelect="changemodity"
                         @buttonAdd="openUp(NaN,'新增')"
                         @buttonDel="deletemsg()"
                         @buttonPositive="setState('02empoff')"
                         ></btnList>
              </Row>
              <!--table-->
              <row class="table-form"
                   ref="table-form">
                <Table :loading="loading" @on-select="selectedtable"
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
  import update from './addEmpofficial'
  import {isSuccess} from '../../../lib/util'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import btnList from '../../../components/btnAuth/btnAuth.js'
  import expwindow from "../../../components/fileOperations/expSms";
  import expdow from "../../../components/fileOperations/expdow";
  import importExcel from "../../../components/importModel/importParam";

  export default {
    data() {
      return {
        loading: "",
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
          { code: "empoffResult", name: "试用期评价" },
          { code: "note", name: "备注" },
        ],
        //高度设置
        tableheight: document.body.offsetHeight-240,
        logType: '',
        openUpdate: false,
        updateId: NaN,
        //下拉框选择数据idarray
        tableselected: [],
        //页面初始化默认状态
        state: '01empoff',
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
        treeid: '',
        empIdName: '',
        empIdIden: '',
        openPick: false,
        params: {
          _mt: 'empEmpofficial.getPage',
          sort: 'id',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '员工转正查询',
          data: '{}',
        },
      }
    },
    computed: {
      pageShow () {
        return this.$store.state.btnOperate.pageShow
      },
      tableButton () {
        return this.$store.state.btnOperate.tableButton
      },
      tableOperate () {
        return this.$store.state.btnOperate.tableOperate
      }
    },
    /*引入子页面初始化，js不需要*/
    components: {
      update,
      btnList,
      expwindow,
      expdow,
      importExcel,
    },
    //列表项的默认显示隐藏
    created () {
      if (this.pageShow != "") {
        this.columns.push(this.tableBtn);
        this.$store.commit('btnOperate/setTableOperate', 'true');
      }
    },
    //单表不需要
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
    mounted() {
      this.getData();
    },
    methods: {
      changemodity(res){
        console.log(res,"res");
         //alert(1);
          //alert(res.funStatecode);
        this.state = res.funStatecode
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
      closeFrame() {
        const t = this
        t.openPick = false
      },//关闭Frame
      closeChart() {
        this.openChart = false
      },//关闭员工转正图
      getData(id) {
        const t = this
        t.loading = true; //请求之前重置状态
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
        }).finally(() => {
          t.loading = false; //在成功之后改状态
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
      openUp(id, logType, index) {
        const t = this
        //debugger
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType !='新增') {
          t.$refs.update.getData(id)
        }
      },
      //关闭,并清除弹出页面的值
      closeUp() {
        const t = this
        t.openUpdate = false
        t.forbidden = false
        let up = t.$refs.update.formValidate
        //debugger
        for (let s in up) {
          if(s!='_mt' && s!='funId'){
            up[s] = ''
          }
        }
        t.$refs.update.file = ''
        t.$refs.update.filekey = ''
        t.getData()
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
          empIdIden: t.empIdIden,
          state: t.state
        };
        // 设置导出mt参数
        this.$refs.expwindow.getData(this.expDataTital, "empEmpofficial.export", data);
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

    },
  }
</script>
