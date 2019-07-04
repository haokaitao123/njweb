<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 11px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
          <Spin size="large"
              fix
              v-if="spinShow"></Spin>
        <Row style="max-height: 460px;overflow-y: auto;" ref="scrollBox">
          <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
            <i-col span="11">
              <FormItem label="合同编号" prop="numberCode">
                <Input v-model="form.numberCode" :disabled="true"/>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="员工姓名" prop="empnhName">
                <!--绑定双击清除方法-->
                <span @dblclick="disabled?'':clearUserid()">
                  <!--v-model绑定显示字段-->
                  <Input
                    v-model="empnhName"
                    icon="search"
                    :readonly="true"
                    :disabled="disabled"
                    placeholder="请选择员工"
                    @on-click="disabled ? '' : pickData3()"
                  />
                </span>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="部门" prop="unitFname">
                <Input v-model="unitFname" disabled="disabled" placeholder="请输入部门名称"/>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="岗位" prop="postFname">
                <Input v-model="postFname" disabled="disabled" placeholder="请输入岗位名称"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="原合同开始日" prop="contrStrdate">
                <Input v-model="form.contrStrdate" disabled="disabled" placeholder="请输入原合同开始日"/>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="原合同到期日" prop="contrEndtdate">
                <Input v-model="form.contrEndtdate" disabled="disabled" placeholder="请输入原合同到期日"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="原签订时间" prop="contrPastdate">
                <Input v-model="form.contrPastdate" disabled="disabled" placeholder="请输入原签订时间"/>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="合同期限" prop="contrPeriod">
                <Select v-model="form.contrPeriod"
                :clearable="!disabled" 
                :disabled="disabled" 
                placeholder="选择合同期限"
                @on-change="contPeriodSelect">
                  <Option
                    :value="item.paramCode"
                    v-for="(item,index) in selectContperiod"
                    :key="index"
                  >{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同开始日" prop="contrSdate">
                <DatePicker
                  type="date"
                  placeholder="选择合同开始日"
                  :editable="false"
                  :disabled="disabled"
                  :readonly="disabled"
                  v-model="form.contrSdate"
                  @on-change="contSdateChange"
                  format="yyyy-MM-dd"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="合同到期日" prop="contrEdate">
                <DatePicker
                  type="date"
                  placeholder="选择合同到期日"
                  disabled="disabled"
                  readonly="readonly"
                  :editable="false"
                  v-model="form.contrEdate"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="签订时间" prop="contrSigndate">
                <DatePicker
                  type="date"
                  placeholder="选择签订时间"
                  :disabled="disabled"
                  :readonly="disabled"
                  :editable="false"
                  v-model="form.contrSigndate"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="生效日期" prop="contValiddate">
                <DatePicker
                  type="date"
                  placeholder="选择生效日期"
                  :editable="false"
                  :disabled="disabled"
                  :readonly="disabled"
                  v-model="form.contValiddate"
                  format="yyyy-MM-dd"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="失效日期" prop="contInvdate">
                <DatePicker
                  type="date"
                  placeholder="选择失效日期"
                  :disabled="disabled"
                  :readonly="disabled"
                  :editable="false"
                  v-model="form.contInvdate"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </i-col>
           
            <i-col span="22">
              <FormItem label="备注" prop="note">
                <Input
                  v-model="form.note"
                  :disabled="disabled"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请输入备注..."
                />
              </FormItem>
            </i-col>
          </Form>
        </Row>
      </div>
      <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>
      <Button
        type="primary"
        @click="handleSubmit"
        class="btn"
        v-show="!disabled"
      >{{$t('button.sav')}}</Button>
    </div>
    <!--弹出选择页面布局 无需变更-->

    <transition name="fade">
      <!--  员工信息的弹出框 v-show="openPickUser"绑定了一个判断员工信息弹窗是否显示隐藏的数据   @closeEmp="closeEmp" 关闭员工信息弹窗事件  @inputEmp="inputEmp" 员工信息弹出框input选中事件  -->
      <searchContract
        v-show="openPickUser"
        :params="params3"
        :searchCloumns="searchCloumns3"
        @closeUp="closeEmp"
        @changeinput="inputEmp"
        ref="searchContract"
      ></searchContract>
    </transition>
    <!--直接上級-->
    <!-- <transition name="fade">
            <searchEmpMaster v-show="openEmpMaster"
                             @closeEmp="closeEmp"
                             @inputEmp="inputEmp"
                             ref="searchEmpMaster"></searchEmpMaster>
    </transition>-->
  </div>
</template>
<script>
import {
  getDataLevelUserLoginSenior,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import searchEmpMaster from "../../../components/searchTable/searchEmpnhMaster";
import searchContract from "../../../components/searchTable/searchContract";

export default {
  data() {
    const compareTime = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请选择生效日期"));
      } else {
        //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
        let startTimeNum = new Date(this.form.contValiddate).getTime();
        let endTimeNum = new Date(this.form.contInvdate).getTime();
        if (startTimeNum > endTimeNum) {
          callback(new Error("生效日期不能大于失效日期"));
        }
        callback();
      }
    };

    return {
      spinShow:false,
      type: "",
      distype: false,
      disabled: false,
      forbidden: null,
      popup: "",
      value: "",
      selectEmptype: [],
      selectContrpertype: [],
      selectContperiod: [],
      selectWorktimetype: [],
      selectProbperiod: [],
      form: {
        _mt: "empConrenewal.addOrUpd",
        numberCode: "XXXXXX",
        empId: "",
        deptId: "",
        postId: "",
        contrStrdate: "",
        contrEndtdate: "",
        contrPastdate: "",
        contrPeriod: "",
        contrSdate: "",
        contrEdate: "",
        contrSigndate: "",
        contrConf: "",
        contValiddate: "",
        contInvdate: "",
        note: "", //备注
        funId: "1",
        logType: ""
      },
      openDeptPick: false,
      openPost: false,
      openPickUser: false,
      empnhName: "",
      unitFname: "",
      postFname: "",
      //合同信息
      params3: {
        _mt: "empContractinfo.getPage",
        rows: 10,
        page: 1,
        sort: "id",
        order: "asc",
        logType: "合同查询",
        state: "02valid"
      },
      searchCloumns3: [
        {
          title: "员工姓名",
          key: "empnhName",
          sortable: "custom"
        },
        {
          title: "合同编号",
          key: "numberCode"
        },
        {
          title: "部门名称",
          key: "unitFname",
          sortable: "custom"
        },
        {
          title: "岗位名称",
          key: "postFname",
          sortable: "custom"
        },
        {
          title: "原合同开始日",
          key: "contSdate",
          sortable: "custom"
        }
      ],
      //岗位

      ruleValidate: {
        empId: [
          { required: true, message: "请选择员工姓名", trigger: "change" }
        ],
        deptId: [
          { required: true, message: "请选择部门名称", trigger: "change" }
        ],
        postId: [
          { required: true, message: "请选择岗位名称", trigger: "change" }
        ],
        contrStrdate: [
          { required: true, message: "请选择原合同开始日", trigger: "blur" }
        ],
        contrEndtdate: [
          { required: true, message: "请选择原合同到期日", trigger: "blur" }
        ],
        contrPastdate: [
          { required: true, message: "请选择原签订时间", trigger: "blur" }
        ],
        contrSdate: [
          {
            required: true,
            type: "date",
            message: "请选择合同开始日",
            trigger: "blur"
          }
        ],
        contrEdate: [
          {
            required: true,
            type: "date",
            message: "请选择合同到期日",
            trigger: "blur"
          }
        ],
        contrSigndate: [
          {
            required: true,
            type: "date",
            message: "请选择签订时间",
            trigger: "blur"
          }
        ],

        contrPeriod: [
          { required: true, message: "请选择合同期限", trigger: "blur" }
        ],
        contrConf: [
          { required: true, message: "请选择员工确认", trigger: "blur" }
        ],

        contSigndate: [
          {
            required: true,
            type: "date",
            message: "请选择签订时间",
            trigger: "blur"
          }
        ],
        contValiddate: [
          {
            required: true,
            type: "date",
            validator: compareTime,
            trigger: "change"
          }
        ]
      }
    };
  },
  props: {
    id: Number,
    logType: String,
    index: Number
  },
  components: {
    // searchDept,
    // searchPost,
    searchContract //员工信息弹出框组件
    //searchEmpMaster,
  },
  methods: {
    //上级清除员工选择
    dbclean() {
      const t = this;
      t.form.empnhName = "";
      t.form.empId = "";
      t.form.unitFname = "";
      t.form.deptId = "";
      t.form.postFname = "";
      t.form.postId = "";
    },
    getData(id) {
      const t = this;
      t.spinShow = true
      getDataLevelUserLogin({
        _mt: "empConrenewal.getById",
        id: id,
        funId: "1",
        logType: "根据id获取数据"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.form.numberCode = res.data.content[0].numberCode;
            t.form.deptId = res.data.content[0].deptId;
            t.form.postId = res.data.content[0].postId;
            t.form.empId = res.data.content[0].empId;
            t.form.contrStrdate = res.data.content[0].contrStrdate;
            t.form.contrEndtdate = res.data.content[0].contrEndtdate;
            t.form.contrPastdate = res.data.content[0].contrPastdate;
            t.form.contrSdate = res.data.content[0].contrSdate;
            t.form.contrEdate = res.data.content[0].contrEdate;
            t.form.contrPeriod = res.data.content[0].contrPeriod;
            t.form.contrSigndate = res.data.content[0].contrSigndate;
            t.form.contrConf = res.data.content[0].contrConf;
            t.form.contValiddate = res.data.content[0].contValiddate;
            t.form.contInvdate = res.data.content[0].contInvdate;
            t.form.state = res.data.content[0].state;
            t.form.note = res.data.content[0].note;
            t.empnhName = res.data.content[0].empnhName;
            t.postFname = res.data.content[0].postFname;
            t.unitFname = res.data.content[0].unitFname;
            t.contPeriodDis = res.data.content[0].contPeriodDis;

            if (id === res.data.content[0].companyId) {
              t.forbidden = "disabled";
              t.distype = true;
            } else {
              t.forbidden = null;
              t.distype = false;
            }
          }
        })
        .catch(() => {
          this.$Message.error(this.$t("reminder.errormessage"));
        })
        .finally(() => {
                    t.spinShow = false
        });
    },
    getSelect(type) {
      //获取下拉列表数据
      const t = this;
      //emptype员工类型
      //contrpertype,合同类别
      //contperiod,合同期限
      //noticedays,到期通知天数
      //confidential,保密协议
      //worktimetype,合同工作时间
      //probperiod,试用期限

      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode:
          "emptype,contrpertype,contperiod,worktimetype,probperiod,haveyn"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.selectEmptype = res.data.content[0].value[0].paramList;

            t.selectContrpertype = res.data.content[0].value[1].paramList;

            t.selectContperiod = res.data.content[0].value[2].paramList;

            t.selectWorktimetype = res.data.content[0].value[3].paramList;

            t.selectProbperiod = res.data.content[0].value[4].paramList;

            t.selectAttendy = res.data.content[0].value[5].paramList;
          }
        })
        .catch(() => {
          this.$Message.error(this.$t("reminder.errormessage"));
        });
    },
    handleSubmit() {
      const t = this;
      const data = deepCopy(t.form);
      data.logType = t.logType;
      if (t.type === "02dept" && data.unitType === "01company") {
        t.$Modal.success({
          title: this.$t("reminder.err"),
          content: this.$t("lang_organization.orgframe.reminderErr")
        });
        return;
      }
      if (t.logType === this.$t("button.upd")) {
        data.id = t.id;
      }
      if (data.contValiddate !== undefined) {
        data.contValiddate = new Date(data.contValiddate).format("yyyy-MM-dd");
      }
      if (data.contrSdate !== undefined) {
        data.contrSdate = new Date(data.contrSdate).format("yyyy-MM-dd");
      }
      if (data.contrEdate !== undefined) {
        data.contrEdate = new Date(data.contrEdate).format("yyyy-MM-dd");
      }
      if (data.contrSigndate !== undefined) {
        data.contrSigndate = new Date(data.contrSigndate).format("yyyy-MM-dd");
      }
      if (data.contrStrdate !== undefined) {
        data.contrStrdate = new Date(data.contrStrdate).format("yyyy-MM-dd");
      }
      if (data.contrEndtdate !== undefined) {
        data.contrEndtdate = new Date(data.contrEndtdate).format("yyyy-MM-dd");
      }
      if (data.contrPastdate !== undefined) {
        data.contrPastdate = new Date(data.contrPastdate).format("yyyy-MM-dd");
      }
      if (data.contInvdate !== undefined) {
        data.contInvdate =
          data.contInvdate === ""
            ? ""
            : new Date(data.contInvdate).format("yyyy-MM-dd");
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          getDataLevelUserLoginSenior(data)
            .then(res => {
              if (isSuccess(res, t)) {
                //t.$emit("closeUp");
                t.handleReset();
                if (t.logType === this.$t("button.add")) {
                  this.$Message.success(this.$t("reminder.addsuccess"));
                 // t.$refs.form.resetFields();
                  t.$emit("getData", res.data.content[0]);
                } else {
                  this.$Message.success(this.$t("reminder.updsuccess"));
                  t.$emit("update", res.data.content[0]);
                }
              }
            })
            .catch(() => {
              this.$Message.error(this.$t("reminder.errormessage"));
            });
        }else{
					this.$nextTick(function(){
					        let tt = document.querySelectorAll('.ivu-form-item-error');
					        if(tt[0].parentNode.offsetTop<this.$refs.scrollBox.$el.scrollTop){
					            this.$refs.scrollBox.$el.scrollTop = tt[0].parentNode.offsetTop
					        }
					    }) 
				}
      });
    },

    /*选择员工*/
    closeEmp() {
      const t = this;
      t.openPickUser = false;
    },
    inputEmp(row) {
      const t = this;
      t.empnhName = row.empnhName;
      t.form.empId = row.empId;
      t.unitFname = row.unitFname;
      t.form.deptId = row.deptId;
      t.postFname = row.postFname;
      t.form.postId = row.postId;

      t.form.contrStrdate = row.contSdate;
      t.form.contrEndtdate = row.contEdate;
      t.form.contrPastdate = row.contSigndate;
    },
    //清除员工信息
    clearUserid() {
      const t = this;
      t.empnhName = "";
      t.form.empId = "";
      t.unitFname = "";
      t.form.deptId = "";
      t.postFname = "";
      t.form.postId = "";

      t.form.contrStrdate = "";
      t.form.contrEndtdate = "";
      t.form.contrPastdate = "";
    },
    //打开员工信息弹出框
    pickData3() {
      const t = this;
      t.$refs.searchContract.getData(t.params3); //调用员工信息子组件获取列表数据方法 列表回显数据
      t.openPickUser = true; //打开员工信息弹出框
    },
    handleReset() {
      const t = this;
      t.$refs.scrollBox.$el.scrollTop = "0";
      t.$refs.form.resetFields();
      t.form.numberCode = "XXXXXX";
      t.form.empId = "";
      t.form.deptId = "";
      t.form.postId = "";
      t.form.contrStrdate = "";
      t.form.contrEndtdate = "";
      t.form.contrPastdate = "";
      t.form.contrPeriod = "";
      t.form.contrSdate = "";
      t.form.contrEdate = "";
      t.form.contrSigndate = "";
      t.form.contrConf = "";
      t.form.contValiddate = "";
      t.form.contInvdate = "";
      t.form.note = "";
      t.empnhName = "";
      t.postFname = "";
      t.unitFname = "";
      t.$emit("closeUp");
    },
    //合同期限选中事件
    dateAdd(type, number, date) {
      switch (type) {
        case "y": {
          date.setFullYear(date.getFullYear() + number);
          return date;
          break;
        }
        case "q": {
          date.setMonth(date.getMonth() + number * 3);
          return date;
          break;
        }
        case "m": {
          date.setMonth(date.getMonth() + number);
          return date;
          break;
        }
        case "w": {
          date.setDate(date.getDate() + number * 7);
          return date;
          break;
        }
        case "d": {
          date.setDate(date.getDate() + number);
          return date;
          break;
        }
        default: {
          date.setDate(date.getDate() + number);
          return date;
          break;
        }
      }
    },
    //计算日期
    calculateDate(selectValue, sDate, eDate) {
      let value = this.form[selectValue];
      let num = parseInt(value);
      let type = "";
      if (selectValue == "contProbat") {
        type = "m";
      } else {
        if (value.indexOf("year") != -1) {
          type = "y";
        } else if (value.indexOf("month") != -1) {
          type = "m";
        } else if (value.indexOf("day") != -1) {
          type = "d";
        }
      }
      if (value === "99year") {
        this.form[eDate] = "9999-12-31";
      } else {
        let now = new Date(this.form[sDate]);
        this.form[eDate] = this.dateAdd(type, num, now);
      }
    },
    //合同期限下拉选择事件
    contPeriodSelect(value) {
      if(value===undefined){
          this.form.contrPeriod=""
      }
      if (this.form.contrSdate !== "") {
        this.calculateDate("contrPeriod", "contrSdate", "contrEdate");
      }
    },
    //合同开始日选择日期事件
    contSdateChange(date) {
      if (this.form.contrPeriod !== "") {
        this.calculateDate("contrPeriod", "contrSdate", "contrEdate");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cover {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-overflow-scrolling: touch;
  outline: 0;
  .box {
    position: relative;
    width: 900px;
    background-color: #fff;
    padding: 60px 0px 30px 20px;
    border-radius: 11px;
    .form {
      max-height: 800px;
      overflow-y: auto;
    }
    .title {
      display: flex;
      position: absolute;
      height: 40px;
      width: 100%;
      line-height: 40px;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      top: 0;
      border-bottom: 1px solid #efefef;
      left: 0;
      .title-text {
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}
.option-main {
  position: relative;
  height: 500px;
}
.btn {
  position: absolute;
  bottom: 20px;
  right: 50px;
}
.btn1 {
  position: absolute;
  bottom: 20px;
  right: 120px;
}
</style>
