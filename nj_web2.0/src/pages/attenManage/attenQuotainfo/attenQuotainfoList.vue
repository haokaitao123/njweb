<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
            	<p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;配额信息
                </p>
                <Row>
                    <Col span="24">
                    <Row>
                    	    <Input v-model="searchParams.empnhName"
                                placeholder="请输入员工姓名"
                            style="width: 200px"/>    <Input v-model="searchParams.quoYear"
                                placeholder="请输入年份"
                            style="width: 200px"/>
                        <!-- 页面按钮 -->
                            <btnList @buttonExport="expData"
                            @buttonAdd="openUp('','新增')"
                            @buttonDel="deletemsg"
                            @buttonSearch="search"
                            @buttonImport="importExcel"
                            @moditySelect="modityChange"
                            :btnData="btnData"
                            :FlowNode="FlowNode">
                            </btnList>

                    </Row>
                    <!-- 表格 分页 -->
                    <commonPage :imp_mt="imp_mt"
                                :page_mt="page_mt"
                                :exp_mt="exp_mt"
                                :dele_mt="dele_mt"
                                :state_mt="state_mt"
                                :expDataTital="expDataTital"
                                :table_height="table_height"
                                @tableBtn="tableBtn"
                                ref="commonPage">
                    </commonPage>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <!-- 新增修改弹窗页面  v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @newData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!--搜索 弹出选择框  -->
        <transition name="fade">
        	
        </transition>
    </div>
</template>
<script>
import { isSuccess } from "@/lib/util";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import commonPage from '@/components/commonPage/commonPage';    //公共页面组件
import update from "./attenBase";                    //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js";          //按钮组件

export default {
    data () {
        return {
            // 导入的mt名称
            imp_mt: "attenQuotainfo.importData",
            // 导出的mt名称
            exp_mt: "attenQuotainfo.export",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "empnhName", name: "员工姓名" },
                { code: "empnhIdno", name: "身份证号码" },
                { code: "unitFname", name: "部门名称" },
                { code: "postFname", name: "岗位名称" },
                { code: "quoLeady", name: "年假天数" },
                { code: "quoLearesdy", name: "年假剩余天数" },
                { code: "quoShdy", name: "调班天数" },
                { code: "quoShrestdy", name: "调班剩余天数" },
                { code: "quoYear", name: "年份" },
            ],
            // 表格列字段
            columns: [
                { type : "selection" , width: 54 , fixed : "left" , align : "center" },
                { key: "empnhName", title: "员工姓名", sortable: "custom" ,fixed: "left", width : 120},
                { key: "empnhIdno", title: "身份证号码", sortable: "custom" , width : 220},
                { key: "quoYear", title: "年份", sortable: "custom" , width : 220},
                { key: "unitFname", title: "部门名称", sortable: "custom" , width : 220},
                { key: "postFname", title: "岗位名称", sortable: "custom" , width : 220},
                { key: "quoLeady", title: "年假天数", sortable: "custom" , width : 220},
                { key: "quoLearesdy", title: "年假剩余天数", sortable: "custom" , width : 220},
                //{ key: "quoShdy", title: "调班天数", sortable: "custom" , width : 220},
                { key: "quoShrestdy", title: "调班剩余天数", sortable: "custom" , width : 220},
            ],
            // 表格获取数据mt名称
            page_mt: "attenQuotainfo.getPage",
            // 删除数据mt名称
            dele_mt: "attenQuotainfo.delByIds",
            // 修改流程状态mt名称
            state_mt: "attenQuotainfo.setStateByIds",
            //表格 id
            updateId: NaN,
            //操作类型
            logType: "",
            //对应列表index
            index: 0,
            //显示隐藏新增修改弹窗的变量
            openUpdate: false,
            //搜索参数
            searchParams: {
            	empnhName: "",
                quoYear: "",
            },
            typeCode: "",
            table_height:document.body.offsetHeight - 280,
            //弹出选择框
            
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
    },
    beforeCreate () {
        //清空搜索数据
        this.$store.commit('commonPage/setParams', "")
    },
    mounted () {
        //列表字段存储
        this.getColumns();
    },
    methods: {
        //获取列表项字段
        getColumns () {
            this.$store.commit('commonPage/setColumns', this.columns)
        },
        //删除
        deletemsg () {
            this.$refs.commonPage.deletemsg()
        },
        //页面查询
        search () {
            this.$store.commit('commonPage/setParams', this.searchParams)
            this.$refs.commonPage.search();
        },
        //打开新增或修改弹窗
        openUp (id, logType, index) {
            const t = this;
            t.updateId = parseInt(id, 10);
            t.logType = logType;
            t.openUpdate = true;
            t.index = index;
            //主子表的主表
            t.$store.commit('attenQuotainfo/setMainId', id);
            t.$store.commit('attenQuotainfo/setLogType', logType);
            console.log(logType,"logType")
            if (logType != '新增') {
                t.$refs.update.getOption(id, logType);
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
            })
                .catch(() => {
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
</style>