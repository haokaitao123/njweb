<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <i-col span="11">
          <FormItem label="员工姓名" prop="empIdName">
            <!--绑定双击清除方法-->
            <span @dblclick="forbidden?'':dbclean()">
              <!--v-model绑定显示字段-->
              <Input
                v-model="formValidate.empIdName"
                icon="search"
                readonly="readonly"
                :disabled="forbidden"
                placeholder="请选择员工"
                @on-click="forbidden?'':pickEmpData()"
              />
            </span>
          </FormItem>
        </i-col>

        <i-col span="11">
          <FormItem label="证件号码" prop="empIdIden">
            <Input v-model="formValidate.empIdIden" disabled="disabled" placeholder="请输入证件号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="部门" prop="deptIdDis">
            <Input v-model="formValidate.deptIdDis" disabled="disabled" placeholder="请输入部门名称"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="岗位" prop="postIdDis">
            <Input v-model="formValidate.postIdDis" disabled="disabled" placeholder="请输入岗位名称"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="退款开始日期" prop="refuBgdate">
            <DatePicker
              type="date"
              placeholder="选择退款开始日期"
              :editable="false"
              :disabled="forbidden"
              :readonly="forbidden"
              v-model="formValidate.refuBgdate"
              format="yyyy-MM-dd"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="总金额" prop="totalSum">
            <Input v-model="formValidate.totalSum" :disabled="forbidden" placeholder="请输入总金额"></Input>
          </FormItem>
        </i-col>

        <i-col span="22">
          <FormItem label="备注" prop="note">
            <Input
              v-model="formValidate.note"
              type="textarea"
              :disabled="forbidden"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入备注..."
            ></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <!--            <Button type="ghost"
                      @click="handleReset"
    class="btn1">{{$t('button.cal')}}</Button>-->
    <Button
      type="primary"
      v-show="!forbidden"
      @click="handleSubmit"
      class="btn"
    >{{$t('button.sav')}}</Button>
    <!--一个弹出框一个transition-->
    <transition name="fade">
      <searchEmpMaster
        v-show="openEmpMaster"
        @closeEmp="closeEmp"
        @inputEmp="inputEmp"
        ref="searchEmpMaster"
      ></searchEmpMaster>
    </transition>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginSenior,
  getDataLevelUserLogin,
  uploadFile
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import searchEmpMaster from "../../../components/searchTable/searchEmpnhMaster";
import valid from "../../../lib/pub_valid.js";

export default {
  data() {
    /*数字验证*/
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
      file: "",
      filekey: "",
      loadingStatus: false,
      type: "",
      distype: false,
      forbidden: false,
      formValidate: {
        empIdName: "",
        empIdIden: "",
        empId: "",
        deptId: "",
        deptIdDis: "",
        postId: "",
        postIdDis: "",
        refuBgdate: "",
        totalSum: "",
        note: ""
      },
      openEmpMaster: false,
      /*必填验证*/
      ruleValidate: {
        empIdName: [
          { required: true, message: "请选择员工姓名", trigger: "change" }
        ],
         refuBgdate: [
          { required: true,type: "date", message: "请选择退款开始日期", trigger: "blur" }
        ],
        totalSum: [
          {
            required: true,
            message: "请输入总金额",
            trigger: "blur"
          },
          {
            validator: numberCheck,
            message: "请输入正确的数字格式",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    id: Number,
    logType: String,
    index: Number
  },
  /*资源加载子页面，js不需要*/
  components: {
    searchEmpMaster,
    valid
  },
  updated() {},
  mounted() {
    //this.getSelect("emptype");
  },
  methods: {
    //上级清除员工选择
    dbclean() {
      const t = this;
      t.formValidate.empIdName = "";
      t.formValidate.empIdIden = "";
      t.formValidate.empId = "";
      t.formValidate.deptIdDis = "";
      t.formValidate.deptId = "";
      t.formValidate.postIdDis = "";
      t.formValidate.postId = "";
    },
    getData(id) {
      const t = this;
      getDataLevelUserLogin({
        _mt: "empRefund.getById",
        id: id,
        funId: "1",
        logType: "押金退款信息id查询"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0]);
            t.formValidate = res.data.content[0];
            t.formValidate.empIdName = res.data.content[0].empIdName;
            t.formValidate.empIdIden = res.data.content[0].empIdIden;
            t.formValidate.empId = res.data.content[0].empId;
            t.formValidate.deptId = res.data.content[0].deptId;
            t.formValidate.deptIdDis = res.data.content[0].deptIdDis;
            t.formValidate.postId = res.data.content[0].postId;
            t.formValidate.postIdDis = res.data.content[0].postIdDis;
            t.formValidate.refuBgdate = res.data.content[0].refuBgdate;
            t.formValidate.totalSum = res.data.content[0].totalSum;
            t.formValidate.note = res.data.content[0].note;
            if (t.logType === "查看") {
              t.forbidden = true;
              t.distype = true;
            } else {
              t.forbidden = false;
              t.distype = false;
            }
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    handleSubmit() {
      const t = this;
      const data = deepCopy(t.formValidate);
      data.logType = t.logType;
      data._mt = "empRefund.addOrUpd";

      if (!isNaN(t.id) && t.id != "") {
        t.logType = "修改";
      }
      if (t.logType === "修改") {
        data.id = t.id;
      }
       if (data.refuBgdate !== undefined) {
        data.refuBgdate = new Date(data.refuBgdate).format("yyyy-MM-dd");
      }
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          getDataLevelUserLoginSenior(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.logType === "新增") {
                  t.$Message.success("新增成功");
                   t.$refs.formValidate.resetFields()
                  t.id = res.data.content[0].id;
                  t.$emit("newdata", res.data.content[0]);
                } else {
                  t.$Message.success("修改成功");
                  t.$emit("update", res.data.content[0]);
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
    /*选择员工*/
    pickEmpData() {
      const t = this;
      t.$refs.searchEmpMaster.getData();
      t.openEmpMaster = true;
    },
    closeEmp() {
      const t = this;
      t.openEmpMaster = false;
    },
    inputEmp(row) {
      const t = this;
      t.formValidate.empIdName = row.empnhName;
      t.formValidate.empIdIden = row.empnhIdno;
      t.formValidate.empId = row.id;
      t.formValidate.deptIdDis = row.deptIdDis;
      t.formValidate.deptId = row.deptId;
      t.formValidate.postIdDis = row.postIdDis;
      t.formValidate.postId = row.postId;
    },
    handleReset() {
      this.$refs.formValidate.resetFields();
      this.$emit("closeUp");
    },
    handleUpload(file) {
      this.file = file;
      this.loadingStatus = true;
      return false;
    },
    //清除
    clear() {
      const t = this;
      t.$refs.formValidate.resetFields();
      t.openUpdate = false;
      t.forbidden = false;
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.option-main {
  position: relative;
  height: 500px;
}
.btn {
  position: absolute;
  bottom: 20px;
  right: 60px;
}
.btn1 {
  position: absolute;
  bottom: 20px;
  right: 124px;
}
</style>
