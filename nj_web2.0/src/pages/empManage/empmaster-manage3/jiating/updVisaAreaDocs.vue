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
          
          <i-col span="工作单位" offset="1">
            <FormItem label="工作单位" prop="fmCompany">
              <Input v-model="form.fmCompany" placeholder="请输入工作单位"></Input>
            </FormItem>
          </i-col> 
          <i-col span="11" offset="1">
            <FormItem label="职务" prop="fmPost">
              <Input v-model="form.fmPost" placeholder="请输入职务"></Input>
            </FormItem>
          </i-col>
           <i-col span="11" >
            <FormItem label="联系方式" prop="fmPhone">
              <Input v-model="form.fmPost" placeholder="请输入联系方式"></Input>
            </FormItem>
          </i-col>
          <!-- <i-col span="23"> -->
            <!-- <FormItem label="资料详细要求" prop="docsText">
              <Input
                v-model="form.docsText"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入资料详细要求"
              ></Input>
            </FormItem>-->
            <!-- <FormItem label="国家" prop="edCuntry">
              <Select v-model="form.edCuntry">
                <Option
                  :value="item.id"
                  v-for="(item,index) in selectEdCuntry"
                  :key="index"
                >{{item.countryName}}</Option>
              </Select>
            </FormItem>
          </i-col> -->
          <!-- <i-col span="11">
            <FormItem label="职务" prop="fmPost">
              <Select v-model="form.fmPost">
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in selectEducationlevel"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col> -->
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
            <!-- </i-col>
          <i-col span="24">
            <i-col span="6">
              <FormItem label="参考附件" prop="docsAttr">
                <Upload :before-upload="handleUpload" action=" ">
                  <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('button.brw')}}</Button>
                </Upload>
              </FormItem>
            </i-col>
            <i-col span="18">
              <span v-if="file !== '' ">
                <i-col span="22">
                  <Input v-model="file.name" readonly="readonly">
                    <span slot="prepend">
                      <Icon type="folder" size="16"></Icon>
                    </span>
                  </Input>
                </i-col>
                <i-col span="2">
                  <Button type="text" @click="uploadFile1" v-if="loadingStatus">{{$t('button.upl')}}</Button>
                  <Button
                    type="text"
                    @click="uploadFile2"
                    v-if="!loadingStatus"
                  >{{$t('button.dwl')}}</Button>
                </i-col>
              </span>
            </i-col>
            </i-col>-->
            <!--<i-col span="23" >-->
            <!--<FormItem label="参考附件" >-->
            <!--<Input v-model="form.docsAttr"  placeholder="请输入参考附件"></Input>-->
            <!--</FormItem>-->
            <!--</i-col>-->
            <!-- <i-col span="23"></i-col> -->
            <!-- <i-col span="11">
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
            </i-col> -->
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
      yesOrNo: [],
      form: {},
      rowId: "",
      ruleValidate: {
        fmCname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        fmCompany: [{ required: true, message: "请输入工作单位", trigger: "blur" }],
        fmPost: [
          { required: true, message: "请输入职位", trigger: "blur" }
        ],
        fmPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        fmIsurgent: [
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
            t.form = res.data.content[0];
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
      data._mt = "empFamily.addOrUpd";
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
    handleUpload(file) {
      this.file = file;
      this.loadingStatus = true;
      return false;
    },
    uploadFile1() {
      const t = this;
      const formData = new FormData();
      formData.append("upfile", t.file);
      uploadFile(formData)
        .then(res => {
          for (const key in res.data) {
            t.filekey = res.data[key];
            t.form.docsAttr = key + ":" + res.data[key];
          }
          t.$Modal.success({
            title: this.$t("reminder.suc"),
            content: this.$t("reminder.uploadsuccess"),
            onOk: () => {
              t.loadingStatus = false;
            }
          });
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    uploadFile2() {
      const t = this;
      let data = {
        _mt: "userMgmt.getfiletoken",
        isprivate: true,
        logType: "导出",
        filekey: t.filekey,
        expiresecs: 180
      };
      getDataLevelUserLogin(data)
        .then(res => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(
              JSON.parse(localStorage.pageOpenedList)
            );
            if (this.isIE()) {
              window.location.href =
                pubsource.pub_prvf_downlink +
                res.data.content[0].value +
                "&fname=" +
                encodeURI(t.filekey);
            } else {
              let doclink =
                pubsource.pub_prvf_downlink +
                res.data.content[0].value +
                "&fname=" +
                encodeURI(t.filekey);
              let link = document.createElement("a");
              link.href = doclink;
              link.download = "downloadfiletemp";
              link.click();
            }
            this.$store.state.app.pageOpenedList = JSON.parse(
              localStorage.pageOpenedListAll
            );
            localStorage.pageOpenedList = JSON.stringify(
              JSON.parse(localStorage.pageOpenedListAll)
            );
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: "button,selectEducationlevel,selectEdCuntry"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            // t.Visadocpreparer = res.data.content[0].value[0].paramList;
            t.selectEducationlevel = res.data.content[0].value[10].paramList;
            t.selectEdCuntry = res.data.content[0].value;
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
