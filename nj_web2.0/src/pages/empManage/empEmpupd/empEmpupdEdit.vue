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
                            <FormItem label="证件号码"
                                      prop="empnhIdno">
                                <Input v-model="empnhIdno"
                                       disabled="disabled"
                                       placeholder="请输入证件号码" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="居住地址"
                                      prop="empupdResaddr">
                                <Input v-model="form.empupdResaddr"
                                       :disabled="disabled"
                                       placeholder="请输入居住地址" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="开户银行"
                                      prop="empupdSalbank">
                                <span @dblclick="disabled?'':dbbkBank()">
                                    <Input placeholder="请选择开户银行"
                                           icon="search"
                                           :readonly="true"
                                           :disabled="disabled"
                                           v-model="empnhSalbankDis"
                                           @on-click="disabled?'':selectBank()" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="银行账号"
                                      prop="empupdSalcount">
                                <Input v-model="form.empupdSalcount"
                                       :disabled="disabled"
                                       placeholder="请输入银行账号" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="户名"
                                      prop="empupdSalcname">
                                <Input v-model="form.empupdSalcname"
                                       :disabled="disabled"
                                       placeholder="请输入户名" />
                            </FormItem>
                        </i-col>
                        <i-col span="22"
                               offset="1">
                            <FormItem label="未通过原因"
                                      prop="empupdReason">
                                <Input v-model="form.empupdReason"
                                       :disabled="disabled"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入未通过原因" />
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
        <!--银行-->
        <transition name="fade">
            <searchBank v-show="openBank"
                        @closeBank="closeBank"
                        :searchBankCol="searchBankCol"
                        @inputBank="inputBank"
                        :params="paramsBank"
                        ref="searchBank"></searchBank>
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
import searchContract from "../../../components/searchTable/searchContract";
import searchBank from "../../../components/searchTable/searchBank";
export default {
    data () {
        //银行卡号码的验证
        //银行类型的验证
        const backCardCheck = (rule, value, callback) => {
            console.log(1111)
            if (value !== '') {
                if (valid.val_bank(value) == 1) {
                    callback(new Error('银行卡号长度必须在16到19之间'))
                } else if (valid.val_bank(value) == 2) {
                    callback(new Error('银行卡号码必须全为数字'))
                } else if (valid.val_bank(value) == 3) {
                    callback(new Error('银行卡号开头6位不符合规范'))
                } else {
                    let res = valid.bankCardAttribution(value)
                    let bankType = this.empnhSalbankDis
                    console.log('type', bankType)
                    this.empnhSalbankDis = res.bankName
                    console.log(res.bankName)
                    this.form.empupdSalbank = res.bankName
                }
            }
            callback()
        }

        return {
            openPickUser: false, //员工信息默认false 隐藏
            spinShow: false,
            type: "",
            distype: false,
            disabled: false,
            forbidden: null,
            popup: "",
            value: "",
            form: {
                _mt: "empEmpupd.addOrUpd",
                empId: "",
                deptId: "",
                postId: "",
                empupdResaddr: "",
                empupdSalbank: "",
                empupdSalcount: "",
                empupdSalcname: "",
                empupdReason: "",
                note: "", //备注
                funId: "1",
                logType: "",
                state: '01draft',
            },
            openBank: false,
            empnhName: "",
            unitFname: "",
            postFname: "",
            empnhSalbankDis: "",
            empnhIdno: "",
            //银行
            searchBankCol: [
                {
                    title: '银行名称',
                    key: "bankCname",
                    sortable: "custom"
                },
                {
                    title: '银行编码',
                    key: "bankCode",
                    sortable: "custom"
                }
            ],
            paramsBank: {
                _mt: "baseBankinfo.getPage",
                rows: 20,
                page: 1,
                sort: "id",
                order: "desc",
                funId: "1100",
                logType: "开户银行"
            },
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
                // empupdResaddr: [
                //   { required: true, message: "请输入居住详细地址", trigger: "change" }
                // ],
                // empupdSalbank: [
                //   { required: true, message: "请选择开户银行", trigger: "change" }
                // ],
                // empupdSalcount: [
                //   { required: true, message: "请输入银行账号", trigger: "change" }
                // ],
                // empupdSalcname: [
                //   { required: true, message: "请输入户名", trigger: "change" }
                // ],
                empupdSalcount: [
                    {
                        validator: backCardCheck,
                        message: '',
                        trigger: 'blur'
                    },
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
        searchBank,
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
                _mt: "empEmpupd.getById",
                id: id,
                funId: "1",
                logType: "根据id获取数据"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.form.deptId = res.data.content[0].deptId;
                        t.form.postId = res.data.content[0].postId;
                        t.form.empId = res.data.content[0].empId;
                        t.form.empupdResaddr = res.data.content[0].empupdResaddr;
                        t.form.empupdSalbank = res.data.content[0].empupdSalbank;
                        t.form.empupdSalcount = res.data.content[0].empupdSalcount;
                        t.form.empupdSalcname = res.data.content[0].empupdSalcname;
                        t.form.empupdReason = res.data.content[0].empupdReason;
                        t.form.state = res.data.content[0].state;
                        t.form.note = res.data.content[0].note;
                        t.empnhName = res.data.content[0].empnhName;
                        t.empnhSalbankDis = res.data.content[0].empnhSalbankDis;
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
                } else {
                    this.$nextTick(function () {
                        let tt = document.querySelectorAll('.ivu-form-item-error');
                        this.$refs.scrollBox.$el.scrollTop = tt[0].parentNode.offsetTop
                    })
                }
            });
        },


        //银行
        selectBank () {
            const t = this;
            t.$refs.searchBank.getData(this.paramsBank);
            t.openBank = true;
        },
        inputBank (name, id) {
            const t = this;
            console.log(name, "name")
            t.empnhSalbankDis = name;
            t.form.empupdSalbank = id;
        },
        dbbkBank () {
            const t = this;
            t.empnhSalbankDis = "";
            t.form.empupdSalbank = "";
        },
        closeBank () {
            const t = this;
            t.$refs.searchBank.bankCname = "";
            t.openBank = false;
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
            t.form.empupdResaddr = row.empnhResiaddr;
            t.form.empupdSalbank = row.empnhSalbank;
            t.empnhSalbankDis = row.empnhSalbankDis;
            t.form.empupdSalcount = row.empnhSalaccount;
            t.form.empupdSalcname = row.empnhSalaccname;
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
            t.form.empupdResaddr = "";
            t.form.empupdSalbank = "";
            t.form.empupdSalcount = "";
            t.form.empupdSalcname = "";
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
            t.form.empupdResaddr = "";
            t.form.empupdSalbank = "";
            t.form.empupdSalcount = "";
            t.form.empupdSalcname = "";
            t.form.empupdReason = "";
            t.form.note = "";
            t.empnhSalbankDis = "";
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
