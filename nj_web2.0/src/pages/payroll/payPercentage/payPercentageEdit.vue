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
<FormItem label="提成类型" prop="pectTypeDis">
<Select v-model="formValidate.pectTypeDis" :clearable="!disabled" :disabled=disabled placeholder="请选择提成类型">
<Option :value="item.paramCode" v-for="(item,index) in pectTypeDisData" :key="index">{{item.paramInfoCn}}</Option>
</Select>
</FormItem>
</Col>
<Col span="11">
<FormItem label="生效时间" prop="pectStart">
<DatePicker type="date" placeholder="请选择生效时间" :editable="false" :disabled="disabled" :readonly="disabled" v-model="formValidate.pectStart" format="yyyy-MM-dd" style="width: 100%"></DatePicker>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="失效时间" prop="pectEnd">
<DatePicker type="date" placeholder="请选择失效时间" :editable="false" :disabled="disabled" :readonly="disabled" v-model="formValidate.pectEnd" format="yyyy-MM-dd" style="width: 100%"></DatePicker>
</FormItem>
</Col>
<Col span="11">
<FormItem label="员工比例" prop="pectStaff">
<Input v-model="formValidate.pectStaff" :disabled=disabled placeholder="请输入员工比例"></Input>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="主管比例" prop="pectPerson">
<Input v-model="formValidate.pectPerson" :disabled=disabled placeholder="请输入主管比例"></Input>
</FormItem>
</Col>
<Col span="11">
<FormItem label="经理比例" prop="pectManager">
<Input v-model="formValidate.pectManager" :disabled=disabled placeholder="请输入经理比例"></Input>
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
    <transition name="fade">
        <searchOrgframe v-show="openUnitFname"
            :searchCloumns="searchCloumns2"
            @closeUp="closeUnitFname"
            :params="params2"
            @changeinput ="inputUnitFname"
            ref="searchOrgframe">
        </searchOrgframe>
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
            pectTypeDis: "",
            pectTypeDisData:[],
            
            typeCode: "pectType",pectTypeData: [],

            //提交mt名称
            addOrUpd_mt: 'payPercentage.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payPercentage.getById',
             params2: {
                _mt: 'orgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'desc',
                rows: 20,
                page: 1,
                funId: '1',
                logType: '组织架构查询',
                data: '{}',
                state:'02valid',
                unitType:'02dept',
            },
             searchCloumns2:[
                {
                    title: "组织编码",
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: "组织名称",
                    key: 'unitFname',
                },
                {
                    title: "组织类型",
                    key: 'unitTypeName',
                },
            ],
            //form表单提交数据
            formValidate: {
            	    deptId: '', 
                pectType: '', 
                pectStart: '', 
                pectEnd: '', 
                pectStaff: '', 
                pectPerson: '', 
                pectManager: '', 
                note: '', 
                state: '', 

            },
            //表单验证规则
            ruleValidate: {
                deptId: [
{ required: true, message: "请输入项目名称", trigger: "change" },
],
pectType: [
{ required: true, message: "请输入提成类型", trigger: "change" },
],
pectStart: [
{ required: true, message: "请输入生效时间", trigger: "change" },
],
pectEnd: [
{ required: true, message: "请输入失效时间", trigger: "change" },
],
pectStaff: [
{ required: true, message: "请输入员工比例", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
pectPerson: [
{ required: true, message: "请输入主管比例", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
pectManager: [
{ required: true, message: "请输入经理比例", trigger: "blur" },
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
                       t.formValidate.deptId = data.deptId;
    t.unitFname = data.unitFname;
    t.formValidate.pectType = data.pectType;
    t.pectTypeDis = data.pectTypeDis;
    t.formValidate.pectStart = data.pectStart;
    t.formValidate.pectEnd = data.pectEnd;
    t.formValidate.pectStaff = data.pectStaff;
    t.formValidate.pectPerson = data.pectPerson;
    t.formValidate.pectManager = data.pectManager;
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
                    t.pectTypeDisData = data.value[0].paramList;
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
this.pectTypeDis = "";

            this.$emit('closeUp');
        },
       clearUnitFname () {
this.unitFname = "";
this.formValidate.deptId = "";
},
unitFnamePick () {
this.$refs.searchOrgframe.getData(this.params2);
this.openUnitFname = true;
 },
closeUnitFname () {
this.openUnitFname = false;
},
inputUnitFname (name, id, type) {
this.formValidate.deptId = id;
this.unitFname = name;
},

    },
}
</script>
<style lang="scss">
@import "../../../sass/updateAndAdd";
@import "../../../sass/singleUpdateAdd";
</style>