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
          <Row>
            <Col span="11">
              <FormItem :label="$t('教育程度')" prop="edEducationlevel">
                <Select v-model="formValidate.edEducationlevel">
                  <Option
                    :value="item.paramCode"
                    v-for="(item,index) in selectEducationlevel"
                    :key="index"
                  >{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem :label="$t('国家')" prop="edCuntry">
                <Select v-model="formValidate.edCuntry">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in selectEdCuntry"
                    :key="index"
                  >{{item.countryName}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="11">
              <FormItem :label="$t('学校')" prop="edSchool">
                <Input :placeholder="$t('请输入学校')" v-model="formValidate.edSchool"/>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="11">
              <FormItem :label="$t('学位')" prop="edDegree">
                <Input :placeholder="$t('请输入学位')" v-model="formValidate.edDegree"/>
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem :label="$t('专业')" prop="edSpecialty">
                <Input :placeholder="$t('请输入专业')" v-model="formValidate.edSpecialty"/>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="11">
              <FormItem :label="$t('开始时间')" prop="edSdate">
                <DatePicker
                  type="date"
                  :placeholder="$t('请选择开始时间')"
                  v-model="formValidate.edSdate"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem :label="$t('结束时间')" prop="edEdate">
                <DatePicker
                  type="date"
                  :placeholder="$t('请选择结束时间')"
                  v-model="formValidate.edEdate"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">保存</Button>
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
        edEducationlevel: "",
        edCuntry: "",
        edSchool: "",
        edDegree: "",
        edSpecialty: "",
        edSdate: "",
        edEdate: "",
        funId: "1"
      },
      ruleValidate: {
       
        edEducationlevel: [
          {
            required: true,
            message: "请选择教育程度",
            trigger: "blur, change"
          }
        ],
        edCuntry: [
          {
            required: true,
            message: "请选择国家",
            trigger: "blur, change"
          }
        ],
        edSchool: [
          {
            required: true,
            message: "请输入学校",
            trigger: "blur"
          }
        ],
        edDegree: [
          {
            required: true,
            message: "请输入学位",
            trigger: "blur"
          }
        ],
        edSpecialty: [
          {
            required: true,
            message: "请输入专业",
            trigger: "blur"
          }
        ],
        edSdate: [
          {
            required: true,
            type: "date",
            message: "请选择开始时间",
            trigger: "blur, change"
          }
        ],
        edEdate: [
          {
            required: true,
            type: "date",
            message: "请选择结束时间",
            trigger: "blur, change"
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
        _mt: "empEducation.getById",
        id: t.$store.state.empPo.childId1,
        logType: "查询",
        funId: "1"
        // companyId: "0"
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
      if (t.$store.state.empPo.childId1) {
        data.id = t.$store.state.empPo.childId1;
        data.logType = "修改";
      } else {
        data.logType = "新增";
        data.platDcvarDcptid = t.$store.state.empPo.mainId;
      }
      t.$refs.formValidate.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.empPo.childId1) {
                  t.$store.commit(
                    "empPo/addNewArrayChildTable1",
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
                    "empPo/updateArrayChildTable1",
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
      this.$store.commit("empPo/setChildId1", "");
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
