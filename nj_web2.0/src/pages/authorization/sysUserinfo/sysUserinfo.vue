<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>

          &nbsp;{{$t('lang_user.rootrole.title1')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_user.rootuser.placeholdername')" style="width: 200px" @on-enter="enterEvent" v-model="userName"/>
          <Dropdown>
            <Button type="primary">
              {{statusDis}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="pickData" v-show="userStatus !=='03invalid' ? true : false">{{$t('lang_user.rootuser.add')}}</Button>
          <span style="margin: 0;" v-show="userStatus ==='01draft' ? true : false">
          <Button type="success" @click="updStateRootUser('1','生效')">{{$t('lang_user.rootuser.valid')}}</Button>
          </span>
          <span style="margin: 0;" v-show="userStatus ==='02valid' ? true : false">
          <Button type="error" @click="updStateRootUser('0','失效')">{{$t('lang_user.rootuser.invalid')}}</Button>
             </span>
          <span style="margin: 0;" v-show="userStatus ==='03invalid' ? true : false">
          <Button type="success" @click="updStateRootUser('1','退回')">{{$t('lang_user.rootuser.valid')}}</Button>
             </span>
          <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
        </Row>
        <!--<Row>-->
          <!--<RadioGroup v-model="userStatus" v-for="(item,index) in dropdownMenuList" :key="index" style="margin-top: 5px"  @on-change="getPageByState(item.paramCode,item.paramInfoName)">-->
            <!--<Radio :label="item.paramCode">{{item.paramInfoName}}</Radio>-->
          <!--</RadioGroup>-->
        <!--</Row>-->
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection"
                 :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :current="page"  :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
              @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <searchPubUser v-show="openPick"  @closeUp="closeUp" @changeinput="changeinput" ref="searchPubUser"></searchPubUser>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../../axios/axios'
  import searchPubUser from '../../../components/searchTable/searchPubUser'
  import {isSuccess} from '../../../lib/util'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        userStatus: '02valid',
        value: '',
        statusDis: this.$t('lang_user.rootuser.valid'),
        eakeEffect: 0,
        eakeinvalid: 1,
        openPick: false,
        opendialog: false,
        tableselected: [],
        dropdownMenuList: [],
        select: '已生效',
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_user.rootuser.name'),
            key: 'userName',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuser.mobileNo'),
            key: 'mobileNo',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.loginName'),
            key: 'loginName',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuser.email'),
            key: 'email',
//          width: 180,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.sysRootvalidDis'),
            key: 'sysRootvalidDis',
//          width: 120,
            sortable: 'custom',
          },
        ],
        searchText: '请输入用户名称或手机号或登录名',
        searchCloumns: [
          {
            title: this.$t('lang_user.rootuser.name'),
            key: 'name',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuser.mobileNo'),
            key: 'mobileNo',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.loginName'),
            key: 'loginName',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuser.email'),
            key: 'email',
//          width: 180,
            sortable: 'custom',
          },
        ],
        data: [],
        total: NaN, // 总页数
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: 1,
        userName: '',
        logType: '',
        sysRootvalid: '1',
      }
    },
    computed: {},
    components: {
      searchPubUser,
    },
    mounted() {
      this.getData(1)
      this.getSelect()
    },
    methods: {
      enterEvent(e){
        if(e.target.value != ''){
          this.getData(1)
        }
      },
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          _mt: 'sysUserinfo.getSysUserinfoByPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          userName: t.userName,
          sysUserSign: '1',
          sysRootvalid: t.sysRootvalid,
          sysIsroot: '1',
          logType: '超级用户管理列表查询',
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
      pickData() {
        this.$refs.searchPubUser.getData()
        this.openPick = true
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
      addSysRootUser() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.addOrUpdSysUserinfo',
          logType: '新增',
          companyId: '1',
          sysUserid: t.sysUserid,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.addsuccess'),
              onOk: () => {
                t.getData(1)
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
      updStateRootUser(state, logType) {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: '请确定失效该条数据？',
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'sysUserinfo.updStateRootUserByIds',
                funId: '1',
                companyId: '1',
                logType: logType,
                ids: t.tableselected,
                state: state,
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
//      deletemsg() {
//        const t = this
//        if (t.tableselected.length === 0) {
//          t.$Modal.warning({
//            title: this.$t('reminder.remind'),
//            content: this.$t('reminder.leastone'),
//          })
//        } else {
//          t.$Modal.confirm({
//            title: this.$t('reminder.remind'),
//            content: this.$t('reminder.confirmdelete'),
//            onOk: () => {
//              t.delUserChec()
//            },
//            onCancel: () => {
//            },
//          })
//        }
//      },
      delUserChec(){
        const t = this
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.delByIds',
          funId: '1',
          companyId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
//            t.$Modal.success({
//              title: this.$t('reminder.suc'),
//              content: '删除成功',
//              onOk: () => {
                t.getData(1)
//              },
//            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      changeinput(name, email, mobileNo, loginName, id) {
        const t = this
        t.sysUserid = id
        t.addSysRootUser()
      },
      clear() {
        const t = this
        t.sysUserid = ''
      },
      open() {
        const t = this
        t.opendialog = true
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openPick = false
        t.pmtypeCode = false
        t.$refs.searchPubUser.pmtypeCode = ''
      },
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            let statusList = res.data.content[0].value[0].paramList
            for (let i = 0; i < statusList.length; i++) {
                if (statusList[i].paramCode !== '01draft') {
                  t.dropdownMenuList.push(statusList[i])
                }
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getPageByState(paramCode, paramInfoName) {
        const t = this
        t.userStatus = paramCode
        if (t.userStatus === '02valid') {
          t.sysRootvalid = '1'
        } else if (t.userStatus === '03invalid') {
          t.sysRootvalid = '0'
        } else {
          t.sysRootvalid = ''
        }
        t.getData(1)
        t.statusDis = paramInfoName
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

</style>
