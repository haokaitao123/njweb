<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;项目提拔提成
          </p>
          <Row>
            <Col span="24">
              <Row>
                <span @dblclick="clearPromUserName">
                  <Input
                    v-model="promUserName"
                    style="width: 200px"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择被提拔人"
                    @on-click="promUserNamePick"
                  />
                </span>
                <Input v-model="searchParams.promStart" placeholder="请输入开始月份" style="width: 200px"/>
                <Input v-model="searchParams.promEnd" placeholder="请输入结束月份" style="width: 200px"/>
                <!-- 页面按钮 -->
                <btnList
                  @buttonExport="expData"
                  @buttonAdd="openUp"
                  @buttonDel="deletemsg"
                  @buttonSearch="search"
                  @buttonImport="importExcel"
                  @moditySelect="modityChange"
                  :btnData="btnData"
                  :FlowNode="FlowNode"
                ></btnList>
              </Row>
              <!-- 表格 分页 -->
              <commonPage
                :imp_mt="imp_mt"
                :page_mt="page_mt"
                :exp_mt="exp_mt"
                :dele_mt="dele_mt"
                :state_mt="state_mt"
                :expDataTital="expDataTital"
                :table_height="table_height"
                @tableBtn="tableBtn"
                ref="commonPage"
              ></commonPage>
            </Col>
          </Row>
        </card>
      </Col>
    </Row>
    <!-- 新增修改弹窗页面  v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
    <transition name="fade">
      <update
        v-show="openUpdate"
        :id="updateId"
        :logType="logType"
        :index="index"
        @closeUp="closeUp"
        @newData="addNewArray"
        @update="updateArray"
        ref="update"
      ></update>
    </transition>
    <!--搜索 弹出选择框  -->
  </div>
</template>
<script>
import { isSuccess } from "@/lib/util";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import commonPage from "@/components/commonPage/commonPage"; //公共页面组件
import update from "./PayPromotedEdit"; //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js"; //按钮组件
import searchEmpMaster from "@/components/searchTable/searchEmpMaster";

