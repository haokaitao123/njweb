<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_employee.searchColumn.selectDepart')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_employee.searchColumn.departDis')" style="width: 200px" v-model="unitFname"/>
        <span style="margin: 0;"><Button type="primary" icon="search" :loading="searchLoading" @click="getData(params, id, 1)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="warning" icon="trash-b" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :loading="loading" :columns="searchDeptClo" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Page :total="total" size="small" :current="params.page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=params.rows :page-size-opts = "[10, 20, 50, 100]" ></Page>
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
        unitFname: '',
        searchLoading: false,
        loading: "",
      }
    },
    props: {
		  searchDeptClo: Array,
		  params: Object,
		  id: String,
	  },
	mounted() {

	},
	methods: {
		getData(params, id, page) {
      this.searchLoading = true;
			const t = this
      if (page) {
        t.params.page = page
      }
      if (id) {
        t.params.unitPid = id
      }
      const data = deepCopy(t.params)
      data.unitFname = t.unitFname
      for (const dat in data) {
				if (data[dat] === '') {
					delete data[dat]
				}
			}
			getDataLevelUserLoginNew(data).then((res) => {
				if (isSuccess(res, t)) {
				  console.log(res.data.content[0].rows,"res")
					t.data = res.data.content[0].rows
					t.total = res.data.content[0].records
				}
			}).catch(() => {
				t.$Modal.error({
					title: this.$t('reminder.err'),
					content: this.$t('reminder.errormessage'),
				})
			}).finally(() => {
          t.searchLoading = false; //请求结束关闭loading
          t.loading = false;  //结束之后设置loading关闭
      });
		},
		close() {
			const t = this
      t.unitFname = ''
      t.data = []
      t.total = NaN
      this.params.page = 1
			t.$emit('closeDept')
    	},
    	clear() {
    		const t = this
        t.unitFname = ''
        t.data = []
        t.total = NaN
        this.params.page = 1
    		t.$emit('closeDept')
    	},
    	dbCkick(row) {
    		const t = this
        this.close()
	        t.$emit('inputDept', row.unitFname, row.id)
	        t.$emit('closeDept')
    	},
    	sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (column.order !== 'normal') {
          this.getData(this.params)
        } else {
          this.params.order = 'desc'
        }
      },
    	sizeChange(size) {
	        const t = this
	        t.params.rows = size
	        t.getData(t.params)
	      },
	      pageChange(page) {
	        const t = this
	        t.params.page = page
	        t.getData(t.params)
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
