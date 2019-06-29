<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;项目成本管理
          </p>
          <Row>
            <Col span="24">
              <Row>
                <span @dblclick="clearUnitFname">
                  <Input
                    v-model="unitFname"
                    style="width: 200px"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择项目名称"
                    @on-click="unitFnamePick"
                  />
                </span>
                <Input v-model="searchParams.costPer" placeholder="请输入期间" style="width: 200px"/>
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
                :mockData="mockData"
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
    <transition name="fade">
      <searchOrgframe
        v-show="openUnitFname"
        :searchCloumns="searchCloumns2"
        @closeUp="closeUnitFname"
        :params="params2"
        @changeinput="inputUnitFname"
        ref="searchOrgframe"
      ></searchOrgframe>
    </transition>
  </div>
</template>
<script>
import { isSuccess } from "@/lib/util";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import commonPage from "@/components/commonPage/commonPage"; //公共页面组件
import update from "./payCostEdit"; //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js"; //按钮组件
import searchOrgframe from "@/components/searchTable/searchOrgframe";

export default {
  data() {
    return {
      // 导入的mt名称
      imp_mt: "payCost.importData",
      // 导出的mt名称
      exp_mt: "payCost.export",
      // 导出字段设置, code字段名 name列名
      expDataTital: [
        {
          code: "costPer",
          name: "期间"
        },
        {
          code: "unitFname",
          name: "项目名称"
        },
        {
          code: "costTypeDis",
          name: "成本类型"
        },
        {
          code: "costPays",
          name: "职能部门工资"
        },
        {
          code: "costWater",
          name: "水电费"
        },
        {
          code: "costWorkstat",
          name: "工位费"
        },
        {
          code: "costBusiness",
          name: "业务费"
        },
        {
          code: "costAmounta",
          name: "费用A"
        },
        {
          code: "costAmountb",
          name: "费用B"
        },
        {
          code: "costAmountc",
          name: "费用C"
        },
        {
          code: "costAmountd",
          name: "费用D"
        },
        {
          code: "costAmounte",
          name: "费用E"
        },
        {
          code: "costAmountf",
          name: "费用F"
        }
      ],
      // 表格列字段
      columns: [
        {
          type: "selection",
          width: 54,
          fixed: "left",
          align: "center"
        },
        {
          key: "costPer",
          title: "期间",
          sortable: "custom",
          width: 220
        },
        {
          key: "unitFname",
          title: "项目名称",
          sortable: "custom",
          width: 220
        },
        {
          key: "costTypeDis",
          title: "成本类型",
          sortable: "custom",
          width: 220
        },
        {
          key: "costPays",
          title: "职能部门工资",
          sortable: "custom",
          width: 220
        },
        {
          key: "costWater",
          title: "水电费",
          sortable: "custom",
          width: 220
        },
        {
          key: "costWorkstat",
          title: "工位费",
          sortable: "custom",
          width: 220
        },
        {
          key: "costBusiness",
          title: "业务费",
          sortable: "custom",
          width: 220
        },
        {
          key: "costAmounta",
          title: "费用A",
          sortable: "custom",
          width: 220
        },
        {
          key: "costAmountb",
          title: "费用B",
          sortable: "custom",
          width: 220
        },
        {
          key: "costAmountc",
          title: "费用C",
          sortable: "custom",
          width: 220
        },
        {
          key: "costAmountd",
          title: "费用D",
          sortable: "custom",
          width: 220
        },
        {
          key: "costAmounte",
          title: "费用E",
          sortable: "custom",
          width: 220
        },
        {
          key: "costAmountf",
          title: "费用F",
          sortable: "custom",
          width: 220
        }
      ],
      params2: {
        _mt: "orgUnits.getByOrgFramePageList",
        sort: "id",
        order: "desc",
        rows: 20,
        page: 1,
        funId: "1",
        logType: "组织架构查询",
        data: "{}",
        state: "02valid",
        unitType: "02dept"
      },
      searchCloumns2: [
        {
          title: "组织编码",
          key: "unitCode",
          sortable: "custom"
        },
        {
          title: "组织名称",
          key: "unitFname"
        },
        {
          title: "组织类型",
          key: "unitTypeName"
        }
      ],
      // 表格获取数据mt名称
      page_mt: "payCost.getPage",
      // 删除数据mt名称
      dele_mt: "payCost.delByIds",
      // 修改流程状态mt名称
      state_mt: "payCost.setStateByIds",
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
        deptId: "",
        null: ""
      },
      typeCode: "",
      //弹出选择框
      openUnitFname: false,
      unitFname: "",
      costTypeDis: "",

      table_height: document.body.offsetHeight - 280,
      mockData: [
        {
          costPer: "2013-2019",
          unitFname: "项目1",
          costTypeDis: "成本",
          costPays: "3000",
          costWater: "130",
          costWorkstat: "120",
          costBusiness: "400",
          costAmounta: "30",
          costAmountb: "40",
          costAmountc: "50",
          costAmountd: "60",
          costAmounte: "70",
          costAmountf: "80"
        }
      ]
    };
  },
  components: {
    searchOrgframe,

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
    clearUnitFname() {
      this.unitFname = "";
      this.searchParams.deptId = "";
    },
    unitFnamePick() {
      this.$refs.searchOrgframe.getData(this.params2);
      this.openUnitFname = true;
    },
    closeUnitFname() {
      this.openUnitFname = false;
    },
    inputUnitFname(name, id, type) {
      this.searchParams.deptId = id;
      this.unitFname = name;
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