<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{childLogType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <Row class="main-height">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="100">
                        <Row>
                           <Col span="11">
<FormItem label="阶段期数" prop="bystStageDis">
<Select v-model="formValidate.bystStageDis" :clearable="!disabled" :disabled=disabled placeholder="请选择阶段期数">
<Option :value="item.paramCode" v-for="(item,index) in bystStageData" :key="index">{{item.paramInfoCn}}</Option>
</Select>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="阶段间隔" prop="bystIntervalDis">
<Select v-model="formValidate.bystIntervalDis" :clearable="!disabled" :disabled=disabled placeholder="请选择阶段间隔">
<Option :value="item.paramCode" v-for="(item,index) in bystIntervalData" :key="index">{{item.paramInfoCn}}</Option>
</Select>
</FormItem>
</Col>
<Col span="11">
<FormItem label="阶段天数" prop="bystDay">
<Input v-model="formValidate.bystDay" :disabled=disabled placeholder="请输入阶段天数"></Input>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="阶段金额" prop="bystAmount">
<Input v-model="formValidate.bystAmount" :disabled=disabled placeholder="请输入阶段金额"></Input>
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
        
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import downLoad from '@/components/downLoad/downLoad'
import valid from '@/lib/pub_valid'

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
            bystStageDis: "",
bystIntervalDis: "",

            
            typeCode: "bystStage,bystInterval",
            bystStageData: [],
bystIntervalData: [],

            //提交mt名称
            addOrUpd_mt: 'payBystages.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payBystages.getById',
            //form表单提交数据
            formValidate: {
            	    bystPid: '', 
    bystStage: '', 
    bystInterval: '', 
    bystDay: '', 
    bystAmount: '', 
    note: '', 

            },
            //表单验证规则
            ruleValidate: {
                bystStage: [
{ required: true, message: "请输入阶段期数", trigger: "change" },
],
bystInterval: [
{ required: true, message: "请输入阶段间隔", trigger: "change" },
],
bystDay: [
{ required: true, message: "请输入阶段天数", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
bystAmount: [
{ required: true, message: "请输入阶段金额", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],

            },
        }
    },
    props: {
        id: Number,
        index: Number,
    },
    computed: {
        mainId () {
            return this.$store.state.payProjbase.mainId;
        },
        childLogType () {
            return this.$store.state.payProjbase.childLogType;
        }
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
                       t.formValidate.bystPid = data.bystPid;
    t.formValidate.bystStage = data.bystStage;
    t.bystStageDis = data.bystStageDis;
    t.formValidate.bystInterval = data.bystInterval;
    t.bystIntervalDis = data.bystIntervalDis;
    t.formValidate.bystDay = data.bystDay;
    t.formValidate.bystAmount = data.bystAmount;
    t.formValidate.note = data.note;

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
                    t.bystIntervalData = data.value[0].paramList;
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
        clear () {
            //重置表单
            this.$refs.scrollBox.$el.scrollTop = "0";
            this.$refs.formValidate.resetFields();
            this.formValidate = {};
            this.bystStageDis = "";
            this.bystIntervalDis = "";
        },
        handleReset(){
            this.$emit("closeUp");
            //对整个表单进行重置，将所有字段值重置为空并移除校验结果
            this.clear()
        }
    },
}
</script>
<style lang="scss">
@import "../../../sass/singleUpdateAdd";
</style>