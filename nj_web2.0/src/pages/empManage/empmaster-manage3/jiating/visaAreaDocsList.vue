<template>
  <div class="content-main">
    <row>
      <Input v-model="docsName" style="width: 160px;" placeholder="请输入联系人"></Input>
      <Button type="primary" icon="search" @click="search">查询</Button>
      <Button type="primary" icon="primary" @click="showMsgBtn(NaN, $t('新增'))">新增</Button>
      <Button type="error" icon="primary" @click="deletemsg">删除</Button>
    </row>
    <row class="table-form" ref="table-form">
      <Table
        @on-selection-change="selectedtable"
        @on-sort-change="sortable"
        :height="410"
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
        :current="params.page"
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
    <!--mainid为主表id-->
    <contentMsg
      v-show="showMsg"
      @hideMsg="hideMsg"
      :mainId="mainId"
      :logType="logType"
      ref="contentMsg"
      @getData="addNewArray"
      @update="updateArray"
    ></contentMsg>
  </div>
</template>
<script>
import contentMsg from "./updVisaAreaDocs";
import {
  getDataLevelUserLogin,
  getDataLevelUserLoginNew
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";

export default {
  data() {
    return {
      total: NaN,
      logType: "",
      showMsg: false,
      rows: 10,
      page: 1,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "成员关系",
          key: "fmlsurgent",
          //            width: 150,
          sortable: "custom"
        },
        {
          title: "姓名",
          key: "fmCname"
          //            width: 150,
        },
        {
          title: "工作单位",
          key: "fmCompany"
          //            width: 150,
        },
        {
          title: "联系方式",
          key: "fmPhone"
          //            width: 150,
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          align: "center",
          width: 64,
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
                      this.showMsgBtn(params.row.id, "修改", params.index);
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
      docsName: "",
      params: {
        _mt: "empFamily.getPage",
        funId: "1",
        rows: 10,
        page: 1,
        sort: "id",
        order: "asc",
        logType: "",
        // visaAreaId: ""
        pkId: ""
      },
      index: "",
      tableselected: []
    };
  },
  //    主表id
  props: {
    mainId: Number
  },
  components: {
    contentMsg
  },
  mounted() {},
  methods: {
    search() {
      this.params.pkId = this.mainId + "";
      this.getData();
    },
    getData() {
      const t = this;
      const data = deepCopy(t.params);
      data.docsName = t.docsName;
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginNew(data)
        .then(res => {
          if (isSuccess(res, t)) {
            t.total = res.data.content[0].records;
            t.data = res.data.content[0].rows;
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    pageChange(page) {
      const t = this;
      t.params.page = page;
      t.getData();
    },
    sortable(column) {
      this.params.sort = column.key;
      this.params.order = column.order;
      if (this.params.order !== "normal") {
        this.getData();
      } else {
        this.params.order = "desc";
      }
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
              _mt: "empFamily.delByIds",
              funId: "1",
              logType: "删除",
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.getData();
                  t.tableselected = [];
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
    addNewArray(res) {
      const t = this;
      t.data.unshift(res);
    },
    updateArray(res) {
      const t = this;
      t.data.splice(t.index, 1, res);
    },
    sizeChange(size) {
      const t = this;
      t.params.rows = size;
      t.getData();
    },
    //      打开子表详细信息页面 无需变更
    showMsgBtn(id, logType, index) {
      const t = this;
      t.showMsg = true;
      t.logType = logType;
      t.index = index;
      if (t.logType === this.$t("button.upd")) {
        t.$refs.contentMsg.setRowId(id);
      }
    },

    clear() {
      const t = this;
      t.docsName = "";
      t.page = 1;
      t.rows = 10;
    },
    hideMsg() {
      this.showMsg = false;
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
