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
            <Row class="main-height"
                 style="overflow-y: visible"
                 ref="scrollBox">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="100">
                    <Row>
                        <Col span="11">
                        <FormItem label="阶段日期"
                                  prop="pmceDate">
                            <DatePicker type="date"
                                        placeholder="请选择阶段日期"
                                        :editable="false"
                                        :disabled="disabled"
                                        :readonly="disabled"
                                        v-model="formValidate.pmceDate"
                                        format="yyyy-MM-dd"
                                        style="width: 100%"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem label="阶段属期"
                                  prop="pmceRperDis">
                            <Select v-model="formValidate.pmceRperDis"
                                    :clearable="!disabled"
                                    :disabled=disabled
                                    placeholder="请选择阶段属期">
                                <Option :value="item.paramCode"
                                        v-for="(item,index) in pmceRperDisData"
                                        :key="index">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="11">
                        <FormItem label="业绩金额"
                                  prop="pmceAmount">
                            <Input v-model="formValidate.pmceAmount"
                                   :disabled=disabled
                                   placeholder="请输入业绩金额"></Input>
                        </FormItem>
                        </Col>

                        <Col span="22"
                             offset="1">
                        <Row type="flex"
                             justify="end">
                            <FormItem>
                                <Button type="ghost"
                                        @click="handleReset"
                                        style="margin-left: 8px">取消</Button>
                                <Button type="primary"
                                        @click="handleSubmit"
                                        v-show="!disabled">保存</Button>
                            </FormItem>
                        </Row>
                        </Col>
                    </Row>
                </Form>
            </Row>
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
            pmceRperDis: "",


            typeCode: "pmceRper", pmceRperDisData: [],

            //提交mt名称
            addOrUpd_mt: 'payPerfmance.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payPerfmance.getById',
            //form表单提交数据
            formValidate: {
                drawPid: '',
                note: '',
                pmceDate: '',
                pmceRper: '',
                pmceAmount: '',

            },
            //表单验证规则
            ruleValidate: {
                pmceDate: [
                    { required: true, message: "请输入阶段日期", trigger: "change", type: "date" },
                ],
                pmceAmount: [
                    { required: true, message: "请输入业绩金额", trigger: "blur" },
                    { required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
                ],

            },
            id: ""
        }
    },
    props: {
        index: Number,
    },
    computed: {
        mainId () {
            return this.$store.state.payEntrybase.mainId;
        },
        childLogType () {
            return this.$store.state.payEntrybase.childLogType;
        }
    },
    components: {


    },
    mounted () {

    },
    methods: {
        //获取列表详情
        getData (id, logType) {
            const t = this
            if (logType == "新增") {
                return;
            }
            t.id = id;
            let data = {
                pmceDate: "2019-06-01",
                pmceRperDis: "第三阶段",
                pmceAmount: "20000"
            };
            t.formValidate.pmceDate = data.pmceDate;
            t.formValidate.pmceRper = data.pmceRper;
            t.pmceRperDis = data.pmceRperDis;
            t.formValidate.pmceAmount = data.pmceAmount;
            // getDataLevelUserLogin({
            //     _mt: t.getById_mt,
            //     id: id,
            //     logType: 'Id查询',
            // }).then((res) => {
            //     if (isSuccess(res, t)) {
            //         let data = res.data.content[0]
            //         t.formValidate.drawPid = data.drawPid;
            //         t.formValidate.note = data.note;
            //         t.formValidate.pmceDate = data.pmceDate;
            //         t.formValidate.pmceRper = data.pmceRper;
            //         t.pmceRperDis = data.pmceRperDis;
            //         t.formValidate.pmceAmount = data.pmceAmount;

            //     }
            // }).catch(() => {
            //     this.$Message.error(this.$t("reminder.errormessage"));
            // });
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
                    // getDataLevelUserLoginNew(data).then((res) => {
                    //     if (isSuccess(res, t)) {
                    //         if (t.logType === t.$t('button.add')) {
                    //             t.$Message.success(t.$t("reminder.addsuccess"));
                    //             t.$emit('newData', res.data.content[0])
                    //         } else {
                    //             t.$Message.success(t.$t("reminder.updsuccess"));
                    //             t.$emit('update', res.data.content[0])
                    //         }
                    //         t.handleReset();
                    //     }
                    // }).catch(() => {
                    //     t.$Message.error(t.$t("reminder.errormessage"));
                    // })
                }
            })
        },
        //取消
        clear () {
            //重置表单
            this.$refs.scrollBox.$el.scrollTop = "0";
            this.$refs.formValidate.resetFields();
            this.formValidate = {};
            this.pmceRperDis = "";

        },
        //取消
        handleReset () {
            this.$emit("closeUp");
            //对整个表单进行重置，将所有字段值重置为空并移除校验结果
            this.clear()
        },

    },
}
</script>
<style lang="scss">
@import "../../../../sass/updateAndAdd";
@import "../../../../sass/singleUpdateAdd";
</style>