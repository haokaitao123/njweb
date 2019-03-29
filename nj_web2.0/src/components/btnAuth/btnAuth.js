import normalBtn from './normalBtn.vue' // 按钮
import modity from './modity.vue' // 按钮
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
      btnList: [], //按钮数据
      modityList: [], //类型数据
      operate: [], //查看修改数据
      isFlowNode: "", //是否有类型
      statusDis: "", //类型默认Name
      status: "", //类型默认id
      btnName: "", //按钮名称
      bType: "primary", //按钮类型
      newBtnList: []
    }
  },
  props: {},
  created() {
    this.getBtnAuth()
  },
  computed: {
    btnOperate() {
      return this.$store.state.btnOperate.modity
    },
  },
  components: {
    normalBtn,
    modity
  },
  methods: {
    getBtnAuth() {
      const t = this
      let data = {
        _mt: 'sysFunctions.getStatusBtnByAuth',
      }
      getDataLevelUserLogin(data).then((res) => {
        if (isSuccess(res, t)) {
          this.modityList = res.data.content[0].rows;
          this.isFlowNode = res.data.content[0].isFlowNode;
          this.btnListFilter();
          this.viewFilter();
          this.operateFilter();
          console.log(res, "res123");
        }
      })
    }, //获取按钮权限
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
          break
        case "button_upd":
          btnName = '修改'
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
        case "button_view":
          btnName = '查看'
          break
        case "button_unitChart":
          btnName = '组织架构图'
          break
      }
      let obj = {
        "bType": bType,
        "btnName": btnName,
      }
      return obj;
    }, //按钮类别
    sort(arr) {
      arr.sort((a, b) => {
        return a.btnOrder < b.btnOrder;
      });
    }, //排序
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
          t.sort(v.funBtnList);
          for (let k of v.funBtnList) {
            k.modityType = v.funStatecode
          }
          t.newBtnList.push.apply(t.newBtnList, v.funBtnList);
        }
      } else {
        t.newBtnList = t.sort(t.modityList[0].funBtnList)
        t.statusDis = t.btnList[0].funName;
        t.status = t.btnList[0].funStatecode;
        this.$store.commit('btnState/setModity', t.status)
      };
    }, //数据过滤
    viewFilter() {
      let data = this.newBtnList;
      let newArr = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].btnLancode != "button_view" && data[i].btnLancode != "button_upd") {
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
    }, //去除页面表格列按钮
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
        pageShow = "button_upd";
        this.$store.commit('btnOperate/setPageShow', pageShow);
      }
      this.$store.commit('btnOperate/setPageShow', temp[0]);
    },
    eventName(res) {
      let name = "";
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
      }
      return name;
    } //按钮事件名称
  },
  render: function (createElement) {
    const t = this;
    let nodes = [];
    if (this.isFlowNode == "0") {
      let child = [];
      for (let v of this.modityList[0].funBtnList) {
        let res = t.btnType(v.btnLancode);
        child.push(createElement('normalBtn', {
          props: {
            btnText: res.btnName,
            btnType: res.bType,
          },
          on: {
            'cc': (res) => {
              let eventName = this.eventName(res);
              t.$emit(name, res)
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
         console.log(v);
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
        nodes.push(child)
      };
      moditySelect.push(createElement('modity', {
        props: {
          dropdownMenuList: this.modityList,
          statusDis: this.statusDis,
          status: this.status,
        },
        on: {
          'getPageByState': (res) => {
            this.$emit('moditySelct', res)
          }
        }
      }))
      nodes.unshift(moditySelect);
      this.$store.commit('btnOperate/setPageOperate', t.operate);
    }
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
