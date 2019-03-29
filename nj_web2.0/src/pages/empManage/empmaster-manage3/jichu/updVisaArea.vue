<template>
  <div class="option-main">
    <Row>
      <Form
        :model="form"
        label-position="right"
        :rules="ruleValidate"
        ref="form"
        :label-width="100"
      >
        <i-col span="11">
          <FormItem :label="$t('雇员姓名')" prop="empnhName">
            <Input v-model="form.empnhName" :placeholder="$t('请输入雇员姓名')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('性别')" prop="empnhGenderDis">
            <Select v-model="form.empnhGenderDis">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectGender"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('曾用名')" prop="empnhPtname">
            <Input v-model="form.empnhPtname" :placeholder="$t('请输入你用过的名字')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('职称')" prop="empnhTechtil">
            <Select v-model="form.empnhTechtil" clearable placeholder="请选择职称">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectTechnicaltitle"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>

        <i-col span="23">
          <FormItem :label="$t('是否考勤')" prop="empnhAttendynDis" :label-width="135">
            <RadioGroup v-model="form.empnhAttendynDis">
              <Radio
                :label="item.paramCode"
                v-for="(item,index) in yesOrNo"
                :key="index"
              >{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('婚姻状况')" prop="empnhMarriageDis" :label-width="135">
            <Select v-model="form.empnhMarriageDis" clearable placeholder="请选择婚姻状况">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectMarriage"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
          <i-col span="11" offset="1">
          <FormItem :label="$t('政治面貌')" prop="empnhPoliticalDis" :label-width="135">
            <Select v-model="form.empnhPoliticalDis">
                        <Option
                          :value="item.paramCode"
                          v-for="(item,index) in selectPolitical"
                          :key="index"
                        >{{item.paramInfoCn}}</Option>
                      </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="参加工作时间" prop="empnhFirstwkdate">
            <DatePicker
              type="date"
              placeholder="请选择参加工作时间"
              :editable="false"
              v-model="form.empnhFirstwkdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="入职日期" prop="empnhEntrydate">
            <DatePicker
              type="date"
              placeholder="请选择入职日期"
              :editable="false"
              v-model="form.empnhEntrydate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>

        <i-col span="23">
          <FormItem :label="$t('备注')" prop="note">
            <Input
              v-model="form.note"
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
// import searchCountry from "../../../components/searchTable/searchCountry";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";

export default {
  data() {
    return {
      //

      form: {},
      yesOrNo: [],
      selectGender: [],
      selectTechnicaltitle: [],
      selectMarriage: [],
      selectPolitical: [],

      ruleValidate: {
        empnhName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        empnhGenderDis: [
          {
            required: true,
            message: "选择性别",
            trigger: "change"
          }
        ],
        empnhTechtil: [
          {
            required: true,
            message: "选择职称",
            trigger: "change"
          }
        ],
        empnhPoliticalDis:[
          {
            required: true,
            message: "选择政治面貌",
            trigger: "change"
          }
        ],
        empnhMarriageDis: [
          {
            required: true,
            message: "请选择婚姻状况",
            trigger: "change"
          }
        ],
        empnhFirstwkdate: [
          {
            required: true,
            type: "date",
            message: "请选择参加工作时间",
            trigger: "change"
          }
        ],
        empnhEntrydate: [
          {
            required: true,
            type: "date",
            message: "请选择参入职日期",
            trigger: "change"
          }
        ],

        empnhPtname: [
          {
            required: true,
            message: "请输入曾用名",
            trigger: "blur"
          }
        ],
        empnhAttendynDis: [
          {
            required: true,
            message: "请选择考勤",
            trigger: "change"
          }
        ]
        
      }
    };
  },
  // 接收主子表页面参数 visaare一般不传
  props: {
    id: Number,
    logType: String,
    index: Number,
    Visaarea: Array
  },
  components: {
    // searchCountry
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    //      获取主表数据 无需变更
    getdata(params) {
      const t = this;
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
    //      查询公共参数
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        // typeCode: "actiontype,emptype,idtype",
        typeCode:
          "gender,button,techlevel,marrystatus,political"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.selectGender = res.data.content[0].value[0].paramList;
            t.yesOrNo = res.data.content[0].value[0].paramList;
            t.selectTechnicaltitle = res.data.content[0].value[3].paramList;
            t.selectMarriage = res.data.content[0].value[1].paramList;
            t.selectPolitical = res.data.content[0].value[2].paramList;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    // getSelect() {
    //   const t = this;
    //   getDataLevelUserLogin({
    //     _mt: "baseParmInfo.getSelectValue",
    //     typeCode: "yesno"
    //   })
    //     .then(res => {
    //       if (isSuccess(res, t)) {
    //         t.yesOrNo = res.data.content[0].value[0].paramList;
    //       }
    //     })
    //     .catch(() => {
    //       this.$Modal.error({
    //         title: this.$t("reminder.err"),
    //         content: this.$t("reminder.errormessage")
    //       });
    //     });
    // },
    //      保存方法
    save() {
      const t = this;
      const data = deepCopy(t.form);
      data._mt = "empEmpnh.addOrUpd";
      data.logType = t.logType;
      data.id = t.id;
      //        若有日期字段 需要进行转换
      if (data.areaTimesta !== undefined) {
        data.areaTimesta =
          data.areaTimesta === ""
            ? ""
            : new Date(data.areaTimesta).format("yyyy-MM-dd");
      }
      if (data.areaTimestop !== undefined) {
        data.areaTimestop =
          data.areaTimestop === ""
            ? ""
            : new Date(data.areaTimestop).format("yyyy-MM-dd");
      }
      //        保存无需关闭页面 无需变更
      this.$refs.form.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.id) {
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
      // t.areaContryDis = "";
      t.form = {};
      this.$refs.form.resetFields();
    }
    //  	选择国家
    // selectCountry() {
    //   const t = this;
    //   t.$refs.searchCountry.getData();
    //   t.openCountry = true;
    // },
    // closeCountry() {
    //   const t = this;
    //   t.$refs.searchCountry.countryCname = "";
    //   t.openCountry = false;
    // },
    // inputCountry(name, id) {
    //   const t = this;
    //   t.form.areaContryDis = name;
    //   t.form.areaContry = id;
    // },
    // dbCountry() {
    //   const t = this;
    //   t.form.areaContryDis = "";
    //   t.form.areaContry = "";
    // }
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

