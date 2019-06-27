<template>
    <div class="option-main">
        <Spin size="large"
              fix
              v-if="spinShow"></Spin>
        <Row style="overflow-y: auto;"
             :style="{ height: disabled?'500px':'420px' }"
             ref="scrollBox">
            <Form :model="formValidate"
                  label-position="right"
                  ref="formValidate"
                  :label-width="100"
                  :rules="ruleValidate">
                <Row>
                    <Col span="11">
                    <FormItem label="部门名称"
                              prop="deptId">
                        <span @dblclick="disabled?'':clearUnitFname()">
                            <Input v-model="unitFname"
                                   icon="search"
                                   :disabled="disabled"
                                   :readonly="true"
                                   placeholder="请选择部门名称"
                                   @on-click="disabled?'':unitFnamePick()" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="11"
                         offset="1">
                    <FormItem label="可见范围"
                              prop="pbsRangeDis">
                        <Select v-model="formValidate.pbsRangeDis"
                                :clearable="!disabled"
                                :disabled=disabled
                                placeholder="请选择可见范围">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in pbsRangeDisData"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem label="生效时间"
                              prop="pbsStart">
                        <DatePicker type="date"
                                    placeholder="请选择生效时间"
                                    :editable="false"
                                    :disabled="disabled"
                                    :readonly="disabled"
                                    v-model="formValidate.pbsStart"
                                    format="yyyy-MM-dd"
                                    style="width: 100%"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="11"
                         offset="1">
                    <FormItem label="失效时间"
                              prop="pbsEnd">
                        <DatePicker type="date"
                                    placeholder="请选择失效时间"
                                    :editable="false"
                                    :disabled="disabled"
                                    :readonly="disabled"
                                    v-model="formValidate.pbsEnd"
                                    format="yyyy-MM-dd"
                                    style="width: 100%"></DatePicker>
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

                </Row>
            </Form>
        </Row>
        <Button class="btn"
                type="primary"
                @click="handleSubmit"
                v-show="!disabled">
            {{$t('button.sav')}}
        </Button>
        <!--  弹出选择框  -->
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
            pbsRangeDis: "",
            typeCode: "pbsRange",
            pbsRangeData: [],
            //提交mt名称
            addOrUpd_mt: 'payProjbase.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payProjbase.getById',
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
                pbsStart: '',
                pbsEnd: '',
                pbsCount: '',
                pbsRange: '',
                note: '',
                state: '',

            },
            //表单验证规则
            ruleValidate: {
                deptId: [
                    { required: true, message: "请输入部门名称", trigger: "change" },
                ],
                pbsRange: [
                    { required: true, message: "请输入可见范围", trigger: "change" },
                ],
                pbsStart: [
                    { required: true, message: "请输入生效时间", trigger: "change" },
                ],
                pbsEnd: [
                    { required: true, message: "请输入失效时间", trigger: "change" },
                ],

            },
            pbsRangeDisData: []
        }
    },
    props: {
        modity: String,
        index: Number,
    },
    computed: {
        id () {
            return this.$store.state.payProjbase.mainId;
        },
        logType () {
            return this.$store.state.payProjbase.logType;
        }
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
            let data = {
                deptId: '1000',
                unitFname: "武汉分公司",
                pbsStart: "2019-03-13",
                pbsEnd: "2019-06-14",
                pbsCount: "15",
                pbsRange: "1",
                pbsRangeDis: "某某",
                note: '请查看备注',
                state: "02valid"
            }
            t.formValidate.deptId = data.deptId;
            t.unitFname = data.unitFname;
            t.formValidate.pbsStart = data.pbsStart;
            t.formValidate.pbsEnd = data.pbsEnd;
            t.formValidate.pbsCount = data.pbsCount;
            t.formValidate.pbsRange = data.pbsRange;
            t.pbsRangeDis = data.pbsRangeDis;
            t.formValidate.note = data.note;
            t.formValidate.state = data.state;
            // t.spinShow = true
            // getDataLevelUserLogin({
            //     _mt: t.getById_mt,
            //     id: id,
            //     logType: 'Id查询',
            // }).then((res) => {
            //     if (isSuccess(res, t)) {
            //         let data = res.data.content[0]
            //         t.formValidate.deptId = data.deptId;
            //         t.unitFname = data.unitFname;
            //         t.formValidate.pbsStart = data.pbsStart;
            //         t.formValidate.pbsEnd = data.pbsEnd;
            //         t.formValidate.pbsCount = data.pbsCount;
            //         t.formValidate.pbsRange = data.pbsRange;
            //         t.pbsRangeDis = data.pbsRangeDis;
            //         t.formValidate.note = data.note;
            //         t.formValidate.state = data.state;
            //     }
            // }).catch(() => {
            //     this.$Message.error(this.$t("reminder.errormessage"));
            // }).finally(() => {
            //     t.spinShow = false
            // });
        },
        //获取下拉列表数据
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                typeCode: "scope",
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    t.pbsRangeDisData = data.value[0].paramList;
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
                                t.$store.commit('payProjbase/setMainId', res.data.content[0].id);
                                t.$store.commit('payProjbase/setLogType', "修改");
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
            this.unitFname = "";
            this.pbsRangeDis = "";

            this.$emit('closeUp');
            this.disabled = false
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
@import "../../../sass/updatemain";
</style>