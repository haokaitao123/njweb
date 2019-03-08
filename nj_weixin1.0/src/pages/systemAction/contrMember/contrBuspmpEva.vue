<!--一条为一行-->
<template>
  <div class="personalText">
    <div class="solution">
      <p>合同续签综合评价:</p>
      <textarea :readonly="empFlowContract.empconstep3status === 'p_flowst_3'" v-model="empFlowContract.empconOverview"
                cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="solution1">
      <div class="iSexten">
        <span>是否延续合同:</span>
        <span style="margin-left: 140px">
          <mu-radio v-model="empFlowContract.empconIsextendofbusines" style="margin-right: 16px;" value="1" label="是"></mu-radio>
          <mu-radio v-model="empFlowContract.empconIsextendofbusines" style="margin-right: 16px;" value="0" label="否"></mu-radio>
        </span>
      </div>
    </div>
    <div class="solution" v-show="empFlowContract.empconIsextendofbusines == '1'">
      <p>延续合同期及建议:</p>

      <textarea :readonly="empFlowContract.empconstep3status === 'p_flowst_3'" v-model="empFlowContract.empconRenewsugg"
                cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="solution" v-show="empFlowContract.empconIsextendofbusines == '0'">
      <p>不延续原因:</p>
      <textarea :readonly="empFlowContract.empconstep3status === 'p_flowst_3'" v-model="empFlowContract.empconNorereason"
                cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="submit" v-show="empFlowContract.empconstep3status !== 'p_flowst_3'">
      <button @click="submit">提交</button>
    </div>
    <span v-show="empFlowContract.empconstep3status === 'p_flowst_3'" style="float:right;color: #c0c0c0;font-size: 3px;margin-bottom: 5px">提交时间: {{empFlowContract.updateTime}}</span>
  </div>
</template>
<script>
  import {getDataLevelUserLogin, getDataLevelUserLoginNew, uploadFile} from '@/axios/axios'
  import {isSuccess, deepCopy} from '@/lib/util'
  import Message from 'muse-ui-message'
  import { Toast } from 'mint-ui';
  export default {
    name: "contrMemberBase",
    data() {
      return {
        textShow: false,
      }
    },
    props: {
      empFlowContract: Object,
    },
    mounted() {

    },
    methods: {
      submit() {
        const t = this
        const data = deepCopy(this.empFlowContract)
        data._mt = 'weixinContrMember.submitContrMember'
        data.dataId = this.empFlowContract.id
        data.companyId = pubsource.companyId
        data.userId = localStorage.getItem('bus_userid'),
          getDataLevelUserLoginNew(data).then(res => {
            if (isSuccess(res, t)) {
              Message.alert('提交成功', '成功', {
                type: 'success',
                okLabel: '确定'
              }).then(() => {
                this.$router.push({
                  path:'/contrMemberList'
                })
              });
            }
          }).catch((err) => {
            Message.alert('网络错误', '错误', {
              type: 'error',
              okLabel: '确定'
            }).then(() => {
            });
        })
      },
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .solution{
    border-bottom: 20px solid #F2F2F2;
  }
  .solution1{
    border-bottom: 20px solid #F2F2F2;
    height: 80px;
    .iSexten{
      /*height: 80px;*/
      margin-top: 30px;
    }
  }
  textarea{
    width: 100%;
    height: 200px;
    margin-right: 10px;
    border-bottom: 20px solid #F2F2F2;
  }
  .personalText{
    wdth:100%;
    padding: 30px;
    background: white;
    font-size: 30px;
    margin-bottom: 20px;
    .ipt{
      outline: none;
      border:0;
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
  }

  .message{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    .msgOne{
      display: flex;
      align-items: center;
      .span1{
        display: inline-block;
        width:300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .span2{
        display: inline-block;
        width:220px;
      }
      .divOne{
        width:150px;
      }
      .divTwo{
        display: flex;
      }
      div{
        padding: 0;
      }
      .Image{
        width: 20px;
        height:30px;
        float: right;
        margin-top: 6px;
        margin-left: 10px;
      }
    }
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
    }
    .Li{
      position: relative;;
    }
    .dateTime{
      position: absolute;
      top:0;
      right:0;
      padding: 0;
      /*color: #84DC76;*/
    }
  }
</style>
