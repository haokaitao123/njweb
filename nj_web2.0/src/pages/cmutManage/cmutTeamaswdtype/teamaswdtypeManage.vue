<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_cmut.teamMapping.title')}}
        </p>
        <Row>
        	<i-col span="4" class="colTree">
	        	<div class="divtree" :style="{height:treeheight + 'px'}">
              <Tree :data="dataTree" @on-select-change="selectChange"></Tree>
            </div>
	        </i-col>
	        <i-col span="20" style="width: 83.3333% !important">
	        	<Row>
	          <span @dblclick="clearCmtmtpTeam">
	              <Input v-model="cmtmtpTeamName" icon="search" :readonly="true" :placeholder="$t('lang_cmut.teamMapping.p_cmtmtpTeam')" style="width: 200px" @on-click="pickData" />
	            </span>
	          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
	          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
	          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
	        </Row>
	        <row class="table-form" ref="table-form">
	          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
	        </row>
	        <Row style="display: flex">  <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
	        </i-col>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <searchKnowTeam v-show="openPick" :searchTitle="searchTitle1" :searchText="searchText1" :searchCloumns="searchCloumns" :params="params" @closeUp="close1" @changeinput="changeinput" ref="searchKnowTeam"></searchKnowTeam>
    </transition>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './teamaswdtypeView'
  import searchKnowTeam from '../../../components/searchTable/searchKnowTeam'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        dataTree: [],
        treeheight: document.body.offsetHeight - 200,
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
            title: this.$t('lang_cmut.teamMapping.cmtmtpWdtype'),
            key: 'cmtmtpWdtypeName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_cmut.teamMapping.cmtmtpTeam'),
            key: 'cmtmtpTeamName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_cmut.teamMapping.cmtmtpTeammember'),
            key: 'cmtmtpTeammemberName',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 75,
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
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        openPick: false,
        cmtmtpTeam: '',
        cmtmtpTeamName: '',
        params: {
          _mt: 'cmutSupportteam.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchTitle1: this.$t('lang_cmut.searchKnowTeam.searchTitle1'),
        searchText1: this.$t('lang_cmut.searchKnowTeam.searchText1'),
        searchCloumns: [
          {
            title: this.$t('lang_cmut.searchKnowTeam.cmstTeamcode'),
            key: 'cmstTeamcode',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_cmut.searchKnowTeam.cmstTeamname'),
            key: 'cmstTeamname',
            sortable: 'custom',
            width: 379,
          },
        ],
      }
    },
    computed: {

    },
    components: {
      update,
      searchKnowTeam,
    },
    mounted() {
      this.getData(1)
      this.getTree()
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'cmutTeamaswdtype.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          cmtmtpTeam: t.cmtmtpTeam,
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
      close1() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
        t.cmtmtpTeamName = name
        t.cmtmtpTeam = id
      },
      pickData() {
        const t = this
        t.$refs.searchKnowTeam.getData(this.params)
        t.openPick = true
      },
      clearCmtmtpTeam() {
        const t = this
        t.cmtmtpTeamName = ''
        t.cmtmtpTeam = ''
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
          _mt: 'cmutTeamaswdtype.delByIds',
          funId: '1',
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
          t.$refs.update.getData(id)
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.cmtmtpWdtype = ''
        t.$refs.update.formValidate.cmtmtpTeam = ''
        t.$refs.update.formValidate.cmtmtpTeammember = ''
        t.$refs.update.cmtmtpWdtypeName = ''
        t.$refs.update.cmtmtpTeamName = ''
        t.$refs.update.cmtmtpTeammemberName = ''
        t.$refs.update.formValidate.cmtmtpComment = ''
      },
      //获取树
    	getTree() {
        const t = this
        const data = {
          _mt: 'cmutKnlType.getMainTypeTree',
          funId: 1,
          logType: this.$t('button.ser'),
          id: '0',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	if (res.data.content[0].value) {
          		res.data.content[0].value.push({
	              id: '0',
	              cmutKntypeName: this.$t('lang_knowBase.knowlegeType.treeTitle'),
	            })
	            t.dataTree = t.toTree(res.data.content[0].value)
          	}
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /* 树点击事件 */
      selectChange(e) {
			const t = this
			const data1 = {
				cmtmtpWdtype: e[0].id
			}
        const data = {
          _mt: 'cmutTeamaswdtype.getObject',
          funId: 1,
          sort: 'id',
          order: 'desc',
          logType: this.$t('button.ser'),
          data: JSON.stringify(data1),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (e[0].id === '0') {
        	t.getData()
        } else {
	        getDataLevelUserLogin(data).then((res) => {
	          if (isSuccess(res, t)) {
	          	if (res.data.content[0].value) {
	          		t.data = res.data.content[0].value
	            	t.total = res.data.content[0].value.length
	          	} else {
	          		t.data = []
	            	t.total = 0
	          	}
	          }
	        }).catch(() => {
	          t.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
        }
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.cmutKntypeName
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.cmutKntypePid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            val.push(item)
          }
        })
        return val
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
