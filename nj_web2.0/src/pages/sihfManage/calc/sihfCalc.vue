<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_sihfCalc.sihfCalc.title')}}
        </p>
        <Row>
          <span @dblclick="clearPeriod">
            <Input @on-click="pickDataPeriod" icon="search" :readonly="true"
                   :placeholder="$t('lang_sihfCalc.sihfCalc.sicalcPeriod')"
                   style="width: 200px" v-model="sicalcPeriodDis"/>
          </span>
          <span @dblclick="clearBfarea">
            <Input @on-click="pickDataBfarea" icon="search" :readonly="true"
                   :placeholder="$t('lang_sihfCalc.sihfCalc.sicalcBfarea')"
                   style="width: 200px" v-model="sicalcBfareaDis"/>
          </span>
          <!--<span @dblclick="clearBfarea">-->
          <!--<Select v-model="formValidate.funStyle"  placeholder="选择功能节点标识" :transfer="true">-->
          <!--<Option :value="item.paramCode" v-for="(item,index) in selectFunStyle" key="index">{{item.paramInfoName}}</Option>-->
          <!--</Select>-->
          <!--</span>-->
          <Dropdown>
            <Button type="primary">
              {{select}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <span @click="selected('all',$t('button.all'))">
                  <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                </span>
              <span v-for="(item,index) in calcround" :key="index" @click="selected(item.paramCode,item.paramInfoName)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;">
            <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
          </span>
          <Button v-show="openStateAdd" type="primary" @click="openUp('',$t('button.add'),0)">{{$t('button.add')}}
          </Button>
          <Button v-show="openStateSub" type="primary" @click="submit('03ToBeConfirmed')">{{$t('button.submConfirm')}}
          </Button>
          <Button v-show="openStateCon" type="primary" @click="submit('04confirmed')">{{$t('button.confirm')}}</Button>
          <Button v-show="openStateCon" type="primary" @click="submit('02accounting')">{{$t('button.back')}}</Button>
          <Button v-show="this.sicalcStatus === '02accounting'? true:false" type="error" @click="deletemsg">
            {{$t('button.del')}}
          </Button>
          <Button v-show="this.sicalcStatus === '04confirmed' && this.sicalcRound === '90final' ? true:false"
                  type="primary" @click="submit('05alreadySealed')">{{$t('button.sealAccount')}}
          </Button>
        </Row>
        <Row>
          <RadioGroup v-model="sicalcStatus" v-for="(item,index) in calculation" :key="index" style="margin-top: 5px"
                      @on-change="getPageByState(index,item.paramInfoName)">
            <Radio :label="item.paramCode">{{item.paramInfoCn}}</Radio>
          </RadioGroup>
        </Row>
        <row class="table-form1" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small"
                 border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="closeUp" ref="update" @getData="addNewArray" @update="updateArray"></update>
    </transition>
    <transition name="fade">
      <searchFyperiod v-show="openPickPeriod" @closeUp="closePeriod" @changeinput="changeinputPeriod"
                      ref="searchFyperiod"></searchFyperiod>
    </transition>
    <transition name="fade">
      <searchArea v-show="openPickBfarea" @closeUp="closeBfarea" @changeinput="changeinputBfarea"
                  ref="searchArea"></searchArea>
    </transition>
  </div>
</template>
<script>
  import update from './calcBase'
  //  import update from './editCalc.vue'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess} from '../../../lib/util'
  import searchFyperiod from '../../../components/searchTable/searchFyperiod'
  import searchArea from '../../../components/searchTable/searchArea'
  import Bus from '../../.././lib/bus'

  export default {

    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        paramName: '',
        openStateAdd: true,
        openStateSub: false,
        openStateCon: false,
        openUpdate: false,
        openPickPeriod: false,
        openPickBfarea: false,
        updateId: NaN,
        select: this.$t('button.all'),
        calcround: [],
        calculation: [],//核算状态
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_sihfCalc.sihfCalc.sicalcPeriod'),
            key: 'sicalcPeriodDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sihfCalc.sihfCalc.sicalcBfarea'),
            key: 'sicalcBfareaDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sihfCalc.sihfCalc.sicalcRound'),
            key: 'sicalcRoundDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sihfCalc.sihfCalc.sicalcPersttamt'),
            key: 'sicalcPersttamt',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sihfCalc.sihfCalc.sicalcCompttamt'),
            key: 'sicalcCompttamt',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sihfCalc.sihfCalc.sicalcTtamt'),
            key: 'sicalcTtamt',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sihfCalc.sihfCalc.sicalcStatus'),
            key: 'sicalcStatusDis',
            width: 100,
            fixed: 'right',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 170,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    disabled: this.check === '1' ? false : true,
                  },
                  style: {
                    marginLeft: '5px',
                    display: this.sicalcStatus === '02accounting' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.countSihfCalc(params.row, this.$t('lang_sihfCalc.sihfCalc.btn_count'))
                    },
                  },
                }, this.$t('lang_sihfCalc.sihfCalc.btn_count')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
