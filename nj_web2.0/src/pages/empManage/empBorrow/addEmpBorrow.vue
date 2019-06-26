<template>
    <div class="option-main">
        <!--loading效果-->
        <Spin size="large"
              fix
              v-if="spinShow">
        </Spin>
        <Row style="max-height: 420px;overflow-y: auto;">
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="100">
                <i-col span="11">
                    <FormItem label="员工姓名"
                              prop="empnhName">
                        <!--绑定双击清除方法-->
                        <span @dblclick="forbidden?'':dbclean()">
                            <!--v-model绑定显示字段-->
                            <Input v-model="formValidate.empnhName"
                                   icon="search"
                                   readonly="readonly"
                                   :disabled="forbidden"
                                   placeholder="请选择员工"
                                   @on-click="forbidden?'':pickEmpData()" />
                        </span>
                    </FormItem>
                </i-col>

                <i-col span="11">
                    <FormItem label="证件号码"
                              prop="empnhIdno">
                        <Input v-model="formValidate.empnhIdno"
                               disabled="disabled"
                               placeholder="请输入证件号码"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="部门"
                              prop="unitFname">
                        <Input v-model="formValidate.unitFname"
                               disabled="disabled"
                               placeholder="请输入部门名称"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="岗位"
                              prop="postFname">
                        <Input v-model="formValidate.postFname"
                               disabled="disabled"
                               placeholder="请输入岗位名称"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="总金额"
                              prop="borrTotamount">
                        <Input v-model="formValidate.borrTotamount"
                               disabled="disabled"
                               placeholder="请输入总金额"></Input>
                    </FormItem>
                </i-col>

                <i-col span="22">
                    <FormItem label="备注"
                              prop="note">
                        <Input v-model="formValidate.note"
                               type="textarea"
                               :disabled="forbidden"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入备注..."></Input>
                    </FormItem>
                </i-col>
            </Form>
        </Row>
        <!--            <Button type="ghost"
                      @click="handleReset"
                      class="btn1">{{$t('button.cal')}}</Button>-->
        <Button type="primary"
                v-show="!forbidden"
                @click="handleSubmit"
                :loading="loadingStatus"
                class="btn">{{loadingStatus ? '正在保存' : $t('button.sav') }}</Button>
        <!--一个弹出框一个transition-->
        <transition name="fade">
            <searchEmpMaster v-show="openEmpMaster"
                             @closeModal="closeEmp"
                             @inputModal="inputEmp"
                             ref="searchEmpMaster"></searchEmpMaster>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchEmpMaster from '../../../components/searchTable/searchEmpnhMaster'
import valid from '../../../lib/pub_valid.js'

