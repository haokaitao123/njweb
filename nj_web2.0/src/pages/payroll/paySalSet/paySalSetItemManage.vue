<template>
  <div class="content-main">
    <!--<Button type="primary" @click="showMsgBtn(NaN,$t('button.add'))">{{$t('button.add')}}</Button>-->
    <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
    <RadioGroup v-model="showType" @on-change="radioChange">
      <Radio label="Enabled">{{$t('button.enabled')}}</Radio>
      <Radio label="NotEnabled">{{$t('button.unenabled')}}</Radio>
      <Radio label="All">{{$t('button.all')}}</Radio>
    </RadioGroup>
    <Button type="primary" @click="opendistCoun()">{{$t('button.adjOrd')}}</Button>
    <row class="table-form" ref="table-form">
      <Table
        class="fff"
        id="tab01"
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
        :current="params.page"
        show-elevator
        show-sizer
        placement="top"
        @on-page-size-change="sizeChange"
        @on-change="pageChange"
        :page-size="params.rows"
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
    <contentMsg
      v-show="showMsg"
      :logType="logType"
      @hideMsg="hideMsg"
      :id="id"
      :idname="idname"
      ref="contentMsg"
      @getData="addNewArray"
      @update="updateArray"
    ></contentMsg>
    <formula v-show="showMsg1" @hideMsg="hideMsg" :id="id" ref="formula"></formula>
    <transition name="fade">
      <distCountry
        v-show="opendistCountry"
        :id="updateId"
        @getdata="getdata"
        @closedistCountry="closedistCountry"
        ref="distCountry"
      ></distCountry>
    </transition>
  </div>
