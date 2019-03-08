<!--年月选择-->
<template>
  <div class="dateMonth">
      <mu-flex wrap="wrap" class="dateMonthOne">
        <mu-paper :z-depth="1" class="demo-date-picker" >
          <mu-date-picker :should-disable-date="this.allowedDates"   :date.sync="date"></mu-date-picker>
        </mu-paper>
        <div class="subMit">
          <span @click="dateRemove">取消</span>
          <span @click="dateSure">确定</span>
        </div>
      </mu-flex>
  </div>
</template>
<script>
  export default {
    name: 'dateMonth',
    data() {
      return {
        date: new Date(),
        year:'',
        monthday:'',
        SelectdateTime:''
      }
    },
    mounted(){
      let year = document.getElementsByClassName('mu-date-display-year-title')[0].innerHTML
      let monthday = document.getElementsByClassName('mu-date-display-monthday-title')[0].innerHTML
      this.year = year
      this.monthday = monthday
      this.dateTime = (this.year + '-' + this.monthday).substring(0,10)
    },
    methods:{
      allowedDates: function (dayItem) {
        let date = JSON.stringify(dayItem);
        // 当前年月日  与  得到的dayItem 年月日进行比较
        if((this.year + '-' + this.monthday).substring(0,10) > date.substring(1,11)){
          return true
        }
      },
      dateSure() {
          let year = document.getElementsByClassName('mu-date-display-year-title')[0].innerHTML
          let monthday = document.getElementsByClassName('mu-date-display-monthday-title')[0].innerHTML

          this.SelectdateTime = (year + '-' + monthday)
          console.log(this.SelectdateTime)
          this.$store.commit('myOrderListState/setDateMonthreveal',false)
          this.$store.commit('myOrderListState/setSelectDateTime',this.SelectdateTime.substring(0,10))
      },
      dateRemove(){
        this.$store.commit('myOrderListState/setDateMonthreveal',false)
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
.dateMonth{
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
  .dateMonth .mu-picker-container{
    height: 300px !important;
  }
}
</style>
