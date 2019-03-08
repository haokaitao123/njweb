<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{roleGrpName}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(params)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="warning" icon="trash-b" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <i-col span="19">
         <Table @on-selection-change="selectedtable" height="320" :row-class-name="addRowClass" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
        </i-col>
        <i-col span="4" offset="1">
          <div class="btn-group">
            <Button type="primary" @click="handleSelectAll(true)" >{{$t('lang_user.rootrole.allPick')}}</Button>
            <Button type="primary" @click="handleSelectAll(false)">{{$t('lang_user.rootrole.resetTree')}}</Button>
            <Button type="primary" @click="updStateRoleMe()">{{$t('button.sav')}}</Button>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default{
  data() {
    return {
      data: [],
      tableselected: [],
      total: NaN,
      pmtypeCode: '',
      id: '',
      params: {
        _mt: 'authRole.getAuthRoleByPage',
        sort: 'id',
        order: 'desc',
        rows: '1000',
        page: 1,
        roleCname: '',
      },
    }
  },
  props: {
    searchText: String,
    roleGrpName: String,
    searchCloumns: Array,
  },
  mounted() {

  },
  methods: {
    getData() {
      const t = this
      const data = deepCopy(this.params)
      data['roleCname'] = t.pmtypeCode
      data['authGroupSign'] = 1
      data['authGroupId'] = t.id
      data['roleType'] = '6essmss'
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      getDataLevelUserLoginNew(data).then((res) => {
        if (isSuccess(res, t)) {
          for (const dat in res.data.content[0].rows) {
            if (res.data.content[0].rows[dat].authGroupTitl === '1') {
              res.data.content[0].rows[dat]['_checked'] = true
//              res.data.content[0].rows[dat]['_disabled'] = true
            }
          }
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
    addRowClass(row, index) {
      if (row.authGroupTitl === '1') {
        return 'demo-table-error-row'
      }
      return ''
    },
    close() {
      this.$emit('close')
    },
    dbCkick(row) {
      const t = this
      this.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[1].key])
      this.$emit('close')
    },
    clear() {
      this.$emit('clear')
      this.$emit('close')
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    selectedtable(selection) {
      const newArr = []
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id)
      }
      this.tableselected = newArr.toString()
    },
    updStateRoleMe() {
      const t = this
//      const t = this
      const arr = t.$refs.selection.getSelection()
      let ids = ''
      const idsArr = []
      for (let i = 0; i < arr.length; i++) {
        idsArr.push(arr[i].id)
      }
      ids = idsArr.join(',')
      getDataLevelUserLogin({
        _mt: 'authRoleGroup.addRoleByIdAndRoleIds',
        logType: '分配权限',
        roleIds: ids,
        id: t.id,
      }).then((res) => {
        if (isSuccess(res, t)) {
          t.$Modal.success({
            title: this.$t('reminder.suc'),
            content: '保存成功',
          })
          t.close()
        }
      }).catch(() => {
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    sortable(column) {
      this.params.sort = column.key
      this.params.order = column.order
      if (column.order !== 'normal') {
        this.getData(this.params)
      }
    },
  },
}
</script>
<style lang="scss">
  @import "../../../sass/table";
</style>
<style lang="scss" scoped>
  .table-form{
    margin-bottom: 10px;
  }
  .btn-group{
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .background{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
  .backbox{
    position:relative;
    width: 750px;
    background-color: #fff;
    padding: 60px 20px 30px 20px;
    border-radius: 10px;
  .title{
    display: flex;
    position: absolute;
    height: 40px;
    width: 100%;
    line-height: 40px;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    top: 0;
    border-bottom: 1px solid #efefef;
    left: 0;

  .title-text{
    font-weight: bold;
    font-size: 14px;
  }
  }
  }
  }
</style>
