﻿<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_baseManage.baseLevadfamount.title')}}
        </p>
        <Row>
            <span @dblclick="clearCityid">
              <Input v-model="levdfCityName" icon="search" :readonly="true" :placeholder="$t('lang_baseManage.baseLevadfamount.selCity')" style="width: 200px" @on-click="pickData" />
            </span>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>
          <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
                <Row style="display: flex">          <Page :total="total" :showTotal="showTotal" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" :current="page" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <searchCity v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close1" @changeinput="changeinput" ref="searchCity"></searchCity>
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
  import update from './addNewLevadfamount'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import searchCity from '../../../components/searchTable/searchCity'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'

  export default{
    data() {
      return {
        imp_mt: 'baseLevadfamount.importData',
        openImport: false,
        expDataTital: [{ code: 'levdfCityName', name: this.$t('lang_baseManage.baseLevadfamount.levdfCityName') }, { code: 'levdfDfamount', name: this.$t('lang_baseManage.baseLevadfamount.levdfDfamount') },
          { code: 'levdfSdate', name: this.$t('lang_baseManage.baseLevadfamount.levdfSdate') }, { code: 'levdfEdate', name: this.$t('lang_baseManage.baseLevadfamount.levdfEdate') },
          { code: 'comment', name: this.$t('lang_baseManage.baseLevadfamount.comment') }],
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_baseManage.baseLevadfamount.levdfCityName'),
            key: 'levdfCityName',
            sortable: 'custom',
//          width: 130,
          },
          {
            title: this.$t('lang_baseManage.baseLevadfamount.levdfDfamount'),
            key: 'levdfDfamount',
            sortable: 'custom',
//          width: 130,
          },
          {
            title: this.$t('lang_baseManage.baseLevadfamount.levdfSdate'),
            key: 'levdfSdate',
            sortable: 'custom',
//          width: 130,
          },
          {
            title: this.$t('lang_baseManage.baseLevadfamount.levdfEdate'),
            key: 'levdfEdate',
            sortable: 'custom',
//          width: 130,
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
        showTotal: true,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        levdfCityid: '',
        openPick: false,
        levdfCityName: '',
        params: {
          _mt: 'baseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: 20,
          page: '1',
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{"cityIsvalid" : "1"}',
        },
        searchCloumns: [
          {
            title: this.$t('lang_baseManage.baseCity.cityName'),
            key: 'cityName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityTypeName'),
            key: 'cityTypeName',
            sortable: 'custom',
            width: 379,
          },
        ],
      }
    },
    computed: {

    },
    components: {
      searchCity,
      update,
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
          _mt: 'baseLevadfamount.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          levdfCityid: t.levdfCityid,
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
        const t = this
        const data = {
          levdfCityid: t.levdfCityid,
        }
        this.$refs.expwindow.getData(this.expDataTital, 'baseLevadfamount.export', data)
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
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
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
      close1() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
        t.levdfCityName = name
        t.levdfCityid = id
      },
      pickData() {
        const t = this
        t.$refs.searchCity.getData(this.params, '02city\',\'03county')
        t.openPick = true
      },
      clearCityid() {
        const t = this
        t.levdfCityName = ''
        t.levdfCityid = ''
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
          _mt: 'baseLevadfamount.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
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
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.levdfCityid = ''
        t.$refs.update.levdfCityName = ''
        t.$refs.update.formValidate.levdfDfamount = ''
        t.$refs.update.formValidate.levdfSdate = ''
        t.$refs.update.formValidate.levdfEdate = ''
        t.$refs.update.formValidate.comment = ''
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
