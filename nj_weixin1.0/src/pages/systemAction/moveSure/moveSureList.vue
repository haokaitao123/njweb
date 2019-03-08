<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <probationTime></probationTime>
    <mu-container>
      <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
        <mu-tab style="flex: 1;font-size: 15px">调动信息</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">调动确认</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active === 0">
        <staffInfo></staffInfo>
      </div>
      <div class="demo-text" v-if="active === 1">
        <div class="personalText">
          <div>
            <p>是否同意调动</p>
            <p>我已知晓调动事宜</p>
            <p>
              <mu-flex class="select-control-row">
                <mu-radio value="1"  v-model="normal.radio" label="同意"></mu-radio>
                <mu-radio value="2" v-model="normal.radio"  label="不同意"></mu-radio>
              </mu-flex>
            </p>
          </div>
          <div v-if="normal.radio == 2">
            <p>不同意原因</p>
            <textarea name="" id="" cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
            <div v-show="textShow">
              虽然只有短短的三个月，但学到了很多，感悟了很多，以及对自身一些不足的地方得到了改进与提升
              ，增进了对公司文化的更深了解，看到公司的发展，
              我深深地感到骄傲和自豪，也更加迫切的希望以一名正式员工的身份在这里工作。
            </div>
          </div>

        </div>

        <!--提交-->
        <div class="submit">
          <button>提交</button>
        </div>
      </div>
    </mu-container>
  </div>
</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import probationTime from '../ProbationPeriod/probationTime.vue'
  import staffInfo from '../ProbationPeriod/staffInfo.vue'
    export default {
        name: "moveSureList",
      data(){
          return{
            flagImg:true,
            title:'调动确认',
            active:0,
            normal: {
              radio: 1,
            },
            textShow:false
          }
      },
        components:{
          headTitle,
          probationTime,
          staffInfo
        }
    }
</script>

<style scoped type="text/less" lang="less">
  .personalText{
    wdth:100%;
    padding: 26px  0 0 30px;
    background: white;
    font-size: 30px;
    margin-bottom: 20px;
    div:nth-of-type(1){
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ipt{
      outline: none;
      border:0;
    }
  }
  .submit{
    width: 100%;
    height: 86px;
    line-height: 86px;
    text-align: center;
    border:0;
    font-size: 36px;
    background: #FFFFFF;
    outline: none;
  button{
    background: #3399FF;
    width: 100%;
    outline: none;
    color: #FFFFFF;
  }
  }
</style>
