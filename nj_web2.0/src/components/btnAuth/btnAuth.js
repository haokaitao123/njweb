import normalBtn from './normalBtn.vue' // 按钮
import modity from './modity.vue' // 类型下拉选择框
import search from './search.vue' // 搜索按钮
import {
  getDataLevelUserLogin
} from '../../axios/axios'
import {
  isSuccess,
  deepCopy
} from '../../lib/util'
import store from '../../vuex/index'

export default {
  data() {
    return {
      modityList: this.btnData, //类型数据
      operate: [], //查看修改数据
      isFlowNode: this.FlowNode, //是否有类型
      statusDis: "", //类型默认Name
      status: "", //类型默认id
      btnName: "", //按钮名称
      bType: "primary", //按钮类型
      newBtnList: [] //排序过滤后的按钮数据
    }
  },
  props: {
    btnData: {
      type: Array,
      default: function () {
        return []
      }
    },
    FlowNode: String
  },
  created() {
    this.btnListFilter();
    this.viewFilter();
    this.operateFilter();
    this.tableOperate();
  },
  computed: {
    btnOperate() {
      return this.$store.state.btnOperate.modity
    },
  },
  components: {
    normalBtn, //普通按钮
    modity, //类型选择
    search //搜索按钮
  },
  methods: {
    /**
     *排序方法
     *
     * @param {*} arr
     */
    sort(arr) {
      arr.sort((a, b) => {
        return a.btnOrder < b.btnOrder;
      });
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    /**
     * 按钮数据排序过滤
     *
     */
    btnListFilter() {
      const t = this;
      let result = this.modityList.some(function (item, index, array) {
        return item.funIsdefault == "1";
      })
      if (result) {
        for (let v of t.modityList) {
          if (v.funIsdefault == "1") {
            t.statusDis = v.funName;
            t.status = v.funStatecode;
            this.$store.commit('btnOperate/setModity', t.status)
          }
          v.funBtnList.sort(this.compare('btnOrder'));
          for (let k of v.funBtnList) {
            k.modityType = v.funStatecode
          }
          t.newBtnList.push.apply(t.newBtnList, v.funBtnList);
        }
      } else {
        t.statusDis = t.modityList[0].funName;
        t.status = t.modityList[0].funStatecode;
        this.$store.commit('btnOperate/setModity', t.status);
        for (let v of t.modityList) {
          v.funBtnList.sort(this.compare('btnOrder'));
          for (let k of v.funBtnList) {
            k.modityType = v.funStatecode
          }
          t.newBtnList.push.apply(t.newBtnList, v.funBtnList);
        };
      };
    },
    /**
     *过滤页面表格列按钮
     *
     */
    viewFilter() {
      let data = this.newBtnList;
      let newArr = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].btnLancode.indexOf("_opt_") == -1) {
          newArr.push(data[i]);
        } else {
          var obj = {
            'modityName': data[i].modityType,
            'btnName': data[i].btnLancode
          }
          this.operate.push(obj);
        }
      }
      this.newBtnList = newArr;
      this.$store.commit('btnOperate/setPageOperate', this.operate)
    },
    /**
     * 列表按钮默认显示
     *
     */
    operateFilter() {
      let array = this.operate;
      let temp = [];
      let pageShow = ""
      for (var i = 0; i < array.length; i++) {
        if (array[i].modityName == this.status) {
          temp.push(array[i].btnName)
        }
      }
      if (temp.length > 1) {
        temp = temp.join(",");
        if (temp.indexOf("button_opt_view") != -1 && temp.indexOf("button_opt_upd") != -1) {
          temp = temp.split(",");
          let index = temp.indexOf("button_opt_view")
          if (index > -1) {
            temp.splice(index, 1);
          }
        }
        temp = temp.join(",");
        this.$store.commit('btnOperate/setPageShow', temp);
      } else if (temp.length == 1) {
        this.$store.commit('btnOperate/setPageShow', temp[0]);
      } else {
        this.$store.commit('btnOperate/setPageShow', "");
      }
    },
    /**
     *  去重方法
     *
     * @param {*} arr  去重数组
     * @param {*} name 去重字段
     * @returns
     */
    arrayUnique(arr, name) {
      var hash = {};
      return arr.reduce(function (item, next) {
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        return item;
      }, []);
    },
    /**
     *  列表按钮初始化默认值
     *
     * @param {*} arr 当前去重数组
     * @param {*} name 排序字段
     */
    tableOperate(arr, name) {
      let temp = this.arrayUnique(this.operate, 'btnName');
      for (let v of temp) {
        let btnMod = this.btnType(v.btnName);
        v.name = btnMod.btnName;
        v.type = btnMod.bType;
      }
      this.$store.commit('btnOperate/setTableButton', temp);

    },
    /**
     * 按钮事件名称配置
     *
     * @param {*} res
     * @returns
     */
    eventName(res) {
      let name = "";
      // 类型下拉事件  name = 'moditySelect'
      // 搜索事件  name = 'buttonSearch'
      switch (res) {
        case "新增":
          name = 'buttonAdd'
          break
        case "删除":
          name = 'buttonDel'
          break
        case "编辑":
          name = 'buttonDraft'
          break
        case "保存":
          name = 'buttonSave'
          break
        case "提交":
          name = 'buttonSubmit'
          break
        case "返回":
          name = 'buttonReturn'
          break
        case "取消":
          name = 'buttonCancel'
          break
        case "确认":
          name = 'buttonConfirm'
          break
        case "失效":
          name = 'buttonInvalid'
          break
        case "生效":
          name = 'buttonValid';
          break
        case "导出":
          name = 'buttonExport'
          break
        case "导入":
          name = 'buttonImport'
          break
        case "复制":
          name = 'buttonCopy'
          break
        case "释放":
          name = 'buttonRelease'
          break
        case "初始化":
          name = 'buttonInit'
          break
        case "查看":
          name = 'buttonView'
          break
        case "组织架构图":
          name = 'buttonUnitChart'
          break
        case "转正":
          name = 'buttonPositive'
          break
        case "入职":
          name = 'buttonEmp'
          break
        case "待入职":
          name = 'buttonEmp1'
          break
        case "已入职":
          name = 'buttonEmp2'
          break
        case "退款":
          name = 'buttonRefund'
          break
        case "通过":
          name = 'buttonAdopt'
          break
        case "不通过":
          name = 'buttonInAdopt'
          break
        case "异动":
          name = 'buttonTrans'
          break
        case "离职":
          name = 'buttonQuits'
          break
        case "黑名单":
          name = 'buttonBlacklist'
          break
        case "面谈预约":
          name = 'buttonOrder'
          break
        case "快速离职":
          name = 'buttonQkleave'
          break
        case "拒绝":
          name = 'buttonRefuse'
          break
      }
      return name;
    },
    /**
     * 按钮名称配置
     *
     * @param {*} 按钮类型
     * @returns
     */
    btnType(data) {
      let bType = "primary";
      let btnName = ""
      //   this.bType = "primary"
      switch (data) {
        case "button_add":
          btnName = '新增'
          break
        case "button_del":
          btnName = '删除'
          bType = 'error'
          break
        case "button_opt_upd":
          btnName = '修改'
          bType = 'success'
          break
        case "button_draft":
          btnName = '编辑'
          break
        case "button_save":
          btnName = '保存'
          break
        case "button_submit":
          btnName = '提交'
          break
        case "button_return":
          btnName = '返回'
          break
        case "button_cancel":
          btnName = '取消'
          break
        case "button_confirm":
          btnName = '确认'
          break
        case "button_invalid":
          btnName = '失效'
          bType = 'error';
          break
        case "button_valid":
          btnName = '生效';
          bType = 'success';
          break
        case "button_export":
          btnName = '导出'
          break
        case "button_import":
          btnName = '导入'
          break
        case "button_copy":
          btnName = '复制'
          break
        case "button_release":
          btnName = '释放'
          break
        case "button_init":
          btnName = '初始化'
          break
        case "button_opt_view":
          btnName = '查看'
          break
        case "button_unitChart":
          btnName = '组织架构图'
          break
        case "button_positive":
          btnName = '转正';
          bType = 'success';
          break
        case "button_emp":
          btnName = '入职';
          bType = 'success';
          break
        case "button_refund":
          btnName = '退款';
          bType = 'success';
          break
        case "button_adopt":
          btnName = '通过';
          bType = 'success';
          break
        case "button_inadopt":
          btnName = '不通过';
          bType = 'error';
          break
        case "button_trans":
          btnName = '异动';
          bType = 'success';
          break
        case "button_qkleave":
          btnName = '快速离职';
          bType = 'error';
          break
        case "button_quits":
          btnName = '离职';
          bType = 'success';
          break
        case "button_blacklist":
          btnName = '黑名单';
          bType = 'error';
          break
        case "button_order":
          btnName = '面谈预约';
          bType = 'success';
          break
        case "button_refuse":
          btnName = '拒绝';
          bType = 'success';
          break
        case "button_opt_allotdept":
          btnName = '分配部门'
          break
      }
      let obj = {
        "bType": bType,
        "btnName": btnName,
      }
      return obj;
    },
  },
  render: function (createElement) {
    const t = this;
    let nodes = [];
    let searchBtn = [];
    //如果有选择下拉框
    let data = t.newBtnList
    if (this.isFlowNode == "0") {
      let child = [];
      for (let v of data) {
        let res = t.btnType(v.btnLancode);
        child.push(createElement('normalBtn', {
          props: {
            btnText: res.btnName,
            btnType: res.bType,
          },
          on: {
            'cc': (res) => {
              let eventName = this.eventName(res);
              t.$emit(eventName, res)
            }
          },
        }))
      }
      nodes.push(child)
    } else if (this.isFlowNode == "1") {
      let moditySelect = [];
      let child = [];

      let data = t.newBtnList
      for (let v of data) {
        let res = t.btnType(v.btnLancode);
        child.push(createElement('normalBtn', {
          props: {
            btnText: res.btnName,
            btnType: res.bType,
            btnShow: v.modityType
          },
          on: {
            'cc': (res) => {
              let eventName = this.eventName(res);
              t.$emit(eventName, res);
            }
          },
        }))

      };
      nodes.push(child)
      //类型选择组件添加
      moditySelect.push(createElement('modity', {
        props: {
          dropdownMenuList: this.modityList,
          statusDis: this.statusDis,
          status: this.status,
        },
        on: {
          'getPageByState': (res) => {
            this.$emit('moditySelect', res)
          }
        }
      }))

      nodes.unshift(moditySelect);

      this.$store.commit('btnOperate/setPageOperate', t.operate);
    }
    searchBtn.push(createElement('search', {
      props: {},
      on: {
        'Search': () => {
          t.$emit('buttonSearch')
        }
      }
    }))
    nodes.unshift(searchBtn);
    return createElement('div', {
        ref: 'btnList',
        'style': {
          display: 'inline'
        },
      },
      [
        nodes,
      ],
    )
  },
}
