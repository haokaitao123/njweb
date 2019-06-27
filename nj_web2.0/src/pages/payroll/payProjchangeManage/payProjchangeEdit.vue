<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Row class="main-height" ref="scrollBox">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Row>
              <Col span="11">
                <FormItem label="员工姓名" prop="empId">
                  <span @dblclick="disabled?'':clearEmpnhName()">
                    <Input
                      v-model="empnhName"
                      icon="search"
                      :disabled="disabled"
                      :readonly="true"
                      placeholder="请选择员工姓名"
                      @on-click="disabled?'':empnhNamePick()"
                    />
                  </span>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="身份证号码" prop="empnhIdno">
                  <Input v-model="empnhIdno" :disabled="disabled" placeholder="请输入身份证号码"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="部门名称" prop="deptId">
                  <Input v-model="unitFname" disabled="true" placeholder="请输入部门名称"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="岗位名称" prop="postId">
                  <Input v-model="postFname" disabled="true" placeholder="请输入岗位名称"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="开始月份" prop="pojcStart">
                  <DatePicker
                    type="date"
                    placeholder="请选择开始月份"
                    :editable="false"
                    :disabled="disabled"
                    :readonly="disabled"
                    v-model="formValidate.pojcStart"
                    format="yyyy-MM-dd"
                    style="width: 100%"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="结束月份" prop="pojcEnd">
                  <DatePicker
                    type="date"
                    placeholder="请选择结束月份"
                    :editable="false"
                    :disabled="disabled"
                    :readonly="disabled"
                    v-model="formValidate.pojcEnd"
                    format="yyyy-MM-dd"
                    style="width: 100%"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="提成比例" prop="poicPorp">
                  <Input v-model="formValidate.poicPorp" :disabled="disabled" placeholder="请输入提成比例"></Input>
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
      </div>
      <div class="button_box">
        <Button type="ghost" @click="handleReset" class="btn1">取消</Button>
        <Button type="primary" @click="handleSubmit" v-show="!disabled" class="btn">保存</Button>
      </div>
    </div>
    <!--  弹出选择框  -->
    <transition name="fade">
      <searchEmpMaster
        v-show="openEmpnhName"
        @closeModal="closeEmpnhName"
        @inputModal="inputEmpnhName"
        ref="empnhNameSearch"
      ></searchEmpMaster>
    </transition>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import downLoad from "@/components/downLoad/downLoad";
import valid from "@/lib/pub_valid";
import searchEmpMaster from "@/components/searchTable/searchEmpMaster";

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
      openEmpnhName: false,
      empnhName: "",
      empnhIdno: "",
      unitFname: "",
      postFname: "",
      typeCode: "",
      //提交mt名称
      addOrUpd_mt: "payProjchange.addOrUpd",
      //获取数据详情mt名称
      getById_mt: "payProjchange.getById",
      //form表单提交数据
      formValidate: {
        empId: "",
        deptId: "",
        postId: "",
        pojcStart: "",
        pojcEnd: "",
        poicPorp: "",
        note: ""
      },
      //表单验证规则
      ruleValidate: {
        empId: [
          { required: true, message: "请输入员工姓名", trigger: "change" }
        ],
        deptId: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        postId: [
          { required: true, message: "请输入岗位名称", trigger: "blur" }
        ],
        pojcStart: [
          { required: true, message: "请输入开始月份", trigger: "change" }
        ],
        pojcEnd: [
          { required: true, message: "请输入结束月份", trigger: "change" }
        ],
        poicPorp: [
          { required: true, message: "请输入提成比例", trigger: "blur" },
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
    id: Number,
    logType: String,
    index: Number
  },
  components: {
    searchEmpMaster
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
            t.formValidate.empId = data.empId;
            t.empnhName = data.empnhName;
            t.empnhIdno = data.empnhIdno;
            t.formValidate.deptId = data.deptId;
            t.unitFname = data.unitFname;
            t.formValidate.postId = data.postId;
            t.postFname = data.postFname;
            t.formValidate.pojcStart = data.pojcStart;
            t.formValidate.pojcEnd = data.pojcEnd;
            t.formValidate.poicPorp = data.poicPorp;
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

      t.$refs.formValidate.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.logType === t.$t("button.add")) {
                  t.$Message.success(t.$t("reminder.addsuccess"));
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
    handleReset() {
      //重置表单
      this.$refs.scrollBox.$el.scrollTop = "0";
      this.$refs.formValidate.resetFields();
      this.formValidate = {};
      this.empnhName = "";
      this.empnhIdno = "";
      this.unitFname = "";
      this.postFname = "";

      this.$emit("closeUp");
    },
    clearEmpnhName() {
      this.empnhName = "";
      this.formValidate.empId = "";
    },
    empnhNamePick() {
      this.$refs.empnhNameSearch.getData();
      this.openEmpnhName = true;
    },
    closeEmpnhName() {
      this.openEmpnhName = false;
    },
    inputEmpnhName(row) {
      this.formValidate.empId = row.id;
      this.empnhName = row.empnhName;
      this.empnhIdno = row.empnhIdno;
      this.unitFname = row.unitFname;
      this.postFname = row.postFname;
    }
  }
};
</script>
<style lang="scss">
@import "../../../sass/updateAndAdd";
@import "../../../sass/singleUpdateAdd";
</style>