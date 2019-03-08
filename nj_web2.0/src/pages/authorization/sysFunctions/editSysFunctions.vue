<template>
  <div class="cover">
    <div class="box" style="height: 550px;">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Tabs @on-click="getBtnData" v-model="name">
        <TabPane :label="$t('lang_role.adminfun.TabPane')" name="sys1">
          <Form class="tab-box" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
            <Row>
              <Col span="11">
              <FormItem :label="$t('lang_role.adminfun.funCode')" prop="funCode" :label-width="135">
                <Input v-model="formValidate.funCode" :placeholder="$t('lang_role.adminfun.pfunCode')"
                       ></Input>
              </FormItem>

              </Col>
              <Col span="11" offset="1">
              <FormItem :label="$t('lang_role.adminfun.funLancodeDis')" prop="funLancode" :label-width="135">
              <span @dblclick="clearDub">
              <Input v-model="funLancodeDis" icon="search" :placeholder="$t('lang_role.adminfun.pfunLancodeDis')"
                     :readonly="true"
                     @on-click="pickData2"/>
            </span>
              </FormItem>
              </Col>
              <Col span="11">
              <FormItem :label="$t('lang_role.adminfun.funTypeDis')" prop="funType" :label-width="135">
                <Select v-model="formValidate.funType" :placeholder="$t('lang_role.adminfun.funType')"
                        :transfer="true">
                  <Option :value="item.paramCode" v-for="(item,index) in selectPlatform" :key="index">
                    {{item.paramInfoCn}}
                  </Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="11" offset="1">
              <FormItem :label="$t('lang_role.adminfun.funPidDis')" prop="funPid" :label-width="135">
            <span @dblclick="clear">
              <Input v-model="funPidDis" icon="search" :placeholder="$t('lang_role.adminfun.pfunPidDis')"
                     :readonly="true"  @on-click="pickData"/>
            </span>
              </FormItem>
              </Col>
              <Col span="23">
              <FormItem :label="$t('lang_role.adminfun.ppfunAction')" prop="funAction" :label-width="135">
                <Input v-model="formValidate.funAction" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       :placeholder="$t('lang_role.adminfun.pfunAction')"></Input>
              </FormItem>
              </Col>
              <Col span="11">
              <FormItem :label="$t('lang_role.adminfun.funStyle')" prop="funStyle" :label-width="135">
                <Select v-model="formValidate.funStyle" :placeholder="$t('lang_role.adminfun.pfunStyle')"
                        :transfer="true">
                  <Option :value="item.paramCode" v-for="(item,index) in selectFunStyle" :key="index">
                    {{item.paramInfoCn}}
                  </Option>
                </Select>
              </FormItem>
              </Col>

              <Col span="11" offset="1">
              <FormItem :label="$t('lang_role.adminfun.funIsctrlbtn')" prop="funIsctrlbtn" :label-width="135">
                <RadioGroup v-model="formValidate.funIsctrlbtn">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
              <Col span="11">
              <FormItem :label="$t('lang_role.adminfun.funImg')" :label-width="135">
                <Input v-model="formValidate.funImg" :placeholder="$t('lang_role.adminfun.pfunImg')"
                      ></Input>
              </FormItem>
              </Col>
              <Col span="11" offset="1">
              <FormItem :label="$t('lang_role.adminfun.funIsrpt')" prop="funIsrpt" :label-width="135">
                <RadioGroup v-model="formValidate.funIsrpt">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
                </RadioGroup>
              </FormItem>

              </Col>
              <Col span="11">
              <FormItem :label="$t('lang_role.adminfun.validDis')" prop="valid" :label-width="135">
                <RadioGroup v-model="formValidate.valid">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
              <Col span="11" offset="1">
              <FormItem :label="$t('lang_role.adminfun.funIsprocess')" prop="funIsprocess" :label-width="135">
                <RadioGroup v-model="formValidate.funIsprocess">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
                </RadioGroup>
              </FormItem>

              </Col>
              <Col span="11" v-show="formValidate.funIsprocess ==='1' ? true : false"
                   :offset="formValidate.funIsprocess ==='1' ? 0:1">
              <FormItem :label="$t('lang_role.adminfun.funProcesid')" prop="funProcesid" :label-width="135">
                 <span @dblclick="clearDub3">
                    <Input v-model="funProcesidDis" icon="search" :readonly="true"
                           :placeholder="$t('lang_role.adminfun.pfunProcesid')"
                           @on-click="pickData4"/>
                  </span>
              </FormItem>

              </Col>
              <Col span="11" :offset="formValidate.funIsprocess ==='0' ? 0 : 0"
                   v-show="formValidate.funIsprocess ==='1' ? false : true">
              <FormItem :label="$t('lang_role.adminfun.funIsform')" prop="funIsform" :label-width="135">
                <RadioGroup v-model="formValidate.funIsform">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
              <Col span="11" :offset="formValidate.funIsprocess ==='0' && formValidate.funIsform ==='1'   ? 1 : 0 "
                   v-show="formValidate.funIsprocess ==='0' && formValidate.funIsform ==='1' ? true : false">
              <FormItem :label="$t('lang_role.adminfun.funIsctrlfield')" prop="funIsctrlfield" :label-width="135">
                <RadioGroup v-model="formValidate.funIsctrlfield">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
              <Col span="11" :offset="formValidate.funIsprocess ==='0' && formValidate.funIsform ==='1'   ? 0 : 1 "
                   v-show="formValidate.funIsprocess ==='0' && formValidate.funIsform ==='1' ? true : false">
              <FormItem :label="$t('lang_role.adminfun.funFormtype')" prop="funStyle" :label-width="135">
                <Select v-model="formValidate.funFormtype" transfer :placeholder="$t('lang_role.adminfun.pfunFormtype')"
                       clearable>
                  <Option :value="item.paramCode" v-for="(item,index) in selectFormtype" :key="index">
                    {{item.paramInfoCn}}
                  </Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="11" :offset="formValidate.funIsprocess ==='0' && formValidate.funIsform ==='1'   ? 1 : 0 "
                   v-show="formValidate.funIsprocess ==='0' && formValidate.funIsform ==='1' ? true : false">
              <FormItem :label="$t('lang_role.adminfun.funForm')" prop="funForm" :label-width="135">
                 <span @dblclick="clearDub2">
                    <Input v-model="funFormDis" icon="search" :readonly="true"
                           :placeholder="$t('lang_role.adminfun.pfunForm')"
                           @on-click="pickData3"/>
                  </span>
              </FormItem>
              </Col>
              <Col span="11"
                   :offset="formValidate.valid ==='0' && formValidate.funIsprocess ==='0' && formValidate.funIsform ==='1'   ? 0 : 1 "
                   v-show="formValidate.valid !=='1'">
              <FormItem :label="$t('lang_role.adminfun.invdate')" prop="invdate" :label-width="135">
                <DatePicker type="date"  :placeholder="$t('lang_role.adminfun.pinvdate')"
                            :editable="false" v-model="formValidate.invdate"
                            :transfer="true" style="width: 100%"></DatePicker>
              </FormItem>
              </Col>
              <Col span="23" v-show="formValidate.valid !=='1'">
              <FormItem :label="$t('lang_role.adminfun.invreason')" prop="invreason" :label-width="135">
                <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       :placeholder="$t('lang_role.adminfun.pinvreason')" ></Input>
              </FormItem>
              </Col>
              <Col span="23">
              <FormItem :label="$t('lang_role.adminpmtype.comment')" prop="comment" :label-width="135">
                <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       :placeholder="$t('lang_role.adminpmtype.pcomment')" ></Input>
              </FormItem>
              </Col>
            </Row>
          </Form>
          <div class="tab-btn">
            <Button type="ghost" @click="handleReset" style="margin-ri: 8px">{{$t('button.cal')}}</Button>
            <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
          </div>
        </TabPane>
        <TabPane :label="$t('lang_role.adminfun.TabPane2')" name="sys2" :disabled="tabsDisable">
          <Row style="margin-bottom: 10px;">
            <Button type="primary" @click="transfer">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsgBtu">{{$t('button.del')}}</Button>
          </Row>
          <row style="margin-bottom: 10px;" ref="table-form">
            <Table @on-sort-change="sortable" @on-selection-change="selectedtable" height="350" size="small" border
                   ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
            <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                  @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
            <Button type="ghost" size="small" shape="circle" icon="refresh"
                    style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
          </Row>
        </TabPane>
      </Tabs>

    </div>
    <transition name="fade">
      <searchTable v-show="openPick" @closeUp="close" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
    <transition name="fade">
      <sysSeaTable v-show="openPick2" :searchText="searchText2" :searchCloumns="searchCloumns2" :params="params2"
                   @closeUp="close" @changeinput="changeinput2" ref="sysSeaTable"></sysSeaTable>
    </transition>
    <transition name="fade">
      <searchTable2 v-show="openPick3" @closeUp="close" @changeinput="changeinput3" ref="searchTable2"></searchTable2>
    </transition>
    <transition name="fade">
      <searchTable3 v-show="openPick4" :searchText="searchText4" :searchCloumns="searchCloumns4" :params="params4"
                    @closeUp="close" @changeinput="changeinput4" ref="searchTable3"></searchTable3>
    </transition>
    <transition name="fade">
      <transfer v-show="openTransfer" @closeTransfer="closeTransfer" :id="id" ref="transfer"
                @getBtnData="getBtnData"></transfer>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchPubFun'
  import searchTable2 from '../../../components/searchTable/searchPubTab'
  import searchTable3 from '../../../components/searchTable/searchBaseBak'
  import sysSeaTable from '../../../components/searchTable/sysSeaTable'
  import transfer from './transfer'
  import {isSuccess, deepCopy} from '../../../lib/util'


  export default {
    data() {
      const validate = (rule, value, callback) => {
        if (value === undefined && this.formValidate.valid !== '1') {
          callback(new Error('Please enter your password'))
        } else {
          callback()
        }
      }
      return {
        name: 'sys1',
        tableselected: [],
        selectFormtype: [],
        radioYesOrNo: [],
        selectPlatform: [],
        selectFunStyle: [],
        showIsprocess: true,
        showIsprocess2: false,
        showIsprocess3: false,
        offsetVal: '0',
        offsetStepCheck: '1',
        offsetVal2: '1',
        openPick: false,
        openPick2: false,
        openPick3: false,
        openPick4: false,
        openTransfer: false,
        offsetVal3: '',
        funPidDis: '',
        funLancodeDis: '',
        funProcesidDis: '',
        funFormDis: '',
        tabsDisable: true,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminfun.btnOrder'),
            key: 'btnOrder',
            sortable: 'custom',
//          width: 253,
          },
          {
            title: this.$t('lang_role.adminfun.btnLanCn'),
            key: 'btnLanCn',
            sortable: 'custom',
//          width: 253,
          },
          {
            title: this.$t('lang_role.adminfun.btnLanCnEn'),
            key: 'btnLanCnEn',
            sortable: 'custom',
//          width: 253,
          },
        ],
        data: [],
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        total: NaN,
        formValidate: {
          _mt: 'sysFunctions.addOrUpdSysFunctions',
          funCode: '',
          funType: '',
          funLancode: '',
          funPid: '',
          funAction: '',
          funStyle: '',
          funFormtype: '',
          funIsform: '1',
          funIsctrlbtn: '0',
          funIsrpt: '0',
          funIsprocess: '1',
          valid: '1',
          funProcesid: '',
          invdate: '',
          funForm: '',
          invreason: '',
          comment: '',
          funIsctrlfield: '0',
          funImg: '',
        },
        searchText2: this.$t('lang_role.adminfun.searchText2'),
        searchCloumns2: [
          {
            title: this.$t('lang_role.adminfun.lanCn'),
            key: 'lanCn',
            width: 253,
          },
          {
            title: this.$t('lang_role.adminfun.lanCode'),
            key: 'lanCode',
            width: 253,
          },
        ],
        params2: {
          _mt: 'baseLang.selectByBaseLangPageList',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          lanType: 'functions_code',
          logType: '弹出框',
        },
        searchText4: this.$t('lang_role.adminfun.searchText4'),
        searchCloumns4: [
          {
            title: this.$t('lang_role.adminfun.flowName'),
            key: 'flowName',
            width: 150,
            sortable: 'custom',
          },
        ],
        params4: {
          _mt: 'platFlow.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '查询List',
          flowStatus: '02valid',
        },
        ruleValidate: {
          funCode: [
            {required: true, message: this.$t('lang_role.adminfun.pfunCode'), trigger: 'blur'},
          ],
          funType: [
            {required: true, message: this.$t('lang_role.adminfun.funType'), trigger: 'blur'},
          ],
          funLancode: [
            {required: true, message: this.$t('lang_role.adminfun.pfunLancodeDis'), trigger: 'blur'},
          ],
          funStyle: [
            {required: true, message: this.$t('lang_role.adminfun.pfunStyle'), trigger: 'blur'},
          ],
          invdate: [
            {required: true, validator: validate, trigger: 'change'},
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
      searchTable,
      searchTable2,
      searchTable3,
      sysSeaTable,
      transfer,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'sysFunctions.selSysFunctionsByIds',
          ids: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.funCode = res.data.content[0].value[0].funCode
            t.formValidate.funType = res.data.content[0].value[0].funType
            t.formValidate.funPid = res.data.content[0].value[0].funPid
            t.funPidDis = res.data.content[0].value[0].funPidDis
            t.formValidate.funLancode = res.data.content[0].value[0].funLancode
            t.formValidate.funAction = res.data.content[0].value[0].funAction
            t.formValidate.funStyle = res.data.content[0].value[0].funStyle
            t.formValidate.funIsctrlbtn = res.data.content[0].value[0].funIsctrlbtn
            t.formValidate.funIsrpt = res.data.content[0].value[0].funIsrpt
            t.formValidate.funIsprocess = res.data.content[0].value[0].funIsprocess
            t.formValidate.valid = res.data.content[0].value[0].valid
            t.formValidate.funProcesid = res.data.content[0].value[0].funProcesid
            t.formValidate.invdate = res.data.content[0].value[0].invdate
            t.formValidate.invreason = res.data.content[0].value[0].invreason
            t.formValidate.comment = res.data.content[0].value[0].comment
            t.formValidate.funFormtype = res.data.content[0].value[0].funFormtype
            t.formValidate.funForm = res.data.content[0].value[0].funForm
            t.funFormDis = res.data.content[0].value[0].funFormDis
            t.funLancodeDis = res.data.content[0].value[0].funLancodeDis
            t.funProcesidDis = res.data.content[0].value[0].funProcesidDis
            t.formValidate.funImg = res.data.content[0].value[0].funImg
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getBtnData(name) {
        if (name === 0) {
          return
        }
        const t = this
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        getDataLevelUserLogin({
          _mt: 'sysFunbutton.getSysFunbuttonByPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          btnFunid: t.id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].total
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      transfer() {
        this.$refs.transfer.getData()
        this.openTransfer = true
      },
      deletemsgBtu() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          getDataLevelUserLogin({
            _mt: 'sysFunbutton.delByIds',
            logType: this.$t('button.del'),
            delIds: t.tableselected.toString(),
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.getBtnData()
              t.tableselected = []
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      closeTransfer() {
        this.openTransfer = false
      },
      close() {
        const t = this
        t.openPick = false
        t.openPick2 = false
        t.openPick3 = false
        t.openPick4 = false
      },
      clear() {
        const t = this
        t.funPidDis = ''
        t.formValidate.funPid = ''
      },
      closeUpd() {
        const t = this
        t.id = ''
      },
      clearDub() {
        const t = this
        t.funLancodeDis = ''
        t.formValidate.funLancode = ''
      },
      clearDub2() {
        const t = this
        t.funFormDis = ''
        t.formValidate.funForm = ''
      },
      clearDub3() {
        const t = this
        t.funProcesidDis = ''
        t.formValidate.funProcesid = ''
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getBtnData()
        } else {
          this.order = 'desc'
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'bustype,funstyle,yesno,formtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectPlatform = res.data.content[0].value[0].paramList
            t.selectFunStyle = res.data.content[0].value[1].paramList
            t.radioYesOrNo = res.data.content[0].value[2].paramList
            t.selectFormtype = res.data.content[0].value[3].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      tabsSure(id) {
        if (id) {
          this.tabsDisable = false
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType

        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        if (data.funIsprocess === '1') {
          data.funIsform = '0'
        }
        if (data.invdate !== undefined && data.invdate !== '') {
          data.invdate = new Date(data.invdate).format('yyyy-MM-dd')
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        console.log(data)
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
//                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.id = res.data.content[0].id
                  t.tabsSure(t.id)
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      pickData() {
        const t = this
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      pickData2() {
        const t = this
        t.$refs.sysSeaTable.getData(t.params2)
        t.openPick2 = true
      },
      pickData3() {
        const t = this
        t.$refs.searchTable2.getData(t.params3)
        t.openPick3 = true
      },
      pickData4() {
        const t = this
        t.$refs.searchTable3.getData(t.params4)
        t.openPick4 = true
      },
      changeinput(name, id) {
        const t = this
        t.funPidDis = name
        t.formValidate.funPid = id
      },
      changeinput2(name, code) {
        const t = this
        t.funLancodeDis = name
        t.formValidate.funLancode = code
      },
      changeinput3(name, code) {
        const t = this
        t.funFormDis = name
        t.formValidate.funForm = code
      },
      changeinput4(name, code) {
        const t = this
        t.funProcesidDis = name
        t.formValidate.funProcesid = code
      },
      handleReset() {
        this.$emit('closeUp')
      },
//      changeIsprocess() {
//        const t = this
//        if (t.formValidate.funIsprocess === '1') {
//          t.showIsprocess = true
//          t.showIsprocess2 = false
//          t.showIsprocess3 = false
//          t.offsetVal = '0'
//          t.offsetVal2 = '1'
//          t.offsetVal3 = '0'
//          t.formValidate.funIsform = '0'
//        } else {
//          t.showIsprocess = false
//          t.showIsprocess2 = true
//          t.showIsprocess3 = true
//          t.offsetVal = '1'
//          t.offsetVal3 = '1'
//          t.offsetVal2 = '0'
//          t.formValidate.funIsform = '1'
//        }
//      },
//      changeIsprocess2() {
//        const t = this
//        if (t.formValidate.funIsform === '1') {
//          t.showIsprocess3 = true
//          t.offsetVal3 = '1'
//          t.offsetVal = '1'
//        } else {
//          t.showIsprocess3 = false
//          t.offsetVal3 = '0'
//          t.offsetVal = '1'
//        }
//      },
    },
    watch: {},
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";

  .tab-box {
    overflow-y: auto;
    height: 350px;
  }

  .tab-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    height: 50px;
  }
</style>
