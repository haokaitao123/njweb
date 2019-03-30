<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;员工入职管理
          </p>
          <Row>
            <Col span="24">
              <Row>
                <Input placeholder="请输入员工姓名" style="width: 160px" v-model="empnhName"/>
                <!-- v-model="empnhName" -->
                <Input placeholder="请输入员工证件号" style="width: 160px" v-model="empnhIdno"/>
                <!-- v-model="empnhIdno" -->
                <Input placeholder="请输入岗位名称" style="width: 160px" v-model="deptId"/>
                <!-- v-model="deptId" -->
                <Button type="primary" icon="search" @click="search">查询</Button>
                <!-- <Button
                  type="primary"
                  icon="primary"
                  @click="openUp(NaN, $t('新增'))"
                >{{$t('button.add')}}</Button>-->
                <Button type="error" icon="primary" @click="deletemsg">删除</Button>
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
                  @click="getData(1)"
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
        :Visaarea="Visaarea"
        :id="updateId"
        :logType="logType"
        :index="index"
        @closeUp="closeUp"
        ref="update"
      ></update>
    </transition>
    <!-- <transition name="fade">
      <searchCountry
        v-show="openCountry"
        @closeCountry="closeCountry"
        @inputCountry="inputCountry"
        ref="searchCountry"
      ></searchCountry>
    </transition>-->
  </div>
</template>
<script>
// 引入主子表页面
import update from "./visaAreaBase";
// import searchCountry from "../../../components/searchTable/searchCountry";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
  data() {
    return {
      tableheight: document.body.offsetHeight - 280,
      tableselected: [],

      logType: "",

      // openCountry: false,
      openUpdate: false,
      // 主表id 无需变更
      updateId: NaN,
      empnhName: "",
      empnhIdno: "",
      deptId: "",
      postId:"",
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
          key: "deptIdDis"
        },
        {
          title: "岗位名称",
          key: "postIdDis"
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
      data: [],
      total: 0,
      index: 0,
      sort: "id",
      order: "desc",
      rows: 10,
      page: 1,
      Visaarea: [],
      // areaContry: "",
      // areaContryDis: "",
      // areaDistrict: ""
    };
  },
  computed: {},
  components: {
    // 初始化引入页面
    update
    // searchCountry
  },
  mounted() {
    // this.getSelect();
    this.search();
    // this.getTree();
  },
  methods: {
    search() {
      this.page = 1;
      // this.treeid = "";
      // this.treeType = "";
      this.getData();
    },
    getData() {
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
        deptId: t.deptId,
        postId: t.postId
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
              
              _mt: "empMaster.delByIds",
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
    
    sizeChange(size) {
      const t = this;
      t.rows = size;
      t.getData();
    },
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getData();
    },
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
      } else {
        this.order = "desc";
      }
    },
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
    closeUp() {
      const t = this;
      t.openUpdate = false;
    },
   
    //获取树
  //   getTree() {
  //     const t = this;
  //     const data = {
  //       _mt: "orgUnits.getTree",
  //       rows: "100",
  //       page: 1,
  //       sort: "unitCode",
  //       order: "asc",
  //       logType: this.$t("button.ser"),
  //       id: "0"
  //     };
  //     for (const dat in data) {
  //       if (data[dat] === "") {
  //         delete data[dat];
  //       }
  //     }
  //     // 树请求
  //     getDataLevelUserLoginNew(data)
  //       .then(res => {
  //         if (isSuccess(res, t)) {
  //           t.loading = false;
  //           setTimeout(() => {
  //             t.dataTree = t.toTree(res.data.content[0].value);
  //           }, 500);
  //         }
  //       })
  //       .catch(() => {
  //         t.$Modal.error({
  //           title: this.$t("reminder.err"),
  //           content: this.$t("reminder.errormessage")
  //         });
  //       });
  //   },
  //   /* 树点击事件 */
  //   selectChange(e) {
  //     this.treeid = e.id;
  //     this.treeType = e.unitType;
  //     this.page = 1;
  //     this.getData(e.unitType + "$" + e.id, 1);
  //   },
  //   /* 把后台数据转化为tree的格式 */
  //   toTree(data) {
  //     data.forEach(item => {
  //       item.expand = false;
  //       item.checked = item.authRoleFunDis === "1";
  //       item.title = item.unitCode + " " + item.unitSname;
  //       delete item.children;
  //     });
  //     const map = {};
  //     data.forEach(item => {
  //       map[item.id] = item;
  //     });
  //     const val = [];
  //     data.forEach(item => {
  //       const parent = map[item.unitPid];
  //       if (parent) {
  //         (parent.children || (parent.children = [])).push(item);
  //       } else {
  //         val.push(item);
  //       }
  //     });
  //     return val;
  //   }
  // },
  // renderContent(h, { root, node, data }) {
  //   return h(
  //     "span",
  //     {
  //       style: {
  //         display: "inline-block",
  //         width: "100%"
  //       }
  //     },
  //     [
  //       h(
  //         "Button",
  //         {
  //           props: {
  //             type: "text",
  //             size: "small"
  //           },
  //           on: {
  //             click: () => {
  //               this.selectChange(data);
  //             }
  //           }
  //         },
  //         [
  //           h("Icon", {
  //             props: {
  //               type:
  //                 data.unitType === "01company"
  //                   ? "social-buffer"
  //                   : "ios-people",
  //               size: "15",
  //               color: data.unitType === "01company" ? "#3399ff" : "#ff9900"
  //             },
  //             style: {
  //               marginRight: "8px"
  //             }
  //           }),
  //           h("span", data.title)
  //         ]
  //       )
  //     ]
  //   );
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
