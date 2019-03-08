<template>
    <div class="wrap">
      <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
      <goAbroadSure :dataList="dataList"></goAbroadSure>
        <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
          <mu-tab style="flex: 1;font-size: 15px" >出国信息</mu-tab>
          <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">护照信息</mu-tab>
        </mu-tabs>
        <!--:change="getData(value)" -->
        <div class="demo-text" v-if="active === 0">
          <goAbroadMsg :dataList="dataList" ></goAbroadMsg>
        </div>
        <div class="demo-text" v-if="active === 1">
          <protectionMsg  ref="protectionMsgs" :empprobSelfeva="empprobSelfeva" :options="options"></protectionMsg>
        </div>
      <masking v-show="this.$store.state.goAbroad.cityFlag" @close="closeMask"></masking>
      <update ref="update"  v-show="this.$store.state.goAbroad.areaContryDis" :areaContrys="dataList" @close1="close1"></update>
    </div>
</template>

<script>
//  import probationTime from './probationTime.vue'
  import masking from '../../../pages/appLink/maskIng/masking.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import goAbroadMsg from './goAbroadMsg.vue'
  import protectionMsg from './protectionMsg.vue'
  import goAbroadSure from './goAbroadSure.vue'
  import update from './mask/masking.vue'
  import {getDataLevelUserLogin,getDataLevelNone} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
    export default {
        name: "goAbroadSureDetails",
        data() {
          return {
            title: '试用期自评',
            flagImg: true,
            cityFlag: false,
            active: 0,
            textShow: true,
            dataList:[],
            YesOrNo: [],    // 是否
            options: [],    // 是否
            subDataList:[],
            empprobSelfeva:{},
          }
        },
        components:{
          headTitle,
          masking,
          protectionMsg,
          goAbroadSure,
          update,
          goAbroadMsg
        },
      mounted() {
          this.dataList = []
          this.dataList.push(JSON.parse(getUrlKey('params')))
          this.$store.state.goAbroad.empprobSelfeva.passCityDis = JSON.parse(getUrlKey('params')).passCityDis
          this.$store.state.goAbroad.empprobSelfeva.passAreaDis = JSON.parse(getUrlKey('params')).passAreaDis
          this.$store.state.goAbroad.empprobSelfeva.passArea = JSON.parse(getUrlKey('params')).passArea
          this.$store.state.goAbroad.empprobSelfeva.passNumber = JSON.parse(getUrlKey('params')).passNumber
          this.$store.state.goAbroad.empprobSelfeva.passNowareaDis = JSON.parse(getUrlKey('params')).passNowareaDis
          this.$store.state.goAbroad.empprobSelfeva.passNowarea = JSON.parse(getUrlKey('params')).passNowarea
          this.$store.state.goAbroad.empprobSelfeva.id = JSON.parse(getUrlKey('params')).id
          this.$store.state.goAbroad.empprobSelfeva.thisStepstate = JSON.parse(getUrlKey('params')).thisStepstate
          this.$store.state.goAbroad.empprobSelfeva.passHaspass = JSON.parse(getUrlKey('params')).passHaspass
          console.log(this.$store.state.goAbroad.empprobSelfeva)
      },
        methods:{
          getSubData() {
              this.$refs.update.getData()
          },
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
          closeMask() {
              this.$store.commit('goAbroad/setcityFlag',false)
          },
          close1() {
            this.$store.commit('goAbroad/setareaContryDis',false)
          }
        }

    }
</script>

<style scoped type="text/less" lang="less">
  .wrap{
    height: 100%;
    width:100%;
  }
  .demo-text{
    height: calc(100% - 480px);
    overflow-y: scroll;
    background: white;
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
