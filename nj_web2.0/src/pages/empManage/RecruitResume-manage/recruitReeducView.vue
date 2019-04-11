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
              <FormItem label="姓名" prop="reeducPidDis">
                <Input v-model="formValidate.reeducPidDis" placeholder="请输入姓名" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="教育程度" prop="reeducLevel">
                <Select v-model="formValidate.reeducLevel" placeholder="请选择教育程度" :disabled="disabled">
                  <Option :value="item.paramCode" v-for="(item,index) in selecteducation" :key="index">
                    {{item.paramInfoCn}}
                  </Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="学位" prop="reeducDegree">
                <Input v-model="formValidate.reeducDegree" placeholder="请输入学位" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="教育开始时间" prop="reeducSdate">
                <DatePicker type="date" placeholder="请输入教育开始时间" :disabled="disabled" :readonly="disabled" :editable="false" v-model="formValidate.reeducSdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="教育结束时间" prop="reeducEdate">
                <DatePicker type="date" placeholder="请输入教育结束时间" :disabled="disabled" :readonly="disabled" :editable="false" v-model="formValidate.reeducEdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="学校名称" prop="reeducSchool">
                <Input v-model="formValidate.reeducSchool" placeholder="请输入学校名称" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="专业" prop="reeducProfession">
                <Input v-model="formValidate.reeducProfession" placeholder="请输入专业" :disabled="disabled"/>
              </FormItem>
            </i-col>
            <i-col span="22">
              <FormItem label="所获奖励证书" prop="reeducAwardcert">
                <Input v-model="formValidate.reeducAwardcert" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入所获奖励证书" :disabled="disabled"/>
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
          reeducPid: '',
          reeducPidDis: '',
          reeducLevel: '',
          reeducDegree: '',
          reeducSdate: '',
          reeducEdate: '',
          reeducSchool: '',
          reeducProfession: '',
          reeducAwardcert: '',
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
          _mt: "recruitReeduc.getById",
          id: id,
          logType: "Id查询"
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.formValidate.reeducPid = res.data.content[0].reeducPid;
              t.formValidate.reeducPidDis = res.data.content[0].reeducPidDis;
              t.formValidate.reeducLevel = res.data.content[0].reeducLevel;
              t.formValidate.reeducDegree = res.data.content[0].reeducDegree;
              t.formValidate.reeducSdate = res.data.content[0].reeducSdate;
              t.formValidate.reeducEdate = res.data.content[0].reeducEdate;
              t.formValidate.reeducSchool = res.data.content[0].reeducSchool;
              t.formValidate.reeducProfession = res.data.content[0].reeducProfession;
              t.formValidate.reeducAwardcert = res.data.content[0].reeducAwardcert;
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
          typeCode: "education"
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.selecteducation = res.data.content[0].value[0].paramList;
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
        t.formValidate.reeducPid = '';
        t.formValidate.reeducPidDis = '';
        t.formValidate.reeducLevel = '';
        t.formValidate.reeducDegree = '';
        t.formValidate.reeducSdate = '';
        t.formValidate.reeducEdate = '';
        t.formValidate.reeducSchool = '';
        t.formValidate.reeducProfession = '';
        t.formValidate.reeducAwardcert = '';
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
