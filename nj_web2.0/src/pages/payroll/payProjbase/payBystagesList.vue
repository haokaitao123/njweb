<template>
    <div class="table"
         :class="childTable?'content-main':''">
        <Row>
            <Row>
                <Col span="24">
                <Row>

                    <!-- 页面按钮 -->
                    <!-- <Button type="primary"
                            icon="search"
                            @click="search()">查询</Button> -->
                    <Button type="primary"
                            icon="primary"
                            @click="openUp('', '新增')">新增</Button>
                    <Button type="primary"
                            icon="primary"
                            @click="expData">导出</Button>
                    <!-- <Button type="primary"
                            icon="primary"
                            @click="importExcel">导入</Button> -->
                    <Button type="error"
                            icon="primary"
                            @click="deletemsg">删除</Button>

                </Row>
                <!-- 表格 分页 -->
                <commonPage :imp_mt="imp_mt"
                            :page_mt="page_mt"
                            :exp_mt="exp_mt"
                            :dele_mt="dele_mt"
                            :state_mt="state_mt"
                            :expDataTital="expDataTital"
                            :table_height="table_height"
                            :childTable="childTable"
                            :mockData="mockData"
                            @tableBtn="tableBtn"
                            ref="commonPage">
                </commonPage>
                </Col>
            </Row>
            </Col>
        </Row>
        <!-- 新增修改弹窗页面  v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
        <transition name="fade">
            <update v-show="openUpdate"
                    :index="index"
                    @closeUp="closeUp"
                    @newData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!--搜索 弹出选择框  -->

    </div>
</template>
<script>
import { isSuccess } from "@/lib/util";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import commonPage from '@/components/commonPage/commonPage';    //公共页面组件
import update from "./payBystagesEdit";                    //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js";          //按钮组件

export default {
    data () {
        return {
            // 导入的mt名称
            imp_mt: "payBystages.importData",
            // 导出的mt名称
            exp_mt: "payBystages.export",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "bystPid", name: "项目业绩" },
                { code: "bystStageDis", name: "阶段期数" },
                { code: "bystIntervalDis", name: "阶段间隔" },
                { code: "bystDay", name: "阶段天数" },
                { code: "bystAmount", name: "阶段金额" },
            ],
            // 表格列字段
            columns: [
                { type: "selection", width: 54, fixed: "left", align: "center" },
                { key: "bystPid", title: "项目业绩", sortable: "custom", width: 220 },
                { key: "bystStageDis", title: "阶段期数", sortable: "custom", width: 220 },
                { key: "bystIntervalDis", title: "阶段间隔", sortable: "custom", width: 220 },
                { key: "bystDay", title: "阶段天数", sortable: "custom", width: 220 },
                { key: "bystAmount", title: "阶段金额", sortable: "custom", width: 220 },
                {
                    title: "操作",
                    key: "action",
                    fixed: "right",
                    align: "center",
                    width: 64,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    style: {
                                        display: this.logType == '修改' ? "inline-block" : "none",
                                    },
                                    on: {
                                        click: () => {
                                            this.openUp(
                                                params.row.id,
                                                '修改',
                                                params.index
                                            );
                                        }
                                    }
                                },
                                '修改'
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        display: this.logType == '查看' ? "inline-block" : "none",
                                    },
                                    on: {
                                        click: () => {
                                            this.openUp(
                                                params.row.id,
                                                '查看',
                                                params.index
                                            );

                                        }
                                    }
                                },
                                '查看'
                            )
                        ]);
                    }
                },
            ],
            mockData: [
                {
                    bystPid: '2000',
                    bystStageDis: "1",
                    bystIntervalDis: "1",
                    bystDay: '3',
                    bystAmount: "3000",
                }
            ],
            // 表格获取数据mt名称
            page_mt: "payBystages.getPage",
            // 删除数据mt名称
            dele_mt: "payBystages.delByIds",
            // 修改流程状态mt名称
            state_mt: "payBystages.setStateByIds",
            //表格 id
            updateId: NaN,
            //对应列表index
            index: 0,
            //显示隐藏新增修改弹窗的变量
            openUpdate: false,
            //搜索参数
            searchParams: {

            },
            //是否为子表
            childTable: true,
            typeCode: "",
            //弹出选择框
            bystStageDis: "",
            bystIntervalDis: "",

            table_height: document.body.offsetHeight - 513,
        };
    },
    components: {

        commonPage, //页面公共组件
        btnList,    //按钮组件
        update     //新增修改组件
    },
    computed: {
        //按钮数据
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        //判断是不是流程节点
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        },
        //主键id
        mainId () {
            return this.$store.state.payProjbase.mainId;
        },
        logType () {
            return this.$store.state.payProjbase.logType;
        }
    },
    beforeCreate () {
        //清空搜索数据
        this.$store.commit('commonPage/setChildParams', "");
    },
    mounted () {
        //列表字段存储
        this.getColumns();
    },
    methods: {
        //获取列表项字段
        getColumns () {
            this.$store.commit('commonPage/setChildColumns', this.columns);
        },
        //删除
        deletemsg () {
            this.$refs.commonPage.deletemsg()
        },
        //页面查询
        search () {
            this.searchParams.bystPid = this.mainId;
            this.$store.commit('commonPage/setChildParams', this.searchParams);
            // this.$refs.commonPage.search();
        },
        //清除
        clear () {
            this.searchParams = {};
            this.$refs.commonPage.page = 1;
            this.$refs.commonPage.rows = 20;
            this.$store.commit('commonPage/setChildParams', this.searchParams);
        },
        //打开新增或修改弹窗
        openUp (id, logType, index) {
            const t = this;
            // t.updateId = parseInt(id, 10);
            t.openUpdate = true;
            t.index = index;
            //主子表的子表
            t.$store.commit('payProjbase/setChildLogType', logType);
            t.$refs.update.getData(id, logType);
            if (t.logType === '查看') {
                t.$refs.update.disabled = true
            } else {
                t.$refs.update.disabled = false
            }
        },
        //点击表格查看或修改事件
        tableBtn (res) {
            let id = res.id;
            let logType = res.name;
            let index = res.index;
            this.openUp(id, logType, index);
        },
        //关闭新增修改弹窗
        closeUp () {
            this.openUpdate = false;
        },
        //新增后表格数据添加
        addNewArray (res) {
            this.$refs.commonPage.data.unshift(res);
        },
        //修改后表格数据更新
        updateArray (res) {
            this.$refs.commonPage.data.splice(this.index, 1, res);
        },
        //导出
        expData () {
            this.$refs.commonPage.expData()
        },
        //导入
        importExcel () {
            this.$refs.commonPage.importExcel()
        },
        //状态操作按钮
        modifystatus (type, name) {
            this.$refs.commonPage.modifystatus(type, name)
        },
        //修改流程状态
        modityChange () {
            this.$refs.commonPage.modityChange()
        },
        //获取下拉列表数据
        getSelectValue () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                logType: '查询下拉数据',
                typeCode: t.typeCode
            }).then(res => {
                if (isSuccess(res, t)) {

                }
            }).catch(() => {
                this.$Message.error(this.$t("reminder.errormessage"));
            });
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
.btn_row {
    .ivu-btn-primary {
        margin: 2px 0;
    }
}
</style>