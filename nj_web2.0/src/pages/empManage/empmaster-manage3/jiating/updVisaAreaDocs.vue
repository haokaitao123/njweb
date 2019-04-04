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
      <Row>
        <Form
          :model="form"
          label-position="right"
          :rules="ruleValidate"
          ref="form"
          :label-width="110"
        >
          <i-col span="11">
            <FormItem label="姓名" prop="fmCname">
              <Input v-model="form.fmCname" placeholder="请输入姓名"></Input>
            </FormItem>
          </i-col>

          <i-col span="11" offset="1">
            <FormItem label="工作单位" prop="fmCompany">
              <Input v-model="form.fmCompany" placeholder="请输入工作单位"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="职务" prop="fmPost">
              <Input v-model="form.fmPost" placeholder="请输入职务"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="联系方式" prop="fmPhone">
              <Input v-model="form.fmPost" placeholder="请输入联系方式"></Input>
            </FormItem>
          </i-col>

          <i-col span="23">
            <FormItem label="是否紧急联系人" prop="fmIsurgent" :label-width="135">
              <RadioGroup v-model="form.fmIsurgent">
                <Radio
                  :label="item.paramCode"
                  v-for="(item,index) in yesOrNo"
                  :key="index"
                >{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>

            <i-col span="23">
              <FormItem label="备注" prop="note">
                <Input
                  v-model="form.note"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请输入备注"
                ></Input>
              </FormItem>
            </i-col>
            <i-col span="23">
              <row type="flex" justify="end">
                <FormItem label prop="comment">
                  <Button type="ghost" @click="close" style="margin-left: 8px">取消</Button>
                  <Button type="primary" @click="save">保存</Button>
                </FormItem>
              </row>
            </i-col>
          </i-col>
        </Form>
      </Row>
    </div>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin,
  uploadFile
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";

export default {
  data() {
    return {
      file: "",
      filekey: "",
      loadingStatus: false,
      // Visadocpreparer: [],
      selectEducationlevel: [],
      selectEdCuntry: [],
      yesOrNo: [
        {
          paramCode: "1",
          paramInfoCn: "是"
        },
        {
          paramCode: "0",
          paramInfoCn: "否"
        }
      ],
      form: {
        _mt: "empFamily.addOrUpd",
        fmCname: "", // 姓名
        fmCompany: "", // 工作单位
        fmPost: "", // 职务
        fmPhone: "", // 联系方式
        fmRelationDis: "", // 成员关系显示字段
        fmIsurgentDis: "" // 是否紧急联系人显示字段
      },
      rowId: "",
      ruleValidate: {
        fmRelationDis: [
          { required: true, message: "请输入成员关系", trigger: "blur" }
        ],
        fmCname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        fmCompany: [
          { required: true, message: "请输入工作单位", trigger: "blur" }
        ],
        fmPost: [{ required: true, message: "请输入职位", trigger: "blur" }],
        fmPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        fmIsurgentDis: [
          { required: true, message: "请选择是否", trigger: "change" }
        ]
      }
    };
  },
  //    主表id
  props: {
    mainId: Number,
    logType: String
  },
  components: {},
  mounted() {
    // this.getSelect();
  },
  methods: {
    // 新增页面
    setRowId(id) {
      const t = this;
      t.rowId = id;
      t.getData();
    },
    // 查询
    getData() {
      const t = this;
      const params = {
        _mt: "empFamily.getById",
        id: t.rowId,
        funId: "1",
        logType: "根据id查询信息"
      };
      getDataLevelUserLogin(params)
        .then(res => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0]);
            // t.form = res.data.content[0];
            if (res.data.content[0].fmRelationDis) {
              t.form.fmRelationDis = res.data.content[0].fmRelationDis;
            } else {
              t.form.fmRelationDis = "";
            }

            if (res.data.content[0].fmIsurgentDis) {
              t.form.fmIsurgentDis = res.data.content[0].fmIsurgentDis;
            } else {
              t.form.fmIsurgentDis = "1";
            }

            if (res.data.content[0].fmCname) {
              t.form.fmCname = res.data.content[0].fmCname;
            } else {
              t.form.fmCname = "";
            }

            if (res.data.content[0].fmCompany) {
              t.form.fmCompany = res.data.content[0].fmCompany;
            } else {
              t.form.fmCompany = "";
            }

            if (res.data.content[0].fmPost) {
              t.form.fmPost = res.data.content[0].fmPost;
            } else {
              t.form.fmPost = "";
            }

            if (res.data.content[0].fmPhone) {
              t.form.fmPhone = res.data.content[0].fmPhone;
            } else {
              t.form.fmPhone = "";
            }

            if (res.data.content[0].note) {
              t.form.note = res.data.content[0].note;
            } else {
              t.form.note = "";
            }
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    save() {
      const t = this;
      const data = deepCopy(t.form);
      // data._mt = "empFamily.addOrUpd";
      data.logType = t.logType;
      data.id = t.rowId;
      data.visaAreaId = t.mainId; // 放入主表id
      if (data.docsTimesta !== undefined) {
        data.docsTimesta =
          data.docsTimesta === ""
            ? ""
            : new Date(data.docsTimesta).format("yyyy-MM-dd");
      }
      if (data.docsTimestop !== undefined) {
        data.docsTimestop =
          data.docsTimestop === ""
            ? ""
            : new Date(data.docsTimestop).format("yyyy-MM-dd");
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.rowId) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$emit("update", res.data.content[0]);
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                  t.$emit("newdata", res.data.content[0]);
                }
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

    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: "educ,selectEdCuntry"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            // t.Visadocpreparer = res.data.content[0].value[0].paramList;
            // t.selectEducationlevel = res.data.content[0].value[10].paramList;
            // t.selectEdCuntry = res.data.content[0].value;
            t.yesOrNo = res.data.content[0].value[0].paramList;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    clear() {
      const t = this;
      t.form = {};
      t.$refs.form.resetFields();
    },
    close() {
      this.rowId = "";
      this.$emit("hideMsg");
      this.clear();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../sass/updateAndAdd";
.btn {
  position: absolute;
  bottom: 20px;
  right: 36px;
}
</style>
