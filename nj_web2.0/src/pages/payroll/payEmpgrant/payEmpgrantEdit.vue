<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
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
                <Row class="main-height"
                     ref="scrollBox">
                    <Form ref="formValidate"
                        :model="formValidate"
                        :rules="ruleValidate"
                        :label-width="100">
                 <Row>
              <Col span="11">
                <FormItem label="项目名称" prop="unitFname">
                  <Input v-model="formValidate.unitFname"
                       :disabled=disabled
                       placeholder="请输入项目名称"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="岗位名称" prop="postFname">
                  <Input v-model="formValidate.postFname"
                         :disabled=disabled
                         placeholder="请输入岗位名称"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                 <FormItem label="薪资期间" prop="grantPer">
                  <Input v-model="formValidate.grantPer"
                         :disabled=disabled
                         placeholder="请输入薪资期间"></Input>
                 </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="发放日期" prop="grantDate">
                  <DatePicker type="date"
                    placeholder="请选择发放日期"
                    :editable="false" :disabled="disabled"
                    :readonly="disabled"
                    v-model="formValidate.grantDate"
                    format="yyyy-MM-dd"
                    style="width: 100%">
                  </DatePicker>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="员工姓名" prop="empnhName">
                  <Input v-model="formValidate.empnhName"
                      :disabled=disabled
                      placeholder="请输入员工姓名"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="证件号码" prop="empnhIdno">
                  <Input v-model="empnhIdno"
                      :disabled=disabled
                      placeholder="请输入证件号码"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="证件号码" prop="empIdno">
                  <Input v-model="formValidate.empIdno"
                    :disabled=disabled
                    placeholder="请输入证件号码"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="开户银行" prop="bankCname">
                  <Input v-model="formValidate.bankCname"
                      :disabled=disabled
                      placeholder="请输入开户银行"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="银行账号" prop="grantBkno">
                  <Input v-model="formValidate.grantBkno"
                     :disabled=disabled
                     placeholder="请输入银行账号"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="发放金额" prop="grantAmount">
                  <Input v-model="formValidate.grantAmount"
                      :disabled=disabled
                      placeholder="请输入发放金额"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="发放成功日期" prop="grantSudate">
                  <DatePicker type="date"
                    placeholder="请选择发放成功日期"
                    :editable="false"
                    :disabled="disabled"
                    :readonly="disabled"
                    v-model="formValidate.grantSudate"
                    format="yyyy-MM-dd"
                    style="width: 100%">
                  </DatePicker>
                </FormItem>
               </Col>
              <Col span="23">
                <FormItem label="发放失败原因" prop="grantErnote">
                  <Input v-model="formValidate.grantErnote"
                      :disabled="disabled" type="textarea"
                      :autosize="{minRows: 2,maxRows: 5}"
                      placeholder="请输入发放失败原因..."></Input>
                </FormItem>
              </Col>
              <Col span="23">
                <FormItem label="备注" prop="note">
                  <Input v-model="formValidate.note"
                      :disabled="disabled"
                      type="textarea"
                      :autosize="{minRows: 2,maxRows: 5}"
                      placeholder="请输入备注..."></Input>
                </FormItem>
              </Col>

            </Row>
        </Form>
    </Row>
</div>
            <div class="button_box">
                <Button type="ghost"
                        @click="handleReset"
                        class="btn1">取消</Button>
                <Button type="primary"
                        @click="handleSubmit"
                        v-show="!disabled"
                        class="btn">保存</Button>
            </div>

        </div>
        <!--  弹出选择框  -->

    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import downLoad from '@/components/downLoad/downLoad'
import valid from '@/lib/pub_valid'
import searchDept from "@/components/searchTable/searchDept";

export default {
    data () {
        //数字校验
        const numberCheck = (rule, value, numberValCheck) => {
            if (value !== '' && value !== undefined) {
                if (valid.val_number103(value)) {
                    return numberValCheck()
                }
                return numberValCheck(new Error(rule.message))
            }
            numberValCheck()
        };
        return {
            //表单loading
            spinShow: false,
            //禁选
            disabled: false,
            openUnitFname: false,
unitFname: "",
postFname: "",
empnhName: "",
empnhIdno: "",
bankCname: "",


            typeCode: "",
            //提交mt名称
            addOrUpd_mt: 'payEmpgrant.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payEmpgrant.getById',
            //form表单提交数据
            formValidate: {
            	    deptId: '',
    postId: '',
    grantPer: '',
    grantDate: '',
    empId: '',
    empIdno: '',
    grantBank: '',
    grantBkno: '',
    grantAmount: '',
    grantSudate: '',
    grantErnote: '',
    note: '',
    state: '',

            },
            //表单验证规则
            ruleValidate: {

            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {

    },
    mounted () {

    },
    methods: {
        //获取列表详情
        getData (id) {
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt: t.getById_mt,
                id: id,
                logType: 'Id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0]
                       t.formValidate.deptId = data.deptId;
    t.unitFname = data.unitFname;
    t.formValidate.postId = data.postId;
    t.postFname = data.postFname;
    t.formValidate.grantPer = data.grantPer;
    t.formValidate.grantDate = data.grantDate;
    t.formValidate.empId = data.empId;
    t.empnhName = data.empnhName;
    t.empnhIdno = data.empnhIdno;
    t.formValidate.empIdno = data.empIdno;
    t.formValidate.grantBank = data.grantBank;
    t.bankCname = data.bankCname;
    t.formValidate.grantBkno = data.grantBkno;
    t.formValidate.grantAmount = data.grantAmount;
    t.formValidate.grantSudate = data.grantSudate;
    t.formValidate.grantErnote = data.grantErnote;
    t.formValidate.note = data.note;
    t.formValidate.state = data.state;

                }
            }).catch(() => {
                this.$Message.error(this.$t("reminder.errormessage"));
            }).finally(() => {
                t.spinShow = false
            });
        },
        //获取下拉列表数据
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                typeCode: t.typeCode,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];

                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //提交
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data._mt = t.addOrUpd_mt;
            data.logType = t.logType;
            if (t.logType === t.$t('button.upd')) {
                data.id = t.id
            }

            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginNew(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (t.logType === t.$t('button.add')) {
                                t.$Message.success(t.$t("reminder.addsuccess"));
                                t.$emit('newData', res.data.content[0])
                            } else {
                                t.$Message.success(t.$t("reminder.updsuccess"));
                                t.$emit('update', res.data.content[0])
                            }
                            t.handleReset();
                        }
                    }).catch(() => {
                        t.$Message.error(t.$t("reminder.errormessage"));
                    })
                }
            })
        },
        //取消
        handleReset () {
            //重置表单
            this.$refs.scrollBox.$el.scrollTop = "0";
            this.$refs.formValidate.resetFields();
            this.formValidate = {};
            this.unitFname = "";
this.postFname = "";
this.empnhName = "";
this.empnhIdno = "";
this.bankCname = "";

            this.$emit('closeUp');
        },
       clearUnitFname () {
this.unitFname = "";
this.formValidate.deptId = "";
},
unitFnamePick () {
this.$refs.unitFnameSearch.getData();
this.openUnitFname = true;
 },
closeUnitFname () {
this.openUnitFname = false;
},
inputUnitFname (row) {
this.formValidate.deptId = row.deptId;
this.unitFname = row.unitFname;
},

    },
}
</script>
<style lang="scss">
@import "../../../sass/updateAndAdd";
@import "../../../sass/singleUpdateAdd";
</style>
