<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>

          &nbsp;{{$t('lang_user.rootrole.title2')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_user.rootrole.proleCode')" style="width: 200px" v-model="roleCode"/>
          <Input :placeholder="$t('lang_user.rootrole.proleCname')" style="width: 200px" v-model="roleCname"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>

          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable"@on-sort-change="sortable"   @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" showTotal size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray"  ref="update"></update>
    <tree v-show="showTree" :roleName="roleName" @closePower="closePower" ref="tree"></tree>
  </div>
</template>
<script>
  import update from './addAndUpdRole'
  import tree from './tree'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        showTree: false,
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
            title: this.$t('lang_user.rootrole.roleCode'),
            key: 'roleCode',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_user.rootrole.companyIdDis'),
            key: 'companyIdDis',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_user.rootrole.roleCname'),
            key: 'roleCname',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_user.rootrole.roleEname'),
            key: 'roleEname',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_user.rootrole.roleTypeDis'),
            key: 'roleTypeDis',
            sortable: 'custom',
            width: 220,
          },

          {
            title: this.$t('lang_user.rootrole.validDis'),
            key: 'validDis',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('lang_user.rootrole.invdate'),
            key: 'invdate',
            sortable: 'custom',
            width: 220,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 150,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.power(params.row.id, params.row.companyId, params.row.roleCname)
                    },
                  },
                }, this.$t('lang_user.rootrole.assauth')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        roleCode: '',
        roleCname: '',
        roleName: '',
        roleType: '',
      }
    },
    computed: {

    },
    components: {
      update,
      tree,
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
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          _mt: 'authRole.getAuthRoleByPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          roleCode: t.roleCode,
          roleCname: t.roleCname,
          roleType: '1admin',
          authGroupSign: '999',
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
//            alert(t.total)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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
          this.getData(1)
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
             title: this.$t('reminder.err'),
             content: this.$t('reminder.leastone'),
           })
        } else {
         t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_user.rootrole.delTips'),
            onOk: () => {
            getDataLevelUserLogin({
          _mt: 'authRole.delByIds',
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
          onCancel: () => {
           },
       })
        }
      },
      power(id, companyId, roleCname) {
        const t = this
        t.roleName = roleCname
        t.$refs.tree.getData(id, companyId)
        t.showTree = true
      },
      closePower() {
        const t = this
        t.showTree = false
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getSelect()
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
        t.$refs.update.clearCheck()
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

</style>
