<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_personalfile.archivesRoom.title')}}
        </p>
        <Row>
          <Col span="20" style="width:100% !important;">
          <Row>
            <Input :placeholder="$t('lang_personalfile.archivesRoom.cenNoDis')" style="width: 200px" v-model="cenNo"/>
            <!--<Input placeholder="请输入管理人" style="width: 200px" v-model="cenAdmin"/>	-->
            <span @dblclick="clearUserid">
            	<Input v-model="cenAdminDec" icon="search" :readonly="true" :placeholder="$t('lang_personalfile.archivesRoom.cenNoDis')" style="width: 200px" @on-click="pickUserData" />
            </span>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="search()">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
<!--            <Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>
            <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>-->
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
	          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page>
	          <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
          </Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition >
      <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
    <transition name="fade">
    <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport"ref="importExcel"></importExcel>
  	</transition>
  	<transition name="fade">
      <searchPubEmp v-show="openPick" @closeUp="close" @changeinput="changeinput" ref="searchPubEmp"></searchPubEmp>
    </transition>
  </div>
</template>
<script>
  import update from './archiveRoomInfo'
  import { isSuccess } from '../../../lib/util'
  import searchPubEmp from '../../../components/searchTable/searchPubEmp'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'

  export default{
    data() {
      return {
        imp_mt: 'baseCity.importData',
        openImport: false,
        expDataTital: [
          { code: 'cenNo', name: this.$t('lang_personalfile.archivesRoom.cenNo') },
          { code: 'cenName', name: this.$t('lang_personalfile.archivesRoom.cenName') },
          { code: 'cenAddress', name: this.$t('lang_personalfile.archivesRoom.cenAddress') },
          { code: 'cenAdminDis', name: this.$t('lang_personalfile.archivesRoom.cenAdmin') },
          { code: 'cenAdminTel', name: this.$t('lang_personalfile.archivesRoom.cenAdminTel') },
          { code: 'cenAdminMail', name: this.$t('lang_personalfile.archivesRoom.cenAdminMail') }
        ],
        cenNo: '',
        cenAdmin: '',
        cenAdminDec: '',
        openExpDow: false,
        openExp: false,
        openPick: false,
        filekey: '',
        filename: '',
        dataTree: [],
        treeheight: document.body.offsetHeight - 200,
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
            fixed: 'left',
            align: 'center',
          },
          {
            title: this.$t('lang_personalfile.archivesRoom.cenNo'),
            key: 'cenNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.archivesRoom.cenName'),
            key: 'cenName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.archivesRoom.cenAddress'),
            key: 'cenAddress',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.archivesRoom.cenAdmin'),
            key: 'cenAdminDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.archivesRoom.cenAdminTel'),
            key: 'cenAdminTel',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.archivesRoom.cenAdminMail'),
            key: 'cenAdminMail',
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
                      this.openUp(params.row.id, this.$t('button.upd'))
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
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        funId: '1000',
        cityName: '',
        cityTypeName: '',
        cityCode1: '',
      }
    },
    components: {
      update,
      expwindow,
      expdow,
      importExcel,
      searchPubEmp,
    },
    mounted() {
      this.getData()
    },
    methods: {
    	refresh() {
        this.getData()
      },
      getData() {
        const t = this
        const data = {
          _mt: 'archivesCenter.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
					cenNo: t.cenNo,
					cenAdmin: t.cenAdmin,
          logType: this.$t('button.ser'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.data = [];
        t.total = 0;
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
        //t.$refs.importExcel.getDowModelFile()
      },
      expData() {
        const data = {
          cityName: this.cityName,
          cityType: this.cityTypeName,
          cityCode1: this.cityCode1,
        }
        this.$refs.expwindow.getData(this.expDataTital, 'baseCity.export', data)
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
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
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
          _mt: 'archivesCenter.delByIds',
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
      openUp(id, logType) {
        const t = this
        t.openUpdate = true
        t.logType = logType
        if (logType == this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }else if(logType == this.$t('button.add')) {
        	t.$refs.update.getData('')
        }
      },
      pickUserData(){
      	this.$refs.searchPubEmp.getData();
      	this.openPick = true;
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.upFormData.id = {}
        t.$refs.update.upFormData.cenNo = {}
        t.$refs.update.upFormData.cenName = {}
        t.$refs.update.upFormData.cenAddress = {}
        t.$refs.update.upFormData.cenAdmin = {}
        t.$refs.update.upFormData.cenNote = {}
        t.$refs.update.upFormData.cenAdminDis = {}
        t.$refs.update.upFormData.cenAdminTel = {}
        t.$refs.update.upFormData.cenAdminMail = {}
      },
      close(){
      	this.openPick = false;
      },
      changeinput(name,id){
      	this.cenAdminDec = name
				this.cenAdmin = id
      },
      clearUserid(){
      	this.cenAdminDec = ''
      	this.cenAdmin = ''
      },
      search() {
        this.page = 1
        this.getData()
      },
      renderContent(h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
          },
        }, [
           h('Button', {
               props: {
               type: 'text',
               size: 'small',
               },
              on: {
                 click: () => { this.selectChange(data) },
              },
           }, [
            h('Icon', {
              props: {
                type: data.cityType === '01prov' ? 'android-home' : data.cityType === '02city' ? 'android-locate' : data.cityType === '03county' ? 'android-pin' : 'home',
                size: '15',
                color: data.cityType === '01prov' ? '#ff9900' : data.cityType === '02city' ? '#39c263' : data.cityType === '03county' ? '#bf3319' : '#3399ff',
              },
              style: {
                marginRight: '8px',
              },
            }),
            h('span', data.title),
            ]),
          ])
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
