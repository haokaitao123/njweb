<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_homePage.quickMove.quickMoveOpr')}}
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
          <Table @on-selection-change="selectedtable" height="320" :row-class-name="addRowClass" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data"></Table>
        </i-col>
        <i-col span="4" offset="1">
          <div class="btn-group">
            <Button type="primary" @click="handleSelectAll(true)" >{{$t('button.selAll')}}</Button>
            <Button type="primary" @click="handleSelectAll(false)">{{$t('button.reset')}}</Button>
            <Button type="primary" @click="updStateRoleMe()">{{$t('button.sav')}}</Button>
          </div>
        </i-col>
      </row>
      <!--<Row style="display: flex">          <Page :total="total" showTotal size="small" show-elevator show-sizer @on-page-size-change="sizeChange" @on-change="pageChange" placement="top" :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>-->
    </div>
    <transition name="fade">
      <editQuickMoveImg v-show="openUpdateImg" @close="closeImg"  @getImgId="getImgId"   ref="editQuickMoveImg"></editQuickMoveImg>
    </transition>
  </div>
</template>
<script>
  import { isSuccess, deepCopy } from '../../lib/util'
  import editQuickMoveImg from './editQuickMoveImg'
  import { getDataLevelUserLoginNew , getDataLevelUserLogin } from '../../axios/axios'

  export default{
    data() {
      return {
        data: [],
        tableselected: [],
        total: NaN,
        openUpdateImg: false,
        pmtypeCode: '',
        imgId: '',
        index: 0,
        id: '',
        searchCloumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_homePage.quickMove.funName'),
            key: 'funName',
            width: 140,
          },
          {
            title: this.$t('lang_homePage.quickMove.funCode'),
            key: 'funCode',
            width: 130,
          },
          {
            title: this.$t('lang_homePage.quickMove.authFunImg'),
            key: 'authFunImg',
            width: 80,
            render: (h, params) => {
              console.log(params.row.authFunImg)
              return h('div', [
                h('div', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    height: '40px',
                    width: '40px',
                    'background-image': 'url(../../../static/indexImg/'+ params.row.authFunImg +')',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'margin-top': '5px',
                    'margin-bottom': '5px',
                  },
                },),
              ])
            },
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 150,
//            fixed: 'right',
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
                      this.openUpImg(params.row.id, params.index)
                    },
                  },
                }, this.$t('lang_homePage.quickMove.AssImg')),
              ])
            },
          },
        ],
        params: {
          _mt: 'sysFunctions.getIndexByPage',
          sort: 'funCode',
          order: 'asc',
          rows: 1000,
          page: 1,
        },
        searchText: this.$t('lang_homePage.quickMove.pmtypeCodeDis'),
      }
    },
    components: {
      editQuickMoveImg,
    },
    methods: {
      getData() {
        const t = this
        const data = deepCopy(t.params)
        data['roletype'] = t.$store.state.user.roleType
        data['funName'] = t.pmtypeCode
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            for (const dat in res.data.content[0].rows) {
              if (res.data.content[0].rows[dat].funCheck === '1') {
                res.data.content[0].rows[dat]['_checked'] = true
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
        if (row.funCheck === '1') {
          return 'demo-table-error-row'
        }
        return ''
      },
      openUpImg(id, index) {
        this.openUpdateImg = true
        this.index = index
      },
      getImgId(imgid) {
        let t = this
        let a = deepCopy(t.data)
        t.data = []
        a[t.index].authFunImg = imgid
        setTimeout(() => {
          t.data = a
        })
        t.openUpdateImg = false
      },
      closeImg() {
        this.openUpdateImg = false
      },
      close() {
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
        const arr = t.$refs.selection.getSelection().map(item => {
          return {
            id: item.id,
            authFunImg: item.authFunImg,
          }
        })
        let ids = ''
        const idsArr = []
        if (arr.length > 6) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_homePage.quickMove.errReminder'),
          })
          return
        }
        for (let i = 0; i < arr.length; i++) {
          idsArr.push(arr[i])
        }
        ids = JSON.stringify(idsArr)
        getDataLevelUserLogin({
          _mt: 'authFunindexAgwService.addOrUpd',
          logType: '分配快捷操作节点',
          data: ids,
          authFunType: t.$store.state.user.roleType,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
            t.$emit('getIndexFun')
            t.close()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      sizeChange(size) {
        this.params.rows = size
        this.getData()
      },
      pageChange(page) {
        this.params.page = page
        this.getData()
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (column.order !== 'normal') {
          this.getData(this.params)
        }  else [
          this.params.order = 'asc'
        ]
      },
    },
  }
</script>
<style lang="scss">
  @import "../../sass/table";
</style>
<style lang="scss" scoped>
  .short{
    height: 220px;
    display: flex;
    div{
      width: 33%;
      height: 100%;
    }
  }
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
