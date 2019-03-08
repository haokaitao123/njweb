<!--一条为一行-->
<template>
  <div>
    <data value="" v-for="item in dataList">
      <div class="message">
        <div>
          <span>中文名</span>
          <span>{{item.empprobCname}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>手机号码</span>
          <span>{{item.empprobMobile}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>雇佣公司</span>
          <span>{{item.empprobHirecompanyDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>部门</span>
          <span>{{item.empprobDeptDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>岗位</span>
          <span>{{item.empprobPostDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>职位级别</span>
          <span>{{item.empprobPostlevelDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>薪资级别</span>
          <span>{{item.empprobSalarylevelDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>差旅级别</span>
          <span>{{item.empprobTravellevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>行政级别</span>
          <span>{{item.empprobAdminlevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>合同类别</span>
          <span>{{item.empprobContracttypeDis}}</span>
        </div>
      </div><div class="message">
      <div>
        <span>合同期限</span>
        <span>{{item.empprobContractperiodDis}}</span>
      </div>
    </div>
      <div class="message">
        <div>
          <span>合同开始日</span>
          <span>{{item.empprobContractsdate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>合同到期日</span>
          <span>{{item.empprobContractedate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>试用期限</span>
          <span>{{item.empprobProbationDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>试用到期日</span>
          <span>{{item.empprobProbationdate}}</span>
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
