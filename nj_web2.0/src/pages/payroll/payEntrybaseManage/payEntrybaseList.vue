<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;入职基础信息
          </p>
          <Row>
            <Col span="24">
              <Row>
                <span @dblclick="clearEnbaDeptDis">
                  <Input
                    v-model="enbaDeptDis"
                    style="width: 200px"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择内招项目名称"
                    @on-click="enbaDeptDisPick"
                  />
                </span>
                <Input v-model="searchParams.enbaName" placeholder="请输入姓名" style="width: 200px"/>
                <!-- 页面按钮 -->
                <btnList
                  @buttonExport="expData"
                  @buttonAdd="openUp('', '新增')"
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
import update from "./payEntrybaseEdit"; //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js"; //按钮组件

export default {
  data() {
    return {
      // 导入的mt名称
      imp_mt: "payEntrybase.importData",
      // 导出的mt名称
      exp_mt: "payEntrybase.export",
      // 导出字段设置, code字段名 name列名
      expDataTital: [
        { code: "empnhName", name: "招聘专员" },
        { code: "enbaPersonDis", name: "项目主管" },
        { code: "enbaManagerDis", name: "项目经理" },
        { code: "unitFname", name: "项目名称" },
        { code: "enbaDeptDis", name: "内招项目名称" },
        { code: "enbaNatureDis", name: "入职性质" },
        { code: "enbaEtdate", name: "入职日期" },
        { code: "enbaLevdate", name: "离职日期" },
        { code: "enbaPerfor", name: "业绩收入" },
        { code: "enbaCusm", name: "入职客户名称" },
        { code: "enbaDrawback", name: "划回时间" },
        { code: "enbaDrwaout", name: "划出时间" },
        { code: "postFname", name: "岗位名称" },
        { code: "enbaIdentityDis", name: "身份" },
        { code: "enbaFilldate", name: "面试日期" },
        { code: "enbaName", name: "姓名" },
        { code: "enbaIdno", name: "证件号码" },
        { code: "enbaMobile", name: "手机号" },
        { code: "enbaGenderDis", name: "性别" },
        { code: "enbaBirtday", name: "出生日期" },
        { code: "enbaBirtplace", name: "籍贯" },
        { code: "enbaNatalityDis", name: "民族" },
        { code: "enbaPoliticalDis", name: "政治面貌" },
        { code: "enbaPoliticalDis", name: "健康状况" },
        { code: "enbaPoliticalDis", name: "婚育状况" },
        { code: "enbaHeight", name: "身高(cm)" },
        { code: "enbaWeight", name: "体重(kg)" },
        { code: "enbaEducatDis", name: "学历" },
        { code: "enbaSchool", name: "毕业院校" },
        { code: "enbaProfes", name: "专业" },
        { code: "enbaLiving", name: "现居住地" },
        { code: "enbaFamadds", name: "家庭地址" },
        { code: "enbaEmernm", name: "紧急联系人姓名" },
        { code: "enbaEmphone", name: "紧急联系人电话" },
        { code: "enbaWithmeDis", name: "与本人关系" },
        { code: "enbaSalary", name: "期望薪资" },
        { code: "enbaProstatusDis", name: "职业状态" },
        { code: "enbaAvaitime", name: "可到岗时间" },
        { code: "enbaIsrelativesDis", name: "是否有亲朋在本公司任职" },
        { code: "enbaRelatname", name: "本公司任职亲朋姓名" },
        { code: "enbaRelatdept", name: "本公司任职亲朋所在部门" },
        { code: "enbaIscriminalDis", name: "是否有犯罪记录" },
        { code: "enbaIstattooDis", name: "是否有纹身" },
        { code: "enbaApplytype", name: "通过何种方式应聘" },
        { code: "enbaIntrname", name: "介绍人姓名" },
        { code: "enbaIscomDis", name: "是否服从调配" },
        { code: "enbaSelfeval", name: "自我评价" },
        { code: "enbaEnrorage", name: "招生范围" },
        { code: "enba_isgraduDis", name: "是否毕业" },
        { code: "enbaFinalapptm", name: "最后应聘时间" }
      ],
      // 表格列字段
      columns: [
        { type: "selection", width: 54, fixed: "left", align: "center" },
        { key: "empnhName", title: "招聘专员", sortable: "custom", width: 220 },
        {
          key: "enbaPersonDis",
          title: "项目主管",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaManagerDis",
          title: "项目经理",
          sortable: "custom",
          width: 220
        },
        { key: "unitFname", title: "项目名称", sortable: "custom", width: 220 },
        {
          key: "enbaDeptDis",
          title: "内招项目名称",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaNatureDis",
          title: "入职性质",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaEtdate",
          title: "入职日期",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaLevdate",
          title: "离职日期",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaPerfor",
          title: "业绩收入",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaCusm",
          title: "入职客户名称",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaDrawback",
          title: "划回时间",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaDrwaout",
          title: "划出时间",
          sortable: "custom",
          width: 220
        },
        { key: "postFname", title: "岗位名称", sortable: "custom", width: 220 },
        {
          key: "enbaIdentityDis",
          title: "身份",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaFilldate",
          title: "面试日期",
          sortable: "custom",
          width: 220
        },
        { key: "enbaName", title: "姓名", sortable: "custom", width: 220 },
        { key: "enbaIdno", title: "证件号码", sortable: "custom", width: 220 },
        { key: "enbaMobile", title: "手机号", sortable: "custom", width: 220 },
        { key: "enbaGenderDis", title: "性别", sortable: "custom", width: 220 },
        {
          key: "enbaBirtday",
          title: "出生日期",
          sortable: "custom",
          width: 220
        },
        { key: "enbaBirtplace", title: "籍贯", sortable: "custom", width: 220 },
        {
          key: "enbaNatalityDis",
          title: "民族",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaPoliticalDis",
          title: "政治面貌",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaPoliticalDis",
          title: "健康状况",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaPoliticalDis",
          title: "婚育状况",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaHeight",
          title: "身高(cm)",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaWeight",
          title: "体重(kg)",
          sortable: "custom",
          width: 220
        },
        { key: "enbaEducatDis", title: "学历", sortable: "custom", width: 220 },
        {
          key: "enbaSchool",
          title: "毕业院校",
          sortable: "custom",
          width: 220
        },
        { key: "enbaProfes", title: "专业", sortable: "custom", width: 220 },
        {
          key: "enbaLiving",
          title: "现居住地",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaFamadds",
          title: "家庭地址",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaEmernm",
          title: "紧急联系人姓名",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaEmphone",
          title: "紧急联系人电话",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaWithmeDis",
          title: "与本人关系",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaSalary",
          title: "期望薪资",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaProstatusDis",
          title: "职业状态",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaAvaitime",
          title: "可到岗时间",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaIsrelativesDis",
          title: "是否有亲朋在本公司任职",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaRelatname",
          title: "本公司任职亲朋姓名",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaRelatdept",
          title: "本公司任职亲朋所在部门",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaIscriminalDis",
          title: "是否有犯罪记录",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaIstattooDis",
          title: "是否有纹身",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaApplytype",
          title: "通过何种方式应聘",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaIntrname",
          title: "介绍人姓名",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaIscomDis",
          title: "是否服从调配",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaSelfeval",
          title: "自我评价",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaEnrorage",
          title: "招生范围",
          sortable: "custom",
          width: 220
        },
        {
          key: "enba_isgraduDis",
          title: "是否毕业",
          sortable: "custom",
          width: 220
        },
        {
          key: "enbaFinalapptm",
          title: "最后应聘时间",
          sortable: "custom",
          width: 220
        }
      ],
      // 表格获取数据mt名称
      page_mt: "payEntrybase.getPage",
      // 删除数据mt名称
      dele_mt: "payEntrybase.delByIds",
      // 修改流程状态mt名称
      state_mt: "payEntrybase.setStateByIds",
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
        enbaDeptDis: "",
        enbaEtdate: "",
        enbaName: ""
      },
      typeCode: "",
      //弹出选择框
      openEmpnhName: false,
      empnhName: "",
      enbaPersonDis: "",
      enbaManagerDis: "",
      unitFname: "",
      openEnbaDeptDis: false,
      enbaDeptDis: "",
      enbaNatureDis: "",
      openPostFname: false,
      postFname: "",
      enbaIdentityDis: "",
      enbaGenderDis: "",
      enbaNatalityDis: "",
      enbaPoliticalDis: "",
      enbaPoliticalDis: "",
      enbaPoliticalDis: "",
      enbaEducatDis: "",
      enbaWithmeDis: "",
      enbaProstatusDis: "",
      enbaIsrelativesDis: "",
      enbaIscriminalDis: "",
      enbaIstattooDis: "",
      enbaIscomDis: "",
      enba_isgraduDis: "",

      table_height: document.body.offsetHeight - 280
    };
  },
  components: {
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
      //主子表的主表
      t.$store.commit("payEntrybase/setMainId", id);
      t.$store.commit("payEntrybase/setLogType", logType);
      if (logType != "新增") {
        t.$refs.update.getOption(id, logType);
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
      this.searchParams.enbaStaff = "";
    },
    empnhNamePick() {
      this.$refs.empnhNameSearch.getData();
      this.openEmpnhName = true;
    },
    closeEmpnhName() {
      this.openEmpnhName = false;
    },
    inputEmpnhName(row) {
      this.searchParams.enbaStaff = row.enbaStaff;
      this.empnhName = row.empnhName;
    },
    clearEnbaDeptDis() {
      this.enbaDeptDis = "";
      this.searchParams.enbaDept = "";
    },
    enbaDeptDisPick() {
      this.$refs.enbaDeptDisSearch.getData();
      this.openEnbaDeptDis = true;
    },
    closeEnbaDeptDis() {
      this.openEnbaDeptDis = false;
    },
    inputEnbaDeptDis(row) {
      this.searchParams.enbaDept = row.enbaDept;
      this.enbaDeptDis = row.enbaDeptDis;
    },
    clearPostFname() {
      this.postFname = "";
      this.searchParams.enbaPost = "";
    },
    postFnamePick() {
      this.$refs.postFnameSearch.getData();
      this.openPostFname = true;
    },
    closePostFname() {
      this.openPostFname = false;
    },
    inputPostFname(row) {
      this.searchParams.enbaPost = row.enbaPost;
      this.postFname = row.postFname;
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