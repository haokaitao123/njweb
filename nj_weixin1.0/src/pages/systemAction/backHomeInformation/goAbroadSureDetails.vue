<template>
    <div class="wrap">
      <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
      <goAbroadSure :dataList="subDataList"></goAbroadSure>
      <mu-container>
        <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
          <mu-tab style="flex: 1;font-size: 15px">基本信息</mu-tab>
          <mu-tab style="flex: 1;font-size: 15px">回国确认</mu-tab>
          <mu-tab style="flex: 1;font-size: 15px">资料提交</mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="active === 0" >
          <goAbroadMsg :visaReturn="visaReturn" ref="goAbroadMsg"></goAbroadMsg>
        </div>
        <div class="demo-text" v-if="active === 1">
          <protectionMsg :visaReturn="visaReturn" ref="protectionMsg"></protectionMsg>
        </div>
        <div class="demo-text" v-if="active === 2">
          <subProtectionMsg :visaReturn="visaReturn" ref="subProtectionMsg"></subProtectionMsg>
        </div>
      </mu-container>
    </div>
</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import goAbroadMsg from './goAbroadMsg.vue'
  import protectionMsg from './protectionMsg.vue'
  import goAbroadSure from './goAbroadSure.vue'
  import subProtectionMsg from './subProtectionMsg.vue'
  import {getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
    export default {
        name: "goAbroadSureDetails",
        data() {
          return {
            title: '回国资料提交',
            flagImg: true,
            active: 0,
            textShow: true,
            dataList:[],
            subDataList:[],
            empprobSelfeva:'',
            visaReturn: {},
          }
        },
        components:{
          headTitle,
          protectionMsg,
          goAbroadSure,
          goAbroadMsg,
          subProtectionMsg
        },
      mounted() {
          this.subDataList = []
          this.subDataList.push(JSON.parse(getUrlKey('params')))
          this.visaReturn = this.subDataList[0]
          if (!this.visaReturn.returnIsback) {
            this.visaReturn.returnIsback = '1'
          }
      },
      methods:{
          submit() {
            const t = this
            let params = {
              _mt: "wxEmpFlowProbation.submitStep2",
              companyId: pubsource.companyId,
              userId: localStorage.getItem('bus_userid'),
              dataId: t.subDataList[0].id,
              empprobSelfeva: t.empprobSelfeva,
            }
            getDataLevelUserLogin(params).then((res) => {
              if (isSuccess(res, t)) {
                t.getData(1)
                t.textShow = false
              }
            }).catch((res) =>{
              console.error(res.data.stat.stateList[0].desc)
            })
          },
        }
    }
</script>

<style scoped type="text/less" lang="less">
  .wrap{
    height: 100%;
    width:100%;
  }
  .demo-text{
    height: 100px;
  }
.personalText{
  wdth:100%;
  padding: 26px  0 0 30px;
  background: white;
  font-size: 30px;
  margin-bottom: 20px;
  .ipt{
    outline: none;
    border:0;
  }
}
  .submit{
    width: 100%;
    height: 86px;
    line-height: 86px;
    text-align: center;

    font-size: 36px;
    background: #FFFFFF;
    button{
      background: #3399FF;
      width: 100%;
      outline: none;
      color: #FFFFFF;
    }
  }
</style>
