<!--一条为一行-->
<template>
  <div class="messageAll">
    <div class="message">
      <div>
        <span>中文名</span>
        <span>{{empFlowNewhire.empnhCname}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>性别</span>
        <span>{{empFlowNewhire.empnhGenderDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>First Name</span>
        <span>{{empFlowNewhire.empnhFirstname}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>Last Name</span>
        <span>{{empFlowNewhire.empnhLastname}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>证件类型</span>
        <span>{{empFlowNewhire.empnhIdtypeDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>证件号码</span>
        <span>{{empFlowNewhire.empnhIdno}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>个人邮箱</span>
        <span>{{empFlowNewhire.empnhPersmail}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>手机号码</span>
        <span>{{empFlowNewhire.empnhMobile}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>公司</span>
        <span>{{empFlowNewhire.empnhHirecompanyDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>部门</span>
        <span>{{empFlowNewhire.empnhDeptDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>岗位</span>
        <span>{{empFlowNewhire.empnhPostDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>入职日期</span>
        <span>{{empFlowNewhire.empnhEntrydate}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>工作地点</span>
        <span>{{empFlowNewhire.empnhWorklocationDis}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin,getDataLevelUserLoginNew} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "InformMation",
    data() {
      return {
        empnhGender: ''
      }
    },
    props: {
      empFlowNewhire: Object,
      Gender: Array,
      Idtype: Array,
    },
    mounted() {
//      switch (this.empFlowNewhire.empnhGender) {
//        case
//      }
    },
    methods:{
      getData(){
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .messageAll{
    height: 100%;
    overflow: scroll;
  }
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
