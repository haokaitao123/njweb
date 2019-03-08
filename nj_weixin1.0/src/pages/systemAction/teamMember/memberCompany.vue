<!--一条为一行-->
<template>
    <div>
      <div class="message">
        <div>
          <span>公司</span>
          <span>{{empCompany.empcompHirecompanyDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>部门</span>
          <span>{{empCompany.empcompDeptDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>岗位</span>
          <span>{{empCompany.empcompPostDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>成本中心</span>
          <span>{{empCompany.empcompCostcenterDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>业务上级经理</span>
          <span>{{empCompany.empcompBuspmpDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>功能上级经理</span>
          <span>{{empCompany.empcompFunpmpDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>员工类型</span>
          <span>{{empCompany.empkiEmptypeDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>入职日期</span>
          <span>{{empCompany.empcompEntrydate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>服务年限计算开始日期</span>
          <span>{{empCompany.empcompServicedate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>证书年限计算开始日期</span>
          <span>{{empCompany.empcompCertificatedate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>雇佣地点</span>
          <span>{{empCompany.empcompHirelocationDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>工作地点</span>
          <span>{{empCompany.empcompWorklocationDis}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "memberCompany",
    data() {
      return {
        empCompany: {},
      }
    },
    mounted() {
      this.getData()
    },
    props: {
      empkiEmptypeDis: String,
      empId: String,
    },
    methods: {
      getData(){
        const t = this
        let params = {
          _mt: "weiXinTeamMember.getTeamMemCompByEmpId",
          companyId: pubsource.companyId,
          empId: this.empId
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            let obj = JSON.parse(res.data.content[0].value)
            if (obj) { // 如果为空，不能调用
              this.empCompany = obj
              this.empCompany.empkiEmptypeDis = this.empkiEmptypeDis
            }
          }
        }).catch((res) =>{
          console.error(res.data.stat.desc)
        })
      }
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
