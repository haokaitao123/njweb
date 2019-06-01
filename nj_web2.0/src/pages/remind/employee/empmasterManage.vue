<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <!-- 标题 -->
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;员工试岗提醒
                </p>
                <Row>
                    <Col span="6"
                         class="colTree">
                    <div class="divtree"
                         :style="{height:treeheight + 'px'}">
                        <Tree v-if="dataTree != ''"
                              :data="dataTree"
                              @on-select-change="selectChange"
                              :render="renderContent"></Tree>
                        <Spin v-if="loading"
                              size="large"
                              :style="{height:treeheight + 'px'}"></Spin>
                    </div>
                    </Col>
                    <Col span="18"
                         style="width: 73.3333% !important;">
                    <Row>
                        <Input placeholder="请输入员工姓名"
                               style="width: 200px"
                               v-model="empnhName" />
                        <Input placeholder="请输入员工证件号"
                               style="width: 200px"
                               v-model="empnhIdno" />
                        <!-- <Input
                  placeholder="请输入部门名称"
                  style="width: 200px"
                  v-model="postId"
                /> -->
                        <!-- <Input
                  placeholder="请输入岗位名称"
                  style="width: 200px"
                  v-model="deptId"
                /> -->
                        <span @dblclick="clearDept()">
                            <Input v-model="deptName"
                                   style="width: 200px"
                                   icon="search"
                                   :readonly="true"
                                   placeholder="请选择岗位名称"
                                   @on-click="pickData()" />
                        </span>
                        <span style="margin: 0;">
                            <Button type="primary"
                                    icon="search"
                                    @click="search()">查询</Button>
                        </span>
                        <!-- <Button type="primary" @click="openUp1(NaN,$t('button.add'))">{{$t('button.add')}}</Button> -->
                        <Button type="error"
                                @click="deletemsg">删除</Button>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Table @on-select="selectedtable"
                               :loading="loading"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-sort-change="sortable"
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
                              :current="page"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size-opts="[10, 20, 50, 100]"></Page>
                        <Button type="ghost"
                                size="small"
                                shape="circle"
                                icon="refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="search()"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <!-- <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition> -->
        <transition name="fade">
            <update v-if="openUpdate"
                    :pklv="pklv"
                    @closeUp="closeUp"></update>
        </transition>
        <transition name="fade">
            <searchTable v-show="openPick"
                         :searchPostClo="searchCloumns"
                         :params="params"
                         @inputPost="inputPost"
                         @closePost="closeTable"
                         @changeinput="changeinput"
                         ref="searchTable"></searchTable>
        </transition>
    </div>
</template>
<script>
import update from "./empPoBase";
// import addemployee from "./addNewEmployee";
import { isSuccess } from "../../../lib/util";
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "../../../axios/axios";

