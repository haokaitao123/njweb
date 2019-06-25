<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 11px;"></Icon>
                    &nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Spin size="large"
                      fix
                      v-if="spinShow"></Spin>
                <Row style="max-height: 460px;overflow-y: auto;"
                     ref="scrollBox">
                    <Form ref="form"
                          :model="form"
                          :rules="ruleValidate"
                          :label-width="120">
                        <i-col span="11"
                               offset="1">
                            <FormItem label="员工姓名"
                                      prop="empId">
                                <!-- @dblclick="clearUserid" 员工姓名清空选择框  -->
                                <span @dblclick="disabled?'':clearUserid()">
                                    <Input v-model="empnhName"
                                           icon="search"
                                           :readonly="true"
                                           :disabled="disabled"
                                           placeholder="请选择员工姓名"
                                           @on-click="disabled?'':pickUserData()" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="部门"
                                      prop="deptId">
                                <Input v-model="unitFname"
                                       disabled="disabled"
                                       placeholder="请输入部门名称" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="岗位"
                                      prop="postId">
                                <Input v-model="postFname"
                                       disabled="disabled"
                                       placeholder="请输入岗位名称" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
					        <FormItem label="考勤期间" prop="atmorPeriod">
                                <DatePicker type="month" placeholder="请选择考勤月份" 
                                :disabled="disabled" 
                                v-model="form.atmorPeriod" 
                                style="width: 100%"></DatePicker>
					        </FormItem>
				        </i-col>
                        <i-col span="11"
                                offset="1">
					        <FormItem label="开始日期" prop="atmorSdate">
                                <DatePicker type="date" placeholder="请选择开始日期" 
                                :disabled="disabled" 
                                v-model="form.atmorSdate" 
                                style="width: 100%"></DatePicker>
					        </FormItem>
				        </i-col>
                        <i-col span="11">
					        <FormItem label="结束日期" prop="atmorEdate">
                                <DatePicker type="date" placeholder="请选择开始日期" 
                                :disabled="disabled" 
                                v-model="form.atmorEdate" 
                                style="width: 100%"></DatePicker>
					        </FormItem>
				        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="出勤天数"
                                      prop="atmorAttdays">
                                <Input v-model="form.atmorAttdays"
                                       :disabled="disabled"
                                       placeholder="请输入出勤天数" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="休息天数"
                                      prop="atmorOffdays">
                                <Input v-model="form.atmorOffdays"
                                       :disabled="disabled"
                                       placeholder="请输入休息天数" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                                offset="1">
                            <FormItem label="迟到次数"
                                      prop="atmorLatenums">
                                <Input v-model="form.atmorLatenums"
                                       :disabled="disabled"
                                       placeholder="请输入迟到次数" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="早退次数"
                                      prop="atmorEarlynums">
                                <Input v-model="form.atmorEarlynums"
                                       :disabled="disabled"
                                       placeholder="请输入早退次数" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                                offset="1">
                            <FormItem label="缺卡次数"
                                      prop="atmorMissnums">
                                <Input v-model="form.atmorMissnums"
                                       :disabled="disabled"
                                       placeholder="请输入缺卡次数" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="矿工次数"
                                      prop="atmorComnums">
                                <Input v-model="form.atmorComnums"
                                       :disabled="disabled"
                                       placeholder="请输入矿工次数" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                                offset="1">
                            <FormItem label="外勤次数"
                                      prop="atmorFieldnums">
                                <Input v-model="form.atmorFieldnums"
                                       :disabled="disabled"
                                       placeholder="请输入外勤次数" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="加班天数"
                                      prop="atmorOverdays">
                                <Input v-model="form.atmorOverdays"
                                       :disabled="disabled"
                                       placeholder="请输入加班天数" />
                            </FormItem>
                        </i-col>
                         <i-col span="11"
                                offset="1">
                            <FormItem label="考勤确认"
                                      prop="atmorConfirm">
                                <RadioGroup v-model="form.atmorConfirm">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectAtmorConfirm"
                                           :key="index"
                                           :disabled="disabled">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="22"
                               offset="1">
                            <FormItem label="备注"
                                      prop="note">
                                <Input v-model="form.note"
                                       :disabled="disabled"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注..." />
                            </FormItem>
                        </i-col>
                    </Form>
                </Row>
            </div>
            <Button type="ghost"
                    @click="handleReset"
                    class="btn1">{{$t('button.cal')}}</Button>
            <Button type="primary"
                    @click="handleSubmit"
                    class="btn"
                    v-show="!disabled">{{$t('button.sav')}}</Button>
        </div>
        <!--弹出选择页面布局 无需变更-->

        <transition name="fade">
            <!--  员工信息的弹出框 v-show="openPickUser"绑定了一个判断员工信息弹窗是否显示隐藏的数据   @closeEmp="closeEmp" 关闭员工信息弹窗事件  @inputEmp="inputEmp" 员工信息弹出框input选中事件  -->
            <searchEmpMaster v-show="openPickUser"
                             @closeModal="closeEmp"
                             @inputModal="inputEmp"
                             ref="searchEmpMaster"></searchEmpMaster>
        </transition>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginSenior,
    getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import valid from '@/lib/pub_valid';
