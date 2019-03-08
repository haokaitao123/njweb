<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_knowBase.workOrderType.title')}}
        </p>
        <Row>
        	<i-col span="4" class="colTree">
        		<div class="divtree" :style="{height:treeheight + 'px'}">
              <Tree :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>
            </div>
        	</i-col>
        	<i-col span="20" style="width: 83.3333% !important">
        		<Row>
		          <Input :placeholder="$t('lang_knowBase.workOrderType.searchText')" style="width: 200px" v-model="cmutKntypeCode"/>
		          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
		          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
		          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
		        </Row>
		        <row class="table-form" ref="table-form">
		          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"  @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
		        </row>
		        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        	</i-col>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './updKnowledgeType'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        dataTree: [],
        treeheight: document.body.offsetHeight - 200,
        value: '',
        opendialog: false,
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
            title: this.$t('lang_knowBase.workOrderType.cmutKntypeCode'),
            key: 'cmutKntypeCode',
            width: 120,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_knowBase.workOrderType.cmutKntypeName'),
            key: 'cmutKntypeName',
            width: 120,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_knowBase.workOrderType.cmutKntypePid'),
            key: 'cmutKntypePidDis',
            width: 120,
          },
          {
            title: this.$t('lang_knowBase.workOrderType.cmutKntypeBusprop'),
            key: 'cmutKntypeBuspropDis',
            width: 120,
          },
          {
            title: this.$t('lang_knowBase.workOrderType.cmutWorkodprop'),
            key: 'cmutWorkodpropDis',
            width: 120,
          },
          {
            title: this.$t('lang_knowBase.workOrderType.cmutKntypeStdprice'),
            key: 'cmutKntypeStdprice',
            width: 120,
          },
          {
            title: this.$t('lang_knowBase.workOrderType.cmutKntypeStddltime'),
            key: 'cmutKntypeStddltime',
            width: 120,
          },
          {
            title: this.$t('lang_knowBase.workOrderType.cmutKntypeCaudltime'),
            key: 'cmutKntypeCaudltime',
            width: 120,
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
        total: NaN, // 总页数
        sort: 'cmutKntypeCode',
        order: 'asc',
        rows: 10,
        page: 1,
        index: 0,
        cmutKntypeCode: '',
        logType: '',
      }
    },
    computed: {
    },
    components: {
      update,
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
          _mt: 'cmutKnlType.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          cmutKntypeCode: t.cmutKntypeCode,
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
      addNewArray(res) {
        const t = this
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
        t.getTree()
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
        t.getTree()
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
          _mt: 'cmutKnlType.delByIds',
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
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.openUpdate = true
        t.index = index
        t.logType = logType
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
        t.openUpdate = false
        t.$refs.update.formValidate.cmutKntypeCode = ''
        t.$refs.update.formValidate.cmutKntypeName = ''
        t.$refs.update.formValidate.comment = ''
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
	              cmutKntypeName: this.$t('lang_knowBase.workOrderType.treeTitle'),
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
        const data = {
          _mt: 'cmutKnlType.getMainTypeTree',
          funId: 1,
          logType: this.$t('button.ser'),
          id: e[0].id,
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
              click: () => {
                let arr = []
                arr.push(data)
                this.selectChange(arr) },
            },
          }, [
            h('Icon', {
              props: {
                type: 'ios-book',
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
