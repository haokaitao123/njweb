<template>
  <div class="option-main">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Row style="overflow-y: auto;" :style="{ height: disabled?'500px':'420px' }" ref="scrollBox">
      <Form
        :model="formValidate"
        label-position="right"
        ref="formValidate"
        :label-width="100"
        :rules="ruleValidate"
      >
        <Row>
          <Col span="11">
            <FormItem label="项目名称" prop="deptId">
              <span @dblclick="disabled?'':clearUnitFname()">
                <Input
                  v-model="unitFname"
                  icon="search"
                  :disabled="disabled"
                  :readonly="true"
                  placeholder="请选择项目名称"
                  @on-click="disabled?'':unitFnamePick()"
                />
              </span>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="期间" prop="levpPer">
              <DatePicker
                type="date"
                placeholder="请选择期间"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.levpPer"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="离职率" prop="levpProp">
              <Input v-model="formValidate.levpProp" :disabled="disabled" placeholder="请输入离职率"></Input>
            </FormItem>
          </Col>
          <Col span="23">
            <FormItem label="备注" prop="note">
              <Input
                v-model="formValidate.note"
                :disabled="disabled"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入备注..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="handleSubmit" v-show="!disabled">{{$t('button.sav')}}</Button>
    <!--  弹出选择框  -->
    <!-- <transition name="fade">
    <searchDept v-show="openUnitFname"
    @closeModal="closeUnitFname"
    @inputModal ="inputUnitFname"
    ref="unitFnameSearch"></searchDept>
    </transition>-->
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import downLoad from "@/components/downLoad/downLoad";
import valid from "@/lib/pub_valid";
import searchDept from "@/components/searchTable/searchDept";

export default {
  data() {
    //数字校验
    const numberCheck = (rule, value, numberValCheck) => {
      if (value !== "" && value !== undefined) {
        if (valid.val_number103(value)) {
          return numberValCheck();
        }
        return numberValCheck(new Error(rule.message));
      }
      numberValCheck();
    };
    return {
      //表单loading
      spinShow: false,
      //禁选
      disabled: false,
      openUnitFname: false,
      unitFname: "",

      typeCode: "",
      //提交mt名称
      addOrUpd_mt: "payLeaveprop.addOrUpd",
      //获取数据详情mt名称
      getById_mt: "payLeaveprop.getById",
      //form表单提交数据
      formValidate: {
        levpPer: "",
        deptId: "",
        levpProp: "",
        note: ""
      },
      //表单验证规则
      ruleValidate: {
        deptId: [
          { required: true, message: "请输入项目名称", trigger: "change" }
        ],
        levpPer: [
          {
            required: true,
            message: "请输入期间",
            trigger: "change",
            type: "date"
          }
        ],
        levpProp: [
          {
            required: true,
            validator: numberCheck,
            message: "请输入正确的格式",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    modity: String,
    index: Number
  },
  computed: {
    id() {
      return this.$store.state.payLeaveprop.mainId;
    },
    logType() {
      return this.$store.state.payLeaveprop.logType;
    }
  },
  components: {
    searchDept
  },
  mounted() {},
  methods: {
    //获取列表详情
    getData(id) {
      const t = this;
      t.spinShow = true;
      getDataLevelUserLogin({
        _mt: t.getById_mt,
        id: id,
        logType: "Id查询"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            let data = res.data.content[0];
            t.formValidate.levpPer = data.levpPer;
            t.formValidate.deptId = data.deptId;
            t.unitFname = data.unitFname;
            t.formValidate.levpProp = data.levpProp;
            t.formValidate.note = data.note;
          }
        })
        .catch(() => {
          this.$Message.error(this.$t("reminder.errormessage"));
        })
        .finally(() => {
          t.spinShow = false;
        });
    },
    //获取下拉列表数据
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: t.typeCode
      })
        .then(res => {
          if (isSuccess(res, t)) {
            let data = res.data.content[0];
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    //提交
    handleSubmit() {
      const t = this;
      const data = deepCopy(t.formValidate);
      data._mt = t.addOrUpd_mt;
      data.logType = t.logType;
      if (t.logType === t.$t("button.upd")) {
        data.id = t.id;
      }
      if (data.null !== undefined) {
        data.null =
          data.null === "" ? "" : new Date(data.null).format("yyyy-MM-dd");
      }

      t.$refs.formValidate.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.logType === t.$t("button.add")) {
                  t.$Message.success(t.$t("reminder.addsuccess"));
                  t.$store.commit(
                    "payLeaveprop/setMainId",
                    res.data.content[0].id
                  );
                  t.$store.commit("payLeaveprop/setLogType", "修改");
                  t.$emit("newData", res.data.content[0]);
                } else {
                  t.$Message.success(t.$t("reminder.updsuccess"));
                  t.$emit("update", res.data.content[0]);
                }
                t.handleReset();
              }
            })
            .catch(() => {
              t.$Message.error(t.$t("reminder.errormessage"));
            });
        }
      });
    },
    //取消
    clear() {
      //重置表单
      this.$refs.scrollBox.$el.scrollTop = "0";
      this.$refs.formValidate.resetFields();
      this.formValidate = {};
      this.unitFname = "";

      this.$emit("closeUp");
      this.disabled = false;
    },
    clearUnitFname() {
      this.unitFname = "";
      this.formValidate.deptId = "";
    },
    unitFnamePick() {
      this.$refs.unitFnameSearch.getData();
      this.openUnitFname = true;
    },
    closeUnitFname() {
      this.openUnitFname = false;
    },
    inputUnitFname(row) {
      this.formValidate.deptId = row.deptId;
      this.unitFname = row.unitFname;
    }
  }
};
</script>
<style lang="scss">
@import "../../../sass/updatemain";
</style>