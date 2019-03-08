<template>
  <div style="width: 50%" v-if="isshow">
    <i-col span="21" offset="1">
      <FormItem :label="itemLabel" :prop="ruleText" :required="required">
        <Row>
      <div class="header-box">
        <div class="header-cover" @click="render1">
          点击上传头像
        </div>
        <div class="header">
          <img :src="thisValue" width="100" height="100">
        </div>
      </div>
        </Row>
      </FormItem>
    </i-col>
  </div>
</template>
<script>
	import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile, uploadimage } from '../../../axios/axios'
 // import pubsources from '../../../lib/pub_source'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import imgEdit from '../../../components/imgUpdate/imgEdit'

  export default {
    data() {
      return {
        httpImg: pubsource.pub_pubf_downlink,
        cropedImg: '',
        updateImg: false,
        imgPack: {},
        pictureDis: {},
      	file: '',
      	filekey: this.fileKey,
      	loadingStatus: false,
        thisValue: this.value ? pubsource.pub_pubf_downlink + this.value.split(',')[1] : '../../../static/img/header1.png',
        thisId: this.id,
        isshow: this.ruleText in this.show,
        thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
      }
    },
    props: {
    	fileKey: String,
      value: String,
      id: String,
      itemLabel: String,
      message: String,
      required: Boolean,
      ruleText: String,
      disabled: Boolean,  // 是否可编辑
      show: Object,  // 是否显示
      dis: Object, // 是否可编辑plus
    },
    created() {
      this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
      formValidate() {
//        this.$emit('on-change', this.thisId)
      },
      change111() {
        let t = this
        t.$emit('change', t)
      },
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
    	handleUpload(file) {
    		this.file = file
    		this.thisValue = file.name
    		this.loadingStatus = true
    	},
      render1() {
        const t = this
        this.$Modal.confirm({
          onOk: () => {
            t.imgPack.handlecrop1()
            // base64转图片的方法
            const arr = t.imgPack.option1.cropedImg.split(',')
            const mime = arr[0].match(/:(.*?);/)[1]
            const bstr = atob(arr[1])
            let n = bstr.length
            const u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            const obj = new Blob([u8arr], { type: mime })
            // base64转图片的方法
            const formData = new FormData()
            formData.append('upfile', obj, Date.parse(new Date()) + '.png')
            uploadimage(formData).then((res) => {
              if (res) {
                for (const key in res.data) {
                  t.thisValue = t.httpImg + res.data[key]
//                  t.pictureDis = key + ',' + res.data[key]
                  this.$emit('on-change', key + ',' + res.data[key])
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          },
          render: (h) => {
            return h(imgEdit, {
              props: {
                value: this.value,
              },
              attrs: {
                id: 'imgEdit',
                ref: 'imgEdit',
              },
              on: {
                ok: (self) => {
                  t.imgPack = self
                },
              },

            })
          },
        })
      },
    },
    watch: {
      thisId(val) {
        this.formValidate()
      },
      thisValue(val) {
        this.change111()
      },
      show: {
        handler: function (val) {
          this.isshow = this.ruleText in this.show
        },
        deep: true,
      },
      dis: {
        handler: function (val) {
          this.thisDis = this.disabled ? this.disabled : !this.dis[this.ruleText]
        },
        deep: true,
      },
    },
  }
</script>
<style lang="scss" scoped>
  .message{
    width: 100%;
    border: 2px solid #FEF1DC;
    min-height: 33px;
    padding: 4px 10px;
    line-height: 24px;
    margin-bottom: 24px;
    background-color: #FFF9E3;
  }
  .header-cover{
    display: none;
    top: 0;
    /*left: 0px;*/
    right: 35px;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgba(0,0,0,.3);
  }
  .header-box:hover .header-cover{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-box:hover {
    cursor: pointer;
  }
  .header{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin:0 auto;
  }
  .header-box{
    display: flex;
    position: relative;
    justify-content: flex-end;
    width: 170px;
    height: 100px;
  }
  .tab-box{
    overflow-y: auto;
    height: 370px;
  }
</style>