export default {
  data() {
    return {
      // 导入的mt名称
      imp_mt: "payPromoted.importData",
      // 导出的mt名称
      exp_mt: "payPromoted.export",
      // 导出字段设置, code字段名 name列名
      expDataTital: [
        { code: "empnhName", name: "提拔人" },
        { code: "empnhIdno", name: "身份证号码" },
        { code: "unitFname", name: "部门名称" },
        { code: "postFname", name: "岗位名称" },
        { code: "promUserName", name: "被提拔人" },
        { code: "promUserIdno", name: "身份证号码" },
        { code: "promDeptFname", name: "提拔部门" },
        { code: "promPostFname", name: "提拔岗位" },
        { code: "promStart", name: "开始月份" },
        { code: "promEnd", name: "结束月份" },
        { code: "promProp", name: "提成比例" }
      ],
      // 表格列字段
      columns: [
        { type: "selection", width: 54, fixed: "left", align: "center" },
        { key: "empnhName", title: "提拔人", sortable: "custom", width: 220 },
        {
          key: "empnhIdno",
          title: "身份证号码",
          sortable: "custom",
          width: 220
        },
        { key: "unitFname", title: "部门名称", sortable: "custom", width: 220 },
        { key: "postFname", title: "岗位名称", sortable: "custom", width: 220 },
        {
          key: "promUserName",
          title: "被提拔人",
          sortable: "custom",
          width: 220
        },
        {
          key: "promUserIdno",
          title: "身份证号码",
          sortable: "custom",
          width: 220
        },
        {
          key: "promDeptFname",
          title: "提拔部门",
          sortable: "custom",
          width: 220
        },
        {
          key: "promPostFname",
          title: "提拔岗位",
          sortable: "custom",
          width: 220
        },
        { key: "promStart", title: "开始月份", sortable: "custom", width: 220 },
        { key: "promEnd", title: "结束月份", sortable: "custom", width: 220 },
        { key: "promProp", title: "提成比例", sortable: "custom", width: 220 }
      ],
      // 表格获取数据mt名称
      page_mt: "payPromoted.getPage",
      // 删除数据mt名称
      dele_mt: "payPromoted.delByIds",
      // 修改流程状态mt名称
      state_mt: "payPromoted.setStateByIds",
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
        promUser: "",
        null: "",
        null: ""
      },
      typeCode: "",
      //弹出选择框
      openEmpnhName: false,
      empnhName: "",
      empnhIdno: "",
      openPromUserName: false,
      promUserName: "",
      promUserIdno: "",
      postFname: "",
      unitFname: "",
      openPromPostFname: false,
      promPostFname: "",
      openPromDeptFname: false,
      promDeptFname: "",

      table_height: document.body.offsetHeight - 280
    };
  },
  components: {
    searchEmpMaster,

    commonPage, //页面公共组件
    btnList, //按钮组件
    update //新增修改组件
  },
  computed: {
    //按钮数据
    btnData() {
      return this.$store.state.btnOperate.btnData;
    },
    //判断是不是流程节点
    FlowNode() {
      return this.$store.state.btnOperate.isFlowNode;
    }
  },
  beforeCreate() {
    //清空搜索数据
    this.$store.commit("commonPage/setParams", "");
  },
  mounted() {
    //列表字段存储
    this.getColumns();
  },
  methods: {
    //获取列表项字段
    getColumns() {
      this.$store.commit("commonPage/setColumns", this.columns);
    },
    //删除
    deletemsg() {
      this.$refs.commonPage.deletemsg();
    },
    //页面查询
    search() {
      this.$store.commit("commonPage/setParams", this.searchParams);
      this.$refs.commonPage.search();
    },
    //打开新增或修改弹窗
    openUp(id, logType, index) {
      const t = this;
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.openUpdate = true;
      t.index = index;
      t.$refs.update.disabled = false;
      if (logType === "修改" || logType === "查看") {
        t.$refs.update.getData(id);
      }
      if (logType === "查看") {
        t.$refs.update.disabled = true;
      }
    },
    //点击表格查看或修改事件
    tableBtn(res) {
      let id = res.id;
      let logType = res.name;
      let index = res.index;
      this.openUp(id, logType, index);
    },
    //关闭新增修改弹窗
    closeUp() {
      this.openUpdate = false;
    },
    //新增后表格数据添加
    addNewArray(res) {
      this.$refs.commonPage.data.unshift(res);
    },
    //修改后表格数据更新
    updateArray(res) {
      this.$refs.commonPage.data.splice(this.index, 1, res);
    },
    //导出
    expData() {
      this.$refs.commonPage.expData();
    },
    //导入
    importExcel() {
      this.$refs.commonPage.importExcel();
    },
    //状态操作按钮
    modifystatus(type, name) {
      this.$refs.commonPage.modifystatus(type, name);
    },
    //修改流程状态
    modityChange() {
      this.$refs.commonPage.modityChange();
    },
    //获取下拉列表数据
    getSelectValue() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        logType: "查询下拉数据",
        typeCode: t.typeCode
      })
        .then(res => {
          if (isSuccess(res, t)) {
          }
        })
        .catch(() => {
          this.$Message.error(this.$t("reminder.errormessage"));
        });
    },
    clearEmpnhName() {
      this.empnhName = "";
      this.searchParams.empId = "";
    },
    empnhNamePick() {
      this.$refs.empnhNameSearch.getData();
      this.openEmpnhName = true;
    },
    closeEmpnhName() {
      this.openEmpnhName = false;
    },
    inputEmpnhName(row) {
      this.searchParams.empId = row.empId;
      this.empnhName = row.empnhName;
    },
    clearPromUserName() {
      this.promUserName = "";
      this.searchParams.promUser = "";
    },
    promUserNamePick() {
      this.$refs.promUserNameSearch.getData();
      this.openPromUserName = true;
    },
    closePromUserName() {
      this.openPromUserName = false;
    },
    inputPromUserName(row) {
      this.searchParams.promUser = row.promUser;
      this.promUserName = row.promUserName;
    },
    clearPromPostFname() {
      this.promPostFname = "";
      this.searchParams.promPost = "";
    },
    promPostFnamePick() {
      this.$refs.promPostFnameSearch.getData();
      this.openPromPostFname = true;
    },
    closePromPostFname() {
      this.openPromPostFname = false;
    },
    inputPromPostFname(row) {
      this.searchParams.promPost = row.promPost;
      this.promPostFname = row.promPostFname;
    },
    clearPromDeptFname() {
      this.promDeptFname = "";
      this.searchParams.promDept = "";
    },
    promDeptFnamePick() {
      this.$refs.promDeptFnameSearch.getData();
      this.openPromDeptFname = true;
    },
    closePromDeptFname() {
      this.openPromDeptFname = false;
    },
    inputPromDeptFname(row) {
      this.searchParams.promDept = row.promDept;
      this.promDeptFname = row.promDeptFname;
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