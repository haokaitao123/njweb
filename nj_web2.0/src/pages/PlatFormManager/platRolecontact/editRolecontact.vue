<template>
    <div class="option-main">
        <Row style="max-height: 450px;overflow-y: auto;"
             ref="scrollBox">
            <Form :model="form"
                  label-position="right"
                  :rules="ruleValidate"
                  ref="form"
                  :label-width="120">
                <i-col span="11">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontCode')"
                              prop="platRolecontCode">
                        <Input v-model="form.platRolecontCode"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontCodeDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       offset="1">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontCnname')"
                              prop="platRolecontCnname">
                        <Input v-model="form.platRolecontCnname"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontCnnameDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontEnname')"
                              prop="platRolecontEnname">
                        <Input v-model="form.platRolecontEnname"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontEnnameDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="23">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontDesc')"
                              prop="platRolecontDesc">
                        <Input v-model="form.platRolecontDesc"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontDescDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontNotice')"
                              prop="platRolecontNotice">
                        <Select v-model="form.platRolecontNotice"
                                @on-change="selChangeNotice"
                                :placeholder="$t('lang_authorization.platRolecont.platRolecontNoticeDis')"
                                :transfer="true">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in tifymode"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       offset="1"
                       v-show="this.form.platRolecontNotice === '02all' ?false : true">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontPhone')">
                        <Input v-model="form.platRolecontPhone"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontPhoneDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       v-show="this.form.platRolecontNotice === '02all' ?false : true">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontSms')">
                        <Input v-model="form.platRolecontSms"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontSmsDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       offset="1"
                       v-show="this.form.platRolecontNotice === '02all' ?false : true">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontUnifiedcn')">
                        <Input v-model="form.platRolecontUnifiedcn"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontUnifiedcnDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       v-show="this.form.platRolecontNotice === '02all' ?false : true">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontCnname')">
                        <Input v-model="form.platRolecontUnifieden"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontCnnameDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       offset="1"
                       v-show="this.form.platRolecontNotice === '02all' ?false : true">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontMail')">
                        <Input v-model="form.platRolecontMail"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontMailDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       :offset="offsetVal">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontVaild')">
                        <RadioGroup v-model="form.platRolecontVaild"
                                    :placeholder="$t('lang_authorization.platRolecont.platRolecontVaildDis')">
                            <Radio :label="item.paramCode"
                                   v-for="(item,index) in radioYesOrNo"
                                   :key="index">{{item.paramInfoCn}}</Radio>
                        </RadioGroup>
                    </FormItem>
                </i-col>

                <i-col span="23">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontNote')"
                              prop="platRolecontNote">
                        <Input v-model="form.platRolecontNote"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontNoteDis')"></Input>
                    </FormItem>
                </i-col>
            </Form>
        </Row>
        <Button class="btn"
                type="primary"
                @click="save">{{$t('button.sav')}}</Button>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            form: {
                _mt: 'platRolecontact.addOrUpd',
                funId: '1',
                platRolecontCode: '',
                platRolecontCnname: '',
                platRolecontEnname: '',
                platRolecontDesc: '',
                platRolecontNotice: '',
                platRolecontPhone: '',
                platRolecontSms: '',
                platRolecontUnifiedcn: '',
                platRolecontUnifieden: '',
                platRolecontMail: '',
                platRolecontVaild: '1',
                platRolecontNote: '',
            },
            radioYesOrNo: [],
            tifymode: [],
            offsetVal: 0,
            ruleValidate: {
                platRolecontCode: [
                    { required: true, message: this.$t('lang_authorization.platRolecont.platRolecontCodeDis'), trigger: 'blur' },
                ],
                platRolecontCnname: [
                    { required: true, message: this.$t('lang_authorization.platRolecont.platRolecontCnnameDis'), trigger: 'blur' },
                ],
                platRolecontEnname: [
                    { required: true, message: this.$t('lang_authorization.platRolecont.platRolecontEnnameDis'), trigger: 'blur' },
                ],
                platRolecontNotice: [
                    { required: true, message: this.$t('lang_authorization.platRolecont.platRolecontNoticeDis'), trigger: 'blur' },
                ],
            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        getdata () {
            const t = this
            const params = {
                _mt: 'platRolecontact.getById',
                id: t.$store.state.platRole.mainId,
                logType: '根据id查询',
            }
            getDataLevelUserLogin(params).then((res) => {
                if (isSuccess(res, t)) {
                    this.form.platRolecontCode = res.data.content[0].platRolecontCode
                    this.form.platRolecontCnname = res.data.content[0].platRolecontCnname
                    this.form.platRolecontEnname = res.data.content[0].platRolecontEnname
                    this.form.platRolecontDesc = res.data.content[0].platRolecontDesc
                    this.form.platRolecontNotice = res.data.content[0].platRolecontNotice
                    this.form.platRolecontPhone = res.data.content[0].platRolecontPhone
                    this.form.platRolecontSms = res.data.content[0].platRolecontSms
                    this.form.platRolecontUnifiedcn = res.data.content[0].platRolecontUnifiedcn
                    this.form.platRolecontUnifieden = res.data.content[0].platRolecontUnifieden
                    this.form.platRolecontMail = res.data.content[0].platRolecontMail
                    this.form.platRolecontVaild = res.data.content[0].platRolecontVaild
                    this.form.platRolecontNote = res.data.content[0].platRolecontNote
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        save () {
            const t = this
            const data = deepCopy(t.form)
            if (t.$store.state.platRole.mainId) {
                data.id = t.$store.state.platRole.mainId
            }
            data.logType = t.logType
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginNew(data).then((res) => {
                        if (isSuccess(res, t)) {
                            // 更新vuex中的mainId
                            t.$store.commit('platRole/setMainId', res.data.content[0].id)
                            //            alert(t.$store.state.platRole.mainId)
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$emit('newdata', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                } else {
                    this.$nextTick(function () {
                        let tt = document.querySelectorAll('.ivu-form-item-error');
                        this.$refs.scrollBox.$el.scrollTop = tt[0].parentNode.offsetTop
                    })
                }
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                typeCode: 'yesno,contnotifymode',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.radioYesOrNo = res.data.content[0].value[0].paramList
                    t.tifymode = res.data.content[0].value[1].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        clear () {
            this.form.platRolecontCode = ''
            this.form.platRolecontCnname = ''
            this.form.platRolecontEnname = ''
            this.form.platRolecontDesc = ''
            this.form.platRolecontNotice = ''
            this.form.platRolecontPhone = ''
            this.form.platRolecontSms = ''
            this.form.platRolecontUnifiedcn = ''
            this.form.platRolecontUnifieden = ''
            this.form.platRolecontMail = ''
            this.form.platRolecontVaild = '1'
            this.form.platRolecontNote = ''
            this.offsetVal = 0
            this.$store.commit('platRole/setMainId', '')
            this.$refs.form.resetFields()
        },
        selChangeNotice () {
            const t = this
            if (t.form.platRolecontNotice === '02all') {
                t.offsetVal = 1
            } else {
                t.offsetVal = 0
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.option-main {
    position: relative;
    height: 500px;
    .btn {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
}
</style>