//                    display: params.row.sicalcRound == '90final' && this.sicalcStatus == '04confirmed' ?'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.detail(params.row, this.$t('button.det'), params.index)
                    },
                  },
                }, this.$t('button.det')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: '10',
        page: 1,
        sicalcPeriod: '',
        sicalcPeriodDis: '',
        sicalcBfarea: '',
        sicalcBfareaDis: '',
        sicalcRound: '',
        sicalcStatus: '01all',
        redisKey: '',
        jobueueId: '',
        comp: '',
        check: '0',
        Sealing: '0',
        isSend: false,
      }
    },
    computed: {},
    components: {
      update,
      searchFyperiod,
      searchArea,
    },
    mounted() {
      this.getData(1)
      this.getSelect()
      this.initSetState()
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'sihfCalc.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: '查询List',
          sicalcPeriod: t.sicalcPeriod,
          sicalcBfarea: t.sicalcBfarea,
          sicalcRound: t.sicalcRound,
          sicalcStatus: t.sicalcStatus,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      initSetState() {
        this.$store.commit('calcJsBase/setStatus', '01all')
      },
      getPageByState(index, message) {
        const t = this
        this.$store.commit('calcJsBase/setStatus', t.sicalcStatus)
        if (t.sicalcStatus === '02accounting') {
          t.openStateAdd = true
          t.openStateSub = true
          t.openStateCon = false
        } else if (t.sicalcStatus === '03ToBeConfirmed') {
          t.openStateSub = false
          t.openStateAdd = false
          t.openStateCon = true
        } else if (t.sicalcStatus === '04confirmed') {
          t.openStateCon = false
          t.openStateAdd = false
          t.openStateSub = false
        } else if (t.sicalcStatus === '01all') {
          t.openStateAdd = true
          t.openStateCon = false
          t.openStateSub = false
        }

        if (message === '核算中') {
          t.check = '1'
        } else {
          t.check = '0'
        }
        if (message === '已确认') {
          t.Sealing = '1'
        } else {
          t.Sealing = '0'
        }
        t.getData()
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        }
      },
      pickData() {
        this.$refs.searchCompany.getData()
        this.openPick = true
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(row, logType, index) {
        const t = this
        t.openUpdate = true
        this.$store.commit('calcJsBase/setIndex', index)
        if (row.id) {
          // 将本条数据的id传入mainid（如果有的话）
          this.$store.commit('calcJsBase/setMainId', row.id)
          this.$store.commit('calcJsBase/setDataType', 'change')
          t.$refs.update.getOptionData(row)
        } else {
          this.$store.commit('calcJsBase/setDataType', 'add')
        }
        t.$refs.update.getOption(logType)
      },
      detail(row, logType, index) {
        const t = this
        t.openUpdate = true
        this.$store.commit('calcJsBase/setDataType', 'detail')
        // 将本条数据的id传入mainid（如果有的话）
        this.$store.commit('calcJsBase/setMainId', row.id)
        this.$store.commit('calcJsBase/setIndex', index)
        if (row.id) {
          t.$refs.update.getOptionData(row)
          logType = ''
        }
        t.$refs.update.getOption(logType)
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.clear()
        this.$store.commit('calcJsBase/setMainId', '')
        this.$store.commit('calcJsBase/setIndex', 0)
        this.$store.commit('calcJsBase/setGrandId1', '')
        this.$store.commit('calcJsBase/setChildId1', '')
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
        t.openUpdate = false
      },
      updateArray(res) {
        const t = this
        t.index = this.$store.state.calcJsBase.index
        t.data.splice(t.index, 1, res)
      },
      // 核算start
      countSihfCalc(row, logType) {
        const t = this
        const data = {
          _mt: 'sihfCalc.addComputeCalc',
          logType: '查询List',
          sicalcStatus: t.sicalcStatus,
          sicalcBfarea: row.sicalcBfarea,
          id: row.id,
          sicalcPeriod: row.sicalcPeriod,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.comp = window.setInterval(t.countSihfCalcState, 1000)

            t.jobQueueId = res.data.content[0].jobQueueId
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '系统正在进行社保核算，请稍后。。。',
              onOk: () => {
                t.isSend = true
                clearInterval(t.comp)
              },
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        // 开启定时任务
      },
      countSihfCalcState() {
        const t = this
        clearInterval(t.comp)
        getDataLevelUserLogin({
          _mt: 'userJobQueue.compStatusQuery',
          jobueueId: t.jobQueueId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].status !== '100') {
              setTimeout(() => {
                if (!t.isSend) {
                  t.countSihfCalcState()
                } else {
                  t.isSend = false
                }
              }, 1000)
            } else {
              t.isSend = false
              clearInterval(t.comp)
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.suc'),
                onOk: () => {
                  t.isSend = false
                },
              })
            }
          } else {
            clearInterval(t.comp)
          }
        }).catch(() => {
          clearInterval(t.comp)
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 核算end
      // 期间弹出框start
      clearPeriod() {
        const t = this
        t.sicalcPeriodDis = ''
        t.sicalcPeriod = ''
      },
      pickDataPeriod() {
        const t = this
        this.$refs.searchFyperiod.getData()
        this.openPickPeriod = true
      },
      closePeriod() {
        const t = this
        t.openPickPeriod = false
      },
      changeinputPeriod(row) {
        const t = this
        t.sicalcPeriodDis = row.fypdPeriod
        t.sicalcPeriod = row.id
      },
      // 期间弹出框end
      // 区域弹出框start
      clearBfarea() {
        const t = this
        t.sicalcBfareaDis = ''
        t.sicalcBfarea = ''
      },
      pickDataBfarea() {
        const t = this
        this.$refs.searchArea.getData()
        this.openPickBfarea = true
      },
      closeBfarea() {
        const t = this
        t.openPickBfarea = false
      },
      changeinputBfarea(row) {
        const t = this
        t.sicalcBfareaDis = row.bfareaCname
        t.sicalcBfarea = row.id
      },
      // 区域弹出框end
      submit(status) {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: '请确定提交？',
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'sihfCalc.updStatus',
                logType: '申请提交',
                ids: t.tableselected,
                status: status,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData(1)
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {
            },
          })
        }
      },
      selected(key, name) {
        if ('all' === key) {
          this.sicalcRound = ''
        } else {
          this.sicalcRound = key
        }
        this.select = name
        this.getData(1)
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: '请确认删除选中数据？',
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'sihfCalc.delByIds',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData(1)
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
          })
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'calcround,calculation',
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.$store.commit('calcJsBase/setCalcround', res.data.content[0].value[0].paramList)
            t.calcround = res.data.content[0].value[0].paramList
            t.calculation = res.data.content[0].value[1].paramList

          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .margin-right-10 {
    margin-right: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
