<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content" style="max-height: 450px;overflow-y: auto;">
        <Form
          :model="form"
          ref="form"
          label-position="right"
          :rules="ruleValidate"
          :label-width="120"
        >
          <i-col span="11"></i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.paySalSetItem.payssiOrder')" prop="payssiOrder">
              <Input
                v-model="form.payssiOrder"
                :placeholder="$t('lang_payroll.paySalSetItem.payssiOrderDis')"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.paySalSetItem.payssiItemName')" prop="payssiItem">
              <!--<span @dblclick="clearCityid">-->
              <!-- @on-click="pickData" -->
              <Input
                v-model="payssiItemName"
                icon="search"
                :readonly="true"
                :placeholder="$t('lang_payroll.paySalSetItem.payssiItemNameDis')"
                disabled="disabled"
              />
              <!--</span>-->
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem
              :label="$t('lang_payroll.paySalSetItem.payssiItemtypeName')"
              prop="payssiItemtype"
            >
              <Select
                v-model="form.payssiItemtype"
                disabled
                :placeholder="$t('lang_payroll.paySalSetItem.payssiItemtypeNameDis')"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in selectItemType"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem
              :label="$t('lang_payroll.paySalSetItem.payssiDatasource')"
              prop="payssiDatasource"
            >
              <Select
                v-model="form.payssiDatasource"
                clearable
                :placeholder="$t('lang_payroll.paySalSetItem.payssiDatasourceDis')"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in TempSourceType"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23" v-if="form.payssiDatasource === '05formula'">
            <FormItem :label="$t('lang_payroll.paySalSetItem.payssiFormula')" prop="payssiFormula">
              <Input
                v-model="form.payssiFormula"
                type="textarea"
                disabled
                :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_payroll.paySalSetItem.payssiFormulaDis')"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="23" v-if="form.payssiDatasource === '05formula'">
            <FormItem
              :label="$t('lang_payroll.paySalSetItem.payssiFormulacomment')"
              prop="payssiFormulacomment"
            >
              <Input
                v-model="form.payssiFormulacomment"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_payroll.paySalSetItem.payssiFormulacommentDis')"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem
              :label="$t('lang_payroll.paySalSetItem.payssiCarrymode')"
              prop="payssiCarrymode"
            >
              <Select
                v-model="form.payssiCarrymode"
                clearable
                :placeholder="$t('lang_payroll.paySalSetItem.payssiCarrymodeDis')"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in DecimalRule"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem
              :label="$t('lang_payroll.paySalSetItem.payssiPaylistdis')"
              prop="payssiPaylistdis"
            >
              <RadioGroup
                v-model="form.payssiPaylistdis"
                :placeholder="$t('lang_payroll.paySalSetItem.payssiSelectDis')"
              >
                <Radio
                  :label="item.paramCode"
                  v-for="(item,index) in YesOrNoType"
                  :key="index"
                >{{item.paramInfoCn}}</Radio>
              </RadioGroup>
              <!--<Select v-model="form.payssiPaylistdis" clearable  :placeholder="$t('lang_payroll.paySalSetItem.payssiSelectDis')">-->
              <!--<Option :value="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Option>-->
              <!--</Select>-->
            </FormItem>
          </i-col>
          <i-col
            span="11"
            v-show="form.payssiItemtype === '01sysperiodic' || form.payssiItemtype === '03userperiodic'?true:false"
          >
            <FormItem
              :label="$t('lang_payroll.paySalSetItem.payssiObversion')"
              prop="payssiObversion"
            >
              <RadioGroup
                v-model="form.payssiObversion"
                :placeholder="$t('lang_payroll.paySalSetItem.payssiSelectDis')"
              >
                <Radio
                  :label="item.paramCode"
                  v-for="(item,index) in YesOrNoType"
                  :key="index"
                >{{item.paramInfoCn}}</Radio>
              </RadioGroup>
              <!--<Select v-model="form.payssiObversion" clearable :placeholder="$t('lang_payroll.paySalSetItem.payssiSelectDis')">-->
              <!--<Option :value="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Option>-->
              <!--</Select>-->
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.paySalSetItem.isValid')" prop="isValid">
              <RadioGroup
                v-model="form.isValid"
                :placeholder="$t('lang_payroll.paySalSetItem.payssiSelectDis')"
              >
                <Radio
                  :label="item.paramCode"
                  v-for="(item,index) in YesOrNoType"
                  :key="index"
                >{{item.paramInfoCn}}</Radio>
              </RadioGroup>
              <!--<Select clearable v-model="form.isValid" :placeholder="$t('lang_payroll.paySalSetItem.payssiSelectDis')">-->
              <!--<Option :value="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Option>-->
              <!--</Select>-->
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_payroll.paySalSetItem.payssiComment')" prop="payssiComment">
              <Input
                v-model="form.payssiComment"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_payroll.paySalSetItem.payssiCommentDis')"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem label prop="comment">
                <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </row>
          </i-col>
        </Form>
      </Row>
    </div>
    <transition name="fade">
      <searchProllItem
        v-show="openPick"
        :searchCloumns="searchCloumns"
        :params="params"
        @closeUp="close1"
        @changeinput="changeinput"
        ref="searchProllItem"
      ></searchProllItem>
    </transition>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import searchProllItem from "../../../components/searchTable/searchProllItem";

