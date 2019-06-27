<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 11px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
          <Form :model="form" label-position="right" ref="form" :label-width="155">
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpCompany')">
                <Input
                  v-model="form.plsimnpCompanyDis"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpCompanyDis')"
                />
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem
                :label="$t('lang_payroll.payMonPeriod.plsimnpmnpDept')"
                prop="plsimnpmnpDept"
              >
                <Input
                  v-model="form.plsimnpDeptDis"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpmnpDeptDis')"
                ></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpEmpgid')">
                <Input
                  v-model="form.plsimnpEmpgid"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpEmpgid')"
                ></Input>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpEmpworkno')">
                <Input
                  v-model="form.plsimnpEmpworkno"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpEmpworknoDis')"
                ></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpCname')">
                <Input
                  v-model="form.plsimnpCname"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpCnameDis')"
                ></Input>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpPeriod')" prop="plsimnpPeriod">
                <Input
                  v-model="form.plsimnpPeriodDis"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpPeriodDis')"
                />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem
                :label="$t('lang_payroll.payMonPeriod.plsimnpSalaryset')"
                prop="plsimnpSalaryset"
              >
                <Select
                  v-model="form.plsimnpSalaryset"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpSalarysetDis')"
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in Salaryset"
                    :key="index"
                  >{{item.payss}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem
                :label="$t('lang_payroll.payMonPeriod.plsimnpSalarycurrency')"
                prop="plsimnpSalarycurrency"
              >
                <Select
                  v-model="form.plsimnpSalarycurrency"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpSalarycurrencyDis')"
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in Salarycurrency"
                    :key="index"
                  >{{item.currCurrency}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col
              span="11"
              v-for="(item,index) in ItemArray[key]"
              :key="index"
              :offset="index % 2 === 1 ? 1:0"
            >
              <FormItem :label="item.label">
                <Input
                  v-model="item.value"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpSalaryItem')"
                ></Input>
              </FormItem>
            </i-col>
            <i-col span="23"></i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpStatus')" prop="plsimnpStatus">
                <Input
                  v-model="form.plsimnpStatusDis"
                  disabled
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpStatusDis')"
                ></Input>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem
                :label="$t('lang_payroll.payMonPeriod.plsimnpConfirmrecord')"
                prop="plsimnpConfirmrecord"
              >
                <Input
                  v-model="form.plsimnpConfirmrecord"
                  disabled
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpConfirmrecordDis')"
                ></Input>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem
                :label="$t('lang_payroll.payMonPeriod.plsimnpComment')"
                prop="plsimnpComment"
              >
                <Input
                  v-model="form.plsimnpComment"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpCommentDis')"
                ></Input>
              </FormItem>
            </i-col>
          </Form>
        </Row>
        <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginSenior,
  getDataLevelUserLogin
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";

export default {
  data() {
    return {
      Salarycurrency: [],
      openCompany: false,
      form: {},
      key: ""
    };
  },
  props: {
    id: Number,
    logType: String,
    index: Number,
    Salaryset: Array,
    ItemArray: Object
  },
  updated() {},
  components: {},
  mounted() {
    this.getSelect();
    this.getSelectSalarycurrency();
  },
  methods: {
    getData(id) {
      const t = this;
      t.key = id;
      getDataLevelUserLogin({
        _mt: "paySalitemMonthnoperiod.getById",
        id: id,
        logType: "根据id获取数据"
      })
        .then(res => {
         // if (isSuccess(res, t)) {
            res = {
              stat: {
                code: 0,
                stateList: [
                  { msg: "SUCCESS", code: 0, length: 819, desc: "成功" }
                ],
                systime: 1561617897164,
                desc: "成功",
                cid: "a:18bb9c|t:153190|s:1561617897026"
              },
              content: [
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
                  plsimnpSn12: "0",
                  plsimnpStatusDis: "编辑中",
                  plsimnpSn14: "0",
                  plsimnpSn13: "0",
                  plsimnpIsconfirmDis: "否",
                  plsimnpSn15: "0",
                  deleteFlag: "0",
                  plsimnpSn09: "800",
                  plsimnpSn08: "600",
                  plsimnpCompany: "1099",
                  plsimnpSalarysetDis: "东风账套F1",
                  plsimnpSn01: "1500",
                  plsimnpSn02: "300",
                  companyId: "1000",
                  updateBy: "1037",
                  plsimnpCompanyDis: "风神襄阳汽车有限公司",
                  createBy: "1006"
                }
              ]
            };
            t.form = res.content[0];
            //            let obj = Object.keys(t.form) // 得到对象的key 转换为数组
            //            obj.sort() // 按照字母表的顺序对属性进行排序
            //            for (let i = 0; i < obj.length; i++) {
            //              if (obj[i].indexOf('plsimnpSn') !== -1 || obj[i].indexOf('plsimnpUn') !== -1) {
            //                let object = {}
            //                object.label = t.form[obj[i]].split(',')[0] // label标签
            //                object.value = t.form[obj[i]].split(',')[1] // 值
            //                t.ItemArray.push(object)
            //              }
            //            }
        //  }
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
      const data = deepCopy(t.form);
      data._mt = "paySalitemMonthnoperiod.addOrUpd";
      data.logType = t.logType;
      data.funId = "1";
      if (t.logType === this.$t("button.upd")) {
        data.id = t.id;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          getDataLevelUserLoginSenior(data)
            .then(res => {
              if (isSuccess(res, t)) {
                t.$emit("closeUp");
                if (t.logType === this.$t("button.add")) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                  t.$refs.form.resetFields();
                  t.$emit("getData");
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$emit("getData");
                }
              }
            })
            .catch(() => {
              this.$Modal.error({
                title: this.$t("reminder.err"),
                content: this.$t("reminder.errormessage")
              });
            });
        }
      });
    },
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: "payroll_itemtype,yesno"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            //            t.selectItemType = res.data.content[0].value[0].paramList
            //            t.selectIsType = res.data.content[0].value[1].paramList
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    getSelectSalarycurrency() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseCurrency.getSelectValue",
        data: "{}",
        logType: this.$t("button.ser")
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.Salarycurrency = res.data.content[0].value;
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: t.$t("reminder.err"),
            content: t.$t("reminder.errormessage")
          });
        });
    },
    // 选择公司
    handleReset() {
      this.$refs.form.resetFields();
      this.$emit("closeUp");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../sass/updateAndAdd";
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
