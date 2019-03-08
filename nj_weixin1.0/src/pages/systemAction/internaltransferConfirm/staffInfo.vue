<!--一条为一行-->
<template>
  <div>
    <data value="" v-for="item in dataList">
      <div class="message">
        <div>
          <span>员工工号</span>
          <span>{{item.empintWorkno}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>唯一标识号</span>
          <span>{{item.empintGid}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>公司</span>
          <span>{{item.empintHirecompanyDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>中文名</span>
          <span>{{item.empintCname}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>调动类别</span>
          <span>{{item.empintTransfertypeDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>调动日期</span>
          <span>{{item.empintContractworktime}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>新岗位</span>
          <span>{{item.empintNewpostDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>新职位级别</span>
          <span>{{item.empintNewpostlevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>新薪资级别</span>
          <span>{{item.empintNewsalarylevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>新差旅级别</span>
          <span>{{item.empintNewtravellevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>新行政级别</span>
          <span>{{item.empintNewadminlevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>新业务上级经理</span>
          <span>{{item.empintNewbuspmpDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>新工作地点</span>
          <span>{{item.empintNewworklocationDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>是否调整基本工资</span>
          <span>{{item.empintIschgsalaryDis}}</span>
        </div>
      </div>
      <div class="message" v-if="item.empintIschgsalary === '1'">
        <div>
          <span>基本工资</span>
          <span>{{item.empintSalbase}}</span>
        </div>
      </div>

      </data>
    </div>
</template>

<script>
  export default {
    name: "staffInfo",
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