export default {
    data () {
        return {
            dataTree: [],
            loading: true,
            treeheight: document.body.offsetHeight - 200,
            tableheight: document.body.offsetHeight - 280,
            // value: "",
            logType: "",
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: "selection",
                    width: 54,
                    //          fixed: 'left',
                    align: "center"
                },
                {
                    title: "雇员姓名",
                    // key: "empCname"
                    key: "empnhName"

                    //          fixed: 'left',
                    //            sortable: 'custom',
                },
                {
                    title: "性别",

                    key: "empnhGender"
                },

                {
                    title: "部门名称",
                    key: "deptId"
                },
                {
                    title: "岗位名称",
                    key: "postId"
                },



                {
                    title: "操作",
                    key: "action",
                    width: 64,
                    fixed: "right",
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.openUp(
                                                params.row.id,
                                                "修改",
                                                params.index
                                            );
                                        }
                                    }
                                },
                                "修改"
                            )
                        ]);
                    }
                }
            ],
            data: [],
            total: 0,
            index: 0,
            sort: "id",
            order: "desc",
            rows: 10,
            page: 1,
            funId: "1000",
            // empCname: "",
            empnhName: "",
            empnhIdno: "",
            deptId: "",
            postId: "",
            state: "",
            // empNo: "",
            treeid: "",
            treeType: "",
            pklv: "",
            openPick: "false",
            searchCloumns: [
                {
                    title: this.$t('lang_employee.searchColumn.postCode'),
                    key: 'postCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameCnDis'),
                    key: 'postFname',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameEnDis'),
                    key: 'postFnameEnDis',
                    sortable: 'custom',
                },
            ],
            params: {
                _mt: 'orgPost.getPage',
                rows: '10',
                page: '1',
                sort: 'id',
                order: 'desc',
                logType: '岗位',
            },
            deptName: ''
        };
    },
    computed: {},
    components: {
        update,
        // addemployee
    },
    mounted () {
        this.getData("", 1);
        this.getTree();
    },
    methods: {
        //获取主表数据
        getData (id, page) {
            const t = this;
            if (id === "$") {
                id = "";
            }
            if (page) {
                t.page = page;
            }
            const dataPar = {
                _mt: "empEmpnh.getPage",
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: "员工主数据查询",
                empnhName: t.empnhName,
                empnhIdno: t.empnhIdno,
                deptId: t.deptId,
                postId: t.postId,
                // state:t.stata,
                // empkiWorkno: t.empNo,
                // empCname: t.empCname,
                // pid: id || ""
            };
            for (const dat in dataPar) {
                if (dataPar[dat] === "") {
                    delete dataPar[dat];
                }
            }
            //主表请求
            getDataLevelUserLoginNew(dataPar)
                .then(res => {
                    console.log(res)
                    if (isSuccess(res, t)) {
                        t.data = [];
                        if (res.data.content[0].rows) {
                            for (let i = 0; i < res.data.content[0].rows.length; i++) {
                                t.data.push({
                                    id: res.data.content[0].rows[i].id,
                                    empnhName: res.data.content[0].rows[i].empnhName,
                                    deptId: res.data.content[0].rows[i].deptId,
                                    empnhNation: res.data.content[0].rows[i].empnhNationDis,
                                    empnhGender: res.data.content[0].rows[i].empnhGender,
                                    postId: res.data.content[0].rows[i].postId,
                                });
                            }
                            t.total = res.data.content[0].records;
                        }
                    }
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        //关闭
        closeUp () {
            const t = this;
            t.openUpdate = false;
            //        t.$refs.update.clear()
        },
        //获取树
        getTree () {
            const t = this;
            const data = {
                _mt: "orgUnits.getTree",
                rows: "100",
                page: 1,
                sort: "unitCode",
                order: "asc",
                logType: this.$t("button.ser"),
                id: "0"
            };
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            // 树请求
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.loading = false;
                        setTimeout(() => {
                            t.dataTree = t.toTree(res.data.content[0].value);
                        }, 500);
                    }
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        /* 树点击事件 */
        selectChange (e) {
            this.treeid = e.id;
            this.treeType = e.unitType;
            this.page = 1;
            this.getData(e.unitType + "$" + e.id, 1);
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach(item => {
                item.expand = false;
                item.checked = item.authRoleFunDis === "1";
                item.title = item.unitCode + " " + item.unitFname;
                delete item.children;
            });
            const map = {};
            data.forEach(item => {
                map[item.id] = item;
            });
            const val = [];
            data.forEach(item => {
                const parent = map[item.unitPid];
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    val.push(item);
                }
            });
            return val;
        },

        addNewArray (res) {
            const t = this;
            t.data.unshift(res);
            t.getTree();
            t.getData();
        },
        updateArray (res) {
            const t = this;
            t.data.splice(t.index, 1, res);
            t.getTree();
        },

        // 排序
        sortable (column) {
            this.sort = column.key;
            this.order = column.order;
            if (this.order !== "normal") {
                this.getData(this.treeType + "$" + this.treeid);
            }
        },
        // 条数变化
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData(this.treeType + "$" + this.treeid);
        },
        // 页码变化
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData(this.treeType + "$" + this.treeid);
        },
        //所选列
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
        // 删除
        deletemsg () {
            const t = this;
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.leastone")
                });
            } else {
                t.$Modal.confirm({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.confirmdelete"),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: "empMaster.delByIds",
                            funId: "1",
                            logType: "删除",
                            ids: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    t.tableselected = [];
                                    t.getTree();
                                    t.getData();
                                }
                            })
                            .catch(() => {
                                t.$Modal.error({
                                    title: this.$t("reminder.err"),
                                    content: this.$t("reminder.errormessage")
                                });
                            });
                    },
                    onCancel: () => { }
                });
            }
        },

        openUp (id, logType, index) {
            const t = this;

            t.openUpdate = true;
            t.logType = "查询";
            //      将本条数据的id传入mainid（如果有的话）
            this.pklv = id;
            //        this.$store.commit('empPo/setChildId1', id)
            //        this.$store.commit('empPo/setIndex', index)
            //        if (id) {
            //          t.$refs.update.getOptionData()
            //        }
        },


        //查询、页面刷新
        search () {
            this.treeid = "";
            this.page = 1;
            this.treeType = "";
            this.getData(" ", 1);
        },

        renderContent (h, { root, node, data }) {
            return h(
                "span",
                {
                    style: {
                        display: "inline-block",
                        width: "100%"
                    }
                },
                [
                    h(
                        "Button",
                        {
                            props: {
                                type: "text",
                                size: "small"
                            },
                            on: {
                                click: () => {
                                    this.selectChange(data);
                                }
                            }
                        },
                        [
                            h("Icon", {
                                props: {
                                    type:
                                        data.unitType === "01company"
                                            ? "social-buffer"
                                            : "ios-people",
                                    size: "15",
                                    color: data.unitType === "01company" ? "#3399ff" : "#ff9900"
                                },
                                style: {
                                    marginRight: "8px"
                                }
                            }),
                            h("span", data.title)
                        ]
                    )
                ]
            );
        },
        clearDept () {
            const t = this;
            t.deptName = ""
            t.deptId = ""
        },
        pickData () {
            const t = this
            t.$refs.searchTable.getData(t.params)
            t.openPick = true
        },
        inputPost (name, id, postName, postId) {
            const t = this
            t.deptId = id
            t.deptName = name
        },
        closeTable () {
            const t = this
            t.openPick = false
        },
        changeinput (name, id) {
            const t = this
            t.deptName = name
            t.deptId = id
        },
    }
};
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
    box-sizing: border-box;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
}
</style>
