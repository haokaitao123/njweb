<!--负责任务-->
<template>
  <div class="mask">
    <div class="maskCenter">
      <div class="maskImg"></div>
      <div class="test">
        5*8小时客服热线
      </div>
      <div class="title">共享服务中心提供热线咨询服务，及时解答您的疑问，服务时间工作日早上九点到晚上五点。</div>
      <div class="need">
        <div @click="noNeed">暂不需要</div>
        <div @click="CallNum">立即拨打</div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'masking',
    data() {
      return {

      }
    },
    methods:{
      noNeed(){
        this.$emit('noNeed',false)
      },
      CallNum(){
        window.location.href = 'tel:400-815-2266'
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .mask{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background: rgba(0,0,0,0.7);
    z-index: 1000;
    .maskCenter{
      width:50%;
      height:600px;
      margin: 200px auto;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      z-index: 100;
      .maskImg{
        width:100%;
        height:250px;
        background-image: url("../../../../static/main/servey.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .test{
        width:100%;
        text-align: center;
        margin-top: 30px;
        font-size: 30px;
      }
      .title{
        width:100%;
        margin-top: 20px;
        padding: 0 30px;
        font-size: 22px;
        color: #666666;
      }
      .need{
        display: flex;
        border-top: 2px solid #d9d9d9;
        margin-top: 35px;
        width:100%;
        height:80px;
        line-height: 80px;
        color: #3399FF;
        div{
          text-align: center;
          flex: 1;
          border-right: 1px solid #d9d9d9;
        }
        div:nth-of-type(2){
          border:0;
        }
      }
    }
  }
</style>
