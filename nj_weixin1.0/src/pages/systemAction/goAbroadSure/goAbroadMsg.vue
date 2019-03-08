<!--一条为一行-->
<template>
  <div>
    <data value="" v-for="item in dataList">
      <div class="message">
        <div>
          <span>公司</span>
          <span>{{item.passCompDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>部门</span>
          <span>{{item.passDeptDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>岗位</span>
          <span>{{item.passPostDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>证件类型</span>
          <span>{{item.passIdtypeDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>证件号码</span>
          <span>{{item.passIdno}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>职责</span>
          <span>{{item.passObligation}}</span>
        </div>
      </div>
      </data>
    </div>
</template>

<script>
  export default {
    name: "goAbroadMsg",
    props:{
      dataList:Array,
    }
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