export default {
    data () {
        /*数字验证*/
        const numberCheck = (rule, value, numberValCheck) => {
            if (value !== '' && value !== undefined) {
                if (valid.val_number103(value)) {
                    return numberValCheck()
                }
                return numberValCheck(new Error(rule.message))
            }
            numberValCheck()
        }

        return {
            spinShow: false,
            file: '',
            filekey: '',
            loadingStatus: false,
            type: '',
            distype: false,
            forbidden: false,
            formValidate: {
                empnhName: "",
                empnhIdno: "",
                empId: "",
                deptId: "",
                unitFname: "",
                postId: "",
                postFname: "",
                borrTotamount: "",
                note: "",
            },
            openEmpMaster: false,
            /*必填验证*/
            ruleValidate: {
                empnhName: [{ required: true, message: "请选择员工姓名", trigger: 'change' },],
                /*borrTotamount: [
                    {
                        required: true,
                        message: "请输入总金额",
                        trigger: "blur"
                    },
                    {
                        validator: numberCheck,
                        message: '请输入正确的数字格式',
                        trigger: 'blur'
                    },
                ],*/
            },
        }
    },
    props: {
        // id: Number,
        // logType: String,
        index: Number,
    },
    /*资源加载子页面，js不需要*/
    components: {
        searchEmpMaster,
        valid,
    },
    computed: {
        id () {
            return this.$store.state.empBorrow.mainId;
        },
        logType () {
            return this.$store.state.empBorrow.logType;
        }
    },
    mounted () {
        //this.getSelect("emptype");
    },
    methods: {
        //上级清除员工选择
        dbclean () {
            const t = this
            t.formValidate.empnhName = '';
            t.formValidate.empnhIdno = '';
            t.formValidate.empId = '';
            t.formValidate.unitFname = '';
            t.formValidate.deptId = '';
            t.formValidate.postFname = '';
            t.formValidate.postId = '';
        },
        getData (id) {
            const t = this
            t.spinShow = true; //开启loading效果
            getDataLevelUserLogin({
                _mt: 'empBorrow.getById',
                id: id,
                funId: '1',
                logType: '借支信息id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res.data.content[0])
                    t.formValidate = res.data.content[0]
                    t.formValidate.empnhName = res.data.content[0].empnhName
                    t.formValidate.empnhIdno = res.data.content[0].empnhIdno
                    t.formValidate.empId = res.data.content[0].empId
                    t.formValidate.deptId = res.data.content[0].deptId
                    t.formValidate.unitFname = res.data.content[0].unitFname
                    t.formValidate.postId = res.data.content[0].postId
                    t.formValidate.postFname = res.data.content[0].postFname
                    t.formValidate.borrTotamount = res.data.content[0].borrTotamount
                    t.formValidate.note = res.data.content[0].note
                    if (t.logType === '查看') {
                        t.forbidden = true
                        t.distype = true
                    } else {
                        t.forbidden = false
                        t.distype = false
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false; //关闭loading效果
            });
        },
        handleSubmit () {

            const t = this
           
            // t.spinShow = true; //开启loading效果
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            data._mt = 'empBorrow.addOrUpd'
            if (t.id != '') {
                this.$store.commit('empBorrow/setLogType', "修改");
            }
            if (t.logType === '修改') {
                data.id = t.id
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                     t.loadingStatus = true
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (t.logType === '新增') {
                                t.$Message.success('新增成功');
                                this.$store.commit('empBorrow/setMainId', res.data.content[0].id)
                                t.$emit('newdata', res.data.content[0]);
                            } else {
                                t.$Message.success('修改成功');
                                this.$store.commit('empBorrow/setMainId', res.data.content[0].id)
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    }).finally(() => {
                        t.loadingStatus = false
                    })
                }
            })
        },
        /*选择员工*/
        pickEmpData () {
            const t = this;
            t.$refs.searchEmpMaster.getData();
            t.openEmpMaster = true;
        },
        closeEmp () {
            const t = this
            t.openEmpMaster = false
        },
        inputEmp (row) {
            const t = this
            t.formValidate.empnhName = row.empnhName;
            t.formValidate.empnhIdno = row.empnhIdno;
            t.formValidate.empId = row.id;
            t.formValidate.unitFname = row.unitFname;
            t.formValidate.deptId = row.deptId;
            t.formValidate.postFname = row.postFname;
            t.formValidate.postId = row.postId;
        },
        handleReset () {
            this.$refs.formValidate.resetFields()
            this.$emit('closeUp')
        },
        // handleUpload (file) {
        //     this.file = file
        //     this.loadingStatus = true
        //     return false
        // },
        //清除
        clear () {
            const t = this
            t.formValidate = {}
            this.$refs.formValidate.resetFields()
            t.openUpdate = false
            t.forbidden = false
            this.$store.commit('empBorrow/setMainId', "")
            this.$store.commit('empBorrow/setLogType', "");
        },

    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.option-main {
    position: relative;
    height: 500px;
}
.btn {
    position: absolute;
    bottom: 20px;
    right: 60px;
}
.btn1 {
    position: absolute;
    bottom: 20px;
    right: 124px;
}
</style>
