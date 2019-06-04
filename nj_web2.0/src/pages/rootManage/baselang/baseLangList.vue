<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_lan.Mulg.title')}}
        </p>
        <Row>
          <span @dblclick="clear">
          <Input v-model="lanTypeDis" icon="search" :readonly="true" :placeholder="$t('lang_lan.Mulg.p_lanTypeDis')" style="width: 200px" @on-click="pickData"/>
          </span>
          <Input :placeholder="$t('lang_lan.Mulg.p_lanCode')" style="width: 200px" v-model="lanCode"/>
          <Input :placeholder="$t('lang_lan.Mulg.p_encn')" style="width: 200px" v-model="lanCn"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>
          <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange"  @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" ref="update" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray"></update>
    </transition>
    <transition name="fade">
      <langTypeSeaTable v-show="openPick" :title="title1" :searchText1="searchText1" :searchText2="searchText2" :searchCloumns="searchCloumns" :params="params" @closeUp="closeUp" @changeinput="changeinput" ref="langTypeSeaTable"></langTypeSeaTable>
    </transition>
    <transition >
      <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
    <transition name="fade">
      <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt" @getData="getData" @closeImport="closeImport"ref="importExcel"></importExcel>
    </transition>
  </div>
</template>
<script>
  import update from './updBaseLang'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import langTypeSeaTable from '../../../components/searchTable/langTypeSeaTable'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'

  export default{
    data() {
      return {
        imp_mt: 'baseLang.importData',
        openImport: false,
        expDataTital: [{ code: 'lanTypeDis', name: this.$t('lang_lan.Mulg.lanTypeDis') }, { code: 'lanCode', name: this.$t('lang_lan.Mulg.lanCode') },
          { code: 'lanCn', name: this.$t('lang_lan.Mulg.lanCn') }, { code: 'lanEn', name: this.$t('lang_lan.Mulg.lanEn') }, { code: 'lanTw', name: this.$t('lang_lan.Mulg.lanEn') }, { code: 'lanOth1', name: this.$t('lang_lan.Mulg.lanOth1') },
          { code: 'lanOth2', name: this.$t('lang_lan.Mulg.lanOth2') }, { code: 'lanOth3', name: this.$t('lang_lan.Mulg.lanOth3') }, { code: 'lanOth4', name: this.$t('lang_lan.Mulg.lanOth4') }, { code: 'lanOth5', name: this.$t('lang_lan.Mulg.lanOth5') },
          { code: 'comment', name: this.$t('lang_lan.Mulg.comment') }],
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        openPick: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_lan.Mulg.lanTypeDis'),
            key: 'lanTypeDis',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_lan.Mulg.lanCode'),
            key: 'lanCode',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_lan.Mulg.lanCn'),
            key: 'lanCn',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_lan.Mulg.lanEn'),
            key: 'lanEn',
//          width: 150,
            sortable: 'custom',
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
        title1: this.$t('lang_lan.searchType.title'),
        searchText1: this.$t('lang_lan.searchType.lanTypeName'),
        searchText2: this.$t('lang_lan.searchType.lanTypeCode'),
        searchCloumns: [
          {
            title: this.$t('lang_lan.searchType.lanTypeName'),
            key: 'lanTypeName',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_lan.searchType.lanTypeCode'),
            key: 'lanTypeCode',
            sortable: 'custom',
            width: 253,
          },
        ],
        params: {
          _mt: 'langType.selectByBaseLangTypePageList',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
        data: [],
        total: NaN,
        index: 0,
        select: this.$t('invalid.2'),
        sort: 'lanTypeDis',
        order: 'asc',
        rows: 20,
        page: 1,
//        current: 1,
        status: '02valid',
        lanTypeDis: '',
        lanType: '',
        lanCode: '',
        lanCn: '',
        lanEn: '',
      }
    },
    computed: {

    },
    components: {
      update,
      langTypeSeaTable,
      expwindow,
      expdow,
      importExcel,
    },
    mounted() {
      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'baseLang.selectByBaseLangPageList',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: this.$t('button.ser'),
          lanTypeDis: t.lanTypeDis,
          lanType: t.lanType,
          lanCode: t.lanCode,
          lanCn: t.lanCn,
          lanEn: t.lanEn,
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
      closeImport() {
        const t = this
        t.openImport = false
      },
      importExcel() {
        const t = this
        t.openImport = true
        t.$refs.importExcel.getDowModelFile()
      },
      expData() {
        const data = {
          lanTypeDis: this.lanTypeDis,
          lanType: this.lanType,
          lanCode: this.lanCode,
          lanCn: this.lanCn,
          lanEn: this.lanEn,
        }
        this.$refs.expwindow.getData(this.expDataTital, 'baseLang.export', data)
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
      pickData() {
        this.$refs.langTypeSeaTable.getData(this.params, 1)
        this.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.lanTypeDis = name
        t.lanType = code
      },
      clear() {
        const t = this
        t.lanTypeDis = ''
        t.lanType = ''
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
          _mt: 'baseLang.deleteByIds',
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(t.updateId)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.$refs.update.lanTypeDis = ''
        t.$refs.update.formValidate.lanType = ''
        t.$refs.update.formValidate.lanCode = ''
        t.$refs.update.formValidate.lanCn = ''
        t.$refs.update.formValidate.lanEn = ''
        t.$refs.update.formValidate.comment = ''
        t.$refs.langTypeSeaTable.pmtypeCode = ''
        t.$refs.langTypeSeaTable.pmtypeName = ''
        t.openUpdate = false
        t.openPick = false
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
      selected(name) {
        switch (name) {
          case '03invalid':this.select = this.$t('invalid.3')
            break
          case '02valid':this.select = this.$t('invalid.2')
            break
          case '01draft':this.select = this.$t('invalid.1')
            break
          case '':this.select = this.$t('invalid.4')
            break
        }
        this.status = name
        this.getData()
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
