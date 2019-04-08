<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>
                    <!--父页面传递过来的操作类型 无需变更-->
                    &nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <!--子页面表单 无需变更-->
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="135">

                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="求职者姓名"
                              prop="recName">
                        <Input v-model="formValidate.recName"
                               :disabled=true
                               placeholder="请输入求职者姓名"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="证件号码"
                              prop="recIdenno">
                        <Input v-model="formValidate.recIdenno"
                               :disabled=true
                               placeholder="请输入证件号码"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="手机号"
                              prop="recPhone">
                        <Input v-model="formValidate.recPhone"
                               :disabled=true
                               placeholder="请输入手机号"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="原因"
                              prop="recReason">
                        <Input v-model="formValidate.recReason"
                               :disabled=true
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入原因"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="备注"
                              prop="note">
                        <Input v-model="formValidate.note"
                               :disabled=true
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入备注"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
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
        </div>
        <!--弹出选择页面布局 无需变更-->
        <!-- <transition name="fade">
      <searchCity v-show="openPick" @closeUp="close" @changeinput="changeinput" ref="searchCity"></searchCity>
    </transition> -->
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'
//  引入弹出选择页面
import searchCity from '../../components/searchTable/searchCity'

export default {
    data () {
        return {
            disabled: false,
            forbidden: null,
            //        新增修改方法的mt 以及页面字段
            formValidate: {
                _mt: "recruitBlackList.addOrUpd",
                recName: "",
                recIdenno: "",
                recPhone: "",
                recReason: "",
                note: "",
                funId: "1",
                logType: ""
            },
            // 弹出选择初始化无需变更
            openPick: false,
            // 字段校验 编码与FormItem上的prop相符合,通常取字段名.  message: 提示信息  trigger
            ruleValidate: {
                bankCode: [
                    { required: true, message: '请输入求职者姓名', trigger: 'blur' },
                ],
            },
        }
    },
    components: {
    },
    //    子页面默认参数 无需变更
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    updated () {

    },
    methods: {
        getData (id) {
            const t = this
            this.page = 1;
            getDataLevelUserLogin({
                //          获取单条数据mt参数
                _mt: 'recruitBlackList.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    // 字段赋值
                    t.formValidate.recName = res.data.content[0].recName;
                    t.formValidate.recIdenno = res.data.content[0].recIdenno;
                    t.formValidate.recPhone = res.data.content[0].recPhone;
                    t.formValidate.recReason = res.data.content[0].recReason;
                    t.formValidate.note = res.data.content[0].note;
                    if (id === res.data.content[0].companyId) {
                        t.forbidden = 'disabled'
                        t.distype = true
                    } else {
                        t.forbidden = null
                        t.distype = false
                    }

                }
            }).catch(() => {
                this.$Modal.error({
                    title: '错误',
                    content: '网络错误',
                })
            })
        },
        //      提交方法  无需变更
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data._mt = 'recruitBlackList.addOrUpd'
            data.logType = t.logType
            // 修改赋值父页面ID
            if (t.logType === '修改') {
                data.id = t.id
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            // 关闭本页面
                            t.$emit('closeUp')
                            if (t.logType === '新增') {
                                t.$Modal.success({
                                    title: '成功',
                                    content: '新增成功',
                                })
                                t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: '成功',
                                    content: '修改成功',
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: '错误',
                            content: '网络错误',
                        })
                    })
                }
            })
        },
        // 弹出选择关闭方法 无需变更
        close () {
            const t = this
            t.openPick = false
        },
        // 弹出选择双击赋值方法
        changeinput (name, id) {
            const t = this
            //        赋值到显示字段与实际值字段
            t.formValidate.bankCityName = name
            t.formValidate.bankCityid = id
        },
        //      打开弹出选择页面
        pickData () {
            const t = this
            t.$refs.searchCity.getData('1')
            t.openPick = true
        },
        //      双击清除弹出选择值
        clearCityid () {
            const t = this
            t.formValidate.bankCityName = ''
            t.formValidate.bankCityid = ''
        },
        //      关闭本页面 清除页面字段值
        handleReset () {
            const t = this
            t.formValidate = {}
            //        调用父页面关闭方法 无需变更
            t.$emit('closeUp')
            t.$refs.formValidate.resetFields()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/updateAndAdd";
</style>
