<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_organization.orgpost.title')}}
        </p>
        <Row>
          <Col span="6" class="colTree" >
            <div :loading="isloding"  class="divtree" :style="{height:treeheight + 'px'}">
              <Tree v-if="dataTree != ''" :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>
              <Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>
            </div>
          </Col>
          <Col span="18" style="width: 73.3333% !important">
          <Row>
            <Input :placeholder="$t('lang_organization.orgpost.postCodeInp')" style="width: 200px" v-model="postCode"/>
            <Input :placeholder="$t('lang_organization.orgpost.postFCOrENameInp')" style="width: 200px" v-model="postFname"/>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="search()">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>

            <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">          <Page :total="total" :current="page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="search()"></Button></Row>
          </Col>
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
  import update from './orgpostInfoView'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        loading: true,
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
            title: this.$t('lang_organization.orgpost.postCode'),
            key: 'postCode',
            width: 180,
//          width: 105,
            fixed: 'left',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_organization.orgpost.postFnameCnDis'),
            width: 180,
//          width: 105,
            key: 'postFname',
          },
          {
            title: this.$t('lang_organization.orgpost.postSnameCnDis'),
            width: 180,
//          width: 105,
            key: 'postSname',
          },
          {
            title: this.$t('lang_organization.orgpost.postUnitName'),
            key: 'postUnitName',
            sortable: 'custom',
            width: 180,
//          width: 105,
          },
          {
            title: this.$t('lang_organization.orgpost.validdate'),
            key: 'validdate',
            sortable: 'custom',
            width: 180,
//          width: 105,
          },
          {
            title: this.$t('lang_organization.orgpost.invdate '),
            key: 'invdate',
            sortable: 'custom',
            width: 180,
//          width: 105,
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
        sort: 'postCode',
        order: 'asc',
        rows: 10,
        page: 1,
        funId: '1000',
        postCode: '',
        postFname: '',
        treeid: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mounted() {
      this.getData()
      this.getTree()
    },
    methods: {
      getData(id) {
        const t = this
        const data = {
          _mt: 'orgPost.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '岗位查询',
          postCode: t.postCode,
          funId: '1000',
          postFname: t.postFname,
          postUnit: id || '',
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
      getTree() {
        const t = this
        const data = {
          _mt: 'orgPost.getTree',
          rows: 100,
          page: 1,
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
            t.loading = false
            setTimeout(() => {
              t.dataTree = t.toTree(res.data.content[0].value)
            }, 500)
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
        this.treeid = e.id
        this.page = 1
        this.getData(e.id)
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.postCode
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.postUnit]
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
        t.getData(this.treeid)
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
          _mt: 'orgPost.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected.toString(),
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
        t.$refs.update.formValidate.postCode = ''
        t.$refs.update.formValidate.postFname = ''
        t.$refs.update.formValidate.postSname = ''
        t.$refs.update.formValidate.postDfpslevel = ''
        t.$refs.update.formValidate.postDfsallevel = ''
        t.$refs.update.formValidate.postDftrvlevel = ''
        t.$refs.update.formValidate.postUnit = ''
        t.$refs.update.postDfcostcenterName = ''
        t.$refs.update.postDfcostcenter = ''
        t.$refs.update.postUnitName = ''
        t.$refs.update.formValidate.validdate = ''
        t.$refs.update.formValidate.invdate = ''
        t.$refs.update.formValidate.invreason = ''
        t.$refs.update.formValidate.comment = ''
      },
      search() {
        this.treeid = ''
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
                type: data.postType === '01company' ? 'social-buffer' : data.postType === '02dept' ? 'ios-people' : 'person',
                size: data.postType === '01company' ? '15' : data.postType === '02dept' ? '15' : '10',
                color: data.postType === '01company' ? '#3399ff' : data.postType === '02dept' ? '#ff9900' : '#2fcc28',
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
