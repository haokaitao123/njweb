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
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Row style="max-height: 420px;overflow-y: auto;"
                     id="scrollBox">
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100">
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgpost.postCode')"
                                      prop="postCode">
                                <Input v-model="formValidate.postCode"
                                       :disabled=true
                                       :placeholder="$t('lang_organization.orgpost.postCodeInp')" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem :label="$t('lang_organization.orgpost.postFnameCnDis')"
                                      prop="postFname">
                                <Input v-model="formValidate.postFname"
                                       :placeholder="$t('lang_organization.orgpost.postFnameCnDisInp')"
                                       @on-change="postChange"
                                       :disabled="disabled" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="职位级别"
                                      prop="postDfpslevel">
                                <Select v-model="formValidate.postDfpslevel"
                                        :placeholder="$t('lang_organization.orgpost.postDfpslevelInp')"
                                        :disabled="disabled">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectDfpslevel"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem :label="$t('lang_organization.orgpost.postStation')"
                                      prop="postStation">
                                <!-- <Select v-model="formValidate.postStation"
                                        placeholder="请选择">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectPostStation"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select> -->
                                <RadioGroup v-model="formValidate.postStation">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectPostStation"
                                           :key="index"
                                           :disabled="disabled">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgpost.postStansalary')"
                                      prop="postStansalary">
                                <InputNumber v-model="formValidate.postStansalary"
                                             :placeholder="$t('lang_organization.orgpost.postStansalaryInp')"
                                             :disabled="disabled"
                                             style="width: 290px" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem :label="$t('lang_organization.orgpost.postTrialsalary')"
                                      prop="postTrialsalary">
                                <InputNumber v-model="formValidate.postTrialsalary"
                                             :placeholder="$t('lang_organization.orgpost.postTrialsalary')"
                                             :disabled="disabled"
                                             style="width: 290px" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="分摊成本"
                                      prop="postCostsharing">

                                <RadioGroup v-model="formValidate.postCostsharing">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectpostCostsharing"
                                           :key="index"
                                           :disabled="disabled">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem :label="$t('lang_organization.orgpost.seniorityWage')"
                                      prop="seniorityWage">

                                <RadioGroup v-model="formValidate.seniorityWage">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectseniorityWage"
                                           :key="index"
                                           :disabled="disabled">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgpost.postValiddate')"
                                      prop="postValiddate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_organization.orgpost.postValiddateInp')"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            :editable="false"
                                            v-model="formValidate.postValiddate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem :label="$t('lang_organization.orgpost.postInvdate')"
                                      prop="postInvdate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_organization.orgpost.postInvdateInp')"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            :editable="false"
                                            v-model="formValidate.postInvdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="23">
                            <FormItem :label="$t('lang_organization.orgpost.postReason')"
                                      prop="postReason">
                                <Input v-model="formValidate.postReason"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       :placeholder="$t('lang_organization.orgpost.postReasonInp')"
                                       :disabled="disabled" />
                            </FormItem>
                        </i-col>
                        <i-col span="23">
                            <FormItem :label="$t('lang_organization.orgpost.note')"
                                      prop="note">
                                <Input v-model="formValidate.note"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       :placeholder="$t('lang_organization.orgpost.noteInp')"
                                       :disabled="disabled" />
                            </FormItem>
                        </i-col>
                    </Form>
                </Row>
                <Button type="ghost"
                        @click="handleReset"
                        class="btn1">{{$t('button.cal')}}</Button>
                <Button type="primary"
                        @click="handleSubmit"
                        class="btn"
                        v-show="!disabled">{{$t('button.sav')}}</Button>
            </div>
        </div>
        <!--弹出选择页面布局 无需变更-->

        <transition name="fade">
            <searchOrgframe v-show="openPick"
                            :searchCloumns="searchCloumns"
                            :params="params"
                            @closeUp="close"
                            @changeinput="changeinput"
                            ref="searchOrgframe"></searchOrgframe>
        </transition>
        <transition name="fade">
            <searchOrgcostcenter v-show="openPick3"
                                 :searchCloumns="searchCloumns3"
                                 :params="params3"
                                 @closeUp="close3"
                                 @changeinput="changeinput3"
                                 ref="searchOrgcostcenter"></searchOrgcostcenter>
        </transition>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginSenior,
    getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import searchOrgframe from "../../../components/searchTable/searchOrgframe";
