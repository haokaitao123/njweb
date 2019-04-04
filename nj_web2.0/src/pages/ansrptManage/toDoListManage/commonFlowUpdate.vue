<template>
    <div class="cover">
        <div>
            <div class="box">
                <div class="title">
                    <div class="title-text">
                        <Icon type="mouse"
                              size="16"
                              style="margin-right: 10px;"></Icon>
                        &nbsp;{{aprvrelTitle}}
                    </div>
                    <Button type="text"
                            @click="close">
                        <Icon type="close-round"
                              size="16"></Icon>
                    </Button>
                </div>
                <div class="content">
                    <div class="dataBlocks"
                         v-for="(item, index) in dataBlocks"
                         :key="index">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <!--<Spin size="large" v-if="!item.blockColumn" fix></Spin>-->
                            <commonSingleForm v-if="item.blockColumn"
                                              :formData1="item.blockColumn"
                                              :formlist="item.formlist"
                                              :tbName="tbName"
                                              :disabled="disabled || item.flsdbOptauth === '01view'"
                                              :ref="'block'"
                                              :lebWidth="200">
                            </commonSingleForm>
                            <!--<div v-if="stepAuthLimits === '03submit' && item.flsdbOptauth === '02update' && item.flsdbSubisupd === '1'">-->
                            <!--<Button class="btns" type="primary" v-if="!item.blockColumn" @click="btnFunction(item.flsdbSubform,item.flsdbSubformtype,item.flsdbSubfilter, $t('button.add'))">{{$t('button.add')}}</Button>-->
                            <!--<Button class="btns" type="error"   v-if="!item.blockColumn" @click="isdelete(item.flsdbSubform,item.flsdbSubformtype,item.flsdbSubfilter, $t('button.del'))">{{$t('button.del')}}</Button>-->
                            <!--</div>-->
                            <row class="table-form"
                                 ref="table-form"
                                 :key="indexs"
                                 v-for="(items,indexs) in columnsChildAll"
                                 v-if="!item.blockColumn && item.id == items[0].dataBlockId">
                                <row v-for="(itemTable,indexTable) in dataTable"
                                     :key="indexTable"
                                     v-if="!item.blockColumn && item.id == items[0].dataBlockId">
                                    <Table @on-selection-change="selectedtable"
                                           v-if="!item.blockColumn && item.id == itemTable.dataBlockId"
                                           border
                                           ref="selection"
                                           size="small"
                                           :columns="items"
                                           :data="itemTable.table"></Table>
                                    <span v-if="!item.blockColumn && item.id == itemTable.dataBlockId"
                                          @click="PageSize(itemTable.dataBlockId)">
                                        <Row style="display: flex">
                                            <Page :total="totalTable"
                                                  :current="itemTable.page"
                                                  size="small"
                                                  show-elevator
                                                  placement="top"
                                                  @on-page-size-change="sizeChange"
                                                  @on-change="pageChange"
                                                  :page-size-opts="[10, 20, 50, 100]"></Page><Button type="ghost"
                                                    size="small"
                                                    shape="circle"
                                                    icon="refresh"
                                                    style="margin-left: 20px;display: inline-block;"
                                                    @click="getData(1)"></Button>
                                        </Row>
                                    </span>
                                </row>
                            </row>
                        </div>
                    </div>
                    <div class="dataBlocks"
                         v-for="(item, index) in operation"
                         :key="index">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <div class="operation">
                                <span style="margin-right: 10px;">操作人:</span><span style="margin-right: 120px;">{{item.flsdbMark.optuser}}</span>
                                <span style="margin-right: 10px;">更新时间:</span><span style="margin-right: 120px;">{{item.flsdbMark.opttime}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="approvRecord"
                         v-if="isHaveRecord">
                        <div class="dataBlocksTitle2">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>审批记录
                        </div>
                        <div class="recordContent">
                            <div v-for="(item, index) in approvRecordList"
                                 :key="index"
                                 class="recordClass">
                                {{item.aprdStepidDis}}&nbsp;&nbsp;{{item.aprdApproverDis}}&nbsp;&nbsp;{{item.aprdAprvtime}}&nbsp;&nbsp;{{item.aprdAprvresultDis}}&nbsp;&nbsp;<span v-if="item.aprdAprvopinion">( 意见： {{item.aprdAprvopinion}} )</span>
                                <!--{{item.aprdAprvtime}}&nbsp;&nbsp;{{item.aprdApproverDis}}&nbsp;&nbsp;{{item.aprdAprvresultDis}}&nbsp;&nbsp;( 意见： {{item.aprdAprvopinion}} )-->
                            </div>
                        </div>
                    </div>

                    <div class="approvIdea">
                        <div class="dataBlocksTitle2">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>我的审批
                        </div>
                        <Form ref="formValidate"
                              :model="formValidate"
                              :rules="ruleValidate"
                              :label-width="135">
                            <Row>
                                <i-col span="9"
                                       offset="2"
                                       style="margin-right: 15px;">
                                    <FormItem label="审批人">
                                        <Input v-model="formValidate.aprdApproverDis"
                                               style="width: 85%;"
                                               disabled></Input>
                                    </FormItem>
                                </i-col>
                                <i-col span="9"
                                       offset="1">
                                    <FormItem label="审批时间">
                                        <DatePicker type="datetime"
                                                    placeholder="请选择审批时间..."
                                                    disabled
                                                    style="width: 95%;"
                                                    v-model="formValidate.aprdAprvtime"></DatePicker>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="9"
                                       offset="2">
                                    <FormItem label="审批结论"
                                              prop="aprdAprvresult">
                                        <Select @on-change="selectAprd"
                                                placeholder="请选择审批结论..."
                                                v-model="formValidate.aprdAprvresult"
                                                style="width: 85%;">
                                            <Option :value="item.paramCode"
                                                    v-for="(item,index) in resultList"
                                                    :key="index">{{item.paramInfoCn}}</Option>
                                        </Select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="19"
                                       offset="2"
                                       v-if="!formValidate.aprdAprvopinionFlag">
                                    <FormItem label="审批意见"
                                              prop="aprdAprvopinion">
                                        <Input type="textarea"
                                               :autosize="{minRows: 2,maxRows: 5}"
                                               placeholder="请填写审批意见..."
                                               v-model="formValidate.aprdAprvopinion"></Input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="19"
                                       offset="2"
                                       v-if="formValidate.aprdAprvopinionFlag">
                                    <FormItem label="审批意见">
                                        <Input type="textarea"
                                               :autosize="{minRows: 2,maxRows: 5}"
                                               placeholder="请填写审批意见..."
                                               v-model="formValidate.aprdAprvopinion"></Input>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div class="footer">
                    <div v-if="!displayHide">
                        <Button type="primary"
                                @click="close2">取消</Button>
                    </div>
                    <div v-if="displayHide">
                        <Button type="success"
                                style="margin-left: 5px;"
                                @click="isSubmit">提交</Button>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <testUpdPage v-if="openTestUpd"
                         :logType="logType"
                         :flowId="flowId"
                         :showflag="showflag"
                         @closePage="closePage"
                         :ChidlTableId="ChidlTableId"
                         :Tabledisabled="Tabledisabled"
                         @close="closeTest"
                         :flsdbSubfilter="flsdbSubfilter"
                         :thisPkValue="thisPkValue"
                         :flsdbSubform="flsdbSubform"
                         :flsdbSubformtype="flsdbSubformtype"
                         @getData="getData"
                         :tbName="tbNameTable"
                         :id="formNo"
                         :pklv="pklv"
                         :formParentfield="formParentfieldTable"></testUpdPage>
        </transition>
    </div>
</template>
<script>
import commonSingleForm from '../../common/commonCompanents/commonSingleForm'
import { getDataLevelUserLogin, getDataLevelUserLoginNew2 } from '../../../axios/axios'
import { isSuccess, findComponentUpward, deepCopy, extendObject } from '../../../lib/util'
import validCode from '../../common/commonCompanents/validCode'
import { onChange } from '../../common/onChange/index'
import Bus from '../../common/bus'
import testUpdPage from './commonSinglePageUpdate.vue'
export default {
    data () {
        return {
            isShow: false,  // 防止数据未加载完成就显示form页面
            openTestUpd: false,
            dataBlocks: [],
            disabled: true,
            loading1: false,
            loading2: false,
            dataBlocksFake: [], // 临时存储
            abroDestination: '',
            formData: {},
            formDataSubmit: {},
            dataTableAll: {},
            dataTable: [],
            dataBlocksFakeId: [],
            dataTableList: [],
            columnsChild: [],
            columnsChildAll: [],
            ChildDataBloks: [],
            clmMap: {},
            tbName: '',
            stepAuthLimits: '',
            data: [],
            columns: [],
            valueMap: {},
            isFinish: false,
            requirCount: 0,
            finishCount: 0,
            thisPkValue: this.pkValue,
            thisStepId: this.stepId,
            thisStepState: this.stepState,
            thisSetpName: this.setpName,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            //新增的审批数据
            formValidate: {
                aprdApprover: this.aprvrelaApproverid,
                aprdApproverDis: this.aprdApprover,
                aprdAprvtime: new Date(),
                aprdAprvresult: '',
                aprdAprvopinion: '',
                aprdAprvopinionFlag: false,
            },
            resultList: [],
            approvRecordList: [],
            ruleValidate: {
                aprdAprvresult: [
                    { required: true, message: '请选择审批结论', trigger: 'change' },
                ],
                aprdAprvopinion: [
                    { required: true, message: '请填写审批意见', trigger: 'blur' },
                ],
            },
            blockStepId: '',
            flowName: '',
            flowId: '',
            isHaveRecord: false,
            operation: [],
            displayHide: true,
            revise: {
                width: 120,
                title: this.$t('button.opr'),
                key: 'action',
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'success',
                                size: 'small',
                            },
                            style: {
                                marginRight: '10px',
                            },
                            on: {
                                click: () => {
                                    this.ChildopenUp(params.row.id, params.index, params)
                                },
                            },
                        }, this.$t('button.view')),
                    ])
                },
            },
            blockNum: 0,
        }
    },
    props: {
        //      flowId: String,
        aprdApprover: String,
        aprvrelaApproverid: String,
        pkValue: String,
        aprdBillid: String,
        aprvrelaStepidAll: String,
        aprvrelaRecordidAll: String,
        aprvrelTitle: String,
        stepId: String,
        requestType: String,
    },
    created () {
        this.getDataBlock()
        // 获取下拉框
        this.getSelect()
        // 获取审批记录
        this.getAnsrptRecord()
        // 判断保存提交取消按钮的显示
        //    this.showBtn()
    },
    components: {
        commonSingleForm,
        testUpdPage,
    },
    methods: {
        ChildopenUp (params, paramsRow, paramsAll) {
            //        console.log(paramsAll)
            for (let i = 0; i < this.dataTable.length; i++) {
                if (this.dataTable[i].dataBlockId === paramsAll.row.id.split('_')[1]) {
                    console.log(this.dataTable[i])
                    for (let j = 0; j < this.dataTable[i].table.length; j++) {
                        let dataBlockId = this.dataTable[i].dataBlockId
                        for (let k = 0; k < this.ChildDataBloks.length; k++) {
                            if (dataBlockId === this.ChildDataBloks[k].id) {
                                this.flsdbSubform = this.ChildDataBloks[k].flsdbSubform
                                this.flsdbSubformtype = this.ChildDataBloks[k].flsdbSubformtype
                                this.flsdbSubfilter = this.ChildDataBloks[k].flsdbSubfilter
                                this.openTestUpd = true
                                this.Tabledisabled = true
                                this.showflag = false
                                this.formNo = paramsAll.row.id.split('_')[0]
                                this.logType = this.$t('button.view')
                            }
                        }
                    }
                }
            }
        },
        selectAprd (value) {
            // 02noneapproved
            // 01approved
            if (value === '02noneapproved') {
                this.formValidate.aprdAprvopinionFlag = false
            } else {
                this.formValidate.aprdAprvopinionFlag = true
            }
        },
        showBtn () {
            const t = this
            const data = {
                _mt: 'platAutoApprovalEditAgwService.showSubmitButton',
                funId: '1',
                logType: '按钮显示',
                flowId: t.flowId,
                apblDataid: t.pkValue,
                aprdBillid: t.aprdBillid,
                aprvrelaApproverid: t.aprvrelaApproverid,
                aprvrelaStepid: t.blockStepId,
            }
            for (const dat in data) {
                if (data[dat] === undefined) {
                    delete data[dat]
                }
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value === 'display') {
                        t.displayHide = true
                    } else if (res.data.content[0].value === 'hide') {
                        t.displayHide = false
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getAnsrptRecord () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'platAprvrecord.getList',
                logType: '查询审批记录',
                aprdBillid: t.aprdBillid,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value) {
                        t.approvRecordList = res.data.content[0].value
                        t.isHaveRecord = true
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                logType: this.$t('button.ser'),
                typeCode: 'approveresult',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.resultList = res.data.content[0].value[0].paramList.slice(1)
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getDataBlock () {
            const t = this
            t.requirCount = 0
            t.finishCount = 0
            t.dataBlocks = []
            t.dataBlocksFake = []
            let data = {
                _mt: 'platAutoApprovalEditAgwService.getDataBlock',
                aprdApprover: t.aprvrelaApproverid, // 员工端人id
                aprdBillid: t.aprdBillid, // 单据id
                aprvrelaStepid: t.aprvrelaStepidAll,
                aprvrelaRecordid: t.aprvrelaRecordidAll,
                roleType: t.$store.state.user.roleType, // 角色类型
                logType: 'getDataBlock', // 主键值
                pkValue: t.pkValue,
                selType: 'logTrack',
            }
            for (const dat in data) {
                if (data[dat] === undefined) {
                    delete data[dat]
                }
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res, '11111111111111111111111111111111')
                    t.dataBlocksFake = res.data.content[0].dataBlocks
                    t.blockStepId = res.data.content[0].stepId
                    t.flowName = res.data.content[0].stepName
                    t.flowId = res.data.content[0].flowId
                    //            t.stepAuthLimits = res.data.content[0].stepAuth
                    for (let i = t.dataBlocksFake.length - 1; i > 0; i--) {
                        if (t.dataBlocksFake[i].flsdbType === 'operation') {
                            t.dataBlocksFake[i].flsdbMark = JSON.parse(t.dataBlocksFake[i].flsdbMark)
                            t.operation.push(t.dataBlocksFake[i])
                            t.dataBlocksFake.splice(i, 1)
                        }
                    }
                    for (let i = 0; i < t.dataBlocksFake.length; i++) {
                        t.requirCount = t.dataBlocksFake.length
                        //              t.getColumn(t.dataBlocksFake[i].id, t.dataBlocksFake[i].flsdbType)
                        if (t.dataBlocksFake[i].flsdbType === '01form') {
                            t.getColumn(t.dataBlocksFake[i].id, t.dataBlocksFake[i].flsdbType)
                        } else {
                            /// 延时一秒为了先把ChildDataBloks加载出来控制table的显示隐藏
                            setTimeout(() => {
                                this.blockNum++

                                console.log(this.ChildDataBloks, '2222222222222')
                                for (let k = 0; k < this.ChildDataBloks.length; k++) {
                                    if (this.ChildDataBloks[k].id === t.dataBlocksFake[i].id) {
                                        t.getPageChildTable(t.dataBlocksFake[i].id, t.dataBlocksFake[i].flsdbOptauth, t.dataBlocksFake[i].flsdbType)
                                    }
                                }
                                t.getColumnChildTable(t.dataBlocksFake[i].id)
                                for (let k = 0; k < this.ChildDataBloks.length; k++) {
                                    if (this.ChildDataBloks[k].id === t.dataBlocksFake[i].id) {
                                        t.dataBlocksFakeId.push(
                                            { id: t.dataBlocksFake[i].id, flsdbOptauth: t.dataBlocksFake[i].flsdbOptauth }
                                        )
                                    }
                                }

                            }, 1000)
                        }
                    }
                    //判断保存提交取消按钮的显示
                    this.showBtn()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getPageChildTable (dataBlockId, flsdbOptauth) {
            const t = this
            t.dataTable = []
            t.dataTableList = []
            const params = {
                _mt: 'subGetList.getPage',
                dataBlockId: dataBlockId,
                logType: '流程子集', // 主键值
                flowDataId: t.thisPkValue,
                funId: t.funId,
                flowId: t.flowId,
                sort: t.sort,
                page: t.page,
                rows: t.rows,
                order: t.order,
                busiType: 'appv'
            }
            console.log(params.page, '22222222222222222222222')
            getDataLevelUserLogin(params).then(res => {
                //          t.dataTable = JSON.parse(res.data.content[0].rows)
                t.dataTableAll = {}
                t.dataTableAll['dataBlockId'] = res.data.content[0].dataBlockId
                t.dataTableAll['page'] = res.data.content[0].page
                t.page = res.data.content[0].page
                t.dataTableAll['records'] = res.data.content[0].records
                t.dataTableAll['table'] = JSON.parse(res.data.content[0].rows)
                t.dataTableAll['total'] = res.data.content[0].total
                //          console.log(t.dataTableAll)
                t.dataTable.push(t.dataTableAll)
                t.totalTable = res.data.content[0].records
                console.log(t.dataTable)
            }).catch(err => {
                console.log(err)
            })
        },
        getColumnChildTable (dataBlockId) {
            this.columnsChildAll = []
            this.columnsChild = []
            const t = this
            const params = {
                _mt: 'subGetList.getListColumn',
                dataBlockId: dataBlockId,
                logType: '流程子集', // 主键值
                funId: t.funId,
                flowId: t.flowId,
                busiType: 'appv',
            }
            getDataLevelUserLogin(params).then(res => {
                let aa = []
                t.formParentfieldTable = res.data.content[0].formParentfield
                t.btns = res.data.content[0].btns
                t.tbNameTable = res.data.content[0].tbName
                aa = res.data.content[0].columns
                for (let i = 0; i < aa.length; i++) {
                    if (!aa[i].width) {
                        aa[i].width = 180
                    } else {
                        aa[i].width = 60
                    }
                }
                t.columnsChild = aa
                t.columnsChild.push(t.revise)
                t.columnsChildAll.push(t.columnsChild)
            }).catch(err => {
                console.log(err)
            })
        },
        sizeChange (size) {
            const t = this
            t.rows = size
            //        t.getPageChildTable(this.pageDataBlockId)
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr.toString()
            let arr = this.tableselected.split(',')
            this.tableselected = []
            for (let j = 0; j < arr.length; j++) {
                this.tableselected.push(arr[j].split('_')[0])
            }
            console.log(this.tableselected)
        },
        pageChange (page) {
            const t = this
            t.page = page
        },
        PageSize (id) {
            console.log(id)
            console.log(this.dataBlocksFakeId)
            this.pageDataBlockId = id
            if (this.pageDataBlockId === this.dataBlocksFakeId[0].id) {
                setTimeout(() => {
                    this.page = 1
                }, 300)
                this.getPageChildTable(this.dataBlocksFakeId[0].id)
            }
            if (this.pageDataBlockId !== this.dataBlocksFakeId[0].id) {
                setTimeout(() => {
                    this.page = 1
                }, 300)
                this.getPageChildTable(this.dataBlocksFakeId[0].id)
            }
            if (this.pageDataBlockId === this.dataBlocksFakeId[1].id) {
                setTimeout(() => {
                    this.page = 1
                }, 300)
                this.getPageChildTable(this.dataBlocksFakeId[1].id)
            }
            if (this.pageDataBlockId !== this.dataBlocksFakeId[1].id) {
                setTimeout(() => {
                    this.page = 1
                }, 300)
                this.getPageChildTable(this.dataBlocksFakeId[1].id)
            }
            if (this.pageDataBlockId === this.dataBlocksFakeId[2].id) {
                setTimeout(() => {
                    this.page = 1
                }, 1000)
                this.getPageChildTable(this.dataBlocksFakeId[2].id)
            }
            if (this.pageDataBlockId !== this.dataBlocksFakeId[2].id) {
                setTimeout(() => {
                    this.page = 1
                }, 1000)
                this.getPageChildTable(this.dataBlocksFakeId[2].id)
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
            let dis = {} // 是否禁止修改
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
            }
            form._mt = 'platAutoLayoutSave.addOrUpd'
            form.logType = '保存'
            formData.form = form
            formData.ruler = ruler
            formData.clmmap = clmmap
            formData.dis = dis
            return formData
        },
        getColumn (dataBlockId, dataBlockType) {
            const t = this
            const params = {
                _mt: 'platAutoApprovalEditAgwService.getDataBlockColumn',
                flowId: t.flowId, // 流程ID
                //          stepId: t.thisStepId, // 流程步骤ID
                dataBlockId: dataBlockId,
                //          dataBlockType: dataBlockType,
                logType: 'getBlockColumn', // 主键值
                //          roleType: t.$store.state.user.roleType, // 角色类型
                pkValue: t.thisPkValue,
                funId: t.funId,
            }
            getDataLevelUserLogin(params).then((res) => {
                if (isSuccess(res, t)) {
                    t.dataBlocks = [] // 进入之后每次清空datablock里的数据
                    t.finishCount = t.finishCount + 1
                    let bb = t.dataBlocksFake
                    for (let i = 0; i < bb.length; i++) {
                        if (bb[i].id === dataBlockId) {
                            bb[i]['blockColumn'] = res.data.content[0]
                            bb[i]['formlist'] = t.getFormDataSubmit(res.data.content[0].columns)
                        }
                    }
                    t.dataBlocksFake = bb // 临时block存储变量最后赋值给正式的block，这样才能正确更新数据
                    t.dataBlocks = t.dataBlocksFake
                    t.ChildDataBloks = []
                    /// 子集数据块 没有columns
                    for (let i = 0; i < t.dataBlocks.length; i++) {
                        if (t.dataBlocks[i].flsdbType === '02subtable') {
                            t.ChildDataBloks.push(t.dataBlocks[i])
                        }
                    }
                    /* 非子集数据块 有columns */
                    t.dataBlocksDad = []
                    for (let j = 0; j < t.dataBlocks.length; j++) {
                        if (t.dataBlocks[j].flsdbType !== '02subtable') {
                            t.dataBlocksDad.push(t.dataBlocks[j])
                        }
                    }
                    /**
                     * 收集弹出选择的 (key:value)(字段物理名, 字段值)
                     */
                    //            for (let j = 0; j < res.data.content[0].columns.length; j++) {
                    //              alert(55)
                    //              if (res.data.content[0].columns[j].clmLayout == 13) {
                    //                t.clmkvMap[res.data.content[0].columns[j].clmName] = res.data.content[0].columns[j].clmDname
                    //              }
                    //            }
                    if (t.finishCount + t.ChildDataBloks.length === t.requirCount) {
                        this.$store.commit('flowClmkMap/setClmkvMap', t.clmkvMap)
                        t.clmkvMap = {} // 清空
                        this.$store.commit('flowClmkMap/setPopForm', t.popForm)
                        t.popForm = {} // 清空
                        this.getValueMap(t.dataBlocksDad)
                        Bus.map = t.valueMap
                        Bus.father = t
                        if (onChange.hasOwnProperty(this.tbName)) {
                            setTimeout(() => {
                                onChange[this.tbName].all_dis.call(this)
                            }, 500)
                        }
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
            for (let i = 0; i < dataBlocks.length; i++) {
                let item = dataBlocks[i].blockColumn.columns
                for (let j = 0; j < item.length; j++) {
                    t.valueMap[item[j].clmName] = 'block' + dataBlocks[i].flsdbMark
                }
            }
        },
        close () {
            const t = this
            //      t.$emit('close')
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '是否确认关闭？',
                onOk: () => {
                    t.$emit('close')
                },
            })
        },
        isSubmit () {
            const t = this
            //      t.submit2()
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.$Modal.confirm({
                        title: this.$t('reminder.remind'),
                        content: '是否确认提交？',
                        onOk: () => {
                            t.submit2()
                        },
                    })
                }
            })
        },
        // 提交审批信息
        submit2 () {
            const t = this
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    delete t.formValidate.aprdAprvopinionFlag
                    const data1 = deepCopy(t.formValidate)
                    data1.aprdAprvtime = new Date(data1.aprdAprvtime).format('yyyy-MM-dd hh:mm:ss')
                    const data = {
                        _mt: 'platAutoApprovalSubmitAgwService.submit',
                        logType: '提交审批',
                        aprvrelaFlowid: t.flowId,
                        aprdStepid: t.blockStepId,
                        roleType: t.$store.state.user.roleType,
                        aprdBillid: t.aprdBillid,
                        data: JSON.stringify(data1),
                    }
                    for (const dat in data) {
                        if (data[dat] === '') {
                            delete data[dat]
                        }
                    }
                    getDataLevelUserLogin(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: '提交成功',
                            })
                            t.$emit('close')
                            t.$emit('getAllData')
                            t.$emit('getAllDataMain')
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        change () {
            const t = this
            for (let i = 0; i < this.$children.length; i++) {
                if (this.$children[i].$options) {
                    if (this.$children[i].$options._componentTag === 'commonSingleForm') {
                        t.$children[i].change()
                    }
                }
            }
        },
        // 保存审批意见
        save2 () {
            const t = this
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    const data1 = deepCopy(t.formValidate)
                    data1.aprdAprvtime = new Date(data1.aprdAprvtime).format('yyyy-MM-dd hh:mm:ss')
                    const data = {
                        _mt: 'platAutoApprovalSaveAgwService.addOrUpd',
                        logType: '保存审批',
                        aprvrelaFlowid: t.flowId,
                        aprdStepid: t.blockStepId,
                        roleType: t.$store.state.user.roleType,
                        aprdBillid: t.aprdBillid,
                        data: JSON.stringify(data1),
                    }
                    for (const dat in data) {
                        if (data[dat] === '') {
                            delete data[dat]
                        }
                    }
                    getDataLevelUserLogin(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: '保存成功',
                            })
                            t.$emit('close')
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        close2 () {
            this.$emit('close')
        },
        closePage () {
            this.openTestUpd = false
        },
    },
    watch: {
        thisStepState (value) {
            //      if (value === 'p_flowst_3') {
            //        this.disabled = true
            //      } else {
            //        this.disabled = false
            //      }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
.cover .box {
    width: 1200px;
}
.content {
    height: 500px;
    position: relative;
    overflow-y: auto;
    .table-form {
        margin-top: 0;
        margin-bottom: 20px;
    }
    .dataBlocks {
        .dataBlocksTitle {
            /*background: linear-gradient(-45deg, #c6b7ff, #ffffff);*/
            background-color: rgba(39, 142, 255, 0.2);
            font-size: 14px;
            padding: 0 20px;
            height: 26px;
            font-weight: bold;
            line-height: 26px;
        }
        .dataContent {
            position: relative;
            background-color: #f9f9f9;
            /*padding-right: 100px;*/
            padding-top: 30px;
            padding-bottom: 10px;
            /*width: 1100px;*/
            .operation {
                text-align: left;
                padding: 0 0 0 180px;
            }
        }
    }
}
.footer {
    margin-top: 10px;
    padding: 0 30px;
    display: flex;
    justify-content: flex-end;
}
.approvRecord {
    /*margin-bottom: 10px;*/
}
.approvIdea {
    .dataBlocksTitle2 {
        /*margin-bottom: 10px;*/
    }
    .ivu-form {
        background-color: #f9f9f9;
        padding: 20px;
    }
}
.dataBlocksTitle2 {
    /*background: linear-gradient(-45deg, #c6b7ff, #ffffff);*/
    background-color: rgba(39, 142, 255, 0.2);
    font-size: 14px;
    padding: 0 20px;
    height: 26px;
    font-weight: bold;
    line-height: 26px;
}
.recordTitleClass {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    /*margin-left: 180px;*/
}
.recordClass {
    height: 36px;
    line-height: 36px;
    margin: 0 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.recordContent {
    background-color: #f9f9f9;
}
.aprdAprvopinion {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
