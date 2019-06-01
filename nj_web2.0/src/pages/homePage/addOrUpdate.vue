<template>
  <div class="new">
    <Form :model="form" ref="form1" label-position="right" :rules="ruleVali1" :label-width="100">
      <FormItem label="标题" prop="remindTitle">
        <Input v-model="form.remindTitle"></Input>
      </FormItem>
      <FormItem label="提醒范围">
        <Select v-model="form.remindType" style="width:150px;">
          <Option v-for="(item,index) in remindTypeList" :key="index" :value="item.paramCode">{{item.paramInfoCn}}</Option>
        </Select>
      </FormItem>
      <FormItem label="起止时间">
        <DatePicker type="datetimerange" v-model="thisDateTime" @on-change="setDateTime" format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期" style="width: 100%"></DatePicker>
      </FormItem>
      <FormItem label="提醒">
        <Row>
          <Col span="2" v-if="form.remindAdvance !== 'nothtype'">
          提前
          </Col>
          <Col span="5" v-if="form.remindAdvance !== 'nothtype'">
          <InputNumber :max="10" :min="1" v-model="form.remindAdvanceNum"></InputNumber>
          </Col>
          <Col span="5" offset="1">
          <Select v-model="form.remindAdvance" @on-change="selectChange">
            <Option v-for="(item,index) in timetype" :key="index" :value="item.paramCode">{{item.paramInfoCn}}</Option>
          </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="添加成员">
        <!-- <Row> -->
        <!-- <Col span="2"> -->
        <Tag v-for="(item, index) in empArr" closable @on-close="handleClose(index)" :key="index" type="ghost"
             shape="circle">{{item.name}}
        </Tag>
        <Button type="ghost" shape="circle" icon="plus" @click="showUp"></Button>
        <!-- </Col> -->
        <!-- </Row> -->
      </FormItem>
      <FormItem label="地点">
        <Input v-model="form.remindPlace"></Input>
      </FormItem>
      <FormItem label="描述和附件">
        <Input v-model="form.remindFiledesc" style="margin-bottom: 10px"></Input>
        <input type="file" name="file" @change="upload" id="fileinputModel" class="fileinput"/>
        <label class="filelabel" for="fileinputModel">上传附件</label>
        文件名称 : &nbsp;
        <a href="javascript:;" @click="download(file.url)">{{ file.name }}</a>
      </FormItem>
      <FormItem label="是否重复">
        <RadioGroup v-model="form.remindIsrep">
          <Radio label="1">
            <span>是</span>
          </Radio>
          <Radio label="0">
            <span>否</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="" v-show="form.remindIsrep === '1'">
        <a href="javascript:;" @click="newTodo">重复</a>
      </FormItem>
      <div class="btn" style="text-align: right;padding-bottom: 10px">
        <Button type="ghost" @click="closeMain">取消</Button>
        <span v-show="dateShow">
          <Button type="error" v-if="id" @click="isDeleteAll">删除</Button>
          <Button type="primary" @click="addOrdate">确定</Button>
        </span>
      </div>
    </Form>
    <el-dialog title="重复" width='850px' :visible.sync="updateOrAdd" @close="reset2" append-to-body>
      <Form :model="repeat" ref="form2" label-position="right" :rules="ruleVali2" :label-width="100">
        <FormItem label="重复类型">
          <Select v-model="repeat.remindRepeattype" style="width:150px;" @on-change="selectChange3">
            <Option v-for="(item,index) in repeattype" :key="index" :value="item.paramCode">{{item.paramInfoCn}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="重复频率">
          <Row>
            <Col span="1">
            每
            </Col>
            <Col span="3">
            <InputNumber :max="10" :min="1" v-model="repeat.remindRepeatnum"></InputNumber>
            </Col>
            <Col span="1">
            {{repeatTypep}}
            </Col>
          </Row>
        </FormItem>
        <FormItem label="星期" prop="remindRepeatweek" v-if="repeat.remindRepeattype === 'repeatweekly'">
          <CheckboxGroup v-model="repeat.remindRepeatweek" @on-change="weekChange">
            <Checkbox label="0">周日</Checkbox>
            <Checkbox label="1">周一</Checkbox>
            <Checkbox label="2">周二</Checkbox>
            <Checkbox label="3">周三</Checkbox>
            <Checkbox label="4">周四</Checkbox>
            <Checkbox label="5">周五</Checkbox>
            <Checkbox label="6">周六</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="结束">
          <Col span="5">
          <Select v-model="repeat.remindRepeatstoptype" @on-change="selectChange2">
            <Option v-for="(item,index) in enddate" :key="index" :value="item.paramCode">{{item.paramInfoCn}}</Option>
          </Select>
          </Col>
          <Col span="5" offset="1" v-if="repeat.remindRepeatstoptype === 'enddatefrequency'">
          <InputNumber :max="10" :min="1" v-model="repeat.remindRepeatcount"></InputNumber>
          次
          </Col>
          <Col span="7" offset="1" v-if="repeat.remindRepeatstoptype === 'enddatedate'">
          <FormItem prop="remindRepeatstop">
            <DatePicker type="date" placeholder="选择结束日期" v-model="repeat.remindRepeatstop"
                        :options="options"></DatePicker>
          </FormItem>
          </Col>
        </FormItem>
        <!-- <FormItem label="结果">
          {{repeat.res}}
        </FormItem> -->
        <div class="btn" style="text-align: right">
          <Button type="primary" @click="closeNew">确定</Button>
        </div>
      </Form>
    </el-dialog>
    <div style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0,0,0,0.8);z-index: 3000" v-if="isAll">
      <div style="background: white;width:260px;position: absolute;margin-left: 500px;margin-top: 158px;padding: 10px">
        <div style="display: flex;justify-content: space-between">
          <span style="font-size: 15px;font-weight: bold">是否全部修改</span>
          <Button type="text"   @click="close1">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>
        <div class="btn" style="text-align: right">
          <Button type="primary" @click="changeOne">当前任务</Button>
          <Button type="primary" @click="changeAll">全部任务</Button>
        </div>
      </div>
    </div>
    <div style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0,0,0,0.8);z-index: 3000" v-if="isAllDelete">
      <div style="background: white;width:260px;position: absolute;margin-left: 500px;margin-top: 158px;padding: 10px">
        <div style="display: flex;justify-content: space-between">
          <span style="font-size: 15px;font-weight: bold">是否全部删除</span>
          <Button type="text"   @click="close2">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>
        <div class="btn" style="text-align: right">
          <Button type="primary" @click="deleteEvent(2)">当前任务</Button>
          <Button type="primary" @click="deleteEvent(3)">全部任务</Button>
        </div>
      </div>
    </div>
    <searchPubEmp @closeUp="closeUp" v-if="showEmp" @changeinput="changeinput" ref="searchPubEmp"></searchPubEmp>
  </div>
