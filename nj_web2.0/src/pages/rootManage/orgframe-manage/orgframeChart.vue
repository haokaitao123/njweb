<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_organization.orgChart.title')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div>
        <Button type="primary" @click="setOrigent">{{origent}}</Button>
        <Button type="primary" @click="setExpand">{{expand}}</Button>
        <Button type="primary" @click="savecanvas">{{$t('lang_organization.orgChart.savImg')}}</Button>
        <Dropdown>
          <Button type="primary">
            {{select}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list" >
            <span v-for="(item,index) in ColorList" :key="index" @click="selected(item.color,item.name)">
              <DropdownItem>{{item.name}}</DropdownItem>
            </span>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="option-main">
        <Row style="max-height: 500px;overflow-y: auto;position: relative">
          <Spin v-if="loading" size="large" style="width: 100px;margin: auto"></Spin>
          <div v-if="!loading" class="text-center" style="height: 500px">
              <orgTree class="tree"
                       :data="data"
                       :horizontal="horizontal"
                       :collapsable="collapsable"
                       :label-class-name="labelClassName"
                       :render-content="renderContent"
                       @on-expand="onExpand"
                       @on-node-click="onNodeClick"
              />
          </div>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas'
  import orgTree from '../../../components/vueOrgTree/org-tree'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: true,
        file: '',
        filekey: '',
        thisValue: '',
        thisId: '',
        url: '',
        data: {},
        horizontal: false,
        collapsable: true,
        expandAll: true,
        origent: this.$t('lang_organization.orgChart.horrization'),
        expand: this.$t('lang_organization.orgChart.shrinkage'),
        labelClassName: 'bg-orange',
        select: this.$t('lang_organization.orgChart.orange'),
        ColorList: [
          {
            name: this.$t('lang_organization.orgChart.white'),
            color: 'bg-white',
          },
          {
            name: this.$t('lang_organization.orgChart.orange'),
            color: 'bg-orange',
          },
          {
            name: this.$t('lang_organization.orgChart.gold'),
            color: 'bg-gold',
          },
          {
            name: this.$t('lang_organization.orgChart.gray'),
            color: 'bg-gray',
          },
          {
            name: this.$t('lang_organization.orgChart.lightpink'),
            color: 'bg-lightpink',
          },
        ],
      }
    },
    components: {
      orgTree,
      html2canvas,
    },
    methods: {
      getData(id) {
        const t = this
        t.loading = true
        getDataLevelUserLogin({
          _mt: 'orgUnits.getUnitsChart',
          id: id,
          logType: '根据unit查询，下属组织架构图',
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.data = res.data.content[0]
            this.loading = false
            t.expandChange()
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selected(color, name) {
        this.labelClassName = color
        this.select = name
      },
      setOrigent() {
        if (this.origent === this.$t('lang_organization.orgChart.horrization')) {
          this.origent = this.$t('lang_organization.orgChart.vertical')
        } else {
          this.origent = this.$t('lang_organization.orgChart.horrization')
        }
        this.horizontal = !this.horizontal
      },
      setExpand() {
        if (this.expand === this.$t('lang_organization.orgChart.expand')) {
          this.expand = this.$t('lang_organization.orgChart.shrinkage')
        } else {
          this.expand = this.$t('lang_organization.orgChart.expand')
        }
        this.expandAll = !this.expandAll
        this.expandChange()
      },
      handleReset() {
        const t = this
        t.data = {}
        t.horizontal = false
        t.collapsable = true
        t.expandAll = true
        t.origent = this.$t('lang_organization.orgChart.horrization')
        t.expand = this.$t('lang_organization.orgChart.shrinkage')
        t.labelClassName = 'bg-orange'
        t.select = this.$t('lang_organization.orgChart.orange')
        this.$emit('closeChart')
      },
      renderContent: function (h, data) {
        return data.label
      },
      onExpand: function (data) {
        if ('expand' in data) {
          data.expand = !data.expand
          if (!data.expand && data.children) {
            this.collapse(data.children)
          }
        } else {
          this.$set(data, 'expand', true)
        }
      },
      onNodeClick: function (e, data) {
      },
      collapse: function (list) {
        let _this = this
        list.forEach(function(child) {
          if (child.expand) {
            child.expand = false
          }
          child.children && _this.collapse(child.children)
        })
      },
      expandChange: function () {
        this.toggleExpand(this.data, this.expandAll)
      },
      toggleExpand: function (data, val) {
        let _this = this
        if (Array.isArray(data)) {
          data.forEach(function (item) {
            _this.$set(item, 'expand', val)
            if (item.children) {
              _this.toggleExpand(item.children, val)
            }
          })
        } else {
          this.$set(data, 'expand', val)
          if (data.children) {
            _this.toggleExpand(data.children, val)
          }
        }
      },
      savecanvas() {
        let file
        let canvas = document.querySelector('.tree')
        let t = this
        var blob = new Blob()
        html2canvas(canvas, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
//          if (!!window.ActiveXObject || 'ActiveXObject' in window) {
//            let blob = canvas.msToBlob()
//            navigator.msSaveBlob(blob, '组织架构图')
//          } else {
//            let type = 'png'
//            let imgData = canvas.toDataURL(type)
//            // 照片格式处理
//            let _fixType = function (type) {
//              type = type.toLowerCase().replace(/jpg/i, 'jpeg')
//              let r = type.match(/png|jpeg|bmp|gif/)[0]
//              return 'image/' + r
//            }
//            imgData = imgData.replace(_fixType(type), 'image/octet-stream')
//            let filename = '组织架构图' + '.' + type
//            t.saveFile(imgData, filename)
//          }

              // 耿越添加，尝试解决IE下载canvas图片不兼容 未成功   start  
            // if(-1 !== navigator.userAgent.indexOf("Trident")){
            //   let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            //   let arr = image.split(',');
            //   let mime = arr[0].match(/:(.*?);/)[1];
            //   let bstr = atob(arr[1]);
            //   let n = bstr.length;
            //   let u8arr = new Uint8Array(n);
            //   while(n--){
            //   u8arr[n] = bstr.charCodeAt(n);
            //   }
            //   console.log(1111)
            //   window.navigator.msSaveBlob(new Blob([u8arr], {type:mime}), "download.png");
            //   console.log(2222)
            //   let formData = new FormData()
            //   formData.append('upfile', blob, '组织架构图.png')
            //   t.uploadFile1(formData)
	          // }
              //  耿越添加，尝试解决IE下载canvas图片不兼容 未成功 end

          // 将base64转换成file对象
            let type = 'png'
            let imgData = canvas.toDataURL(type)
            let arr = imgData.split(',')
            let mime = arr[0].match(/:(.*?);/)[1]
            let suffix = mime.split('/')[1]
            let bstr = atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            let blob = new Blob([u8arr], {type:mime})
          let formData = new FormData()
          formData.append('upfile', blob, '组织架构图.png')
//          formData.filename = '组织架构图' + type
//          formData.append('filename', '组织架构图' + '.' + type)
//            t.file = new File([u8arr], '组织架构图' + '.' + type, { type: mime })
//          console.log(t.file)
//          console.log(t.file)
//          t.file = new File()
          t.uploadFile1(formData)
        })
      },
      saveFile(data, filename) {
        let savelink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        savelink.href = data
        savelink.download = filename
        let event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        savelink.dispatchEvent(event)
      },
      uploadFile1(formData) {
        const t = this
//        const formData = new FormData()
//        let formData = data
//        formData.append('upfile', t.file)
        uploadFile(formData).then(res => {
          for (const key in res.data) {
            t.filekey = res.data[key]
            t.thisValue = key
            t.thisId = key + ':' + res.data[key]
          }
          if (t.filekey) {
            t.uploadFile2()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      uploadFile2() {
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
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .option-main{
    position: relative;
    height: 500px;
    margin-top: 30px;
  }
  .text-center{
    text-align: center;
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 60px;
  }
  .btn1{
    position: absolute;
    bottom: 20px;
    right: 124px;
  }
  .cover .box{
    width: 1200px;
  }
  .demo-spin-container{
    display: inline-block;
    position: relative;
    border: 1px solid #eee;
  }
</style>
<style type="text/css">
  .org-tree-node-label {
    white-space: nowrap;
  }
  .bg-white {
    background-color: white;
  }
  .bg-orange {
    background-color: orange;
  }
  .bg-gold {
    background-color: gold;
  }
  .bg-gray {
    background-color: gray;
  }
  .bg-lightpink {
    background-color: lightpink;
  }
  .bg-chocolate {
    background-color: chocolate;
  }
  .bg-tomato {
    background-color: tomato;
  }
</style>
