<!--负责任务-->
<template>
  <div class="leaveReason">
    <div class="demo">
      <ol>
        <li @click="change(item)" v-for="(item,index) in reasonList" :key="index">{{item.levaCname}}</li>
      </ol>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'leaveReason',
    data() {
      return {
        list: ['21', '12', '232','1','3','32','32','23']
      }
    },
    created(){

    },
    props:{
      reasonList: Array
    },
    methods: {
      change(item) {
        this.$emit('close', item)
      }
    },
  }
</script>
<style scoped lang="less" type="text/less">
  .demo {
    width: 80%;
    margin: auto;
    margin-top: 300px;
    height:500px;
    background: white;
    padding: 20px 20px 20px 40px;
    overflow: scroll;
    font-size: 30px;
    ol>li{
      height: 80px;
    }
  }
  .leaveReason{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background: rgba(0,0,0,0.8);
    z-index: 100;
    .reasonOne{
      position: absolute;
      top:150px;
      left: 20%;
    }
  }
</style>
