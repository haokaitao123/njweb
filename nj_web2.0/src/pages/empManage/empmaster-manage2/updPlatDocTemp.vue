<template>
  <div class="option-main">
    <Row class="content">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="100"
      >
        <i-col span="11">
          <FormItem :label="$t('雇员姓名')" prop="empnhName">
            <Input v-model="formValidate.empnhName" :placeholder="$t('请输入雇员姓名')"></Input>
          </FormItem>
        </i-col>

        <i-col span="11" offset="1">
          <FormItem :label="$t('曾用名')" prop="empnhPtname">
            <Input v-model="formValidate.empnhPtname" :placeholder="$t('请输入你用过的名字')"></Input>
          </FormItem>
        </i-col>

        <!-- <i-col span="11">
          <FormItem :label="$t('政治面貌')" prop="empnhPolitical" :required="required">
            <Select v-model="thisValue" @on-change="change" :disabled="thisDis">
              <Option v-for="(item,index) in data" :value="item.key" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
        </i-col>-->
        <i-col span="11">
          <FormItem :label="$t('是否考勤')" prop="empnhAttendyn" :label-width="135">
            <RadioGroup v-model="formValidate.empnhAttendyn">
              <Radio
                :label="item.paramCode"
                v-for="(item,index) in yesOrNo"
                :key="index"
              >{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('备注')" prop="note">
            <Input
              v-model="formValidate.note"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              :placeholder="$t('备注')"
            ></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">保存</Button>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin,
  uploadFile
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
  data() {
    return {
      id: "",

      yesOrNo: [],
      formValidate: {
        _mt: "empEmpnh.addOrUpd",

        empnhName: "",
        empnhPtname: "",

        empnhAttendyn: "1",
        note: "",

        funId: "1",
        logType: ""
      },
      ruleValidate: {
        empnhName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],

        empnhPtname: [
          {
            required: true,
            message: "请输入曾用名",
            trigger: "blur"
          }
        ],
        empnhAttendyn: [
          {
            required: true,
            message: "请选择考勤",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {},
  components: {},
  mounted() {
    this.getSelect();
  },
  methods: {
    close() {
      this.clear();
      this.$emit("hideMsg");
    },
    getdata() {
      const t = this;
      if (!t.$store.state.empPo.mainId) {
        return;
      }
      getDataLevelUserLogin({
        _mt: "empEmpnh.getById",
        id: 1000,
        logType: "查询",
        funId: "1"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.formValidate.empnhName = res.data.content[0].empnhName;
            t.formValidate.empnhPtname = res.data.content[0].empnhPtname;
            t.formValidate.empnhAttendyn = res.data.content[0].empnhAttendyn;
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
        typeCode: "yesno"
      })
        .then(res => {
          if (isSuccess(res, t)) {
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
    save() {
      const t = this;
      const data = deepCopy(t.formValidate);
      if (t.$store.state.empPo.mainId) {
        data.id = t.$store.state.empPo.mainId;
        data.logType = "修改";
      } else {
        data.logType = "新增";
      }
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.empPo.mainId) {
                  t.$store.commit("empPo/setMainId", res.data.content[0].id);
                  t.$store.commit(
                    "empPo/addNewArrayMainTable",
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
                    "empPo/updateArrayMainTable",
                    res.data.content[0]
                  );
                }
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
    // handleUpload(file) {
    //   this.file = file;
    //   this.loadingStatus = true;
    //   return false;
    // },
    // uploadLocalFile() {
    //   const t = this;
    //   const formData = new FormData();
    //   formData.append("upfile", t.file);
    //   console.log(formData);
    //   uploadFile(formData)
    //     .then(res => {
    //       for (const key in res.data) {
    //         t.file = { name: key };
    //         t.filekey = res.data[key];
    //         t.formValidate.platDctpAffix = key + ":" + res.data[key];
    //       }
    //       t.$Modal.success({
    //         title: this.$t("reminder.suc"),
    //         content: "上传成功",
    //         onOk: () => {
    //           t.loadingStatus = false;
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       t.$Modal.error({
    //         title: this.$t("reminder.err"),
    //         content: this.$t("reminder.errormessage")
    //       });
    //     });
    // },
    // downloadFile() {
    //   const t = this;
    //   let data = {
    //     _mt: "userMgmt.getfiletoken",
    //     isprivate: true,
    //     logType: "导出",
    //     filekey: t.filekey,
    //     expiresecs: 180
    //   };
    //   getDataLevelUserLogin(data)
    //     .then(res => {
    //       if (isSuccess(res, t)) {
    //         localStorage.pageOpenedListAll = JSON.stringify(
    //           JSON.parse(localStorage.pageOpenedList)
    //         );
    //         if (this.isIE()) {
    //           window.location.href =
    //             pubsource.pub_prvf_downlink +
    //             res.data.content[0].value +
    //             "&fname=" +
    //             encodeURI(t.filekey);
    //         } else {
    //           let doclink =
    //             pubsource.pub_prvf_downlink +
    //             res.data.content[0].value +
    //             "&fname=" +
    //             encodeURI(t.filekey);
    //           let link = document.createElement("a");
    //           link.href = doclink;
    //           link.download = "downloadfiletemp";
    //           link.click();
    //         }
    //         this.$store.state.app.pageOpenedList = JSON.parse(
    //           localStorage.pageOpenedListAll
    //         );
    //         localStorage.pageOpenedList = JSON.stringify(
    //           JSON.parse(localStorage.pageOpenedListAll)
    //         );
    //       }
    //     })
    //     .catch(() => {
    //       t.$Modal.error({
    //         title: this.$t("reminder.err"),
    //         content: this.$t("reminder.errormessage")
    //       });
    //     });
    // },
    clear() {
      const t = this;
      // t.formValidate.platDctpCode = "";
      // t.formValidate.platDctpName = "";
      // t.formValidate.platDctpValid = "";
      // t.formValidate.platDctpComment = "";
      // t.platDctpValidDis = "";
      // t.file = "";
      t.formValidate.empnhName = "";
      t.formValidate.empnhPtname = "";
      t.formValidate.empnhAttendyn = "";
      t.formValidate.note = "";
      t.$refs.formValidate.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.option-main {
  position: relative;
  height: 500px;
  .btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
