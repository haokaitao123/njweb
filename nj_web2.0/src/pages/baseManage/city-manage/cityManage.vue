<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_baseManage.baseCity.title')}}
        </p>
        <Row>
          <Col span="4" class="colTree">
            <div class="divtree" :style="{height:treeheight + 'px'}">
              <Tree :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>
            </div>
          </Col>
          <Col span="20" style="width:83.33333333% !important;">
          <Row>
            <Input :placeholder="$t('lang_baseManage.baseCity.cityNameDis')"  @on-enter="enterEvent" style="width: 200px" v-model="cityName"/>
            <Input :placeholder="$t('lang_baseManage.baseCity.cityCode1Dis')"  @on-enter="enterEvent" style="width: 200px" v-model="cityCode1"/>
            <span style="margin: 0;"><Button type="primary" icon="search" :loading="searchLoading" @click="search()">{{$t('button.ser')}}</Button></span>
            <Dropdown>
              <Button type="primary">
                {{select}}
                <Icon type="arrow-down-b"></Icon>
              </Button>
              <DropdownMenu slot="list" >
                <span :key="index" @click="selected('',$t('button.all'))">
                  <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                </span>
                <span v-for="(item,index) in selectCityType" :key="index" @click="selected(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
              </DropdownMenu>
            </Dropdown>
            <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>
            <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>
          </Row>
          <row class="table-form" ref="table-form">
            <Table :loading="loading" @on-select="selectedtable" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
                  <Row style="display: flex">          <Page :total="total" :showTotal="showTotal" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="search()"></Button></Row>
          </Col>
        </Row>

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
    <transition name="fade">
    <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport"ref="importExcel"></importExcel>
  </transition>
  </div>
