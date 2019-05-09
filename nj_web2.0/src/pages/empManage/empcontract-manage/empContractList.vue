<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;合同信息管理
          </p>
          <Row>
            <Input placeholder="请输入员工姓名" style="width: 200px" v-model="empnhName"/>
            <span @dblclick="cleardeptId()">
              <Input
                v-model="unitFname"
                style="width: 200px"
                icon="search"
                :readonly="true"
                placeholder="请选择部门"
                @on-click="pickDeptData"
              />
            </span>
            <btnList
              @buttonExport="expData"
              @buttonImport="importExcel"
              @buttonAdd="openUp(NaN,$t('button.add'))"
              @buttonDel="deletemsg"
              @buttonValid="modifystatus('02valid')"
              @buttonDraft="modifystatus('01draft')"
              @buttonInvalid="modifystatus('03invalid')"
              @moditySelect="modityChange"
              @buttonSearch="search"
              :btnData="btnData"
              :FlowNode="FlowNode"
            ></btnList>
          </Row>
          <row class="table-form" ref="table-form">
            <Table
              @on-selection-change="selectedtable"
              @on-sort-change="sortable"
              :height="tableheight"
              size="small"
              border
              ref="selection"
              :columns="columns"
              :data="data"
              :loading="loading"
            ></Table>
          </row>
          <Row style="display: flex">
            <Page
              :total="total"
              size="small"
              show-elevator
              show-sizer
              placement="top"
              :current="page"
              @on-page-size-change="sizeChange"
              @on-change="pageChange"
              :page-size-opts="[10, 20, 50, 100]"
            ></Page>
            <Button
              type="ghost"
              size="small"
              shape="circle"
              icon="refresh"
              style="margin-left: 20px;display: inline-block;"
              @click="search()"
            ></Button>
          </Row>
        </card>
      </Col>
    </Row>
    <transition name="fade">
      <update
        v-show="openUpdate"
        :id="updateId"
        :logType="logType"
        :index="index"
        @closeUp="closeUp"
        @getData="addNewArray"
        @update="updateArray"
        ref="update"
      ></update>
    </transition>
    <!--部门-->
    <transition name="fade">
      <searchTable
        v-show="openDeptPick"
        :searchDeptClo="searchDeptCloumns"
        :params="Params"
        @closeDept="closeDept"
        @inputDept="inputPost"
        @changeinput="changeDeptInput"
        ref="searchTable"
      ></searchTable>
    </transition>
    <!--导入导出子页面 若没有导入导出可以去掉-->
    <transition>
      <expwindow
        v-show="openExp"
        :id="tableselected"
        @setFileKey="setFileKey"
        :logType="logType"
        :index="index"
        @closeExp="closeExp"
        ref="expwindow"
      ></expwindow>
    </transition>
    <transition>
      <expdow
        v-show="openExpDow"
        :filekey="filekey"
        :filename="filename"
        @closeExpDowMain="closeExpDowMain"
        ref="expdow"
      ></expdow>
    </transition>
    <transition name="fade">
      <importExcel
        v-show="openImport"
        :impid="updateId"
        :imp_mt="imp_mt"
        @getData="getData"
        @closeImport="closeImport"
        ref="importExcel"
      ></importExcel>
    </transition>
  </div>
