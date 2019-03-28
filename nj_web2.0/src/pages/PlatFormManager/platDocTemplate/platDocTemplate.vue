<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>
            &nbsp;{{$t('lang_platdoc.platDoc.title')}}
          </p>
          <Row>
            <Input
              :placeholder="$t('lang_platdoc.platDoc.p_platDctpCode')"
              style="width: 200px"
              v-model="platDctpCode"
            />
            <Input
              :placeholder="$t('lang_platdoc.platDoc.p_platDctpName')"
              style="width: 200px"
              v-model="platDctpName"
            />
            <span style="margin: 0;">
              <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
            </span>
            <Button type="primary" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
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
              :data="$store.state.docTemp.mainTable"
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
              @click="getData(1)"
            ></Button>
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
      tableheight: document.body.offsetHeight - 280,
      value: "",
      logType: "",
      openUpdate: false,
      tableselected: [],
      columns: [
        {
          type: "selection",
          width: 54,
          align: "center"
        },
        {
          title: this.$t("lang_platdoc.platDoc.p_platDctpCode"),
          key: "platDctpCode",
          sortable: "custom"
        },
        {
          title: this.$t("lang_platdoc.platDoc.platDctpName"),
          key: "platDctpName",
          sortable: "custom"
        },
        {
          title: this.$t("lang_platdoc.platDoc.platDctpValidDis"),
          key: "platDctpValidDis"
        },
        {
          title: this.$t("button.opr"),
          key: "action",
          fixed: "right",
          width: 80,
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
                  style: {
                    marginRight: "3px"
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
      total: 0,
      sort: "platDctpCode",
      order: "asc",
      rows: 10,
      page: 1,
      platDctpCode: "",
      platDctpName: ""
    };
  },
  components: {
    update
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData(page) {
      const t = this;
      if (page) {
        t.page = page;
      }
      const data = {
        _mt: "platDocTemplate.getPage",
        sort: t.sort,
        order: t.order,
        rows: t.rows,
        page: t.page,
        funId: "1",
        logType: "查询List",
        platDctpCode: t.platDctpCode,
        platDctpName: t.platDctpName
      };
      /*
       * 删除data中为空的数据，不传到后台
       * */
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginNew(data)
        .then(res => {
          if (isSuccess(res, t)) {
            //          获取到表格数据存入vuex中
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit(
                "docTemp/setMainTable",
                res.data.content[0].rows
              );
            } else {
              this.$store.commit("docTemp/setMainTable", []);
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
      t.getData();
    },
    /*
     * 翻页方法
     * */
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getData();
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
            getDataLevelUserLogin({
              _mt: "platDocTemplate.delByIds",
              funId: "1",
              companyId: "1",
              logType: this.$t("button.del"),
              delIds: t.tableselected.toString()
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
    /*
     * 打开弹出页面的方法
     * */
    openUp(id, logType, index) {
      const t = this;
      t.openUpdate = true;
      //      将本条数据的id传入mainid（如果有的话）
      this.$store.commit("docTemp/setMainId", id);
      this.$store.commit("docTemp/setIndex", index);
      if (id) {
        t.$refs.update.getOptionData();
      }
    },
    /*
     * 关闭弹出页面的方法
     * */
    closeUp() {
      const t = this;
      t.openUpdate = false;
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
