<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_personalfile.fileClass.title')}}
        </p>
        <Row>
          <Col span="4" class="colTree">
            <div class="divtree" :style="{height:treeheight + 'px'}">
              <Tree :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>
            </div>
          </Col>
          <Col span="20" style="width:83.33333333% !important;">
          <Row>
            <Input :placeholder="$t('lang_personalfile.fileClass.claNoDis')" style="width: 200px" v-model="claNo"/>
            <Input :placeholder="$t('lang_personalfile.fileClass.claNameDis')" style="width: 200px" v-model="claName"/>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="search()">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <!--<Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>-->
            <!--<Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>-->
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
  </div>
</template>
<script>
  import update from './fileClassificationInfo'
  import { isSuccess } from '../../../lib/util'
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
          { code: 'claNo', name: this.$t('lang_personalfile.fileClass.claNo')},
          { code: 'claName', name: this.$t('lang_personalfile.fileClass.claName') },
          { code: 'claPidDis', name: this.$t('lang_personalfile.fileClass.claPid')},
          { code: 'claYesnoDis', name: this.$t('lang_personalfile.fileClass.claYesno')}
        ],
        claNo: '',
        claName: '',
        claPid: '',
        openExpDow: false,
        openExp: false,
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
            title: this.$t('lang_personalfile.fileClass.claNo'),
            key: 'claNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileClass.claName'),
            key: 'claName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileClass.claPid'),
            key: 'claPidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileClass.claYesno'),
            key: 'claYesnoDis',
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
      this.getData()
      this.getTree()
    },
    methods: {
    	refresh(){
    		this.getData();
    	},
      getData() {
        const t = this
        const data = {
          _mt: 'archivesClassification.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          claNo: t.claNo,
          id: t.claPid,
          claName: t.claName,
          logType: '档案分类查询',
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
      getTree() {
        const t = this
        const data = {
          _mt: 'archivesClassification.getTree',
          logType: this.$t('button.ser'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if(undefined == res.data.content[0].value){
          		return;
          	}
            res.data.content[0].value.push({
              id: '0',
              claName: this.$t('lang_personalfile.fileClass.title'),
            })
            t.dataTree = t.toTree(res.data.content[0].value)
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
      /* 树点击事件 */
      selectChange(e) {
      	this.page = 1;
        this.claPid = e.id;
        this.getData();
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = false;
          item.title = item.claName
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.claPid]
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
        t.getData();
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
        t.getData(this.treeid)
        t.getData();
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
          _mt: 'archivesClassification.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.tableselected = []
            t.getTree()
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
        t.openUpdate = true;
        t.logType = logType;
        if (logType == this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }else if(logType == this.$t('button.add')){
        	t.$refs.update.getData('');
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.upFormData.id = '';
        t.$refs.update.upFormData.claName = '';
        t.$refs.update.upFormData.claNo = '';
        t.$refs.update.upFormData.claPid = '';
        t.$refs.update.upFormData.claYesno = '';
        t.$refs.update.upFormData.claNote = '';
        t.$refs.update.upFormData.claPidDis = '';
      },
      search() {
        this.claPid = ''
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
                type: 'ios-copy',
                size: '15',
                color: '#3399ff',
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
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
  	padding-left: 10px;
    overflow: auto;
    border: 1px #efefef solid;
  }
</style>
