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
            <FormItem label="证明人" prop="weContact">
              <Input v-model="form.weContact" placeholder="请输入证明人"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="联系电话" prop="wePhone">
              <Input v-model="form.wePhone" placeholder="请输入联系电话"></Input>
            </FormItem>
          </i-col>
           <i-col span="11" >
            <FormItem label="薪资" prop="weSalary">
              <Input v-model="form.weSalary" placeholder="请输入薪资"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem label="离职原因" prop="weLevrason">
              <Input
                v-model="form.weLevrason"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入离职原因"
              ></Input>
            </FormItem>
            
          </i-col>
          <!-- <i-col span="11">
            <FormItem label="教育程度" prop="edEducationlevel">
              <Select v-model="form.edEducationlevel">
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in selectEducationlevel"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col> -->
          <!-- <i-col span="23">
            <FormItem label="是否最高学位" prop="edIshighestDis" :label-width="135">
              <RadioGroup v-model="form.edIshighestDis">
                <Radio
                  :label="item.paramCode"
                  v-for="(item,index) in yesOrNo"
                  :key="index"
                >{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem> -->
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
        weContact: [{ required: true, message: "请输入证明人", trigger: "blur" }],
        wePhone: [{ required: true, message: "请输入证明人电话", trigger: "blur" }],
        weSalary: [
          { required: true, message: "请输入薪资", trigger: "blur" }
        ],
        weLevrason: [
          { required: true, message: "请输入离职原因", trigger: "blur" }
        ],
        
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
        _mt: "empWorkExp.getById",
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
