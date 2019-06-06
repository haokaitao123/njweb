<template>
    <div class="cover">
        <div class="box"
             style="padding-bottom:20px;">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;黑名单
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;height: 150px;">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="120">
                    <Col span="21"
                         offset="1">
                    <FormItem label="原因"
                              prop="recReason">
                        <Input v-model="formValidate.recReason"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入原因"></Input>
                    </FormItem>
                    </Col>
                </Form>
            </div>
            <Button type="primary"
                    @click="handleSubmit"
                    style="float: right;">确定</Button>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios';
import { isSuccess, deepCopy } from '@/lib/util';

export default {
    data () {
        return {
            formValidate: {
                _mt: "recruitProcess.updateById",
                funId: "1",
                logType: "",
                recReason: '',
            },
            loadingStatus: false,
            openDeptPick: false,
            ruleValidate: {

            }
        }
    },
    props: {
        id: String,
        logType: String,
    },
    components: {
    },
    methods: {
        handleSubmit () {
            const t = this;
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.$Modal.confirm({
                        title: t.$t("reminder.remind"),
                        content: '是否确定加入黑名单',
                        onOk: () => {
                            const data = deepCopy(t.formValidate);
                            data.logType = t.logType;
                            data.ids = t.id;
                            getDataLevelUserLogin(data).then(res => {
                                if (isSuccess(res, t)) {
                                    t.$Message.success('添加成功');
                                    t.handleReset();
                                }
                            }).catch(() => {
                                t.$Message.error(t.$t("reminder.errormessage"));
                            });
                        },
                        onCancel: () => {

                        },
                    })
                }
            })
        },
        handleReset () {
            this.$emit('closeTransaction');
            this.$refs.formValidate.resetFields();
            this.formValidate.recReason = "";
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
