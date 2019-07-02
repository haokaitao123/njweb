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
    </div>
</template>
<script>
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'
import selCountry from '../../../components/commonsel/selCountry'
import commonFlowUpdate from './commonFlowUpdate'
import transaction from './transaction';
import valid from '@/lib/pub_valid'
export default {
    data () {
        return {
            tableheight: document.body.offsetHeight - 280,
            value: '',
            logType: '',
            openUpdate: false,
            openTestUpd: false,
            openTransaction: false,
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
            relibReexamtm:'',
            flowStep: {
                width: 65,
                title: '步骤',
                align: 'center',
            },
            rcvdata: '',
          store:""
        }
    },
    computed: {

    },
    components: {
        selCountry,
        commonFlowUpdate,
        //      update,
        transaction,
    },
    //    created() {
    //
    //    },
    mounted () {

        this.getColumns()
    },
    methods: {
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
                    if(t.tbName==="recruit_process"){
                      let step = {
                        id: 'store',
                        flstepName: '暂存中'
                      }
                      t.dropdownMenuList.push(step)
                    }
                    console.log('aa1', res.data.content[0].columns)
                    aa = res.data.content[0].columns
                    //固定公共页面的第一列
                    if (aa.length > 10) {
                        for (let j = 0; j < aa.length; j++) {
                            if (aa[j].title == '姓名') {
                                aa[j].width = 80
                                aa[j].fixed = 'left'
                            }
                            if (aa[j].title == '员工姓名') {
                                aa[j].width = 80
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
                            aa[i].width = 80
                        } else if (aa[i].title == '复试人员') {
                            aa[i].width = 80
                        } else if (aa[i].title == '面到时间') {
                            aa[i].width = 150
                        } else if (aa[i].title == '员工姓名') {
                            aa[i].width = 80
                        } else if (aa[i].title == '证件号码') {
                            aa[i].width = 150
                        } else if (aa[i].title == '部门名称') {
                            aa[i].width = 80
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
                                                        t.stepName = t.flowStep[params.column.key].flstepName;
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
              }else {
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
              }else {
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
            if (btnId === 'button_quickpass') {
                const t = this;
                if (t.tableselected.length === 0) {
                    this.$Message.warning(this.$t('reminder.leastone'))
                } else {
                    t.$Modal.confirm({
                        title: this.$t("reminder.remind"),
                        content: this.$t("reminder.confirmOper"),
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
        },
        getPageByState (paramId, paramName) {
            const t = this;
            t.store = t.tbName !== 'recruit_process' ? '' : "restore";
            if(paramId=='store'){
               t.store = paramId
            }
            if (paramId === ""||paramId === "store") {
                t.curStep = "";
            }else {
                t.curStep = paramId;
            }
            t.relibFilldate = t.tbName !== 'recruit_process' ? '' : t.relibFilldate;
            t.relibReexamtm = t.tbName !== 'recruit_process' ? '' : t.relibReexamtm;
//            t.relibStore = t.tbName !== 'recruit_process' ? '' : t.relibStore;
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
            const rcdata = {
                curStep: t.curStep,
                flowId: t.flowId,
                empnhName: t.empnhName,
                relibFilldate: t.relibFilldate,
                relibReexamtm: t.relibReexamtm,
                relibStore: t.store
            };
            t.rcvdata = "";
            if (rcdata.curStep === "") {
                let tt = {
                    empnhName: t.empnhName,
                    relibFilldate: t.relibFilldate,
                    relibReexamtm: t.relibReexamtm,
                    relibStore: t.store
                };

                for (const dat in tt) {
                    if (tt[dat] === ""  ) {
                        delete tt[dat];
                    }
                }
                t.rcvdata = JSON.stringify(tt);
            } else {
                for (const dat in rcdata) {
                    if (rcdata[dat] === ""  ) {
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

        },
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Message.warning(t.$t('reminder.leastone'))
                return
            }
            t.$Modal.confirm({
                title: t.$t("reminder.remind"),
                content: t.$t("reminder.isDelete"),
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
                            let data = res.data.content[0].value;
                            if (data === 0) {
                                t.$Message.success(t.$t('reminder.deletesuccess'));
                            } else if (data === 1) {
                                t.$Message.warning('当前所选数据只能部分删除');
                            } else if (data === 2) {
                                t.$Message.warning('当前所选数据无法进行删除');
                            }
                            // t.$Message.success(t.$t('reminder.deletesuccess'));
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
    },
    watch: {
        $route (value, from) {
            if (value.name === 'commonFlowList') {
                this.flstepName = '全部';
                this.empnhName = "";
                this.relibFilldate = "";
                this.relibReexamtm = "";
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
