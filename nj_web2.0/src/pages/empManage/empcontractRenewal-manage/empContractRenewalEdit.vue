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
        <Row style="max-height: 480px;overflow-y: auto;">
          <Form ref="form" :model="form" 
          :rules="ruleValidate" 
          :label-width="120">
            <i-col span="11">
              <FormItem label="合同编号" prop="numberCode">
                <Input v-model="form.numberCode" :disabled="true"/>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
                <FormItem label="员工姓名"  prop="empName"  >
                            <!--绑定双击清除方法-->
                            <span @dblclick="disabled?'':dbclean()">
                          <!--v-model绑定显示字段-->
                              <Input v-model="empName" icon="search" :readonly=true :disabled="disabled" placeholder="请选择员工"  @on-click="disabled ? '' : pickEmpData()" />
                            </span>
                          </FormItem>
             
            </i-col>
            <i-col span="11">
                <FormItem label="部门"
                                      prop="deptIdDis">
                                <Input v-model="deptIdDis"
                                       disabled="disabled"
                                       placeholder="请输入部门名称"/>
                            </FormItem>
              
            </i-col>
            <i-col span="11" offset="1">
                <FormItem label="岗位"
                                  prop="postIdDis">
                          <Input v-model="postIdDis"
                                 disabled="disabled"
                                 placeholder="请输入岗位名称"/>
                        </FormItem>
              
            </i-col>
            <i-col span="11">
              <FormItem label="员工类型" prop="empType">
                <Select v-model="form.empType" :disabled="disabled" placeholder="请选择员工类型">
                  <Option
                    :value="item.paramCode"
                    v-for="(item,index) in selectEmptype"
                    :key="index"
                  >{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="合同类型" prop="contType">
                <Select v-model="form.contType" :disabled="disabled" placeholder="请选择合同类型">
                  <Option
                    :value="item.paramCode"
                    v-for="(item,index) in selectContrpertype"
                    :key="index"
                  >{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同期限" prop="contPeriod">
                <Select v-model="form.contPeriod" :disabled="disabled" placeholder="选择合同期限">
                  <Option
                    :value="item.paramCode"
                    v-for="(item,index) in selectContperiod"
                    :key="index"
                  >{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="合同开始日" prop="contSdate">
                <DatePicker
                  type="date"
                  placeholder="选择合同开始日"
                  :editable="false"
                  :disabled="disabled"
                  :readonly="disabled"
                  v-model="form.contSdate"
                  format="yyyy-MM-dd"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同到期日" prop="contEdate">
                <DatePicker
                  type="date"
                  placeholder="选择合同到期日"
                  :disabled="disabled"
                  :readonly="disabled"
                  :editable="false"
                  v-model="form.contEdate"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="合同工作时间" prop="contWorktime">
                <Select v-model="form.contWorktime" :disabled="disabled" placeholder="选择合同工作时间">
                  <Option
                    :value="item.paramCode"
                    v-for="(item,index) in selectWorktimetype"
                    :key="index"
                  >{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="试用期限" prop="contProbat">
                <Select v-model="form.contProbat" :disabled="disabled" placeholder="选择试用期限">
                  <Option
                    :value="item.paramCode"
                    v-for="(item,index) in selectProbperiod"
                    :key="index"
                  >{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="试用期到期日" prop="contProbatdt">
                <DatePicker
                  type="date"
                  placeholder="选择试用期到期日"
                  :editable="false"
                  :disabled="disabled"
                  :readonly="disabled"
                  v-model="form.contProbatdt"
                  format="yyyy-MM-dd"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="签订时间" prop="contSigndate">
                <DatePicker
                  type="date"
                  placeholder="选择签订时间"
                  :disabled="disabled"
                  :readonly="disabled"
                  :editable="false"
                  v-model="form.contSigndate"
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
        <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>
        <Button
          type="primary"
          @click="handleSubmit"
          class="btn"
          v-show="!disabled"
        >{{$t('button.sav')}}</Button>
      </div>
    </div>
    <!--弹出选择页面布局 无需变更-->
    
    
    <!--直接上級-->
    <transition name="fade">
      <searchEmpMaster
        v-show="openEmpMaster"
        @closeEmp="closeEmp"
        @inputEmp="inputEmp"
        ref="searchEmpMaster"
      ></searchEmpMaster>
    </transition>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginSenior,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import searchEmpMaster from '../../../components/searchTable/searchEmpnhMaster'

export default {
  data() {
    const compareTime = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请选择生效日期"));
      } else {
        //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
        let startTimeNum = new Date(this.form.contValiddate).getTime();
        let endTimeNum = new Date(this.form.contValiddate).getTime();
        if (startTimeNum > endTimeNum) {
          callback(new Error("生效日期不能大于失效日期"));
        }
        callback();
      }
    };
    
    return {
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
        _mt: "empContractinfo.addOrUpd",
        numberCode: "XXXXXX",
        empId: "",
        deptId: "",
        postId: "",
        empType: "",
        contType: "",
        contPeriod: "",
        contSdate: "",
        contEdate: "",
        contWorktime: "",
        contSigndate: "",
        contProbat: "",
        contProbatdt: "",
        contValiddate:"",
        contInvdate:"",
        note: "", //备注
        funId: "1",
        logType: ""
      },
      openDeptPick: false,
      openPost: false,
      openEmpMaster: false,
      empName: "",
      deptIdDis: "",
      postIdDis: "",
      //部门
     
      //岗位
     
      ruleValidate: {
        empName: [
          { required: true, message: "请选择员工姓名", trigger: "change" }
        ],
        deptId: [
          { required: true, message: "请选择部门名称", trigger: "change" }
        ],
        postId: [
          { required: true, message: "请选择岗位名称", trigger: "change" }
        ],
        empType: [
          { required: true, message: "请选择员工类型", trigger: "blur" }
        ],
        contType: [
          { required: true, message: "请选择合同类型", trigger: "blur" }
        ],
        contPeriod: [
          { required: true, message: "请选择合同期限", trigger: "blur" }
        ],
        contSdate: [
          {
            required: true,
            type: "date",
            message: "请选择合同开始日",
            trigger: "blur"
          }
        ],
        contEdate: [
          {
            required: true,
            type: "date",
            message: "请选择合同到期日",
            trigger: "blur"
          }
        ],

        contWorktime: [
          { required: true, message: "请选择合同工作时间", trigger: "blur" }
        ],
        contProbat: [
          { required: true, message: "请选择试用期限", trigger: "blur" }
        ],
        contProbatdt: [
          {
            required: true,
            type: "date",
            message: "请选择试用期到期日",
            trigger: "blur"
          }
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
    searchEmpMaster,
  },
    methods: {
        //上级清除员工选择
        dbclean(){
            const t = this
            t.form.empName = '';
            t.form.empId = '';
            t.form.deptIdDis = '';
            t.form.deptId = '';
            t.form.postIdDis = '';
            t.form.postId = '';
        },
        getData(id) {
            const t = this;
            getDataLevelUserLogin({
                _mt: "empContractinfo.getById",
                id: id,
                funId: "1",
                logType: "根据id获取数据"
            })
            .then(res => {
            if (isSuccess(res, t)) {
                t.form.deptId = res.data.content[0].deptId;
                t.form.postId = res.data.content[0].postId;
                t.form.empId = res.data.content[0].empId;
                t.form.empType = res.data.content[0].empType;
                t.form.contType = res.data.content[0].contType;
                t.form.contPeriod = res.data.content[0].contPeriod;
                t.form.contSdate = res.data.content[0].contSdate;
                t.form.contEdate = res.data.content[0].contEdate;
                t.form.contWorktime = res.data.content[0].contWorktime;
                t.form.contSigndate = res.data.content[0].contSigndate;
                t.form.contProbat = res.data.content[0].contProbat;
                t.form.contProbatdt = res.data.content[0].contProbatdt;
                t.form.contValiddate = res.data.content[0].contValiddate;
                t.form.contInvdate = res.data.content[0].contInvdate;
                t.form.state = res.data.content[0].state;
                t.form.note = res.data.content[0].note;
                t.empName = res.data.content[0].empName;
                t.postIdDis = res.data.content[0].postIdDis;
                t.deptIdDis = res.data.content[0].deptIdDis;
                t.empTypeDis = res.data.content[0].empTypeDis;
                t.contTypeDis = res.data.content[0].contTypeDis;
                t.contPeriodDis = res.data.content[0].contPeriodDis;
                t.contWorktimeDis = res.data.content[0].contWorktimeDis;
                t.contProbatDis = res.data.content[0].contProbatDis;
                if (id === res.data.content[0].companyId) {
                            t.forbidden = 'disabled'
                            t.distype = true
                        } else {
                            t.forbidden = null
                            t.distype = false
                        }
            }
            })
            .catch(() => {
            this.$Modal.error({
                title: this.$t("reminder.err"),
                content: this.$t("reminder.errormessage")
            });
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
                typeCode: type
            })
                .then(res => {
                if (isSuccess(res, t)) {
                    if (type == "emptype") {
                    t.selectEmptype = res.data.content[0].value[0].paramList;
                    }
                    if (type == "contrpertype") {
                    t.selectContrpertype = res.data.content[0].value[0].paramList;
                    }
                    if (type == "contperiod") {
                    t.selectContperiod = res.data.content[0].value[0].paramList;
                    }
                    if (type == "worktimetype") {
                    t.selectWorktimetype = res.data.content[0].value[0].paramList;
                    }
                    if (type == "probperiod") {
                    t.selectProbperiod = res.data.content[0].value[0].paramList;
                    }
                }
                })
                .catch(() => {
                this.$Modal.error({
                    title: this.$t("reminder.err"),
                    content: this.$t("reminder.errormessage")
                });
            });
        },
        handleSubmit () {
            const t = this
            console.log(t.form,"form")
            const data = deepCopy(t.form)
            data.logType = t.logType
            if (t.type === '02dept' && data.unitType === '01company') {
                t.$Modal.success({
                    title: this.$t('reminder.err'),
                    content: this.$t('lang_organization.orgframe.reminderErr'),
                })
                return
            }
            if (t.logType === this.$t('button.upd')) {
                data.id = t.id
            }
            if (data.contValiddate !== undefined) {
                data.contValiddate = new Date(data.contValiddate).format('yyyy-MM-dd')
            }
            if (data.contSdate !== undefined) {
                data.contSdate = new Date(data.contSdate).format('yyyy-MM-dd')
            }
            if (data.contEdate !== undefined) {
                data.contEdate = new Date(data.contEdate).format('yyyy-MM-dd')
            }
            if (data.contSigndate !== undefined) {
                data.contSigndate = new Date(data.contSigndate).format('yyyy-MM-dd')
            }
            if (data.contProbatdt !== undefined) {
                data.contProbatdt = new Date(data.contProbatdt).format('yyyy-MM-dd')
            }
            if (data.contInvdate !== undefined) {
                data.contInvdate = data.contInvdate === '' ? '' : new Date(data.contInvdate).format('yyyy-MM-dd')
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.form.resetFields()
                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
    
       /*选择员工*/
        pickEmpData() {
            const t = this;
            t.$refs.searchEmpMaster.getData();
            t.openEmpMaster = true;
        },
        closeEmp() {
            const t = this
            t.openEmpMaster = false
        },
        inputEmp(row) {
            const t = this
            t.form.empName = row.empnhName;
            t.form.empId = row.id;
            t.form.deptIdDis = row.deptIdDis;
            t.form.deptId = row.deptId;
            t.form.postIdDis = row.postIdDis;
            t.form.postId = row.postId;
        },
        handleReset() {
        const t = this;
        t.$emit("closeUp");
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
  z-index: 1100;
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
  height: 480px;
  .btn {
    position: absolute;
    bottom: 20px;
    right: 115px;
  }
  .btn1 {
    position: absolute;
    bottom: 20px;
    right: 170px;
  }
}
</style>
