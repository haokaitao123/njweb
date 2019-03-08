<template>
    <div class="wrap">
      <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
      <probationTime :dataList="dataList"></probationTime>
      <mu-container>
        <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
          <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">合同信息</mu-tab>
          <mu-tab style="flex: 1;font-size: 15px" @click="getContrData">合同历史</mu-tab>
          <mu-tab style="flex: 1;font-size: 15px" @click="getSubData">自我评价</mu-tab>
        </mu-tabs>
        <!--:change="getData(value)"-->
        <div class="demo-text" v-if="active === 0">
          <staffInfo :dataList="subDataList"></staffInfo>
        </div>
        <div class="demo-text" v-if="active === 1">
          <contrstaffInfo :dataList="contrList"></contrstaffInfo>
        </div>
        <div class="demo-text" v-if="active === 2">
          <data value="" v-for="item in dataList">
            <div class="textList">
              <p> 合同期工作业绩：</p>
              <p v-if="!textShow" >{{item.empconWorkperformace}}</p>
            <textarea v-if="textShow"  v-model="empconWorkperformace" name=""  cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
              <!--<textarea  v-model="empconWorkperformace" name=""  cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>-->
            </div>
            <div class="textList">
              <p>合同期工作技能：</p>
              <p v-if="!textShow">{{item.empconWorkskills}}</p>
              <textarea v-if="textShow" v-model="empconWorkskills" name="" cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
            </div>
            <div class="textList">
              <p>合同期团队协作：</p>
              <p v-if="!textShow">{{item.empconTeamwork}}</p>
              <textarea v-if="textShow" v-model="empconTeamwork" name="" cols="50" rows="10" placeholder="请填写" class="ipt"></textarea>
            </div>
            <div class="textList">
              <p>合同期组织纪律：</p>
              <p v-if="!textShow">{{item.empconOrgdiscipline}}</p>
              <textarea v-if="textShow" v-model="empconOrgdiscipline" name="" cols="50" rows="10" placeholder="请填写" class="ipt"></textarea>
            </div>
            <div class="textList">
              <p>合同期其他评价：</p>
              <p v-if="!textShow">{{item.empconOtherview}}</p>
              <textarea v-if="textShow" v-model="empconOtherview" name="" cols="50" rows="10" placeholder="请填写" class="ipt"></textarea>
            </div>
          <div class="personalText">
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
  import probationTime from './flowContractView.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import staffInfo from './staffInfo.vue'
  import contrstaffInfo from './contrStaffInfo.vue'
  import {getDataLevelUserLogin, getDataLevelUserLoginNew} from '@/axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
    export default {
        name: "probationPeriodList",
        data() {
          return {
            title: '合同续签自评',
            flagImg: true,
            active: 0,
            textShow: true,
            dataList:[],
            subDataList:[],
            contrList: [],
            empconOrgdiscipline: '',
            empconOtherview: '',
            empconTeamwork: '',
            empconWorkskills: '',
            empconWorkperformace: '',
          }
        },
        components:{
          probationTime,
          headTitle,
          staffInfo,
          contrstaffInfo,
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
              _mt: "wxEmpFlowContract.getEmpFlowContract",
              busEmpid:localStorage.getItem('bus_empid'),
              busEmpGid:localStorage.getItem('bus_empGid')
            }
            getDataLevelUserLogin(params).then((res) => {
              if (isSuccess(res, t)) {
                t.dataList.push(JSON.parse(res.data.content[0].value))
                t.subDataList.push(JSON.parse(res.data.content[0].value))
                t.empconOrgdiscipline = t.subDataList[0].empconOrgdiscipline
                t.empconOtherview = t.subDataList[0].empconOtherview
                t.empconTeamwork = t.subDataList[0].empconTeamwork
                t.empconWorkskills = t.subDataList[0].empconWorkskills
                t.empconWorkperformace = t.subDataList[0].empconWorkperformace
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
              _mt: "wxEmpFlowContract.getEmpFlowContract",
              busEmpid:localStorage.getItem('bus_empid'),
              busEmpGid:localStorage.getItem('bus_empGid')
            }
            getDataLevelUserLogin(params).then((res) => {
              if (isSuccess(res, t)) {
                t.subDataList.push(JSON.parse(res.data.content[0].value))
                if (t.subDataList[0].empconstep2status !== 'undefined' && (t.subDataList[0].empconstep2status === 'p_flowst_1' || t.subDataList[0].empconstep2status === 'p_flowst_2')) {
                  t.textShow = true
                } else {
                  t.textShow = false
                }
              }
            }).catch((res) =>{
              console.error(res.data.stat.stateList[0].desc)
            })
          },
          getContrData() {
            const t = this
            t.contrList = []
            let params = {
              _mt: "wxEmpFlowContract.getHisContract",
              busEmpid:localStorage.getItem('bus_empid'),
              busEmpGid:localStorage.getItem('bus_empGid')
            }
            getDataLevelUserLogin(params).then((res) => {
              if (isSuccess(res, t)) {
                t.contrList = JSON.parse(res.data.content[0].value)
                console.log(t.contrList)
              }
            }).catch((res) =>{
              console.error(res.data.stat.stateList[0].desc)
            })
          },
          submit() {
            const t = this
            let params = {
              _mt: "wxEmpFlowContract.submitStep2",
              logType: '提交员工自评',
              id: t.subDataList[0].id,
              empconOrgdiscipline: t.empconOrgdiscipline,
              empconOtherview: t.empconOtherview,
              empconTeamwork: t.empconTeamwork,
              empconWorkskills: t.empconWorkskills,
              empconWorkperformace: t.empconWorkperformace,
            }
            getDataLevelUserLoginNew(params).then((res) => {
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
  }
  .demo-text{
    height: calc(100% - 421px);
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
