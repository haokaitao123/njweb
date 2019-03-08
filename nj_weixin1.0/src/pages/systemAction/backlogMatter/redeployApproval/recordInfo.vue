<!--一条为一行-->
<template>
  <div>
    <div class="EmployeeInformation">
      <data value="" v-for="item in dataListRecord">
        <ul>
          <li v-if="!item.hasOwnProperty('aprdAprvresult') || item.aprdAprvresult == '00processing'" style="display: flex;justify-content: space-between">
            <span>{{item.aprdStepidDis}}:</span>&nbsp&nbsp&nbsp&nbsp <span>{{item.aprdApproverDis}}</span> &nbsp&nbsp&nbsp&nbsp <span style="color: orange">审批中</span>
          </li>
          <li v-if="item.aprdAprvresult == '01approved'">
            {{item.aprdStepidDis}}:&nbsp&nbsp&nbsp&nbsp{{item.aprdApproverDis}} &nbsp&nbsp&nbsp&nbsp <span style="color: green">审批通过</span>
          </li>
          <li v-if="item.aprdAprvresult == '02noneapproved'">
            {{item.aprdStepidDis}}:&nbsp&nbsp&nbsp&nbsp{{item.aprdApproverDis}} &nbsp&nbsp&nbsp&nbsp <span style="color: red">审批否决</span>
          </li>
          <li>
            {{item.aprdAprvtime}}
          </li>
          <li>
           意见: {{item.aprdAprvopinion}}
          </li>
        </ul>
      </data>
    </div>
    </div>
</template>

<script>
  export default {
    name: "recordInfo",
    props:{
      dataListRecord:Array,
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
  .EmployeeInformation {
    width: 100%;
    padding: 40px 54px 48px 30px;
    background: white;
    position: relative;
    margin-bottom: 20px;
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
    }
    .dateColor {
      color: #FF850E;
      margin-bottom: 0;
    }
    .state1 {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #F44336;
      font-size: 28px;
    }
    .state2 {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #4cb050;
      font-size: 28px;
    }
  }
</style>
