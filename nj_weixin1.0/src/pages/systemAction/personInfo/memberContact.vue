<!--一条为一行-->
<template>
    <div>
      <div class="message">
        <div>
          <span>手机号码</span>
          <span>{{empContact.empctaMobile}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>联系电话(固定)</span>
          <span>{{empContact.empctaPhone}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>QQ</span>
          <span>{{empContact.empctaQq}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>微信号</span>
          <span>{{empContact.empctaWechat}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>公司邮箱</span>
          <span>{{empContact.empctaCompmail}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>紧急联系人</span>
          <span>{{empContact.empctaEmergcontact}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>紧急联系人关系</span>
          <span>{{empContact.empctaEmcrelation}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>紧急联系电话</span>
          <span>{{empContact.empctaEmcphone}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "memberContact",
    data() {
      return {
        empContact: {},
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
          _mt: "weiXinEmpInfo.getEmpContaByEmpId",
          companyId: pubsource.companyId,
          empId: this.empId
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            let obj = JSON.parse(res.data.content[0].value)
            if (obj) { // 如果为空，不能调用
              this.empContact = obj
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
