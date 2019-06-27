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
                 ref="scrollBox">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="100">
                    <Row>
                        <Col span="11">
                        <FormItem label="人数下限"
                                  prop="ladeUpper">
                            <Input v-model="formValidate.ladeUpper"
                                   :disabled=disabled
                                   placeholder="请输入人数下限"></Input>
                        </FormItem>
                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem label="人数上限"
                                  prop="ladeLower">
                            <Input v-model="formValidate.ladeLower"
                                   :disabled=disabled
                                   placeholder="请输入人数上限"></Input>
                        </FormItem>
                        </Col>
                        <Col span="11">
                        <FormItem label="业绩 金额"
                                  prop="ladeAmount">
                            <Input v-model="formValidate.ladeAmount"
                                   :disabled=disabled
                                   placeholder="请输入业绩 金额"></Input>
                        </FormItem>
                        </Col>
                        <Col span="23">
                        <FormItem label="备注"
                                  prop="note">
                            <Input v-model="formValidate.note"
                                   :disabled="disabled"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入备注..."></Input>
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
            typeCode: "",
            //提交mt名称
            addOrUpd_mt: 'payLadder.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payLadder.getById',
            //form表单提交数据
            formValidate: {
                ladePid: '',
                ladeUpper: '',
                ladeLower: '',
                ladeAmount: '',
                note: '',

            },
            //表单验证规则
            ruleValidate: {
                ladeUpper: [
                    { required: true, message: "请输入人数下限", trigger: "blur" },
                ],
                ladeLower: [
                    { required: true, message: "请输入人数上限", trigger: "blur" },
                ],
                ladeAmount: [
                    { required: true, message: "请输入业绩 金额", trigger: "blur" },
                    { required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
                ],

            },
            //列表id
            id: ""
        }
    },
    props: {
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
    methods: {
        //获取列表详情
        getData (id, logType) {
            const t = this;
            if (logType == "新增") {
                return;
            }
            t.id = id;
            console.log("t.id", t.id)
            let data = {
                id: '1000',
                ladePid: '2000',
                ladeUpper: "15",
                ladeLower: "50",
                ladeAmount: '3000',
                note: "备注暂无"
            };

            t.formValidate.ladePid = data.ladePid;
            t.formValidate.ladeUpper = data.ladeUpper;
            t.formValidate.ladeLower = data.ladeLower;
            t.formValidate.ladeAmount = data.ladeAmount;
            t.formValidate.note = data.note;
            // getDataLevelUserLogin({
            //     _mt: t.getById_mt,
            //     id: id,
            //     logType: 'Id查询',
            // }).then((res) => {
            //     if (isSuccess(res, t)) {
            //         let data = res.data.content[0]
            //         t.formValidate.ladePid = data.ladePid;
            //         t.formValidate.ladeUpper = data.ladeUpper;
            //         t.formValidate.ladeLower = data.ladeLower;
            //         t.formValidate.ladeAmount = data.ladeAmount;
            //         t.formValidate.note = data.note;

            //     }
            // }).catch(() => {
            //     this.$Message.error(this.$t("reminder.errormessage"));
            // })
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
        },
        handleReset () {
            this.$emit("closeUp");
            //对整个表单进行重置，将所有字段值重置为空并移除校验结果
            this.clear()
        }
    },
}
</script>
<style lang="scss">
@import "../../../sass/updateAndAdd";
@import "../../../sass/singleUpdateAdd";
</style>