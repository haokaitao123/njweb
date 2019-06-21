<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;绩效考核管理
          </p>
          <Row>
            <Col span="24">
              <Row>
                  <Input v-model="searchParams.empnhName"
    placeholder="请输入员工姓名"
style="width: 200px"/>
                          <DatePicker type="date"
                                      v-model="searchParams.asesDate"
                                      placeholder="请输入扣款日期"
                                      style="width: 200px"></DatePicker>

                <!-- 页面按钮 -->
                <btnList
                  @buttonExport="expData"
                  @buttonAdd="openUp('','新增')"
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
    <transition name="fade"></transition>
  </div>
</template>
<script>
import { isSuccess } from "@/lib/util";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import commonPage from "@/components/commonPage/commonPage"; //公共页面组件
import update from "./addNewPerfAssess"; //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js"; //按钮组件

export default {
  data() {
    return {
      // 导入的mt名称
      imp_mt: "perfAssess.importData",
      // 导出的mt名称
      exp_mt: "perfAssess.export",
      // 导出字段设置, code字段名 name列名
      expDataTital: [
        { code: "empnhName", name: "扣款人姓名" },
        { code: "empnhIdno", name: "身份证号码" },
        { code: "unitFname", name: "扣款部门" },
        { code: "postFname", name: "扣款岗位" },
        { code: "asesPerfaDis", name: "扣款指标" },
        { code: "asesPerfbDis", name: "扣款类型" },
        { code: "asesPerfcDis", name: "扣款项" },
        { code: "asesAmount", name: "扣款金额" },
        { code: "asesDate", name: "扣款日期" },
        { code: "asesUserDis", name: "收款人" },
        { code: "asesIspayDis", name: "是否工资扣除" },
        { code: "asesPamount", name: "1.5R扣款金额" }
      ],
      // 表格列字段
      columns: [
        { type: "selection", width: 54, fixed: "left", align: "center" },
        {
          key: "empnhName",
          title: "扣款人姓名",
          sortable: "custom",
          width: 220
        },

        { key: "unitFname", title: "扣款部门", sortable: "custom", width: 220 },
        { key: "postFname", title: "扣款岗位", sortable: "custom", width: 220 },
        { key: "asesPerfaDis", title: "扣款指标", sortable: "custom", width: 220 },
        { key: "asesPerfbDis", title: "扣款类型", sortable: "custom", width: 220 },
        { key: "asesPerfcDis", title: "扣款项", sortable: "custom", width: 220 },
        {
          key: "asesAmount",
          title: "扣款金额",
          sortable: "custom",
          width: 220
        },
        { key: "asesDate", title: "扣款日期", sortable: "custom", width: 220 },
        { key: "asesUserDis", title: "收款人", sortable: "custom", width: 220 }
        //{ key: "asesIspay", title: "是否工资扣除", sortable: "custom" , width : 220},
        //{ key: "asesPamount", title: "1.5R扣款金额", sortable: "custom" , width : 220},
      ],
      // 表格获取数据mt名称
      page_mt: "perfAssess.getPage",
      // 删除数据mt名称
      dele_mt: "perfAssess.delByIds",
      // 修改流程状态mt名称
      state_mt: "perfAssess.setStateByIds",
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
        asesDate: ""
      },
      table_height:document.body.offsetHeight - 280,
      typeCode: ""
      //弹出选择框
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

        this.searchParams.asesDate = this.searchParams.asesDate!="" ? new Date(this.searchParams.asesDate).format("yyyy-MM-dd") : "";
        console.log("asfd",this.searchParams)
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