<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_authorization.platRolecont.title')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_authorization.platRolecont.platRolecontCodeDis')" style="width: 160px"  @on-enter="enterEvent"  v-model="platRolecontCode"/>
          <Input :placeholder="$t('lang_authorization.platRolecont.platRolecontCnnameDis')" style="width: 160px" @on-enter="enterEvent" v-model="platRolecontCnname"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page  :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="closeUp" :index="index" @updateArray="updateArray" @addNewArray="addNewArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './platRoleBase'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
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
            align: 'center',
            fixed: 'left'
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontCode'),
            key: 'platRolecontCode',
            width: 100,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontCnname'),
            key: 'platRolecontCnname',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontEnname'),
            key: 'platRolecontEnname',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontDesc'),
            key: 'platRolecontDesc',
            width: 200,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontNotice'),
            key: 'platRolecontNoticeDis',
            width: 130,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontPhone'),
            key: 'platRolecontPhone',
            width: 140,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontSms'),
            key: 'platRolecontSms',
            width: 140,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontUnifiedcn'),
            key: 'platRolecontUnifiedcn',
            width: 140,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontUnifieden'),
            key: 'platRolecontUnifieden',
            width: 140,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontMail'),
            key: 'platRolecontMail',
            width: 140,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRolecont.platRolecontVaild'),
            key: 'platRolecontVaildDis',
            width: 100,
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
        order: 'asc',
        rows: 20,
        page: 1,
        platRolecontCode: '',
        platRolecontCnname: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mounted() {
      this.getData(1)
    },
    methods: {
      //enter事件
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
        const data = {
          _mt: 'platRolecontact.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          platRolecontVaild: '1',
          platRolecontCode: t.platRolecontCode,
          platRolecontCnname: t.platRolecontCnname,
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
          this.getData()
        } else {
          this.order = 'desc'
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
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.leastone'),
        		onOk: () => {
        			getDataLevelUserLogin({
          _mt: 'platRolecontact.delByIds',
          logType: this.$t('button.del'),
          delIds: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.tableselected = []
            t.getData(1)
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
        t.index = index
        t.openUpdate = true
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('platRole/setMainId', id)
        this.$store.commit('platRole/setIndex', index)
        if (id) {
          t.$refs.update.getOptionData()
        }
        t.$refs.update.getOption(logType)
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.clear()
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
