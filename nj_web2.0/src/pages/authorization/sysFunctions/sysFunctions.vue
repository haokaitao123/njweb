<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;{{$t('lang_role.adminfun.title')}}
                </p>
                <Row>
                    <span @dblclick="clearDub">
                        <Input v-model="funPidDis"
                               icon="search"
                               :readonly="true"
                               :placeholder="$t('lang_role.adminfun.pfunPidDis')"
                               style="width: 200px"
                               @on-click="pickData" />
                    </span>
                    <Input :placeholder="$t('lang_role.adminfun.pfunCode')"
                           style="width: 200px"
                           v-model="funCode" />
                    <Input :placeholder="$t('lang_role.adminfun.pfunName')"
                           style="width: 200px"
                           v-model="funName" />
                    <span style="margin: 0;"><Button type="primary"
                                icon="search"
                                @click="getData(1)">{{$t('button.ser')}}</Button></span>
                    <Button type="primary"
                            @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                    <Button type="error"
                            @click="deletemsg">{{$t('button.del')}}</Button>
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Table @on-selection-change="selectedtable"
                           @on-sort-change="sortable"
                           :height="tableheight"
                           size="small"
                           border
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :current="page"
                          :total="total"
                          size="small"
                          show-elevator
                          show-sizer
                          placement="top"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <Button type="ghost"
                            size="small"
                            shape="circle"
                            icon="refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="getData(1)"></Button>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    ref="update"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"></update>
        </transition>
        <transition name="fade">
            <searchTable v-show="openPick"
                         @closeUp="closeUp"
                         @changeinput="changeinput"
                         @clear="clear"
                         ref="searchTable"></searchTable>
        </transition>
    </div>
</template>
<script>
import update from './editSysFunctions'
import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLoginNew2 } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'
import searchTable from '../../../components/searchTable/searchPubFun'

export default {
    data () {
        return {
            tableheight: document.body.offsetHeight - 280,
            value: '',
            logType: '',
            openUpdate: false,
            openPick: false,
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_role.adminfun.funCode'),
                    key: 'funCode',
                    sortable: 'custom',
                    width: 200,
                },
                {
                    title: this.$t('lang_role.adminfun.funName'),
                    key: 'funName',
                    sortable: 'custom',
                    width: 200,
                    //          width: 150,
                },
                {
                    title: this.$t('lang_role.adminfun.funPidDis'),
                    key: 'funPidDis',
                    sortable: 'custom',
                    width: 170,
                    //          width: 150,
                },
                {
                    title: this.$t('lang_role.adminfun.funTypeDis'),
                    key: 'funTypeDis',
                    sortable: 'custom',
                    width: 170,
                    //          width: 130,
                },
                {
                    title: this.$t('lang_role.adminfun.funStyleDis'),
                    key: 'funStyleDis',
                    sortable: 'custom',
                    width: 170,
                    //          width: 130,
                },
                {
                    title: this.$t('lang_role.adminfun.funAction'),
                    key: 'funAction',
                    sortable: 'custom',
                    width: 170,
                    //          width: 130,
                },
                {
                    title: this.$t('lang_role.adminfun.funIsctrlbtnDis'),
                    key: 'funIsctrlbtnDis',
                    sortable: 'custom',
                    width: 160,
                },
                {
                    title: this.$t('lang_role.adminfun.funIsrptDis'),
                    key: 'funIsrptDis',
                    sortable: 'custom',
                    width: 160,
                },
                {
                    title: this.$t('lang_role.adminfun.validDis'),
                    key: 'validDis',
                    sortable: 'custom',
                    width: 170,
                    //          width: 130,
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
                                        console.log(params.row, "params.row")
                                        this.openUp(params.row.id, this.$t('button.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.upd')),
                        ])
                    },
                },
            ],
            data: [],
            total: NaN, // 总页数
            index: 0,
            sort: 'funCode',
            order: 'asc',
            rows: 10,
            page: 1,
            funCode: '',
            funPid: '',
            funPidDis: '',
            funName: '',
            funType: '',
        }
    },
    computed: {},
    components: {
        update,
        searchTable,
    },
    mounted () {
        this.getData(1)
    },
    methods: {
        getData (page) {
            const t = this
            if (page) {
                t.page = page
            }
            if (this.order === 'normal') {
                this.order = 'desc'
            }
            console.log()
            const data = {
                _mt: 'sysFunctions.getSysFunctionsByPage',
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                funCode: t.funCode,
                funPid: t.funPid,
                funName: t.funName,
                funType: t.funType,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew2(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        pickData () {
            this.$refs.searchTable.getData(this.params)
            this.openPick = true
        },
        clear () {
            const t = this
            t.funLancode = ''
            t.funPidDis = ''
            t.funPid = ''
        },
        clearDub () {
            const t = this
            t.funPidDis = ''
            t.funPid = ''
        },
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.page = page
            t.getData()
        },
        changeinput (name, id) {
            const t = this
            t.funPidDis = name
            t.funPid = id
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.confirmdelete'),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: 'sysFunctions.delByIds',
                            funId: '1',
                            companyId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        })
                    },
                    onCancel: () => {
                    },
                })
            }
        },
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getSelect()
            t.$refs.update.tabsSure(t.updateId)
            if (logType === this.$t('button.upd')) {
                t.$refs.update.getData(t.updateId)
            }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.$refs.update.formValidate.funCode = ''
            t.$refs.update.formValidate.funType = ''
            t.$refs.update.formValidate.funPid = ''
            t.$refs.update.funPidDis = ''
            t.$refs.update.formValidate.funName = ''
            t.$refs.update.formValidate.funStatecode
            t.$refs.update.formValidate.funLancode = ''
            t.$refs.update.formValidate.funLancode = ''
            t.$refs.update.formValidate.funAction = ''
            t.$refs.update.formValidate.funStyle = ''
            t.$refs.update.formValidate.funIsform = '0'
            t.$refs.update.formValidate.funIsctrlbtn = '0'
            t.$refs.update.formValidate.funIsrpt = '0'
            t.$refs.update.formValidate.funIsprocess = '0'
            t.$refs.update.formValidate.valid = '1'
            t.$refs.update.formValidate.funProcesid = ''
            t.$refs.update.formValidate.invdate = ''
            t.$refs.update.formValidate.invreason = ''
            t.$refs.update.formValidate.comment = ''
            t.$refs.update.formValidate.funImg = ''
            t.$refs.update.formValidate.funFormtype = ''
            t.$refs.update.formValidate.funForm = ''
            t.$refs.update.formValidate.funIsdefault = '0'
            t.$refs.update.formValidate.funStatecode = ''
            t.$refs.update.formValidate.funIsctrlfield = '0'
            t.$refs.update.funFormDis = ''
            t.$refs.update.funProcesidDis = ''
            t.$refs.update.formValidate.funImg = ''
            t.$refs.update.tabsDisable = true
            t.openUpdate = false
            t.openPick = false
            t.updateId = NaN
            t.$refs.update.name = 'sys1'
            t.$refs.update.tabsDisable = true
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
</style>
