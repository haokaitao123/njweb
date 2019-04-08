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
            <FormItem label="开始时间" prop="weSdate">
              <DatePicker
                type="date"
                placeholder="请选择开始日期"
                style="width: 100%"
                :editable="false"
                v-model="form.weSdate"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="结束时间" prop="weEdate">
              <DatePicker
                type="date"
                placeholder="请选择结束日期"
                style="width: 100%"
                :editable="false"
                v-model="form.weEdate"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="工作单位" prop="weComp">
              <Input v-model="form.weComp" placeholder="请输入工作单位"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="工作部门" prop="weDept">
              <Input v-model="form.weDept" placeholder="请输入工作部门"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="工作职务" prop="wePost">
              <Input v-model="form.wePost" placeholder="请输入工作职务"></Input>
            </FormItem>
          </i-col>
           <i-col span="11" offset="1">
            <FormItem label="薪资" prop="weSalary">
              <Input v-model="form.weSalary" placeholder="请输入薪资"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem label="主要业绩" prop="wePerforman">
              <Input
                v-model="form.wePerforman"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入主要业绩/成果"
              ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="证明人" prop="weContact">
              <Input v-model="form.weContact" placeholder="请输入证明人"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="联系电话" prop="wePhone">
              <Input v-model="form.wePhone" placeholder="请输入联系电话"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem label="离职原因" prop="weLevrason">
             
              <Select v-model="form.weLevrason">
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in selectWelevrason"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
         
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
      selectWelevrason: [],
      selectEdCuntry: [],
      yesOrNo: [],
      form: {
        _mt : "empWorkExp.addOrUpd",
        weSdate: "",
        weEdate: "",
        weComp: "",
        weDept: "",
        wePost: "",
        wePerforman: "",
        weContact: "",
        wePhone: "",
        weSalary: "",
        weLevrason: "",
        note: ""
      },
      rowId: "",
      ruleValidate: {
         weSdate: [
          {
            required: true,
            type: "date",
            message: "请选择开始日期",
            trigger: "change"
          }
        ],
        weEdate: [
          {
            required: true,
            type: "date",
            message: "请选择结束日期",
            trigger: "change"
          }
        ],
        weComp: [
          { required: true, message: "请输入工作单位", trigger: "blur" }
        ],
        weDept: [
          { required: true, message: "请输入工作部门", trigger: "blur" }
        ],
        wePost: [{ required: true, message: "工作职务/岗位", trigger: "blur" }],
        wePerforman: [
          { required: true, message: "主要业绩/成果", trigger: "blur" }
        ],
        weContact: [
          { required: true, message: "请输入证明人", trigger: "blur" }
        ],
        wePhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        weSalary: [
          { required: true, message: "请输入薪资", trigger: "blur" }
        ],
        weLevrason: [
          { required: true, message: "请输入离职原因", trigger: "blur" }
        ],

       
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
        _mt: "empWorkExp.getById",
        id: t.rowId,
        funId: "1",
        logType: "根据id查询信息"
      };
      getDataLevelUserLogin(params)
        .then(res => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0]);
            // t.form = res.data.content[0];
            if (res.data.content[0].weSdate) {
              t.form.weSdate = res.data.content[0].weSdate;
            } else {
              t.form.weSdate = "";
            }
            if (res.data.content[0].weEdate) {
              t.form.weEdate = res.data.content[0].weEdate;
            } else {
              t.form.weEdate = "";
            }
            if (res.data.content[0].weComp) {
              t.form.weComp = res.data.content[0].weComp;
            } else {
              t.form.weComp = "";
            }
            if (res.data.content[0].weDept) {
              t.form.weDept = res.data.content[0].weDept;
            } else {
              t.form.weDept = "";
            }
             if (res.data.content[0].wePost) {
              t.form.wePost = res.data.content[0].wePost;
            } else {
              t.form.wePost = "";
            }
             if (res.data.content[0].wePerforman) {
              t.form.wePerforman = res.data.content[0].wePerforman;
            } else {
              t.form.wePerforman = "";
            }
             if (res.data.content[0].weContact) {
              t.form.weContact = res.data.content[0].weContact;
            } else {
              t.form.weContact = "";
            }
             if (res.data.content[0].wePhone) {
              t.form.wePhone = res.data.content[0].wePhone;
            } else {
              t.form.wePhone = "";
            }
             if (res.data.content[0].weSalary) {
              t.form.weSalary = res.data.content[0].weSalary;
            } else {
              t.form.weSalary = "";
            }
             if (res.data.content[0].weLevrason) {
              t.form.weLevrason = res.data.content[0].weLevrason;
            } else {
              t.form.weLevrason = "";
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
      data._mt = "empWorkExp.addOrUpd";
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
        typeCode: "terminatereason"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.selectWelevrason = res.data.content[0].value[10].paramList;
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
