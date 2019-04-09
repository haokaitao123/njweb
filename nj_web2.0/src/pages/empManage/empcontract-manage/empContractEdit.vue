<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 11px;"></Icon>
          &nbsp;{{$t('button.view')}}
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
              <FormItem
                label="合同编号"
                prop="numberCode"
              >
                <Input v-model="form.numberCode" 
                :disabled=true
                />
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="员工姓名" prop="empId">
                <span @dblclick="clearEmpId">
                                    <Input v-model="empName"
                                           icon="search"
                                           :disabled="disabled"
                                           :readonly=true
                                           placeholder="请选择员工姓名"
                                           @on-click="pickData2" />
                                </span>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem
                label="部门名称"
                prop="deptId"
              >
                <span @dblclick="clearDeptId">
                                    <Input v-model="deptIdDis"
                                           icon="search"
                                           :disabled="disabled"
                                           :readonly=true
                                           placeholder="请选择部门名称"
                                           @on-click="pickData2" />
                                </span>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="岗位名称" prop="postId">
                 <span @dblclick="clearPostId">
                                    <Input v-model="postIdDis"
                                           icon="search"
                                           :disabled="disabled"
                                           :readonly=true
                                           placeholder="请选择岗位名称"
                                           @on-click="pickData2" />
                                </span>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem
                label="员工类型"
                prop="empType"
              >
                 <Select v-model="form.empType"
                                        :disabled="disabled"
                                        placeholder="选择员工类型">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEmptype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem
                label="合同类型"
                prop="contType"
              >
                 <Select v-model="form.contType"
                                        :disabled="disabled"
                                        placeholder="选择合同类型">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContrpertype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem
                label="合同期限"
                prop="contPeriod"
              >
                 <Select v-model="form.contPeriod"
                                        :disabled="disabled"
                                        placeholder="选择合同期限">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContperiod"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="合同开始日"
                                      prop="contSdate">
                                <DatePicker type="date"
                                            placeholder="选择合同开始日"
                                            :editable="false"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            v-model="form.contSdate"
                                            format="yyyy-MM-dd"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
            </i-col>
            <i-col span="11">
               <FormItem label="合同到期日"
                                      prop="contEdate">
                                <DatePicker type="date"
                                            placeholder="选择合同到期日"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            :editable="false"
                                            v-model="form.contEdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
            </i-col>
            <i-col span="11" offset="1">
             <FormItem
                label="合同工作时间"
                prop="contWorktime"
              >
                 <Select v-model="form.contWorktime"
                                        :disabled="disabled"
                                        placeholder="选择合同工作时间">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectWorktimetype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem
                label="试用期限"
                prop="contProbat"
              >
                 <Select v-model="form.contProbat"
                                        :disabled="disabled"
                                        placeholder="选择试用期限">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectProbperiod"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
              </FormItem>
            </i-col>
             <i-col span="11" offset="1">
                            <FormItem label="试用期到期日"
                                      prop="contProbatdt">
                                <DatePicker type="date"
                                            placeholder="选择试用期到期日"
                                            :editable="false"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            v-model="form.contProbatdt"
                                            format="yyyy-MM-dd"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
              <i-col span="11">
                            <FormItem label="签订时间"
                                      prop="contSigndate">
                                <DatePicker type="date"
                                            placeholder="选择签订时间"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            :editable="false"
                                            v-model="form.contSigndate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
            <i-col span="11" offset="1">
                            <FormItem label="生效日期"
                                      prop="unitValdate">
                                <DatePicker type="date"
                                            placeholder="选择生效日期"
                                            :editable="false"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            v-model="form.unitValdate"
                                            format="yyyy-MM-dd"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="失效日期"
                                      prop="unitInvdate">
                                <DatePicker type="date"
                                            placeholder="选择失效日期"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            :editable="false"
                                            v-model="formValidate.unitInvdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
           <i-col span="22">
                            <FormItem label="备注"
                                      prop="note">
                                <Input v-model="formValidate.note"
                                       :disabled="disabled"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注..."></Input>
                            </FormItem>
                        </i-col>
          </Form>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginSenior,
  getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
  data() {
    return {
       type: '',
            distype: false,
            disabled: false,
            forbidden: null,
            popup: '',
            value: '',
            selectEmptype: [],
            selectContrpertype:[],
            selectContperiod: [],
            selectWorktimetype: [],
            selectProbperiod: [],   
      form: {}
    };
  },
  props: {
    id: Number,
    logType: String,
    index: Number
  },
  methods: {
    getData(id) {
      const t = this;
      getDataLevelUserLogin({
        _mt: "empContract.getById",
        id: id,
        logType: "根据id获取数据"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0];
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    getSelect (type) { //获取下拉列表数据
            const t = this
            //emptype员工类型
           //contrpertype,合同类别
           //contperiod,合同期限
           //noticedays,到期通知天数
           //confidential,保密协议
           //worktimetype,合同工作时间
           //probperiod,试用期限
           
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                typeCode: type,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (type == "emptype") {
                        t.selectEmptype = res.data.content[0].value[0].paramList
                    }
                    if (type == "contrpertype") {
                        t.selectContrpertype = res.data.content[0].value[0].paramList

                    }
                    if (type == "contperiod") {
                        t.selectContperiod = res.data.content[0].value[0].paramList
                    }
                     if (type == "worktimetype") {
                        t.selectWorktimetype = res.data.content[0].value[0].paramList

                    }
                    if (type == "probperiod") {
                        t.selectProbperiod = res.data.content[0].value[0].paramList
                    }

                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
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
