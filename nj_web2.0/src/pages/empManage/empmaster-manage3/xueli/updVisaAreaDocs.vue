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
            <FormItem label="学校" prop="edSchool">
              <Input v-model="form.edSchool" placeholder="请输入学校"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="学位" prop="edDegree">
              <Input v-model="form.edDegree" placeholder="请输入学位"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <!-- <FormItem label="资料详细要求" prop="docsText">
              <Input
                v-model="form.docsText"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入资料详细要求"
              ></Input>
            </FormItem>-->
            <FormItem label="国家" prop="edCuntry">
              <Input v-model="form.edCuntry" placeholder="请输入国家"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="教育程度" prop="edEducationlevel">
              <Select v-model="form.edEducationlevel">
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in selectEducationlevel"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem label="是否最高学位" prop="edIshighestDis" :label-width="135">
              <RadioGroup v-model="form.edIshighestDis">
                <Radio
                  :label="item.paramCode"
                  v-for="(item,index) in yesOrNo"
                  :key="index"
                >{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="开始时间" prop="edSdate">
              <DatePicker
                type="date"
                placeholder="请选择开始日期"
                style="width: 100%"
                :editable="false"
                v-model="form.edSdate"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="结束时间" prop="edEdate">
              <DatePicker
                type="date"
                placeholder="请选择结束日期"
                style="width: 100%"
                :editable="false"
                v-model="form.edEdate"
              ></DatePicker>
            </FormItem>
          </i-col>
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
        _mt: "empEducation.addOrUpd",
        edEducationlevel: "", // 教育程度
        edIshighestDis: "", // 是否最高学位
        edCuntryDis: "", // 国家
        edSchool: "", // 学校
        edDegree: "", // 学位
        edSpecialty: "", // 专业
        edSdate: "", // 开始时间
        edEdate: "" // 结束时间
      },
      rowId: "",
      ruleValidate: {
        edSchool: [{ required: true, message: "请输入学校", trigger: "blur" }],
        edDegree: [{ required: true, message: "请输入学位", trigger: "blur" }],
        edSpecialty: [
          { required: true, message: "请输入专业", trigger: "blur" }
        ],
        edCuntry: [{ required: true, message: "请选择国家", trigger: "biur" }],
        edEducationlevel: [
          { required: true, message: "请选择教育程度", trigger: "change" }
        ],
        edIshighestDis: [
          { required: true, message: "请选择是否是高学历", trigger: "change" }
        ],
        edSdate: [
          {
            required: true,
            type: "date",
            message: "请选择开始日期",
            trigger: "change"
          }
        ],
        edEdate: [
          {
            required: true,
            type: "date",
            message: "请选择结束日期",
            trigger: "change"
          }
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
    this.getSelect();
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
        _mt: "empEducation.getById",
        id: t.rowId,
        funId: "1",
        logType: "根据id查询信息"
      };
      getDataLevelUserLogin(params)
        .then(res => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0]);
            // t.form = res.data.content[0];
            if (res.data.content[0].edEducationlevel) {
              t.form.edEducationlevel = res.data.content[0].edEducationlevel;
            } else {
              t.form.edEducationlevel = "";
            }

            if (res.data.content[0].edIshighestDis) {
              t.form.edIshighestDis = res.data.content[0].edIshighestDis;
            } else {
              t.form.edIshighestDis = "1";
            }

            if (res.data.content[0].edCuntry) {
              t.form.edCuntry = res.data.content[0].edCuntry;
            } else {
              t.form.edCuntry = "";
            }

            if (res.data.content[0].edSchool) {
              t.form.edSchool = res.data.content[0].edSchool;
            } else {
              t.form.edSchool = "";
            }

            if (res.data.content[0].edDegree) {
              t.form.edDegree = res.data.content[0].edDegree;
            } else {
              t.form.edDegree = "";
            }

            if (res.data.content[0].edSpecialty) {
              t.form.edSpecialty = res.data.content[0].edSpecialty;
            } else {
              t.form.edSpecialty = "";
            }

            if (res.data.content[0].edSdate) {
              t.form.edSdate = res.data.content[0].edSdate;
            } else {
              t.form.edSdate = "";
            }

            if (res.data.content[0].edEdate) {
              t.form.edEdate = res.data.content[0].edEdate;
            } else {
              t.form.edEdate = "";
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
      // data._mt = "empEducation.addOrUpd";
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
        typeCode: "education"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            // t.Visadocpreparer = res.data.content[0].value[0].paramList;
            t.selectEducationlevel = res.data.content[0].value[10].paramList;

            // t.yesOrNo = res.data.content[0].value[0].paramList;
          }
        })
        .catch(() => {
          // this.$Modal.error({
          //   title: this.$t("reminder.err"),
          //   content: this.$t("reminder.errormessage")
          // });
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
