<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_personalfile.fileQuery.fileDetail')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="upFormData" :model="upFormData" :label-width="100">
      	<Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entEmpid')" prop="entEmpidDis">
          	<Input v-model="upFormData.entEmpidDis" :disabled="true"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entClaid')" prop="entClaidDis">
          	<Input v-model="upFormData.entClaidDis" :disabled="true"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entNo')" prop="entNo">
            <Input v-model="upFormData.entNo" :disabled="true"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entName')" prop="entName">
          	<Input v-model="upFormData.entName" :disabled="true"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="7" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entTime')" prop="entTime">
          	<Input v-model="upFormData.entTime" :disabled="true"/>
          </FormItem>
          </Col>
          <Col span="6" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entCenid')" prop="entCenidDis">
            <Input v-model="upFormData.entCenidDis" :disabled="true"></Input>
          </FormItem>
          </Col>
          <Col span="6" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entCabid')" prop="entCabidDis">
            <Input v-model="upFormData.entCabidDis" :disabled="true"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entFile')" prop="entFile">
            <a @click="downloadAttach(upFormData.entFile)">{{upFormData.entFileName}}</a>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.fileQuery.entNote')" prop="entNote">
            <Input v-model="upFormData.entNote" type="textarea" :disabled="true"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        upFormData: {
        	entNo: '',
          entName: '',
          entEmpidDis: '',
          entClaidDis: '',
          entTime: '',
          entCenidDis: '',
          entCabidDis: '',
          entFile: '',
          entFileName: '',
          entNote: '',
        },
      }
    },
    methods: {
			getData(id){
				const t = this
        if(id){
	        getDataLevelUserLogin({
	          _mt: 'archivesEntry.getById',
	          logType: '查询单条数据',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.entNo = res.data.content[0].entNo
			        t.upFormData.entName = res.data.content[0].entName
			        t.upFormData.entEmpidDis = res.data.content[0].entEmpidDis
			        t.upFormData.entClaidDis = res.data.content[0].entClaidDis
			        t.upFormData.entTime = res.data.content[0].entTime
			        t.upFormData.entCenidDis = res.data.content[0].entCenidDis
			        t.upFormData.entCabidDis = res.data.content[0].entCabidDis
			        t.upFormData.entFile = res.data.content[0].entFile
			        t.upFormData.entFileName = (t.upFormData.entFile).split(':')[0]
			        t.upFormData.entNote = res.data.content[0].entNote
	          }
	        }).catch(() => {
	          this.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
        }
			},
			downloadAttach(vname) {
				let nameKey = vname.split(":")[1];
	      const t = this
    		let data = {
	          _mt: 'userMgmt.getfiletoken',
	          isprivate: true,
	          logType: '下载附件消息',
	          filekey: nameKey,
	          expiresecs: 180,
	        }
	        getDataLevelUserLogin(data).then((res) => {
	          if (isSuccess(res, t)) {
              localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
              if (this.isIE()) {
                window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vname)
              } else {
                let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vname)
                let link = document.createElement('a')
                link.href = doclink
                link.download = 'downloadfiletemp'
                link.click()
              }
              this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
              localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
	          }
	        }).catch(() => {
	          t.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
	    },
      handleSubmit() {
        const t = this
				t.handleReset()
      },
      handleReset() {
      	const t = this
        t.$emit('closeDetail')
        t.$refs.upFormData.resetFields()
      }
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