</template>

<script>
  import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
    uploadFile
  } from '../../axios/axios'
  import {
    isSuccess,
    deepCopy
  } from '../../lib/util'
  import searchPubEmp from '../../components/searchTable/searchPubEmp'
  import Bus from '../../lib/bus'

  export default {
    data() {
      return {
        isAll: false,
        isAllDelete: false,
        // loadingStatus: false,
        sureRepeat: false,
        file: {
          name: '',
          url: '',
        },
        id: '',
        thisDateTime: this.dateTime,
        showEmp: false,
        dateShow: true,
        empArr: [],
        form: {
          remindTitle: '',
          remindStatime: '', // 开始时间
          remindStoptime: '',	// 结束时间
          remindNote: '',	// 备注
          remindAdvance: 'minutetype',	// 提前时间(天，小时分钟)
          remindAdvanceNum: 15,	// 提前时间(数字)
          remindMemid: '',	// 参与成员
          remindPlace: '',	// 地点
          remindFiledesc: '',	// 附件描述
          remindFile: '', // 附件
          remindPlat: this.$store.state.user.roleType,
          remindType: '0root',
          remindIsrep: '0',
        },
        ruleVali1: {
            remindTitle: [{ required: true, message: '请填写标题', trigger: 'change' }],
            thisDateTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        },
        repeat: {
          remindRepeattype: 'repeatweekly',
          remindRepeatnum: 1,
          // remindRepeatweek: '',
          remindRepeatstop: '',
          remindRepeatcount: 1,
          remindRepeatstoptype: 'enddatefrequency',
          remindRepeatweek: [],
        },
        ruleVali2: {
          remindRepeatweek: [{required: true, type: 'array', message: '请选择重复星期', trigger: 'change'}],
          remindRepeatstop: [{required: true, type: 'date', message: '请选择时间', trigger: 'change'}],
          // thisDateTime: [{ required: true, message: '必填', trigger: 'change' }],
        },
        repeatTypep: '周',
        options: {
          disabledDate(date) {
            return date && date.valueOf() < new Date().getTime() - 86400000 || date && date.valueOf() > new Date().getTime() + 31536000 * 1000
          }
        },
        enddate: [],
        repeattype: [],
        timetype: [],
        remindTypeList: [],
        updateOrAdd: false,
        typeShow: true,
      }
    },
    props: {
      dateTime: {
//        type: Array,
        default: function () {
          return [new Date(), new Date()]
        },
      },
      dateShow: Boolean,
    },
    components: {
      searchPubEmp,
    },
    created() {
      this.getSelect()
      // this.getInfoById()
    },
    computed: {},
    methods: {
      newTodo() {
        this.updateOrAdd = true
        if (this.typeShow) {
          if (!this.sureRepeat) {
          this.repeat.remindRepeatweek = []
          this.repeat.remindRepeattype = 'repeateveryday'
          this.repeat.remindRepeatnum = 1
          // this.repeat.remindRepeatweek = ''
          this.repeat.remindRepeatstop = ''
          this.repeat.remindRepeatcount = 1
          this.repeat.remindRepeatstoptype = 'enddatefrequency'
        }
        this.sureRepeat = false
        }
      },
      closeNew() {
        if (this.repeat.remindRepeattype !== 'repeatweekly' && this.repeat.remindRepeatstoptype === 'enddatefrequency') {
          this.sureRepeat = true
          this.updateOrAdd = false
        } else {
          this.$refs.form2.validate((valid) => {
            if (valid) {
              this.sureRepeat = true
              this.updateOrAdd = false
            }
          })
        }
      },
      upload() {
        const t = this
        const formData = new FormData()
        formData.append('upfile', document.getElementById('fileinputModel').files[0])
        this.file.name = document.getElementById('fileinputModel').files[0].name
        uploadFile(formData).then(res => {
          this.form.remindFile = JSON.stringify(res.data)
          this.file.url = res.data[document.getElementById('fileinputModel').files[0].name]
        }).catch((res) => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      download(key) {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: '下载',
          filekey: key,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selectChange(value) {
        if (value === 'nothtype') {
          this.form.remindAdvanceNum = ''
        } else {
          this.form.remindAdvanceNum = 15
        }
      },
      selectChange2(value) {
        this.repeat.remindRepeatstop = ''
        if (value === 'enddatefrequency') {
          this.repeat.remindRepeatcount = 1
        } else {
          this.repeat.remindRepeatcount = ''
        }
      },
      selectChange3(value) {
        this.$refs.form2.resetFields()
        if (value !== 'repeatweekly') {
          // this.repeat.remindRepeatweek = ''
          this.repeat.remindRepeatweek = []
        }
      },
      setDateTime() {
        this.form.remindStatime = this.thisDateTime[0].format('yyyy-MM-dd hh:mm:ss')
        this.form.remindStoptime = this.thisDateTime[1].format('yyyy-MM-dd hh:mm:ss')
      },
      weekChange() {
        // this.repeat.remindRepeatweek = this.repeat.remindRepeatweek.join(',')
      },
      getSelect() {
        const t = this
        this.empArr = []
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'enddate,repeattype,timetype,remindtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.enddate = res.data.content[0].value[0].paramList
            t.repeattype = res.data.content[0].value[1].paramList
            t.timetype = res.data.content[0].value[2].paramList
            t.remindTypeList = res.data.content[0].value[3].paramList
            console.log(t.remindTypeList, 't.remindTypet.remindType')
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      getInfoById(id) {
        //首页PC端SCC平台5条数据详情的
        let t = this
        t.id = id
        if (id !== '') {
          getDataLevelUserLogin({
            _mt: 'cmutReminds.getById',
            logType: '查询2',
            id: id,
          }).then((res) => {
            if (isSuccess(res, t)) {
              console.log(res.data.content[0])
              t.form.remindType = res.data.content[0].remindType	// 附件描述
              t.form.remindTitle = res.data.content[0].remindTitle
              t.form.remindStatime = res.data.content[0].remindStatime // 开始时间
              t.form.remindStoptime = res.data.content[0].remindStoptime	// 结束时间
              t.form.remindNote = res.data.content[0].remindNote	// 备注
              t.form.remindAdvance = res.data.content[0].remindAdvance // 提前时间(天，小时分钟)
              t.form.remindAdvanceNum = parseInt(res.data.content[0].remindAdvanceNum)	// 提前时间(数字)
              t.form.remindMemid = res.data.content[0].remindMemid	// 参与成员
              t.form.remindPlace = res.data.content[0].remindPlace	// 地点
              t.form.remindFiledesc = res.data.content[0].remindFiledesc	// 附件描述
              t.form.remindIsrep = res.data.content[0].remindIsrep	// 附件描述
              this.repeat.remindRepeattype = res.data.content[0].remindRepeattype
              this.repeat.remindRepeatnum = parseInt(res.data.content[0].remindRepeatnum)
              // this.repeat.remindRepeatweek = res.data.content[0].remindRepeatweek
              this.repeat.remindRepeatstop = res.data.content[0].remindRepeatstop
              this.repeat.remindRepeatcount = parseInt(res.data.content[0].remindRepeatcount)
              this.repeat.remindRepeatstoptype = res.data.content[0].remindRepeatstoptype
              if (res.data.content[0].remindRepeatweek) {
                t.repeat.remindRepeatweek = res.data.content[0].remindRepeatweek.split(',')
              }
              if (res.data.content[0].hasOwnProperty('remindRepeattype')) {
                  this.typeShow = false
              }
              t.thisDateTime = [new Date(res.data.content[0].remindStatime), new Date(res.data.content[0].remindStoptime)]
              if (res.data.content[0].remindFile !== '' && res.data.content[0].remindFile) {
                let obj = JSON.parse(res.data.content[0].remindFile)
                for (let key in obj) {
                  t.file.name = key
                  t.file.url = obj[key]
                }
              }
              if (res.data.content[0].remindMemid) {
                let arr = res.data.content[0].remindMemid.split(',')
                let arr2 = res.data.content[0].remindMemidDis.split(',')
                for (let i = 0; i < arr.length; i++) {
                  this.empArr.push({
                    name: arr2[i],
                    id: arr[i],
                  })
                }
                let obj = {};
                this.empArr = this.empArr.reduce((cur,next) => {
                  obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
                  return cur;
                },[]) //设置cur默认类型为数组，并且初始值为空的数组
              }
            }
          }).catch((res) => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: res,
            })
          })
        } else {
          this.reset()
        }
      },
      deleteEvent(e) {
        const t = this
        let data = {}
        data['_mt'] = 'cmutReminds.delByIds'
        data.delIds = t.id
        data.logType = '删除'
        data.remindMasterSlave = e
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            this.isAllDelete = false
            Bus.$emit('calenderGetData')
            this.closeMain()
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      resetFields() {
        this.$refs.form1.resetFields() // 清除校驗
      },
      addOrdate() {
        const t = this
        let aa = false
        // 修改前点击确定没有填写重复信息让他填写的一个校验
//        t.$refs.form1.validate((valid) => {
//           if (t.repeat.remindRepeatweek.length > 0) {
//             aa = true
//           } else if(t.repeat.remindRepeattype === 'repeatweekly' && t.repeat.remindRepeatweek.length < 1) {
//             this.$Modal.error({
//               title: this.$t('reminder.err'),
//               content: '请填写重复信息',
//             })
//           } else {
//             aa = true
//           }
//         })
        t.$refs.form1.validate((valid) => {
          if (t.id !== '') {
            t.form.id = t.id
            t.isChangeAll()
            return
          }
          if (t.form.remindStatime === '') {
            t.form.remindStatime = new Date().format('yyyy-MM-dd hh:mm:ss')
          }
          if (t.form.remindStoptime === '') {
            t.form.remindStoptime = new Date().format('yyyy-MM-dd hh:mm:ss')
          }
          if (t.repeat.remindRepeatstop !== '' && typeof t.repeat.remindRepeatstop === 'object') {
            t.repeat.remindRepeatstop = t.repeat.remindRepeatstop.format('yyyy-MM-dd')
          }
          let data = Object.assign(t.form, t.repeat)
          for (let o in data) {
            if (data[o] === '') {
              delete data[o]
            }
          }
          data.remindRepeatweek = data.remindRepeatweek.join(',')
          if (valid) {
            getDataLevelUserLogin({
              _mt: 'cmutReminds.addOrUpd',
              logType: '新增或更新',
              data: JSON.stringify(data),
            }).then((res) => {
              if (isSuccess(res, t)) {
                this.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.addsuccess'),
                })
                this.closeMain()
                Object.keys(t.form).forEach(key => t.form[key] = '')
                this.form.remindIsrep = '0'
              }
            }).catch((res) => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: res,
              })
            })
          }
        })
      },
      showUp() {
        this.showEmp = true
        setTimeout(() => {
          this.$refs.searchPubEmp.getData()
        }, 200);
      },
      handleClose(index) {
        this.empArr.splice(index, 1)
      },
      closeUp() {
        this.showEmp = false
      },
      closeMain() {
        this.$emit('rerender')
        this.$emit('closeTodo')
        this.$emit('closechang')
        this.$refs.form1.resetFields()
      },
      changeinput(name, id) {
        for (let i = 0; i < this.empArr.length; i++) {
          if (this.empArr[i].id === id) {
            return
          }
        }
        this.empArr.push({
          name: name,
          id: id,
        })
        this.form.remindMemid = this.empArr.map((item) => item.id).join(',')
      },
      isChangeAll() {
        this.isAll = true
      },
      isDeleteAll() {
        this.isAllDelete = true
      },
      changeAll() {
        const t = this
        if (t.id !== '') {
          t.form.id = t.id
        }
        if (t.form.remindStatime === '') {
          t.form.remindStatime = new Date().format('yyyy-MM-dd hh:mm:ss')
        }
        if (t.form.remindStoptime === '') {
          t.form.remindStoptime = new Date().format('yyyy-MM-dd hh:mm:ss')
        }
        if (t.repeat.remindRepeatstop !== '' && typeof t.repeat.remindRepeatstop === 'object') {
          t.repeat.remindRepeatstop = t.repeat.remindRepeatstop.format('yyyy-MM-dd')
        }
        let data = Object.assign(t.form, t.repeat)
        for (let o in data) {
          if (data[o] === '') {
            delete data[o]
          }
        }
        data.remindRepeatweek = data.remindRepeatweek.join(',')
        data.remindMasterSlave = 3
        getDataLevelUserLogin({
          _mt: 'cmutReminds.addOrUpd',
          logType: '新增或更新',
          data: JSON.stringify(data),
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.isAll = false
            this.closeMain()
            Bus.$emit('calenderGetData')
            this.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.updsuccess'),
            })
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })

      },
      changeOne() {
        const t = this
        if (t.id !== '') {
          t.form.id = t.id
        }
        if (t.form.remindStatime === '') {
          t.form.remindStatime = new Date().format('yyyy-MM-dd hh:mm:ss')
        }
        if (t.form.remindStoptime === '') {
          t.form.remindStoptime = new Date().format('yyyy-MM-dd hh:mm:ss')
        }
        if (t.repeat.remindRepeatstop !== '' && typeof t.repeat.remindRepeatstop === 'object') {
          t.repeat.remindRepeatstop = t.repeat.remindRepeatstop.format('yyyy-MM-dd')
        }

        let data = Object.assign(t.form, t.repeat)
        for (let o in data) {
          if (data[o] === '') {
            delete data[o]
          }
        }
        data.remindRepeatweek = data.remindRepeatweek.join(',')
        data.remindMasterSlave = 2
        getDataLevelUserLogin({
          _mt: 'cmutReminds.addOrUpd',
          logType: '新增或更新',
          data: JSON.stringify(data),
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.isAll = false
            this.closeMain()
            Bus.$emit('calenderGetData')
            this.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.updsuccess'),
            })
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })

      },
      reset() {
        this.thisDateTime = this.dateTime
        this.empArr = []
        this.file = {
          name: '',
          url: '',
        },
          this.repeat.remindRepeatweek = []
        // this.form = {
        this.form.remindTitle = ''
        this.form.remindStatime = '' // 开始时间
        this.form.remindStoptime = ''	// 结束时间
        this.form.remindNote = ''	// 备注
        this.form.remindAdvance = 'minutetype'	// 提前时间(天，小时分钟)
        this.form.remindAdvanceNum = 15	// 提前时间(数字)
        this.form.remindMemid = ''	// 参与成员
        this.form.remindPlace = ''	// 地点
        this.form.remindFiledesc = ''	// 附件描述
        this.form.remindFile = ''
        this.form.remindPlat = this.$store.state.user.roleType
        this.form.remindType = '0root'

        this.repeat.remindRepeattype = 'repeatweekly'
        this.repeat.remindRepeatnum = 1
        // this.repeat.remindRepeatweek = ''
        this.repeat.remindRepeatstop = ''
        this.repeat.remindRepeatcount = 1
        this.repeat.remindRepeatstoptype = 'enddatefrequency'
        // }
      },
      reset2() {
        if (this.typeShow) {
          if (!this.sureRepeat) {
            this.repeat.remindRepeatweek = []
            this.repeat.remindRepeattype = 'repeatweekly'
            this.repeat.remindRepeatnum = 1
            // this.repeat.remindRepeatweek = ''
            this.repeat.remindRepeatstop = ''
            this.repeat.remindRepeatcount = 1
            this.repeat.remindRepeatstoptype = 'enddatefrequency'
          }
        }
        this.sureRepeat = false
      },
      close1() {
        this.isAll = false
      },
      close2() {
        this.isAllDelete = false
      }
    },
    watch: {
      repeat: {
        deep: true,
        handler: function (value) {
          switch (value.remindRepeattype) {
            case 'repeateveryday':
              this.repeatTypep = '天'
              break
            case 'repeatweekly':
              this.repeatTypep = '周'
              break
            case 'repeatmonthly':
              this.repeatTypep = '月'
              break
          }
        },
      },
    }
  }

</script>
<style>
  .ivu-modal-mask {
    z-index: 10000;
  }

  .ivu-modal-wrap {
    z-index: 10000;
  }
</style>
<style scoped lang="scss">

  .new {
    padding: 0 20px;
  }

  .fileinput {
    display: none;
  }

  .filelabel {
    margin-right: 10px;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    padding: 0px 10px;
    background: #2d8cf0;
    border: 1px solid #2d8cf0;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    font-size: 12px;
    text-align: center;
    transition: all .2s;
    :hover {
      background: #5cadff;
      border: 1px solid #5cadff;
      transition: all .2s;
    }
  }
</style>
