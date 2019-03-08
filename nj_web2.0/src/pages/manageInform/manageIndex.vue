<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>&nbsp;{{$t('lang_role.cmutnotic.title')}}
        </p>
        <Row>
          <Select v-model="optModel" clearable style="width:200px">
            <Option v-for="(item, index) in noticeType" :value="item.paramCode" :key="index">{{ item.paramInfoCn }}
            </Option>
          </Select>
          <Input v-model="infoTitle" :placeholder="$t('lang_role.cmutnotic.infoTitle')" style="width:200px;"></Input>
          <Dropdown>
            <Button type="primary">
              {{statusDis}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <span v-for="(item,index) in dropdownMenuList" :key="index"
                    @click="getPageByState(item.paramCode,item.paramInfoCn)">
                <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;"><Button type="primary" icon="search"
                                           @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" v-show="flowStatus === '' || flowStatus === '01draft'"
                  @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}
          </Button>
          <Button type="primary" v-show="flowStatus === '02valid'" @click="modifystatu('01draft')">{{$t('lang_user.rootuser.draft')}}</Button>
          <Button type="success" v-show="flowStatus === '01draft' || flowStatus === '03invalid'"
                  @click="modifystatu('02valid')">{{$t('lang_user.rootuser.valid')}}
          </Button>
          <Button type="error" v-show="flowStatus === '02valid'" @click="modifystatu('03invalid')">{{$t('lang_user.rootuser.invalid')}}</Button>
          <Button type="error" v-show="flowStatus === '01draft' || flowStatus === '03invalid'" @click="deletemsg">
            {{$t('button.del')}}
          </Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" size="small" border ref="selection" :columns="columns" :data="comInfo"
                 :height="tableheight"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange"
                @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <!-- 新增页面 -->
      <addInform v-show="showAdd" ref="addInform" @closeUp="closeUp" :selectType="noticeType" @getData="addNewArray"
                 :id="updateId" :logType="logType" :index="index" @update="updateArray"></addInform>
    </transition>
  </div>
</template>

<script>
  import addInform from './addInform'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess} from '../../lib/util'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        optModel: '',   //  通知类型
        noticeType: [],
        infoTitle: '',  // 选择类型
        showAdd: false,  //  控制新增页面显示
        flowStatus: '02valid',
        statusDis: this.$t('lang_user.rootuser.valid'),
        dropdownMenuList: [],
        comInfo: [],
        total: NaN, // 总页数
        companyId: 1,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        select: this.$t('lang_user.rootuser.valid'),
        columns: [
          {
            type: 'selection',
            width: 54,
          },
          {
            title: this.$t('lang_role.cmutnotic.cmutNoticeTitle'),
            key: 'cmutNoticeTitle',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.cmutnotic.cmutNoticeTypeDis'),
            key: 'cmutNoticeTypeDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.cmutnotic.cmutNoticePublish'),
            key: 'cmutNoticePublish',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.cmutnotic.cmutNoticeLosttime'),
            key: 'cmutNoticeLosttime',
          },
          {
            title: this.$t('lang_role.cmutnotic.cmutNoticeStateDis'),
            key: 'cmutNoticeStateDis',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 75,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    display: params.row.cmutNoticeState === '01draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'))
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    display: params.row.cmutNoticeState !== '01draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        selectedArr: [],  //  存放选中的值
        updateArr: [],
        updateId: NaN,
        logType: '',
        index: 0,
        chData: '',
        eakeEffect: 0,
        eakeinvalid: 1,
      }
    },
    components: {
      addInform,
    },
    mounted() {
      this.getSelect()
      this.getData(1)
    },
    methods: {
      // 获取参数类型
      getSelect() {
        const t = this
        getDataLevelUserLogin2({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'noticetype,pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.noticeType = res.data.content[0].value[0].paramList
            t.dropdownMenuList = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          _mt: 'cmutNotic.getPage',
          cmutNoticeState: t.flowStatus,
          cmutNoticeType: t.optModel,
          cmutNoticeTitle: t.infoTitle,
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: this.$t('button.ser'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.comInfo = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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
      // 已选中数据
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.selectedArr = newArr.toString()
        this.updateArr = selection
      },  // 已选中数据----------------------------------
      // 新增数据
      openUp(id, logType, index) {
        const t = this
        t.select = this.$t('lang_user.rootuser.draft')
//        t.flowStatus = '01draft'
//        t.eakeEffect = 1
//        t.eakeinvalid = 0
//        t.getData(1)
        t.showAdd = true
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.index = index
        if (logType === this.$t('button.upd') || logType === this.$t('button.view')) {
          t.$refs.addInform.upData(id)
        }
      },  // 新增数据--------------------------------
      //  删除数据
      deletemsg() {
        const t = this
        if (t.updateArr.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              const data = {
                _mt: 'cmutNotic.delByIds',
                logType: this.$t('button.del'),
                delIds: t.selectedArr,
              }
              for (const dat in data) {
                if (data[dat] === '') {
                  delete data[dat]
                }
              }
              getDataLevelUserLogin(data).then((res) => {
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
          })
        }
      },  //  删除数据-----------------------------------
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
        }
      },
      penUpdate() {

      },
      closeUp() {
        const t = this
        t.showAdd = false
      },
      addNewArray(res) {
        const t = this
        if (t.comInfo.length === 0) {
          t.comInfo.push(res)
        } else {
          t.comInfo.unshift(res)
        }
      },
      flowchart() {

      },
      close() {

      },
      openUpdate() {

      },
      updateArray(res) {
        const t = this
        t.comInfo.splice(t.index, 1, res)
      },
      /**
       * 状态的更改
       * @param paramCode
       * @param paramInfoName
       */
      getPageByState(paramCode, paramInfoCn) {
        const t = this
        if (paramCode === '00all') {
          t.flowStatus = ''
        } else {
          t.flowStatus = paramCode
        }
        t.getData(1)
        t.statusDis = paramInfoCn
      },
      modifystatu(state) {
        const t = this
        let logType = ''
        if (state === '02valid') {
          logType = this.$t('lang_user.rootuser.valid')
        } else {
          logType = this.$t('lang_user.rootuser.invalid')
        }
        if (t.updateArr.length === 0) {
          t.$Modal.error({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
          return
        }
        getDataLevelUserLogin({
          _mt: 'cmutNotic.setNoticesInvalid',
          logType: logType,
          noticeState: state,
          ids: t.selectedArr,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getData(1)
            t.updateArr = []
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.submitsuccess'),
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }
</style>
