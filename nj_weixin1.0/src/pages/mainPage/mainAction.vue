<template>
  <div class="action">
    <!--<div class="title">功能</div>-->
    <!--<headeTitle :title="headTitle" :flag="flagImg"></headeTitle>-->
    <div class="actionListWrap">
      <div class="actionList">
        <div class="actionListAll">
          <div class="actionListTop">
            事务提醒
          </div>
          <div class="actionListBottom">
            <router-link to="/backlogMatter" tag="div">
              <div class="actionListOne">
                <!--<router-link to="/InformNotice" tag="div">-->
                <img src="../../../static/action/tb_02.png" alt="">
                <p>待办事项</p>
                <!--</router-link>-->
              </div>
            </router-link>
            <div class="actionListOne">
              <router-link to="/InformNotice" tag="div">
                <img src="../../../static/action/tb_01.png" alt="">
                <p>通知公告</p>
              </router-link>
            </div>
            <router-link to="/responsibleTask" tag="div">
              <div class="actionListOne">
                <img src="../../../static/action/tb_04.png" alt="">
                <p>日程管理</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!--<div class="actionList">-->
        <!--<div class="actionListAll">-->
          <!--<div class="actionListTop">-->
            <!--日程管理-->
          <!--</div>-->
          <!--<div class="actionListBottom">-->
            <!--<div class="actionListOne">-->
              <!--<router-link to="/responsibleTask" tag="div">-->
                <!--<img src="../../../static/action/tb_03.png" alt="">-->
                <!--<p>负责任务</p>-->
              <!--</router-link>-->
            <!--</div>-->
            <!--<div class="actionListOne">-->
              <!--<router-link to="/TakeResponsibleTask" tag="div">-->
                <!--<img src="../../../static/action/tb_04.png" alt="">-->
                <!--<p>参与任务</p>-->
              <!--</router-link>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="actionList">
        <div class="actionListAll">
          <div class="actionListTop">
            人事办理
          </div>
          <div class="actionListBottom">
            <!--<router-link to="/entrySubmit" tag="div">-->
              <!--<div class="actionListOne">-->
                <!--<img src="../../../static/action/tb_05.png" alt="">-->
                <!--<p>入职材料提交</p>-->
              <!--</div>-->
            <!--</router-link>-->
            <!--<div class="actionListOne">-->
              <!--<img src="../../../static/action/tb_06.png" alt="">-->
              <!--<p>入职办理</p>-->
            <!--</div>-->
            <!--<router-link to="" tag="div">-->
              <!--<div class="actionListOne">-->
                <!--<img src="../../../static/action/tb_05.png" alt="">-->
                <!--<p>在线咨询</p>-->
              <!--</div>-->
            <!--</router-link>-->
            <router-link to="/myOrderList" tag="div">
              <div class="actionListOne">
                <img src="../../../static/action/tb_06.png" alt="">
                <p>咨询工单</p>
              </div>
            </router-link>
            <router-link to="/internaltransferConfirm"  tag="div">
              <div class="actionListOne">
                <img src="../../../static/action/tb_08.png" alt="">
                <p>调动确认</p>
              </div>
            </router-link>
            <router-link to="/flowContract"  tag="div">
              <div class="actionListOne">
                <img src="../../../static/action/tb_09.png" alt="">
                <p>续签自评</p>
              </div>
            </router-link>
            <router-link to="/probationPeriod" tag="div">
              <div class="actionListOne">
                <img src="../../../static/action/tb_07.png" alt="">
                <p>转正自评</p>
              </div>
            </router-link>
            <router-link to="/dimissionList" tag="div">
            <div class="actionListOne">
              <img src="../../../static/action/tb_10.png" alt="">
              <p>离职申请</p>
            </div>
            </router-link>
            <router-link to="/policySystem" tag="div">
              <div class="actionListOne">
                <img src="../../../static/action/tb_03.png" alt="">
                <p>政策制度</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="actionList">
        <div class="actionListAll">
          <div class="actionListTop">
            出国办理
          </div>
          <div class="actionListBottom">
            <router-link to="/goAbroadSureList" tag="div">
              <div class="actionListOne">
                <img src="../../../static/action/tb_11.png" alt="">
                <p>出国确认</p>
              </div>
            </router-link>
            <router-link to="/goAbroadPreLis">
              <div class="actionListOne">
                <img src="../../../static/action/tb_13.png" alt="">
                <p>出国资料准备</p>
              </div>
            </router-link>
            <router-link to="/backHomeList">
              <div class="actionListOne">
                <img src="../../../static/action/tb_14.png" alt="">
                <p>回国确认</p>
              </div>
            </router-link>
            <router-link to="/backHomeInformationList">
              <div class="actionListOne">
                <img src="../../../static/action/tb_12.png" alt="">
                <p>回国资料提交</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="actionList">
        <div class="actionListAll">
          <div class="actionListTop">
            团队管理
          </div>
          <div class="actionListBottom">
            <router-link to="/teamMemberList" tag="div">
              <div class="actionListOne">
                <img src="../../../static/action/tb_11.png" alt="">
                <p>团队成员</p>
              </div>
            </router-link>
            <router-link to="/contrMemberList">
              <div class="actionListOne">
                <img src="../../../static/action/tb_13.png" alt="">
                <p>续签评估</p>
              </div>
            </router-link>
            <router-link to="/probaMemberList">
              <div class="actionListOne">
                <img src="../../../static/action/tb_14.png" alt="">
                <p>转正评估</p>
              </div>
            </router-link>
            <router-link to="/fireMemberList">
              <div class="actionListOne">
                <img src="../../../static/action/tb_12.png" alt="">
                <p>离职发起</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import headeTitle from '../../components/headTitle.vue'
  export default {
    name: 'mainAction',
    data() {
      return {
        headTitle:'功能',
        flagImg:false
      }
    },
    components:{
      headeTitle
    },
    created() {},
    methods:{}
  }
</script>
<style lang="less" type="text/less" scoped>
  .action{
    height: calc(100% - 110px);
    .actionListWrap{
      height:100%;
      overflow: scroll;
    }
  }
  .title{
    width:100%;
    height:88px;
    background-color: #3399FF;
    font-size: 36px;
    color: #fff;
    text-align: center;
    line-height: 88px;
  }
  .actionList{
    background-color: #F6F6F6;
    width:100%;
    padding: 20px 30px 0 30px;
    .actionListAll{
      width: 690px;
      background-color: white;
      .actionListTop{
        width: 100%;
        padding: 15px 0 15px 15px;
        line-height: 60px;
        background-color: white;
        border-bottom: 1px solid #E3E3E3;
        font-size: 34px;
        color: black;
      }
      .actionListBottom{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        padding: 15px 0 15px 18px;
        box-sizing: border-box;
        .actionListOne{
          width:150px;
          font-size: 26px;
          color: #666666;
          text-align: center;
          margin-right: 15px;
          margin-bottom: 20px;
          img{
            width:80px;
            height:80px;
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
    }

  }


</style>
