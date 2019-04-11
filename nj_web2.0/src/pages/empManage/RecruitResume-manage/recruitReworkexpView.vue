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
              <FormItem label="姓名" prop="rewexPidDis">
                <Input v-model="formValidate.rewexPidDis" placeholder="请输入姓名" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="工作开始时间" prop="rewexSdate">
                <DatePicker type="date" placeholder="请输入工作开始时间" :disabled="disabled" :readonly="disabled" :editable="false" v-model="formValidate.rewexSdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="工作结束时间" prop="rewexEdate">
                <DatePicker type="date" placeholder="请输入工作结束时间" :disabled="disabled" :readonly="disabled" :editable="false" v-model="formValidate.rewexEdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="单位名称" prop="rewexCompnm">
                <Input v-model="formValidate.rewexCompnm" placeholder="请输入单位名称" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="职务" prop="rewexPost">
                <Input v-model="formValidate.rewexPost" placeholder="请输入职务" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="22">
              <FormItem label="离职原因" prop="rewexLevres">
                <Input v-model="formValidate.rewexLevres" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入离职原因" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="证明人" prop="rewexCertifier">
                <Input v-model="formValidate.rewexCertifier" placeholder="请输入证明人" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="22">
              <FormItem label="证明人联系方式" prop="rewexCertnub">
                <Input v-model="formValidate.rewexCertnub" placeholder="请输入证明人联系方式" :disabled="disabled"/>
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
        selecteducation: [],
        formValidate: {
          _mt: "recruitReeduc.addOrUpd",
          rewexPid: '',
          rewexPidDis: '',
          rewexSdate: '',
          rewexEdate: '',
          rewexCompnm: '',
          rewexPost: '',
          rewexLevres: '',
          rewexCertifier: '',
          rewexCertnub: '',
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
          _mt: "recruitReworkexp.getById",
          id: id,
          logType: "Id查询"
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.formValidate.rewexPid = res.data.content[0].rewexPid;
              t.formValidate.rewexPidDis = res.data.content[0].rewexPidDis;
              t.formValidate.rewexSdate = res.data.content[0].rewexSdate;
              t.formValidate.rewexEdate = res.data.content[0].rewexEdate;
              t.formValidate.rewexCompnm = res.data.content[0].rewexCompnm;
              t.formValidate.rewexPost = res.data.content[0].rewexPost;
              t.formValidate.rewexLevres = res.data.content[0].rewexLevres;
              t.formValidate.rewexCertifier = res.data.content[0].rewexCertifier;
              t.formValidate.rewexCertnub = res.data.content[0].rewexCertnub;
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
        t.formValidate.rewexPid = '';
        t.formValidate.rewexPidDis = '';
        t.formValidate.rewexSdate = '';
        t.formValidate.rewexEdate = '';
        t.formValidate.rewexCompnm = '';
        t.formValidate.rewexPost = '';
        t.formValidate.rewexLevres = '';
        t.formValidate.rewexCertifier = '';
        t.formValidate.rewexCertnub = '';
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
