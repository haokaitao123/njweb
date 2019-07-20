<template>
    <div class="cover">
        <div class="box"
             style="padding-bottom:20px;">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;交接时间
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
                    <Col span="11">
                    <FormItem label="交接时间"
                              prop="dimCoftime">
                        <DatePicker type="datetime"
                                    placeholder="请选择交接时间"
                                    :editable="false"
                                    v-model="formValidate.dimCoftime"
                                    style="width: 100%"></DatePicker>
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
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
export default {
    data () {
        return {
            formValidate: {
                dimCoftime: ""
            },
            disabled: false,
            dimTypeDis: "",
            dimReasonDis: "",
            loadingStatus: false,
            openDeptPick: false,
            openPost: false,
            openEmpMaster: false,
            selectDimtype: [],
            selectDimReason: [],
            ruleValidate: {
                dimCoftime: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择交接时间",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    props: {
        selectType: Array,
        id: Array,
        logType: String,
        index: Number,
    },
    components: {
        // searchDept,
        // searchPost,
        // searchEmpMaster,
    },
    mounted () {
        // this.getSelect();
    },
    methods: {
        handleSubmit () {
            const t = this;
            t.$refs.formValidate.validate(valid => {
                if (valid) {
                    t.$Modal.confirm({
                        title: t.$t("reminder.remind"),
                        content: "是否确定交接时间",
                        onOk: () => {
                            debugger
                            let params = "";
                            const data = deepCopy(t.formValidate);
                            data.dimCoftime = new Date(data.dimCoftime).format(
                                "yyyy-MM-dd hh:mm:ss"
                            );
                            params = JSON.stringify(data);
                            let tt = {};
                            tt._mt = "EmpEmpdim.updateById";
                            tt.logType = t.logType;
                            tt.ids = t.id.toString();
                            tt.data = params;
                            tt.updType = "handover";

                            getDataLevelUserLogin(tt)
                                .then(res => {
                                    if (isSuccess(res, t)) {
                                        t.$Message.success("交接时间设置成功");
                                        t.handleReset();
                                    }
                                })
                                .catch(() => {
                                    t.$Message.error(t.$t("reminder.errormessage"));
                                });
                        },
                        onCancel: () => { }
                    });
                }
            });
        },
        //查询公共参数
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "separatereason,terminatereason"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectDimtype = res.data.content[0].value[0].paramList;
                        t.selectDimReason = res.data.content[0].value[1].paramList;
                    }
                })
                .catch(() => {
                    this.$Message.error("网络错误");
                });
        },
        handleReset () {
            this.$emit("closeHandoveraction");
            this.$refs.formValidate.resetFields();
            this.formValidate.dimCoftime = "";
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
