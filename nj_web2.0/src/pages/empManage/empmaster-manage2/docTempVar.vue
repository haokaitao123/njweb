<template>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="openUp(NaN, $t('新增'))">新增</Button>
      <!-- <Button type="primary" @click="initVar">{{$t('button.ini')}}</Button> -->
      <Button type="error" @click="deletemsg">删除</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table
        @on-selection-change="selectedtable"
        @on-sort-change="sortable"
        :height="410"
        size="small"
        border
        ref="selection"
        :columns="columns"
        :data="$store.state.empPo.childTable1"
      ></Table>
    </row>
    <Row style="display: flex">
      <Page
        :total="total"
        :showTotal="showTotal"
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
        @click="getData(1)"
      ></Button>
    </Row>
    <updDocTempVar v-show="showMsg" @hideMsg="hideMsg" ref="updDocTempVar" :logType="logType"></updDocTempVar>
  </div>
</template>
<script>
import updDocTempVar from "./updDocTempVar";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess } from "../../../lib/util";

export default {
  data() {
    return {
      logType: "",
      total: NaN,
      showTotal: true,
      sort: "id",
      order: "asc",
      rows: "10",
      page: "1",
      showMsg: false,
      tableselected: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "教育程度",
          key: "edEducationlevel",
          align: "left"
        },
        {
          title: "是否最高学位",
          key: "edIshighest",
          align: "left"
        },
        {
          title: "国家",
          key: "edCuntry",
          align: "left"
        },
        {
          title: "学校",
          key: "edSchool",
          align: "left"
        },
        {
          title: "学位",
          key: "edDegree",
          align: "left"
        },
         {
          title: "开始时间",
          key: "edSdate",
          align: "left"
        },
        {
          title: "开始时间",
          key: "edSdate",
          align: "left"
        },

        {
          title: "操作",
          key: "action",
          align: "center",
          width: 80,
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
                      this.openUp(
                        params.row.id,
                        "修改",
                        params.index
                      );
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    updDocTempVar
  },
  methods: {
    getdata() {
      const t = this;
      const data = {
        _mt: "empEducation.getPage",
        funId: "1",
        logType: "查询",
        sort: t.sort,
        order: t.order,
        rows: t.rows,
        page: t.page,
        
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginNew(data)
        .then(res => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit(
                "empPo/setChildTable1",
                res.data.content[0].rows
              );
              t.total = res.data.content[0].records;
            } else {
              this.$store.commit("empPo/setChildTable1", []);
            }
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    sizeChange(size) {
      const t = this;
      t.rows = size;
      t.getdata();
    },
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getdata();
    },
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getdata();
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
            getDataLevelUserLogin({
              _mt: "empEducation.delByIds",
              funId: "1",
              logType: "删除",
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  t.getdata();
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
    // initVar() {
    //   const t = this;
    //   getDataLevelUserLoginNew({
    //     _mt: "platDocVar.initVar",
    //     funId: "1",
    //     logType: "初始化",
    //     platDcvarDcptid: t.$store.state.docTemp.mainId
    //   })
    //     .then(res => {
    //       if (isSuccess(res, t)) {
    //         t.getdata();
    //       }
    //     })
    //     .catch(() => {
    //       t.$Modal.error({
    //         title: this.$t("reminder.err"),
    //         content: this.$t("reminder.errormessage")
    //       });
    //     });
    // },
    showMsgBtn() {
      this.showMsg = true;
    },
    openUp(id, logType, index) {
      const t = this;
      t.showMsg = true;
      t.logType = logType;
      //      将本条数据的id传入mainid（如果有的话）
      this.$store.commit("empPo/setIndex", index);
      if (id) {
        this.$store.commit("empPo/setChildId1", id);
        t.$refs.updDocTempVar.getFormData();
      }
    },
    hideMsg() {
      this.showMsg = false;
    },
    close() {
      this.$emit("hideMsg");
    }
  }
};
</script>
<style lang="scss" scoped>
.content-main {
  height: 500px;
  .table-form {
    margin: 10px 0;
  }
}
</style>

