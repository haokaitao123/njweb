<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>
            &nbsp;{{$t('lang_payroll.payMonPeriod.title1')}}
          </p>
          <Row>
            <span @dblclick="dbHCompany">
              <Input
                v-model="plsimnpCompanyDis"
                style="width: 130px"
                @on-enter="getData(1)"
                icon="search"
                :readonly="true"
                :placeholder="$t('lang_payroll.payMonPeriod.plsimnpCompanyDis')"
                @on-click="selectHCompany"
              />
            </span>
            <span @dblclick="clearFyperiod">
              <Input
                v-model="plsimnpPeriodDis"
                style="width: 130px"
                @on-enter="getData(1)"
                icon="search"
                :readonly="true"
                :placeholder="$t('lang_payroll.payMonPeriod.plsimnpPeriodDis')"
                @on-click="pickFyperiod"
              />
            </span>
            <Select
              v-model="plsimnpSalaryset"
              @on-change="getData(1)"
              style="width: 130px"
              :placeholder="$t('lang_payroll.payMonPeriod.plsimnpSalarysetDis')"
            >
              <Option :value="item.id" v-for="(item,index) in Salaryset" :key="index">{{item.payss}}</Option>
            </Select>
            <Dropdown>
              <Button type="primary">
                {{select}}
                <Icon type="arrow-down-b"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <span
                  v-for="(item,index) in Salhdstatus"
                  :key="index"
                  @click="selected(item.paramCode,item.paramInfoCn)"
                >
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
              </DropdownMenu>
            </Dropdown>
            <span style="margin: 0;">
              <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
            </span>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <Button
              type="primary"
              @click="expData"
            >{{$t('lang_payroll.payMonPeriod.plsimndownTemplate')}}</Button>
            <Button
              type="primary"
              @click="importItem"
            >{{$t('lang_payroll.payMonPeriod.plsimnuploadData')}}</Button>
            <Button type="primary" @click="handSubmit">{{$t('button.subm')}}</Button>
          </Row>

          <row class="table-form" ref="table-form">
            <Table
              @on-select="selectedtable"
              @on-select-cancel="selectedtable"
              @on-select-all="selectedtable"
              @on-sort-change="sortable"
              :height="tableheight"
              size="small"
              border
              ref="selection"
              :columns="columns01.length === 0 ? columns:columns01"
              :data="data"
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
      <update
        v-show="openUpdate"
        :id="updateId"
        :logType="logType"
        :ItemArray="ItemArray"
        :Salaryset="Salaryset"
        :index="index"
        @closeUp="closeUp"
        @getData="getData"
        ref="update"
      ></update>
    </transition>
    <transition name="fade">
      <searchHCompany
        v-show="openHCompany"
        @closeHCompany="closeHCompany"
        :searchHCClo="searchHCClo"
        @inputHCompany="inputHCompany"
        :params="paramsHCompany"
        ref="searchHCompany"
      ></searchHCompany>
    </transition>
    <transition name="fade">
      <searchFyperiod
        v-show="openFyperiod"
        @closeUp="closeFyperiod"
        @changeinput="inputFyperiod"
        ref="searchFyperiod"
      ></searchFyperiod>
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
      <importItem
        v-show="openImport"
        :impid="updateId"
        :itemData="itemData"
        :imp_mt="imp_mt"
        @closeImport="closeImport"
        ref="importItem"
      ></importItem>
    </transition>
  </div>
</template>
<script>
import update from "./payMonPeriodEdit";
import searchHCompany from "../../../../components/searchTable/searchHCompany";
import searchFyperiod from "../../../../components/searchTable/searchFyperiod";
import expwindow from "../../../../components/fileOperations/expSms";
import expdow from "../../../../components/fileOperations/expdow";
import importItem from "../../../../components/importModel/importSalaryItem";
import { deepCopy, isSuccess } from "../../../../lib/util";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../../axios/axios";

