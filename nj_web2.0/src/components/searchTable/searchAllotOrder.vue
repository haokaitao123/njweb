<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_communication.allotWorkOrder.searchTitle')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <!--<Input placeholder="请输入姓名..." style="width: 200px" v-model="cmstmUseridDis"/>
        <Button type="primary" icon="search" @click="searchData">{{$t('button.ser')}}</Button>
        <Button type="warning" icon="trash-b">清空</Button>-->
        <!--<Button type="primary" icon="ios-gear-outline">分配</Button>-->
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="searchCloumns"  :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
        data: [],
        total: NaN,
	      sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        tId: '',
      }
    },
    props: {
    	searchCloumns: Array,
    },
    mounted() {

    },
    methods: {
      getData(row) {
        const t = this
        t.tId = row
        const dataP = {
        	_mt: 'cmutSupteammember.getPage',
        	logType: this.$t('button.ser'),
        	rows: t.rows,
        	page: t.page,
        	sort: t.sort,
        	order: t.order,
        	orderType: row.cmwdType,
        }
//      dataP['cmstmUseridDis'] = t.cmstmUseridDis
        for (const dat in dataP) {
          if (dataP[dat] === '') {
            delete dataP[dat]
          }
        }
        getDataLevelUserLoginNew(dataP).then((res) => {
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
      close() {
        this.page = 1
        this.$emit('closeUp')
      },
      dbCkick(row) {
        const t = this
//      console.log(row)
        const data = {
        	_mt: 'cmutWorkorderrecord.addOrUpd',
        	logType: '分配工单',
        	cmwdrdWdid: t.tId.id,
        	cmwdrdFeedback: row.cmstmUserid,
        	cmwdrdFeedbacktype: '0',
        	alltoType: '0',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$Notice.success({
                title: this.$t('lang_communication.allotWorkOrder.remindMessage'),
            })
            t.close()
            t.$emit('resetData')
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
        t.getData(t.params)
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData(t.params)
      },
      clear() {
        this.$emit('clear')
        this.$emit('closeUp')
      },
      searchData() {
      	this.getData(this.tId)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin-bottom: 10px;
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
      width: 800px;
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
