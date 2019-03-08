<!--一条为一行-->
<template>
    <div class="messageAll">
      <div class="message">
        <div>
          <span>员工工号</span>
          <span>{{empBase.empkiWorkno}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>唯一标识</span>
          <span>{{empBase.empGid}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>中文名</span>
          <span>{{empBase.empCname}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>性别</span>
          <span>{{empBase.empGenderDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>Last Name</span>
          <span>{{empBase.empLastname}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>First Name</span>
          <span>{{empBase.empFirstname}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>出生日期</span>
          <span>{{empBase.empBirthdate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>民族</span>
          <span>{{empBase.empNationDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>婚育状况</span>
          <span>{{empBase.empMarriageDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>政治面貌</span>
          <span>{{empBase.empPoliticalDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>参加工作时间</span>
          <span>{{empBase.empFirstworkdate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>职称</span>
          <span>{{empBase.empTechnicaltitleDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>职称专业</span>
          <span>{{empBase.empTechspec}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>职称取得时间</span>
          <span>{{empBase.empTechdate}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "memberBase",
    data() {
      return {
        empBase: {},
      }
    },
    mounted() {
      this.getData()
    },
    props: {
      empkiWorkno: String,
      empId: String,
    },
    methods: {
      getData(){
        const t = this
        let params = {
          _mt: "weiXinTeamMember.getTeamMemBaseByEmpId",
          companyId: pubsource.companyId,
          empId: this.empId
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
           this.empBase = JSON.parse(res.data.content[0].value)
           this.empBase.empkiWorkno = this.empkiWorkno
          }
        }).catch((res) =>{
          console.error(res.data.stat.desc)
        })
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
