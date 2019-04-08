<template>
  <div class="content-main">
    <row>
      <Input v-model="docsName" style="width: 160px;" placeholder="请输入合同编号"></Input>
      <Button type="primary" icon="search" @click="search">查询</Button>
      <Button type="primary" icon="primary" @click="showMsgBtn(NaN, $t('新增'))">新增</Button>
      <Button type="primary" icon="primary" @click="expData">导出</Button>
      <Button type="primary" icon="primary" @click="importExcel">导入</Button>
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
    <transition>
      <contentMsg
        v-show="showMsg"
        @hideMsg="hideMsg"
        :mainId="mainId"
        :logType="logType"
        ref="contentMsg"
        @newdata="addNewArray"
        @update="updateArray"
      ></contentMsg>
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
import contentMsg from "./addEmpContractinfo";
import expwindow from "../../../../components/fileOperations/expSms";
import expdow from "../../../../components/fileOperations/expdow";
import importExcel from "../../../../components/importModel/importParam";
import {
  getDataLevelUserLogin,
  getDataLevelUserLoginNew
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";

export default {
  data() {
    return {
      // 导入的mt名称
      imp_mt: "empContractinfo.importData",
      // 导出字段设置, code字段名 name列名
      expDataTital: [
        { code: "contTypeDis", name: "合同类别" },
        { code: "contPeriodDis", name: "合同期限" },
        { code: "conSdate", name: "合同开始日" },
        { code: "conEdate", name: "合同结束日" },
        // 保密协议
        // { code: "conEdate", name: "合同结束日" },
        // 竞业协议
        // { code: "conEdate", name: "合同结束日" },
        // 合同工作时间
        // { code: "conEdate", name: "合同结束日" },
        { code: "contSigndate", name: "签署日期" },
        { code: "contProbatDis", name: "试用期限" },
        { code: "contProbatdt", name: "试用到期时间" }
      ],
      // 导入导出默认参数 无需变更
      openImport: false,
      openExpDow: false,
      openExp: false,
      filekey: "",
      filename: "",

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
          title: "合同类别",
          key: "contTypeDis",
          width: 150,
          sortable: "custom"
        },
        {
          title: "合同期限",
          key: "contPeriodDis",
          width: 150,
          sortable: "custom"
        },
        {
          title: "合同开始日",
          key: "contSdate",
          width: 150,
          sortable: "custom"
        },
        {
          title: "合同结束日",
          key: "contEdate",
          width: 150,
          sortable: "custom"
        },
        {
          title: "签署日期",
          key: "contSigndate",
          width: 150,
          sortable: "custom"
        },
        {
          title: "试用期限",
          key: "contProbatDis",
          width: 150,
          sortable: "custom"
        },
        {
          title: "试用到期时间",
          key: "contProbatdt",
          width: 150,
          sortable: "custom"
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
                      this.showMsgBtn(
                        params.row.id,
                        this.logType,
                        params.index
                      );
                    }
                  }
                },
                this.logType
              )
            ]);
          }
        }
      ],
      data: [],
      docsName: "",
      params: {
        _mt: "empContractinfo.getPage",
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
    mainId: Number,
    logType: String
  },
  components: {
    contentMsg,
    expwindow,
    expdow,
    importExcel
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
              _mt: "empEducation.delByIds",
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
      this.$refs.expwindow.getData(
        this.expDataTital,
        "empContractinfo.export",
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
