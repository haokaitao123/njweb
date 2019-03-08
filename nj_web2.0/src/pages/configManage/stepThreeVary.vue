<template>
  <!-- 第三步    调查表变量页面 -->
  <div>
    <Row>
      <Col span="24">
      <!-- <card>
          <p slot="title">调查表变量</p> -->
      <Row>
        <Button type="primary" @click="addNew(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
        <Button type="primary" @click="getInitialization2()">{{$t('button.ini')}}</Button>
        <Button type="error" @click="delData">{{$t('button.del')}}</Button>
      </Row>
      <row class="table-form" style="margin:20px 0; min-height: 300px;">
        <Table @on-select="searchTable" @on-select-cancel="searchTable" @on-sort-change="sortable"
               @on-select-all="searchTable" size="small" border ref="searchTable" :columns="searchColumn"
               :data="searchData" height="350"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
              @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
        <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;"
                @click="getData(1)"></Button>
      </Row>
      <!-- </card> -->
      </Col>
    </Row>
    <transition name="fade">
      <!-- 新增调查问题页面 -->
      <addVary ref="addVary" v-if="showVary" @cancle="cancle" @getData="addNewArray" @update="updateArray"
               :id="updateId" :index="index" :logType="logType" :suvid="suvid" :styleCode="styleCode"></addVary>
    </transition>
  </div>
</template>

<script>
  import addVary from './addVary' //  新增编辑页面
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess} from '../../lib/util'

  export default {
    data() {
      return {
        showVary: false,
        total: NaN, // 总页数,
        sort: 'id',
        order: 'asc',
        rows: '10',
        page: '1',
        searchColumn: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_role.suvadmin.platSvaName'),
            key: 'platSvaName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSvaCname'),
            key: 'platSvaCname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.suvadmin.platSvaColumn'),
            key: 'platSvaColumn',
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
                      this.addNew(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        searchData: [],
        logType: '',
        updateId: NaN,
        index: 0,
        selectedArr: [],    //  存放选中数据id
        updateArr: [],      //  存放选中数据
      }
    },
    mounted() {
      this.getData(1)
    },
    components: {
      addVary,
    },
    props: {
      suvid: String,
      styleCode: String,
    },
    methods: {
      // 查询
      getData(page) {
        const t = this
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platSurveyvar.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: this.$t('button.ser'),
          platSvaSuvid: t.suvid,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.searchData = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getInitialization2() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSurveyvar.getInitialization',
          logType: '系统调查初始化变量',
          platSvaSuvid: t.suvid,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.initSuccess'),
              onOk: () => {
                t.getData()
              },
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      searchTable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.selectedArr = newArr.toString()
        this.updateArr = selection
      },
      // 删除
      delData() {
        const t = this
        if (t.updateArr.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              const data = {
                _mt: 'platSurveyvar.delByIds',
                logType: this.$t('button.del'),
                delIds: t.selectedArr,
              }
              for (const dat in data) {
                if (data[dat] === '') {
                  delete data[dat]
                }
              }
              getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
          })
        }
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        }
      },
      // 分页
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },  // 分页------------------------------------
      // 弹出新增编辑信息
      addNew(id, logType, index) {
        const t = this
        t.showVary = true
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.index = index
        // t.$refs.addVary.form.platSvaSuvid = parseInt(t.suvid, 10)
        // if (logType === this.$t('button.upd')) {
        //     if (t.showVary === true) {
        //         t.$refs.addVary.upData(id)
        //     }
        // }
      },
      // 关闭新增编辑信息页面
      cancle() {
        this.showVary = false
      },
      addNewArray(res) {
        const t = this
        if (t.searchData.length === 0) {
          t.searchData.push(res)
        } else {
          t.searchData.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.searchData.splice(t.index, 1, res)
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
