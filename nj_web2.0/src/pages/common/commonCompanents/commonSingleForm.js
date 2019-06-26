import autoinput from './autoinput' // 普通input
import autonumber from './autonumber' // 数字输入框
import autodatepicker from './autodatepicker' // 日期选择框
import autodatetime from './autodatetime' // 日期时间选择框
import autodisc from './autodisc' // 描述信息
import autoeditor from './autoeditor' // 富文本编辑器
import autolonginput from './autolonginput' // 长文本框
import automodal from './automodal' // 弹出选择（不可手填）
import automodaledit from './automodaledit' // 弹出选择（可以手写）
import automodalmany from './automodalmany' // 弹出选择多选
import autoradio from './autoradio' // 单选框
import autocheckbox from './autocheckbox' // 单个多选框
import autoselect from './autoselect' // 下拉选择框
import autotextarea from './autotextarea' // 文本域
import autoupload from './autoupload' // 上传文件
import autophotoupload from './autophotoupload' // 上传照片
import autocheckgroup from './autocheckgroup' // 多选框group
import validCode from './validCode'
import {
  getDataLevelUserLoginNew
} from '../../../axios/axios'
import {
  isSuccess,
  deepCopy
} from '../../../lib/util'
import {
  onChange
} from '../onChange/index'
import {
  onBlur
} from '../onBlur/index'
import Bus from '../bus'