import searchOrgcostcenter from "../../../components/searchTable/searchOrgcostcenter";
//  引入弹出选择页面
//  import searchCity from '../../../components/searchTable/searchCity'
export default {
    data () {
        return {
            type: '',
            distype: false,
            value: "",
            disabled: false,
            forbidden: null,
            popup: '',
            selectDfpslevel: [],
            selectDfsallevel: [],
            selectDftrvlevel: [],
            selectPostStation: [
                {
                    'paramCode': '1',
                    'paramInfoCn': '是'
                },
                {
                    'paramCode': '0',
                    'paramInfoCn': '否'
                },
            ],
            selectseniorityWage: [
                {
                    'paramCode': '1',
                    'paramInfoCn': '有'
                },
                {
                    'paramCode': '0',
                    'paramInfoCn': '无'
                },
            ],
            selectpostCostsharing: [
                {
                    'paramCode': '1',
                    'paramInfoCn': '分摊'
                },
                {
                    'paramCode': '0',
                    'paramInfoCn': '不分摊'
                },
            ],
            formValidate: {
                _mt: "orgPost.addOrUpd",
                postCode: "XXXXXX", //岗位编码
                postDfpslevel: "", //默认职位级别
                postFname: "", //岗位全称
                seniorityWage: "1", //工龄工资
                postCostsharing: "1", //默认分摊成本
                postTrialsalary: null, //试用期薪资
                postStansalary: null, //岗位标准薪资
                postStation: "", //是否驻厂
                postValiddate: "", //生效日期
                postInvdate: "", //失效日期
                postReason: "", //失效原因
                note: "", //备注
                funId: "1",
                logType: ""
            },
            openPick: false,
            openPick2: false,
            openPick3: false,
            postUnitName: "",
            postDfcostcenterName: "",
            params: {
                _mt: "orgUnits.getByOrgFramePageList",
                sort: "id",
                order: "desc",
                rows: 10,
                page: 1,
                funId: "1",
                logType: "组织架构查询",
                data: "{}",
                unitPid: 0
            },
            searchCloumns: [
                {
                    title: this.$t("lang_organization.orgframe.unitCode"),
                    key: "unitCode",
                    sortable: "custom"
                },
                {
                    title: this.$t("lang_organization.orgframe.compCOrEName"),
                    key: "unitFname"
                },
                {
                    title: this.$t("lang_organization.orgframe.unitTypeName"),
                    key: "unitTypeName"
                }
                //          {
                //            title: '组织类型名称',
                //            key: 'unitDfcostcenterName',
                //            sortable: 'custom',
                //          },
                //          {
                //            title: '组织类型',
                //            key: 'unitDfcostcenter',
                //            sortable: 'custom',
                //          },
            ],
            params3: {
                _mt: "orgCostcenter.getPage",
                sort: "id",
                order: "desc",
                rows: 10,
                page: 1,
                funId: "1",
                logType: "成本中心查询",
                data: "{}"
            },
            searchCloumns3: [
                {
                    title: this.$t("lang_organization.orgcostcenter.costCode"),
                    key: "costCode",
                    sortable: "custom"
                },
                {
                    title: this.$t("lang_organization.orgcostcenter.cname"),
                    key: "cname"
                },
                {
                    title: this.$t("lang_organization.orgcostcenter.ename"),
                    key: "ename"
                }
            ],
            //设置必填规则
            ruleValidate: {
                // postCode: [
                //   {
                //     required: true,
                //     message: this.$t("lang_organization.orgpost.postCodeInp"),
                //     trigger: "blur"
                //   }
                // ],
                postFname: [
                    {
                        required: true,
                        message: this.$t("lang_organization.orgpost.postFnameCnDisInp"),
                        trigger: "blur"
                    }
                ],
                postStation: [
                    {
                        required: true,
                        message: this.$t("lang_organization.orgpost.postStationInp"),
                        trigger: "change"
                    }
                ],
                seniorityWage: [
                    {
                        required: true,
                        message: this.$t("lang_organization.orgpost.seniorityWageInp"),
                        trigger: "blur"
                    }
                ],
                postCostsharing: [
                    {
                        required: true,
                        message: this.$t("lang_organization.orgpost.postCostsharingInp"),
                        trigger: "blur"
                    }
                ],
                postTrialsalary: [
                    {
                        required: true,
                        message: this.$t("lang_organization.orgpost.postTrialsalaryInp"),
                        type: 'number',
                        trigger: "change"
                    }
                ],
                postStansalary: [
                    {
                        required: true,
                        message: this.$t("lang_organization.orgpost.postStansalaryInp"),
                        type: 'number',
                        trigger: "change"
                    }
                ],
                postDfpslevel: [
                    {
                        required: true,
                        message: this.$t("lang_organization.orgpost.postDfpslevelInp"),
                        trigger: "blur"
                    }
                ],
                postValiddate: [
                    {
                        required: true,
                        type: "date",
                        message: this.$t("lang_organization.orgpost.postValiddateInp"),
                        trigger: "change"
                    }
                ]
            }
        };
    },
    //    子页面默认参数 无需变更
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {
        searchOrgframe,
        searchOrgcostcenter
    },
    updated () { },
    mounted () {
        this.getSelect();
    },
    methods: {
        getData (id) {
            const t = this;
            this.page = 1;
            getDataLevelUserLogin({
                _mt: "orgPost.getById",
                id: id,
                funId: "1",
                logType: "Id查询"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        console.log(res.data.content[0]);
                        t.formValidate.postCode = res.data.content[0].postCode;
                        t.formValidate.postFname = res.data.content[0].postFname;
                        t.formValidate.postCostsharing = res.data.content[0].postCostsharing;

                        t.formValidate.seniorityWage = res.data.content[0].seniorityWage;
                        t.formValidate.postValiddate = res.data.content[0].postValiddate;
                        t.formValidate.postInvdate = res.data.content[0].postInvdate;
                        t.formValidate.postReason = res.data.content[0].postReason;
                        t.formValidate.note = res.data.content[0].note;
                        t.formValidate.postStation = res.data.content[0].postStation;
                        t.formValidate.postDfpslevel = res.data.content[0].postDfpslevel;
                        t.formValidate.postStansalary = Number(res.data.content[0].postStansalary);
                        t.formValidate.postTrialsalary = Number(res.data.content[0].postTrialsalary);
                        if (id === res.data.content[0].companyId) {
                            t.forbidden = 'disabled'
                            t.distype = true
                        } else {
                            t.forbidden = null
                            t.distype = false
                        }

                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },

        updateimg () {
            this.updateImg = true;
        },
        closeImg () {
            const t = this;
            t.updateImg = false;
        },
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "postlevel,salarylevel,travellevel"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectDfpslevel = res.data.content[0].value[0].paramList;
                        t.selectDfsallevel = res.data.content[0].value[1].paramList;
                        t.selectDftrvlevel = res.data.content[0].value[2].paramList;
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        render1 () {
            this.$Modal.confirm({
                ref: "imgEdit",
                onOk: () => {
                    const formData = new FormData(document.getElementById("fileinput1"));
                    uploadimage(formData)
                        .then(res => {
                            alert(res);
                        })
                        .catch(res => {
                            alert(res);
                        });
                },
                attrs: {
                    id: "foo"
                },
                render: h => {
                    return h(imgEdit, {
                        props: {
                            value: this.value
                        },
                        on: {
                            change: val => {
                                this.value = val;
                            }
                        }
                    });
                }
            });
        },
        handleSubmit () {
            const t = this;
            const data = deepCopy(t.formValidate);
            data.logType = t.logType;

            if (t.logType === this.$t("button.upd")) {
                data.id = t.id;
            }
            if (data.postValiddate !== undefined) {
                data.postValiddate = new Date(data.postValiddate).format("yyyy-MM-dd");
            }
            if (data.postInvdate !== undefined) {
                data.postInvdate =
                    data.postInvdate === ""
                        ? ""
                        : new Date(data.postInvdate).format("yyyy-MM-dd");
            }
            this.$refs.formValidate.validate(valid => {
                if (valid) {
                    getDataLevelUserLoginSenior(data)
                        .then(res => {
                            if (isSuccess(res, t)) {

                                 t.$emit("closeUp");
                                if (t.logType === this.$t("button.add")) {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.addsuccess")
                                    });
                                    t.$refs.formValidate.resetFields();
                                    t.$emit("getData", res.data.content[0]);
                                } else {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.updsuccess")
                                    });
                                    console.log(res, "res")
                                    t.$emit("update", res.data.content[0]);
                                }
                            }
                        })
                        .catch(() => {
                            this.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage")
                            });
                        });
                }
            });
        },
        close () {
            const t = this;
            t.openPick = false;
        },
        close2 () {
            const t = this;
            t.openPick2 = false;
        },
        close3 () {
            const t = this;
            t.openPick3 = false;
        },
        changeinput (name, id, costname, costid) {
            const t = this;
            t.postUnitName = name;
            t.formValidate.postUnit = id;
            t.postDfcostcenterName = costname;
            t.formValidate.postDfcostcenter = costid;
        },
        changeinput3 (name, id) {
            const t = this;
            t.postDfcostcenterName = name;
            t.formValidate.postDfcostcenter = id;
        },
        pickData () {
            const t = this;
            t.$refs.searchOrgframe.getData(this.params);
            t.openPick = true;
        },
        pickData2 () {
            if (this.forbidden === null && !this.disabled) {
                const t = this
                t.$refs.searchOrgframe.getData(this.params2)
                t.openPick2 = true
            }
        },
        pickData3 () {
            const t = this;
            t.$refs.searchOrgcostcenter.getData(this.params3);
            t.openPick3 = true;
        },
        clearPid () {
            const t = this;
            t.postUnitName = "";
            t.formValidate.postUnit = "";
        },
        clearDfhire () {
            if (!this.disabled) {
                const t = this
                t.unitCityName = ''
                t.formValidate.unitCity = ''
            }
        },
        clearCostcenter () {
            const t = this;
            t.postDfcostcenterName = "";
            t.formValidate.postDfcostcenter = "";
        },
        handleReset () {
            this.$refs.formValidate.resetFields();
            document.getElementById("scrollBox").scrollTop = "0";
            this.$emit("closeUp");
        },
        postChange () {
            if (this.formValidate.postFname.indexOf("驻厂") != -1) {
                this.formValidate.postStation = "1"
            } else {
                this.formValidate.postStation = "0"
            }
        }
    },
    watch: {}
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.option-main {
    position: relative;
    height: 500px;
    .btn {
        position: absolute;
        bottom: 20px;
        right: 40px;
    }
    .btn1 {
        position: absolute;
        bottom: 20px;
        right: 100px;
    }
}
</style>
