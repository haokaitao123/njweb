<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <!-- 标题 -->
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;招聘报表管理
          </p>
          <!-- 操作按钮和查询输入框 -->
            <!-- 查询输入框   placeholder这是输入框默认显示值   v-model里写的输入框绑定的值-->
					<Row>
              <DatePicker
                type="date"
                placeholder="请选择面试日期"
                :editable="false"
                v-model="relibFilldate"
                style="width: 200px"
              ></DatePicker>
            <!-- 查询按钮 @click后绑定的是一个点击事件 -->
            <btnList
              @buttonExport="expData"
              @buttonImport="importExcel"
              @buttonAdd="openUp(NaN,$t('button.add'))"
              @buttonDel="deletemsg"
              @buttonSearch="search"
              :btnData="btnData"
              :FlowNode="FlowNode"
            ></btnList>
					</Row>
          <!-- table 列表 @on-select @on-select-cancel @on-select-all 后面跟的事件 selectedtable 做的是列表checkbox取消、选中、全选事件 -->
          <!-- @on-sort-change 后面跟的事件  sortable => 做的是列表排序 :current="page" page是当前页面页码 :height="tableheight" tableheight是当前列表高度 :columns="columns" 配置table列 :data="data" data 就是table列表数据-->
          <row class="table-form" ref="table-form">
            <Table
              @on-selection-change="selectedtable"
              @on-sort-change="sortable"
              :current="page"
              :height="tableheight"
              size="small"
              border
              ref="selection"
              :columns="columns"
              :data="data"
            ></Table>
          </row>
          <!-- :total="total" total=>总页数  @on-page-size-change="sizeChange" 切换每页条数时的回调，返回切换后的每页条数 @on-change="pageChange" 页码改变的回调，返回改变后的页码  :page-size-opts 每页条数切换的配置-->
          <Row style="display: flex">
            <Page
              :total="total"
              :showTotal="showTotal"
              size="small"
              :current="page"
              show-elevator
              show-sizer
              placement="top"
              @on-page-size-change="sizeChange"
              @on-change="pageChange"
              :page-size=rows
              :page-size-opts="[10, 20, 50, 100]"
            ></Page>
            <!-- 列表刷新按钮  -->
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
import { isSuccess } from "../../lib/util.js"; //调用请求判断成功的公共方法
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../axios/axios.js"; //调用请求接口封装的公共方法

import searchEmpMaster from "../../components/searchTable/searchEmpnhMaster"; //引入员工信息页面弹出框 之后在export default 里的components加入这个组件 页面才可以使用
//导入导出页面 无需变更
  import expwindow from '../../components/fileOperations/expSms'
  import expdow from '../../components/fileOperations/expdow'
  import importExcel from '../../components/importModel/importParam'
  import btnList from "../../components/btnAuth/btnAuth";