</template>
<script>
  import update from './cityInfoView'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'

  export default{
    data() {
      return {
        searchLoading: false,
        loading: "",
        imp_mt: 'baseCity.importData',
        openImport: false,
        expDataTital: [{ code: 'cityName', name: this.$t('lang_baseManage.baseCity.cityName') }, { code: 'cityCode1', name: this.$t('lang_baseManage.baseCity.cityCode1') },
          { code: 'cityCode2', name: this.$t('lang_baseManage.baseCity.cityCode2') }, { code: 'cityCode3', name: this.$t('lang_baseManage.baseCity.cityCode3') },
          { code: 'cityTypeName', name: this.$t('lang_baseManage.baseCity.cityTypeName') }, { code: 'cityPname', name: this.$t('lang_baseManage.baseCity.cityPname') },
          { code: 'cityIsvalidName', name: this.$t('lang_baseManage.baseCity.cityIsvalidName') }, { code: 'cityIssbName', name: this.$t('lang_baseManage.baseCity.cityIssbName') },
          { code: 'cityIshfName', name: this.$t('lang_baseManage.baseCity.cityIshfName') }, { code: 'cityIstaxName', name: this.$t('lang_baseManage.baseCity.cityIstaxName') },
          { code: 'comment', name: this.$t('lang_baseManage.baseCity.cityIshfName') }],
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        dataTree: [],
        selectCityType: [],
        treeheight: document.body.offsetHeight - 200,
        tableheight: document.body.offsetHeight - 280,
        value: '',
        select: this.$t('button.all'),
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
            title: this.$t('lang_baseManage.baseCity.cityName'),
            key: 'cityName',
            sortable: 'custom',
            width: 120,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityCode1'),
            key: 'cityCode1',
            sortable: 'custom',
            width: 110,
//          width: 90,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityCode2'),
            key: 'cityCode2',
            sortable: 'custom',
            width: 110,
//          width: 90,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityCode3'),
            key: 'cityCode3',
            sortable: 'custom',
            width: 110,
//          width: 90,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityTypeName'),
            key: 'cityTypeName',
            sortable: 'custom',
            width: 110,
//          width: 105,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityPname'),
            key: 'cityPname',
            sortable: 'custom',
            width: 110,
//          width: 105,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityIsvalidName'),
            key: 'cityIsvalidName',
            sortable: 'custom',
            width: 90,
//          width: 105,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityIssbName'),
            key: 'cityIssbName',
            sortable: 'custom',
            width: 110,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityIshfName'),
            key: 'cityIshfName',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityIstaxName'),
            key: 'cityIstaxName',
            sortable: 'custom',
            width: 150,
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
                      this.openUp(params.row.id, '修改', params.index)
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
        rows: 20,
        page: 1,
        funId: '1000',
        cityName: '',
        cityTypeName: '',
        cityCode1: '',
        treeid: '',
      }
    },
    computed: {

    },
    components: {
      update,
      expwindow,
      expdow,
      importExcel,
    },
    mounted() {
      this.getSelect()
      this.getData('', 1)
      this.getTree()
    },
    methods: {
      //enter事件
      enterEvent(e){
        if(e.target.value != ''){
          this.search()
        }
      },
      getData(id, page) {
        const t = this
        if (page) {
          t.page = page
        }
        if (typeof (page) == "undefined") {
          this.page = 1;
        }
        const data = {
          _mt: 'baseCity.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          cityName: t.cityName,
          cityType: t.cityTypeName,
          cityCode1: t.cityCode1,
          cityPid: id || '',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.loading = true; //请求之前重置状态
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.loading = false; //在成功之后改状态
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.loading = false; //在成功之后改状态
          t.$Message.error(this.$t('reminder.errormessage'))
        }).finally(() => {
        	t.searchLoading = false; //请求结束关闭loading
      });
      },
      getTree() {
        const t = this
        const data = {
          _mt: 'baseCity.getTree',
          rows: '100',
          page: '1',
          sort: 'id',
          order: 'asc',
          logType: this.$t('button.ser'),
          id: '0',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            res.data.content[0].value.push({
              id: '0',
              cityName: this.$t('lang_baseManage.baseCity.allCountry'),
            })
            t.dataTree = t.toTree(res.data.content[0].value)
          }
        }).catch(() => {
          t.$Message.error(this.$t('reminder.errormessage'))
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
      /* 树点击事件 */
      selectChange(e) {
        this.treeid = e.id
        this.getData(e.id, 1)
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.cityName
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.cityPid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            val.push(item)
          }
        })
        return val
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
        t.getTree()
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
        t.getTree()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(this.treeid)
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData(this.treeid)
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData(this.treeid,t.page)
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
          this.$Message.warning(this.$t('reminder.leastone'))
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.confirmdelete'),
        		onOk: () => {
        			getDataLevelUserLogin({
          _mt: 'baseCity.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.$Message.success(this.$t('reminder.deletesuccess'))
            t.tableselected = []
            t.getTree()
            t.getData()
          }
        }).catch(() => {
            t.$Message.error(this.$t('reminder.errormessage'))
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
        // t.$refs.update.getSelect()
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
        t.$refs.update.formValidate.cityName = ''
        t.$refs.update.formValidate.cityType = ''
        t.$refs.update.formValidate.cityCode1 = ''
        t.$refs.update.formValidate.cityCode2 = ''
        t.$refs.update.formValidate.cityCode3 = ''
        t.$refs.update.formValidate.cityTypeName = ''
        t.$refs.update.formValidate.cityPid = ''
        t.$refs.update.cityPname = ''
        t.$refs.update.distype = false
        t.$refs.update.formValidate.cityIsvalid = ''
        t.$refs.update.formValidate.cityIstax = ''
        t.$refs.update.formValidate.cityIssb = ''
        t.$refs.update.formValidate.cityIshf = ''
        t.$refs.update.formValidate.comment = ''
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'citytype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectCityType = (res.data.content[0].value[0].paramList)
          }
        }).catch(() => {
          t.$Message.error(this.$t('reminder.errormessage'))
        })
      },
      selected(key, name) {
        this.select = name
        this.cityTypeName = key
        this.getData('', 1)
      },
      search() {
        this.searchLoading = true;
        this.treeid = ''
        this.page = 1
        this.getData('', 1)
        this.tableselected = [];
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
  .colTree{
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
  	padding-left: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }
</style>
