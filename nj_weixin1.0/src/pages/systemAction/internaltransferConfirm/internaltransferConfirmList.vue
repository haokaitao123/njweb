<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <probationTime :dataList="dataList"></probationTime>
      <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
        <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">调动信息</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">调动确认</mu-tab>
      </mu-tabs>
      <!--:change="getData(value)"-->
      <div class="contrdetail">
      <div class="demo-text" v-if="active === 0">
        <staffInfo :dataList="subDataList"></staffInfo>
      </div>
      <div class="demo-text" v-if="active === 1">
        <data value="" v-for="item in dataList">
          <div class="personalText">
            <div style="padding-bottom: 15px; border-bottom:solid 1px #c9c9c9;">
              <p>是否同意调动</p>
              <p>我已知晓调动事宜</p>
              <p>
                <mu-flex class="select-control-row">
                  <mu-radio value="1" :disabled="!textShow"  v-model="normal.radio" label="同意"></mu-radio>
                  <mu-radio value="0" :disabled="!textShow" v-model="normal.radio"  label="不同意"></mu-radio>
                </mu-flex>
              </p>
            </div>
            <div style="padding-top: 15px;" v-if="normal.radio == '0'">
              <p>不同意原因</p>
              <textarea v-model="empintNocmreason" v-show="textShow" name="" id="" cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
              <div v-show="!textShow">
                {{item.empintNocmreason}}
              </div>
            </div>
          </div>
          <!--提交-->
          <div class="submit" v-if="textShow">
            <button @click="submit">提交</button>
          </div>
        </data>
      </div>
      </div>
    <!--<no-Info></no-Info>-->
    <no-Info v-loading="isLoading" v-show="noInfo"></no-Info>
  </div>
</template>

<script>
  import probationTime from './internaltransferConfirmView.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import staffInfo from './staffInfo.vue'
  import {getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
  export default {
    name: "internaltransferPeriodList",
    data() {
      return {
        title: '调动确认',
        flagImg: true,
        active: 0,
        textShow: true,
        dataList:[],
        subDataList:[],
        isLoading: true,
        empintNocmreason: '',
        noInfo: true,
        normal: {
          radio: '1',
        },
      }
    },
    components:{
      probationTime,
      headTitle,
      staffInfo,
    },
    mounted() {
      this.getData()
    },
    methods:{
      getData(value) {
        const t = this
        t.isLoading = true
        t.dataList = []
        if (value) {
          t.subDataList = []
        }
        let params = {
          _mt: "wxEmpFlowInternaltransfer.getEmpFlowInternaltransfer",
          companyId: pubsource.companyId,
          busEmpid:localStorage.getItem('bus_empid'),
          busEmpGid:localStorage.getItem('bus_empGid')
        }
        getDataLevelUserLogin(params).then((res) => {
          t.isLoading = false
          if (isSuccess(res, t)) {
            if (res.data.content[0].value === '' || res.data.content[0].value === undefined) {
              t.noInfo = true
            } else {
              t.noInfo = false
            }
            t.dataList.push(JSON.parse(res.data.content[0].value))
            t.subDataList.push(JSON.parse(res.data.content[0].value))
            t.empintNocmreason = t.subDataList[0].empintNocmreason
            t.normal.radio = t.subDataList[0].empintIsconfirm
          }
        }).catch((res) =>{
          console.error(res.data.stat.stateList[0].desc)
        })
      },
      getSubData(value) {
        const t = this
//            t.dataList = []
        t.subDataList = []
        let params = {
          _mt: "wxEmpFlowInternaltransfer.getEmpFlowInternaltransfer",
          companyId: pubsource.companyId,
          busEmpid:localStorage.getItem('bus_empid'),
          busEmpGid:localStorage.getItem('bus_empGid')
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.subDataList.push(JSON.parse(res.data.content[0].value))
            if (t.subDataList[0].empintStpe3State !== 'undefined' && (t.subDataList[0].empintStpe3State === 'p_flowst_1' || t.subDataList[0].empintStpe3State === 'p_flowst_2')) {
              t.textShow = true
            } else {
              t.textShow = false
            }
            t.normal.radio = t.subDataList[0].empintIsconfirm
          }
        }).catch((res) =>{
          console.error(res.data.stat.stateList[0].desc)
        })
      },
      submit() {
        const t = this
        let params = {
          _mt: "wxEmpFlowInternaltransfer.submitStep3",
          companyId: pubsource.companyId,
          userId: localStorage.getItem('bus_userid'),
          dataId: t.subDataList[0].id,
          empintNocmreason: t.empintNocmreason,
          empintIsconfirm: t.normal.radio,
        }
        if (!params.empintNocmreason) {
            delete params.empintNocmreason
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
  @import '../../css/common_inform';
  .wrap{
    height: 100%;
  }
  .contrdetail{
    height: calc(100% - 334px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .personalText{
    wdth:100%;
    padding: 26px  0 0 30px;
    background: white;
    font-size: 30px;
    margin-bottom: 20px;

    div:nth-of-type(1){
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
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
    border:0;
    font-size: 36px;
    background: #FFFFFF;
    outline: none;
    button{
      background: #3399FF;
      width: 100%;
      outline: none;
      color: #FFFFFF;
    }
  }
</style>
