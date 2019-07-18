<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;{{titleName}}
                </p>
                <Row>
                    <Input :placeholder="tbName=='recruit_process' ? '请输入求职者姓名' : '请输入员工姓名'"
                           style="width: 200px"
                           @on-enter="enterEvent"
                           v-model.trim="empnhName" />
                    <DatePicker type="date"
                                v-model="relibFilldate"
                                placeholder="请输入面试时间"
                                style="width: 200px"
                                v-if="tbName=='recruit_process'"></DatePicker>
                    <DatePicker type="date"
                                v-model="relibReexamtm"
                                placeholder="请输入复试时间"
                                style="width: 200px"
                                v-if="tbName=='recruit_process'"></DatePicker>
                     <DatePicker type="date"
                                v-model="dimLevsqday"
                                placeholder="请输入申请离职日期"
                                style="width: 200px"
                                v-if="tbName=='emp_empdim'"></DatePicker>
                    <Button class="btns"
                            v-for="(item, index) in btns"
                            :key="index"
                            :type="item.btn_id === 'button_del'||item.btn_id === 'button_blacklist' ? 'error':'primary'"
                            @click="btnFunction(item.btn_id)">{{item.btn_title}}</Button>
                    <div class="moditySelect">
                        <Dropdown>
                            <Button type="primary">
                                {{flstepName}}
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <span v-for="(item,index) in dropdownMenuList"
                                      :key="index"
                                      @click="getPageByState(item.id,item.flstepName)">
                                    <DropdownItem>{{item.flstepName}}</DropdownItem>
                                </span>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Table @on-selection-change="selectedtable"
                           border
                           :height="tableheight"
                           size="small"
                           ref="selection"
                           :columns="columns"
                           :loading="loading"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :total="total"
                          :showTotal="showTotal"
                          size="small"
                          :current="page"
                          show-elevator
                          show-sizer
                          placement="top"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size=rows
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <Button type="ghost"
                            size="small"
                            shape="circle"
                            icon="refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="refresh"></Button>
                </Row>
            </card>
            </Col>
        </Row>
        <!-- :redisKey="redisKey"
                 :accouValue="accouValue" -->
        <loading v-show="showLoading"
                 @closeLoading="closeLoading"
                 ref="wfloading"></loading>
        <transition name="fade">
            <selCountry v-show="openSelCountry"
                        selSort="id"
                        selOrder="asc"
                        @selOk="countrySelOk"
                        @close="closeSelCountry"
                        ref="selCountry"></selCountry>
        </transition>
        <transition name="fade">
            <transaction v-show="openTransaction"
                         :id="transactionId"
                         :logType="logType"
                         @closeTransaction="closeTransaction"
                         ref="transactionWindow"></transaction>
        </transition>
        <transition name="fade">
            <interviewOrder v-show="openOrdersaction"
                            :id="exportselected"
                            :logType="logType"
                            @closeOrdersaction="closeOrdersaction"
                            ref="interviewOrder"></interviewOrder>
        </transition>
        <transition name="fade">
            <handover v-show="openHandoveraction"
                      :id="exportselected"
                      :logType="logType"
                      @closeHandoveraction="closeHandoveraction"
                      ref="handover"></handover>
        </transition>
        <commonFlowUpdate v-if="openTestUpd"
                          @close="closeTest"
                          ref="commonFlowUpdate"
                          @getData="getData"
                          :columns="columns"
                          :flowId="flowId"
                          :pkValue="pkValue"
                          :stepId="stepId"
                          :setpName="stepName"
                          :stepState="stepState"
                          :processState="processState">
        </commonFlowUpdate>
        <!--导入导出子页面 若没有导入导出可以去掉-->
    <transition>
      <expwindow
        v-show="openExp"
        :id="exportselected"
        @setFileKey="setFileKey"
        :logType="logType"
        :index="index"
        :tbName="tbName"
        @closeExp="closeExp"
        ref="expwindow"
      ></expwindow>
    </transition>
    <transition>
      <expdow
        v-show="openExpDow"
        :filekey="filekey"
        :filename="filename"
        @closeExpDowMain="closeExpDowMain"
        ref="expdow"
      ></expdow>
    </transition>
    </div>
</template>
<script>
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'
import selCountry from '../../../components/commonsel/selCountry'
import commonFlowUpdate from './commonFlowUpdate'
import transaction from './transaction'
import interviewOrder from './interviewOrder'
import handover from './handover'
import valid from '@/lib/pub_valid'
import loading from '@/components/loading/loading'
 import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