export default {
  data() {
    return {
      imp_mt: "paySalitemMonthnoperiod.importData",
      openExp: false,
      openExpDow: false,
      openImport: false,
      openHCompany: false,
      filekey: "",
      filename: "",
      expDisFields: [
        "plsimnpCompany,公司",
        "plsimnpDept,部门",
        "plsimnpEmpworkno,员工工号",
        "plsimnpCname,中文名",
        "plsimnpEmpgid,唯一标识号"
      ],
      openFyperiod: false,
      Salaryset: [],
      Salhdstatus: [],
      select: this.$t("status.draft"),
      tableheight: document.body.offsetHeight - 280,
      value: "",
      logType: "",
      openUpdate: false,
      updateId: NaN,
      tableselected: [],
      // 动态显示列表字段，临时数组
      ItemArray: {},
      columns01: [],
      columns: [
        {
          type: "selection",
          width: 54,
          align: "center",
          fixed: "left"
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpEmpworkno"),
          key: "plsimnpEmpworkno",
          width: 140,
          sortable: "custom"
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpCname"),
          width: 140,
          key: "plsimnpCname"
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpCompany"),
          width: 140,
          key: "plsimnpCompanyDis"
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpmnpDept"),
          width: 140,
          key: "plsimnpDeptDis"
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpPeriod"),
          width: 140,
          key: "plsimnpPeriodDis"
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpSalaryset"),
          width: 140,
          key: "plsimnpSalarysetDis"
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpSalarycurrency"),
          width: 140,
          key: "plsimnpSalarycurrencyDis"
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpSalaryItem"),
          width: 140
        },
        {
          title: this.$t("lang_payroll.payMonPeriod.plsimnpStatus"),
          width: 100,
          align: "center",
          fixed: "right",
          key: "plsimnpStatusDis"
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

    //   data: [
    //     {
    //       plsimnpCname: "王茹雪",
    //       plsimnpEmpgid: "QW09S032",
    //       plsimnpSalaryset: "1002",
    //       plsimnpDeptDis: "日产总经办",
    //       id: "1174",
    //       plsimnpPeriodDis: "201806",
    //       plsimnpSalarycurrencyDis: "人民币",
    //       plsimnpEmpworkno: "82001033",
    //       plsimnpStatus: "10confirm",
    //       plsimnpIsconfirm: "0",
    //       plsimnpDept: "1091",
    //       updateTime: "2018-11-29 16:41:59",
    //       createTime: "2018-10-25 13:58:14",
    //       plsimnpPeriod: "1023",
    //       plsimnpConfirmrecord:
    //         "确认人: 熊磊\n确认时间: 2018-11-29 16:41:43\n当前状态: 编辑中\n未确认原因: 测试未确认\n--------------------------------------------------",
    //       plsimnpConfirmtime: "2018-11-29 16:41:43",
    //       plsimnpSalarycurrency: "1000",
    //       plsimnpSn12: "其他奖励,0",
    //       plsimnpStatusDis: "待确认",
    //       plsimnpSn14: "税后调整1,0",
    //       plsimnpSn13: "其他扣款,0",
    //       plsimnpIsconfirmDis: "否",
    //       plsimnpSn15: "税后调整2,0",
    //       plsimnpApplicant: "1037",
    //       deleteFlag: "0",
    //       plsimnpSn09: "月度奖金,500",
    //       plsimnpSn08: "其他补助,150",
    //       plsimnpCompany: "1089",
    //       plsimnpSalarysetDis: "东风账套F1",
    //       plsimnpSn01: "目标奖金,2600",
    //       plsimnpSn02: "每月补助,500",
    //       companyId: "1000",
    //       plsimnpApplicantDis: "熊磊",
    //       plsimnpConfirmerDis: "熊磊",
    //       plsimnpApplytime: "2018-11-29 16:41:59",
    //       plsimnpNocmreason: "",
    //       updateBy: "1037",
    //       plsimnpCompanyDis: "东风日产乘用车公司",
    //       plsimnpConfirmer: "1037",
    //       createBy: "1006"
    //     }
    //   ],

      itemData: {},
       data: [],
      //      雇佣公司
      searchHCClo: [
        {
          title: this.$t("lang_employee.searchColumn.unitCodeCompany"),
          key: "unitCode",
          sortable: "custom"
        },
        {
          title: this.$t("lang_employee.searchColumn.compCnFullName"),
          key: "unitFname"
        }
      ],
      paramsHCompany: {
        _mt: "orgUnits.getByOrgFramePageList",
        rows: 10,
        page: 1,
        sort: "id",
        order: "desc",
        unitType: "01company",
        logType: "雇佣公司"
      },
      total: 0,
      index: 0,
      sort: "id",
      order: "desc",
      rows: 10,
      page: 1,
      funId: "1000",
      isInit: 0,
      plsimnpCompany: "",
      plsimnpCompanyDis: "",
      plsimnpPeriod: "",
      plsimnpPeriodDis: "",
      plsimnpSalaryset: "1000",
      plsimnpStatus: "01draft"
    };
  },
  computed: {},
  components: {
    update,
    searchHCompany,
    searchFyperiod,
    expwindow,
    expdow,
    importItem
  },
  mounted() {
    this.getSelect();
    this.getSelectSalSet();
    this.getData(1);
  },
  methods: {
    getData(page) {
      const t = this;
      if (page) {
        t.page = page;
      }
      const data = {
        _mt: "paySalitemMonthnoperiod.getPage",
        rows: t.rows,
        page: t.page,
        sort: t.sort,
        order: t.order,
        logType: this.$t("button.ser"),
        plsimnpCompany: t.plsimnpCompany,
        plsimnpPeriod: t.plsimnpPeriod,
        plsimnpSalaryset: t.plsimnpSalaryset,
        plsimnpStatus: t.plsimnpStatus
      };
      for (const dat in data) {
        if (data[dat] === undefined || data[dat] === "") {
          delete data[dat];
        }
      }
      if (data.plsimnpSalaryset === undefined || data.plsimnpSalaryset === "") {
        t.$Modal.warning({
          title: this.$t("reminder.err"),
          content: this.$t("lang_payroll.payMonPeriod.plsimnpReminder")
        });
      } else {
        getDataLevelUserLoginNew(data)
          .then(res => {
              
            res = {
              stat: {
                code: 0,
                stateList: [
                  { msg: "SUCCESS", code: 0, length: 2720, desc: "成功" }
                ],
                systime: 1561617864131,
                desc: "成功",
                cid: "a:18bb9c|t:153241|s:1561617863983"
              },
              content: [
                {
                  total: 1,
                  records: 3,
                  page: 1,
                  rows: [
                    {
                      plsimnpCname: "王弘文",
                      plsimnpEmpgid: "QW09S012",
                      plsimnpSalaryset: "1002",
                      plsimnpDeptDis: "襄阳质检部",
                      id: "1169",
                      plsimnpPeriodDis: "201806",
                      plsimnpSalarycurrencyDis: "人民币",
                      plsimnpEmpworkno: "82001022",
                      plsimnpStatus: "01draft",
                      plsimnpIsconfirm: "0",
                      plsimnpDept: "1104",
                      updateTime: "2019-01-11 10:07:34",
                      createTime: "2018-10-25 13:58:04",
                      plsimnpPeriod: "1023",
                      plsimnpSalarycurrency: "1000",
                      plsimnpSn12: "其他奖励,0",
                      plsimnpStatusDis: "编辑中",
                      plsimnpSn14: "税后调整1,0",
                      plsimnpSn13: "其他扣款,0",
                      plsimnpIsconfirmDis: "否",
                      plsimnpSn15: "税后调整2,0",
                      deleteFlag: "0",
                      plsimnpSn09: "月度奖金,800",
                      plsimnpSn08: "其他补助,600",
                      plsimnpCompany: "1099",
                      plsimnpSalarysetDis: "东风账套F1",
                      plsimnpSn01: "目标奖金,1500",
                      plsimnpSn02: "每月补助,300",
                      companyId: "1000",
                      updateBy: "1037",
                      plsimnpCompanyDis: "风神襄阳汽车有限公司",
                      createBy: "1006"
                    }
                  ]
                }
              ]
            };
          //  debugger;
//Console.log("adafsf",res)
          //  if (isSuccess(res, t)) {
              t.ItemArray = {}; //新增，修改页面显示值
              t.columns01 = []; // 动态显示列表中的值
              for (let i = 0; i < t.columns.length; i++) {
                if (i !== t.columns.length - 3) {
                  // 项目... 不添加进去
                  t.columns01.push(t.columns[i]);
                }
              }
              t.data = res.content[0].rows;
              if (t.data.length > 0) {
                let obj = Object.keys(t.data[0]); // 得到对象的key 转换为数组
                obj.sort(); // 按照字母表的顺序对属性进行排序
                for (let i = 0; i < obj.length; i++) {
                  if (
                    obj[i].indexOf("plsimnpSn") !== -1 ||
                    obj[i].indexOf("plsimnpUn") !== -1
                  ) {
                    let tempColumn = {
                      title: t.data[0][obj[i]].split(",")[0],
                      width: 150,
                      key: obj[i]
                    };
                    // 拆分表头和表尾部
                    t.columns01.splice(t.columns01.length - 2, 0, tempColumn);
                    for (let j = 0; j < t.data.length; j++) {
                      t.data[j][obj[i]] = t.data[j][obj[i]].split(",")[1];
                      if (t.ItemArray[t.data[j]["id"]] === undefined) {
                        t.ItemArray[t.data[j]["id"]] = []; // 创建皴法该内容的数组
                      }
                      let object = {};
                      object.label = tempColumn.title; // label标签
                      object.value = t.data[j][obj[i]]; // 值
                      t.ItemArray[t.data[j]["id"]].push(object);
                    }
                  }
                }
              }
              t.total = res.content[0].records;
            //}
          })
          .catch(() => {
            t.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage")
            });
          });
      }
    },
    // 提交
    handSubmit() {
      const t = this;
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone")
        });
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.confirmSubmit"),
          onOk: () => {
            t.submit();
          },
          onCancel: () => {}
        });
      }
    },
    submit() {
      const t = this;
      const data = {
        _mt: "paySalitemMonthnoperiod.updStatusByIds",
        funId: "1",
        logType: "提交月度非周期性薪资数据",
        id: t.tableselected.toString(),
        plsimnpStatus: "10confirm"
      };
      getDataLevelUserLoginNew(data)
        .then(res => {
          t.tableselected = [];
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t("reminder.suc"),
              content: this.$t("reminder.submitsuccess")
            });
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
    expData() {
      const t = this;
      // 导出必须选择期间
      if (t.plsimnpSalaryset === undefined || t.plsimnpSalaryset === "") {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("lang_payroll.payMonPeriod.plsimnpSalarysetDis")
        });
      } else {
        const data = {
          //            plsimnpCompany: this.plsimnpCompany,
          //            plsimnpPeriod: this.plsimnpPeriod,
          plsimnpSalaryset: this.plsimnpSalaryset
        };
        this.$refs.expwindow.handleSubmit1(
          this.expDisFields,
          "paySalitemMonthnoperiod.export",
          data
        );
      }
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
    // 导入数据
    closeImport() {
      const t = this;
      t.openImport = false;
      t.getData();
    },
    importItem() {
      const t = this;
      if (
        t.plsimnpPeriod === "" ||
        t.plsimnpSalaryset === undefined ||
        t.plsimnpSalaryset === ""
      ) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("lang_payroll.payMonPeriod.plsimnpReminder3")
        });
      } else {
        //          t.itemData.plsimnpCompany = this.plsimnpCompany
        t.itemData.plsimnpPeriod = this.plsimnpPeriod;
        t.itemData.plsimnpSalaryset = this.plsimnpSalaryset;
        t.openImport = true;
      }
    },
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: "salhdstatus"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.Salhdstatus = res.data.content[0].value[0].paramList.slice(0, 3);
            t.Salhdstatus[2].paramInfoName = "待更新";
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    getSelectSalSet() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "paySalSet.getSelectValue",
        data: "{}",
        logType: this.$t("button.ser")
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.Salaryset = res.data.content[0].value;
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: t.$t("reminder.err"),
            content: t.$t("reminder.errormessage")
          });
        });
    },
    selected(key, name) {
      this.select = name;
      this.plsimnpStatus = key;
      this.getData();
    },
    //  	雇佣公司
    selectHCompany() {
      const t = this;
      t.$refs.searchHCompany.getData(this.paramsHCompany);
      t.openHCompany = true;
    },
    closeHCompany() {
      const t = this;
      t.$refs.searchHCompany.unitCode = "";
      t.openHCompany = false;
    },
    inputHCompany(name, id) {
      const t = this;
      t.plsimnpCompanyDis = name;
      t.plsimnpCompany = id;
    },
    dbHCompany() {
      const t = this;
      t.plsimnpCompanyDis = "";
      t.plsimnpCompany = "";
    },
    // 选择期间
    pickFyperiod() {
      const t = this;
      t.$refs.searchFyperiod.getData();
      t.openFyperiod = true;
    },
    inputFyperiod(row) {
      const t = this;
      t.plsimnpPeriodDis = row.fypdPeriod;
      t.plsimnpPeriod = row.id;
    },
    clearFyperiod() {
      const t = this;
      t.plsimnpPeriodDis = "";
      t.plsimnpPeriod = "";
    },
    closeFyperiod() {
      const t = this;
      t.openFyperiod = false;
      t.$refs.searchFyperiod.fypdYear = "";
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
      t.getData();
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
              _mt: "paySalitemMonthnoperiod.delByIds",
              funId: "1",
              logType: this.$t("button.del"),
              delIds: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
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
      t.$refs.update.form = {};
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
