<!--入职材料提交-->
<template>
  <div class="wrap">
    <!--<headTitle :title="title" :flag="flagImg"></headTitle>-->
    <div class="alert">
      <div>
        <span>附件</span>
      </div>
      <div style="position: relative">
        <input type="file" @change="UpLoadFile($event)">
        <span style="color: #3399FF">上传</span>
        <img src="../../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
    </div>
  </div>
</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
//  import Dropzone from 'vue2-dropzone'
    export default {
        name: "entrySubmit",
      data(){
          return{
            title:'入职材料提交',
            flagImg:true
          }
      },
      components:{
        headTitle,
//        Dropzone
      },
      methods: {
        'showSuccess': function (file) {
          console.log('A file was successfully uploaded')
        },
        tirggerFile : function (event) {
          console.log(event)
          var file = event.target.files; // (利用console.log输出看结构就知道如何处理档案资料)
          console.log(file)
          // do something...
        }
      }
    }
</script>

<style scoped type="text/less" lang="less">
  .alert{
    padding: 30px 30px;
    box-sizing: border-box;
    width:100%;
    display: flex;
    justify-content: space-between;
    background: white;
    align-items: center;
    margin-bottom: 30px;
    div:nth-of-type(1){
      img{
        width:45px;
        height:45px;
        vertical-align: top;
      }
      span{
        font-size: 30px;
      }
    }
    div:nth-of-type(2){
      img{
        width:20px;
        height:30px;
        vertical-align: text-bottom;
      }
      span{
        font-size: 26px;
        color: lightgray;
      }
      input{
        width:40px;
        opacity: 0;
      }
      .Image{
        position: absolute;
        top:0;
        left:0;
        width:45px;
        height:50px;
      }
    }
  }
</style>
