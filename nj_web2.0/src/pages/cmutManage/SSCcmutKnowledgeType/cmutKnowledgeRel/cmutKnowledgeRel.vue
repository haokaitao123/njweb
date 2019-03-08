<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_knowBase.knowlegebase.title3')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_knowBase.knowlegebase.cmutKldTitleDis')" style="width: 200px" v-model="cmutKldTitle"/>
          <span style="margin: 0;">
            <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
          </span>
          <Button type="primary" v-show="cmutKldState =='01entry'" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="primary" v-show="cmutKldState == '02confirm' || cmutKldState == '01entry' " @click="submitBtn(1)">{{$t('button.subm')}}</Button>
          <Button type="primary" v-show="cmutKldState == '02confirm'" @click="submitBtn(0)">{{$t('button.back')}}</Button>
          <Button type="error" v-show="cmutKldState == '03released'" @click="submitBtn(1, $t('button.fai'))">{{$t('button.fai')}}</Button>
          <Button type="error" v-show="cmutKldState =='01entry'" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable"@on-sort-change="sortable"   @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :submit="submit" :knowledgeStatus="knowledgeStatus" :Knowauthtype="Knowauthtype" :yesno="yesno" :knowledgeType="knowledgeType" :id="updateId" ref="update" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray"></update>
    </transition>
  </div>
</template>
<script>
  import update from './updCmutKnowledge'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'


  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        dropdownMenuList: [],
        tableselected: [],
        knowledgeStatus: [],
        yesno: [],
        knowledgeType: [],
        Knowauthtype: [], // 知识库权限类型
        submit: true,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKldOrder'),
            key: 'cmutKldOrder',
            sortable: 'custom',
            width: 100,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKldType'),
            key: 'cmutKldTypeDis',
            width: 160,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKldTitle'),
            key: 'cmutKldTitle',
            width: 160,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.publishAuthor'),
            key: 'publishAuthor',
            width: 120,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKldPubcomp'),
            key: 'cmutKldPubcompDis',
            width: 160,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKldAuth'),
            key: 'cmutKldAuthDis',
            width: 120,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKldAuthtype'),
            key: 'cmutKldAuthtypeDis',
            width: 160,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKldPublish'),
            key: 'cmutKldPublish',
            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKldLosttime'),
            key: 'cmutKldLosttime',
            sortable: 'custom',
            width: 160,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 64,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    disabled: this.paccStatus === '01entry' ? true : false,
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.checkOpenUp(params.row.id, this.$t('button.view'))
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        index: 0,
        companyId: 1,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        select: '全部',
        name: '',
        cmutKldState: '03released',
        cmutKldTitle: '',
//        paccStatus: '00all',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mounted() {
      this.getData(1)
      this.getSelect()
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        //
        const data = {
          _mt: 'cmutKnowledge.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          cmutKldState: '03released',
          cmutKldTitle: t.cmutKldTitle,
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
        } else {
          this.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'cmutKnowledge.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {},
          })
        }
      },
      submitBtn(pa, logType) {
        const t = this
        t.logType = logType
        let state = "";
        if (1 === pa) {
          if (this.cmutKldState === "01entry") {
            state ="02confirm";
          }
          if (this.cmutKldState === "02confirm") {
            state ="03released";
          }
          if (this.cmutKldState === "03released") {
            state ="04invalid";
          }
        }
        if (0 === pa) {
          if (this.cmutKldState === "02confirm") {
            state ="01entry";
          }
        }
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_knowBase.knowlegebase.pelConfir') + ' ' +
                  t.logType + ' ' +  this.$t('lang_knowBase.knowlegebase.data') + '?',
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'cmutKnowledge.setKnowledgesInvalid',
                logType: '提交知识库',
                ids: this.tableselected.join(','),
                cmutKldState: state,
              }).then((res) => {
                this.getData(1)
                t.tableselected = []
              }).catch(() => {
                this.$Modal.error({
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.submit = true
        if (logType === this.$t('button.view')) {
          t.$refs.update.getData(t.updateId)
        }
      },
      checkOpenUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.submit = false
        if (logType === t.$t('button.view')) {
          t.$refs.update.getData(t.updateId)
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      addNewArray(res) {
        const t = this
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'knowManage,knowledgetype,yesno,knowauthtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.knowledgeStatus = res.data.content[0].value[0].paramList
            t.knowledgeType = res.data.content[0].value[1].paramList
            t.yesno = res.data.content[0].value[2].paramList
            t.Knowauthtype = res.data.content[0].value[3].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selected(name) {
        if (name === '00all') {
          this.cmutKldState = ''
        } else {
          this.cmutKldState = name
        }
        this.getData(1)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }

</style>
