<template>
  <div>
    <div v-loading="isLoading" class="message">
      <div>
        <!-- 下拉框 -->
        <span>离职类型</span>
        <span>自愿</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>申请日期</span>
        <span>{{empFlowDimission.empdimApplydate}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>上级经理</span>
        <span>{{empFlowDimission.empdimBuspmpDis}}</span>
      </div>
    </div>
    <div class="message">
      <div class="msgOne">
        <div>最后工作日期</div>
        <div>
          <span>{{empFlowDimission.empdimLaskworkday}}</span>
          <img v-show="!textShow" @click="goDateYaar(0)" class="Image" src="../../../../static/action/05.png" alt="">
        </div>
      </div>
    </div>
    <div class="message">
      <div class="msgOne">
        <!-- 下拉选择框 -->
        <div>最后雇用日期</div>
        <div>
          <span>{{empFlowDimission.empdimLaskemployday}}</span>
          <img v-show="!textShow" @click="goDateYaar(1)" class="Image" src="../../../../static/action/05.png" alt="">
        </div>
      </div>
    </div>
    <div class="message">
      <div class="msgOne">
        <!-- 下拉选择框 -->
        <div class="divOne">离职原因</div>
        <div class="divTwo">
          <div class="span1">{{empFlowDimission.empdimDimreasonDis}}</div>
          <div class="span2" v-show="empFlowDimission.empdimDimreason === undefined">请选择离职原因</div>
          <img v-show="!textShow" @click="openReason" class="Image" src="../../../../static/action/05.png" alt="">
        </div>
      </div>
    </div>
    <div class="message">
      <div class="Li">
        是否需要离职证明
        <div class="dateTime">
          <mu-radio v-model="empFlowDimission.empdimGetcertificate" style="margin-right: 16px;" value="1" label="是"></mu-radio>
          <mu-radio v-model="empFlowDimission.empdimGetcertificate" style="margin-right: 16px;" value="0" label="否"></mu-radio>
        </div>
      </div>
    </div>
    <div class="message">
      <div>
        <span>个人邮箱</span>
        <span>{{empFlowDimission.empdimPersmail}}</span>
      </div>
    </div>
    <div>
      <div class="personalText">
        <p>备注</p>
        <textarea cols="30" rows="3" :readonly="textShow" v-model="empFlowDimission.empdimComment" style="width: 100%" placeholder="请填写" class="ipt"></textarea>
        <span v-show="textShow" style="float:right;color: #c0c0c0;font-size: 3px;">提交时间: {{empFlowDimission.empdimLaskemployday}}</span>
      </div>
    </div>
    <div class="message1" v-show="!textShow">
      <div @click="save">保存</div>
      <div @click="submit">提交</div>
    </div>
    <dateYear @close="closeDate" :value="value" :empFlowDimission="empFlowDimission" v-show="dateYear"></dateYear>
    <leaveReason @close="closeReason" :reasonList="reasonList" v-if="leaveReason"></leaveReason>
  </div>
</template>

<script>
  import dateYear from './dateYear.vue'
  import leaveReason from './leaveReason.vue'
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelUserLoginNew} from '@/axios/axios'
  import {isSuccess, deepCopy} from '@/lib/util'
  import Message from 'muse-ui-message'

  export default {
    name: "dimissionInitial",
    data() {
      return {
        textShow: false,
        dateYear: false,
        leaveReason: false,
        reasonList: [],
        isLoading: false,
        labelPosition: 'top',
        value: 0,
      }
    },
    components:{
      dateYear,
      leaveReason,
    },
    mounted() {
      if (this.empFlowDimission.Step1State === 'p_flowst_3') {
        this.textShow = true
      }
      this.getSelect()
    },
    props: {
      empFlowDimission: Object,
    },
    methods: {
      // 保存流程信息
      save() {
        const t = this
        t.isLoading = true
        const data = deepCopy(this.empFlowDimission)
        data._mt = 'weiXinFireMember.saveFireMember'
        data.dataId = this.empFlowDimission.id
        data.companyId = pubsource.companyId
        data.userId = localStorage.getItem('bus_userid'),
        getDataLevelUserLoginNew(data).then(res => {
          t.isLoading = false
          if (isSuccess(res, t)) {
            if (this.empFlowDimission.id) {
              Message.alert('更新成功', '成功', {
                type: 'success',
                okLabel: '确定'
              }).then(() => {
                this.$router.push({
                  path:'/dimissionList'
                })
              });
            } else {
              Message.alert('保存成功', '成功', {
                type: 'success',
                okLabel: '确定'
              }).then(() => {
                this.$router.push({
                  path:'/dimissionList'
                })
              });
            }
          }
        }).catch((err) => {
          Message.alert('网络错误', '错误', {
            type: 'error',
            okLabel: '确定'
          }).then(() => {
            this.dataList.shift()
          });
        })
      },
    // 提交方法
      submit() {
        const t = this
        t.isLoading = true
        const data = deepCopy(this.empFlowDimission)
        data._mt = 'weiXinFireMember.submitFireMember'
        data.dataId = this.empFlowDimission.id
        data.companyId = pubsource.companyId
        data.userId = localStorage.getItem('bus_userid'),
          getDataLevelUserLoginNew(data).then(res => {
            t.isLoading = false
            if (isSuccess(res, t)) {
              Message.alert('提交成功', '成功', {
                type: 'success',
                okLabel: '确定'
              }).then(() => {
                this.$router.push({
                  path:'/dimissionList'
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
      /**
       * 下拉框，获取员工状态
       */
      getSelect(){
        const t = this
        const data = {
          _mt:'weiXinFireMember.getLeaveReason',
          companyId: pubsource.companyId,
          userId: localStorage.getItem('bus_userid'),
          levaReatype: '01voluntary',
        }
        getDataLevelUserLoginNew(data).then(res => {
          if (isSuccess(res, t)) {
            this.reasonList = JSON.parse(res.data.content[0].value)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 选择日期
      goDateYaar(value){
        this.dateYear = true
        this.value = value
      },
      closeDate() {
        this.dateYear = false
      },
      // 选择离职理由
      openReason() {
        this.leaveReason = true
      },
      closeReason(item) {
        this.empFlowDimission.empdimDimreason = item.id
        this.empFlowDimission.empdimDimreasonDis = item.levaCname
        this.leaveReason = false
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
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
  .message1{
    width:100%;
    height: 300px;
    display: flex;
    justify-content: flex-end;
    padding: 50px 0;
    div{
      margin-right: 50px;
      width:300px;
      height:60px;
      color: white;
      background: #3399FF;
      font-size: 36px;
      text-align: center;
      line-height: 60px;
      border-radius: 10px;
    }
    div:nth-of-type(1){
      border:2px solid #3399FF;
      background: white;
      color: #3399FF;
    }
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
    span{
      display: inline-block;
      height:150px;
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
  .demo-date-picker {
    margin: 8px;
  }
  .test{
    position: absolute;
  }
</style>
