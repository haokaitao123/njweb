﻿<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;异动员工名单
          </p>
          <Row>
            <Col span="18" style="width: 100% !important">
              <Row>
                <DatePicker
                  type="date"
                  placeholder="请选择异动日期区间"
                  :editable="false"
                  v-model="transDate"
                  style="width: 200px"
                ></DatePicker>
                <DatePicker
                  type="date"
                  placeholder="请选择异动日期区间"
                  :editable="false"
                  v-model="empnhEntrydate"
                  style="width: 200px"
                ></DatePicker>
                <btnList
                  @buttonExport="expData"
                  @buttonImport="importExcel"
                  @buttonAdd="openUp(NaN,$t('button.add'))"
                  @buttonDel="deletemsg"
                  @buttonSearch="search"
                  @buttonConfirm="modifystatus('02ok')"
                  @moditySelect="modityChange"
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
                ></Table>
              </row>
              <Row style="display: flex">
                <Page
                  :total="total"
                  showTotal
                  :current="page"
                  size="small"
                  show-elevator
                  show-sizer
                  placement="top"
                  @on-page-size-change="sizeChange"
                  @on-change="pageChange"
                  :page-size="rows"
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
        { code: "empName", name: "姓名" },
        { code: "empnhEntrydate", name: "入职日期" },
        { code: "deptOnePastName", name: "原一级部门及分公司" },
        { code: "deptTwoPastName", name: "原二级部门" },
        { code: "deptThreePastName", name: "原项目" },
        { code: "groupPastName", name: "原小组" },
        { code: "postIdpastDis", name: "原岗位" },
        { code: "postTypePastDis", name: "原职级" },
        { code: "transPastleaderDis", name: "原直接领导" },
        { code: "deptOneNowName", name: "新一级部门及分公司" },
        { code: "deptTwoNowName", name: "新二级部门" },
        { code: "deptThreeNowName", name: "新项目" },
        { code: "groupNowName", name: "新小组" },
        { code: "postIdnewDis", name: "新岗位" },
        { code: "postTypeNewDis", name: "新职级" },
        { code: "transNewleaderDis", name: "现直接领导" },
        { code: "transDate", name: "异动日期" },
        { code: "transDate", name: "办理异动日期" },
        { code: "transTypeDis", name: "异动原因" }
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
      columns: [
        {
          type: "selection",
          width: 54,
          fixed: "left",
          align: "center"
        },
        {
          title: "姓名",
          key: "empName",
          width: 220,
          fixed: "left"
        },
        {
          title: "入职日期",
          key: "empnhEntrydate",
          width: 220
        },
        {
          title: "原一级部门及分公司",
          key: "deptOnePastName",
          width: 200
        },
        {
          title: "原二级部门",
          key: "deptTwoPastName",
          width: 220
        },
        {
          title: "原项目",
          key: "deptThreePastName",
          //对应列是否可以排序，如果设置为 custom，则代表排序，需要监听 Table 的 on-sort-change 事件
          width: 200
        },
        {
          title: "原小组",
          key: "groupPastName",
          width: 200
        },

        {
          title: "原岗位",
          key: "postIdpastDis",
          width: 200
        },
        {
          title: "原职级",
          key: "postTypePastDis",
          width: 200
        },
        {
          title: "原直接领导",
          key: "transPastleaderDis",
          width: 200
        },

        {
          title: "新一级部门及分公司",
          key: "deptOneNowName",
          width: 200
        },
        {
          title: "新二级部门",
          key: "deptTwoNowName",
          width: 200
        },
        {
          title: "新项目",
          key: "deptThreeNowName",
          width: 200
        },
        {
          title: "新小组",
          key: "groupNowName",
          width: 200
        },
        {
          title: "新岗位",
          key: "postIdnewDis",
          width: 200
        },

        {
          title: "新职级",
          key: "postTypeNewDis",
          width: 200
        },
        {
          title: "现直接领导",
          key: "transNewleaderDis",
          width: 200
        },
        {
          title: "异动日期",
          key: "transDate",
          width: 200
        },
        {
          title: "办理异动日期",
          key: "transDate",
          width: 200
        },
        {
          title: "异动原因",
          key: "transTypeDis",
          width: 200
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
      order: "asc",
      rows: 20,
      page: 1,
      funId: "1000",
      state: this.modity,
      loading: "",
      transDate: "",
      empnhEntrydate: "",
      selType: ""
    };
  },
  computed: {
    pageShow() {
      return this.$store.state.btnOperate.pageShow;
    },
    tableButton() {
      return this.$store.state.btnOperate.tableButton;
    },
    modity() {
      //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
      return this.$store.state.btnOperate.modity;
    },
    btnData() {
      return this.$store.state.btnOperate.btnData;
    },
    FlowNode() {
      return this.$store.state.btnOperate.isFlowNode;
    }
  },
  components: {
    // 初始化子页面
    btnList,
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
  created() {
    if (this.pageShow !== "") {
      this.columns.push(this.tableBtn);
      this.tableOperate = true;
    }
  },
  watch: {
    pageShow(val) {
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
  mounted() {},
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
        _mt: "empReport.getPage",
        rows: t.rows,
        page: t.page,
        sort: t.sort,
        order: t.order,
        logType: "异动统计查询",
        funId: "1000",
        transDate: t.transDate,
        empnhEntrydate: t.empnhEntrydate,
        selType: "report"
      };
      if (data.transDate !== undefined && data.transDate !== "") {
        data.transDate = new Date(data.transDate).format("yyyy-MM-dd");
      } else {
        data.transDate = "";
      }
      if (data.empnhEntrydate !== undefined && data.empnhEntrydate !== "") {
        data.empnhEntrydate = new Date(data.empnhEntrydate).format(
          "yyyy-MM-dd"
        );
      } else {
        data.empnhEntrydate = "";
      }
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
          this.$Message.error(this.$t("reminder.errormessage"));
        })
        .finally(() => {
          this.loading = false;
          this.$store.commit("btnOperate/setSearchLoading", false);
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

                  t.getData();
                  this.$Message.success(this.$t("reminder.deletesuccess"));
                }
              })
              .catch(() => {
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
    search() {
      this.page = 1;
      this.getData();
      this.$store.commit("btnOperate/setSearchLoading", true);
      this.tableselected = [];
    },
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
        transDate: t.transDate,
        empnhEntrydate: t.empnhEntrydate,
        state: t.modity
      };
      if (data.transDate !== undefined && data.transDate !== "") {
        data.transDate = new Date(data.transDate).format("yyyy-MM-dd");
      } else {
        data.transDate = "";
      }
      if (data.empnhEntrydate !== undefined && data.empnhEntrydate !== "") {
        data.empnhEntrydate = new Date(data.empnhEntrydate).format(
          "yyyy-MM-dd"
        );
      } else {
        data.empnhEntrydate = "";
      }
      // 设置导出mt参数
      this.$refs.expwindow.getData(
        this.expDataTital,
        "empReport.exportEmptrans",
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
