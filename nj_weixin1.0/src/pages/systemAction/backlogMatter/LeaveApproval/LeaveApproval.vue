<template>
    <div class="wrap">
      <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
      <probationTime :dataList="dataList"></probationTime>
      <mu-container>
        <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll"  :full-width="true" class="tabs">
          <mu-tab style="font-size: 15px">基本信息</mu-tab>
          <mu-tab style="font-size: 15px">合同信息</mu-tab>
          <mu-tab style="font-size: 15px">审批记录</mu-tab>
          <mu-tab style="font-size: 15px">我的审批</mu-tab>
        </mu-tabs>

        <div class="demo-text" v-if="active === 0">
          <staffInfo :dataList="dataList" :empdimGetcertificate="empdimGetcertificate"></staffInfo>
        </div>
        <div class="demo-text" v-if="active === 1">
          <contrstaffInfo :dataList="dataList"></contrstaffInfo>
        </div>
        <div class="demo-text" v-if="active === 2">
          <recordInfo :dataListRecord="dataListRecord"></recordInfo>
        </div>
        <div class="demo-text" v-if="active === 3">
          <SubmitInfo :dataList="dataList"></SubmitInfo>
        </div>
      </mu-container>
    </div>
</template>

<script>
  import probationTime from './ApprovalView.vue'
  import staffInfo from './staffInfo.vue'
  import contrstaffInfo from './contrStaffInfo.vue'
  import SubmitInfo from './SubmitInfo.vue'
  import recordInfo from './recordInfo.vue'
  import {getDataLevelUserLogin, getDataLevelUserLoginNew, getDataLevelUserLoginNew1} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
    export default {
        name: "probationPeriodList",
        data() {
          return {
            title: '合同续签自评',
            flagImg: true,
            active: 0,
            textShow: true,
            dataList:{},
            contrList: [],
            empdimGetcertificate: '',
          }
        },
        components:{
          probationTime,
          staffInfo,
          contrstaffInfo,
          SubmitInfo,
          recordInfo,
        },
        mounted() {
          let Tbname = getUrlKey('Tbname')
          let apId = getUrlKey('apId')
          let flowId = getUrlKey('flowId')
          let aprdBillid = getUrlKey('aprdBillid')
          this.getData(Tbname,apId,aprdBillid)
          this.getDataRecord(flowId,apId)

        },
        methods:{
          getData(Tbname,apId, aprdBillid) {
            const t = this
            t.dataList = []
            let params = {
              _mt: "weiXinTodo.getInfoByObj",
              logType: "查询审批内容",
              tbname:Tbname,
              apblDataid:apId,
              aprdBillid:aprdBillid
            }
            getDataLevelUserLoginNew1(params).then((res) => {
              if (isSuccess(res, t)) {
                console.log(res.data.content[0])
                t.dataList = JSON.parse(res.data.content[0].value)
                t.empdimGetcertificate = t.dataList.empdimGetcertificate
                console.log(t.dataList)
              }
            }).catch((res) =>{
              console.error(res.data.stat.stateList[0].desc)
            })
          },
          getDataRecord(flowId,apId) {
            const t = this
            t.dataListRecord = []
            let params = {
              _mt: "weiXinTodo.getApprovalRecord",
              logType: "查询审批记录",
              flowId:flowId,
              apblDataid:apId
            }
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                console.log(res.data.content[0])
                t.dataListRecord = JSON.parse(res.data.content[0].value)
                console.log(t.dataListRecord)
              }
            }).catch((res) =>{
              console.error(res.data.stat.stateList[0].desc)
            })
          }
        }

    }
</script>

<style scoped type="text/less" lang="less">
  .wrap{
    height: 100%;
    .container{
      height: calc(100% - 480px);
      overflow-y: scroll;
      .demo-text{
        height: calc(100% - 64px);
        overflow-y: scroll;
      }
    }
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
  .textList{
    padding: 38px 0 0 26px;
    box-sizing: border-box;
    background-color: #ffffff;
    width:100%;
    font-size: 30px;
    margin-bottom: 10px;
    p:nth-of-type(1){
      color: #666666;
      margin-bottom: 25px;
    }
    p:nth-of-type(2){
      color: #333333;
    }
  }
  textarea{
    border:0;
    background-color:transparent;
    /*scrollbar-arrow-color:yellow;
      scrollbar-base-color:lightsalmon;
      overflow: hidden;*/
    color: #666464;
    height: auto;
    outline:none;/*去除蓝色边框*/
  }

</style>
