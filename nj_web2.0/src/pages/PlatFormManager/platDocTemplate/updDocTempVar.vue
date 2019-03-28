<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          label-position="right"
          :label-width="100"
        >
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.docVar.platDcvarCode')" prop="platDcvarCode">
              <Input
                v-model="formValidate.platDcvarCode"
                :placeholder="$t('lang_platdoc.docVar.p_platDcvarCode')"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_platdoc.docVar.platDcvarCname')" prop="platDcvarCname">
              <Input
                v-model="formValidate.platDcvarCname"
                :placeholder="$t('lang_platdoc.docVar.p_platDcvarCname')"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.docVar.platDcvarEname')" prop="platDcvarEname">
              <Input
                v-model="formValidate.platDcvarEname"
                :placeholder="$t('lang_platdoc.docVar.p_platDcvarEname')"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platdoc.docVar.platDcvarDesc')" prop="platDcvarDesc">
              <Input
                v-model="formValidate.platDcvarDesc"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_platdoc.docVar.p_platDcvarDesc')"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platdoc.docVar.platDcvarComment')" prop="platDcvarComment">
              <Input
                v-model="formValidate.platDcvarComment"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_platdoc.docVar.p_platDcvarComment')"
              ></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
  data() {
    return {
      logType: "",
      id: "",
      formValidate: {
        _mt: "platDocVar.addOrUpd",
        platDcvarCode: "",
        platDcvarCname: "",
        platDcvarEname: "",
        platDcvarDesc: "",
        platDcvarComment: "",
        platDcvarDcptid: "",
        funId: "1"
      },
      ruleValidate: {
        platDcvarCode: [
          {
            required: true,
            message: this.$t("lang_platdoc.docVar.rule_platDcvarCode"),
            trigger: "blur"
          }
        ],
        platDcvarCname: [
          {
            required: true,
            message: this.$t("lang_platdoc.docVar.rule_platDcvarCname"),
            trigger: "blur"
          }
        ],
        platDcvarEname: [
          {
            required: true,
            message: this.$t("lang_platdoc.docVar.rule_platDcvarEname"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    logType: String
  },
  components: {},
  mounted() {},
  methods: {
    getFormData() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "platDocVar.getById",
        id: t.$store.state.docTemp.childId1,
        logType: this.$t("button.ser"),
        funId: "1",
        companyId: "0"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.formValidate.platDcvarCode = res.data.content[0].platDcvarCode;
            t.formValidate.platDcvarCname = res.data.content[0].platDcvarCname;
            t.formValidate.platDcvarEname = res.data.content[0].platDcvarEname;
            t.formValidate.platDcvarDesc = res.data.content[0].platDcvarDesc;
            t.formValidate.platDcvarComment =
              res.data.content[0].platDcvarComment;
            t.formValidate.platDcvarDcptid =
              res.data.content[0].platDcvarDcptid;
          }
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
      const data = deepCopy(t.formValidate);
      if (t.$store.state.docTemp.childId1) {
        data.id = t.$store.state.docTemp.childId1;
        data.logType = "修改";
      } else {
        data.logType = "新增";
        data.platDcvarDcptid = t.$store.state.docTemp.mainId;
      }
      t.$refs.formValidate.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.docTemp.childId1) {
                  t.$store.commit(
                    "docTemp/addNewArrayChildTable1",
                    res.data.content[0]
                  );
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$store.commit(
                    "docTemp/updateArrayChildTable1",
                    res.data.content[0]
                  );
                }
                t.clear();
                t.close();
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
      const t = this;
      t.formValidate.platDcvarCode = "";
      t.formValidate.platDcvarCname = "";
      t.formValidate.platDcvarEname = "";
      t.formValidate.platDcvarDesc = "";
      t.formValidate.platDcvarComment = "";
      // 清空子表Id
      this.$store.commit("docTemp/setChildId1", "");
      t.$refs.formValidate.resetFields();
    },
    close() {
      this.clear();
      this.$emit("hideMsg");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
.box {
  height: 560px;
  overflow: hidden;
  .content {
    left: 20px;
    right: 20px;
    overflow-y: auto;
    position: absolute;
    height: 420px;
  }
}
.btn {
  position: absolute;
  bottom: 20px;
  right: 36px;
}
</style>
