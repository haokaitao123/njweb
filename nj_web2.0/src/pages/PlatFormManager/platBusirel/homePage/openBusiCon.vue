<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;业务联系人定义
        </p>
        <Row :style="{height:divheight + 'px'}" :gutter="20">
          <Table :columns="columns" :data="messageData" :height="tableHeight" style="margin-bottom: 10px;" ></Table>
	    		<Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
    	<busidetail v-show="isBusi" ref="busidetail" @closeUp="closeUp"></busidetail>
    </transition>
  </div>
</template>
<script>
	import busidetail from './busiConDetail'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'

  export default {
    data() {
      return {
      	divheight: document.body.offsetHeight - 200,
      	tableHeight: document.body.offsetHeight - 230,
        messageData: [],
        isBusi: false,
        columns: [
        	{
            title: this.$t('lang_platBusirel.platBusirel.platSerConperson'),
        		key: 'platSerConperson',
        	},
        	{
            title: this.$t('lang_platBusirel.platBusirel.platSerTeam'),
        		key: 'platSerTeam',
        	},
        	{
            title: this.$t('lang_platBusirel.platBusirel.platSerLevelName'),
        		key: 'platSerLevelName',
        	},
        	{
            title: this.$t('lang_platBusirel.platBusirel.platSerTime'),
        		key: 'platSerTime',
        	},
        	{
            title: this.$t('lang_platBusirel.platBusirel.platSerTel'),
        		key: 'platSerTel',
        	},
        	{
            title: this.$t('lang_platBusirel.platBusirel.platSerEmail'),
        		key: 'platSerEmail',
        	},
        ],
        total: NaN, // 总页数
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: '1',
      }
    },
    computed: {

    },
    components: {
    	busidetail,
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        const t = this
        const tData = {}
        const data = {
        	_mt: 'platBusirel.getPage',
          funId: 1,
          logType: '查询联系人',
          sort: t.sort,
       		order: t.order,
        	rows: t.rows,
        	page: t.page,
        	data: JSON.stringify(tData),
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].rows) {
                t.messageData = res.data.content[0].rows
            }
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
//    rowClick(row) {
//    	const t = this
//    	t.isBusi = true
//    	t.$refs.busidetail.getData(row)
//    },
      closeUp() {
        const t = this
        t.isBusi = false
      },
    },
  }
</script>
<style lang="scss" scoped>

</style>
