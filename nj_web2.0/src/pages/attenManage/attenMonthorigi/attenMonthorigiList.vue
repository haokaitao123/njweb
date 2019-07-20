<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
            	<p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;月原始考勤管理
                </p>
                <Row>
                    <Col span="24">
                    <Row>
                    	<Input v-model="searchParams.empnhName"
                            placeholder="请输入员工姓名"
                             @on-enter="enterEvent"
                            style="width: 200px"/>

                        <DatePicker
                        type="month"
                        placeholder="请选择考勤期间"
                        :editable="false"
                        v-model="searchParams.atmorPeriod"
                        style="width: 200px"
                    ></DatePicker>
                        <!-- 页面按钮 -->
                            <btnList @buttonExport="expData"
                            @buttonAdd="openUp(NaN,$t('button.add'))"
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
import update from "./addNewAttenMonthorigi";                    //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js";          //按钮组件

export default {
    data () {
        return {
            // 导入的mt名称
            imp_mt: "attenMonthorigi.importData",
            // 导出的mt名称
            exp_mt: "attenMonthorigi.export",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                    { code: "atmorPeriod", name: "考勤期间" },
                    { code: "atmorSdate", name: "开始日期" },
                    { code: "atmorEdate", name: "结束日期" },
                    { code: "empnhName", name: "员工姓名" },
                    { code: "empnhIdno", name: "身份证号码" },
                    { code: "unitFname", name: "部门名称" },
                    { code: "postFname", name: "岗位名称" },
                    { code: "atmorAttdays", name: "出勤天数" },
                    { code: "atmorOffdays", name: "休息天数" },
                    { code: "atmorLatenums", name: "迟到次数" },
                    { code: "atmorEarlynums", name: "早退次数" },
                    { code: "atmorMissnums", name: "缺卡次数" },
                    { code: "atmorComnums", name: "旷工次数" },
                    { code: "atmorFieldnums", name: "外勤次数" },
                    { code: "atmorOverdays", name: "加班天数" },
                ],
            // 表格列字段
            columns: [
            	{ type : "selection" , width: 54 , fixed : "left" , align : "center" },
                { key: "empnhName", title: "员工姓名", fixed: "left", sortable: "custom" , width : 120},
                { key: "empnhIdno", title: "身份证号码", sortable: "custom" , width : 220},
                { key: "unitFname", title: "部门名称", sortable: "custom" , width : 220},
                { key: "postFname", title: "岗位名称", sortable: "custom" , width : 220},
                { key: "atmorPeriod", title: "考勤期间", sortable: "custom" , width : 220},
                { key: "atmorSdate", title: "开始日期", sortable: "custom" , width : 220},
                { key: "atmorEdate", title: "结束日期", sortable: "custom" , width : 220},
                { key: "atmorAttdays", title: "出勤天数", sortable: "custom" , width : 220},
                { key: "atmorOffdays", title: "休息天数", sortable: "custom" , width : 220},
                { key: "atmorLatenums", title: "迟到次数", sortable: "custom" , width : 220},
                { key: "atmorEarlynums", title: "早退次数", sortable: "custom" , width : 220},
                { key: "atmorMissnums", title: "缺卡次数", sortable: "custom" , width : 220},
                { key: "atmorComnums", title: "旷工次数", sortable: "custom" , width : 220},
                { key: "atmorFieldnums", title: "外勤次数", sortable: "custom" , width : 220},
                { key: "atmorOverdays", title: "加班天数", sortable: "custom" , width : 220},
            ],
            // 表格获取数据mt名称
            page_mt: "attenMonthorigi.getPage",
            // 删除数据mt名称
            dele_mt: "attenMonthorigi.delByIds",
            // 修改流程状态mt名称
            state_mt: "attenMonthorigi.setStateByIds",
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
                atmorPeriod: "",
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
      //enter事件
      enterEvent(e){
          this.search()
      },
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
            if (this.searchParams.atmorPeriod !== '') {
       			this.searchParams.atmorPeriod = new Date(this.searchParams.atmorPeriod).format('yyyy-MM')
            }
            this.$store.commit('commonPage/setParams', this.searchParams)
            this.$refs.commonPage.search();
        },
        //打开新增或修改弹窗
        openUp (id, logType, index) {
            const t = this;
            t.updateId = parseInt(id, 10);
            console.log(logType,"ssss")
            t.logType = logType;
            t.openUpdate = true;
            t.index = index;
            t.$refs.update.disabled = false;

            if (logType === '修改' || logType === "查看") {
                t.$refs.update.getData(id);
            }
            if (logType === "查看") {
                t.$refs.update.disabled = true;
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
