<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>
            &nbsp;{{$t('lang_sysform.sysForm.title')}}
          </p>
          <Row>
            <Input
              :placeholder="$t('lang_sysform.sysForm.sformName')"
              style="width: 200px"
              v-model="sformName"
							@on-enter="enterEvent"
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
              :data="$store.state.sysData.mainTable"
            ></Table>
          </row>
          <Row style="display: flex">
            <Page
              :total="total"
              size="small"
              show-elevator
              show-sizer
              :current="page"
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
      <update v-show="openUpdate" :logType="logType" @closeUp="closeUp" ref="update"></update>
    </transition>
  </div>
</template>
<script>
import update from "./updateAndAdd";
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
          title: this.$t("lang_sysform.sysForm.sformCode"),
          key: "sformCode",
          //          width: 80,
          sortable: "custom"
        },
        {
          title: this.$t("lang_sysform.sysForm.sformName"),
          key: "sformName",
          //          width: 150,
          sortable: "custom"
        },
        {
          title: this.$t("lang_sysform.sysForm.sformTbname"),
          key: "sformTbname",
          //          width: 150,
          sortable: "custom"
        },
        {
          title: this.$t("button.opr"),
          key: "action",
          fixed: "right",
          width: 64,
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
      total: 0,
      sort: "sformCode",
      order: "asc",
      rows: 10,
      page: 1,
      sformName: ""
    };
  },
  /*
   * 组件声明的地方，所有引入的组件要使用都需要在这里声明
   * */
  components: {
    update
  },
  /*
   * 生命周期mounted钩子，相当于$(function())
   * */
  mounted() {
    this.getData(1);
  },
  methods: {
		//enter事件
		enterEvent (e) {
		        this.getData(1)
		},
    /*
     * 初始获取表格数据
     * */
    getData(page) {
      const t = this;
      if (page) {
        t.page = page;
      }
      const data = {
        _mt: "platSysform.getPage",
        sort: t.sort,
        order: t.order,
        rows: t.rows,
        page: t.page,
        funId: "1",
        logType: "查询List",
        sformName: t.sformName,
        cptFiele: t.cptFiele
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
                "sysData/setMainTable",
                res.data.content[0].rows
              );
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
              _mt: "platSysform.delByIds",
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
      t.logType = logType;
      //      将本条数据的id传入mainid（如果有的话）
      this.$store.commit("sysData/setMainId", id);
      this.$store.commit("sysData/setIndex", index);
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
