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
            <!-- <Input
              :placeholder="$t('lang_platdoc.platDoc.p_platDctpCode')"
              style="width: 200px"
              v-model="platDctpCode"
            />-->

            <!-- <Input
              :placeholder="$t('lang_platdoc.platDoc.p_platDctpName')"
              style="width: 200px"
              v-model="platDctpName"
            />-->
            <Col span="18" style="width: 73.3333% !important;">
              <Row>
                <Input placeholder="请输入员工姓名" style="width: 200px" v-model="empnhName"/>
                <Input placeholder="请输入员工证件号" style="width: 200px" v-model="empnhIdno"/>
                <Input placeholder="请输入岗位名称" style="width: 200px" v-model="deptId"/>
                <!-- <span style="margin: 0;">
              <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
                </span>-->
                <span style="margin: 0;">
                  <Button type="primary" icon="search" @click="search()">查询</Button>
                </span>
                <!-- <Button type="primary" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
                <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
                <Button type="error" @click="deletemsg">删除</Button>
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
                  :data="$store.state.empPo.mainTable"
                ></Table>
              </row>
              <Row style="display: flex">
                <Page
                  :total="total"
                  size="small"
                  :current="page"
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
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="closeUp" ref="update"></update>
    </transition>
  </div>
</template>
<script>
import update from "./updAndAdd";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess } from "../../../lib/util";

export default {
  data() {
    return {
      //          TODO:这里高度计算可能有问题
      treeheight: document.body.offsetHeight - 200,
      tableheight: document.body.offsetHeight - 280,
      value: "",
      loading: true,
      logType: "",
      dataTree: [],
      openUpdate: false,
      tableselected: [],
      columns: [
        {
          type: "selection",
          width: 54,
         
          align: "center"
        },
        {
          title: "雇员姓名",
          key: "empnhName"
        },
        {
          title: "性别",
          key: "empnhGender"
        },

        {
          title: "部门名称",
          key: "deptId"
        },
        {
          title: "岗位名称",
          key: "postId"
        },

        {
          title: "操作",
          key: "action",
          width: 64,
          fixed: "right",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, "修改", params.index);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      total: 0,
      // sort: "platDctpCode",
      sort: "id",
      // order: "desc",
      order: "asc",
      rows: 10,
      page: 1,
      // platDctpCode: "",
      // platDctpName: ""
      funId: "1000",
      empnhName: "",
      empnhIdno: "",
      deptId: "",
      postId: "",
      state: "",
      treeid: "",
      treeType: ""
    };
  },
  components: {
    update
  },
  mounted() {
    // this.getData(1);
    this.getData("", 1);
    this.getTree();
  },
  methods: {
    // getData(page) {
    getData(id, page) {
      // id原先无
      if (id === "$") {
        id = "";
      }

      const t = this;
      if (page) {
        t.page = page;
      }
      // const data = {
      //   _mt: "platDocTemplate.getPage",
      //   sort: t.sort,
      //   order: t.order,
      //   rows: t.rows,
      //   page: t.page,
      //   funId: "1",
      //   logType: "查询List",
      //   platDctpCode: t.platDctpCode,
      //   platDctpName: t.platDctpName
      // };
      const dataPar = {
        _mt: "empEmpnh.getPage",
        rows: t.rows,
        page: t.page,
        sort: t.sort,
        order: t.order,
        logType: "员工主数据查询",
        empnhName: t.empnhName,
        empnhIdno: t.empnhIdno,
        deptId: t.deptId,
        postId: t.postId
        // state:t.stata,
        // empkiWorkno: t.empNo,
        // empCname: t.empCname,
        // pid: id || ""
      };
      /*
       * 删除data中为空的数据，不传到后台
       * */
      for (const dat in dataPar) {
        if (dataPar[dat] === "") {
          delete dataPar[dat];
        }
      }
      // getDataLevelUserLoginNew(data)
      //主表请求
      getDataLevelUserLoginNew(dataPar)
        .then(res => {
          if (isSuccess(res, t)) {
            //          获取到表格数据存入vuex中
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit(
                "empPo/setMainTable",
                res.data.content[0].rows
              );
            } else {
              this.$store.commit("empPo/setMainTable", []);
            }
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
    /*
     * 切换每页显示条数方法
     * */
    sizeChange(size) {
      const t = this;
      t.rows = size;
      // t.getData();
      t.getData(this.treeType + "$" + this.treeid);
    },
    /*
     * 翻页方法
     * */
    pageChange(page) {
      const t = this;
      t.page = page;
      //
      t.getData(this.treeType + "$" + this.treeid);
    },
    /*
     * 排序方法
     * */
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
      } else {
        this.order = "desc";
      }
    },
    /*
     * 多选方法，将数据逗号分割放入tableselected中
     * */
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id);
      }
      this.tableselected = newArr;
    },
    /*
     * 删除方法
     * */
    // TODO: 增加删除提示
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
            // getDataLevelUserLogin({
            //   _mt: "platDocTemplate.delByIds",
            //   funId: "1",
            //   companyId: "1",
            //   logType: this.$t("button.del"),
            //   delIds: t.tableselected.toString()
            // })
            getDataLevelUserLogin({
              _mt: "empMaster.delByIds",
              funId: "1",
              logType: "删除",
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  // 原先无
                  t.getTree();
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
    /*
     * 打开弹出页面的方法
     * */
    openUp(id, logType, index) {
      const t = this;
      t.openUpdate = true;

      t.logType = "查询";
      //      将本条数据的id传入mainid（如果有的话）
      // this.$store.commit("docTemp/setMainId", id);
      // this.$store.commit("docTemp/setIndex", index);
      this.$store.commit("empPo/setChildId1", id);
      this.$store.commit("empPo/setIndex", index);
      if (id) {
        t.$refs.update.getOptionData();
      }
    },
    //查询、页面刷新

    search() {
      this.treeid = "";
      this.page = 1;
      this.treeType = "";
      this.getData(" ", 1);
    },
    /*
     * 关闭弹出页面的方法
     * */
    closeUp() {
      const t = this;
      t.openUpdate = false;
    },
    //获取树
    getTree() {
      const t = this;
      const data = {
        _mt: "orgUnits.getTree",
        rows: "100",
        page: 1,
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
      // 树请求
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
      this.treeid = e.id;
      this.treeType = e.unitType;
      this.page = 1;
      this.getData(e.unitType + "$" + e.id, 1);
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
    }
  },
  renderContent(h,{ root, node, data }) {
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
