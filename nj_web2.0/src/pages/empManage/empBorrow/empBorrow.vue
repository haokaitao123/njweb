<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;借支信息管理
                </p>
                <Row>
                    <Col span="18"
                         style="width: 100% !important">
                    <Row>
                        <Input placeholder="请输入员工姓名"
                               style="width: 200px"
                               @on-enter="enterEvent"
                               v-model="empnhName" />
                        <Input placeholder="请输入证件号码"
                               style="width: 200px"
                               @on-enter="enterEvent"
                               v-model="empnhIdno" />
                        <!--状态选择框-->
                        <btnList :btnData="btnData"
                                 :FlowNode="FlowNode"
                                 @buttonExport="expData"
                                 @buttonSearch="getData"
                                 @buttonImport="importExcel"
                                 @moditySelect="changemodity"
                                 @buttonAdd="openUp('','新增')"
                                 @buttonDel="deletemsg()"></btnList>
                    </Row>
                    <!--table-->
                    <row class="table-form"
                         ref="table-form">
                        <Table :loading="loading"
                               @on-selection-change="selectedtable"
                               @on-sort-change="sortable"
                               :height="tableheight"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="data">
                        </Table>
                    </row>
                    <!--page-->
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
                              :page-size-opts="[10, 20, 50, 100]">
                        </Page>
                        <Button type="ghost"
                                size="small"
                                shape="circle"
                                icon="refresh"
                                :loading="searchLoading"
                                style="margin-left: 20px;display: inline-block;"
                                @click="search()">
                        </Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <!--切换-->
        <transition name="fade">
            <update v-show="openUpdate"
                    :index="index"
                    @closeUp="closeUp"
                    @newdata="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!--导入导出子页面 若没有导入导出可以去掉-->
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       :logType="logType"
                       :index="index"
                       @closeExp="closeExp"
                       ref="expwindow"></expwindow>
        </transition>
        <transition>
            <expdow v-show="openExpDow"
                    :filekey="filekey"
                    :filename="filename"
                    @closeExpDowMain="closeExpDowMain"
                    ref="expdow"></expdow>
        </transition>
        <transition name="fade">
            <importExcel v-show="openImport"
                         :impid="updateId"
                         :imp_mt="imp_mt"
                         @getData="getData"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
    </div>
</template>
<script>
import update from './empBorrowBase'

import { isSuccess } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import btnList from '../../../components/btnAuth/btnAuth.js'
import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
import importExcel from "../../../components/importModel/importParam";

