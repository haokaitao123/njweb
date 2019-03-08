<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_cmut.cmutCorpora.corpora')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_cmut.cmutCorpora.cmutCorpQtypeIns')" style="width: 200px" v-model="qType"/>
          <Input :placeholder="$t('lang_cmut.cmutCorpora.titleIns')" style="width: 200px" v-model="title"/>
          <Dropdown>
            <Button type="primary">
              {{statusDis}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))" v-show="status ==='00all' || status ==='01draft' ? true : false">{{$t('button.add')}}</Button>
          <span style="margin: 0;" v-show="status ==='01draft' ? true : false">
            <Button type="success" @click="modifystatu('02valid')">{{$t('lang_cmut.cmutCorpora.valid')}}</Button>
            </span>
          <span style="margin: 0;" v-show="status ==='02valid' ? true : false">
            <Button type="error" @click="modifystatu('03invalid')">{{$t('lang_cmut.cmutCorpora.invalid')}}</Button>
            </span>
          <span style="margin: 0;" v-show="status ==='03invalid' ? true : false">
            <Button type="success" @click="modifystatu('02valid')">{{$t('lang_cmut.cmutCorpora.valid')}}</Button>
            </span>
          <Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition >
      <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
  </div>
</template>
<script>
  import update from './cmutCorporaView'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'

  export default{
    data() {
      return {
        expDataTital: [
          { code: 'cmutCorpOrder', name: this.$t('lang_cmut.cmutCorpora.cmutCorpOrder') },
          { code: 'cmutCorpQtype', name: this.$t('lang_cmut.cmutCorpora.cmutCorpQtype') },
          { code: 'cmutCorpTitle', name: this.$t('lang_cmut.cmutCorpora.cmutCorpTitle') },
          { code: 'cmutCorpContent', name: this.$t('lang_cmut.cmutCorpora.cmutCorpContent') },
          { code: 'cmutCorpWxcontent', name: this.$t('lang_cmut.cmutCorpora.cmutCorpWxcontent') },
          { code: 'cmutCorpStateDis', name: this.$t('lang_cmut.cmutCorpora.cmutCorpStateDis') },
          { code: 'cmutCorpComment', name: this.$t('lang_cmut.cmutCorpora.comment') },
          ],
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        statusDis: this.$t('lang_cmut.cmutCorpora.valid'),
        openUpdate: false,
        updateId: NaN,
        title: '',
        qType: '',
        dropdownMenuList: [],
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_cmut.cmutCorpora.cmutCorpOrder'),
            key: 'cmutCorpOrder',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_cmut.cmutCorpora.cmutCorpQtype'),
            key: 'cmutCorpQtype',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_cmut.cmutCorpora.cmutCorpTitle'),
            key: 'cmutCorpTitle',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_cmut.cmutCorpora.cmutCorpContent'),
            key: 'cmutCorpContent',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_cmut.cmutCorpora.cmutCorpWxcontent'),
            key: 'cmutCorpWxcontent',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_cmut.cmutCorpora.cmutCorpStateDis'),
            key: 'cmutCorpStateDis',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'cmutCorpOrder',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        status: '02valid',
      }
    },
    computed: {

    },
    components: {
      expwindow,
      expdow,
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
        const data = {
          _mt: 'cmutCorpora.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          cmutCorpTitle: t.title,
          cmutCorpState: t.status,
          cmutCorpQtype: t.qType,
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
      getPageByState(paramCode, paramInfoCn) {
        const t = this
        t.status = paramCode
//        if (t.status === '02valid') {
//          t.sysRootvalid = '1'
//        } else if (t.status === '03invalid') {
//          t.sysRootvalid = '0'
//        } else {
//          t.sysRootvalid = ''
//        }
        t.statusDis = paramInfoCn
        t.getData(1)
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
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
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },

      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }
      },
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.dropdownMenuList = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.cmutCorpOrder = ''
        t.$refs.update.formValidate.cmutCorpTitle = ''
        t.$refs.update.formValidate.cmutCorpQtype = ''
        t.$refs.update.formValidate.cmutCorpContent = ''
        t.$refs.update.formValidate.cmutCorpWxcontent = ''
        t.$refs.update.formValidate.cmutCorpStateDis = ''
        t.$refs.update.formValidate.cmutCorpComment = ''
      },
      modifystatu(state) {
        const t = this
        let logType = ''
        if (state === '02valid') {
          logType = this.$t('lang_cmut.cmutCorpora.valid')
        } else if (state === '03invalid') {
          logType = this.$t('lang_cmut.cmutCorpora.invalid')
        }
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
          return
        }
        getDataLevelUserLogin({
          _mt: 'cmutCorpora.changeState',
          logType: logType,
          state: state,
          ids: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getData(1)
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('lang_cmut.cmutCorpora.succes'),
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      expData() {
        const data = {
          cmutCorpQtype: this.qType,
          cmutCorpTitle: this.title,
          cmutCorpState: this.status,
        }
        this.logType = this.$t('button.exp')
        this.$refs.expwindow.getData(this.expDataTital, 'cmutCorpora.export', data)
        this.openExp = true
      },
      closeExp() {
        const t = this
        t.openExp = false
      },
      closeExpDowMain() {
        const t = this
        t.openExpDow = false
      },
      setFileKey(filekey, filename, openExpDow) {
        const t = this
        t.filekey = filekey
        t.filename = filename
        t.openExpDow = openExpDow
        t.$refs.expdow.getPriToken(t.filekey)
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
