<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form
        :model="form"
        label-position="right"
        :rules="ruleValidate"
        ref="form"
        :label-width="120"
      >
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.paySalSet.payssCode')" prop="payssCode">
            <Input
              v-model="form.payssCode"
              :placeholder="$t('lang_payroll.paySalSet.payssCodeDis')"
            ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.paySalSet.payssCN')" prop="payssCN">
            <Input v-model="form.payssCN" :placeholder="$t('lang_payroll.paySalSet.payssCNDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.paySalSet.payssEN')" prop="payssEN">
            <Input v-model="form.payssEN" :placeholder="$t('lang_payroll.paySalSet.payssENDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem
            :label="$t('lang_payroll.paySalSet.payssLocalcurrency')"
            prop="payssLocalcurrency"
          >
            <span @dblclick="clearCurrency">
              <Input
                v-model="payssLocalcurrencyDis"
                icon="search"
                readonly
                :placeholder="$t('lang_payroll.paySalSet.payssLocalcurrencyDis')"
                style="width: 200px"
                @on-click="pickCurrency"
              />
            </span>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.paySalSet.payssContact')" prop="payssContact">
            <Input
              v-model="form.payssContact"
              :placeholder="$t('lang_payroll.paySalSet.payssContactDis')"
            ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.paySalSet.payssEmail')" prop="payssEmail">
            <Input
              v-model="form.payssEmail"
              :placeholder="$t('lang_payroll.paySalSet.payssEmailDis')"
            ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.paySalSet.payssPhone')" prop="payssPhone">
            <Input
              v-model="form.payssPhone"
              :placeholder="$t('lang_payroll.paySalSet.payssPhoneDis')"
            ></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.paySalSet.payssComment')" prop="payssComment">
            <Input
              v-model="form.payssComment"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              :placeholder="$t('lang_payroll.paySalSet.payssCommentDis')"
            ></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <transition name="fade">
      <searchCurrency
        v-show="openCurrency"
        :params="params"
        :searchCloumns="searchCloumns"
        @closeUp="closeCurrency"
        @changeinput="changeinput"
        ref="searchCurrency"
      ></searchCurrency>
    </transition>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import searchCurrency from "../../../components/searchTable/searchCurrency";

export default {
  data() {
    return {
      payssLocalcurrencyDis: "",
      form: {},
      ruleValidate: {
        payssCode: [
          {
            required: true,
            message: this.$t("lang_payroll.paySalSet.payssCodeDis"),
            trigger: "blur"
          }
        ],
        payssCN: [
          {
            required: true,
            message: this.$t("lang_payroll.paySalSet.payssCNDis"),
            trigger: "blur"
          }
        ],
        payssEN: [
          {
            required: true,
            message: this.$t("lang_payroll.paySalSet.payssENDis"),
            trigger: "blur"
          }
        ],
        payssLocalcurrency: [
          {
            required: true,
            message: this.$t("lang_payroll.paySalSet.payssLocalcurrencyDis"),
            trigger: "blur"
          }
        ]
      },
      openCurrency: false,
      params: {
        _mt: "baseCurrency.getPage",
        sort: "id",
        order: "desc",
        rows: 10,
        page: 1,
        funId: "1",
        logType: this.$t("button.ser"),
        data: "{}"
      },
      searchCloumns: [
        {
          title: this.$t("lang_baseManage.baseCurrency.currCurrency"),
          key: "currCurrency",
          sortable: "custom",
          width: 380
        },
        {
          title: this.$t("lang_baseManage.baseCurrency.currCode1"),
          key: "currCode1",
          sortable: "custom",
          width: 379
        }
      ]
    };
  },
  props: {
    id: Number,
    logType: String,
    index: Number
  },
  components: {
    searchCurrency
  },
  methods: {
    getdata() {
      const t = this;
      const params = {
        _mt: "paySalSet.getById",
        id: t.$store.state.paySalSet.mainId,
        logType: "根据id查询"
      };

      // let data = {
      //   payssCode:"01545894",
      //   payssName:"2019年薪资帐单",
      //   payssLocalcurrencyDis:"本位币",
      //   payssContact:"盖聂",
      //   payssEmail:"345834@qq.com",
      //   payssPhone:"13379660001",
      //   };
      //   t.form.payssCode = data.payssCode
      //   t.form.payssName = data.payssName
      //   t.payssLocalcurrencyDis = data.payssLocalcurrencyDis
      //   t.form.payssContact = data.payssContact
      //   t.form.payssEmail = data.payssEmail
      //   t.form.payssPhone = data.payssPhone
      getDataLevelUserLogin(params)
        .then(res => {
         // if (isSuccess(res, t)) {
            res = {
              stat: {
                code: 0,
                stateList: [
                  { msg: "SUCCESS", code: 0, length: 422, desc: "成功" }
                ],
                systime: 1561616783908,
                desc: "成功",
                cid: "a:18bb9c|t:153143|s:1561616783878"
              },
              content: [
                {
                  payss: "薪资账套01",
                  deleteFlag: "0",
                  payssCode: "1000",
                  payssContact: "高继明",
                  payssEmail: "gaojiming@163.com",
                  updateBy: "1037",
                  id: "1000",
                  payssLocalcurrency: "1000",
                  updateTime: "2018-10-25 15:58:24",
                  payssCN: "薪资账套01",
                  payssComment: "",
                  payssEN: "薪资账套01",
                  companyId: "1000",
                  createBy: "1037",
                  createTime: "2018-04-12 07:46:51",
                  payssPhone: "13379660001",
                  payssLocalcurrencyDis: "人民币"
                }
              ]
            };

            this.form = res.content[0];
            this.payssLocalcurrencyDis =
            res.content[0].payssLocalcurrencyDis;
          //}
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    updateimg() {
      this.updateImg = true;
    },
    closeImg() {
      const t = this;
      t.updateImg = false;
    },
    pickCurrency() {
      const t = this;
      t.$refs.searchCurrency.getData(this.params);
      t.openCurrency = true;
    },
    changeinput(name, id) {
      const t = this;
      t.payssLocalcurrencyDis = name;
      t.form.payssLocalcurrency = id;
    },
    clearCurrency() {
      const t = this;
      t.payssLocalcurrencyDis = "";
      t.form.payssLocalcurrency = "";
    },
    closeCurrency() {
      const t = this;
      t.openCurrency = false;
    },
    save() {
      const t = this;
      const data = deepCopy(t.form);
      if (t.$store.state.paySalSet.mainId) {
        data.id = t.$store.state.paySalSet.mainId;
      }
      data.logType = t.logType;
      data._mt = "paySalSet.addOrUpd";
      data.funId = "1";
      this.$refs.form.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                t.$emit("getid", res.data.content[0].id);
                if (t.logType === this.$t("button.add")) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                  t.$store.commit(
                    "paySalSet/setChildId1",
                    res.data.content[0].id
                  );
                  t.$emit("newdata", res.data.content[0]);
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
      this.form = {};
      this.payssLocalcurrencyDis = "";
      this.$store.commit("paySalSet/setMainId", "");
      this.$refs.form.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
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
