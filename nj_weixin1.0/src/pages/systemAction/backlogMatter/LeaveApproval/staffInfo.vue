<!--一条为一行-->
<template>
  <div>
      <div class="message">
        <div>
          <span>员工工号</span>
          <span>{{dataList.empdimWorkno}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>岗位</span>
          <span>{{dataList.empdimPostDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>上级经理</span>
          <span>{{dataList.empdimBuspmpDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>最后工作日期</span>
          <span>{{dataList.empdimLaskworkday}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>离职原因</span>
          <span>{{dataList.empdimDimreasonDis}}</span>
        </div>

      </div>
      <div class="message1">
        <div>
          <span>是否需要离职证明</span>
          <span>
            <mt-radio
            v-model="value"
            :options=this.options
          >
          </mt-radio></span>
          <!--@change="orderRadio"-->
        </div>

      </div>
      <div class="message">
        <div>
          <span>雇佣地点</span>
          <span>{{dataList.empdimHirelocationDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>工作地点</span>
          <span>{{dataList.empdimWorklocationDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>职位级别</span>
          <span>{{dataList.empdimPostlevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>薪资级别</span>
          <span>{{dataList.empdimSalarylevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>差旅级别</span>
          <span>{{dataList.empdimTravellevelDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>行政级别</span>
          <span>{{dataList.empdimAdminlevelDis}}</span>
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