export default {
  data() {
    return {
      formDataSubmit: this.formlist.form,
      formshow: deepCopy(this.formlist.form),
      dis: deepCopy(this.formlist.dis),
      clmMap: this.formlist.clmmap,
      ruler: this.formlist.ruler,
      formData: this.formData1,
    }
  },
  props: {
    formData1: Object,
    formlist: Object,
    lebWidth: {
      type: Number,
      default: 135,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tbName: String,
    pklv: String, // 主表id
    formParentfield: String, // 主表字段名
  },
  created() {
    this.getFormDataSubmit()
  },
  mounted() {
    /*
     * 解决富文本编辑器zindex问题
     * */
    let nodes = document.getElementsByClassName('ivu-select-dropdown')
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].style.zIndex = 10002
    }
    Bus.setData(this.formDataSubmit)
  },
  components: {
    autoinput,
    autonumber,
    autodatepicker,
    autodatetime,
    autodisc,
    autoeditor,
    autolonginput,
    automodal,
    automodaledit,
    automodalmany,
    autoradio,
    autocheckbox,
    autoselect,
    autotextarea,
    autoupload,
    autophotoupload,
    autocheckgroup,
  },
  methods: {
    /*
     * 格式化数据
     * */
    getFormDataSubmit() {
      let columns = this.formData.columns // 字段
      let formData = {}
      let form = {} // 表单
      let ruler = {} // 校验规则
      let clmmap = {}
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].clmLayout === 20) {
          // 当数据类型为checkBox group时，需要数据类型为数组
          if (columns[i].clmValue !== '') {
            form[columns[i].clmName] = columns[i].clmValue.split(',')
          } else {
            form[columns[i].clmName] = []
          }
        } else {
          form[columns[i].clmName] = columns[i].clmValue
        }
        if (columns[i].clmName !== 'companyId') {
          clmmap[columns[i].clmName] = columns[i].clmDbName
        }
        if (columns[i].columnValid) {
          ruler[columns[i].clmName] = []
          for (let j = 0; j < columns[i].columnValid.length; j++) {
            ruler[columns[i].clmName].push({
              validator: (rule, value, callback) => {
                if (!validCode[rule.valid](form[rule.field])) {
                  callback(new Error(rule.message))
                } else {
                  callback()
                }
              },
              trigger: 'change',
              message: columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
              valid: columns[i].columnValid[j].clmvMod,
            })
          }
        }
      }
      form._mt = 'platAutoLayoutSave.addOrUpd'
      form.logType = this.$t('button.sav')
      formData.form = form
      formData.ruler = ruler
      formData.clmmap = clmmap
      return formData
    },

    /*
     * 校验页面表单
     * */
    validor(rule, value, callback) {
      if (!validCode[rule.valid](this.formDataSubmit[rule.field])) {
        callback(new Error(rule.message))
      } else {
        callback()
      }
    },
    /**
     * change事件
     */
    change(node) {

      if (onChange.hasOwnProperty(this.formData.tbName)) {
        if (onChange[this.formData.tbName].hasOwnProperty(node.ruleText)) {
          onChange[this.formData.tbName][node.ruleText].call(this, node)
        }
      }
    },
    /**
     * blur事件
     */
    blur(node) {
      if (onBlur.hasOwnProperty(this.formData.tbName)) {
        if (onBlur[this.formData.tbName].hasOwnProperty(node.ruleText)) {
          onBlur[this.formData.tbName][node.ruleText].call(this, node)
        }
      }
    },
    // setJLData(obj) {
    //   for (let item in obj) {
    //     if (item.toString().indexOf('_dis') !== -1) {
    //       for (let i = 0; i < this.formData.columns.length; i++) {
    //         let str = item.toString().replace('_dis', '')
    //         if (this.formData.columns[i].clmName === str) {
    //           this.formData.columns[i].clmDisValue = obj[item]
    //         }
    //       }
    //     }
    //     for (let item2 in this.formDataSubmit) {
    //       if (item === item2) {
    //         this.formDataSubmit[item2] = obj[item]
    //       }
    //     }
    //   }
    // },
    setJLData(obj) {
      for (let item in obj) {
        if (item.toString().indexOf('_dis') !== -1) {
          let str = item.toString().replace('_dis', '')
          for (let key in Bus.map) {
            if (key === str) {
              let ss = Bus.father.$refs[Bus.map[key]][0].formData.columns
              for (let i = 0; i < ss.length; i++) {
                if (ss[i].clmName === str) {
                  ss[i].clmDisValue = obj[item]
                  Bus.father.$refs[Bus.map[key]][0].$refs[[ss[i].clmName]].thisValue = ss[i].clmDisValue // 级联重新赋值
                }
              }
              for (let item2 in Bus.father.$refs[Bus.map[key]][0].formDataSubmit) {
                if (item === item2) {
                  Bus.father.$refs[Bus.map[key]][0].formDataSubmit[item2] = obj[item]
                }
              }
            }
          }
        } else {
          for (let key in Bus.map) {
            if (key === item) {
              let ss = Bus.father.$refs[Bus.map[key]][0].formData.columns
              for (let i = 0; i < ss.length; i++) {
                if (ss[i].clmName === item) {
                  ss[i].clmDisValue = obj[item]
                  Bus.father.$refs[Bus.map[key]][0].$refs[[ss[i].clmName]].thisValue = ss[i].clmDisValue // 级联重新赋值
                }
              }
              for (let item2 in Bus.father.$refs[Bus.map[key]][0].formDataSubmit) {
                if (item === item2) {
                  Bus.father.$refs[Bus.map[key]][0].formDataSubmit[item2] = obj[item]
                }
              }
            }
          }
        }
      }
    },
    /*
     * 单表保存页面
     * */
    saveForm() {
      const t = this
      t.$refs.formList.validate().then(v => {
        if (v) {
          t.formDataSubmit.tbName = t.tbName
          t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
          if (t.pklv) {
            t.formDataSubmit[t.formParentfield] = t.pklv
          }
          if (t.formDataSubmit._mt === undefined) {
            t.formDataSubmit._mt = 'platAutoLayoutSave.addOrUpd'
            t.formDataSubmit.logType = this.$t('button.sav')
          }
          getDataLevelUserLoginNew(t.formDataSubmit).then((res) => {
            if (isSuccess(res, t)) {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.savsuccess'),
              })
              t.$emit('close')
              Bus.$emit('getDataBlock')
            }
          }).catch((res) => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: res,
            })
          })
        }
      })
    },
    validForm() {
      return this.$refs.formList.validate()
    },
  },
  watcher: {
    formDataSubmit(value) {},
  },
  render: function (createElement) {
    let nodes = []
    for (let i = 0; i < this.formData.columns.length; i++) {
      let child = []
      switch (this.formData.columns[i].clmLayout) {
        case 1:
          child.push(createElement('autoinput', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              disabled: this.disabled,
              dis: this.dis,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            /*
             * 实现双向绑定
             * */
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
              blur: (value) => {
                this.blur(value)
              }
            },
            ref: this.formData.columns[i].clmName,
          }))
          break
          /*
           * 数字文本框
           * */
        case 2:
          child.push(createElement('autonumber', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            /*
             * 实现双向绑定
             * */
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
              blur: (value) => {
                this.blur(value)
              }
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
          /*
           * 日期选择框
           * */
        case 3:
          child.push(createElement('autodatepicker', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value;
                this.$store.state.flowClmkMap.popForm[this.formData.columns[i].clmName] = value
              },
              change: (value) => {

                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
          /*
           * 日期时间选择框
           * */
        case 4:
          child.push(createElement('autodatetime', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
          /*
           * 长文本框
           * */
        case 5:
          child.push(createElement('autolonginput', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            /*
             * 实现双向绑定
             * */
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }))
          break
          /*
           * 文本域
           * */
        case 6:
          child.push(createElement('autotextarea', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            /*
             * 实现双向绑定
             * */
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
          /*
           * 富文本编辑器
           * */
        case 7:
          child.push(createElement('autoeditor', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
          }, ))
          break
          /*
           * 单个多选框
           * */
        case 10:
          child.push(createElement('autocheckbox', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                if (value) {
                  this.formDataSubmit[this.formData.columns[i].clmName] = '1'
                } else {
                  this.formDataSubmit[this.formData.columns[i].clmName] = '0'
                }
                // this.formDataSubmit[this.formData.columns[i].clmName] = value.toString()
                // alert(22)
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
          /*
           * 单选框
           * */
        case 11: {
          let childSelect = []
          for (let j = 0; j < this.formData.columnOptions.length; j++) {
            if (this.formData.columnOptions[j].clmName === this.formData.columns[i].clmName) {
              childSelect = this.formData.columnOptions[j].clmOptionList
              break
            }
          }
          child.push(createElement('autoradio', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              data: childSelect,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            /*
             * 实现双向绑定
             * */
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
        }
        /*
         * 下拉选择
         * */
        case 12: {
          let childSelect = []
          for (let j = 0; j < this.formData.columnOptions.length; j++) {
            if (this.formData.columnOptions[j].clmName === this.formData.columns[i].clmName) {
              childSelect = this.formData.columnOptions[j].clmOptionList
              break
            }
          }
          child.push(createElement('autoselect', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              data: childSelect,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
        }
        /*
         * 弹出选择
         * */
        case 13:
          child.push(createElement('automodal', {
            props: {
              value: this.formData.columns[i].clmDisValue,
              oldValue: 0, // fd
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              message: this.formData.columns[i].clmDescribe,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              id: this.formData.columns[i].clmValue,
              required: this.formData.columns[i].columnValid !== undefined,
              modiaContent: this.formData.columns[i].clmSelOptMark !== undefined ? this.formData.columns[i].clmSelOptMark : '',
              sffFilter: this.formData.columns[i].clmfilter,
              sffCascadeget: this.formData.columns[i].clmcascadeget,
              form: this.formDataSubmit,
            },
            on: {
              'on-change': (value) => {
                this.oldValue = this.formDataSubmit[this.formData.columns[i].clmName]
                this.formDataSubmit[this.formData.columns[i].clmName] = value
                this.$store.state.flowClmkMap.popForm[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
              setJLData: (obj) => {
                this.setJLData(obj)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
          /*
           * 弹出选择后可修改
           * */
        case 14:
          child.push(createElement('automodaledit', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
              setJLData: (obj) => {
                this.setJLData(obj)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
          /*
           * CheckboxGroup
           * */
        case 20: {
          let childSelect = []
          for (let j = 0; j < this.formData.columnOptions.length; j++) {
            if (this.formData.columnOptions[j].clmName === this.formData.columns[i].clmName) {
              childSelect = this.formData.columnOptions[j].clmOptionList
              break
            }
          }
          child.push(createElement('autocheckgroup', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              data: childSelect,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }, ))
          break
        }
        /*
         * 多选框弹出选择
         * */
        case 21:
          child.push(createElement('automodalmany', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
          }, ))
          break
          /*
           * 页面描述说明
           * */
        case 70:
          child.push(createElement('autodisc', {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formshow,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              disabled: this.disabled,
              dis: this.dis,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
          }, ))
          break
          /*
           * 文件上传
           * */
        case 71:
          child.push(createElement('autoupload', {
            props: {
              value: this.formData.columns[i].clmDisValue,
              id: this.formData.columns[i].clmValue,
              fileKey: this.formData.columns[i].clmValue.split(':')[1],
              itemLabel: this.formData.columns[i].clmDname,
              show: this.formshow,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              disabled: this.disabled,
              dis: this.dis,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }))
          break
          /*
           * 照片上传
           * */
        case 72:
          child.push(createElement('autophotoupload', {
            props: {
              value: this.formData.columns[i].clmValue,
              id: this.formData.columns[i].clmValue,
              fileKey: this.formData.columns[i].clmValue.split(':')[1],
              itemLabel: this.formData.columns[i].clmDname,
              show: this.formshow,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              disabled: this.disabled,
              dis: this.dis,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
              change: (value) => {
                this.change(value)
              },
            },
            ref: this.formData.columns[i].clmName,
          }))
          break
      }
      nodes.push(child)
    }
    return createElement('div',
      [
        createElement('Form', {
            props: {
              'label-width': this.lebWidth,
              // 'label-position': 'top',
              rules: this.ruler,
              model: this.formDataSubmit,
            },
            ref: 'formList',
          },
          [
            createElement('Row', [
              nodes,
            ]),
          ],
        ),
      ],
    )
  },
}
