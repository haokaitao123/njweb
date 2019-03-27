<template>
	<div>
		 <Breadcrumb>
	        <BreadcrumbItem style="font-size: 15px;">{{$t('lang_homePage.messageList.readed')}}</BreadcrumbItem>
	    </Breadcrumb>

	    <div class="messDiv">
	    	<Table :columns="columns" :data="data" :height="tableHeight" style="margin-bottom: 10px;" @on-row-click="rowClick"></Table>
	    	<Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
	    </div>
	</div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLogin2, getDataLevelUserLoginSenior } from '../../../axios/axios'
	import { isSuccess } from '../../../lib/util'

	 export default{
    data() {
      return {
      	tableHeight: document.body.offsetHeight - 280,
      	columns: [
	      	{
	      		title: this.$t('lang_homePage.messageList.noticbaseTitle'),
	      		key: 'msgTitle',
	      	},
	      	{
	      		title: this.$t('lang_homePage.messageList.noticbaseSource'),
	      		key: 'msgBustype',
	      	},
	      	{
	      		title: this.$t('lang_homePage.messageList.noticbasePublish'),
	      		key: 'msgTime',
	      	},
      	],
      	data: [],
      	total: NaN, // 总页数
      	sort: 'id',
        order: 'asc',
        rows: '10',
        page: '1',
      }
    },
    computed: {

    },
    components: {
    },
    mounted() {
    	this.getData()
    },
    methods: {
    	getData() {
    		const t = this
    		const nowDate = {
    			noticbaseType: '1',
    		}
    		const data = {
    			_mt: 'baseMsgrecord.getByPage',
    			sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
    			logType: '查询消息',
    			data: JSON.stringify(nowDate),
    		}
			 getDataLevelUserLogin2(data).then((res) => {
		        if (isSuccess(res, t)) {
//		        	for (let i = 0; i < res.data.content[0].rows.length; i++) {
//		        		res.data.content[0].rows[i].noticbasePublish = new Date(res.data.content[0].rows[i].noticbasePublish).format('yyyy-MM-dd')
//		        	}
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
    	rowClick(row) {
    		//提交数据
    		this.$store.commit('message/setValue', row)
    		//打开已读详情
    		this.$store.commit('message/readIndex', 'r4')
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
    },
  }
</script>

<style lang="scss" scoped>
	.messDiv{
		margin-top: 15px;
	}
</style>