export default {
    data () {
        return {
            // 导出默认参数
            openExpDow: false,
        openExp: false,
         filekey: "",
        filename: "",
        exportselected:[],
            showLoading: false,
            reexamineState: true,
            tableheight: document.body.offsetHeight - 280,
            value: '',
            logType: '',
            openUpdate: false,
            openTestUpd: false,
            openTransaction: false,
            openOrdersaction: false,
            openHandoveraction: false,
            updateId: NaN,
            tableselected: [],
            transactionId: '',
            columns: [],
            tbName: '',
            btns: [],
            data: [],
            dropdownMenuList: [],
            flstepName: '全部',
            total: 0,
            showTotal: true,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 20,
            page: 1,
            countryId: '',
            countryCn: '',
            openSelCountry: false,
            flowId: '',
            stepId: '',
            pkValue: '',
            funId: this.$store.state.user.childFunId,
            stepState: '',
            processState: '',
            stepName: '',
            step: [],
            titleName: '',
            loading: "",
            curStep: '',
            empnhName: '',
            relibFilldate: '',
            relibReexamtm: '',
            dimLevsqday:'',
            flowStep: {
                width: 65,
                title: '步骤',
                align: 'center',
            },
            rcvdata: '',
            store: "",
            operateName: "",
            redisKey: "",
            accouValue: ""
        }
    },
    computed: {

    },
    components: {
        selCountry,
        commonFlowUpdate,
        //      update,
        transaction,
        interviewOrder,
        handover,
        expwindow,
      expdow,
        loading
    },
    //    created() {
    //
    //    },
    mounted () {

        this.getColumns()
    },
    methods: {
        closeLoading (val) {
            const t = this
            if (val === 'close') {
                t.showLoading = false
            } else {

                t.$Message.success(this.$t('reminder.operatsuccess'))
                t.tableselected = []
                t.getData(1);
                t.showLoading = false
            }
        },
        refresh () {
            this.page = 1;
            this.getColumns()
        },
        getColumns () {
            const t = this
            t.data = []
            getDataLevelUserLogin({
                _mt: 'platAutoLayoutGetFlowList.getListColumn',
                roleType: t.$store.state.user.roleType,
                logType: 'getListColumn',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let aa = []
                    t.dropdownMenuList = res.data.content[0].rwls;
                    t.total = res.data.content[0].records;
                    if (res.data.content[0].rwls.length > 0) {
                        let obj = {
                            id: '',
                            flstepName: '全部'
                        }
                        t.dropdownMenuList.push(obj)
                    }
                    t.flowId = res.data.content[0].flowId
                    t.btns = res.data.content[0].btns
                    console.log('t.btns', t.btns)
                    t.titleName = res.data.content[0].flowName

                    t.tbName = res.data.content[0].tbName
                    if (t.tbName === "recruit_process") {
                        let step = {
                            id: 'store',
                            flstepName: '暂存中'
                        }
                        t.dropdownMenuList.push(step)
                    }
                    console.log('aa1', res.data.content[0].columns)
                    aa = res.data.content[0].columns
                    //固定公共页面的第一列
                    if (aa.length > 9) {
                        console.log(aa, "aa")
                        for (let j = 0; j < aa.length; j++) {
                            // if (aa[j].key == '姓名') {
                            //     aa[j].width = 80
                            //     aa[j].fixed = 'left'
                            // }
                            // if (aa[j].title == '员工姓名') {
                            //     aa[j].width = 80
                            //     aa[j].fixed = 'left'
                            // }
                            if (aa[j].key == 'empId') {
                                aa[j].fixed = 'left'
                            }
                            if (aa[j].key == 'relibName') {
                                aa[j].width = 100
                                aa[j].fixed = 'left'
                            }
                            if (aa[j].key == 'relibApplypost') {
                                aa[j].fixed = 'left'
                            }
                            if (aa[j].key == 'relibFilldate') {
                                aa[j].fixed = 'left'
                            }
                            if (aa[j].key == 'relibQueue') {
                                aa[j].fixed = 'left'
                            }

                            if (aa[j].key == 'relibFirstus') {
                                aa[j].width = 100
                                aa[j].fixed = 'left'
                            }
                            if (aa[j].key == 'relibReexamus') {
                                aa[j].width = 100
                                aa[j].fixed = 'left'
                            }
                            if (aa[j].type == 'selection') {
                                aa[j].fixed = 'left'
                            }

                        }
                    }
                    for (let i = 0; i < aa.length; i++) {
                        aa[i].sortable = false
                        if (!aa[i].width) {
                            aa[i].width = 120
                        } else {
                            aa[i].width = 60
                        }
                        if (aa[i].title == '姓名') {
                            aa[i].width = 80
                        } else if (aa[i].title == '初试人员') {
                            aa[i].width = 120
                        } else if (aa[i].title == '复试人员') {
                            aa[i].width = 120
                        } else if (aa[i].title == '面到时间') {
                            aa[i].width = 150
                        } else if (aa[i].title == '员工姓名') {
                            aa[i].width = 80
                        } else if (aa[i].title == '证件号码') {
                            aa[i].width = 150
                        } else if (aa[i].title == '部门名称') {
                            aa[i].width = 150
                        } else if (aa[i].type == 'selection') {
                            aa[i].fixed = 'left'
                        }
                        if (aa[i].className !== '') {
                            aa[i].width = 120
                            aa[i]['render'] = (h, params) => {
                                let bb = params.row[aa[i].key];
                                let text = ''
                                let show = ''
                                switch (params.row.cellClassName[aa[i].key]) {
                                    case 'p_flowst_0':
                                        show = '未开启'
                                        break
                                    case 'p_flowst_1':
                                        show = '待处理'
                                        break
                                    case 'p_flowst_2':
                                        show = '处理中'
                                        break
                                    case 'p_flowst_3':
                                        show = '已完成'
                                        break
                                }
                                if (bb) {
                                    text = '[ ' + bb + ' ]'
                                }
                                if (text !== '') {
                                    return h('Tooltip', {
                                        props: {
                                            trigger: 'hover',
                                            content: show,
                                            placement: 'right',
                                        },
                                    }, [
                                            h('div', {
                                                style: {
                                                    width: '119px',
                                                    height: '100%',
                                                    'line-height': '40px',
                                                    'text-align': 'center',
                                                },
                                                on: {
                                                    click: async () => {

                                                        let stepId = t.flowStep[params.column.key].stepid
                                                        t.stepState = params.row.cellClassName[aa[i].key]
                                                        t.processState = t.flowStep[params.column.key].handleStatus
                                                        if (t.stepState === 'p_flowst_0') {
                                                            return
                                                        }
                                                        t.stepName = t.flowStep[params.column.key].flstepName
                                                        if (t.stepName === '复试' && (t.stepState === 'p_flowst_1' ||
                                                            t.stepState === 'p_flowst_2')) {
                                                            //查询是否在复试中
                                                            console.log(t.reexamineState, "t.reexamineState1")
                                                            await t.getReexamineState(params.row.id, true, "nj_reex_state")

                                                        }
                                                        console.log(t.reexamineState, "t.reexamineState2")
                                                        if (!t.reexamineState) {
                                                            //提示复试中
                                                            t.$Message.warning('此人员正在复试中')
                                                            return
                                                        }

                                                        await t.getData()
                                                        t.openUp(params.row.id, stepId, params.index)
                                                    },
                                                },
                                            }, text),
                                        ])
                                }
                                return h()
                            }
                        }
                    }
                    t.columns = aa
                    if (this.$store.state.user.funId) {
                        this.getData(1)
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        formColumns (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].className !== '') {
                    this.step.push(data[i].key)
                }
            }
        },
        //enter事件
        enterEvent (e) {
            if (e.target.value != '') {
                this.getData(1)
            }
        },
        btnFunction (btnId) {
            if (btnId === 'button_search') {
                const t = this;
                if (valid.val_check(this.empnhName)) {
                    t.getData(1);
                } else {
                    t.$Message.warning('搜索框内不能输入特殊字符！！！')
                }
            }
            if (btnId === 'button_add') {
                this.stepId = '0'
                this.stepState = ''
                this.pkValue = '0'
                this.openTestUpd = true
            }
            if (btnId === 'button_sxreeov') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    t.$Modal.confirm({
                        title: this.$t("reminder.remind"),
                        content: this.$t("reminder.confirmOper"),
                        onOk: () => {
                            const data = {
                                _mt: "platAutoLayoutFlowSubmit.submitBatch",
                                tbName: t.tbName,
                                stepId: 0,
                                roleType: t.$store.state.user.roleType,
                                flowId: t.flowId,
                                pkValue: t.tableselected.toString(),
                                logType: 'submit'
                            };
                            for (const dat in data) {
                                if (data[dat] === "") {
                                    delete data[dat];
                                }
                            }
                            getDataLevelUserLogin(data)
                                .then(res => {
                                    if (isSuccess(res, t)) {
                                        t.$Message.success(this.$t('reminder.operatsuccess'))
                                        t.tableselected = []
                                        t.getData(1)
                                    }
                                })
                                .catch(() => {
                                    t.$Message.error(this.$t('reminder.errormessage'))
                                });
                        }
                    });
                }
            }
            //导出按钮
            if (btnId === 'button_export') {
                const t = this;
                // 填装查询条件
                if(this.tableselected.length > 0){
                 this.exportselected = this.tableselected.split(',');
                }
                const data = {   
                empnhName: t.empnhName,
                empnhIdno: t.empnhIdno,
                dimLevsqday: t.dimLevsqday,
                relibFilldate:t.relibFilldate,
                relibReexamtm:t.relibReexamtm,
                state: t.state
                };
                // 设置导出mt参数
                this.$refs.expwindow.getData(t.getexpDataTital(t.tbName), "platAutoLayoutExport.export", data);
                this.openExp = true;
                
            }
            if (btnId === 'button_del') {
                this.deletemsg();
            }
            if (btnId === 'button_blacklist') {
                this.addBlackUser()
            }
            //暂存按钮
            if (btnId === 'button_store') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    t.$Modal.confirm({
                        title: this.$t("reminder.remind"),
                        content: this.$t("reminder.confirmOper"),
                        onOk: () => {
                            const data = {
                                _mt: "recruitProcess.updateStore",
                                funId: t.$route.query.id,
                                logType: '暂存',
                                ids: t.tableselected,
                                type: 'store',
                            };
                            for (const dat in data) {
                                if (data[dat] === "") {
                                    delete data[dat];
                                }
                            }
                            getDataLevelUserLogin(data)
                                .then(res => {
                                    if (isSuccess(res, t)) {
                                        t.$Message.success(this.$t('reminder.operatsuccess'))
                                        t.tableselected = []
                                        t.getData(1)
                                    }
                                })
                                .catch(() => {
                                    t.$Message.error(this.$t('reminder.errormessage'))
                                });
                        }
                    });
                }
            }
            //还原按钮
            if (btnId === 'button_restore') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    t.$Modal.confirm({
                        title: this.$t("reminder.remind"),
                        content: this.$t("reminder.confirmOper"),
                        onOk: () => {
                            const data = {
                                _mt: "recruitProcess.updateStore",
                                funId: t.$route.query.id,
                                logType: '还原',
                                ids: t.tableselected,
                                type: 'restore',
                            };
                            for (const dat in data) {
                                if (data[dat] === "") {
                                    delete data[dat];
                                }
                            }
                            getDataLevelUserLogin(data)
                                .then(res => {
                                    if (isSuccess(res, t)) {
                                        t.$Message.success(this.$t('reminder.operatsuccess'))
                                        t.tableselected = []
                                        t.getData(1)
                                    }
                                })
                                .catch(() => {
                                    t.$Message.error(this.$t('reminder.errormessage'))
                                });
                        }
                    });
                }
            }
            //退回按钮
            if (btnId === 'button_returns') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    t.$Modal.confirm({
                        title: this.$t("reminder.remind"),
                        content: this.$t("reminder.confirmOper"),
                        onOk: () => {
                            const data = {
                                _mt: "platFlDealNode.update",
                                funId: t.$route.query.id,
                                logType: '退回',
                                ids: t.tableselected,
                                type: 'returns',
                            };
                            for (const dat in data) {
                                if (data[dat] === "") {
                                    delete data[dat];
                                }
                            }
                            getDataLevelUserLogin(data)
                                .then(res => {
                                    if (isSuccess(res, t)) {
                                        t.$Message.success(this.$t('reminder.operatsuccess'))
                                        t.tableselected = []
                                        t.getData(1)
                                    }
                                })
                                .catch(() => {
                                    t.$Message.error(this.$t('reminder.errormessage'))
                                });
                        }
                    });
                }
            }
            //淘汰按钮
            if (btnId === 'button_sifted') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    t.$Modal.confirm({
                        title: this.$t("reminder.remind"),
                        content: this.$t("reminder.confirmOper"),
                        onOk: () => {
                            const data = {
                                _mt: "platFlDealNode.update",
                                funId: t.$route.query.id,
                                logType: '淘汰',
                                ids: t.tableselected,
                                type: 'sifted',
                            };
                            for (const dat in data) {
                                if (data[dat] === "") {
                                    delete data[dat];
                                }
                            }
                            getDataLevelUserLogin(data)
                                .then(res => {
                                    if (isSuccess(res, t)) {
                                        t.$Message.success(this.$t('reminder.operatsuccess'))
                                        t.tableselected = []
                                        t.getData(1)
                                    }
                                })
                                .catch(() => {
                                    t.$Message.error(this.$t('reminder.errormessage'))
                                });
                        }
                    });
                }
            }
            if (btnId === 'button_quickpass') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    t.$Modal.confirm({
                        title: this.$t("reminder.remind"),
                        content: this.$t("快速审批将直接异动完成，不需要审批，请谨慎操作"),
                        onOk: () => {
                            const data = {
                                _mt: "platAutoLayoutFlowSubmit.transSubmit",
                                roleType: t.$store.state.user.roleType,
                                funId: t.$route.query.id,
                                flowId: t.flowId,
                                logType: '快速审批',
                                ids: t.tableselected,
                                tbName: t.tbName,
                            };
                            for (const dat in data) {
                                if (data[dat] === "") {
                                    delete data[dat];
                                }
                            }
                            getDataLevelUserLogin(data)
                                .then(res => {
                                    if (isSuccess(res, t)) {
                                        console.log(res, "res123")

                                        let redisKey = res.data.content[0].redisKey;
                                        let accouValue = res.data.content[0].accouValue;
                                        t.showLoading = true;
                                        t.$refs.wfloading.intervalState(redisKey, accouValue);
                                    }
                                })
                                .catch(() => {
                                    t.$Message.error(this.$t('reminder.errormessage'))
                                });
                        }
                    });
                }
            }
            if (btnId === 'button_transbatch') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    t.$Modal.confirm({
                        title: this.$t("reminder.remind"),
                        content: this.$t("reminder.confirmOper"),
                        onOk: () => {
                            const data = {
                                _mt: "platAutoLayoutFlowSubmit.transBatch",
                                roleType: t.$store.state.user.roleType,
                                funId: t.$route.query.id,
                                flowId: t.flowId,
                                logType: '快速审批',
                                ids: t.tableselected,
                                tbName: t.tbName,
                            };
                            for (const dat in data) {
                                if (data[dat] === "") {
                                    delete data[dat];
                                }
                            }
                            getDataLevelUserLogin(data)
                                .then(res => {
                                    if (isSuccess(res, t)) {
                                       /* console.log(res, "res123")
                                        t.$Message.success(this.$t('reminder.operatsuccess'))
                                        t.tableselected = []
                                        t.getData(1)*/
                                      let redisKey = res.data.content[0].redisKey;
                                      let accouValue = res.data.content[0].accouValue;
                                      t.showLoading = true;
                                      t.$refs.wfloading.intervalState(redisKey, accouValue);
                                    }
                                })
                                .catch(() => {
                                    t.$Message.error(this.$t('reminder.errormessage'))
                                });
                        }
                    });
                }
            }
            if (btnId === 'button_order') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    this.logType = "面谈预约";
                    this.exportselected = this.tableselected.split(',');
                    this.openOrdersaction = true;
                }
            }
            if (btnId === 'button_handover') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    this.logType = "交接时间";
                    this.exportselected = this.tableselected.split(',');
                    this.openHandoveraction = true;
                }
            }
        },
        // 公共导出字段设置
        getexpDataTital(tbName){
            let  expDataTital ;
            if(tbName === "emp_empdim"){
               expDataTital =  [
            { code: "empIdName", name: "员工姓名" },
            { code: "deptIdDis", name: "部门" },
            { code: "postIdDis", name: "岗位" },
            { code: "dimLevday", name: "约定离职日期" },
            { code: "dimLaswkday", name: "最后工作日期" },
            { code: "dimActlevday", name: "实际离职日期" },
            { code: "dimReasonDis", name: "离职原因" },
            { code: "dimTypeDis", name: "离职类型" },
            { code: "dimLevsqday", name: "申请离职日期" },
            { code: "dimIsreceiveDis", name: "是否工作交接" },
            { code: "dimReceiveDis", name: "交接人" },
            { code: "dimIntetime", name: "面谈时间" },
            { code: "dimIntenote", name: "面谈记录" },
            { code: "dimIntereason", name: "面谈离职原因" },
            { code: "dimCertifiDis", name: "是否需要离职证明" },
            { code: "dimCoftime", name: "工作交接时间" },
            { code: "dimSalday", name: "当月工资发放时间" },
            { code: "dimLastsalday", name: "下月工资发放时间" },
            { code: "dimAttday", name: "考勤截止日期" },
            { code: "dimBuspmpDis", name: "上级经理" },
            { code: "dimDeppmp", name: "部门负责人" },
            { code: "postStation", name: "是否驻厂" },
            ]
            return expDataTital;
            }else if(tbName === "recruit_process"){
                 expDataTital =  [
            { code: "relibName", name: "员工姓名" },
            { code: "relibReexamtm", name: "复试结果" },
            { code: "relibFruit", name: "面试结果" },
            { code: "relibApplypostDis", name: "应聘岗位" },
            { code: "relibHiredeptDis", name: "入职部门" },
            { code: "groupDis", name: "组别" },
            { code: "relibFirstusDis", name: "初试人员" },
            { code: "relibInvitemanDis", name: "招聘人" },
            { code: "relibEducatDis", name: "学历" },
            { code: "relibReexamusDis", name: "复试人员" },
            { code: "reason", name: "未通过原因" },
            { code: "relibCheckopin", name: "筛选意见" },
            { code: "relibMobile", name: "手机号" },
            { code: "relibAvaitime", name: "可到岗时间" },
            { code: "relibIdentityDis", name: "身份" },
            { code: "relibGenderDis", name: "性别" },
            { code: "relibBirtplaceDis", name: "籍贯" },
            { code: "relibNatalityDis", name: "民族" },
            { code: "relibPoliticalDis", name: "政治面貌" },
            { code: "relibHealthstaDis", name: "健康状况" },
            { code: "relibMaritlstaDis", name: "婚姻状况" },
            { code: "relibWithmeDis", name: "与本人关系" },
            { code: "relibProstatusDis", name: "职业状态" },
            { code: "relibIsrelativesDis", name: "是否有朋友在职" },
            { code: "relibIscriminalDis", name: "是否有犯罪记录" },
            { code: "relibIstattooDis", name: "是否有纹身" },
            { code: "relibApplytypeDis", name: "通过何种方法应聘" },
            { code: "relibIscomDis", name: "是否服从调配" },
            { code: "relibEnrorageDis", name: "招生范围" },
            { code: "relibIsgraduDis", name: "是否毕业" },
            { code: "relibExaminaresDis", name: "补考结果" },
            { code: "relibFirpassDis", name: "补考是否通过" },
            { code: "relibIsguaranDis", name: "是否担保" },
            { code: "relibExaminaDis", name: "考试结果" },
            { code: "relibGuaranteeDis", name: "担保人" },
           
            ]

                return expDataTital;    
            }else if(tbName === "emp_transtion"){
                 expDataTital =  [
            { code: "empName", name: "员工姓名" },
            { code: "empIdno", name: "证件号码" },
            { code: "empnhEntrydate", name: "入职日期" },
            { code: "transDate", name: "异动日期" },
            { code: "transTypeDis", name: "异动类型" },
            { code: "transCroscompDis", name: "是否跨公司" },
            { code: "transCrospartDis", name: "是否跨部门" },
            { code: "transSignproDis", name: "是否签订补充协议" },
            { code: "transPostinfoDis", name: "岗位资料是否移交" },
            { code: "deptIdpastDis", name: "原部门" },
            { code: "postIdpastDis", name: "原岗位" },
            { code: "transPastleaderDis", name: "原直接领导" },
            { code: "transPastupopin", name: "原上级直接意见" },
            { code: "deptIdnewDis", name: "现部门" },
            { code: "deptPmp", name: "现部门负责人" },
            { code: "postIdnewDis", name: "现岗位" },
            { code: "transNewleaderDis", name: "现直接领导" },
            { code: "transNewupopin", name: "现上级直接意见" },
            { code: "transPartmopin", name: "部门经理意见" },
            { code: "transGenraopin", name: "总经办意见" },
            ]

                return expDataTital;    
            }else if(tbName === "atten_shift"){
                //调班流程导出

                return expDataTital;    
            }else if(tbName === "atten_vacation"){
                //请假流程导出

                return expDataTital;    
            }else if(tbName === "atten_gooutproc"){
                //外出流程导出

                return expDataTital;    
            }else if(tbName === "atten_ckappeal"){
                //考勤申诉流程导出

                return expDataTital;    
            }

        },
        addBlackUser () {
            const t = this
            t.transactionId = t.tableselected
            if (this.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据');
            } else {
                this.logType = "加入黑名单";
                this.openTransaction = true;
            }
        },
        openUp (pkValue, stepId, index) {
            this.stepId = stepId
            this.pkValue = pkValue
            this.index = index
            this.openTestUpd = true
        },
        closeTest () {
            this.stepName = ''
            this.openTestUpd = false
            this.reexamineState = true
            //删除复试中状态
            this.getReexamineState(this.pkValue, false, "nj_reex_state")

        },
        getPageByState (paramId, paramName) {
            const t = this;
            t.store = t.tbName !== 'recruit_process' ? '' : "restore";
            if (paramId == 'store') {
                t.store = paramId
            }
            if (paramId === "" || paramId === "store") {
                t.curStep = "";
            } else {
                t.curStep = paramId;
            }
            t.relibFilldate = t.tbName !== 'recruit_process' ? '' : t.relibFilldate;
            t.relibReexamtm = t.tbName !== 'recruit_process' ? '' : t.relibReexamtm;
            t.dimLevsqday = t.tbName !== 'emp_empdim' ? '' : t.dimLevsqday;
            this.page = 1;
            t.tableselected = []
            t.getData(1);
            t.flstepName = paramName;
        },
        getData (page) {
            const t = this
            if (page) {
                t.page = page;
            }
            if (typeof (page) == "undefined") {
                this.page = 1;
            }
            t.loading = true;
            t.relibFilldate = t.relibFilldate != "" ? new Date(t.relibFilldate).format("yyyy-MM-dd") : "";
            t.relibReexamtm = t.relibReexamtm != "" ? new Date(t.relibReexamtm).format("yyyy-MM-dd") : "";
            t.dimLevsqday = t.dimLevsqday != "" ? new Date(t.dimLevsqday).format("yyyy-MM-dd") : "";
            const rcdata = {
                curStep: t.curStep,
                flowId: t.flowId,
                empnhName: t.empnhName,
                relibFilldate: t.relibFilldate,
                relibReexamtm: t.relibReexamtm,
                dimLevsqday:t.dimLevsqday,
                relibStore: t.store
            };
            t.rcvdata = "";
            if (rcdata.curStep === "") {
                if (t.tbName !== 'recruit_process') {
                    t.store = '';
                }
                let tt = {
                    empnhName: t.empnhName,
                    relibFilldate: t.relibFilldate,
                    relibReexamtm: t.relibReexamtm,
                     dimLevsqday:t.dimLevsqday,
                    relibStore: t.store
                };

                for (const dat in tt) {
                    if (tt[dat] === "") {
                        delete tt[dat];
                    }
                }
                t.rcvdata = JSON.stringify(tt);
            } else {
                for (const dat in rcdata) {
                    if (rcdata[dat] === "") {
                        delete rcdata[dat];
                    }
                }
                t.rcvdata = JSON.stringify(rcdata);
            }
            getDataLevelUserLogin({
                _mt: 'platAutoLayoutGetFlowList.getFlowSta',
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                roleType: t.$store.state.user.roleType,
                logType: 'getPage',
                data: t.rcvdata,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = JSON.parse(res.data.content[0].rows);
                    t.flowStep = JSON.parse(res.data.content[0].flowStep)
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
            });
        },

        //  //导出
        // expData () {
        //     this.$refs.commonPage.expData()
        // },
         // 导入导出默认方法 无需更改
      closeExp() {
        const t = this;
        this.$refs.expwindow.expDisFields = [];
        this.$refs.expwindow.checkAll = false;
        this.$refs.expwindow.indeterminate = false;
        t.openExp = false;
      },
      // 导入导出默认方法 无需更改
      closeExpDowMain() {
        const t = this;
        t.openExpDow = false;
      },
       // 导入导出默认方法 无需更改
      setFileKey(filekey, filename, openExpDow) {
        const t = this;
        t.filekey = filekey;
        t.filename = filename;
        t.openExpDow = openExpDow;
        t.$refs.expdow.getPriToken(t.filekey);
      },
        addNewArray (res) {
            const t = this
            if (t.data.length === 0) {
                t.data.push(res)
            } else {
                t.data.unshift(res)
            }
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        sortable (column) {
            this.sort = column.key
            if (column.order !== 'normal') {
                this.order = column.order
                this.getData(1)
            }
        },
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData(1)
        },
        pageChange (page) {
            const t = this
            t.page = page
            t.getData(page)
        },
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr.toString();
            //this.exportselected = newArr;

        },
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Message.warning(t.$t('reminder.leastone'))
                return
            }
            t.$Modal.confirm({
                title: t.$t("reminder.remind"),
                content: t.$t("删除操作会直接删掉数据，是否确认删除"),
                onOk: () => {
                    getDataLevelUserLogin({
                        _mt: 'platAutoLayoutDel.delByIds',
                        funId: '1',
                        logType: t.$t('button.del'),
                        tbName: t.tbName,
                        flowId: t.flowId,
                        delIds: t.tableselected,
                    }).then((res) => {
                        if (isSuccess(res, t)) {
                            console.log(res.data.content[0].value, "res");

                            if(t.tbName==="recruit_process"){
                              let data = res.data.content[0].value;
                              if (data === 0) {
                                t.$Message.success(t.$t('reminder.deletesuccess'));
                              } else if (data === 1) {
                                t.$Message.warning('当前所选数据只能部分删除');
                              } else if (data === 2) {
                                t.$Message.warning('当前所选数据无法进行删除');
                              }
                            }else{
                              t.$Message.success(t.$t('reminder.deletesuccess'));
                            }

                            t.tableselected = []
                            t.getData()
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
        pickCountrySel () {
            this.$refs.selCountry.getData()
            this.openSelCountry = true
        },
        countrySelOk (countryId, countryCn) {
            //        alert(countryId + ' ' + countryCn)
            this.countryId = countryId
            this.countryCn = countryCn
        },
        closeSelCountry () {
            this.openSelCountry = false
        },
        closeTransaction () {
            this.openTransaction = false;
        },
        closeOrdersaction () {
            this.exportselected = [];
            this.openOrdersaction = false;
            this.getData(1);
        },
        closeHandoveraction () {
            this.exportselected = [];
            this.openHandoveraction = false;
            this.getData(1);
        },
        /**
         *设置iView查看(true)或删除(false)
         * @param id 数据id
         * @param isView 查看true,删除false
         * @param type 唯一标记
         */
        async getReexamineState (id, isView, type) {
            const t = this
            const data = {
                _mt: "platFlowState.flowState",
                logType: '复试状态更新',
                isView: isView,
                type: type,
                id: id
            }
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            await getDataLevelUserLogin(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        let data = res.data.content[0].value;
                        t.reexamineState = data;
                        console.log(t.reexamineState, "t.reexamineState3")
                    }
                })
                .catch(() => {
                    t.$Message.error(this.$t('reminder.errormessage'))
                })
        },

    },
    watch: {
        $route (value, from) {
            if (value.name === 'commonFlowList') {
                this.flstepName = '全部';
                this.empnhName = "";
                this.relibFilldate = "";
                this.relibReexamtm = "";
                this.dimLevsqday ="";
                this.flowId = "";
                this.curStep = "";
                this.rcvdata = "";
                this.getColumns();
            }
        },
    },
}
</script>
<style lang="scss">
.table-form {
    margin: 10px 0;
}

.margin-right-10 {
    margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.btns {
    margin-right: 5px;
}

.table-form {
    margin-top: 10px;
    .ivu-table {
        .p_flowst_0 {
            .ivu-table-cell {
                height: 40px;
                padding: 0;
            }
        }
        .p_flowst_1 {
            background-color: #ffc100;
            color: #fff;
            cursor: pointer;
            .ivu-table-cell {
                height: 40px;
                padding: 0;
            }
        }
        .p_flowst_1:hover {
            transition: all 0.3s;
            background-color: #edb300;
        }
        .p_flowst_2 {
            background-color: #4472c5;
            color: #fff;
            cursor: pointer;
            .ivu-table-cell {
                height: 40px;
                padding: 0;
            }
        }
        .p_flowst_2:hover {
            transition: all 0.3s;
            background-color: #395fa5;
        }
        .p_flowst_3 {
            background-color: #70ad46;
            color: #fff;
            cursor: pointer;
            .ivu-table-cell {
                height: 40px;
                padding: 0;
            }
        }
        .p_flowst_3:hover {
            transition: all 0.3s;
            background-color: #598937;
        }
    }
}

.moditySelect {
    display: inline-block;
}
</style>
