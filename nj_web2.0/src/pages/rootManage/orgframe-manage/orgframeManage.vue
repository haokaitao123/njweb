<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;组织信息管理
                </p>
                <Row>
                    <Col span="6"
                         class="colTree">
                    <div class="divtree"
                         :style="{height:treeheight + 'px'}">
                        <Tree v-if="dataTree != ''"
                              :data="dataTree"
                              @on-select-change="selectChange"
                              :render="renderContent">
                        </Tree>
                        <Spin v-if="loading"
                              size="large"
                              :style="{height:treeheight + 'px'}">
                        </Spin>
                    </div>
                    </Col>
                    <Col span="18"
                         style="width: 73.3333% !important">
                    <Row>
                        <Input placeholder="请输入组织名称"
                               style="width: 200px"
                               v-model="unitFname" />
                        <Select v-model="unitType"
                                style="width: 200px">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in unitTypeData"
                                    :key="index"
                                    @click="getPageByType(item.paramCode)">
                                {{item.paramInfoCn}}
                            </Option>
                        </Select>
                        <Dropdown v-show="modify">
                            <Button type="primary">
                                {{statusDis}}
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <span v-for="(item,index) in dropdownMenuList"
                                      :key="index"
                                      @click="getPageByState(item.funStatecode,item.funName)">
                                    <DropdownItem>{{item.funName}}</DropdownItem>
                                </span>
                            </DropdownMenu>
                        </Dropdown>
                        <span style="margin: 0;">
                            <Button type="primary"
                                    icon="search"
                                    @click="search()">查询
                            </Button>
                        </span>
                        <Button type="primary"
                                @click="openUp(NaN,$t('button.add'))"
                                v-show="status ==='00all' || status ==='01draft' ? true : false">
                            新增
                        </Button>
                        <span style="margin: 0;"
                              v-show="status ==='01draft' ? true : false">
                            <Button type="success"
                                    @click="modifystatus('02valid')">
                                生效
                            </Button>
                        </span>
                        <span style="margin: 0;"
                              v-show="status ==='02valid' ? true : false">
                            <Button type="primary"
                                    @click="modifystatus('01draft')">
                                编辑
                            </Button>
                        </span>
                        <span style="margin: 0;"
                              v-show="status ==='02valid' ? true : false">
                            <Button type="error"
                                    @click="modifystatus('03invalid')">
                                失效
                            </Button>
                        </span>
                        <span style="margin: 0;"
                              v-show="status ==='03invalid' ? true : false">
                            <Button type="success"
                                    @click="modifystatus('02valid')">
                                生效
                            </Button>
                        </span>
                        <Button type="primary"
                                @click="pickData">组织架构图</Button>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Table @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-sort-change="sortable"
                               :height="tableheight"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="data">
                        </Table>
                    </row>
                    <Row style="display: flex">
                        <Page :total="total"
                              size="small"
                              :current="page"
                              show-elevator
                              show-sizer
                              placement="top"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size-opts="[10, 20, 50, 100]">
                        </Page>
                        <Button type="ghost"
                                size="small"
                                shape="circle"
                                icon="refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="search()">
                        </Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update">
            </update>
        </transition>
        <transition name="fade">
            <orgframeChart v-show="openChart"
                           @closeChart="closeChart"
                           ref="orgframeChart">
            </orgframeChart>
        </transition>
        <transition name="fade">
            <searchOrgframe v-show="openPick"
                            :searchCloumns="searchCloumns"
                            :params="params"
                            @closeUp="closeFrame"
                            @changeinput="changeinput"
                            ref="searchOrgframe">
            </searchOrgframe>
        </transition>
    </div>
