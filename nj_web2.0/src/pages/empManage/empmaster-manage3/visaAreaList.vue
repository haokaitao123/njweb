<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;员工入职管理
          </p>
          <Row>
            <Col span="6" class="colTree">
              <div class="divtree" :style="{height:treeheight + 'px'}">
                <Tree
                  v-if="dataTree != ''"
                  :data="dataTree"
                  @on-select-change="selectChange"
                  :render="renderContent"
                ></Tree>
                <Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>
              </div>
            </Col>
            <Col span="18">
              <Row>
                <Input placeholder="请输入员工姓名" style="width: 160px" v-model="empnhName"/>
                <Input placeholder="请输入员工证件号" style="width: 160px" v-model="empnhIdno"/>
                <!-- <Input placeholder="请输入岗位名称" style="width: 160px" v-model="deptId"/> -->
                <Input placeholder="请输入岗位名称" style="width: 160px" v-model="postId"/>
                <btnList
                  @buttonExport="expData"
                  @buttonSearch="search"
                  @buttonImport="importExcel"
                  @moditySelect="modityChange"
                  @buttonEmp1="modifystatus('01empstate')"
                  @buttonEmp="entryb"
                  @buttonEmp2="modifystatus('02empstate')"
                  @buttonDel="deletemsg"
                ></btnList>
                <!-- @moditySelect="modityChange" -->
                <!-- @buttonAdd="openUp(NaN,$t('button.add'))"  -->
                <!-- <Button type="primary" icon="search" @click="search">查询</Button> -->
                <!-- <Button type="error" icon="primary" @click="deletemsg">删除</Button> -->
              </Row>
              <row class="table-form" ref="table-form">
                <Table
                  @on-selection-change="selectedtable"
                  @on-sort-change="sortable"
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
                  size="small"
                  show-elevator
                  show-sizer
                  placement="top"
                  :current="page"
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
                  @click="search"
                ></Button>
              </Row>
            </Col>
          </Row>
        </card>
      </Col>
    </Row>
    <!--布置主子表页面 visaare变量为特殊参数 一般不传  其他无需变更-->
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
// 引入主子表页面
import update from "./visaAreaBase";
import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
import importExcel from "../../../components/importModel/importParam";
import btnList from "../../../components/btnAuth/btnAuth";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
  data() {
    return {
      // 导入的mt名称
      imp_mt: "empEmpnh.importData",
      // 导出字段设置, code字段名 name列名
      expDataTital: [
        { code: "postCode", name: "岗位编码" },
        { code: "postFnameCnDis", name: "岗位名称" },
        { code: "postStansalary", name: "岗位标准薪资" },
        { code: "postTrialsalary", name: "试用期薪资" },
        { code: "postCostsharing", name: "默认分摊成本" },
        { code: "seniorityWage", name: "工龄工资" },
        { code: "note", name: "备注" }
      ],
      // 导入导出默认参数 无需变更
      openImport: false,
      openExpDow: false,
      openExp: false,
      filekey: "",
      filename: "",

      // 子页面参数
      treeheight: document.body.offsetHeight - 200,
      tableheight: document.body.offsetHeight - 280,
      tableselected: [],
      loading: true,
      logType: "",
      openUpdate: false,
      // 主表id 无需变更
      updateId: NaN,
      empnhName: "",
      empnhIdno: "",
      dataTree: [],
      hua: "",
      postId: "",
      columns: [
        {
          type: "selection",
          width: 54,
          fixed: "left",
          align: "center"
        },
        {
          title: "唯一编号",
          key: "numberCode",
          width: 120,
          fixed: "left",
          align: "center"
          //  sortable: 'custom',
        },
        {
          title: "雇员姓名",
          key: "empnhName",
          width: 140,
          align: "center"
          //  sortable: 'custom',
        },
        // render: (h, params) => {
        //                 return h('div', params.row.unitSysalig == 1 ? "是" : "否")
        //             }
        {
          title: "部门名称",
          key: "deptIdDis",
          width: 140,
          align: "center"
          //  sortable: 'custom',
        },
        {
          title: "岗位名称",
          key: "postIdDis",
          width: 140,
          align: "center"
          //  sortable: 'custom',
        },
        {
          title: "直接上级",
          key: "empnhPmp",
          width: 140,
          align: "center"
          //  sortable: 'custom',
        },
        {
          title: "证件类型",
          key: "empnhIdtype",
          width: 140,
          align: "center"
          //  sortable: 'custom',
        },
        {
          title: "证件号码",
          key: "empnhIdno",
          width: 180,
          align: "center",
           sortable: 'custom',
        },
        {
          title: "生效日期",
          key: "empnhSday",
          width: 140,
          align: "center",
          sortable: 'custom',
        },
        {
          title: "证件到期日",
          key: "empnhEday",
          width: 140,
          align: "center",
          sortable: 'custom',
        },
        {
          title: "性别",
          key: "empnhGenderDis",
          width: 100,
          align: "center"
          //  sortable: 'custom',
        },
        {
          title: "出生日期",
          key: "empnhBirthdate",
          width: 140,
          align: "center",
          sortable: "custom"
        },
        {
          title: "手机号码",
          key: "empnhMobile",
          width: 140,
          align: "center",
          sortable: "custom"
        },
        {
          title: "户籍性质",
          key: "empnhRegaddrDis",
          width: 140,
          align: "center"
          // sortable: 'custom',
        },
        {
          title: "工作地点",
          key: "empnhWklocatDis",
          width: 140,
          align: "center"
          // sortable: 'custom',
        },
        {
          title: "入职日期",
          key: "empnhEntrydate",
          width: 140,
          align: "center",
          sortable: "custom"
        },
        {
          title: "转正日期",
          key: "empnhIrmentdate",
          width: 140,
          align: "center",
          sortable: "custom"
        },
        {
          title: "开户银行",
          key: "empnhSalbank",
          width: 140,
          align: "center"
          // sortable: 'custom',
        },
        {
          title: "户名",
          key: "empnhSalaccname",
          width: 140,
          align: "center"
          // sortable: 'custom',
        },
        {
          title: "参加工作时间",
          key: "empnhFirstwkdate",
          width: 140,
          align: "center",
          sortable: "custom"
        },
        {
          title: "是否考勤",
          key: "empnhAttendyn",
          width: 140,
          align: "center",
          sortable: "custom",
          render: (h, params) => {
            return h("div", params.row.empnhAttendyn == 1 ? "是" : "否");
          }
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
      page: 1
    };
  },
  computed: {
    pageShow() {
      return this.$store.state.btnOperate.pageShow;
    },
    tableButton() {
      return this.$store.state.btnOperate.tableButton;
    },
    tableOperate() {
      return this.$store.state.btnOperate.tableOperate;
    }
  },
  created() {
    if (this.pageShow != "") {
      this.columns.push(this.tableBtn);
      this.$store.commit("btnOperate/setTableOperate", "true");
    }
  },
  watch: {
    pageShow(val) {
      if (val == "" && this.tableOperate == "true") {
        this.columns.pop();
        this.$store.commit("btnOperate/setTableOperate", "false");
      } else if (this.tableOperate == "false") {
        this.columns.push(this.tableBtn);
        this.$store.commit("btnOperate/setTableOperate", "true");
      }
    }
  },
  components: {
    update,
    btnList,
    expwindow,
    expdow,
    importExcel
  },
  mounted() {
    this.search();
    this.getTree();
  },
  methods: {
    // 查询
    search() {
      this.page = 1;
      this.treeid = "";
      this.treeType = "";
      this.getData();
    },
    // 获取主表数据
    getData(id) {
      const t = this;
      const data = {
        _mt: "empEmpnh.getPage",
        rows: t.rows,
        page: t.page,
        sort: t.sort,
        order: t.order,
        logType: "员工主数据查询",
        empnhName: t.empnhName,
        empnhIdno: t.empnhIdno,
        deptId: id,
        postId: t.postId,
        // unitPid: id,
        state: t.state
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
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    // 删除
    deletemsg() {
      const t = this;
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone")
        });
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.confirmdelete"),
          onOk: () => {
            getDataLevelUserLogin({
              _mt: "empEmpnh.delByIds",
              funId: "1",
              logType: "删除",
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  t.getData();
                }
              })
              .catch(() => {
                t.$Modal.error({
                  title: this.$t("reminder.err"),
                  content: this.$t("reminder.errormessage")
                });
              });
          },
          onCancel: () => {}
        });
      }
    },
    // 入职
    entryb() {
      const t = this;
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone")
        });
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: this.$t("请确定是否将该条数据加入入职中"),
          onOk: () => {
            getDataLevelUserLogin({
              _mt: "empEmpnh.updStateByIds",
              funId: "1",
              logType: "入职",
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  t.getData();
                }
              })
              .catch(() => {
                t.$Modal.error({
                  title: this.$t("reminder.err"),
                  content: this.$t("reminder.errormessage")
                });
              });
          },
          onCancel: () => {}
        });
      }
    },
    // 条数变化
    sizeChange(size) {
      const t = this;
      t.rows = size;
      t.getData();
    },
    // 页码变化
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getData();
    },
    // 排序
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
      } else {
        this.order = "desc";
      }
    },
    // 删除、入职多选按钮
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id);
      }
      this.tableselected = newArr;
    },
    // 打开主子表页面  无需变更
    openUp(id, logType, index) {
      const t = this;
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.openUpdate = true;
      t.index = index;
      if (t.logType === this.$t("button.upd")) {
        // 调用子页面方法 传递参数 无需变更
        t.$refs.update.getOption(id, logType);
      }
    },
    // 关闭主表页面
    closeUp() {
      const t = this;
      t.openUpdate = false;
    },
    // 状态变化
    modityChange(res) {
      this.state = res.funStatecode;
      this.getData();
    },
    // 获取下拉状态
    getPageByState(paramCode, paramInfoCn) {
      this.status = paramCode;
      this.getData(1);
      this.statusDis = paramInfoCn;
    },
    //修改状态
    modifystatus(state) {
      const t = this;
      let logType = "";
      if (state === "02empstate") {
        logType = "已入职";
      } 
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone")
        });
        return;
      }
      getDataLevelUserLogin({
        _mt: "orgUnits.setStateById",
        logType: logType,
        state: state,
        ids: t.tableselected.toString
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.getData(1);
            t.$Modal.success({
              title: this.$t("reminder.suc"),
              content: "操作完成"
            });
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
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
        bankCode: t.bankCode,
        bankCname: t.bankCname,
        bankSwiftcode: t.bankSwiftcode
      };
      // 设置导出mt参数
      this.$refs.expwindow.getData(this.expDataTital, "empEmpnh.export", data);
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
    //获取树
    getTree() {
      const t = this;
      const data = {
        _mt: "orgUnits.getTree",
        rows: "100",
        page: "1",
        sort: "unitCode",
        order: "asc",
        logType: this.$t("button.ser"),
        id: "0"
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginNew(data)
        .then(res => {
          if (isSuccess(res, t)) {
            t.loading = false;
            setTimeout(() => {
              t.dataTree = t.toTree(res.data.content[0].value);
            }, 500);
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    /* 树点击事件 */
    selectChange(e) {
      // debugger;
      this.treeid = e.id;
      // this.treeType = e.unitType;
      this.page = 1;

      this.getData(e.id);
    },
    /* 把后台数据转化为tree的格式 */
    toTree(data) {
      data.forEach(item => {
        item.expand = false;
        item.checked = item.authRoleFunDis === "1";
        item.title = item.unitCode + " " + item.unitSname;
        delete item.children;
      });
      const map = {};
      data.forEach(item => {
        map[item.id] = item;
      });
      const val = [];
      data.forEach(item => {
        const parent = map[item.unitPid];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          val.push(item);
        }
      });
      return val;
    },
    // 渲染树状图
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h(
            "Button",
            {
              props: {
                type: "text",
                size: "small"
              },
              on: {
                click: () => {
                  this.selectChange(data);
                }
              }
            },
            [
              h("Icon", {
                props: {
                  type:
                    data.unitType === "01company"
                      ? "social-buffer"
                      : "ios-people",
                  size: "15",
                  color: data.unitType === "01company" ? "#3399ff" : "#ff9900"
                },
                style: {
                  marginRight: "8px"
                }
              }),
              h("span", data.title)
            ]
          )
        ]
      );
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
  box-sizing: border-box;
  /*height: 750px;*/
  overflow: auto;
  border: 1px #efefef solid;
}
</style>
