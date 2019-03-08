<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('button.refer')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="upFormData" :model="upFormData" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.borBorrower')" prop="borBorrower">
            <Input v-model="upFormData.borBorrowerDis" :disabled="true" :placeholder="$t('lang_personalfile.fileQuery.borBorrowerDis')"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="2">
          <FormItem :label="$t('lang_personalfile.fileQuery.borBortime')" prop="borBortime">
            <DatePicker v-model="upFormData.borBortime" type="date" :placeholder="$t('lang_personalfile.fileQuery.borBortimeDis')"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.borList')" prop="borList">
            <Input v-model="upFormData.borList" :disabled="true" type="textarea" :placeholder="$t('lang_personalfile.fileQuery.borListDis')"></Input>
          </FormItem>
          </Col>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.borReason')" prop="borReason">
            <Input v-model="upFormData.borReason" type="textarea" :placeholder="$t('lang_personalfile.fileQuery.borReasonDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <!--<Row>-->
        	<!--<Col span="10" offset="1">-->
          <!--<FormItem label="查阅时间" prop="borBortime">-->
          	<!--<DatePicker v-model="upFormData.borBortime" type="date" placeholder="查阅时间"></DatePicker>-->
          <!--</FormItem>-->
          <!--</Col>-->
        <!--</Row>-->
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" style="margin-left: 8px" @click="handleReset">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchTable v-show="openPick" :searchTitle="searchTitle" :searchText="searchText" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import searchTable from '../../../components/searchTable/searchTable'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        openPick: false,
        searchText: this.$t('lang_personalfile.fileQuery.borSearchText'),
        searchTitle: this.$t('lang_personalfile.fileQuery.borSearchTitle'),
        searchCloumns: [
          {
            title: this.$t('lang_personalfile.fileQuery.name'),
            key: 'name',
          },
          {
            title: this.$t('lang_personalfile.fileQuery.idNo'),
            key: 'idNo',
          },
        ],
        params: {
          _mt: 'userMgmt.userpage',
          status: '02valid',
          sort: 'id',
          order: 'asc',
          rows: 10,
          page: 1,
          logType: '查询',
        },
        upFormData: {
        	ids: '',
        	userid: '',
          borReason: '',
          borBortime: '',
          borRettime: '',
          borCity: '',
          borAddress: '',
          borZipcode: '',
          borList: '',
          borBorrowerDis: '',
          borBorrower: '',
        },
        ruleValidate: {
          borReason: [
            { required: true, message: this.$t('lang_personalfile.fileQuery.borReasonDis'), trigger: 'blur' },
          ],
          borBortime: [
            { required: true, type: 'date', validator: this.validStartTime, trigger: 'change' },
          ],
          borRettime: [
            { required: true, type: 'date', message: this.$t('lang_personalfile.fileQuery.borRettimeDis'), trigger: 'change' },
          ]
        },
      }
    },
    props: {
      logType: String,
    },
    components: {
      searchTable,
    },
    mounted() {
    },
    methods: {
      getBorrower(userId) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'userMgmt.getuserbyid',
          id: userId,
          funId: '1',
          logType: '根据用户id获取用户信息',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.upFormData.borBorrower = res.data.content[0].id
            t.upFormData.borBorrowerDis = res.data.content[0].name
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },

      /**
       * 获取档案列表
       * @param id
       * @param userid
       */
      getBorList(id, userid) {
			  const t = this
        t.getBorrower(userid)
        getDataLevelUserLogin({
          _mt: 'archivesBorrow.getBorrowList',
          logType: '查询档案列表',
          archivIds: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.upFormData.borList = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
			validStartTime(rule, value, callback) {
      	  let startTimeNum = (new Date(this.upFormData.resStime)).getTime()
  				let endTimeNum = (new Date(this.upFormData.resEtime)).getTime()
	      	if (!value) {
	      		return callback(new Error(this.$t('lang_personalfile.fileQuery.borBortimeDis')))
	      	} else if (startTimeNum > endTimeNum) {
	      		return callback(new Error(this.$t('lang_personalfile.fileQuery.startLendtime')))
	      	} else {
	      		return callback()
	      	}
      },
      handleSubmit() {
        const t = this
        t.$refs.upFormData.validate((valid) => {
        	if (valid) {
        		const data = deepCopy(t.upFormData)
            data._mt = 'archivesBorrow.insert'
            data.logType = t.logType
            data.roleType = '3user'
		        if (data.borBortime !== undefined && data.borBortime !== '') {
		          data.borBortime = new Date(data.borBortime).format('yyyy-MM-dd')
		        } else {
		          data.borBortime = ''
		        }
		        getDataLevelUserLoginNew(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	t.handleReset()
	              t.$Modal.success({
	                title: this.$t('reminder.suc'),
	                content: this.$t('reminder.borrowsuccess'),
	              })
	              t.$refs.upFormData.resetFields()
								t.$emit('update', res.data.content[0])
		          }
		        }).catch(() => {
		          this.$Modal.error({
		            title: this.$t('reminder.err'),
		            content: this.$t('reminder.errormessage'),
		          })
		        })
        	}
        })
      },
      handleReset() {
        this.$emit('closeUp')
        this.$refs.upFormData.resetFields()
      },
      // 选择用户
      close() {
        const t = this
        t.openPick = false
      },
      changeinput() {
        const t = this
        t.cmutKntypeProcessidDis = name
        t.formValidate.cmutKntypeProcessid = code
      },
    },
  }
</script>
<style lang="scss" scoped>
	.cover{
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
	  .box{
	    position:relative;
	    width: 900px;
	    background-color: #fff;
	    padding: 60px 20px 30px 20px;
	    border-radius: 10px;
	    .form{
	      max-height: 800px;
	      overflow-y: auto;
	    }
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
