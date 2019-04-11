<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>
                    &nbsp;{{logType}}
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
                        <FormItem label="合同类别"
                                  prop="contTypeDis">
                            <Select v-model="form.contTypeDis">
                                <Option :value="item.paramCode"
                                        v-for="(item,index) in selectEdConType"
                                        :key="index">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="合同期限"
                                  prop="contPeriodDis">
                            <Select v-model="form.contPeriodDis">
                                <Option :value="item.paramCode"
                                        v-for="(item,index) in selectConPeriod"
                                        :key="index">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="合同开始日"
                                  prop="conSdate">
                            <DatePicker type="date"
                                        placeholder="请选择开始日期"
                                        style="width: 100%"
                                        :editable="false"
                                        v-model="form.conSdate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="结束时间"
                                  prop="conEdate">
                            <DatePicker type="date"
                                        placeholder="请选择结束日期"
                                        style="width: 100%"
                                        :editable="false"
                                        v-model="form.conEdate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <!-- <i-col span="11">
            <FormItem label="保密协议" prop="" >
              <RadioGroup v-model="form.">
                <Radio
                  :label="item.paramCode"
                  v-for="(item,index) in selectBaomi"
                  :key="index"
                >{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
             </i-col> -->
                    <!-- <i-col span="11">
            <FormItem label="竞业限制协议" prop="" >
              <RadioGroup v-model="form.">
                <Radio
                  :label="item.paramCode"
                  v-for="(item,index) in selectJingye"
                  :key="index"
                >{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
             </i-col> -->
                    <!-- <i-col span="11">
            <FormItem label="合同工作时间" prop="">
              <Select v-model="form.">
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in 自己定义"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col> -->
                    <i-col span="11">
                        <FormItem label="签署日期"
                                  prop="contSigndate">
                            <DatePicker type="date"
                                        placeholder="请选择签署日期"
                                        style="width: 100%"
                                        :editable="false"
                                        v-model="form.contSigndate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="试用期限"
                                  prop="contProbatDis">
                            <Select v-model="form.contProbatDis">
                                <Option :value="item.paramCode"
                                        v-for="(item,index) in selectConProbat"
                                        :key="index">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="试用到期时间"
                                  prop="contProbatdt">
                            <DatePicker type="date"
                                        placeholder="请选择试用到期时间"
                                        style="width: 100%"
                                        :editable="false"
                                        v-model="form.contProbatdt"></DatePicker>
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
                                        @click="save">保存</Button>
                            </FormItem>
                        </row>
                    </i-col>
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

export default {
    data () {
        return {
            file: "",
            filekey: "",
            loadingStatus: false,
            // Visadocpreparer: [],
            // selectEducationlevel: [],
            selectEdCuntry: [],
            selectEdConType: [],
            selectConPeriod: [],
            selectConProbat: [],
            selectBaomi: [
                {
                    paramCode: "1",
                    paramInfoCn: "有"
                },
                {
                    paramCode: "0",
                    paramInfoCn: "无"
                }
            ],
            selectJingye: [
                {
                    paramCode: "1",
                    paramInfoCn: "有"
                },
                {
                    paramCode: "0",
                    paramInfoCn: "无"
                }
            ],
            // yesOrNo: [],
            form: {
                _mt: "empContractInfo.addOrUpd",
                contTypeDis: "",
                contPeriodDis: "",
                conSdate: "",
                conEdate: "",
                contSigndate: "",
                contProbatDis: "",
                contProbatdt: "",
            },
            rowId: "",
            ruleValidate: {
                contTypeDis: [{ required: true, message: "请选择合同类别", trigger: "change" }],
                contPeriodDis: [{ required: true, message: "请选择合同期限", trigger: "change" }],
                conSdate: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择合同开始日期",
                        trigger: "change"
                    }
                ],
                conEdate: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择合同结束日期",
                        trigger: "change"
                    }
                ],
            }
        };
    },
    //    主表id
    props: {
        mainId: Number,
        logType: String
    },
    components: {},
    mounted () {
        this.getSelect();
    },
    methods: {
        // 新增页面
        setRowId (id) {
            const t = this;
            t.rowId = id;
            t.getData();
        },
        // 查询
        getData () {
            const t = this;
            const params = {
                _mt: "empContractInfo.getById",
                id: t.rowId,
                funId: "1",
                logType: "根据id查询信息"
            };
            getDataLevelUserLogin(params)
                .then(res => {
                    if (isSuccess(res, t)) {
                        console.log(res.data.content[0]);
                        // t.form = res.data.content[0];
                        if (res.data.content[0].contTypeDis) {
                            t.form.contTypeDis = res.data.content[0].contTypeDis;
                        } else {
                            t.form.contTypeDis = "";
                        }
                        if (res.data.content[0].contPeriodDis) {
                            t.form.contPeriodDis = res.data.content[0].contPeriodDis;
                        } else {
                            t.form.contPeriodDis = "";
                        }
                        if (res.data.content[0].contSdate) {
                            t.form.contSdate = res.data.content[0].contSdate;
                        } else {
                            t.form.contSdate = "";
                        }
                        if (res.data.content[0].contEdate) {
                            t.form.contEdate = res.data.content[0].contEdate;
                        } else {
                            t.form.contEdate = "";
                        }
                        if (res.data.content[0].contSigndate) {
                            t.form.contSigndate = res.data.content[0].contSigndate;
                        } else {
                            t.form.contSigndate = "";
                        }
                        if (res.data.content[0].contProbatDis) {
                            t.form.contProbatDis = res.data.content[0].contProbatDis;
                        } else {
                            t.form.contProbatDis = "";
                        }

                        if (res.data.content[0].contProbatdt) {
                            t.form.contProbatdt = res.data.content[0].contProbatdt;
                        } else {
                            t.form.contProbatdt = "";
                        }
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                });
        },
        save () {
            const t = this;
            const data = deepCopy(t.form);
            // data._mt = "empContractInfo.addOrUpd";
            data.logType = t.logType;
            data.id = t.rowId;
            data.visaAreaId = t.mainId; // 放入主表id
            if (data.docsTimesta !== undefined) {
                data.docsTimesta =
                    data.docsTimesta === ""
                        ? ""
                        : new Date(data.docsTimesta).format("yyyy-MM-dd");
            }
            if (data.docsTimestop !== undefined) {
                data.docsTimestop =
                    data.docsTimestop === ""
                        ? ""
                        : new Date(data.docsTimestop).format("yyyy-MM-dd");
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    getDataLevelUserLoginNew(data)
                        .then(res => {
                            if (isSuccess(res, t)) {
                                if (t.rowId) {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.updsuccess")
                                    });
                                    t.$emit("update", res.data.content[0]);
                                } else {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.addsuccess")
                                    });
                                    t.$emit("newdata", res.data.content[0]);
                                }
                                t.close();
                            }
                        })
                        .catch(() => {
                            t.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage")
                            });
                        });
                }
            });
        },
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "emptype,contrpertype,contperiod,worktimetype,probperiod"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        // t.Visadocpreparer = res.data.content[0].value[0].paramList;
                        // t.selectEducationlevel = res.data.content[0].value[10].paramList;
                        t.selectEdCuntry = res.data.content[0].value[0].paramList;
                        t.selectEdConType = res.data.content[0].value[0].paramList;
                        t.selectConPeriod = res.data.content[0].value[0].paramList;
                        t.selectConProbat = res.data.content[0].value[0].paramList;
                        // t.yesOrNo = res.data.content[0].value[0].paramList;
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        clear () {
            const t = this;
            t.form = {};
            t.$refs.form.resetFields();
        },
        close () {
            this.rowId = "";
            this.$emit("hideMsg");
            this.clear();
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