export default {
  data() {
    return {
      selectItemType: [],
      TempSourceType: [],
      SourceType: [],
      YesOrNoType: [],
      DecimalRule: [],
      payssiItemName: "",
      form: {},
      ruleValidate: {
        payssiOrder: [
          {
            required: true,
            message: this.$t("lang_payroll.paySalSetItem.payssiOrderDis"),
            trigger: "blur"
          }
        ],
        payssiItem: [
          {
            required: true,
            message: this.$t("lang_payroll.paySalSetItem.payssiItemNameDis"),
            trigger: "blur"
          }
        ],
        payssiItemtype: [
          {
            required: true,
            message: this.$t("lang_payroll.paySalSetItem.payssiItemtypeDis"),
            trigger: "blur"
          }
        ],
        payssiDatasource: [
          {
            required: true,
            message: this.$t("lang_payroll.paySalSetItem.payssiDatasourceDis"),
            trigger: "blur"
          }
        ]
        //          payssiCarrymode: [
        //            { required: true, message: this.$t('lang_payroll.paySalSetItem.payssiCarrymodeDis'), trigger: 'blur' },
        //          ],
      },
      rowId: "",
      openPick: false,
      params: {
        _mt: "paySalItem.getPage",
        sort: "id",
        order: "asc",
        rows: 10,
        page: 1,
        funId: "1",
        logType: this.$t("button.ser"),
        data: "{}"
      },
      searchCloumns: [
        {
          title: this.$t("lang_payroll.paySalItem.paysiCode"),
          key: "paysiCode",
          sortable: "paysiCode"
          //            width: 200,
        },
        {
          title: this.$t("lang_payroll.paySalItem.paysiCN"),
          key: "paysiCN"
          //            width: 200,
        },
        {
          title: this.$t("lang_payroll.paySalItem.paysiEN"),
          key: "paysiEN"
          //            width: 200,
        }
      ]
    };
  },
  components: {
    searchProllItem
  },
  props: {
    id: Number,
    logType: String,
    index: Number
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    setRowId(id) {
      const t = this;
      t.rowId = id;
      t.getdata(id);
    },
    getdata(rowId) {
      const t = this;
      const params = {
        _mt: "paySalSetItem.getById",
        id: rowId,
        logType: "查询List信息"
      };
      getDataLevelUserLogin(params)
        .then(res => {
          //if (isSuccess(res, t)) {
          res = {
            stat: {
              code: 0,
              stateList: [
                { msg: "SUCCESS", code: 0, length: 669, desc: "成功" }
              ],
              systime: 1561620362219,
              desc: "成功",
              cid: "a:18bb9c|t:153442|s:1561620362129"
            },
            content: [
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
                payssiDatasourceDis: "公式运算",
                payssiPaylistdisDis: "是",
                updateTime: "2019-05-05 09:48:52",
                payssiSsid: "1000",
                payssiFormula: "结果 =  [基本工资]",
                payssiPaylistdis: "1",
                payssiFormulajs: "res =  [SP01]",
                createBy: "1037",
                createTime: "2018-07-27 13:38:47"
              }
            ]
          };
          t.form = res.content[0];
          t.payssiItemName = res.content[0].payssiItemName;
          t.setDataSouType(res.content[0].payssiItemtype);
          t.form.isValid = "1";
          //}
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    setDataSouType(itemType) {
      const t = this;
      t.TempSourceType = [];
      switch (itemType) {
        case "00fixedproject":
          t.TempSourceType[0] = t.SourceType[0];
          break;
        case "01sysperiodic":
          t.TempSourceType[0] = t.SourceType[1];
          t.TempSourceType[1] = t.SourceType[2];
          t.TempSourceType[2] = t.SourceType[4];
          break;
        case "02sysaperiodic":
          t.TempSourceType[0] = t.SourceType[3];
          t.TempSourceType[1] = t.SourceType[4];
          break;
        case "03userperiodic":
          t.TempSourceType[0] = t.SourceType[1];
          t.TempSourceType[1] = t.SourceType[4];
          break;
        case "04useraperiodic":
          t.TempSourceType[0] = t.SourceType[3];
          t.TempSourceType[1] = t.SourceType[4];
          break;
        default:
          break;
      }
    },
    changeinput(name, id, row) {
      const t = this;
      t.payssiItemName = name;
      t.form.payssiItem = id;
      t.form.payssiItemtype = row.paysiDefaulttype;
      t.form.payssiDatasource = row.paysiDefaultdtsource;
      t.setDataSouType(t.form.payssiItemtype);
    },
    pickData() {
      const t = this;
      t.$refs.searchProllItem.getData(this.params);
      t.openPick = true;
    },
    close1() {
      const t = this;
      t.openPick = false;
      t.$refs.searchProllItem.paysiCode = "";
      t.$refs.searchProllItem.paysiDefaulttype = "";
    },
    clearCityid() {
      const t = this;
      t.payssiItemName = "";
      t.form.payssiItem = "";
    },
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: "payroll_itemtype,saldtsource,yesno,decimalRule"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.selectItemType = res.data.content[0].value[0].paramList;
            t.SourceType = res.data.content[0].value[1].paramList;
            t.TempSourceType = res.data.content[0].value[1].paramList;
            t.YesOrNoType = res.data.content[0].value[2].paramList;
            t.DecimalRule = res.data.content[0].value[3].paramList;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    save() {
      const t = this;
      const params = deepCopy(t.form);
      params._mt = "paySalSetItem.addOrUpd";
      params.logType = t.logType;
      params.payssiSsid = t.$store.state.paySalSet.childId1;
      if (t.logType === this.$t("button.upd")) {
        params.id = t.rowId;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(params)
            .then(res => {
              if (isSuccess(res, t)) {
                t.close();
                if (t.logType === this.$t("button.add")) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                  t.$refs.form.resetFields();
                  t.$emit("getData", res.data.content[0]);
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$emit("update", res.data.content[0]);
                }
              }
            })
            .catch(() => {
              t.$Modal.error({
                title: this.$t("reminder.err"),
                content: this.$t("reminder.errormessage")
              });
            });
        }
      });
    },
    clear() {
      const t = this;
      t.rowId = null;
      //        t.payssiItemName = ''
      t.form.isValid = "1";
      //        t.form = { }
      t.$refs.form.resetFields();
    },
    close() {
      this.$emit("hideMsg");
      this.clear();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
.option-main {
  position: relative;
  height: 500px;
  .btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
