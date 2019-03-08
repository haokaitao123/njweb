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
import autocheckgroup from './autocheckgroup' // 多选框group
import validCode from './validCode'
import { getDataLevelUserLoginNew } from '../../../../axios/axios'
import { isSuccess, deepCopy } from '../../../../lib/util'

export default {
  data() {
    return {
      formDataSubmit: {
        _mt: 'platAutoLayoutSave.addOrUpd',
        logType: '保存',
      },
      clmMap: {},
      ruler: {},
    }
  },
  props: {
    formData: Object,
    lebWidth: {
      type: Number,
      default: 135,
    },
    tbName: String,
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
    autocheckgroup,
  },
  methods: {
    /*
    * 格式化数据
    * */
    getFormDataSubmit() {
      let columns = this.formData.columns // 字段
      let form = this.formDataSubmit  // 表单
      let ruler = this.ruler  // 校验规则
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
          this.clmMap[columns[i].clmName] = columns[i].clmDbName
        }
        if (columns[i].columnValid) {
          ruler[columns[i].clmName] = []
          for (let j = 0; j < columns[i].columnValid.length; j++) {
            ruler[columns[i].clmName].push({ validator: this.validor, trigger: 'change', message: columns[i].clmDname + columns[i].columnValid[j].clmvPrompts, valid: columns[i].columnValid[j].clmvMod })
          }
        }
      }
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

    change() {
      let aa = deepCopy(this.formDataSubmit)
      if (aa.empnhCname) {
        delete aa.empnhCname
      }
      this.formDataSubmit = aa
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
          getDataLevelUserLoginNew(t.formDataSubmit).then((res) => {
            if (isSuccess(res, t)) {
              t.$Modal.success({
                title: '成功',
                content: '保存成功',
              })
            }
          }).catch(() => {
            t.$Modal.error({
              title: '错误',
              content: '网络错误',
            })
          })
        }
      })
    },
    validForm() {
      this.$refs.formList.validate().then(v => {
        return true
      })
      return false
    },
  },
  watcher: {
    formDataSubmit(value) {
      // console.log(value)
    },
  },
  render: function (createElement) {
    let nodes = []
    for (let i = 0; i < this.formData.columns.length; i++) {
      let child = []
      switch (this.formData.columns[i].clmLayout) {
        case 1: child.push(createElement('autoinput', {
          props: {
            value: this.formDataSubmit[this.formData.columns[i].clmName],
            show: this.formData.columns[i].clmName in this.formDataSubmit,
            itemLabel: this.formData.columns[i].clmDname,
            ruleText: this.formData.columns[i].clmName,
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
          },
        }))
          break
        /*
        * 数字文本框
        * */
        case 2: child.push(createElement('autonumber',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
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
            },
          },
        ))
          break
        /*
        * 日期选择框
        * */
        case 3: child.push(createElement('autodatepicker',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
            },
          },
        ))
          break
        /*
        * 日期时间选择框
        * */
        case 4: child.push(createElement('autodatetime',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
            },
          },
        ))
          break
        /*
        * 长文本框
        * */
        case 5: child.push(createElement('autolonginput', {
          props: {
            value: this.formDataSubmit[this.formData.columns[i].clmName],
            show: this.formData.columns[i].clmName in this.formDataSubmit,
            itemLabel: this.formData.columns[i].clmDname,
            ruleText: this.formData.columns[i].clmName,
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
          },
        }))
          break
        /*
        * 文本域
        * */
        case 6: child.push(createElement('autotextarea',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
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
            },
          },
        ))
          break
        /*
        * 富文本编辑器
        * */
        case 7: child.push(createElement('autoeditor',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
          },
        ))
          break
        /*
         * 单个多选框
         * */
        case 10: child.push(createElement('autocheckbox',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
            },
          },
        ))
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
          child.push(createElement('autoradio',
            {
              props: {
                value: this.formDataSubmit[this.formData.columns[i].clmName],
                show: this.formData.columns[i].clmName in this.formDataSubmit,
                itemLabel: this.formData.columns[i].clmDname,
                ruleText: this.formData.columns[i].clmName,
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
              },
            },
          ))
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
          child.push(createElement('autoselect',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              data: childSelect,
              required: this.formData.columns[i].columnValid !== undefined,
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
            },
          },
        ))
          break
        }
        /*
         * 弹出选择
         * */
        case 13: child.push(createElement('automodal',
          {
            props: {
              value: this.formData.columns[i].clmDisValue,
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              message: this.formData.columns[i].clmDescribe,
              ruleText: this.formData.columns[i].clmName,
              id: this.formData.columns[i].clmValue,
              required: this.formData.columns[i].columnValid !== undefined,
              modiaContent: this.formData.columns[i].clmSelOptMark !== undefined ? this.formData.columns[i].clmSelOptMark : '',
            },
            on: {
              'on-change': (value) => {
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
            },
          },
        ))
          break
        /*
         * 弹出选择后可修改
         * */
        case 14: child.push(createElement('automodaledit',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
          },
        ))
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
          child.push(createElement('autocheckgroup',
            {
              props: {
                value: this.formDataSubmit[this.formData.columns[i].clmName],
                show: this.formData.columns[i].clmName in this.formDataSubmit,
                itemLabel: this.formData.columns[i].clmDname,
                ruleText: this.formData.columns[i].clmName,
                message: this.formData.columns[i].clmDescribe,
                data: childSelect,
                required: this.formData.columns[i].columnValid !== undefined,
              },
              on: {
                'on-change': (value) => {
                  this.formDataSubmit[this.formData.columns[i].clmName] = value
                },
              },
            },
          ))
          break
        }
        /*
         * 多选框弹出选择
         * */
        case 21: child.push(createElement('automodalmany',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
          },
        ))
          break
        /*
         * 页面描述说明
         * */
        case 70: child.push(createElement('autodisc',
          {
            props: {
              value: this.formDataSubmit[this.formData.columns[i].clmName],
              show: this.formData.columns[i].clmName in this.formDataSubmit,
              itemLabel: this.formData.columns[i].clmDname,
              ruleText: this.formData.columns[i].clmName,
              message: this.formData.columns[i].clmDescribe,
              required: this.formData.columns[i].columnValid !== undefined,
            },
          },
        ))
          break
        /*
         * 文件上传
         * */
        case 71: child.push(createElement('autoupload', {
          props: {
          	value: this.formData.columns[i].clmDisValue,
          	id: this.formData.columns[i].clmValue,
          	fileKey: this.formData.columns[i].clmValue.split(':')[1],
            itemLabel: this.formData.columns[i].clmDname,
            show: this.formData.columns[i].clmName in this.formDataSubmit,
            ruleText: this.formData.columns[i].clmName,
            message: this.formData.columns[i].clmDescribe,
            required: this.formData.columns[i].columnValid !== undefined,
          },
          on: {
              'on-change': (value) => {
              	console.log(value)
                this.formDataSubmit[this.formData.columns[i].clmName] = value
              },
            },
        }))
          break
      }
      nodes.push(child)
    }
    return createElement('div',
      [
        createElement('Form',
          {
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
