<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_role.adminuser.title')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_user.rootuser.placeholdername')"style="width: 200px" v-model="userName"/>
          <span style="margin: 0;"><Button type="primary" icon="search"
                                           @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"
                 @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns"
                 :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp"
              @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <updStateUser v-show="updState" :roleUserName="roleUserName" :searchText="searchText"
                    :searchCloumns="searchCloumns" @close="close" @changeinput="changeinput" :sentParams='params'
                    ref="updStateUser"></updStateUser>
    </transition>
  </div>
</template>
<script>
  import update from './editAuthUserinfo'
  import updStateUser from './updStateUser'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess} from '../../../lib/util'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        updState: false,
        searchText: this.$t('lang_user.rootrole.proleCname'),
        searchCloumns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_user.rootgrprole.roleCname'),
            key: 'roleCname',
          },
          {
            title: this.$t('lang_user.rootuserrole.authGrpDis'),
            key: 'authGrpDis',
          },
        ],
        // 分配角色
        params: {
          _mt: 'authRole.getAuthRoleByPage',
          sort: 'id',
          order: 'desc',
          rows: '1000',
          page: '1',
          roleType: '3user',
        },
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_user.rootuser.name'),
            key: 'userName',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_user.rootuser.mobileNo'),
            key: 'mobileNo',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_role.adminuser.sysUsempidDis'),
            key: 'sysUsempidDis',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_user.rootuserrole.authGrpDis'),
            key: 'sysUsbsrolegrpDis',
            sortable: 'custom',
//          width: 140,
          },
          {
            title: this.$t('lang_user.rootgrprole.validDis'),
            key: 'sysBsvalidDis',
            sortable: 'custom',
//          width: 140,
          },
          {
            title: this.$t('lang_role.adminuser.isDataPermissionsDis'),
            key: 'isDataPermissionsDis',
            sortable: 'custom',
//          width: 140,
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
                      this.updRoleState(params.row.id, params.row.userName)
                    },
                  },
                }, this.$t('lang_user.rootrole.assauth')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        select: this.$t('lang_user.rootuser.valid'),
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: 1,
        userName: '',
        roleUserName: '',
      }
    },
    computed: {},
    components: {
      update,
      updStateUser,
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
          _mt: 'sysUserinfo.getUserinfoByPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          sysBsvalid: '1',
          userName: t.userName,
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
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
        this.tableselected = newArr.toString()
      },
      updRoleState(id, userName) {
        const t = this
        t.$refs.updStateUser.id = id
        t.$refs.updStateUser.getData(t.params)  //  分配角色
        t.$refs.updStateUser.orangize_getData() //  分配组织架构
        t.$refs.updStateUser.cost_getData(id)  //  分配成本中心
       // t.$refs.updStateUser.workOrderType_getData() //分配工单类型
        t.$refs.updStateUser.paySal_getData(id) //分配工单类型
        t.$refs.updStateUser.bfarea_getData(id) //分配工单类型
        t.updState = true
        t.roleUserName = userName
      },
      changeinput(name, id) {
        const t = this
        t.rolegrpCode = name
        t.rolegrpCname = id
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
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'sysUserinfo.delByIds',
                logType: this.$t('button.del'),
                delIds: t.tableselected,
                stateType: '2',
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData(1)
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
        t.$refs.update.getSelect()
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.updState = false
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.clearCheck()
        t.$refs.update.companyIdDis = ''
        t.$refs.update.userName = ''
        t.$refs.update.mobileNo = ''
        t.$refs.update.loginName = ''
        t.$refs.update.email = ''
        t.$refs.update.formValidate.sysUsbsrolegrpDis = ''
        t.$refs.update.formValidate.sysBsvalid = '1'
        t.$refs.update.formValidate.sysUserid = ''
        t.$refs.update.formValidate.companyId = ''
        t.$refs.update.formValidate.sysUsbsrolegrp = ''
        t.$refs.update.formValidate.sysUsempid = ''
        t.$refs.update.formValidate.isDataPermissions = '0'
        t.$refs.update.sysUsempidDis = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
