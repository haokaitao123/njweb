<!--负责任务-->
<template>
  <div class="dateYear">
    <mu-flex wrap="wrap" class="dateMonthOne">
      <mu-paper :z-depth="1" class="demo-date-picker" >
        <mu-date-picker :should-disable-date="this.allowedDates"   :date.sync="date"></mu-date-picker>
      </mu-paper>
      <div class="subMit">
        <span @click="dateDel">取消</span>
        <span @click="dateCom">确定</span>
      </div>
    </mu-flex>

  </div>
</template>
<script>
  import Bus from '@/lib/bus'
  export default {
    name: 'dateYear',
    data() {
      return {
        date: new Date(),
        year:'',
        monthday:'',
        dateTime:''
      }
    },
    created(){

    },
    methods:{
      dateDel(){
        Bus.$emit('dateDel')
      },
      dateCom() {
        let year = document.getElementsByClassName('mu-date-display-year-title')[0].innerHTML
        let monthday = document.getElementsByClassName('mu-date-display-monthday-title')[0].innerHTML
        this.year = year
        this.monthday = monthday
        this.dateTime = (this.year + '-' + this.monthday).substring(0,10)
        //console.log(this.dateTime)
        Bus.$emit('dateCom',this.dateTime)
      },
      allowedDates: function (dayItem) {
        let date = JSON.stringify(dayItem);
        // 当前年月日  与  得到的dayItem 年月日进行比较
        if((this.year + '-' + this.monthday).substring(0,10) > date.substring(1,11)){
          return true
        }
      },
    },
    mounted(){
      ///获取当前的月份  在allowedDates与所有的年月日进行比较
      let year = document.getElementsByClassName('mu-date-display-year-title')[0].innerHTML
      let monthday = document.getElementsByClassName('mu-date-display-monthday-title')[0].innerHTML
      this.year = year
      this.monthday = monthday
      this.dateTime = (this.year + '-' + this.monthday).substring(0,10)
      console.log(this.dateTime)
    },
  }
</script>
<style scoped lang="less" type="text/less">
.dateYear{
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  background: rgba(0,0,0,0.8);
  .dateMonthOne{
    position: absolute;
    top:150px;
    left: 20%;
    .subMit{
      position: absolute;
      bottom: 0;
      right:30px;
      text-align: right;
      width:100%;
      padding-bottom: 28px;
      font-size: 36px;
      color: #3399FF;
      span:nth-of-type(1){
        margin-right: 30px;
      }
    }
  }
  .mu-paper{
    background: rgba(0,0,0,0.9) !important; ;
  }
}
</style>
