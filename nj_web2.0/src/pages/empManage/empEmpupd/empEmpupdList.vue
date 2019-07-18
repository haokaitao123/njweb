<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;员工变更管理
                </p>
                <Row>
                    <Col span="5"
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
                    <Col span="18">
                    <Row>
                        <Input v-model="searchParams.empnhName"
                               placeholder="请输入员工姓名"
                               @on-enter="enterEvent"
                               style="width: 200px" />
                        <Input v-model="searchParams.empnhIdno"
                               placeholder="请输入身份证号码"
                               @on-enter="enterEvent"
                               style="width: 200px" />
                        <!-- 页面按钮 -->
                        <btnList @buttonExport="expData"
                                 @buttonAdd="openUp(NaN,$t('button.add'))"
                                 @buttonDel="deletemsg"
                                 @buttonSearch="search"
                                 @buttonImport="importExcel"
                                 @moditySelect="modityChange"
                                 @buttonSubmit="modifystatus('02draft','提交')"
                                 @buttonAdopt="modifystatus('03draft','通过')"
                                 @buttonInAdopt="modifystatus('04draft','不通过')"
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
    </div>
</template>
<script>
import { isSuccess } from "@/lib/util";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import commonPage from '@/components/commonPage/commonPage';    //公共页面组件
import update from "./empEmpupdEdit";                    //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js";          //按钮组件
export default {
    data () {
        return {
            loading: true,
            treeheight: document.body.offsetHeight - 200,
            dataTree: [],
            // 导入的mt名称
            imp_mt: "empEmpupd.importData",
            // 导出的mt名称
            exp_mt: "empEmpupd.export",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "empnhName", name: "员工姓名" },
                { code: "createTime", name: "提交时间" },
                { code: "unitFname", name: "部门名称" },
                { code: "postFname", name: "岗位名称" },
                { code: "empupdResaddr", name: "居住详细地址" },
                { code: "empnhSalbankDis", name: "开户银行" },
                { code: "empupdSalcount", name: "银行账号" },
                { code: "empupdSalcname", name: "户名" },
                { code: "empupdReason", name: "未通过原因" },
            ],
            // 表格列字段
            columns: [
            	{ type : "selection" , width: 54 , fixed : "left" , align : "center" },
                { key: "empnhName", title: "员工姓名", sortable: "custom" , width : 110 , fixed : "left" },
                { key: "createTime", title: "提交时间", width : 180},
                { key: "unitFname", title: "部门名称", sortable: "custom" , width : 180},
                { key: "postFname", title: "岗位名称", sortable: "custom" , width : 110},
                { key: "empupdResaddr", title: "居住详细地址", width : 280},
                { key: "empnhSalbankDis", title: "开户银行",width : 220},
                { key: "empupdSalcount", title: "银行账号", width : 220},
                { key: "empupdSalcname", title: "户名", width : 90},
                { key: "empupdReason", title: "未通过原因", width : 220},

            ],
            // 表格获取数据mt名称
            page_mt: "empEmpupd.getPage",
            // 删除数据mt名称
            dele_mt: "empEmpupd.delByIds",
            // 修改流程状态mt名称
            state_mt: "empEmpupd.setStateByIds",
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
                empnhIdno: "",
                deptId: "",
            },
            table_height:document.body.offsetHeight - 280,
            typeCode: "",
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
        this.getTree();
        this.search();
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
      //enter事件
      enterEvent(e){
        if(e.target.value != ''){
          this.search()
        }
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
            console.log(res, "res")
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
            this.getTree();
        },

        //获取树
        getTree () {
            const t = this;
            const data = {
                _mt: "orgUnits.getTree",
                rows: "100",
                page: "1",
                sort: "unitCode",
                order: "asc",
                logType: this.$t("button.ser"),
                id: "0",
                state: t.modity
            };
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        setTimeout(() => {
                            t.dataTree = t.toTree(res.data.content[0].value);
                        }, 500);
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                })
                .finally(() => {
                    t.loading = false;
                })
        },

        selectChange (e) {
            // debugger;
            this.treeid = e.id;
            // this.treeType = e.unitType;
            this.page = 1;

            this.searchParams.deptId = e.id;
            this.search();
        },

        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach(item => {
                item.expand = false;
                item.checked = item.authRoleFunDis === "1";
                item.title = item.unitFname;
                delete item.children;
            });
            const map = {};
            data.forEach(item => {
                map[item.id] = item;
            });
            const val = [];
            data.forEach(item => {
                const parent = map[item.unitPid];
                if (item.unitPid === "0") {
                    item.expand = true;
                }
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    val.push(item);
                }
            });
            return val;
        },

        // 渲染树状图
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
