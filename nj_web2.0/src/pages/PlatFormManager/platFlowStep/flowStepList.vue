<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;系统表单配置
        </p>
        <Row>
          <Input placeholder="请输入流程名称" style="width: 200px" v-model="flstepFlowDis"/>
          <Input placeholder="请输入步骤名称" style="width: 200px" v-model="flstepName"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="$store.state.sysData.mainTable"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="closeUp" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './updFlowStep'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
//          TODO:这里高度计算可能有问题
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '显示序号',
            key: 'flstepDisorder',
            width: 80,
            sortable: 'custom',
          },
          {
            title: '流程名称',
            key: 'flstepFlowDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: '步骤名称',
            key: 'flstepName',
            width: 150,
          },
          {
            title: '提交发起审批',
            key: 'flstepIsapprove',
            width: 150,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
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
        total: 0,
        sort: 'flstepDisorder',
        order: 'asc',
        rows: 20,
        page: '1',
        flstepFlowDis: '',
        flstepName: '',
      }
    },
    /*
    * 组件声明的地方，所有引入的组件要使用都需要在这里声明
    * */
    components: {
      update,
    },
    /*
    * 生命周期mounted钩子，相当于$(function())
    * */
    mounted() {
      this.getData()
    },
    methods: {
        /*
        * 初始获取表格数据
        * */
      getData() {
        const t = this
        const data = {
          _mt: 'platFlowstep.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          flstepFlowDis: t.flstepFlowDis,
          flstepName: t.flstepName,
        }
        /*
        * 删除data中为空的数据，不传到后台
        * */
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
//          获取到表格数据存入vuex中
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('flowStepData/setMainTable', res.data.content[0].rows)
            }
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 切换每页显示条数方法
      * */
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      /*
      * 翻页方法
      * */
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      /*
      * 排序方法
      * */
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        }
      },
      /*
      * 多选方法，将数据逗号分割放入tableselected中
      * */
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      /*
      * 删除方法
      * */
      // TODO: 增加删除提示
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: '请选择要删除的象',
          })
          return
        }
        getDataLevelUserLogin({
          _mt: 'platSysform.delByIds',
          funId: '1',
          companyId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected,
        }).then((res) => {
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
      /*
      * 打开弹出页面的方法
      * */
      openUp(id, logType, index) {
        const t = this
        t.openUpdate = true
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('sysData/setMainId', id)
        this.$store.commit('sysData/setIndex', index)
        if (id) {
          t.$refs.update.getOptionData()
        }
      },
      /*
      * 关闭弹出页面的方法
      * */
      closeUp() {
        const t = this
        t.openUpdate = false
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
