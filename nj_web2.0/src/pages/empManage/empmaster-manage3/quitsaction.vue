<template>
  <div class="cover">
    <div class="box" style="padding-bottom:20px;">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;离职
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div
        style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;height: 150px;"
      >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <Col span="11">
            <FormItem label="申请离职日期" prop="dimLevsqday">
              <DatePicker
                type="date"
                placeholder="请输入申请离职日期"
                :editable="false"
                v-model="formValidate.dimLevsqday"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="离职类型" prop="dimType">
              <Select
                v-model="formValidate.dimType"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择离职类型"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in selectDimtype"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="离职原因" prop="dimReason">
              <Select
                v-model="formValidate.dimReason"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择离职原因"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in selectDimReason"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Form>
      </div>
      <Button type="primary" @click="handleSubmit" style="float: right;">确定</Button>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import searchDept from "@/components/searchTable/searchDept";
import searchPost from "@/components/searchTable/searchPost";
import searchEmpMaster from "@/components/searchTable/searchEmpnhMaster";
export default {
  data() {
    return {
      formValidate: {
        // _mt: "empEmpnh.batchQuits",
        //funId: "1",
        dimType: "",
        dimReason: "",
        dimLevsqday: ""
      },
      disabled: false,
      dimTypeDis: "",
      dimReasonDis: "",
      loadingStatus: false,
      openDeptPick: false,
      openPost: false,
      openEmpMaster: false,
      selectDimtype: [],
      selectDimReason: [],
      ruleValidate: {
        dimLevsqday: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change"
          }
        ],
        dimType: [
          {
            required: true,
            message: "请选择离职类型",
            trigger: "blur"
          }
        ],
        dimReason: [
          {
            required: true,
            message: "请选择离职原因",
            trigger: "blur"
          }
        ],
      }
    };
  },
  props: {
    selectType: Array,
    id: Array,
    logType: String,
    index: Number
  },
  components: {
    // searchDept,
    // searchPost,
    // searchEmpMaster,
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    handleSubmit() {
      const t = this;
      t.$refs.formValidate.validate(valid => {
        if (valid) {
          t.$Modal.confirm({
            title: t.$t("reminder.remind"),
            content: "是否确定离职",
            onOk: () => {
              let params = "";
              const data = deepCopy(t.formValidate);
              data.dimLevsqday = new Date(data.dimLevsqday).format(
                "yyyy-MM-dd"
              );
              params = JSON.stringify(data);
              let tt = {};
              tt._mt = "empEmpnh.batchQuits";
              tt.logType = t.logType;
              tt.ids = t.id.join();
              tt.data = params;

              getDataLevelUserLogin(tt)
                .then(res => {
                  if (isSuccess(res, t)) {
                    t.$Message.success("离职成功");
                    t.handleReset();
                  }
                })
                .catch(() => {
                  t.$Message.error(t.$t("reminder.errormessage"));
                });
            },
            onCancel: () => {}
          });
        }
      });
    },
    //查询公共参数
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: "separatereason,terminatereason"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.selectDimtype = res.data.content[0].value[0].paramList;
            t.selectDimReason = res.data.content[0].value[1].paramList;
          }
        })
        .catch(() => {
          this.$Message.error("网络错误");
        });
    },
    handleReset() {
      this.$emit("closeQuitsaction");
      this.$refs.formValidate.resetFields();
      // this.pmpDis = '';
      // this.formValidate.pmpId = '';
      // this.postFname = '';
      this.formValidate.dimReason = "";
      this.dimReasonDis = "";
      this.formValidate.dimType = "";
      this.dimTypeDis = "";
      this.formValidate.dimLevsqday = "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
