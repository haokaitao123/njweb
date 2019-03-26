<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <!-- ❌按钮，也即取消 -->
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80" style="height:470px;">
        <!-- 发布日期 -->
        <!--<Row>-->
        <!--<Col span="24">-->
        <!--<Row style="margin-bottom: 0;">-->
        <!--<Col span="12" >-->
        <!--<FormItem prop="cmutNoticePublish" label="发布日期">-->
        <!--<DatePicker type="date" :disabled="editdisabled"
        :readonly="editdisabled" v-model="form.cmutNoticePublish"
        placeholder="请选择选择日期" class="width200"  ></DatePicker>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <!--<Col span="8" offset="3" >-->
        <!--<FormItem prop="cmutPublishHour">-->
        <!--<TimePicker type="time" :disabled="editdisabled" :readonly="editdisabled"
        placeholder="请选择时间"  v-model="form.cmutPublishHour" ></TimePicker>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--</Col>-->
        <!--</Row>-->
        <Row>
          <Col span="12">
          <!-- prop为要传入的字段 -->
            <FormItem
              :label="$t('失效日期')"
              prop="noticeLosttime"
            >
              <DatePicker
                type="date"
                :disabled="editdisabled"
                :readonly="editdisabled"
                :placeholder="$t('请选择失效日期')"
                :editable="false"
                v-model="form.noticeLosttime"
                class="width：200"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem :label="$t('类型')" prop="noticeType">
              <Select
                v-model="form.noticeType"
                :disabled="editdisabled"
                class="width200"
                :placeholder="$t('请选择通知类型')"
              >
                <Option
                  v-for="(item, index) in selectType"
                  :value="item.paramCode"
                  :key="index"
                >{{ item.paramInfoName }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
       <!-- 标题 -->
        <Row>
          <Col span="23">
            <FormItem :label="$t('标题')" prop="noticeTitle">
              <Input
                v-model="form.noticeTitle"
                :disabled="editdisabled"
                placeholder="$t('请输入标题')"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row style="position:relative;z-index: 0;">
          <Col span="23">
            <FormItem :label="$t('内容')" prop="noticeContent">
              <div id="editor" style="z-index: 0;"></div>
              <div id="txt" v-model="form.noticeContent" v-show="false"></div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
            <FormItem :label="$t('附件')">
              <Row :gutter="40">
                <i-col span="17" v-if="file !== ''">
                  <Input v-model="file.name" readonly>
                    <span slot="prepend">
                      <Icon type="folder" size="16"></Icon>
                    </span>
                  </Input>
                </i-col>
                <i-col span="3">
                  <Upload :before-upload="handleUpload" :format="['pdf']" action="1">
                    <Button
                      type="primary"
                      :disabled="editdisabled"
                      icon="ios-cloud-upload-outline"
                    >附件上传</Button>
                  </Upload>
                </i-col>
              </Row>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
            <FormItem :label="$t('状态')" prop="state">
              <Select
                v-model="form.noticeState"
                :disabled="editdisabled"
                :placeholder="$t('请选择状态')"
                transfer
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in CmutNoticeStatelist"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <!-- 备注 -->
        <Row>
          <Col span="23">
            <FormItem :label="$t('备注')">
              <Input
                v-model="form.note"
                :disabled="editdisabled"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{minRows: 2,maxRows: 5}"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row style="margin-top:20px;">
        <Col span="22" offset="1">
          <Row type="flex" justify="end">
            <!-- 取消按钮 -->
            <Button
              type="ghost"
              @click="handleReset"
              v-show="!editdisabled"
              style="margin-right: 8px"
            >取消</Button>
            <!-- 保存按钮 -->
            <Button type="primary" v-show="!editdisabled" @click="handleSubmit">保存</Button>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin,
  uploadFile
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

let editor = new E("#editor");
export default {
  data() {
    return {
      date1: "",
      date2: "",
      editdisabled: false,
      CmutNoticeStatelist: [],
      form: {
        _mt: "orgNotice.addOrUpd",
        logType: "新增",
        // noticePublish: "", //  发布日期
        // createTime: "",
        noticeLosttime: "", //  失效日期
        noticeType: "", //  类型
        noticeTitle: "", //  标题
        noticeContent: "", //  发布内容
        note: "", //  备注
        noticeAttach: "", //  附件
        noticeState: "101"
      },
      ruleValidate: {
        // noticePublish: [
        //   {
        //     required: true,
        //     type: "date",
        //     message: this.$t("请选择日期"),
        //     trigger: "change"
        //   }
        //   // { validator: validatePass1, message: '开始日期要小于结束日期', trigger: 'change' },
        // ],
        // createTime: [
        //   {
        //     required: true,
        //     message: this.$t("请选择创建时间"),
        //     trigger: "change"
        //   }
        // ],
        noticeLosttime: [
          {
            required: true,
            type: "date",
            message: "请选择失效日期",
            trigger: "change"
          }
          // { validator: validatePass2, message: '结束日期不能小于开始日期', trigger: 'change' },
        ],
        noticeType: [
          {
            required: true,
            message: "请选择通知类型",
            trigger: "change"
          }
        ],
        noticeTitle: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        noticeContent: [
          {
            required: true,
            message: "请输入发布内容",
            trigger: "blur"
          }
        ]
      },
      file: ""
    };
  },
  props: {
    selectType: Array,
    id: Number,
    logType: String,
    index: Number,
    state: String
  },
  computed: {},
  components: {},
  mounted() {
    this.getSelect();
    editor.customConfig.onchange = function(html) {
      document.getElementById("txt").innerHTML = html;
    };
    editor.create();
  },
  methods: {
    // 获取下拉状态
    getSelect() {
      const t = this;
      t.dropdownMenuList = [];
      // 下拉请求
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: "orgNoticeStatus"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.CmutNoticeStatelist = res.data.content[0].value[0].paramList.splice(
              1,
              3
            );
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    // 上传pdf
    handleUpload(file) {
      const t = this;
      const fileName = file.name;
      let fileType = fileName
        .slice(fileName.lastIndexOf(".") + 1)
        .toLowerCase();
      if (fileType === "pdf") {
        t.file = file;
        t.uploadFile1();
      } else {
        t.$Message.error({
          content: this.$t("lang_role.cmutnotic.fileerr"),
          duration: "2"
        });
      }
      return false;
    },
    uploadFile1() {
      const t = this;
      const formData = new FormData();
      let kName;
      let vName;
      formData.append("upfile", t.file);
      uploadFile(formData)
        .then(res => {
          for (let i in res.data) {
            kName = i;
            vName = res.data[i];
          }
          t.form.noticeAttach = kName + ":" + vName;
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    }, // 上传pdf--------------------------------------------
    // 修改
    upData(id) {
      const t = this;
     
      getDataLevelUserLogin({
        _mt: "orgNotice.getById",
        id: id,
        logType: "修改"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            // t.form.noticePublish = res.data.content[0].noticePublish;
            // t.form.createTime = res.data.content[0].createTime;
            t.form.noticeLosttime = res.data.content[0].noticeLosttime;
            t.form.noticeType = res.data.content[0].noticeType;
            t.form.noticeTitle = res.data.content[0].noticeTitle;
            t.form.noticeContent = res.data.content[0].noticeContent;
            t.form.noticeState = res.data.content[0].noticeState;
            if (t.form.noticeState !== "101") {
              t.editdisabled = true;
            }
            t.form.note = res.data.content[0].note;
            editor.txt.append(t.form.noticeContent);
            document.getElementById("txt").innerHTML = t.form.noticeContent;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    // 修改---------------------------------------------------
    // 保存
    handleSubmit() {
      const t = this;
      t.form.noticeContent = document.getElementById("txt").innerHTML; //  获取发布内容
      t.$refs.form.validate(valid => {
        if (valid) {
          // t.form.noticePublish = t.form.noticePublish.format('yyyy-MM-dd')  //  获取发布日期
          t.form.noticeLosttime = t.form.noticeLosttime.format(
            "yyyy-MM-dd"
          ); //  获取失效日期
          const data = deepCopy(t.form);
          data.logType = t.logType;
          if (t.logType === this.$t("button.upd")) {
            data.id = t.id;
          }
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t("button.add")) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                  t.$emit("getData", res.data.content[0]);
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$emit("update", res.data.content[0]);
                }
                t.handleReset();
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
    }, // 保存-----------------------------------------------
    // 关闭窗口
    handleReset() {
      const t = this;
      t.editdisabled = false;
      // t.form.noticePublish = "";
      // t.form.createTime = "";
      t.form.noticeLosttime = "";
      t.form.noticeType = "";
      t.form.noticeTitle = "";
      t.form.noticeContent = "";
      t.form.noticeState = "";
      t.form.note = "";
      editor.txt.clear();
      t.file = "";
      this.$refs.form.resetFields();
      t.$emit("closeUp");
    } // 关闭窗口-------------------------------------------
  }
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";

.width200 {
}

.cover .box {
  padding-bottom: 0px;
  padding-bottom: 20px;
}

.cover .box form {
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
}
</style>
