<template>
    <div class="wrap">
      <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
      <probationTime :dataList="dataList"></probationTime>
      <mu-container>
        <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
          <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">试用期到期信息</mu-tab>
          <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">员工自评</mu-tab>
        </mu-tabs>
        <!--:change="getData(value)"-->
        <div class="demo-text" v-if="active === 0">
          <staffInfo :dataList="subDataList"></staffInfo>
        </div>
        <div class="demo-text" v-if="active === 1">
          <data value="" v-for="item in dataList">
          <div class="personalText">
            <p>试用期自我评价</p>
            <textarea v-if="textShow" v-model="empprobSelfeva" name="" id="" cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
            <div v-if="!textShow">
              {{item.empprobSelfeva}}
            </div>
            <span v-if="!textShow" style="float:right;color: #c0c0c0;font-size: 3px;">提交时间: {{item.updateTime}}</span>
          </div>
          <!--提交-->
          <div class="submit" v-if="textShow">
            <button @click="submit">提交</button>
          </div>
          </data>
        </div>
      </mu-container>
    </div>
</template>

<script>
  import probationTime from './probationTime.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import staffInfo from './staffInfo.vue'
  import {getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
    export default {
        name: "probationPeriodList",
        data() {
          return {
            title: '试用期自评',
            flagImg: true,
            active: 0,
            textShow: true,
            dataList:[],
            subDataList:[],
            empprobSelfeva:'',
          }
        },
        components:{
          probationTime,
          headTitle,
          staffInfo
        },
      mounted() {
        this.getData()
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
              console.error(res.data.stat.stateList[0].desc)
            })
          },
          getSubData() {
            const t = this
//            t.dataList = []
            t.subDataList = []
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
//                t.dataList.push(JSON.parse(res.data.content[0].value))
                t.subDataList.push(JSON.parse(res.data.content[0].value))
                if (t.subDataList[0].empprobStpe2State !== 'undefined' && (t.subDataList[0].empprobStpe2State === 'p_flowst_1' || t.subDataList[0].empprobStpe2State === 'p_flowst_2')) {
                  t.textShow = true
                } else {
                  t.textShow = false
                }
              }
            }).catch((res) =>{
              console.error(res.data.stat.stateList[0].desc)
            })
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
        }

    }
</script>

<style scoped type="text/less" lang="less">
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
