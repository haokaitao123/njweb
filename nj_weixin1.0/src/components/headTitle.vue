<!--头部公共 引入时需传两个参数-->
<template>
  <div class="header">
    <div class="title">{{title}}</div>
    <img src="../.././static/action/jt_01.png" class="Image" alt="" v-show="flag" @click="goIndex">
  </div>

</template>
<script>
  export default {
    name: 'headeTitle',
    data() {
      return {

      }
    },
    props:{
      title:String,
      flag:Boolean
    },
    methods:{
      goIndex() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .title{
    width:100%;
    height:90px;
    background-color: #3399FF;
    font-size: 36px;
    color: #fff;
    text-align: center;
    line-height: 88px;
    position: relative;
  }
  .Image{
    position: absolute;
    left:38px;
    top:25px;
    width:14px;
    height:24px;
  }
  .header{
    height:90px;
  }
</style>
