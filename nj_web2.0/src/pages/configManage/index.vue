<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>&nbsp;
          {{$t('lang_role.suvadmin.title')}}
        </p>
        <Row>
          <Input v-model="infoCode" :placeholder="$t('lang_role.suvadmin.infoCode')" @on-enter="enterEvent" style="width:200px;"></Input>
          <Select v-model="infoType" :placeholder="$t('lang_role.suvadmin.infoType')" style="width:200px" clearable>
            <Option v-for="(item, index) in emailType" :value="item.paramCode" :key="index">{{ item.paramInfoName }}
            </Option>
          </Select>
          <Input v-model="infoTitle" :placeholder="$t('lang_role.suvadmin.infoTitle')" @on-enter="enterEvent" style="width:200px;"></Input>
          <span style="margin-left: 20px;"><Button type="primary" icon="search"
                                                   @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form" style="margin:16px 0;">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" size="small" border ref="selection" :columns="columns" :data="dataInfo"
                 :height="tableheight"></Table>
        </row>
        <Row style="display: flex">
          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
                @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <!-- 新增页面 -->
      <addData ref="addData" v-if="showAddData" @closeAdd="closeAdd" :id="updateId" :index="index" :logType="logType"
               @getData="addNewArray" @update="updateArray" :emailType="emailType" :ansType="ansType"></addData>
    </transition>
    <transition name="fade">
      <revise ref="revise" v-if="showRevise" @closeRes="closeRes" :logType="logType" :id="updateId" :index="index"
              :researchMes="researchMes" @update="updateArray" :ansType="ansType"></revise>
    </transition>
    <transition name="fade">
      <preview ref="preview" v-if="showPreview" @closeView="closeView" :platId="platId" :platStyle="platStyle"
               :platContent="platContent"></preview>
    </transition>
  </div>
</template>

<script>
  import addData from './addData' //  新增页面
  import revise from './revise'   //  修改页面
  import preview from './preview' //  预览页面
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess} from '../../lib/util'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 290,
        infoCode: '',    //  调查编号
        infoType: '',   //  样式
        infoTitle: '',  //  调查信息标题
        total: NaN, // 总页数,
        sort: 'id',
        order: 'asc',
        rows: '10',
        page: '1',
        columns: [
          {
            type: 'selection',
            width: 54,
            fixed: 'left',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvCode'),
            key: 'platSuvCode',
            width: 200,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvTitle'),
            key: 'platSuvTitle',
            width: 200,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvSubtitle'),
            key: 'platSuvSubtitle',
            width: 200,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvStyleDis'),
            key: 'platSuvStyleDis',
            width: 200,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvTo'),
            key: 'platSuvTo',
            width: 200,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvScoringDis'),
            key: 'platSuvScoringDis',
            width: 100,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvGentime'),
            key: 'platSuvGentime',
            width: 120,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvSuggestDis'),
            key: 'platSuvSuggestDis',
            width: 180,
            sortable: 'custom',
          },
          // {
          //     title: '选项说明',
          //     key: 'platSuvOptdesc',
          //     width: 120,
          // },
          {
            title: this.$t('lang_role.suvadmin.platSuvDiscontDis'),
            key: 'platSuvDiscontDis',
            width: 120,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSuvLinkname'),
            key: 'platSuvLinkname',
            width: 200,
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 120,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                  },
                  on: {
                    click: () => {
                      this.preView(params.row, this.$t('lang_role.suvadmin.preView'))
                    },
                  },
                }, this.$t('lang_role.suvadmin.preView')),
              ])
            },
          },
        ],
        dataInfo: [],
        showAddData: false,         //  显示新增页面
        showPreview: false,         //  显示预览页面
        logType: '',
        updateId: NaN,
        index: 0,
        selectedArr: [],            //  存放选中数据id
        updateArr: [],              //  存放选中数据
        showRevise: false,          //  修改页面
        emailType: [],              //  存放邮件样式
        ansType: [],                //  存放答案类型
        researchMes: {},            //  调查信息
        platStyle: '',              //  预览时的样式
        platId: '',                 //  预览时id
        platContent: '',            //  预览时正文
      }
    },
    components: {
      addData,
      revise,
      preview,
    },
    mounted() {
      this.getData(1)
      this.getSelect()
    },
    methods: {
			//enter事件
			enterEvent (e) {
			        this.getData(1)
			},
      getSelect() {
        const t = this
        getDataLevelUserLogin2({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'p_suvmodel,answertyp',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.emailType = res.data.content[0].value[0].paramList
            t.ansType = res.data.content[0].value[1].paramList
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
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platSurvery.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: this.$t('button.ser'),
          platSuvCode: t.infoCode,
          platSuvStyle: t.infoType,
          platSuvTitle: t.infoTitle,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.dataInfo = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.selectedArr = newArr.toString()
        // console.log(this.selectedArr)
        this.updateArr = selection
      },
      // 排序
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
        }
      },  // 排序------------------------------------
      // 新增
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.index = index
        if (logType === this.$t('button.upd')) {
          getDataLevelUserLogin({
            _mt: 'platSurvery.getById',
            id: id,
            logType: '修改',
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.researchMes = res.data.content[0]
              t.showRevise = true
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        } else {
          t.showAddData = true
          // t.$refs.addData.choseType = true
        }
      },  // 新增------------------------------------
      // 关闭新增页面
      closeAdd() {
        this.showAddData = false
      },
      //  删除
      deletemsg() {
        const t = this
        if (t.updateArr.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              const data = {
                _mt: 'platSurvery.delByIds',
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
      },  //  删除-----------------------------------
      // 分页
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },  // 分页------------------------------------
      addNewArray(resp) {
        const t = this
        if (t.dataInfo.length === 0) {
          t.dataInfo.push(resp)
        } else {
          t.dataInfo.unshift(resp)
        }
        t.getData()
      },
      updateArray(res) {
        const t = this
        t.dataInfo.splice(t.index, 1, res)
      },
      closeRes() {
        this.showRevise = false
      },
      preView(row, logType) {
        const t = this
        t.platStyle = row.platSuvStyle
        t.platId = row.id
        t.platContent = row.platSuvContent
        this.showPreview = true
      },
      closeView() {
        this.showPreview = false
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>
