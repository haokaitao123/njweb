<!--一条为一行-->
<template>
  <div>
      <div class="message">
        <div>
          <span>员工工号</span>
          <span>{{dataList.empintWorkno}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>原岗位</span>
          <span>{{dataList.empintPostDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>原部门</span>
          <span>{{dataList.empintDeptDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>新职位级别</span>
          <span>{{dataList.empintNewpostlevel}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>新薪资级别</span>
          <span>{{dataList.empintNewsalarylevelDis}}</span>
        </div>
      </div>
      <!--<div class="message1">-->
        <!--<div>-->
          <!--<span>是否需要离职证明</span>-->
          <!--<span>-->
            <!--<mt-radio-->
            <!--v-model="value"-->
            <!--:options=this.options-->
          <!--&gt;-->
          <!--</mt-radio></span>-->
          <!--&lt;!&ndash;@change="orderRadio"&ndash;&gt;-->
        <!--</div>-->

      <!--</div>-->
      <div class="message">
        <div>
          <span>新差旅级别</span>
          <span>{{dataList.empintNewtravellevelDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>新行政级别</span>
          <span>{{dataList.empintNewadminlevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>是否调整基本工资</span>
          <span>{{dataList.empintIschgsalaryDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>基本工资</span>
          <span>{{dataList.empintSalbase}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>新工作地点</span>
          <span>{{dataList.empintNewworklocationDis}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "staffInfo",
    data() {
      return{
        options:[
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ],
        value:'0'
      }
    },
    props:{
      dataList:Object,
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
  .message1{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 20px 20px  26px 32px;
    }

  }
</style>
