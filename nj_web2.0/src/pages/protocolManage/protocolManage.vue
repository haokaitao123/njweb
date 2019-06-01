<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;变更协议管理
          </p>
          <Row>
            <Col span="18" style="width: 100% !important">
              <Row>
                <Input v-model="empnhName" placeholder="请输入员工姓名" style="width: 200px"></Input>
                <btnList
                  @buttonExport="expData"
                  @buttonImport="importExcel"
                  @buttonAdd="openUp(NaN,$t('button.add'))"
                  @buttonDel="deletemsg"
                  @buttonConfirm="modifystatus('02ok')"
                  @moditySelect="modityChange"
                  @buttonSearch="search"
                  :btnData="btnData"
                  :FlowNode="FlowNode"
                ></btnList>
              </Row>
              <!--布置分页列表 变量通用 无需变更-->
              <row class="table-form" ref="table-form">
                <Table
                  @on-selection-change="selectedtable"
                  @on-sort-change="sortable"
                  :current="page"
                  :height="tableheight"
                  size="small"
                  border
                  ref="selection"
                  :columns="columns"
                  :data="data"
                  :loading="loading"
                ></Table>
              </row>
              <Row style="display: flex">
                <Page
                  :total="total"
                  :current="page"
                  size="small"
                  show-elevator
                  show-sizer
                  placement="top"
                  @on-page-size-change="sizeChange"
                  @on-change="pageChange"
                  :page-size-opts="[10, 20, 50, 100]"
                ></Page>
                <Button
                  type="ghost"
                  size="small"
                  shape="circle"
                  icon="refresh"
                  style="margin-left: 20px;display: inline-block;"
                  @click="search()"
                ></Button>
              </Row>
            </Col>
          </Row>
        </card>
      </Col>
    </Row>
    <!--布置子页面 v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
    <transition name="fade">
      <update
        v-show="openUpdate"
        :id="updateId"
        :logType="logType"
        :index="index"
        @closeUp="closeUp"
        @getData="addNewArray"
        @update="updateArray"
        ref="update"
      ></update>
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
import update from "./addNewProtocolManage";
// 默认引用 无需变更
import { isSuccess } from "../../lib/util";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../axios/axios";
import expwindow from "../../components/fileOperations/expSms";
import expdow from "../../components/fileOperations/expdow";
import importExcel from "../../components/importModel/importParam";
import btnList from "../../components/btnAuth/btnAuth";
export default {
  data() {
    return {
      tableOperate: false,
      // 导入的mt名称
      imp_mt: "protocolManage.importData",
      // 导出字段设置, code字段名 name列名
      expDataTital: [
        { code: "empnhName", name: "员工姓名" },
        { code: "unitoFname", name: "原部门名称" },
        { code: "empTypeDis", name: "原员工类型" },
        { code: "contTypeDis", name: "原合同类别" },
        { code: "contPeriodDis", name: "原合同期限" },
        { code: "postoFname", name: "原岗位名称" },
        { code: "empnhIdno", name: "身份证号码" },
        { code: "contractoNo", name: "原合同编号" },
        { code: "contractoStart", name: "原合同开始日期" },
        { code: "contractoEnd", name: "原合同结束日期" },
        { code: "contWorktimeDis", name: "原合同工作时间" },
        { code: "signingoTime", name: "原签订时间" },
        { code: "unitFname", name: "新部门名称" },
        { code: "postFname", name: "新岗位名称" },
        { code: "empnTypeDis", name: "新员工类型" },
        { code: "contractnTypeDis", name: "新合同类别" },
        { code: "contractnPeriodDis", name: "新合同期限" },
        { code: "contractnStart", name: "新合同开始日期" },
        { code: "contractnEnd", name: "新合同结束日期" },
        { code: "contractnTimeDis", name: "新合同工作时间" },
        { code: "signingnTime", name: "新签订时间" },
        { code: "note", name: "备注" }
      ],
      // 导入导出默认参数 无需变更
      openImport: false,
      openExpDow: false,
      openExp: false,
      filekey: "",
      filename: "",
      // 子页面所需参数 无需变更
      tableheight: document.body.offsetHeight - 280,
      logType: "",
      openUpdate: false,
      updateId: NaN,
      loading: false,
      dataTree: [],
      //treeheight: document.body.offsetHeight - 200,
      //tableheight: document.body.offsetHeight - 280,
      logType: "",
      openUpdate: false,
      updateId: NaN,
      tableselected: [],
      //页面初始化默认状态
      state: "01ok",
      postDfpslevel: "",
      postDfpslevelData: [], //
      columns: [
        {
          type: "selection",
          width: 54,
          fixed: "left",
          align: "center"
        },
        {
          title: "员工姓名",
          key: "empnhName",
          sortable: "custom",
          fixed: "left",
          width: 220
        },
        {
          title: "证件号码",
          key: "empnhIdno",
          width: 220
        },
        {
          title: "原部门名称",
          key: "unitoFname",
          //对应列是否可以排序，如果设置为 custom，则代表排序，需要监听 Table 的 on-sort-change 事件
          width: 220
        },
        {
          title: "原岗位名称",
          key: "postoFname",
          width: 220
        },

        {
          title: "原员工类型",
          key: "empTypeDis",
          width: 220
        },
        {
          title: "原合同类别",
          key: "contTypeDis",
          width: 220
        },
        {
          title: "原合同期限",
          key: "contPeriodDis",
          width: 220
        },
        {
          title: "原合同编号",
          key: "contractoNo",
          width: 220
        },
        {
          title: "原合同开始日期",
          key: "contractoStart",
          sortable: "custom",
          width: 220
        },
        {
          title: "原合同结束日期",
          key: "contractoEnd",
          sortable: "custom",
          width: 220
        },
        {
          title: "原合同工作时间",
          key: "contWorktimeDis",
          width: 220
        },
        {
          title: "原签订时间",
          key: "signingoTime",
          sortable: "custom",
          width: 220
        },
        {
          title: "新部门名称",
          key: "unitFname",
          width: 220
        },
        {
          title: "新岗位名称",
          key: "postFname",
          width: 220
        },
        {
          title: "新员工类型",
          key: "empnTypeDis",
          width: 220
        },
        {
          title: "新合同类别",
          key: "contractnTypeDis",
          width: 220
        },
        {
          title: "新合同期限",
          key: "contractnPeriodDis",
          width: 220
        },
        {
          title: "新合同开始日期",
          key: "contractnStart",
          sortable: "custom",
          width: 220
        },
        {
          title: "新合同结束日期",
          key: "contractnEnd",
          sortable: "custom",
          width: 220
        },
        {
          title: "新合同工作时间",
          key: "contractnTimeDis",
          width: 220
        },
        {
          title: "新签订时间",
          key: "signingnTime",
          sortable: "custom",
          width: 220
        }
      ],
   tableBtn: {
        title: "操作",
        key: "action",
        width: 100,
        fixed: "right",
        align: "center",
        render: (h, params) => {
          let child = [];
          for (let v of this.tableButton) {
            child.push(
              h(
                "Button",
                {
                  props: {
                    type: v.type,
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display:
                      this.pageShow.indexOf(v.btnName) != -1 ? "inline" : "none"
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, v.name, params.index);
                    }
                  }
                },
                v.name
              )
            );
          }
          return h("div", [child]);
        }
      },
      data: [],
      total: 0,
      index: 0,
      sort: "id",
      order: "desc",
      rows: 10,
      page: 1,
      funId: "1000",
      postFname: "",
      state: this.modity,
      loading: "",
      empnhName: ""
    };
  },
  computed: {
    pageShow () {
            return this.$store.state.btnOperate.pageShow;
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton;
        },
        modity () {
            //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
            return this.$store.state.btnOperate.modity;
        },
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        }
  },
  components: {
    // 初始化子页面
    btnList,
    update,
    expwindow,
    expdow,
    importExcel
  },
  //按钮权限控制
  pickData() {
    const t = this;
    t.$refs.searchOrgframe.getData(this.params);
    t.openPick = true;
  },
  created () {
        if (this.pageShow !== "") {
            this.columns.push(this.tableBtn);
            this.tableOperate = true
        }
  },
   watch: {
        pageShow (val) {
            if (val === "" && this.tableOperate === true) {
                this.columns.pop();
                this.tableOperate = false;
            } else if (this.tableOperate === false) {
                this.columns.push(this.tableBtn);
                this.tableOperate = true;
            }
        }
    },
  //初始化自动调用方法
  mounted() {
    this.getData();
  },
  methods: {
    //状态
    modityChange(res) {
      this.tableselected = [];
      this.getData();
    },
    getData(page) {
      const t = this;
      this.loading = true;
      if (page == undefined) {
        this.page = 1;
      }
      const data = {
        _mt: "protocolManage.getPage",
        rows: t.rows,
        page: t.page,
        sort: t.sort,
        order: t.order,
        logType: "变更协议查询",
        roleType:localStorage.roleType,//角色类型
        funId: "1000",
        empnhName: t.empnhName,
        state: t.modity
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginNew(data)
        .then(res => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows;
            t.total = res.data.content[0].records;
          }
        })
        .catch(() => {
          // t.$Modal.error({
          //   title: this.$t("reminder.err"),
          //   content: this.$t("reminder.errormessage")
          // });
          this.$Message.error(this.$t("reminder.errormessage"));
        })
        .finally(() => {
          this.loading = false;
          this.$store.commit('btnOperate/setSearchLoading',false)
        });
    },

    // 点击列表表头 调用排序方法 无需更改
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
      } else {
        this.order = "desc";
      }
    },
    sizeChange(size) {
      const t = this;
      t.rows = size;
      t.getData();
    },
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getData(t.page);
    },
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id);
      }
      this.tableselected = newArr;
    },
    deletemsg() {
      const t = this;
      if (t.tableselected.length === 0) {
        // t.$Modal.warning({
        //   title: this.$t("reminder.remind"),
        //   content: this.$t("reminder.leastone")
        // });
        this.$Message.warning("请至少选择一条数据");
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.confirmdelete"),
          onOk: () => {
            getDataLevelUserLogin({
              _mt: "protocolManage.delByIds",
              funId: "1",
              logType: this.$t("button.del"),
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  // t.getTree()
                  t.getData();
                  this.$Message.success(this.$t("reminder.deletesuccess"));
                }
              })
              .catch(() => {
                // t.$Modal.error({
                //   title: this.$t("reminder.err"),
                //   content: this.$t("reminder.errormessage")
                // });
                this.$Message.error(this.$t("reminder.errormessage"));
              });
          },
          onCancel: () => {}
        });
      }
    },
    openUp(id, logType, index) {
      const t = this;
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.openUpdate = true;
      t.index = index;
      // t.$refs.update.getSelect()
      t.$refs.update.disabled = false;
      if (logType === this.$t("button.upd") || logType === "查看") {
        t.$refs.update.getData(id);
      }
      if (logType === "查看") {
        t.$refs.update.disabled = true;
      }
    },
    closeUp() {
      const t = this;
      t.openUpdate = false;
      t.$refs.update.empnhName = "";
      t.$refs.update.unitoFname = "";
      t.$refs.update.postoFname = "";
      t.$refs.update.empnhIdno = "";
      t.$refs.update.formValidate.contractoNo = "";
      t.$refs.update.formValidate.contractoStart = "";
      t.$refs.update.formValidate.contractoEnd = "";
      t.$refs.update.unitFname = "";
      t.$refs.update.postFname = "";
      t.$refs.update.formValidate.contractnStart = "";
      t.$refs.update.formValidate.contractnEnd = "";
      t.$refs.update.formValidate.signingnTime = "";
      t.$refs.update.formValidate.note = "";
      t.$refs.update.formValidate.empnType = "";
      t.$refs.update.formValidate.empoType = "";
      t.$refs.update.formValidate.contractoType = "";
      t.$refs.update.formValidate.contractoPeriod = "";
      t.$refs.update.formValidate.contractoTime = "";
      t.$refs.update.formValidate.signingoTime = "";
      t.$refs.update.formValidate.empnType = "";
      t.$refs.update.formValidate.contractnType = "";
      t.$refs.update.formValidate.contractnPeriod = "";
      t.$refs.update.formValidate.contractnTime = "";
      t.$refs.update.file = "";
    },
    search() {
      this.page = 1;
      this.getData();
      this.$store.commit('btnOperate/setSearchLoading',true);
      this.tableselected = [];
    },
    modifystatus(state) {
      const t = this;
      let logType = "";
      let tipContent = "";
      if (state === "02ok") {
        logType = "确认";
        tipContent = "您确定继续操作吗？";
      }
      if (t.tableselected.length === 0) {
        // t.$Modal.warning({
        //   title: this.$t("reminder.remind"),
        //   content: this.$t("reminder.leastone")
        // });
        this.$Message.warning("请至少选择一条数据");
        return;
      }
      t.$Modal.confirm({
        title: this.$t("reminder.remind"),
        content: tipContent,
        onOk: () => {
          getDataLevelUserLogin({
            _mt: "protocolManage.setStateByIds",
            logType: logType,
            state: state,
            ids: t.tableselected.toString()
          })
            .then(res => {
              if (isSuccess(res, t)) {
                t.getData();
                this.$Message.success(this.$t("reminder.operatsuccess"));
              }
            })
            .catch(() => {
              this.$Message.error(this.$t("reminder.errormessage"));
            });
        },
        onCancel: () => {}
      });
    }, //修改状态
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
        empnhName: t.empnhName,
        state: t.modity
      };
      // 设置导出mt参数
      this.$refs.expwindow.getData(
        this.expDataTital,
        "protocolManage.export",
        data
      );
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
    // 子页面新增数据后添加到本页面分页第一行  无需更改
    addNewArray(res) {
      const t = this;
      t.data.unshift(res);
    },
    // 子页面修改数据后 本页面修改对应行数的数据 无需更改
    updateArray(res) {
      const t = this;
      t.data.splice(t.index, 1, res);
    }
  }
};
</script>
<style lang="scss" scoped>
.table-form {
  margin: 10px 0;
}
.margin-right-10 {
  margin-right: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.colTree {
  /*min-height: 600px;*/
  max-height: 100%;
  overflow-y: auto;
  position: relative;
  padding: 0 20px 0 0;
}
.divtree {
  padding-left: 10px;
  /*height: 750px;*/
  overflow: auto;
  border: 1px #efefef solid;
}
</style>
