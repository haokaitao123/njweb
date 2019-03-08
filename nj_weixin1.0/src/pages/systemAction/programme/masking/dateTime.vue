<!--日期时间弹窗-->
<template>
  <div class="dateAll">
    <div class="date">
      <mu-container style="width:80%;">
        <mu-flex justify-content="between" align-items="end" wrap="wrap">
          <mu-paper :z-depth="1" >
            <mu-time-picker @change="dateTime(time)" :no-display="!display"  :view-type="viewType" :time.sync="time" :format="type" :landscape="landscape"></mu-time-picker>
          </mu-paper>
        </mu-flex>
      </mu-container>
      <div class="Btn">
        <div @click="remove">取消</div>
        <div @click="sure">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '@/lib/bus'
  export default {
    name: 'dateTime',
    data() {
      return {
        time: undefined,
        landscape: false,
        display: true,
        type: 'ampm',
        viewType: 'clock',
        date_value:''
      }
    },
    methods:{
      dateTime(time, mode, finished){

        let date = new Date(time);
        if(date.getMinutes() < 10) {
          this.date_value =  date.getHours() + ':' + '0' + date.getMinutes();
        } else {
          this.date_value =   date.getHours() + ':' + date.getMinutes();
        }

        console.log(this.date_value)
      },
      remove() {
        Bus.$emit('remove')
      },
      sure() {
        if (localStorage.getItem('time') == 0){
          Bus.$emit('sureStart',this.date_value)
        } else {
          Bus.$emit('endStart',this.date_value)
        }
        localStorage.removeItem('time')
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
.dateAll{
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.9);
  position: absolute;
  top:0;
  left:0;
  .date{
    padding-top: 200px;
    box-sizing: border-box;
  }
}
.Btn{
  position: absolute;
  top: 1000px;
  left:450px;
  display: flex;
  div{
    margin-right: 30px;
    font-size: 36px;
    color: #3399FF;
  }
}
.mu-timepicker{
  width:600px !important;
  height:900px !important;
}

</style>
