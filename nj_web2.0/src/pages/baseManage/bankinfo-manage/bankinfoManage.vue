<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>
            &nbsp;{{$t('lang_baseManage.baseBankinfo.title')}}
          </p>
          <Row>
            <Input
              :placeholder="$t('lang_baseManage.baseBankinfo.bankCodeDis')"
              style="width: 200px"
              @on-enter="enterEvent"
              v-model="bankCode"
            />
            <Input
              :placeholder="$t('lang_baseManage.baseBankinfo.banknameDis')"
              style="width: 200px"
              @on-enter="enterEvent"
              v-model="bankCname"
            />
            <Input
              :placeholder="$t('lang_baseManage.baseBankinfo.bankSwiftcodeDis')"
              style="width: 200px"
              @on-enter="enterEvent"
              v-model="bankSwiftcode"
            />
            <span style="margin: 0;">
              <Button type="primary" icon="search" :loading="searchLoading" @click="getData(1)">{{$t('button.ser')}}</Button>
            </span>
            <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <Button type="primary" @click="expData">{{$t('button.exp')}}</Button>
            <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>
          </Row>
          <row class="table-form" ref="table-form">
            <Table
              :loading="loading"
              @on-select="selectedtable"
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
              :showTotal="showTotal"
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
        </card>
      </Col>
    </Row>
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
import update from "./addNewBankinfo";
import { isSuccess } from "../../../lib/util";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../axios/axios";
import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
import importExcel from "../../../components/importModel/importParam";

