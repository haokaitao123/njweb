<template>
  <div class="option-main">
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.platDoc.platDctpCode')" prop="platDctpCode">
              <Input v-model="formValidate.platDctpCode" :placeholder="$t('lang_platdoc.platDoc.p_platDctpCode')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_platdoc.platDoc.platDctpName')" prop="platDctpName">
              <Input v-model="formValidate.platDctpName" :placeholder="$t('lang_platdoc.platDoc.p_platDctpName')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
           <FormItem :label="$t('lang_platdoc.platDoc.platDctpAffix')" prop="platDctpAffix">
             <Row>
               <i-col span="3">
               <Upload :before-upload="handleUpload" action=" ">
                 <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button>
               </Upload>
               </i-col>
               <i-col span="20" offset="1">
               <span v-if="file !== '' ">
               	<i-col span="22">
               	<Input v-model="file.name" readonly="readonly" >
			    				<span slot="prepend">
			    					<Icon type="folder" size="16"></Icon>
			    				</span>
			    			</Input>
			    			</i-col>
			    			<i-col span="2">
	               	<Button type="text"  @click="uploadLocalFile" v-if="loadingStatus">
				        		{{$t('lang_platdoc.platDoc.plat_upload')}}
				        	</Button>
				        	<Button type="text"  @click="downloadFile" v-if="!loadingStatus">
				        		{{$t('lang_platdoc.platDoc.plat_download')}}
				        	</Button>
               </i-col>
               </span>
               </i-col>
             </Row>
           </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.platDoc.platDctpValidDis')"  prop="platDctpValid" :label-width="135">
              <RadioGroup  v-model="formValidate.platDctpValid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platdoc.platDoc.platDctpComment')" prop="platDctpComment">
              <Input v-model="formValidate.platDctpComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platDoc.platDctpComment')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        id: '',
        file: '',
        filekey: '',
        loadingStatus: false,
        yesOrNo: [],
        formValidate: {
          _mt: 'platDocTemplate.addOrUpd',
          platDctpCode: '',
          platDctpName: '',
          platDctpAffix: '',
          platDctpValid: '1',
          platDctpComment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          platDctpCode: [
            { required: true, message: this.$t('lang_platdoc.platDoc.rule_platDctpCode'), trigger: 'blur' },
          ],
          platDctpName: [
            { required: true, message: this.$t('lang_platdoc.platDoc.rule_platDctpName'), trigger: 'blur' },
          ],
          platDctpValid: [
            { required: true, message: this.$t('lang_platdoc.platDoc.rule_platDctpValidDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
    },
    components: {
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      getdata() {
        const t = this
        if (!t.$store.state.docTemp.mainId) {
          return
        }
        getDataLevelUserLogin({
          _mt: 'platDocTemplate.getById',
          id: t.$store.state.docTemp.mainId,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.platDctpCode = res.data.content[0].platDctpCode
            t.formValidate.platDctpName = res.data.content[0].platDctpName
            t.formValidate.platDctpValid = res.data.content[0].platDctpValid
            t.formValidate.platDctpComment = res.data.content[0].platDctpComment
            t.platDctpValidDis = res.data.content[0].platDctpValidDis
            if (res.data.content[0].platDctpAffix) {
              t.file = { name: res.data.content[0].platDctpAffix.split(':')[0] }
              t.filekey = res.data.content[0].platDctpAffix.split(':')[1]
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesOrNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        if (t.$store.state.docTemp.mainId) {
          data.id = t.$store.state.docTemp.mainId
          data.logType = '修改'
        } else {
          data.logType = '新增'
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.docTemp.mainId) {
                  t.$store.commit('docTemp/setMainId', res.data.content[0].id)
                  t.$store.commit('docTemp/addNewArrayMainTable', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('docTemp/updateArrayMainTable', res.data.content[0])
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      handleUpload(file) {
        this.file = file
        this.loadingStatus = true
        return false
      },
      uploadLocalFile() {
        const t = this
        const formData = new FormData()
        formData.append('upfile', t.file)
        console.log(formData)
        uploadFile(formData).then(res => {
          for (const key in res.data) {
            t.file =  { name: key }
            t.filekey = res.data[key]
            t.formValidate.platDctpAffix = key + ':' + res.data[key]
          }
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '上传成功',
              onOk: () => {
              	t.loadingStatus = false
              },
            })
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      downloadFile() {
    		const t = this
    		let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: '导出',
          filekey: t.filekey,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
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
      clear() {
        const t = this
        t.formValidate.platDctpCode = ''
        t.formValidate.platDctpName = ''
        t.formValidate.platDctpValid = ''
        t.formValidate.platDctpComment = ''
        t.platDctpValidDis = ''
        t.file = ''
        t.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .option-main{
    position: relative;
    height: 500px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
