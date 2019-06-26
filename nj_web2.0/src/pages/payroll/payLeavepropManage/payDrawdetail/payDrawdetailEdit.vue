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
<FormItem label="计提期间" prop="drawPer">
<DatePicker type="date" placeholder="请选择计提期间" :editable="false" :disabled="disabled" :readonly="disabled" v-model="formValidate.drawPer" format="yyyy-MM-dd" style="width: 100%"></DatePicker>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="计提金额" prop="drawAmount">
<Input v-model="formValidate.drawAmount" :disabled=disabled placeholder="请输入计提金额"></Input>
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
            
            
            typeCode: "",
            //提交mt名称
            addOrUpd_mt: 'payDrawdetail.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payDrawdetail.getById',
            //form表单提交数据
            formValidate: {
            	    drawPid: '', 
    drawPer: '', 
    drawAmount: '', 
    note: '', 

            },
            //表单验证规则
            ruleValidate: {
                drawPer: [
{ required: true, message: "请输入计提期间", trigger: "change" },
],
drawAmount: [
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
            return this.$store.state.payDrawdetail.mainId;
        },
        childLogType () {
            return this.$store.state.payDrawdetail.childLogType;
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
                       t.formValidate.drawPid = data.drawPid;
    t.formValidate.drawPer = data.drawPer;
    t.formValidate.drawAmount = data.drawAmount;
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
            
        },
       
    },
}
</script>
<style lang="scss">
@import "../../../sass/singleUpdateAdd";
</style>