export default {
    data () {
        return {
            searchLoading: false,
            tableOperate: false,  //加上这个变量
            loading: "",
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            imp_mt: "empBorrow.importData",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "empnhName", name: "员工姓名" },
                { code: "empnhIdno", name: "证件号码" },
                { code: "unitFname", name: "部门名称" },
                { code: "postFname", name: "岗位名称" },
                { code: "borrTotamount", name: "总金额" },
                { code: "note", name: "备注" },
            ],
            //高度设置
            tableheight: document.body.offsetHeight - 280,
            logType: '',
            openUpdate: false,
            updateId: NaN,
            //下拉框选择数据idarray
            tableselected: [],
            //页面初始化默认状态
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: "员工姓名",
                    key: 'empnhName',
                    width: 140,
                    sortable: 'empId',
                },
                {
                    title: "证件号码",
                    width: 140,
                    key: 'empnhIdno',
                },
                {
                    title: "部门名称",
                    width: 140,
                    key: 'unitFname',
                },
                {
                    title: "岗位名称",
                    width: 140,
                    key: 'postFname',

                }, {
                    title: "总金额",
                    width: 140,
                    key: 'borrTotamount',

                },
            ],
            /*列表操作项*/
            tableBtn: {
                title: '操作',
                key: 'action',
                width: 100,
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                    let child = [];
                    for (let v of this.tableButton) {
                        child.push(h('Button', {
                            props: {
                                type: v.type,
                                size: 'small',
                            },
                            style: {
                                marginRight: '5px',
                                display: this.pageShow.indexOf(v.btnName) != -1 ? 'inline' : 'none',
                            },
                            on: {
                                click: () => {
                                    this.openUp(params.row.id, v.name, params.index);
                                },
                            },
                        }, v.name))
                    };
                    return h('div', [
                        child,
                    ])
                },
            },
            data: [],
            total: 0,
            showTotal: true,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 20,
            page: 1,
            funId: '1000',
            compFnameCnDis: '',
            empnhName: '',
            empnhIdno: '',
            openPick: false,
            params: {
                _mt: 'empBorrow.getPage',
                sort: 'id',
                order: 'asc',
                rows: 20,
                page: 1,
                funId: '1',
                logType: '借支信息查询',
                data: '{}',
            },
        }
    },
    computed: {
        pageShow () {
            return this.$store.state.btnOperate.pageShow
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton
        },
        /* modity() { //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
           return this.$store.state.btnOperate.modity
         },*/
        btnData () {
            return this.$store.state.btnOperate.btnData
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode
        },
    },

    /*引入子页面初始化，js不需要*/
    components: {
        update,
        btnList,
        expwindow,
        expdow,
        importExcel,
    },
    //列表项的默认显示隐藏
    created () {
        if (this.pageShow !== "") {
            this.columns.push(this.tableBtn);
            this.tableOperate = true
        }
    },
    //单表不需要
    watch: {
        pageShow (val) {
            if (val === "" && this.tableOperate === true) {
                this.columns.pop();
                this.tableOperate = false;
            } else if (this.tableOperate === false) {
                this.columns.push(this.tableBtn);
                this.tableOperate = true;
            }
        }
    },
    mounted () {
        this.getData();
    },
    methods: {
      //enter事件
      enterEvent(e){
          this.getData()
      },
        changemodity (res) {
            this.page = 1
            this.getData()
        },
        // 勾选数据方法 无需更改
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        // 删除方法 无需更改
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据')
            } else {
                t.$Modal.confirm({
                    title: '提示',
                    content: '请确定删除数据',
                    onOk: () => {
                        getDataLevelUserLogin({
                            // 设置删除mt参数 其余无需更改
                            _mt: 'empBorrow.delByIds',
                            logType: '删除',
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                                this.$Message.success('操作成功');
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: '错误',
                                content: '网络错误',
                            })
                        })
                    },
                    onCancel: () => { },
                })
            }
        },

        // 删除方法 无需更改
        setState (data) {
            const t = this
            if (t.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据')
            } else {
                t.$Modal.confirm({
                    title: '提示',
                    content: '请确定转正员工',
                    onOk: () => {
                        getDataLevelUserLogin({
                            // 设置删除mt参数 其余无需更改
                            _mt: 'empBorrow.setState',
                            logType: '转正',
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                                this.$Message.success('操作成功');
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: '错误',
                                content: '网络错误',
                            })
                        })
                    },
                    onCancel: () => { },
                })
            }
        },
        closeFrame () {
            const t = this
            t.openPick = false
        },//关闭Frame
        closeChart () {
            this.openChart = false
        },//关闭借支信息图
        getData () {
            this.searchLoading = true;
            const t = this
            //console.log("tableselected1--"+this.tableselected)
            this.tableselected = []
            //console.log("tableselected2--"+this.tableselected)
            t.loading = true; //请求之前重置状态
            const data = {
                _mt: 'empBorrow.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: '借支信息查询',
                empnhName: t.empnhName,
                empnhIdno: t.empnhIdno,
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
            }).finally(() => {
                t.loading = false; //在成功之后改状态
                t.searchLoading = false;
                //t.$store.commit('btnOperate/setSearchLoading',false);
            })
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },//排序
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData()
        },//分页
        pageChange (page) {
            const t = this
            t.page = page
            t.getData()
        },//分页
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10);
            t.logType = logType
            t.openUpdate = true
            t.index = index
            this.$store.commit('empBorrow/setMainId', id);
            this.$store.commit('empBorrow/setLogType', logType);
            if (logType != '新增') {
                t.$refs.update.getOption(id, logType);
            }
        },
        //关闭,并清除弹出页面的值
        closeUp () {
            const t = this
            t.openUpdate = false//控制修改窗口的显示和隐藏
        },//关闭窗口
        selected (key, name) {
            this.select = name
            this.cityTypeName = key
            this.getData()
        },//下拉选中
        search () {
            this.searchLoading = true;
            this.page = 1   
            this.getData()
        },
        /*导入、导出*/
        // 导入导出默认方法 无需更改
        closeImport () {
            const t = this;
            t.openImport = false;
        },
        // 导入导出默认方法 无需更改
        importExcel () {
            const t = this;
            t.openImport = true;
            t.$refs.importExcel.getDowModelFile();
        },
        // 导入导出默认方法
        expData () {
            const t = this;
            // 填装查询条件
            const data = {
                empnhName: t.empnhName,
                empnhIdno: t.empnhIdno,

            };
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, "empBorrow.export", data);
            this.openExp = true;
        },
        // 导入导出默认方法 无需更改
        closeExp () {
            const t = this;
            t.openExp = false;
        },
        // 导入导出默认方法 无需更改
        closeExpDowMain () {
            const t = this;
            t.openExpDow = false;
        },
        // 导入导出默认方法 无需更改
        setFileKey (filekey, filename, openExpDow) {
            const t = this;
            t.filekey = filekey;
            t.filename = filename;
            t.openExpDow = openExpDow;
            t.$refs.expdow.getPriToken(t.filekey);
        },
        //数据修改更新表格数据
        updateArray (res) {
            const t = this;
            t.data.splice(t.index, 1, res);
        },
        // 子页面新增数据后添加到本页面分页第一行  无需更改
        addNewArray (res) {
            const t = this;
            t.data.unshift(res);
        },
    },
}
</script>
