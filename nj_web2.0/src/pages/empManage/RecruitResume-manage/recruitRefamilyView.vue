<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse"
                size="16"
                style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text"
                @click="handleReset">
          <Icon type="close-round"
                size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;"
             id="scrollBox">
          <Form ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="100">
            <i-col span="11">
              <FormItem label="姓名" prop="refamPidDis">
                <Input v-model="formValidate.refamPidDis" placeholder="请输入姓名" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="家庭成员关系" prop="refamMembers">
                <Select v-model="formValidate.refamMembers" placeholder="请选择家庭成员关系" :disabled="disabled">
                  <Option :value="item.paramCode" v-for="(item,index) in selectrelationship" :key="index">
                    {{item.paramInfoCn}}
                  </Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="家庭成员姓名" prop="refamName">
                <Input v-model="formValidate.refamName" placeholder="请输入家庭成员姓名" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="工作单位" prop="refamCompnm">
                <Input v-model="formValidate.refamCompnm" placeholder="请输入工作单位" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="职务" prop="refamPost">
                <Input v-model="formValidate.refamPost" placeholder="请输入职务" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="联系方式" prop="refamContact">
                <Input v-model="formValidate.refamContact" placeholder="请输入联系方式" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="22">
              <FormItem label="备注" prop="note">
                <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" :disabled="disabled"/>
              </FormItem>
            </i-col>
          </Form>
        </Row>
        <Button type="primary"
                @click="handleSubmit"
                class="btn"
                v-show="!disabled">{{$t('button.sav')}}
        </Button>
        <!--弹出选择页面布局 无需变更-->
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getDataLevelUserLoginSenior,
    getDataLevelUserLogin
  } from "../../../axios/axios";
  import {isSuccess, deepCopy} from "../../../lib/util";
  export default {
    data() {
      return {
        disabled: false,
        selectrelationship: [],
        formValidate: {
          _mt: "recruitRefamily.addOrUpd",
          refamPid: '',
          refamPidDis: '',
          refamMembers: '',
          refamName: '',
          refamCompnm: '',
          refamPost: '',
          refamContact: '',
          note: '',
          logType: ""
        },
        //设置必填规则
        ruleValidate: {  },
      };
    },
    //    子页面默认参数 无需变更
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
    },
    updated() {
    },
    mounted() {
      this.getSelect();
    },
    methods: {

      getData(id) {
        const t = this;
        this.page = 1;
        getDataLevelUserLogin({
          _mt: "recruitRefamily.getById",
          id: id,
          logType: "Id查询"
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.formValidate.refamPid = res.data.content[0].refamPid;
              t.formValidate.refamPidDis = res.data.content[0].refamPidDis;
              t.formValidate.refamMembers = res.data.content[0].refamMembers;
              t.formValidate.refamName = res.data.content[0].refamName;
              t.formValidate.refamCompnm = res.data.content[0].refamCompnm;
              t.formValidate.refamPost = res.data.content[0].refamPost;
              t.formValidate.refamContact = res.data.content[0].refamContact;
              t.formValidate.note = res.data.content[0].note;
            }
          })
          .catch(() => {
            this.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage")
            });
          });
      },
      getSelect() {
        const t = this;
        getDataLevelUserLogin({
          _mt: "baseParmInfo.getSelectValue",
          typeCode: "relationship"
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.selectrelationship = res.data.content[0].value[0].paramList;
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

        if (t.logType === this.$t("button.upd")) {
          data.id = t.id;
        }
        this.$refs.formValidate.validate(valid => {
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
                    t.$emit('update', res.data.content[0])
                  } else {
                    t.$Modal.success({
                      title: this.$t("reminder.suc"),
                      content: this.$t("reminder.updsuccess")
                    });
                    t.$emit('newdata', res.data.content[0])
                    t.handleReset();
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
      handleReset() {
        const t = this;
        t.formValidate.refamPid = '';
        t.formValidate.refamPidDis = '';
        t.formValidate.refamMembers = '';
        t.formValidate.refamName = '';
        t.formValidate.refamCompnm = '';
        t.formValidate.refamPost = '';
        t.formValidate.refamContact = '';
        t.formValidate.note = '';
        this.$refs.formValidate.resetFields();
        this.$emit("closeUp");
      },
    },
    watch: {}
  };
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";

  .option-main {
    position: relative;
    height: 500px;
    .btn {
      position: absolute;
      bottom: 20px;
      right: 40px;
    }
    .btn1 {
      position: absolute;
      bottom: 20px;
      right: 100px;
    }
  }
</style>
