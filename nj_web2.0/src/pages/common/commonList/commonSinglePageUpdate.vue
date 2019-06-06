<template>
    <div>
        <div class="cover">
            <div class="box">
                <div class="title">
                    <div class="title-text">
                        <Icon type="mouse"
                              size="16"
                              style="margin-right: 10px;"></Icon>
                        &nbsp;{{logType?logType: this.$t('lang_communication.commonFlowUpdate.editForm')}}
                    </div>
                    <Button type="text"
                            @click="close">
                        <Icon type="close-round"
                              size="16"></Icon>
                    </Button>
                </div>
                <!-- 添加 v-for。 为了匹配级联方法, Bus.father.$refs[Bus.map[key]][0] -->
                <div class="dataBlocks"
                     v-for="(item, index) in [1]"
                     :key="index">
                    <div class="content">
                        <!--<Spin v-show="loading" size="large" fix></Spin>-->
                        <!--<renderd></renderd>-->
                        <commonSingleForm v-if="isShow"
                                          :formData1="formData"
                                          :formlist="formlist"
                                          :pklv="pklv"
                                          @close="close"
                                          :disabled="Tabledisabled"
                                          :formParentfield="formParentfield"
                                          ref="commonSingleForm">
                        </commonSingleForm>
                    </div>
                </div>
                <div class="footer">
                    <Button type="ghost"
                            style="margin-right: 5px"
                            v-if="showflag"
                            @click="close">{{$t('button.cal')}}</Button>
                    <Button v-if="showflag"
                            type="primary"
                            @click="save">{{$t('button.sav')}}</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import commonSingleForm from '../commonCompanents/commonSingleForm'
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, findComponentUpward } from '../../../lib/util'
import validCode from '../commonCompanents/validCode'
import { onChange } from '../onChange/index'
import Bus from '../bus'

export default {
    data () {
        return {
            isShow: false,  // 防止数据未加载完成就显示form页面
            formData: {},
            formlist: {},
            clmkvMap: {}, // 弹出框，{物理列名：字段中文名}
            popForm: {}, // 该步骤，所有表单，布局为弹出框的数据 key, value
            valueMap: {},
            ChildDataBloks: [],
            dataBlocks: [],
            dataBlocksFake: [], // 临时存储
            loading: true,
        }
    },
    props: {
        id: String,
        //   pklv: String, // 主表id
        formParentfield: String, // 主表字段名
        tbName: String,
        flsdbSubform: String,
        flsdbSubformtype: String,
        flsdbSubfilter: String,
        thisPkValue: String,
        Tabledisabled: Boolean,
        ChidlTableId: String,
        showflag: Boolean,
        flowId: String,
        logType: String,
    },
    mounted () {
        this.getColumn()
    },
    components: {
        commonSingleForm,
    },
    methods: {
        getColumn () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'subGetEdit.getEditColumn',
                logType: 'getListColumn',
                pkValue: t.id,
                subFormId: t.flsdbSubform,
                subFormType: t.flsdbSubformtype,
                flowId: t.flowId,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    /**
                     * 收集弹出选择的 (key:value)(字段物理名, 字段值)
                     */
                    for (let j = 0; j < res.data.content[0].columns.length; j++) {
                        if (res.data.content[0].columns[j].clmLayout == 13) {
                            t.clmkvMap[res.data.content[0].columns[j].clmName] = res.data.content[0].columns[j].clmDname
                        }
                    }
                    // dataBlocks
                    t.dataBlocks = [] // 进入之后每次清空datablock里的数据
                    t.formData = res.data.content[0]
                    t.formlist = t.getFormDataSubmit(res.data.content[0].columns)
                    let temData = {}
                    temData['formlist'] = t.formlist
                    temData['blockColumn'] = t.formData
                    t.dataBlocks.push(temData)
                    t.isShow = true
                    t.loading = false
                    this.$store.commit('flowClmkMap/setClmkvMap', t.clmkvMap)
                    t.clmkvMap = {} // 清空
                    this.$store.commit('flowClmkMap/setPopForm', t.popForm)
                    t.popForm = {} // 清空
                    this.getValueMap(t.dataBlocks)
                    Bus.map = t.valueMap
                    Bus.father = t
                    if (onChange.hasOwnProperty(this.tbName)) {
                        setTimeout(() => {
                            onChange[this.tbName].all_dis.call(this)
                        }, 500)
                    }
                }
            }).catch((res) => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: res,
                })
            })
        },
        getValueMap (dataBlocks) {
            const t = this
            t.valueMap = {}
            console.log(dataBlocks, 'dataBlocks')
            for (let i = 0; i < dataBlocks.length; i++) {
                let item = dataBlocks[i].blockColumn.columns
                console.log(item)
                for (let j = 0; j < item.length; j++) {
                    t.valueMap[item[j].clmName] = 'commonSingleForm' //  commonSingleForm
                }
            }
        },
        /*
  * 格式化数据
  * */
        getFormDataSubmit (data) {
            let columns = data // 字段
            let formData = {}
            let form = {}  // 表单
            let ruler = {}  // 校验规则
            let dis = {}
            let clmmap = {}
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].clmLayout === 20) {
                    // 当数据类型为checkBox group时，需要数据类型为数组
                    if (columns[i].clmValue !== '') {
                        form[columns[i].clmName] = columns[i].clmValue.split(',')
                    } else {
                        form[columns[i].clmName] = []
                    }
                } else {
                    form[columns[i].clmName] = columns[i].clmValue
                }
                if (columns[i].clmName !== 'companyId') {
                    clmmap[columns[i].clmName] = columns[i].clmDbName
                }
                if (columns[i].columnValid) {
                    ruler[columns[i].clmName] = []
                    for (let j = 0; j < columns[i].columnValid.length; j++) {
                        ruler[columns[i].clmName].push({
                            validator: (rule, value, callback) => {
                                if (!validCode[rule.valid](form[rule.field])) {
                                    callback(new Error(rule.message))
                                } else {
                                    callback()
                                }
                            },
                            trigger: 'change',
                            message: columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
                            valid: columns[i].columnValid[j].clmvMod,
                        })
                    }
                }
                if (columns[i].clmDefDis === false) {
                    // 默认是否显示
                    delete form[columns[i].clmName]
                }
                if (columns[i].clmIsupdate === true) {
                    dis[columns[i].clmName] = true
                } else {
                    dis[columns[i].clmName] = false
                }
                // 弹出选择
                for (let i = 0; i < columns.length; i++) {
                    if (columns[i].clmLayout == 13) {
                        this.popForm[columns[i].clmName] = columns[i].clmValue
                    }
                }
            }
            // -----
            form._mt = 'subTableSave.addOrUpd'
            form.subFromId = this.flsdbSubform
            form.filter = this.flsdbSubfilter
            form.flowDataId = this.thisPkValue
            form.subFormType = this.flsdbSubformtype
            form.flowId = this.flowId
            if (this.ChidlTableId) {
                form.id = this.ChidlTableId
            }
            form.logType = '子表保存'
            formData.form = form
            formData.ruler = ruler
            formData.clmmap = clmmap
            formData.dis = dis
            return formData
        },
        close () {
            this.$emit('closePage')
            this.$emit('getData')
        },
        save () {
            //        alert(this.tbName)
            //        console.log(this.$refs.commonSingleForm[0].saveForm())
            this.$refs.commonSingleForm[0].saveForm()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.cover .box {
    width: 940px;
}
.content {
    max-height: 416px;
    overflow-y: auto;
}
.footer {
    margin-top: 10px;
    padding: 0 78px;
    display: flex;
    justify-content: flex-end;
}
</style>