export default {
  data() {
    return {
      searchLoading: false,
      loading: "",
      imp_mt: "baseBankinfo.importData",
      openImport: false,
      expDataTital: [
        {
          code: "bankCode",
          name: this.$t("lang_baseManage.baseBankinfo.bankCode")
        },
        {
          code: "bankCityName",
          name: this.$t("lang_baseManage.baseBankinfo.bankCityName")
        },
        {
          code: "bankCname",
          name: this.$t("lang_baseManage.baseBankinfo.bankCname")
        },
        {
          code: "bankEname",
          name: this.$t("lang_baseManage.baseBankinfo.bankEname")
        },
        {
          code: "bankCadd",
          name: this.$t("lang_baseManage.baseBankinfo.bankCadd")
        },
        {
          code: "bankEadd",
          name: this.$t("lang_baseManage.baseBankinfo.bankEadd")
        },
        {
          code: "bankSwiftcode",
          name: this.$t("lang_baseManage.baseBankinfo.bankSwiftcode")
        },
        {
          code: "comment",
          name: this.$t("lang_baseManage.baseBankinfo.comment")
        }
      ],
      openExpDow: false,
      openExp: false,
      filekey: "",
      filename: "",
      tableheight: document.body.offsetHeight - 280,
      value: "",
      logType: "",
      openUpdate: false,
      updateId: NaN,
      tableselected: [],
      columns: [
        {
          type: "selection",
          width: 54,
          align: "center",
          fixed: "left"
        },
        {
          title: this.$t("lang_baseManage.baseBankinfo.bankCode"),
          key: "bankCode",
          sortable: "custom",
          width: 220
        },
        {
          title: this.$t("lang_baseManage.baseBankinfo.bankCityName"),
          key: "bankCityName",
          sortable: "custom",
          width: 220
        },
        {
          title: this.$t("lang_baseManage.baseBankinfo.bankCname"),
          key: "bankCname",
          sortable: "custom",
          width: 220
        },
        {
          title: this.$t("lang_baseManage.baseBankinfo.bankEname"),
          key: "bankEname",
          sortable: "custom",
          width: 220
        },
        {
          title: this.$t("lang_baseManage.baseBankinfo.bankCadd"),
          key: "bankCadd",
          sortable: "custom",
          width: 220
        },
        {
          title: this.$t("lang_baseManage.baseBankinfo.bankEadd"),
          key: "bankEadd",
          sortable: "custom",
          width: 220
        },
        {
          title: this.$t("lang_baseManage.baseBankinfo.bankSwiftcode"),
          key: "bankSwiftcode",
          sortable: "custom",
          width: 220
        },
        {
          title: this.$t("button.opr"),
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
                      this.openUp(
                        params.row.id,
                        this.$t("button.upd"),
                        params.index
                      );
                    }
                  }
                },
                this.$t("button.upd")
              )
            ]);
          }
        }
      ],
      data: [],
      total: 0,
      showTotal: true,
      index: 0,
      sort: "id",
      order: "desc",
      rows: 20,
      page: 1,
      funId: "1000",
      bankCode: "",
      bankCname: "",
      bankSwiftcode: ""
    };
  },
  computed: {},
  components: {
    update,
    expwindow,
    expdow,
    importExcel
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    //enter事件
    enterEvent(e) {
        this.getData(1);
    },
    getData(page) {
      this.searchLoading = true;
      const t = this;
      if (page) {
        t.page = page;
      }
      if (typeof page == "undefined") {
        this.page = 1;
      }
      const data = {
        _mt: "baseBankinfo.getPage",
        rows: t.rows,
        page: t.page,
        sort: t.sort,
        order: t.order,
        logType: this.$t("button.ser"),
        bankCode: t.bankCode,
        bankCname: t.bankCname,
        bankSwiftcode: t.bankSwiftcode
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      t.loading = true;
      getDataLevelUserLoginNew(data)
        .then(res => {
          if (isSuccess(res, t)) {
            t.loading = false;
            t.data = res.data.content[0].rows;
            t.total = res.data.content[0].records;
          }
        })
        .catch(() => {
          t.loading = false;
          t.$Message.error(this.$t("reminder.errormessage"));
        }).finally(() => {
    	    t.searchLoading = false; //请求结束关闭loading
        });
    },
    closeImport() {
      const t = this;
      t.openImport = false;
    },
    importExcel() {
      const t = this;
      t.openImport = true;
      t.$refs.importExcel.getDowModelFile();
    },
    expData() {
      const t = this;
      const data = {
        bankCode: t.bankCode,
        bankCname: t.bankCname,
        bankSwiftcode: t.bankSwiftcode
      };
      this.$refs.expwindow.getData(
        this.expDataTital,
        "baseBankinfo.export",
        data
      );
      this.openExp = true;
    },
    closeExp() {
      const t = this;
      t.openExp = false;
    },
    closeExpDowMain() {
      const t = this;
      t.openExpDow = false;
    },
    setFileKey(filekey, filename, openExpDow) {
      const t = this;
      t.filekey = filekey;
      t.filename = filename;
      t.openExpDow = openExpDow;
      t.$refs.expdow.getPriToken(t.filekey);
    },
    search() {
      this.searchLoading = true;
      this.getData(1);
      this.tableselected = [];
    },
    addNewArray(res) {
      const t = this;
      t.data.unshift(res);
    },
    updateArray(res) {
      const t = this;
      t.data.splice(t.index, 1, res);
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
        this.$Message.warning(this.$t("reminder.leastone"));
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.confirmdelete"),
          onOk: () => {
            getDataLevelUserLogin({
              _mt: "baseBankinfo.delByIds",
              funId: "1",
              logType: this.$t("button.del"),
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.$Message.success(this.$t("reminder.deletesuccess"));
                  t.tableselected = [];
                  t.getData();
                }
              })
              .catch(() => {
                t.$Message.error(this.$t("reminder.errormessage"));
              });
          },
          onCancel: () => {}
        });
      }
    },
    open() {
      const t = this;
      t.opendialog = true;
    },
    openUp(id, logType, index) {
      const t = this;
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.openUpdate = true;
      t.index = index;
      //        t.$refs.update.getSelect()
      if (logType === this.$t("button.upd")) {
        t.$refs.update.getData(id);
      }
    },
    close() {
      const t = this;
      t.opendialog = false;
    },
    closeUp() {
      const t = this;
      t.openUpdate = false;
      t.$refs.update.formValidate.bankCode = "";
      t.$refs.update.formValidate.bankCityid = "";
      t.$refs.update.bankCityName = "";
      t.$refs.update.formValidate.bankCname = "";
      t.$refs.update.formValidate.bankEname = "";
      t.$refs.update.formValidate.bankCadd = "";
      t.$refs.update.formValidate.bankEadd = "";
      t.$refs.update.formValidate.bankSwiftcode = "";
      t.$refs.update.formValidate.comment = "";
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
</style>
