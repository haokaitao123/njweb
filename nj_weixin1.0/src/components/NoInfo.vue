<!---->
<template>
  <div class="NoInfo">
      <div class="noImg">
        <div class="msg">暂无任何信息</div>
      </div>
      <!--<div class="msg"></div>-->
  </div>
</template>
<script>
  export default {
    name: 'NoInfo',
    data() {
      return {

      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .NoInfo{
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    background-color: white;
    z-index: 100;
    .noImg{
      background-image: url("../../static/main/No.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width:400px;
      height:400px;
      position: absolute;
      top:350px;
      left:25%;
    }
    .msg{
      width:100%;
      text-align: center;
      color: black;
      position: absolute;
      bottom: 0;
    }
  }
</style>
