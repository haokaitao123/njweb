<!--一条为一行-->
<template>
  <div>
    <data value="">
      <div class="message">
        <div>
          <span>公司</span>
          <span>{{visaReturn.returnCompDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>岗位</span>
          <span>{{visaReturn.returnPostDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>职责</span>
          <span>{{visaReturn.returnObligation}}</span>
        </div>
      </div>
      </data>
    </div>
</template>

<script>
  export default {
    name: "goAbroadMsg",
    props:{
      visaReturn: Object,
    },
  }
</script>

<style scoped type="text/less" lang="less">
  .message{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
    }

  }
</style>
