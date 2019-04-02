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
          <FormItem label="唯一编号" prop="numberCode">
            <Input v-model="form.numberCode" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="雇员姓名" prop="empnhName">
            <Input v-model="form.empnhName" placeholder="请输入雇员姓名"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="姓名拼音" prop="empnhPinyin">
            <Input v-model="form.empnhPinyin"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="曾用名" prop="empnhPtname">
            <Input v-model="form.empnhPtname" placeholder="请输入你用过的名字"></Input>
          </FormItem>
        </i-col>
         <i-col span="11" >
          <FormItem label="部门名称" prop="deptIdDis">
            <Input v-model="form.deptIdDis" placeholder="请输入部门名称"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="岗位名称" prop="postIdDis">
            <Input v-model="form.postIdDis" placeholder="请输入岗位名称"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="直接上级" prop="empnhPmpDis">
            <Input v-model="form.empnhPmpDis" placeholder="请输入直接上级"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="证件类型" prop="empnhIdtypeDis">
            <Select v-model="form.empnhIdtypeDis">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectIdtype"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <!-- <i-col span="11" offset="1">
          <FormItem label="员工类型" prop="empnhIdtypeDis">
            <Select v-model="form.empnhIdtypeDis">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectIdtype"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col> -->
        <i-col span="11" >
          <FormItem label="证件号码" prop="empnhIdno">
            <Input v-model="form.empnhIdno" placeholder="请输入证件号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="生效日期" prop="empnhSday">
            <DatePicker
              type="date"
              placeholder="请选择生效日期"
              :editable="false"
              v-model="form.empnhSday"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="证件到期日" prop="empnhEday">
            <DatePicker
              type="date"
              placeholder="请选择证件到期日"
              :editable="false"
              v-model="form.empnhEday"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="开户银行" prop="empnhSalbank">
            <Select v-model="form.empnhSalbank" clearable placeholder="请选择开户银行">
              <Option
                :value="item.empnhRegtype"
                v-for="(item,index) in selectSalbank"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="性别" prop="empnhGenderDis">
            <Select v-model="form.empnhGenderDis">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectGender"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="出生日期" prop="empnhBirthdate">
            <DatePicker
              type="date"
              placeholder="请选择出生日期"
              :editable="false"
              v-model="form.empnhBirthdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="手机号码" prop="empnhMobile">
            <Input v-model="form.empnhMobile" placeholder="请输入手机号码"></Input>
          </FormItem>
        </i-col>
         <i-col span="11" offset="1">
          <FormItem label="居住地址" prop="empnhResiaddr">
            <Input v-model="form.empnhResiaddr" placeholder="请输入居住地址"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="户籍地址" prop="empnhRegaddr">
            <Input v-model="form.empnhRegaddr" placeholder="请输入户籍地址"></Input>
          </FormItem>
        </i-col>
         <i-col span="11" offset="1">
          <FormItem label="户籍性质" prop="empnhNation">
            <Select v-model="form.empnhRegtype" clearable placeholder="请选择户籍性质">
              <Option
                :value="item.empnhRegtype"
                v-for="(item,index) in selectRegtype"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="个人邮箱" prop="empnhPersmail">
            <Input v-model="form.empnhPersmail" placeholder="请输入个人邮箱"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="公司邮箱" prop="empnhCompmail">
            <Input v-model="form.empnhCompmail" placeholder="请输入公司邮箱"></Input>
          </FormItem>
        </i-col>
         <i-col span="11" >
          <FormItem label="QQ号码" prop="empnhQq">
            <Input v-model="form.empnhQq" placeholder="请输入QQ号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="微信号" prop="empnhWechat">
            <Input v-model="form.empnhWechat" placeholder="请输入微信号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="工作地点" prop="empnhWklocat">
            <Input v-model="form.empnhWklocat" placeholder="请选择工作地点"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="民族" prop="empnhNation">
            <Select v-model="form.empnhNation" clearable placeholder="请选择民族">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectNation"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="婚姻状况" prop="empnhMarriageDis">
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
          <FormItem label="政治面貌" prop="empnhPoliticalDis" >
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
          <FormItem label="职称" prop="empnhTechtil">
            <Select v-model="form.empnhTechtil" clearable placeholder="请选择职称">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectTechnicaltitle"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
         <i-col span="11">
          <FormItem label="职称专业" prop="empnhTechspec">
            <Input v-model="form.empnhTechspec" placeholder="请输入职称专业"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="职称取得时间" prop="empnhTechdate">
            <DatePicker
              type="date"
              placeholder="请选择职称取得时间"
              :editable="false"
              v-model="form.empnhTechdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>


        <i-col span="23">
          <FormItem label="是否考勤" prop="empnhAttendynDis" >
            <RadioGroup v-model="active">
              <Radio label="1">
                
                <span>是</span>
              </Radio>
              <Radio label="0">
                
                <span>否</span>
              </Radio>
              <!-- <Radio
                :label="item.paramCode"
                v-for="(item,index) in yesOrNo"
                :key="index"
              >{{item.paramInfoCn}}</Radio>-->
            </RadioGroup>
          </FormItem>
        </i-col>
        
        
        
        <i-col span="11" >
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
         <i-col span="11" offset="1">
          <FormItem label="转正日期" prop="empnhIrmentdate">
            <DatePicker
              type="date"
              placeholder="请选择转正日期"
              :editable="false"
              v-model="form.empnhIrmentdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem label="银行账号" prop="empnhSalaccount">
            <Input v-model="form.empnhSalaccount" placeholder="请输入银行账号"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1" >
          <FormItem label="户号" prop="empnhSalaccname">
            <Input v-model="form.empnhSalaccname" placeholder="请输入户号"></Input>
          </FormItem>
        </i-col>
         <!-- <i-col span="22"  >
              <FormItem label="操作记录" prop="unitAgentno">
                <Input v-model="formValidate.unitAgentno" :placeholder="$t('lang_organization.orgframe.unitAgentnoInp')"></Input>
              </FormItem>
            </i-col> -->
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
      selectNation:[],
      selectIdtype:[],
      selectRegtype:[],
      selectSalbank:[],
      active:'1',
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
        empnhPoliticalDis: [
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
        typeCode: "gender,techlevel,marrystatus,political"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.selectNation=res.data.content[0].value[0].paramList;//待解决 民族
            t.selectIdtype=res.data.content[0].value[0].paramList;//待解决 员工类型
            t.selectRegtype=res.data.content[0].value[0].paramList;//待解决 户籍性质
            t.selectSalbank=res.data.content[0].value[0].paramList;//待解决 开户银行
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
  overflow-y: auto;
  .btn {
    position: relative;
    bottom: 20px;
    right: -600px;
  }
}
</style>