</template>
<script>
import update from "./empContractEdit";
import { isSuccess } from "../../../lib/util";
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "../../../axios/axios";
import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
import importExcel from "../../../components/importModel/importParam";
import btnList from "../../../components/btnAuth/btnAuth";
import searchTable from "../../../components/searchTable/searchDept";
export default {
    data () {
        return {
            tableOperate: false, //加上这个变量
            // 导入的mt名称
            imp_mt: "empContractinfo.importData",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "numberCode", name: "合同编号" },
                { code: "empnhName", name: "员工姓名" },
                { code: "empnhIdno", name: "员工身份证号" },
                { code: "unitFname", name: "部门名称" },
                { code: "postFname", name: "岗位名称" },
                { code: "empTypeDis", name: "员工类别" },
                { code: "contTypeDis", name: "合同类别" },
                { code: "contPeriodDis", name: "合同期限" },
                { code: "contSdate", name: "合同开始日" },
                { code: "contEdate", name: "合同到期日" },
                { code: "contWorktimeDis", name: "合同工作时间" },
                { code: "contSigndate", name: "签订时间" },
                { code: "contProbatDis", name: "试用期限" },
                { code: "contProbatdt", name: "试用期到期日" },
                { code: "contValiddate", name: "生效日期" },
                { code: "contInvdate", name: "失效日期" },
                { code: "note", name: "备注" }
            ],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            tableheight: document.body.offsetHeight - 280,
            logType: "",
            openUpdate: false,
            updateId: NaN,
            loading: false,
            tableselected: [],
            columns: [
                {
                    type: "selection",
                    width: 54,
                    align: "center"
                },
                {
                    title: "合同编号",
                    key: "numberCode",
                    width: 120,

                    sortable: "custom"
                },
                {
                    title: "员工姓名",
                    key: "empnhName",
                    width: 100
                },
                {
                    title: "员工身份证号",
                    key: "empnhIdno",
                    width: 160
                },
                {
                    title: "部门名称",
                    key: "unitFname",
                    width: 160,
                    sortable: "custom"
                },
                {
                    title: "岗位名称",
                    key: "postFname",
                    width: 160,
                    sortable: "custom"
                },
                {
                    title: "员工类别",
                    key: "empTypeDis",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "合同类别",
                    key: "contTypeDis",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "合同期限",
                    key: "contPeriodDis",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "合同开始日",
                    key: "contSdate",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "合同到期日",
                    key: "contEdate",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "合同工作时间",
                    key: "contWorktimeDis",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "签署日期",
                    key: "contSigndate",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "合同到期日",
                    key: "contEdate",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "试用期限",
                    key: "contProbatDis",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "试用期到期日",
                    key: "contProbatdt",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "生效日期",
                    key: "contValiddate",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "失效日期",
                    key: "contInvdate",
                    sortable: "custom",
                    width: 120
                }
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
            data: [],
            total: 0,
            index: 0,
            sort: "id",
            order: "asc",
            rows: 10,
            page: 1,
            funId: "1000",
            empnhName: "",
            empnhIdno:"",
            deptId: "",
            unitFname: "",
            openDeptPick: false,
            //部门
            searchDeptCloumns: [
                {
                    title: "部门编码",
                    key: "unitCode",
                    sortable: "custom"
                },
                {
                    title: "部门名称",
                    key: "unitFname"
                }
            ],
            Params: {
                _mt: "orgUnits.getByOrgFramePageList",
                rows: 10,
                page: 1,
                sort: "id",
                order: "desc",
                logType: "部门",
                //unitType: "02dept",
                state: "02valid"
            },
           
            state: this.modity,
            loading: ""
        };
    },
    computed: {
        pageShow () {
            return this.$store.state.btnOperate.pageShow;
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton;
        },
        modity () {
            //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
            return this.$store.state.btnOperate.modity;
        },
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        }
    },
    components: {
        btnList,
        update,
        expwindow,
        expdow,
        importExcel,
        searchTable
    },
    //按钮权限控制
    pickData () {
        const t = this;
        t.$refs.searchOrgframe.getData(this.params);
        t.openPick = true;
    },
    created () {
        if (this.pageShow !== "") {
            this.columns.push(this.tableBtn);
            this.tableOperate = true
        }
    },
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
        this.search();
        //this.getSelect();
    },
    methods: {
        //状态
     modityChange (res) {
         this.tableselected = [];
         this.getData();
    },
    getData (page) {
            const t = this;
            this.loading = true;
            if (page == undefined) {
                this.page = 1;
            }

            const data = {
                _mt: "empContractinfo.getPage",
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: "合同查询",
                deptId: t.deptId,
                empnhName: t.empnhName,
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
                        t.data = res.data.content[0].rows;
                        t.total = res.data.content[0].records;
                    }
                })
                .catch(() => {
                    //   t.$Modal.error({
                    //     title: this.$t("reminder.err"),
                    //     content: this.$t("reminder.errormessage")
                    //   });
                    this.$Message.error(this.$t("reminder.errormessage"));
                })
                .finally(() => {
                    this.loading = false;
                    this.$store.commit('btnOperate/setSearchLoading',false)
                });
    },
        //自动计算时间
        // contSdateChange(){
        //    if(this.form.contEdate!=='' && this.form.contPeriod!=='') {

        //        this.form.contSdate = this.form.contEdate+this.form.contPeriod
        //    }else{

    //    }
    // },
    /**
     * 排序
     * @param column
     */
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
      } else {
        this.order = "desc";
      }
    },
    sizeChange(size) {
      const t = this;
      t.rows = size;
      t.getData();
    },
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getData(t.page);
    },
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id);
      }
      this.tableselected = newArr;
    },
    deletemsg() {
      const t = this;
      if (t.tableselected.length === 0) {
        this.$Message.warning('请至少选择一条数据');
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.confirmdelete"),
          onOk: () => {
            getDataLevelUserLogin({
              _mt: "empContractinfo.delByIds",
              funId: "1",
              logType: this.$t("button.del"),
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  // t.getTree()
                  t.getData();
                  this.$Message.success(this.$t("reminder.deletesuccess"));
                }
              })
              .catch(() => {
                this.$Message.error(this.$t("reminder.errormessage"));
              });
          },
          onCancel: () => {}
        });
      }
    },
    /**
     * 打开编辑页面
     * @param id
     * @param logType
     * @param index
     */
    openUp(id, logType, index) {
      const t = this;
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.openUpdate = true;
      t.index = index;
      t.$refs.update.disabled = false;
      t.$refs.update.getSelect("emptype");
      t.$refs.update.getSelect("contrpertype");
      t.$refs.update.getSelect("contperiod");
      t.$refs.update.getSelect("worktimetype");
      t.$refs.update.getSelect("probperiod");
      if (logType === this.$t("button.upd") || logType === "查看") {
        t.$refs.update.getData(id);
      }
      if (logType === "查看") {
        t.$refs.update.disabled = true;
      }
       if (logType === this.$t("button.upd")){
           t.$refs.update.aa = true;
       }
    },
    closeUp() {
      const t = this;
      
      t.openUpdate = false;
     

    },
    search() {
      this.tableselected = [];
      this.page = 1;
      this.$store.commit('btnOperate/setSearchLoading',true)
      this.getData();
    },
    modifystatus(state) {
      const t = this;
      let logType = "";
      let tipContent = "";
      if (state === "02valid") {
        logType = "生效";
        tipContent = "您确定继续操作吗？";
      } else if (state === "03invalid") {
        logType = "失效";
        tipContent = "您确定继续操作吗？";
      }
      if (t.tableselected.length === 0) {
        // t.$Modal.warning({
        //   title: this.$t("reminder.remind"),
        //   content: this.$t("reminder.leastone")
        // });
        this.$Message.warning('请至少选择一条数据');
        return;
      }
      t.$Modal.confirm({
        title: this.$t("reminder.remind"),
        content: tipContent,
        onOk: () => {
          getDataLevelUserLogin({
            _mt: "empContractinfo.setStateByIds",
            logType: logType,
            state: state,
            ids: t.tableselected.toString()
          })
        .then(res => {
              if (isSuccess(res, t)) {
                t.getData();
                t.tableselected = [];
                this.$Message.success(this.$t("reminder.operatsuccess"));
              }
            })
            .catch(() => {
                t.tableselected = [];
              this.$Message.error(this.$t("reminder.errormessage"));
            });
        }
    });
    }, //修改状态
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
                deptId: t.deptId,
                empnhName: t.empnhName,
                state: t.modity
            };
            // 设置导出mt参数
            this.$refs.expwindow.getData(
                this.expDataTital,
                "empContractinfo.export",
                data
            );
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
        // 子页面新增数据后添加到本页面分页第一行  无需更改
        addNewArray (res) {
            const t = this;
            t.data.unshift(res);
            //this.getData();
        },
        // 子页面修改数据后 本页面修改对应行数的数据 无需更改
        updateArray (res) {
            const t = this;
            t.data.splice(t.index, 1, res);
        },

        //部门
        cleardeptId () {
            const t = this;
            t.unitFname = "";
            t.deptId = "";
        },
        pickDeptData () {
            const t = this;
            //const paramsDept = deepCopy(t.deptParams);
            t.$refs.searchTable.getData(t.Params);
            t.openDeptPick = true;
        },
        closeDept () {
            const t = this;
            t.$refs.searchTable.unitCode = "";
            t.openDeptPick = false;
        },
        inputPost (name, id, unitFname, form) {
            const t = this;
            t.deptId = id;
            t.unitFname = name;
        },
        changeDeptInput (name, id) {
            const t = this;
            t.unitFname = name;
            t.deptId = id;
        },
        getPageByType (paramCode) {
            this.state = paramCode;
            //this.unitTypeId = paramCode;
            this.getData();
        } //根据类型获取列表
    },
      
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
</style>
