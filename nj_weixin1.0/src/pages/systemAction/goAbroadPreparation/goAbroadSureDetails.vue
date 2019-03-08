<template>
    <div class="wrap">
      <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
      <goAbroadSure :dataList="dataList"></goAbroadSure>
        <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
          <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">基本信息</mu-tab>
          <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">资料清单</mu-tab>
          <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">资料提交</mu-tab>
        </mu-tabs>
        <!--:change="getData(value)" -->
        <div class="demo-text" v-if="active === 0">
          <!--基本信息-->
          <goAbroadMsg :dataList="subDataList"></goAbroadMsg>
        </div>
        <div class="demo-text" v-if="active === 1" style="background: #f2f2f2">
          <!--资料清单-->
          <preparationMsg :dataList="subDataList"></preparationMsg>
        </div>
        <div class="demo-text" v-if="active === 2">
          <!--资料提交-->
          <protectionMsg :dataList="subDataList"></protectionMsg>
        </div>
    </div>
</template>

<script>
//  import probationTime from './probationTime.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import goAbroadMsg from './goAbroadMsg.vue'
  import protectionMsg from './protectionMsg.vue'
  import goAbroadSure from './goAbroadSure.vue'
  import preparationMsg from './preparationMsg.vue'
  import {getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull,getUrlKey} from '@/lib/util'
    export default {
        name: "goAbroadSureDetails",
        data() {
          return {
            title: '试用期自评',
            flagImg: true,
            active: 0,
            textShow: true,
            dataList:[],
            subDataList:{},
            empprobSelfeva:'',
          }
        },
        components:{
          headTitle,
          protectionMsg,
          goAbroadSure,
          preparationMsg,
          goAbroadMsg
        },
      mounted() {
        this.dataList = []
        this.dataList.push(JSON.parse(getUrlKey('params')))
        this.subDataList = JSON.parse(getUrlKey('params'))
      },
        methods:{
          getData(value) {
            const t = this
            t.dataList = []
            if (value) {
              t.subDataList = []
            }
            let params = {
              _mt: "wxEmpFlowProbation.getEmpFlowProbation",
              companyId: pubsource.companyId,
              userCode: 1,
              state: localStorage.getItem('bus_empStatus'),
              wxMobile: localStorage.getItem('wx_mobile'),
              busEmpid:localStorage.getItem('bus_empid'),
              busEmpGid:localStorage.getItem('bus_empGid')
            }
            getDataLevelUserLogin(params).then((res) => {
              if (isSuccess(res, t)) {
                t.dataList.push(JSON.parse(res.data.content[0].value))
                console.log(t.dataList)
                t.subDataList.push(JSON.parse(res.data.content[0].value))
                t.empprobSelfeva = t.subDataList[0].empprobSelfeva
              }
            }).catch((res) =>{
              console.error(res.data.state.stateList[0].desc)
            })
          },
          getSubData() {},
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
              console.error(res.data.state.stateList[0].desc)
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
    height: calc(100% - 535px);
    overflow-y: scroll;
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