</template>
<script>
import distCountry from "./distCountry";
import contentMsg from "./paySalSetItemView";
import formula from "./formulaView";
import {
  getDataLevelUserLogin,
  getDataLevelUserLoginNew
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
  data() {
    return {
      opendistCountry: false,
      selectPcyinsIns: [],
      select: "全部",
      total: NaN,
      updateId: "",
      logType: "",
      showMsg: false,
      showMsg1: false,
      sihfpcyinsIns: "",
      showType: "Enabled",
      columns: [
        {
          type: "selection",
          width: 54,
          align: "center"
        },
        {
          title: this.$t("lang_payroll.paySalSetItem.payssiItemName"),
          key: "payssiItemName"
        },
        {
          title: this.$t("lang_payroll.paySalSetItem.payssiItemtypeName"),
          key: "payssiItemtypeName"
        },
        {
          title: this.$t("lang_payroll.paySalSetItem.payssiDatasource"),
          key: "payssiDatasourceDis"
        },
        {
          title: this.$t("button.opr"),
          key: "action",
          width: 150,
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
                  style: {
                    marginRight: "5px",
                    display: this.showType != "Enabled" ? "none" : "inline"
                  },
                  on: {
                    click: () => {
                      this.showMsgBtn(
                        params.row.id,
                        this.$t("button.upd"),
                        params.index
                      );
                    }
                  }
                },
                this.$t("button.upd")
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    display:
                      this.showType != "Enabled" ||
                      params.row.payssiDatasource != "05formula"
                        ? "none"
                        : "inline"
                  },
                  on: {
                    click: () => {
                      this.showformual(params.row.id);
                    }
                  }
                },
                this.$t("lang_payroll.paySalSetItem.payssiFormula")
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    //                    align: center,
                    display: this.showType != "NotEnabled" ? "none" : "inline"
                  },
                  on: {
                    click: () => {
                      this.enabled(
                        params.row.id,
                        this.$store.state.paySalSet.childId1
                      );
                    }
                  }
                },
                this.$t("button.enabled")
              )
            ]);
          }
        }
      ],
      butt: {
        title: this.$t("button.opr"),
        key: "action",
        width: 150,
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
                style: {
                  marginRight: "5px",
                  display: this.showType != "Enabled" ? "none" : "inline"
                },
                on: {
                  click: () => {
                    this.showMsgBtn(
                      params.row.id,
                      this.$t("button.upd"),
                      params.index
                    );
                  }
                }
              },
              this.$t("button.upd")
            ),
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  display:
                    this.showType != "Enabled" ||
                    params.row.payssiDatasource != "05formula"
                      ? "none"
                      : "inline"
                },
                on: {
                  click: () => {
                    this.showformual(params.row.id);
                  }
                }
              },
              this.$t("lang_payroll.paySalSetItem.payssiFormula")
            ),
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  //                    align: center,
                  display: this.showType != "NotEnabled" ? "none" : "inline"
                },
                on: {
                  click: () => {
                    this.enabled(
                      params.row.id,
                      this.$store.state.paySalSet.childId1
                    );
                  }
                }
              },
              this.$t("button.enabled")
            )
          ]);
        }
      },
      data: [],
      params: {
        _mt: "paySalSetItem.getPage",
        funId: "1",
        rows: 20,
        page: 1,
        sort: "payssiOrder",
        order: "asc",
        sihfpcyinsIns: "",
        payssiSsid: this.$store.state.paySalSet.childId1,
        logType: ""
      },
      index: "",
      tableselected: ""
    };
  },
  props: {
    id: Number,
    idname: String
  },
  components: {
    contentMsg,
    formula,
    distCountry
  },
  mounted() {},
  methods: {
    radioChange(value) {
      const t = this;
      if (value === "All") {
        this.columns.pop();
      } else if (this.columns.length <= 4) {
        this.columns.push(this.butt);
      }
      t.params.showType = value;
      t.params.rows = 10;
      t.params.page = 1;
      t.getdata();
    },
    getdata() {
      const t = this;
      t.params.logType = "查询List信息";
      t.params.payssiSsid = t.$store.state.paySalSet.childId1;
      t.params.showType = t.showType;
      const data = deepCopy(t.params);
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginNew(data)
        .then(res => {
          //if (isSuccess(res, t)) {
          res = {
            stat: {
              code: 0,
              stateList: [
                { msg: "SUCCESS", code: 0, length: 6468, desc: "成功" }
              ],
              systime: 1561620328602,
              desc: "成功",
              cid: "a:18bb9c|t:153470|s:1561620328430"
            },
            content: [
              {
                total: 6,
                records: 59,
                page: 1,
                rows: [
                  {
                    payssiDatasource: "01system",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "43",
                    payssiItemtype: "00fixedproject",
                    payssiItemName: "成本中心",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "FX08",
                    updateBy: "1009",
                    payssiCarrymode: "03sswrtofen",
                    id: "46",
                    payssiItemtypeName: "固定项目",
                    payssiObversion: "1",
                    payssiOrder: "1000",
                    isValid: "1",
                    payssiDatasourceDis: "系统默认",
                    payssiPaylistdisDis: "是",
                    updateTime: "2018-07-27 16:41:24",
                    payssiSsid: "1000",
                    payssiFormula:
                      "如果  [员工类型]  等于  [固定项目24] \n          结果  等于  [最后雇佣日期] \n 否则如果   [成本中心]   等于 '第二成本中心'\n          结果  等于  [试用截止日期]",
                    payssiPaylistdis: "1",
                    payssiFormulajs:
                      "if  [FX03]  ==  [FX24]            res  ==  [FX06]   else if   [FX08]   == '第二成本中心'           res  ==  [FX05]",
                    createBy: "1037",
                    createTime: "2018-07-25 13:36:33"
                  },
                  {
                    payssiDatasource: "01system",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "45",
                    payssiItemtype: "00fixedproject",
                    payssiItemName: "薪资级别",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "FX10",
                    updateBy: "1037",
                    payssiCarrymode: "03sswrtofen",
                    id: "45",
                    payssiItemtypeName: "固定项目",
                    payssiObversion: "1",
                    payssiOrder: "1001",
                    isValid: "1",
                    payssiDatasourceDis: "系统默认",
                    payssiPaylistdisDis: "是",
                    updateTime: "2018-07-27 13:37:37",
                    payssiSsid: "1000",
                    payssiFormula: "",
                    payssiPaylistdis: "1",
                    createBy: "1037",
                    createTime: "2018-07-25 13:36:24"
                  },
                  {
                    payssiDatasource: "01system",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "39",
                    payssiItemtype: "00fixedproject",
                    payssiItemName: "入职日期",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "FX04",
                    updateBy: "1037",
                    payssiCarrymode: "03sswrtofen",
                    id: "47",
                    payssiItemtypeName: "固定项目",
                    payssiObversion: "1",
                    payssiOrder: "1002",
                    isValid: "1",
                    payssiDatasourceDis: "系统默认",
                    payssiPaylistdisDis: "是",
                    updateTime: "2018-07-30 13:24:00",
                    payssiSsid: "1000",
                    payssiFormula: "结果 = 6000",
                    payssiPaylistdis: "1",
                    createBy: "1037",
                    createTime: "2018-07-25 13:36:41"
                  },
                  {
                    payssiDatasource: "01system",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "47",
                    payssiItemtype: "00fixedproject",
                    payssiItemName: "差旅级别",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "FX11",
                    updateBy: "1037",
                    payssiCarrymode: "03sswrtofen",
                    id: "57",
                    payssiItemtypeName: "固定项目",
                    payssiObversion: "1",
                    payssiOrder: "1003",
                    isValid: "1",
                    payssiDatasourceDis: "系统默认",
                    payssiPaylistdisDis: "是",
                    updateTime: "2018-11-20 15:09:06",
                    payssiSsid: "1000",
                    payssiFormula: "",
                    payssiPaylistdis: "1",
                    createBy: "1037",
                    createTime: "2018-07-27 13:36:56"
                  },
                  {
                    payssiDatasource: "02empperiod",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "73",
                    payssiItemtype: "01sysperiodic",
                    payssiItemName: "基本工资",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "SP01",
                    payssiCarrymode: "03sswrtofen",
                    id: "58",
                    payssiItemtypeName: "系统周期性项目",
                    payssiObversion: "1",
                    payssiOrder: "1004",
                    isValid: "1",
                    payssiDatasourceDis: "员工周期性数据",
                    payssiPaylistdisDis: "是",
                    payssiSsid: "1000",
                    payssiFormula: "",
                    payssiPaylistdis: "1",
                    createBy: "1037",
                    createTime: "2018-07-27 13:38:23"
                  },
                  {
                    payssiDatasource: "05formula",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "75",
                    payssiItemtype: "01sysperiodic",
                    payssiItemName: "应发工资",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "SP02",
                    updateBy: "1037",
                    payssiCarrymode: "03sswrtofen",
                    id: "59",
                    payssiItemtypeName: "系统周期性项目",
                    payssiObversion: "1",
                    payssiOrder: "1005",
                    isValid: "1",
                    payssiDatasourceDis: "公式运算",
                    payssiPaylistdisDis: "是",
                    updateTime: "2019-05-05 09:48:52",
                    payssiSsid: "1000",
                    payssiFormula: "结果 =  [基本工资]",
                    payssiPaylistdis: "1",
                    payssiFormulajs: "res =  [SP01]",
                    createBy: "1037",
                    createTime: "2018-07-27 13:38:47"
                  },
                  {
                    payssiDatasource: "03autocalc",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "76",
                    payssiItemtype: "01sysperiodic",
                    payssiItemName: "税前工资",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "SP03",
                    payssiCarrymode: "03sswrtofen",
                    id: "60",
                    payssiItemtypeName: "系统周期性项目",
                    payssiObversion: "1",
                    payssiOrder: "1006",
                    isValid: "1",
                    payssiDatasourceDis: "系统自动计算",
                    payssiPaylistdisDis: "是",
                    payssiSsid: "1000",
                    payssiFormula: "",
                    payssiPaylistdis: "1",
                    createBy: "1037",
                    createTime: "2018-07-27 13:39:06"
                  },
                  {
                    payssiDatasource: "03autocalc",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "77",
                    payssiItemtype: "01sysperiodic",
                    payssiItemName: "免税额",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "SP04",
                    payssiCarrymode: "03sswrtofen",
                    id: "61",
                    payssiItemtypeName: "系统周期性项目",
                    payssiObversion: "1",
                    payssiOrder: "1007",
                    isValid: "1",
                    payssiDatasourceDis: "系统自动计算",
                    payssiPaylistdisDis: "是",
                    payssiSsid: "1000",
                    payssiFormula: "",
                    payssiPaylistdis: "1",
                    createBy: "1037",
                    createTime: "2018-07-27 13:39:23"
                  },
                  {
                    payssiDatasource: "04empnoperiod",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "125",
                    payssiItemtype: "02sysaperiodic",
                    payssiItemName: "每月补助",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "SN02",
                    payssiCarrymode: "03sswrtofen",
                    id: "64",
                    payssiItemtypeName: "系统非周期性项目",
                    payssiObversion: "1",
                    payssiOrder: "1008",
                    isValid: "1",
                    payssiDatasourceDis: "月度非周期数据",
                    payssiPaylistdisDis: "是",
                    payssiSsid: "1000",
                    payssiFormula: "",
                    payssiPaylistdis: "1",
                    createBy: "1037",
                    createTime: "2018-07-27 13:40:36"
                  },
                  {
                    payssiDatasource: "03autocalc",
                    payssiCarrymodeDis: "四舍五入到分",
                    payssiItem: "78",
                    payssiItemtype: "01sysperiodic",
                    payssiItemName: "计税工资",
                    lcoalCurrency: "1000",
                    deleteFlag: "0",
                    payssiObversionDis: "是",
                    payssiItemCode: "SP05",
                    payssiCarrymode: "03sswrtofen",
                    id: "62",
                    payssiItemtypeName: "系统周期性项目",
                    payssiObversion: "1",
                    payssiOrder: "1009",
                    isValid: "1",
                    payssiDatasourceDis: "系»èªå¨è®¡ç®",
                    payssiPaylistdisDis: "æ¯",
                    payssiSsid: "1000",
                    payssiFormula: "",
                    payssiPaylistdis: "1",
                    createBy: "1037",
                    createTime: "2018-07-27 13:39:41"
                  }
                ]
              }
            ]
          };

          t.total = res.content[0].records;
          t.data = res.content[0].rows;
          //}
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    getSelect() {},
    selected(key, name) {
      this.select = name;
      this.params.sihfpcyinsIns = key;
      this.getdata();
    },
    pageChange(page) {
      const t = this;
      t.params.page = page;
      t.getdata();
    },
    sortable(column) {
      this.params.sort = column.key;
      this.params.order = column.order;
      if (this.params.order !== "normal") {
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
      this.tableselected = newArr.toString();
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
              _mt: "paySalSetItem.delByIds",
              funId: "1",
              companyId: "1000",
              logType: this.$t("button.del"),
              delIds: t.tableselected
            })
              .then(res => {
                if (isSuccess(res, t)) {
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
    sizeChange(size) {
      const t = this;
      t.params.rows = size;
      t.getdata();
    },
    showMsgBtn(id, logType, index) {
      const t = this;
      t.showMsg = true;
      t.index = index;
      t.logType = logType;
      if (logType === this.$t("button.upd")) {
        t.$refs.contentMsg.setRowId(id);
      }
    },
    showformual(id) {
      const t = this;
      t.showMsg1 = true;
      t.$refs.formula.getData(id);
      // t.$refs.contentMsg.setRowId(id)
    },
    addNewArray(res) {
      const t = this;
      if (t.data.length === 0) {
        t.data.push(res);
      } else {
        t.data.unshift(res);
      }
    },
    updateArray(res) {
      const t = this;
      t.getdata();
    },
    hideMsg() {
      this.showMsg = false;
      this.showMsg1 = false;
    },
    enabled(id, ssid) {
      const t = this;
      const params = {};
      params._mt = "paySalSetItem.addOrUpd";
      params.logType = "启用";
      params.id = id;
      params.showType = "启用";
      params.payssiSsid = ssid;
      params.isValid = "1";
      getDataLevelUserLoginNew(params)
        .then(res => {
          if (isSuccess(res, t)) {
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
    opendistCoun() {
      const t = this;
      t.updateId = 1000;
      t.opendistCountry = true;
      t.$refs.distCountry.getClumns1(this.$store.state.paySalSet.childId1);
      //        t.$refs.distCountry.getOptional(1000)
    },
    closedistCountry() {
      const t = this;
      t.opendistCountry = false;
      //  t.$refs.distCountry.formValidate = {}
    },
    closedistCity() {
      const t = this;
      t.opendistCity = false;
      t.getdata();
      //  t.$refs.distCountry.formValidate = {}
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