</template>
<script>
import orgframeChart from './orgframeChart'
import update from './orgframeInfoView'
import searchOrgframe from '../../../components/searchTable/searchOrgframe'
import { isSuccess } from '../../../lib/util'
import { getBtnAuth } from '../../../lib/authorityBtn'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
export default {
    data () {
        return {
            openChart: false,
            loading: true,
            dataTree: [],
            treeheight: document.body.offsetHeight - 200,
            tableheight: document.body.offsetHeight - 280,
            value: '',
            logType: '',
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            dropdownMenuList: [],   //状态下拉选择框数据
            unitTypeData: [],    //组织类型下拉选择框数据
            statusDis: "全部",
            unitTypeId: NaN,
            status: '00all',
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    fixed: 'left',
                    align: 'center',
                },
                {
                    title: "组织编码",
                    key: 'unitCode',
                    width: 140,
                    fixed: 'left',
                    sortable: 'custom',
                },
                {
                    title: "组织架构名称",
                    width: 180,
                    key: 'unitFname',
                },
                {
                    title: "组织类型",
                    width: 140,
                    key: 'unitTypeName',
                    sortable: 'custom',
                },
                {
                    title: "上级部门",
                    width: 180,
                    key: 'unitPname',
                    sortable: 'custom',
                },
                {
                    title: "部门职能",
                    key: 'unitPartfunctName',
                    width: 140,
                },
                {
                    title: "行业",
                    key: 'unitIndustryName',
                    width: 140,
                },
                {
                    title: "成本中心",
                    key: 'unitCenterName',
                    width: 140,
                },
                {
                    title: "雇佣地点",
                    key: 'unitCityName',
                    width: 140,
                },
                {
                    title: "生效日期",
                    key: 'unitValdate',
                    sortable: 'custom',
                    width: 140,
                },
                {
                    title: "失效日期",
                    key: 'unitInvdate',
                    sortable: 'custom',
                    width: 140,
                },
                {
                    title: "失效原因",
                    key: 'unitInvres',
                    width: 140,
                },
                {
                    title: "部门编制",
                    key: 'partEstablish',
                    width: 140,
                },
                {
                    title: "经理编制",
                    key: 'unitManger',
                    width: 140,
                },
                {
                    title: "主管编制",
                    key: 'unitDirec',
                    width: 140,
                },
                {
                    title: "员工编制",
                    key: 'unitStaff',
                    width: 140,
                },
                {
                    title: "状态",
                    key: 'stateName',
                    width: 140,
                },
                {
                    title: "操作记录",
                    key: 'unitOprecordName',
                    width: 140,
                },
                {
                    title: "系统转正",
                    key: 'unitSysalig',
                    width: 140,
                    render: (h, params) => {
                        return h('div', params.row.unitSysalig == 1 ? "是" : "否")
                    }
                },
                {
                    title: "备注",
                    key: 'note',
                    width: 140,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 64,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.upd')),
                        ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            unitCode: '',
            compFnameCnDis: '',
            treeid: '',
            unitFname: '',
            unitType: '',
            openPick: false,
            params: {
                _mt: 'orgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '组织架构查询',
                data: '{}',
                unitPid: 0,
            },
            modify: 'false',
            btnList: {
                // button_draft: '',    //编辑
                // button_upd: '',      //修改
                // button_del: '',      //删除
                // button_add: '',      //新增
                // button_save: '',     //保存
                // button_submit: '',   //提交
                // button_return: '',   //返回
                // button_cancel: '',   //取消
                // button_confirm: '',  //确认
                // button_invalid: '',  //失效
                // button_valid: '',    //生效
                // button_export: '',   //导出
                // button_import: '',   //导入
            },
            searchCloumns: [
                {
                    title: this.$t('lang_organization.orgframe.unitCode'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgframe.compCOrEName'),
                    key: 'unitFname',
                },
                {
                    title: this.$t('lang_organization.orgframe.unitTypeName'),
                    key: 'unitTypeName',
                },
            ],

        }
    },
    computed: {

    },
    components: {
        update,
        orgframeChart,
        searchOrgframe,
    },
    mounted () {
        this.getData();
        this.getTree();
        this.getSelect();
        this.unitTypeSelect();
        this.auth();
    },
    methods: {
        auth () {
            const t = this
            let data = {
                _mt: 'sysFunctions.getStatusBtnByAuth',
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res, "res");
                    let content = res.data.content[0].rows;
                    if (res.data.content[0].isFlowNode == "0") {
                        t.modify = false;
                        t.btnList = content[0];
                    } else if (res.data.content[0].isFlowNode == "1") {
                        t.modify = true;
                        t.btnList = content;
                        t.dropdownMenuList = content;
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: '错误',
                    content: '网络错误',
                })
            })
        },//按钮权限控制
        pickData () {
            const t = this
            t.$refs.searchOrgframe.getData(this.params)
            t.openPick = true
        },//点击组织架构图
        changeinput (name, id, costname, costid) {
            const t = this
            t.openPick = false
            t.$refs.orgframeChart.getData(id)
            t.openChart = true
        },//输入框
        closeFrame () {
            const t = this
            t.openPick = false
        },//关闭Frame
        closeChart () {
            this.openChart = false
        },//关闭组织架构图
        getData (id) {
            const t = this
            const data = {
                _mt: 'orgUnits.getByOrgFramePageList',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: '组织架构查询',
                unitFname: t.unitFname,
                unitType: t.unitType,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    // forEach(item )
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },//获取列表数据
        getTree () {
            const t = this
            const data = {
                _mt: 'orgUnits.getTree',
                rows: '100',
                page: '1',
                sort: 'unitCode',
                order: 'asc',
                logType: this.$t('button.ser'),
                id: '0',
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.loading = false
                    setTimeout(() => {
                        t.dataTree = t.toTree(res.data.content[0].value)
                    }, 500)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        /* 树点击事件 */
        selectChange (e) {
            this.treeid = e.id
            this.page = 1
            this.getData(e.id)
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach((item) => {
                item.expand = false
                item.checked = item.authRoleFunDis === '1'
                item.title = item.unitCode + ' ' + item.unitFname
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.unitPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    val.push(item)
                }
            })
            return val
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
            t.getTree()
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
            t.getTree()
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData(this.treeid)
            } else {
                this.order = 'desc'
            }
        },//排序
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData(this.treeid)
        },//分页
        pageChange (page) {
            const t = this
            t.page = page
            t.getData(this.treeid)
        },//分页
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr.toString()
        },//列表中选中的item
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getSelect()
            if (logType === this.$t('button.upd')) {
                t.$refs.update.getData(id)
            }
        },//打开窗口
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.formValidate.unitCode = ''
            t.$refs.update.formValidate.unitType = ''
            t.$refs.update.formValidate.unitFname = ''
            t.$refs.update.formValidate.unitPid = ''
            t.$refs.update.formValidate.unitPartfunct = ''
            t.$refs.update.formValidate.unitIndustry = ''
            t.$refs.update.formValidate.unitCenter = ''
            t.$refs.update.formValidate.unitCity = ''
            t.$refs.update.formValidate.unitValdate = ''
            t.$refs.update.formValidate.unitInvdate = ''
            t.$refs.update.formValidate.unitInvres = ''
            t.$refs.update.formValidate.partEstablish = ''
            t.$refs.update.formValidate.unitManger = ''
            t.$refs.update.formValidate.unitDirec = ''
            t.$refs.update.formValidate.unitStaff = ''
            t.$refs.update.formValidate.unitSysalig = ''
            t.$refs.update.formValidate.unitOprecord = ''
            t.$refs.update.formValidate.note = ''
            t.$refs.update.unitCenterName = ''
            t.$refs.update.unitCityName = ''
            t.$refs.update.unitPname = ''

        },//关闭窗口
        selected (key, name) {
            this.select = name
            this.cityTypeName = key
            this.getData()
        },//下拉选中
        search () {
            this.treeid = ''
            this.page = 1
            this.getData()
        },//查询
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                },
            }, [
                    h('Button', {
                        props: {
                            type: 'text',
                            size: 'small',
                        },
                        on: {
                            click: () => { this.selectChange(data) },
                        },
                    }, [
                            h('Icon', {
                                props: {
                                    type: data.unitType === '01company' ? 'social-buffer' : 'ios-people',
                                    size: '15',
                                    color: data.unitType === '01company' ? '#3399ff' : '#ff9900',
                                },
                                style: {
                                    marginRight: '8px',
                                },
                            }),
                            h('span', data.title),
                        ]),
                ])
        },//渲染树状图
        getSelect () {
            const t = this
            t.dropdownMenuList = []
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                logType: t.logType,
                typeCode: "pubuserstatus"
            }).then((res) => {
                if (isSuccess(res, t)) {
                    // t.dropdownMenuList = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },//获取下拉列表
        getPageByState (paramCode, paramInfoCn) {
            this.status = paramCode
            this.getData(1)
            this.statusDis = paramInfoCn
        },//选择状态条件
        modifystatus (state) {
            const t = this
            let logType = ''
            if (state === '02valid') {
                logType = '生效'
            } else if (state === '03invalid') {
                logType = '失效'
            }
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
                return
            }
            getDataLevelUserLogin({
                _mt: 'orgUnits.setStateById',
                logType: logType,
                state: state,
                ids: t.tableselected,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.getData(1)
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '操作完成',
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        }, //修改状态
        unitTypeSelect () {
            const t = this
            t.unitTypeData = []
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                logType: t.logType,
                typeCode: "orgunittype"
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.unitTypeData = res.data.content[0].value[0].paramList;
                    let obj = {
                        'paramCode': '',
                        'paramInfoCn': '全部'
                    }
                    t.unitTypeData.unshift(obj);
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },// 组织类别下拉列表数据
        getPageByType (paramCode) {
            this.unitTypeId = paramCode
            this.getData(1)
        }//根据类型获取列表
    },
}
</script>
<style lang="scss" scoped>
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
.colTree {
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
}
.divtree {
    padding-left: 10px;
    /*height: 750px;*/
    border: 1px #efefef solid;
    overflow: auto;
    position: relative;
}
</style>
