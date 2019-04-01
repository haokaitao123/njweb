<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="mouse"></Icon>&nbsp;公司公告
          </p>


          <Row>
          <template>
            <div class="table">
              <Input placeholder="请输入主题" style="width: 200px" v-model="noticeTitle"/>

              <span @dblclick="clearPeople('1')">
               <Input v-model="noticePeopleDis" style="width: 200px" icon="search" :readonly="true"  placeholder="请选择发布人"  @on-click="pickData()"/>
              </span>
              <!-- 页面中调用公共按钮组件标签<btnList> -->
              <!-- 调用公共按钮组件方法 -->
              <!-- @buttonAdd（配置的按钮对应方法名称） = "btnEvent"（是你当前页面对应点击事件） -->
              <btnList  @buttonSearch="getData(1)" @buttonAdd="openUp(NaN,'新增')" @buttonDel="deletemsg" @buttonSubmit="modifystatu('101')" @buttonValid="modifystatu('102')" @buttonInvalid="modifystatu('103')" @moditySelect="changemodity"></btnList>

            </div>
          </template>

          </Row>
          <row class="table-form" ref="table-form">
            <Table
              @on-select="selectedtable"
              @on-select-cancel="selectedtable"
              @on-sort-change="sortable"
              @on-select-all="selectedtable"
              size="small"
              border
              ref="selection"
              :columns="columns"
              :data="comInfo"
              :height="tableheight"
            ></Table>
          </row>
          <Row style="display: flex">
            <Page
              :current="page"
              :total="total"
              size="small"
              show-elevator
              show-sizer
              placement="top"
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
              @click="getData(1)"
            ></Button>
          </Row>
        </card>
      </Col>
    </Row>
    <transition name="fade">
      <!-- 新增页面 -->
      <addInform
        v-show="showAdd"
        ref="addInform"
        @closeUp="closeUp"
        :selectType="noticeType"
        @getData="addNewArray"
        :id="updateId"
        :logType="logType"
        :index="index"
        @update="updateArray"
      ></addInform>
    </transition>
    <transition name="fade">
      <searchPeople v-show="openPick" @closeUp="closePeople" @changeinput="changeinput" ref="searchPeople"></searchPeople>
    </transition>
  </div>
</template>

<script>
import addInform from "./addInform";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin,
  getDataLevelUserLogin2
} from "../../../axios/axios";
import { isSuccess } from "../../../lib/util";
import searchPeople from '../../../components/searchTable/searchPeople'
import btnList from '../../../components/btnAuth/btnAuth'