export default {
  //页面初始化的所有变量值
  data() {
    return {
      loading: "",
      tableOperate:false,
			// 导入的mt名称
        imp_mt: 'rmResume.importData',
        // 导出字段设置, code字段名 name列名
       expDataTital: [
        { code: "relibFilldate", name: "面试日期" },
        { code: "relibName", name: "姓名" },
        { code: "relibFruit", name: "面试结果" },
        { code: "relibApplypostDis", name: "应聘岗位" },
        { code: "relibHiredeptDis", name: "部门" },
        { code: "groupDis", name: "组别" },
        { code: "relibFirstusDis", name: "初试人" },
        { code: "relibEducatDis", name: "学历" },
        { code: "relibReexamusDis", name: "复试人" },
        { code: "reason", name: "复试备注" },
        { code: "relibMobile", name: "电话号码" },
			],
        // 导入导出默认参数 无需变更
        openImport: false,
        openExpDow: false,
        openExp: false,
        filekey: '',
				filename: '',

      empName: "",
      tableheight: document.body.offsetHeight - 280, //table高度
      logType: "", //操作类型
      openUpdate: false, //新增修改弹出框默认false 隐藏
      updateId: NaN, //修改id
      tableselected: [], //列表选中的id
      columns: [
        //表格列的配置描述
        {
          type: "selection", //列类型，选择selection类型 就是checkbox
          width: 54, //列宽
          align: "center" //对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐
        },
        {
          title: "面试日期",
          key: "relibFilldate",
          sortable: "custom",
          width: 220
        },
        {
          title: "姓名",
          key: "relibName",
          //对应列是否可以排序，如果设置为 custom，则代表排序，需要监听 Table 的 on-sort-change 事件
          width: 220
        },
        {
          title: "面试结果",
          key: "relibFruit",
          width: 220
        },
        {
          title: "应聘岗位",
          key: "relibApplypostDis",
          width: 220
        },
        {
          title: "部门",
          key: "relibHiredeptDis",
          width: 220
        },
        {
          title: "组别",
          key: "groupDis",
          width: 220
        },
        {
          title: "初试人",
          key: "relibFirstusDis",
          width: 220
        },
        {
          title: "学历",
          key: "relibEducatDis",
          width: 220
        },
        {
          title: "复试人",
          key: "relibReexamusDis",
          width: 220
        },
        {
          title: "复试备注",
          key: "reason",
          width: 220
        },
        {
          title: "电话号码",
          key: "relibMobile",
          width: 220
        },
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
      data: [], //table初始化数据
      total: 0, //table总页数
      showTotal: true,
      index: 0, //表格数据中的选中的index
      sort: "id", //排序字段
      order: "desc", //排序类型
      rows: 20, //每页显示条数
      page: 1, //当前页码
      funId: "1000", //功能ID
      roleType: "3user",//角色类型
      relibFilldate: "" //绑定页面日期选择框的面试日期
    };
  },
  //外部调用的组件注册到这里
  components: {
		expwindow,
    expdow,
    importExcel,
    btnList,
  },
  //所有加载完成后  生命周期 页面方法可以在这里调用
  mounted() {
    //this.getData();
  },
  computed: {
    pageShow() {
      return this.$store.state.btnOperate.pageShow;
    },
    tableButton() {
      return this.$store.state.btnOperate.tableButton;
    },
    // modity() { //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
    //             	       return this.$store.state.btnOperate.modity
    //         	},
    btnData() {
      return this.$store.state.btnOperate.btnData;
    },
    FlowNode() {
      return this.$store.state.btnOperate.isFlowNode;
    }
  },
  watch: {
    pageShow(val) {
      if (val === "" && this.tableOperate === true) {
        this.columns.pop();
        this.tableOperate = false;
      } else if (this.tableOperate === false) {
        this.columns.push(this.tableBtn);
        this.tableOperate = true;
      }
    }
  },
  created() {
    if (this.pageShow !== "") {
      this.columns.push(this.tableBtn);
      this.tableOperate = true;
    }
  },
  // 页面所有方法
  methods: {
    //获取当前列表数据
    getData(page) {
      const t = this;
      this.page = 1;
      if (page) {
        t.page = page;
      }
      t.loading = true; //请求之前重置状态
      //请求列表数据的参数
      const data = {
        _mt: "recruitProcess.getPage", //接口路径
        rows: t.rows, //每页显示条数
        page: t.page, //当前页
        sort: t.sort, //排序字段
        order: t.order, //排序类型
        logType: "查询", //日志描述
        relibFilldate: t.relibFilldate, //面试日期
        roleType:localStorage.roleType
			};
			if (data.relibFilldate !== undefined && data.relibFilldate !== '') {
       				  data.relibFilldate = new Date(data.relibFilldate).format('yyyy-MM-dd')
        } else {
               data.relibFilldate = ''
          }
      //删除请求列表数据的参数为空的参数
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      //请求数据接口
      getDataLevelUserLoginNew(data)
        .then(res => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows; //列表数据
            t.total = res.data.content[0].records; //列表总页数
            t.loading = false; //在成功之后改状态
          }
        })
        .catch(() => {
          t.loading = false; //在失败之后改状态
          //请求失败
          // t.$Modal.error({
          //   title: "错误",
          //   content: "网络错误"
          // });
          this.$Message.error(this.$t("reminder.errormessage"));
        })
        .finally(() => {
          this.loading = false;
          this.$store.commit('btnOperate/setSearchLoading',false)
        });
    },

    // 导入导出默认方法 无需更改
      closeImport() {
        const t = this
        t.openImport = false
      },
      // 导入导出默认方法 无需更改
      importExcel() {
        const t = this
        t.openImport = true
        t.$refs.importExcel.getDowModelFile()
      },
      // 导入导出默认方法
      expData() {
        const t = this
        // 填装查询条件
        const data = {
          relibFilldate: t.relibFilldate,
        }
        if (data.relibFilldate !== undefined && data.relibFilldate !== '') {
       				  data.relibFilldate = new Date(data.relibFilldate).format('yyyy-MM-dd')
        } else {
               data.relibFilldate = ''
          }
        // 设置导出mt参数
        this.$refs.expwindow.getData(this.expDataTital, 'recruitProcess.export', data)
        this.openExp = true
      },
      // 导入导出默认方法 无需更改
      closeExp() {
        const t = this
        t.openExp = false
      },
      // 导入导出默认方法 无需更改
      closeExpDowMain() {
        const t = this
        t.openExpDow = false
      },
      // 导入导出默认方法 无需更改
      setFileKey(filekey, filename, openExpDow) {
        const t = this
        t.filekey = filekey
        t.filename = filename
        t.openExpDow = openExpDow
        t.$refs.expdow.getPriToken(t.filekey)
      },
    //新增成功添加列表事件
    addNewArray(res) {
      const t = this;
      t.data.unshift(res);
    },
    //修改成功添加列表事件
    updateArray(res) {
      const t = this;
      t.data.splice(t.index, 1, res);
    },
    //排序事件
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
      } else {
        this.order = "desc";
      }
    },
    //修改每页条数事件
    sizeChange(size) {
      const t = this;
      t.rows = size;
      t.getData();
    },
    //修改当前页码事件
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getData( t.page);
    },
    //列表checkbox选中事件
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id);
      }
      this.tableselected = newArr;
    },
    //删除选中的当前列
    deletemsg() {
      const t = this;
      //如果没有选中
      if (t.tableselected.length === 0) {
        // t.$Modal.warning({
        //   title: "提示",
        //   content: "请至少选择一条数据"
        // });
        this.$Message.warning('请至少选择一条数据');
      } else {
        t.$Modal.confirm({
          title: "提示",
          content: "请确定删除数据",
          onOk: () => {
            //点击确定删除调取删除接口
            getDataLevelUserLogin({
              _mt: "rmResume.delByIds",
              funId: "1",
              logType: "删除",
              ids: t.tableselected.toString()
            })
              .then(res => {
                if (isSuccess(res, t)) {
                  t.tableselected = []; //清空选中项
                  t.getData(); //重新渲染列表
                  this.$Message.success(this.$t("reminder.deletesuccess"));
                }
              })
              .catch(() => {
                // t.$Modal.error({
                //   title: "错误",
                //   content: "网络错误"
                // });
                this.$Message.error(this.$t("reminder.errormessage"))
              });
          },
          //点击取消删除
          onCancel: () => {}
        });
      }
    },
    //打开新增修改弹窗
    openUp(id, logType, index) {
      const t = this;
      //  新增 修改 变量
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.index = index;
      t.openUpdate = true; //弹窗显示改为 true
      if (logType === "修改") {
        //如果操作类型是修改，弹窗回显数据
        t.$refs.update.getData(id); //调用子组件update里的getData方法 传了一个id值
      }
    },
     //查询
    search() {
      this.page = 1;
      this.getData();
      this.$store.commit('btnOperate/setSearchLoading', true);
      this.tableselected = [];
    },
  }
};
</script>

<style lang="scss" scoped>
// 页面样式
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
