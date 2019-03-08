<!--提醒 选择时间-->
<template>
  <div class="wrap">
    <!--<headeTitle :title="title" :flag="flagImg"></headeTitle>-->
    <div class="top">
      无
    </div>
    <div class="testList" v-for="(item,index) in testList" @click="warnTimeList(index)">
      {{item.title}}
    </div>

  </div>
</template>
<script>
  import headeTitle from '@/components/headTitle'
  export default {
    name: 'warn',
    data() {
      return {
        title:'选择时间',
        flagImg:true,
        testList:[
          {
            title:'提前五分钟',
            type:'minutetype',
            num:5
          },
          {
            title:'提前十五分钟',
            type:'minutetype',
            num:15
          },
          {
            title:'提前三十分钟',
            type:'minutetype',
            num:30
          },
          {
            title:'提前1小时',
            type:'hourtype',
            num:1
          },
          {
            title:'提前2小时',
            type:'hourtype',
            num:2
          },
          {
            title:'提前3小时',
            type:'hourtype',
            num:3
          },
          {
            title:'提前1天',
            type:'daytype',
            num:1
          },
          {
            title:'提前2天',
            type:'daytype',
            num:2
          }
        ]
      }
    },
    methods:{
      warnTimeList(index){
        this.$store.commit('warnType',this.testList[index].type)
        this.$store.commit('warnNum',this.testList[index].num)
        this.$store.commit('warnTitle',this.testList[index].title)
        this.$store.commit('dateList/setwarnTime', false)
//        this.$store.commit('dateRemove',false)
      }
    },
    components:{
      headeTitle
    }
  }
</script>
<style scoped lang="less" type="text/less">
.wrap{
  width:100%;
  height:100%;
  background: #f3f3f3;
  position: absolute;
  top:0;
  .top{
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: white;
    border-bottom: 2px solid #f3f3f3;
    margin-bottom: 30px;
    font-size: 30px;
  }
  .testList{
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: white;
    border-bottom: 2px solid #f3f3f3;
    font-size: 30px;
  }
}
</style>