export default {
  created () {
    if (this.pageShow != "") {
      this.columns.push(this.tableBtn);
      this.$store.commit('btnOperate/setTableOperate', 'true');
    }
  },
  computed:{
    pageShow () {
      return this.$store.state.btnOperate.pageShow
    },
    tableButton () {
      return this.$store.state.btnOperate.tableButton
    },
    tableOperate () {
      return this.$store.state.btnOperate.tableOperate
    }
  },


  data() {
    return {
      tableheight: document.body.offsetHeight - 280,
      optModel: "", //  通知类型
      noticeType: [],
      infoTitle: "", // 选择类型
      showAdd: false, //  控制新增页面显示
      openPick: false,
      state: "101",
      statusDis: this.$t("lang_user.rootuser.valid"),
      dropdownMenuList: [],
      comInfo: [],
      total: NaN, // 总页数
      companyId: 1,
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      noticeTitle: "",
      noticePeople: "",
      noticePeopleDis: "",
      select: this.$t("lang_user.rootuser.valid"),
      columns: [
        {
          type: "selection",
          width: 54
        },
        {
          title: "标题",
          key: "noticeTitle",
          sortable: 'custom'
        },
        // {
        //   title: "发布内容",
        //   key: "noticeContent",

        // },
        {
          title: "发布部门",
          key: "unitPidDis",
          sortable: 'custom'

        },
        {
          title: "发布人",
          key: "noticePeopleDis",
          sortable: 'custom'
        },
        {
          title: "发布日期",
          key: "noticePublish",
          sortable: 'custom'
        }
      ],
      tableBtn: {
        title: '操作',
        key: 'action',
        width: 100,
        fixed: 'right',
        align: 'center',
        render: (h, params) => {
        let child = [];
            for (let v of this.tableButton) {
              child.push(h('Button', {
                props: {
                  type: v.type,
                  size: 'small',
                },
                style: {
                  marginRight: '5px',
                  display: this.pageShow.indexOf(v.btnName) != -1 ? 'inline' : 'none',
                },
                on: {
                  click: () => {
                  this.openUp(params.row.id, v.name, params.index);
            },
          },
          }, v.name))
        };
        return h('div', [
          child,
        ])
      },
      },
      selectedArr: [], //  存放选中的值
      updateArr: [],
      updateId: NaN,
      logType: "",
      index: 0,
      chData: "",
      eakeEffect: 0,
      eakeinvalid: 1
    };
  },
  components: {
    addInform,
    searchPeople,
    btnList
  },
  mounted() {
    this.getSelect();
    this.getData(1);
  },
  methods: {
    btnEvent (res) {
      console.log(res, "res12345")
    },
    // 获取参数类型
    getSelect() {
      const t = this;
      getDataLevelUserLogin2({
        _mt: "baseParmInfo.getSelectValue",
        logType: t.logType,
        typeCode:"orgNoticeStatus,noticetype",
      })
        .then(res => {
          console.log(res)
          if (isSuccess(res, t)) {
            t.noticeType = res.data.content[0].value[1].paramList;
            t.dropdownMenuList = res.data.content[0].value[0].paramList;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    //获取列表数据
    getData(page) {
      const t = this;
      if (page) {
        t.page = page;
      }
      if (this.order === "normal") {
        this.order = "desc";
      }
      const data = {
        _mt: "orgNotice.getPage",
        state: t.state,
        noticePeople: t.noticePeople,
        noticeTitle: t.noticeTitle,
        rows: t.rows,
        page: t.page,
        sort: t.sort,
        order: t.order,
        logType: "公司公告",
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      //列表请求
      getDataLevelUserLoginNew(data)
        .then(res => {
          if (isSuccess(res, t)) {
            t.comInfo = res.data.content[0].rows;
            t.total = res.data.content[0].records;
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    //条数改变
    sizeChange(size) {
      const t = this;
      t.rows = size;
      t.getData();
    },
    //页码改变
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getData();
    },
    // 已选中数据
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id);
      }
      this.selectedArr = newArr.toString();
      this.updateArr = selection;
    }, // 已选中数据----------------------------------
    // 新增数据
    openUp(id, logType, index) {
      const t = this;
      t.select = "编辑";
      t.showAdd = true;
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.index = index;
      if (
        logType === this.$t("修改") ||
        logType === this.$t("查看")
      ) {
        t.$refs.addInform.upData(id);
      }else{
        t.$refs.addInform.getSelectUser();
      }
    }, // 新增数据--------------------------------
    //  删除数据 需要接口
    deletemsg() {
      const t = this;
      if (t.updateArr.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone")
        });
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.confirmdelete"),
          onOk: () => {
            const data = {
              _mt: "orgNotice.delByIds",
              logType: "删除",
              ids: t.selectedArr
            };
            for (const dat in data) {
              if (data[dat] === "") {
                delete data[dat];
              }
            }
            //删除请求
            getDataLevelUserLogin(data)
              .then(res => {
                if (isSuccess(res, t)) {
                  t.getData(1);
                }
              })
              .catch(() => {
                t.$Modal.error({
                  title: this.$t("reminder.err"),
                  content: this.$t("reminder.errormessage")
                });
              });
          }
        });
      }
    },
    //排序
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData(1);
      }
    },
    // penUpdate() {},
    //关闭新增页面  子
    closeUp() {
      const t = this;
      t.showAdd = false;
    },
    //添加数据 子
    addNewArray(res) {
      const t = this;
      if (t.comInfo.length === 0) {
        t.comInfo.push(res);
      } else {
        t.comInfo.unshift(res);
      }
    },
    // flowchart() {},
    // close() {},
    // openUpdate() {},


    // 更新数据 子
    updateArray(res) {
      const t = this;
      t.comInfo.splice(t.index, 1, res);
    },
    // 弹出选择关闭方法 无需变更
    close() {
      const t = this
      t.openPick = false
    },


    // 弹出选择双击赋值方法
    changeinput(row) {
      const t = this
//        赋值到显示字段与实际值字段
      t.noticePeople = row.id
      t.noticePeopleDis = row.name
    },
//      打开弹出选择页面
    pickData() {
      const t = this
      t.$refs.searchPeople.getData()
      t.openPick = true
    },
//      双击清除弹出选择值
    clearPeople() {
      const t = this
      t.noticePeopleDis = ''
      t.noticePeople = ''
    },
    closePeople() {
      const t = this
      t.openPick = false
      //t.$refs.searchFyperiod.fypdYear = ''
    },
    changemodity(res){
      console.log(res,"res");
      const t = this;
      t.state =res.funStatecode;
      t.getData(1);
    },
    /**
     * 状态的更改
     * @param paramCode
     * @param paramInfoName
     */
    getPageByState(paramCode, paramInfoCn) {
      const t = this;
      if (paramCode === "00all") {
        t.state = "";
      } else {
        t.state = paramCode;
      }
      t.getData(1);
      t.statusDis = paramInfoCn;
    },
    //各种按钮
    modifystatu(state) {
      const t = this;
      let logType = "";
      if (state === "103") {
        logType = "生效";
      } else {
        logType = "失效";
      }
      if (t.updateArr.length === 0) {
        t.$Modal.error({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone")
        });
        return;
      }
      // 按钮请求
      t.$Modal.confirm({
        title: '提示',
        content: '您确定要继续操作吗',
        onOk: () => {
        getDataLevelUserLogin({
                                _mt: "orgNotice.setStateByIds",
                                logType: logType,
                                state: t.state,
        ids: t.selectedArr
        })
        .then(res => {
            if (isSuccess(res, t)) {
            t.getData(1);
            t.updateArr = [];
            t.$Modal.success({
              title: this.$t("reminder.suc"),
              content: this.$t("reminder.submitsuccess")
            });
          }
        })
        .catch(() => {
            t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        })
        },
        onCancel: () => {},
       });

    }
  }
};
</script>

<style lang="scss" scoped>
.table-form {
  margin: 10px 0;
}
</style>
