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
<FormItem label="项目名称" prop="deptId">
<span @dblclick="disabled?'':clearUnitFname()">
 <Input v-model="unitFname" icon="search" :disabled="disabled" :readonly="true" placeholder="请选择项目名称" @on-click="disabled?'':unitFnamePick()" />
</span>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="成本类型" prop="costTypeDis">
<Select v-model="formValidate.costTypeDis" :clearable="!disabled" :disabled=disabled placeholder="请选择成本类型">
<Option :value="item.paramCode" v-for="(item,index) in costTypeDisData" :key="index">{{item.paramInfoCn}}</Option>
</Select>
</FormItem>
</Col>
<Col span="11">
<FormItem label="期间" prop="costPer">
<Input v-model="formValidate.costPer" :disabled=disabled placeholder="请输入期间"></Input>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="职能部门工资" prop="costPays">
<Input v-model="formValidate.costPays" :disabled=disabled placeholder="请输入职能部门工资"></Input>
</FormItem>
</Col>
<Col span="11">
<FormItem label="水电费" prop="costWater">
<Input v-model="formValidate.costWater" :disabled=disabled placeholder="请输入水电费"></Input>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="工位费" prop="costWorkstat">
<Input v-model="formValidate.costWorkstat" :disabled=disabled placeholder="请输入工位费"></Input>
</FormItem>
</Col>
<Col span="11">
<FormItem label="业务费" prop="costBusiness">
<Input v-model="formValidate.costBusiness" :disabled=disabled placeholder="请输入业务费"></Input>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="费用A" prop="costAmounta">
<Input v-model="formValidate.costAmounta" :disabled=disabled placeholder="请输入费用A"></Input>
</FormItem>
</Col>
<Col span="11">
<FormItem label="费用B" prop="costAmountb">
<Input v-model="formValidate.costAmountb" :disabled=disabled placeholder="请输入费用B"></Input>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="费用C" prop="costAmountc">
<Input v-model="formValidate.costAmountc" :disabled=disabled placeholder="请输入费用C"></Input>
</FormItem>
</Col>
<Col span="11">
<FormItem label="费用D" prop="costAmountd">
<Input v-model="formValidate.costAmountd" :disabled=disabled placeholder="请输入费用D"></Input>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="费用E" prop="costAmounte">
<Input v-model="formValidate.costAmounte" :disabled=disabled placeholder="请输入费用E"></Input>
</FormItem>
</Col>
<Col span="11">
<FormItem label="费用F" prop="costAmountf">
<Input v-model="formValidate.costAmountf" :disabled=disabled placeholder="请输入费用F"></Input>
</FormItem>
</Col>
<Col span="23">
<FormItem label="备注" prop="note">
<Input v-model="formValidate.note"
:disabled="disabled" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
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
            <transition name="fade">
    <searchOrgframe v-show="openUnitFname"
    @closeModal="closeUnitFname"
    @inputModal ="inputUnitFname"
    ref="unitFnameSearch"></searchOrgframe>
    </transition>

    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import downLoad from '@/components/downLoad/downLoad'
import valid from '@/lib/pub_valid'
import searchOrgframe from "@/components/searchTable/searchOrgframe";

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
costTypeDis: "",

            
            typeCode: "costType",costTypeData: [],

            //提交mt名称
            addOrUpd_mt: 'payCost.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payCost.getById',
            //form表单提交数据
            formValidate: {
            	    costPer: '', 
    deptId: '', 
    costType: '', 
    costPays: '', 
    costWater: '', 
    costWorkstat: '', 
    costBusiness: '', 
    costAmounta: '', 
    costAmountb: '', 
    costAmountc: '', 
    costAmountd: '', 
    costAmounte: '', 
    costAmountf: '', 
    note: '', 
    state: '', 

            },
            //表单验证规则
            ruleValidate: {
                deptId: [
{ required: true, message: "请输入项目名称", trigger: "change" },
],
costType: [
{ required: true, message: "请输入成本类型", trigger: "change" },
],
costPer: [
{ required: true, message: "请输入期间", trigger: "blur" },
],
costPays: [
{ required: true, message: "请输入职能部门工资", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costWater: [
{ required: true, message: "请输入水电费", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costWorkstat: [
{ required: true, message: "请输入工位费", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costBusiness: [
{ required: true, message: "请输入业务费", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costAmounta: [
{ required: true, message: "请输入费用A", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costAmountb: [
{ required: true, message: "请输入费用B", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costAmountc: [
{ required: true, message: "请输入费用C", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costAmountd: [
{ required: true, message: "请输入费用D", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costAmounte: [
{ required: true, message: "请输入费用E", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
costAmountf: [
{ required: true, message: "请输入费用F", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],

            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {
    	searchOrgframe,

        
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
                       t.formValidate.costPer = data.costPer;
    t.formValidate.deptId = data.deptId;
    t.unitFname = data.unitFname;
    t.formValidate.costType = data.costType;
    t.costTypeDis = data.costTypeDis;
    t.formValidate.costPays = data.costPays;
    t.formValidate.costWater = data.costWater;
    t.formValidate.costWorkstat = data.costWorkstat;
    t.formValidate.costBusiness = data.costBusiness;
    t.formValidate.costAmounta = data.costAmounta;
    t.formValidate.costAmountb = data.costAmountb;
    t.formValidate.costAmountc = data.costAmountc;
    t.formValidate.costAmountd = data.costAmountd;
    t.formValidate.costAmounte = data.costAmounte;
    t.formValidate.costAmountf = data.costAmountf;
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
this.costTypeDis = "";

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