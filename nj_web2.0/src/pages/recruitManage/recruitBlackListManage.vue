<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    <!--标题-->
                    &nbsp;招聘黑名单
                </p>
                <Row>
                    <!--查询项 v-model中放查询变量-->
                    <Input placeholder="请输入招聘者姓名"
                           style="width: 200px"
                           v-model="recName" />
                    <Input placeholder="请输入证件号码"
                           style="width: 200px"
                           v-model="recIdenno" />

                    <!--按钮 @click中放方法() 无需变更-->
                    <btnList @buttonExport="expData"
                             @buttonImport="importExcel"
                             @buttonAdd="openUp(NaN,$t('button.add'))"
                             @buttonDel="deletemsg"
                             @buttonSearch="search"
                             :btnData="btnData"
                             :FlowNode="FlowNode">
                    </btnList>
                </Row>
                <!--布置分页列表 变量通用 无需变更-->
                <row class="table-form"
                     ref="table-form">
                    <Table @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-select-all="selectedtable"
                           @on-sort-change="sortable"
                           :current="page"
                           :height="tableheight"
                           size="small"
                           border
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :total="total"
                          size="small"
                          show-elevator
                          show-sizer
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
            </card>
            </Col>
        </Row>
        <!--布置子页面 v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
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
// 引用子页面
import update from './recruitBlackListInfo'
// 默认引用 无需变更
import { isSuccess } from '../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../axios/axios'
import expwindow from '../../components/fileOperations/expSms'
import expdow from '../../components/fileOperations/expdow'
import importExcel from '../../components/importModel/importParam'
import btnList from "../../components/btnAuth/btnAuth";
export default {
    data () {
        return {
            // 导入的mt名称
            imp_mt: 'recruitBlackList.importData',
            // 导出字段设置, code字段名 name列名
            expDataTital: [{ code: 'recName', name: '求职者姓名' }, { code: 'recIdenno', name: '证件号码' },
            { code: 'recPhone', name: '手机号' }, { code: 'recReason', name: '原因' },
            { code: 'note', name: '备注' }],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            // 子页面所需参数 无需变更
            tableheight: document.body.offsetHeight - 280,
            logType: '',
            openUpdate: false,
            updateId: NaN,
            // 主页面已勾选数据list
            tableselected: [],
            // 分页列表显示字段
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: '求职者姓名',
                    key: 'recName',
                    sortable: 'custom',
                    width: 220,
                },
                {
                    title: '证件号码',
                    key: 'recIdenno',
                    sortable: 'custom',
                    width: 220,
                },
                {
                    title: '手机号',
                    key: 'recPhone',
                    sortable: 'custom',
                    width: 220,
                },
                {
                    title: '原因',
                    key: 'recReason',

                    width: 220,
                },
                {
                    title: '备注',
                    key: 'note',

                    width: 220,
                },
            ],
            tableBtn: {
                title: "操作",
                key: "action",
                width: 100,
                fixed: "right",
                align: "center",
                render: (h, params) => {
                    let child = [];
                    for (let v of this.tableButton) {
                        child.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: v.type,
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px",
                                        display:
                                            this.pageShow.indexOf(v.btnName) != -1 ? "inline" : "none"
                                    },
                                    on: {
                                        click: () => {
                                            this.openUp(params.row.id, v.name, params.index);
                                        }
                                    }
                                },
                                v.name
                            )
                        );
                    }
                    return h("div", [child]);
                }
            },
            // 页面参数 无需更改
            data: [],
            total: 0,
            index: 0,
            sort: 'id', // 默认排序字段
            order: 'desc', // 默认排序方式
            rows: 10,
            page: 1,
            // 查询条件变量
            recName: '',
            recIdenno: '',


            loading: "",
        }
    },
    computed: {
        btnData () {
            return this.$store.state.btnOperate.btnData
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode
        },
        pageShow () {
            return this.$store.state.btnOperate.pageShow;
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton;
        },
        tableOperate () {
            return this.$store.state.btnOperate.tableOperate;
        },
    },
    watch: {
        pageShow (val) {
            if (val == "" && this.tableOperate == "true") {
                this.columns.pop();
                this.$store.commit("btnOperate/setTableOperate", "false");
            } else if (this.tableOperate == "false") {
                this.columns.push(this.tableBtn);
                this.$store.commit("btnOperate/setTableOperate", "true");
            }
        }
    },
    created () {
        console.log(this.btnData, "this.btnData");
        if (this.pageShow != "") {
            this.columns.push(this.tableBtn);
            this.$store.commit("btnOperate/setTableOperate", "true");
        }
    },
    components: {
        // 初始化子页面
        update,
        expwindow,
        expdow,
        importExcel,
        btnList
    },
    mounted () {
        // 页面打开自动调用查询方法 无需更改
        // this.getData(1)
    },
    methods: {
        // 查询方法
        getData (page) {
            const t = this
            // 是否重置页码 无需更改
            if (page) {
                t.page = page
            }
            // 分页查询mt
            const data = {
                _mt: 'recruitBlackList.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: '分頁查看',
                //          添加查询变量
                recName: t.recName,
                recIdenno: t.recIdenno,
            }
            // 删除空字段 无需更改
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            // 发送请求 返回分页list与总行数  无需更改
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: '错误',
                    content: '网络错误',
                })
            })
        },
        // 导入导出默认方法 无需更改
        closeImport () {
            const t = this
            t.openImport = false
        },
        // 导入导出默认方法 无需更改
        importExcel () {
            const t = this
            t.openImport = true
            t.$refs.importExcel.getDowModelFile()
        },
        // 导入导出默认方法
        expData () {
            const t = this
            // 填装查询条件
            const data = {
                recName: t.recName,
                recIdenno: t.recIdenno,
            }
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, 'recruitBlackList.export', data)
            this.openExp = true
        },
        // 导入导出默认方法 无需更改
        closeExp () {
            const t = this
            t.openExp = false
        },
        // 导入导出默认方法 无需更改
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        // 导入导出默认方法 无需更改
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        // 子页面新增数据后添加到本页面分页第一行  无需更改
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        // 子页面修改数据后 本页面修改对应行数的数据 无需更改
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        // 点击列表表头 调用排序方法 无需更改
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },
        // 变更列表显示行数方法 无需更改
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData()
        },
        // 翻页方法 无需更改
        pageChange (page) {
            const t = this
            t.page = page
            t.getData()
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
                t.$Modal.warning({
                    title: '提示',
                    content: '请至少选择一条数据',
                })
            } else {
                t.$Modal.confirm({
                    title: '提示',
                    content: '请确定删除数据',
                    onOk: () => {
                        getDataLevelUserLogin({
                            // 设置删除mt参数 其余无需更改
                            _mt: 'recruitBlackList.delByIds',
                            logType: '删除',
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
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
        // 打开子页面 传递本页面ID 无需更改
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            //        t.$refs.update.getSelect()
            if (logType === '修改') {
                t.$refs.update.getData(id)
            }
        },
        // 关闭子页面 无需更改
        closeUp () {
            const t = this
            t.openUpdate = false
        },
        //查询
        search () {

        }
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
</style>
