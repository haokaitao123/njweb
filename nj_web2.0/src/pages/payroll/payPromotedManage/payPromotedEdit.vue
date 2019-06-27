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
                <FormItem label="提拔人" prop="empId">
                  <span @dblclick="disabled?'':clearEmpnhName()">
                    <Input
                      v-model="empnhName"
                      icon="search"
                      :disabled="disabled"
                      :readonly="disabled"
                      placeholder="请选择提拔人"
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
                <FormItem label="被提拔人" prop="promUser">
                  <span @dblclick="disabled?'':clearPromUserName()">
                    <Input
                      v-model="promUserName"
                      icon="search"
                      :disabled="disabled"
                      :readonly="disabled"
                      placeholder="请选择被提拔人"
                      @on-click="disabled?'':promUserNamePick()"
                    />
                  </span>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="身份证号码" prop="promUserIdno">
                  <Input v-model="promUserIdno" :disabled="disabled" placeholder="请输入身份证号码"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="岗位名称" prop="postId">
                  <Input v-model="postFname" disabled="true" placeholder="请输入岗位名称"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="部门名称" prop="deptId">
                  <Input v-model="unitFname" disabled="true" placeholder="请输入部门名称"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="提拔岗位" prop="promPost">
                  <span @dblclick="disabled?'':clearPromPostFname()">
                    <Input
                      v-model="promPostFname"
                      icon="search"
                      :disabled="disabled"
                      :readonly="disabled"
                      placeholder="请选择提拔岗位"
                      @on-click="disabled?'':promPostFnamePick()"
                    />
                  </span>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="提拔部门" prop="promDept">
                  <span @dblclick="disabled?'':clearPromDeptFname()">
                    <Input
                      v-model="promDeptFname"
                      icon="search"
                      :disabled="disabled"
                      :readonly="disabled"
                      placeholder="请选择提拔部门"
                      @on-click="disabled?'':promDeptFnamePick()"
                    />
                  </span>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="开始月份" prop="promStart">
                  <DatePicker
                    type="date"
                    placeholder="请选择开始月份"
                    :editable="false"
                    :disabled="disabled"
                    :readonly="disabled"
                    v-model="formValidate.promStart"
                    format="yyyy-MM-dd"
                    style="width: 100%"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="结束月份" prop="promEnd">
                  <DatePicker
                    type="date"
                    placeholder="请选择结束月份"
                    :editable="false"
                    :disabled="disabled"
                    :readonly="disabled"
                    v-model="formValidate.promEnd"
                    format="yyyy-MM-dd"
                    style="width: 100%"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="提成比例" prop="promProp">
                  <Input v-model="formValidate.promProp" :disabled="disabled" placeholder="请输入提成比例"></Input>
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
    <transition name="fade">
      <searchEmpMaster
        v-show="openPromUserName"
        @closeModal="closePromUserName"
        @inputModal="inputPromUserName"
        ref="promUserNameSearch"
      ></searchEmpMaster>
    </transition>
    <transition name="fade">
      <searchPost
        v-show="openPromPostFname"
        @closeModal="closePromPostFname"
        @inputModal="inputPromPostFname"
        ref="promPostFnameSearch"
      ></searchPost>
    </transition>
    <transition name="fade">
      <searchOrgframe
        v-show="openPromDeptFname"
        @closeModal="closePromDeptFname"
        @inputModal="inputPromDeptFname"
        ref="promDeptFnameSearch"
      ></searchOrgframe>
    </transition>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import downLoad from "@/components/downLoad/downLoad";
import valid from "@/lib/pub_valid";
import searchEmpMaster from "@/components/searchTable/searchEmpMaster";
import searchPost from "@/components/searchTable/searchPost";
import searchOrgframe from "@/components/searchTable/searchOrgframe";

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
      openPromUserName: false,
      promUserName: "",
      promUserIdno: "",
      postFname: "",
      unitFname: "",
      openPromPostFname: false,
      promPostFname: "",
      openPromDeptFname: false,
      promDeptFname: "",

      typeCode: "",
      //提交mt名称
      addOrUpd_mt: "payPromoted.addOrUpd",
      //获取数据详情mt名称
      getById_mt: "payPromoted.getById",
      //form表单提交数据
      formValidate: {
        empId: "",
        deptId: "",
        postId: "",
        promUser: "",
        promDept: "",
        promPost: "",
        promStart: "",
        promEnd: "",
        promProp: "",
        note: ""
      },
      //表单验证规则
      ruleValidate: {
        empId: [{ required: true, message: "请输入提拔人", trigger: "change" }],
        promUser: [
          { required: true, message: "请输入被提拔人", trigger: "change" }
        ],
        postId: [
          { required: true, message: "请输入岗位名称", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        promPost: [
          { required: true, message: "请输入提拔岗位", trigger: "change" }
        ],
        promDept: [
          { required: true, message: "请输入提拔部门", trigger: "change" }
        ],
        promStart: [
          { required: true, message: "请输入开始月份", trigger: "change" }
        ],
        promEnd: [
          { required: true, message: "请输入结束月份", trigger: "change" }
        ],
        promProp: [
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
    searchEmpMaster,
    searchPost,
    searchOrgframe
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
            t.formValidate.promUser = data.promUser;
            t.promUserName = data.promUserName;
            t.promUserIdno = data.promUserIdno;
            t.formValidate.promDept = data.promDept;
            t.promDeptFname = data.promDeptFname;
            t.formValidate.promPost = data.promPost;
            t.promPostFname = data.promPostFname;
            t.formValidate.promStart = data.promStart;
            t.formValidate.promEnd = data.promEnd;
            t.formValidate.promProp = data.promProp;
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
      this.promUserName = "";
      this.promUserIdno = "";
      this.postFname = "";
      this.unitFname = "";
      this.promPostFname = "";
      this.promDeptFname = "";

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
      this.promDeptFname = row.promDeptFname;
      this.promPostFname = row.promPostFname;
    },
    clearPromUserName() {
      this.promUserName = "";
      this.formValidate.promUser = "";
    },
    promUserNamePick() {
      this.$refs.promUserNameSearch.getData();
      this.openPromUserName = true;
    },
    closePromUserName() {
      this.openPromUserName = false;
    },
    inputPromUserName(row) {
      this.formValidate.promUser = row.id;
      this.promUserName = row.promUserName;
      this.promUserIdno = row.promUserIdno;
      this.unitFname = row.unitFname;
      this.postFname = row.postFname;
    },
    clearPromPostFname() {
      this.promPostFname = "";
      this.formValidate.promPost = "";
    },
    promPostFnamePick() {
      this.$refs.promPostFnameSearch.getData();
      this.openPromPostFname = true;
    },
    closePromPostFname() {
      this.openPromPostFname = false;
    },
    inputPromPostFname(row) {
      this.formValidate.promPost = row.promPost;
      this.promPostFname = row.promPostFname;
    },
    clearPromDeptFname() {
      this.promDeptFname = "";
      this.formValidate.promDept = "";
    },
    promDeptFnamePick() {
      this.$refs.promDeptFnameSearch.getData();
      this.openPromDeptFname = true;
    },
    closePromDeptFname() {
      this.openPromDeptFname = false;
    },
    inputPromDeptFname(row) {
      this.formValidate.promDept = row.promDept;
      this.promDeptFname = row.promDeptFname;
    }
  }
};
</script>
<style lang="scss">
@import "../../../sass/updateAndAdd";
@import "../../../sass/singleUpdateAdd";
</style>