import searchEmpMaster from "../../../components/searchTable/searchEmpnhMaster";
export default {
    data () {
        const numberCheck = (rule, value, numberValCheck) => {
      if (value !== "" && value !== undefined) {
        if (valid.val_number103(value)) {
          return numberValCheck();
        }
        return numberValCheck(new Error(rule.message));
      }
      numberValCheck();
    };      
        return {
            openPickUser: false, //员工信息默认false 隐藏  
            spinShow: false,
            type: "",
            distype: false,
            disabled: false,
            forbidden: null,
            popup: "",
            value: "",
            selectAtmorConfirm: [
                {
                    'paramCode': '1',
                    'paramInfoCn': '是'
                },
                {
                    'paramCode': '0',
                    'paramInfoCn': '否'
                },
            ],
            form: {
                _mt: "attenMonthrevi.addOrUpd",
                empId: "",
                deptId: "",
                postId: "",
                atmorPeriod: "",
                atmorSdate: "",
                atmorEdate: "",
                atmorAttdays: "",
                atmorOffdays: "",
                atmorLatenums: "",
                atmorEarlynums: "",
                atmorMissnums: "",
                atmorComnums: "",
                atmorFieldnums: "",
                atmorOverdays: "",
                atmorConfirm: '1',
                state:'01State',
                note: "", //备注
                funId: "1",
                logType: "", //操作类型
            },
            empnhName: "",
            unitFname: "",
            postFname: "",

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
                atmorSdate: [
                    { required: true, type: 'date', message: "请选择生效日期", trigger: 'change' },
                ],
                atmorEdate: [
                    { required: true, type: 'date', message: "请选择生效日期", trigger: 'change' },
                ],
                atmorPeriod: [
                    { required: true, type: 'date', message: "请选择考勤期间", trigger: 'change' },
                ],
                atmorAttdays: [
                {
                    required: true,
                    message: "请输入出勤天数",
                    trigger: "blur"
                },
                {
                    validator: numberCheck,
                    message: "请输入正确的数字格式",
                    trigger: "blur"
                }
                ],
                atmorOffdays: [
                {
                    required: true,
                    message: "请输入休息天数",
                    trigger: "blur"
                },
                {
                    validator: numberCheck,
                    message: "请输入正确的数字格式",
                    trigger: "blur"
                }
                ],
               atmorLatenums: [
                {
                    required: true,
                    message: "请输入迟到次数",
                    trigger: "blur"
                },
                {
                    validator: numberCheck,
                    message: "请输入正确的数字格式",
                    trigger: "blur"
                }
                ],
                atmorEarlynums: [
                {
                    required: true,
                    message: "请输入早退次数",
                    trigger: "blur"
                },
                {
                    validator: numberCheck,
                    message: "请输入正确的数字格式",
                    trigger: "blur"
                }
                ],
                atmorMissnums: [
                {
                    required: true,
                    message: "请输入缺卡次数",
                    trigger: "blur"
                },
                {
                    validator: numberCheck,
                    message: "请输入正确的数字格式",
                    trigger: "blur"
                }
                ],
                 atmorComnums: [
                {
                    required: true,
                    message: "请输入矿工次数",
                    trigger: "blur"
                },
                {
                    validator: numberCheck,
                    message: "请输入正确的数字格式",
                    trigger: "blur"
                }
                ],
                 atmorFieldnums: [
                {
                    required: true,
                    message: "请输入外勤次数",
                    trigger: "blur"
                },
                {
                    validator: numberCheck,
                    message: "请输入正确的数字格式",
                    trigger: "blur"
                }
                ],
                 atmorOverdays: [
                {
                    required: true,
                    message: "请输入加班天数",
                    trigger: "blur"
                },
                {
                    validator: numberCheck,
                    message: "请输入正确的数字格式",
                    trigger: "blur"
                }
                ],
            }
        };
    },
    props: {
        id: Number,
        logType: String,
        index: Number
    },
    components: {
        searchEmpMaster,
    },
    mounted () {
        console.log(this.logType, 'logType')
    },
    methods: {
        getData (id) {
            const t = this;
            t.spinShow = true
            getDataLevelUserLogin({
                _mt: "attenMonthrevi.getById",
                id: id,
                funId: "1",
                logType: "根据id获取数据"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.form.deptId = res.data.content[0].deptId;
                        t.form.postId = res.data.content[0].postId;
                        t.form.empId = res.data.content[0].empId;
                        t.form.atmorPeriod = res.data.content[0].atmorPeriod;
                        t.form.atmorSdate = res.data.content[0].atmorSdate;
                        t.form.atmorEdate = res.data.content[0].atmorEdate;
                        t.form.atmorAttdays = res.data.content[0].atmorAttdays;
                        t.form.atmorOffdays = res.data.content[0].atmorOffdays;
                        t.form.atmorLatenums = res.data.content[0].atmorLatenums;
                        t.form.atmorEarlynums = res.data.content[0].atmorEarlynums;
                        t.form.atmorMissnums = res.data.content[0].atmorMissnums;
                        t.form.atmorComnums = res.data.content[0].atmorComnums;
                        t.form.atmorFieldnums = res.data.content[0].atmorFieldnums;
                        t.form.atmorOverdays = res.data.content[0].atmorOverdays;
                        t.form.atmorConfirm = res.data.content[0].atmorConfirm;
                        t.form.state = res.data.content[0].state;
                        t.form.note = res.data.content[0].note;
                        t.empnhName = res.data.content[0].empnhName;
                        t.postFname = res.data.content[0].postFname;
                        t.unitFname = res.data.content[0].unitFname;
                        t.empnhIdno = res.data.content[0].empnhIdno;
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
        handleSubmit () {
            const t = this;
            const data = deepCopy(t.form);
            data.logType = t.logType;
            if (t.logType === this.$t("button.upd")) {
                data.id = t.id;
            }
            if (data.atmorSdate !== undefined && data.atmorSdate !== "") {
                data.atmorSdate = new Date(data.atmorSdate).format("yyyy-MM-dd");
            } else {
                data.atmorSdate = "";
            }
            if (data.atmorEdate !== undefined && data.atmorEdate !== "") {
                data.atmorEdate = new Date(data.atmorEdate).format("yyyy-MM-dd");
            } else {
                data.atmorEdate = "";
            }
            if (data.atmorPeriod !== undefined && data.atmorPeriod !== "") {
                data.atmorPeriod = new Date(data.atmorPeriod).format("yyyy-MM");
            } else {
                data.atmorPeriod = "";
            }
            if (t.type === "02dept" && data.unitType === "01company") {
                t.$Modal.success({
                    title: this.$t("reminder.err"),
                    content: this.$t("lang_organization.orgframe.reminderErr")
                });
                return;
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
                                    t.$emit("newData", res.data.content[0]);
                                } else {
                                    this.$Message.success(this.$t("reminder.updsuccess"));
                                    t.$emit("update", res.data.content[0]);
                                }
                            }
                        })
                        .catch(() => {
                            this.$Message.error(this.$t("reminder.errormessage"));
                        });
                }
            });
        },

        //关闭员工信息弹出框
        closeEmp () {
            const t = this;
            t.openPickUser = false;
        },
        //员工信息弹出框input选中事件
        inputEmp (row) {
            const t = this;
            t.empnhName = row.empnhName; //员工信息name赋值
            t.form.empId = row.id; //员工信息id赋值
            t.unitFname = row.unitFname;
            t.form.deptId = row.deptId;
            t.postFname = row.postFname;
            t.form.postId = row.postId;
            t.empnhIdno = row.empnhIdno;
        },
        //清除员工信息
        clearUserid () {
            const t = this;
            t.empnhName = "";
            t.form.empId = "";
            t.form.deptId = "";
            t.form.postId = "";
            t.postFname = "";
            t.unitFname = "";
            t.empnhIdno = "";
        },
        //打开员工信息弹出框
        pickUserData () {
            const t = this;
            t.$refs.searchEmpMaster.getData(); //调用员工信息子组件获取列表数据方法 列表回显数据
            t.openPickUser = true; //打开员工信息弹出框
        },
        handleReset () {
            const t = this;
            t.$refs.scrollBox.$el.scrollTop = "0";
            t.$refs.form.resetFields();
            t.form.empId = "";
            t.form.deptId = "";
            t.form.postId = "";
            t.form.atmorPeriod = "";
            t.form.atmorSdate = "";
            t.form.atmorEdate = "";
            t.form.atmorAttdays = "";
            t.form.atmorOffdays = "";
            t.form.atmorLatenums = "";
            t.form.atmorEarlynums = "";
            t.form.atmorMissnums = "";
            t.form.atmorComnums = "";
            t.form.atmorFieldnums = "";
            t.form.atmorOverdays = "";
            t.form.atmorConfirm = "";
            t.form.note = "";
            t.empnhName = "";
            t.postFname = "";
            t.unitFname = "";
            t.empnhIdno = "";
            t.$emit("closeUp");
        },
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
