<!--一条为一行-->
<template>
  <div>
    <data value="" v-for="item in dataList">
      <div class="message">
        <div>
          <span>员工工号</span>
          <span>{{item.empconWorkno}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>唯一标识号</span>
          <span>{{item.empconGid}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>中文名</span>
          <span>{{item.empconCname}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>入职日期</span>
          <span>{{item.empconEntrydate}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>公司</span>
          <span>{{item.empconHirecompanyDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>部门</span>
          <span>{{item.empconDeptDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>岗位</span>
          <span>{{item.empconPostDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>业务上级经理</span>
          <span>{{item.empconBuspmpDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>原合同到期日</span>
          <span>{{item.empconOrgcontredate}}</span>
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
