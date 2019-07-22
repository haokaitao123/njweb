<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>
                    &nbsp;{{childLogType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <Row>
                <Form :model="form"
                      label-position="right"
                      :rules="ruleValidate"
                      ref="form"
                      :label-width="110">
                    <i-col span="11">
                        <FormItem label="开始时间"
                                  prop="weSdate">
                            <DatePicker type="date"
                                        placeholder="请选择开始日期"
                                        style="width: 100%"
                                        :editable="false"
                                        :disabled="disabled"
                                        :readonly="disabled"
                                        v-model="form.weSdate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="结束时间"
                                  prop="weEdate">
                            <DatePicker type="date"
                                        placeholder="请选择结束日期"
                                        style="width: 100%"
                                        :editable="false"
                                        :disabled="disabled"
                                        :readonly="disabled"
                                        v-model="form.weEdate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="工作单位"
                                  prop="weComp">
                            <Input v-model="form.weComp"
                                   :disabled="disabled"
                                   :maxlength="maxlength"
                                   placeholder="请输入工作单位"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="工作部门"
                                  prop="weDept">
                            <Input v-model="form.weDept"
                                   :disabled="disabled"
                                   :maxlength="maxlength"
                                   placeholder="请输入工作部门"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="工作职务"
                                  prop="wePost">
                            <Input v-model="form.wePost"
                                   :disabled="disabled"
                                   :maxlength="maxlength"
                                   placeholder="请输入工作职务"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="薪资"
                                  prop="weSalary">
                            <Input v-model="form.weSalary"
                                   :disabled="disabled"
                                   :maxlength="12"
                                   placeholder="请输入薪资"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="23">
                        <FormItem label="主要业绩"
                                  prop="wePerforman">
                            <Input v-model="form.wePerforman"
                                   :disabled="disabled"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入主要业绩/成果"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="证明人"
                                  prop="weContact">
                            <Input v-model="form.weContact"
                                   :disabled="disabled"
                                   :maxlength="maxlength"
                                   placeholder="请输入证明人"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="联系电话"
                                  prop="wePhone">
                            <Input v-model="form.wePhone"
                                   :disabled="disabled"
                                   placeholder="请输入联系电话"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="23">
                        <FormItem label="离职原因"
                                  prop="weLevrason">
                            <Input v-model="form.weLevrason"
                                   :disabled="disabled"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入离职原因"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="23">
                        <FormItem label="备注"
                                  prop="note">
                            <Input v-model="form.note"
                                   type="textarea"
                                   :disabled="disabled"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入备注"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="23">
                        <row type="flex"
                             justify="end">
                            <FormItem label
                                      prop="comment">
                                <Button type="ghost"
                                        @click="close"
                                        style="margin-left: 8px">取消</Button>
                                <Button type="primary"
                                        v-show="!disabled"
                                        @click="save">保存</Button>

                            </FormItem>
                        </row>
                    </i-col>
                </Form>
            </Row>
        </div>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
    uploadFile
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";
import valid from '../../../../lib/pub_valid'
export default {
    data () {
        const date = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择开始日期"));
            } else {
                //开始时间不能大于结束时间
                let startTimeNum = (new Date(this.form.weSdate)).getTime();
                let endTimeNum = (new Date(this.form.weEdate)).getTime();
                if (startTimeNum > endTimeNum) {
                    callback(new Error('开始日期不能大于结束日期'))
                }
                callback()

            }
        };
        const phonecheck = (rule, value, calphonecheck) => {
            if (valid.val_mobile(value)) {
                return calphonecheck()
            }
            return calphonecheck(new Error(rule.message))
        }
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
            disabled: false,
            form: {
                _mt: "empWorkExp.addOrUpd",
                weSdate: "",
                weEdate: "",
                weComp: "",
                weDept: "",
                wePost: "",
                wePerforman: "",
                weContact: "",
                wePhone: "",
                weSalary: "",
                weLevrason: "",
                note: ""
            },
            maxlength: 500,
            ruleValidate: {
                weSdate: [
                    {
                        required: true,
                        type: "date",
                        validator: date,
                        trigger: "change"
                    }
                ],
                weEdate: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择结束日期",
                        trigger: "change"
                    }
                ],
                weComp: [
                  { required: true, message: "请填写工作单位", trigger: "blur" }
                ],
/*                weContact: [
                    { required: true, message: "请输入证明人", trigger: "blur" }
                ],*/
                weSalary: [
                    {
                      required: true,
                      message: "请填写薪资",
                      trigger: "blur"
                    },
                    {
                        validator: numberCheck,
                        message: '请输入正确的数字格式',
                        trigger: 'blur'
                    }
                ],
/*                wePhone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    },
                    {
                        validator: phonecheck,
                        message: '请填写正确的手机号',
                        trigger: 'blur'
                    },
                    {
                        validator: numberCheck,
                        message: '请输入正确的数字格式',
                        trigger: 'blur'
                    },
                ],*/
/*                weLevrason: [
                    { required: true, message: "请输入离职原因", trigger: "blur" }
                ],*/
            },
            logTypeE: this.logType,
            spinShow: ''
        };
    },
    //    主表id
    props: {
        id: Number,
        index: Number,
    },
    computed: {
        mainId () {
            return this.$store.state.empMaster.mainId;
        },
        childLogType () {
            return this.$store.state.empMaster.childLogType;
        }
    },
    methods: {
        // 新增页面
        setRowId (id, logType) {
            const t = this;
            if (logType !== "新增") {
                t.getData(id);
            }
        },
        // 查询
        getData (id) {
            const t = this;
            t.spinShow = true
            const params = {
                _mt: "empWorkExp.getById",
                id: id,
                funId: "1",
                logType: "根据id查询信息"
            };
            getDataLevelUserLogin(params)
                .then(res => {
                    if (isSuccess(res, t)) {
                        console.log(res.data.content[0]);
                        t.form.weSdate = res.data.content[0].weSdate;
                        t.form.weEdate = res.data.content[0].weEdate;
                        t.form.weComp = res.data.content[0].weComp;
                        t.form.weDept = res.data.content[0].weDept;
                        t.form.wePost = res.data.content[0].wePost;
                        t.form.wePerforman = res.data.content[0].wePerforman;
                        t.form.weContact = res.data.content[0].weContact;
                        t.form.wePhone = res.data.content[0].wePhone;
                        t.form.weSalary = res.data.content[0].weSalary;
                        t.form.weLevrason = res.data.content[0].weLevrason;
                        t.form.note = res.data.content[0].note;
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                })
                .finally(() => {
                    t.spinShow = false
                });
        },
        save () {
            const t = this;
            const data = deepCopy(t.form);
            data._mt = "empWorkExp.addOrUpd";
            data.logType = t.childLogType;
            if (t.childLogType === "新增") {
                data.pkId = t.mainId; // 放入主表id
            } else {
                data.id = t.id
            }
            if (data.weSdate !== undefined) {
                data.weSdate =
                    data.weSdate === ""
                        ? ""
                        : new Date(data.weSdate).format("yyyy-MM-dd");
            }
            if (data.weEdate !== undefined) {
                data.weEdate =
                    data.weEdate === ""
                        ? ""
                        : new Date(data.weEdate).format("yyyy-MM-dd");
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    getDataLevelUserLoginNew(data)
                        .then(res => {
                            if (isSuccess(res, t)) {
                                if (t.childLogType === '修改') {
                                    this.$Message.success('修改成功');
                                    t.$emit("update", res.data.content[0]);
                                } else {
                                    this.$Message.success('新增成功');
                                    t.$emit("newdata", res.data.content[0]);
                                }
                                t.close();
                            }
                        })
                        .catch(() => {
                            this.$Message.error('网络错误');
                        });
                }
            });
        },
        clear () {
            const t = this;
            t.form = {};
            t.$refs.form.resetFields();
        },
        close () {
            this.clear();
            this.$emit("hideMsg");

        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../../../sass/updateAndAdd";
.btn {
    position: absolute;
    bottom: 20px;
    right: 36px;
}
</style>
