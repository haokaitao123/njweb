<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;{{pageName}}
                </p>
                <Row>
                    <Col span="24">
                    <Row>
                        <!-- 页面按钮 -->
                        <btnList @buttonExport="expData"
                                 @buttonAdd="openUp"
                                 @buttonDel="deletemsg"
                                 @buttonSearch="search"
                                 @buttonValid="modifystatus('02valid','生效')"
                                 @buttonDraft="modifystatus('01draft','编辑')"
                                 @buttonImport="importExcel"
                                 @moditySelect="modityChange"
                                 @buttonInvalid="modifystatus('03invalid','失效')"
                                 :btnData="btnData"
                                 :FlowNode="FlowNode"></btnList>
                    </Row>
                    <!-- 表格 分页 -->
                    <commonPage :imp_mt="imp_mt"
                                :page_mt="page_mt"
                                :dele_mt="dele_mt"
                                :state_mt="state_mt"
                                :expDataTital="expDataTital"
                                ref="commonPage"> </commonPage>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
    </div>
</template>
<script>
import commonPage from './commonPage';
import btnList from "../../../components/btnAuth/btnAuth.js";
export default {
    data () {
        return {
            // 导入的mt名称
            imp_mt: "orgUnits.importData",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "unitCode", name: "组织编码" },
                { code: "unitFname", name: "组织架构全称" },
                { code: "unitTypeName", name: "组织类型" },
                { code: "unitPname", name: "上级部门" },
                { code: "unitPartfunctName", name: "部门职能" },
                { code: "unitIndustryName", name: "行业" },
                { code: "unitCenterName", name: "成本中心" },
                { code: "unitCityName", name: "雇佣地点" },
                { code: "unitValdate", name: "生效日期" },
                { code: "unitInvdate", name: "失效日期" },
                { code: "unitInvres", name: "失效原因" },
                { code: "partEstablish", name: "部门编制" },
                { code: "unitManger", name: "经理编制" },
                { code: "unitDirec", name: "主管编制" },
                { code: "unitStaff", name: "员工编制" },
                { code: "unitSysaligName", name: "系统转正" },
                { code: "note", name: "备注" }
            ],
            // 导出参数
            expDataParams: {},
            // 表格列字段
            columns: [
                {
                    type: "selection",
                    width: 54,
                    fixed: "left",
                    align: "center"
                },
                {
                    title: "组织编码",
                    key: "unitCode",
                    width: 140,
                    fixed: "left",
                    sortable: "custom"
                },
                {
                    title: "组织架构名称",
                    width: 180,
                    key: "unitFname"
                },
                {
                    title: "组织类型",
                    width: 140,
                    key: "unitTypeName",
                    sortable: "custom"
                },
                {
                    title: "上级部门",
                    width: 180,
                    key: "unitPname",
                    sortable: "custom"
                },
                {
                    title: "部门职能",
                    key: "unitPartfunctName",
                    width: 140
                },
                {
                    title: "行业",
                    key: "unitIndustryName",
                    width: 140
                },
                {
                    title: "成本中心",
                    key: "unitCenterName",
                    width: 140
                },
                {
                    title: "雇佣地点",
                    key: "unitCityName",
                    width: 140
                },
                {
                    title: "生效日期",
                    key: "unitValdate",
                    sortable: "custom",
                    width: 140
                },
                {
                    title: "失效日期",
                    key: "unitInvdate",
                    sortable: "custom",
                    width: 140
                },
                {
                    title: "部门编制",
                    key: "partEstablish",
                    width: 140
                },
                {
                    title: "经理编制",
                    key: "unitManger",
                    width: 140
                },
                {
                    title: "主管编制",
                    key: "unitDirec",
                    width: 140
                },
                {
                    title: "员工编制",
                    key: "unitStaff",
                    width: 140
                },
                {
                    title: "系统转正",
                    key: "unitSysalig",
                    width: 140,
                    render: (h, params) => {
                        return h("div", params.row.unitSysalig == 1 ? "是" : "否");
                    }
                }
            ],
            // 表格获取数据mt名称
            page_mt: "orgUnits.getByOrgFramePageList",
            // 删除数据mt名称
            dele_mt: "orgUnits.delByIds",
            // 修改流程状态mt名称
            state_mt: "orgUnits.setStateById",
            // 页面名称
            pageName: '组织信息管理'
        };
    },
    components: {
        commonPage,
        btnList
    },
    computed: {
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        },
    },
    mounted () {
        this.getColumns()
    },
    methods: {
        getColumns () {
            this.$store.commit('commonPage/setColumns', this.columns)
        },
        deletemsg () {
            this.$refs.commonPage.deletemsg()
        },
        search () {
            this.$refs.commonPage.search()
        },
        openUp () {
            this.$refs.commonPage.openUp(NaN, '新增')
        },
        expData () {
            this.$refs.commonPage.expData()
        },
        modifystatus (type, name) {
            this.$refs.commonPage.modifystatus(type, name)
        },
        modityChange () {
            this.$refs.commonPage.modityChange()
        },
        importExcel () {
            this.$refs.commonPage.importExcel()
        }
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
