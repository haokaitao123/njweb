<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Spin size="large"
                      fix
                      v-if="spinShow"></Spin>
                <Row class="main-height"
                     ref="scrollBox">
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100">
                        <Row>
                           <Col span="11">
<FormItem label="项目名称" prop="deptId">
<span @dblclick="disabled?'':clearUnitFname()">
 <Input v-model="unitFname" icon="search" :disabled="disabled" :readonly="true" placeholder="请选择项目名称" @on-click="disabled?'':unitFnamePick()" />
</span>
</FormItem>
</Col>
<Col span="11" offset="1">
<FormItem label="分摊金额" prop="sharAmount">
<Input v-model="formValidate.sharAmount" :disabled=disabled placeholder="请输入分摊金额"></Input>
</FormItem>
</Col>
<Col span="11">
<FormItem label="分摊期间" prop="sharPer">
<Input v-model="formValidate.sharPer" :disabled=disabled placeholder="请输入分摊期间"></Input>
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

            
            typeCode: "",
            //提交mt名称
            addOrUpd_mt: 'payShare.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'payShare.getById',
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
                    sharPer: '', 
                    sharAmount: '', 
                    note: '', 

            },
            //表单验证规则
            ruleValidate: {
                deptId: [
{ required: true, message: "请输入项目名称", trigger: "change" },
],
sharAmount: [
{ required: true, message: "请输入分摊金额", trigger: "blur" },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur" },
],
sharPer: [
{ required: true, message: "请输入分摊期间", trigger: "blur" },
],

            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
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
            t.spinShow = true
            getDataLevelUserLogin({
                _mt: t.getById_mt,
                id: id,
                logType: 'Id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0]
                       t.formValidate.deptId = data.deptId;
    t.unitFname = data.unitFname;
    t.formValidate.sharPer = data.sharPer;
    t.formValidate.sharAmount = data.sharAmount;
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
        handleReset () {
            //重置表单
            this.$refs.scrollBox.$el.scrollTop = "0";
            this.$refs.formValidate.resetFields();
            this.formValidate = {};
            this.unitFname = "";

            this.$emit('closeUp');
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
@import "../../../sass/updateAndAdd";
@import "../../../sass/singleUpdateAdd";
</style>