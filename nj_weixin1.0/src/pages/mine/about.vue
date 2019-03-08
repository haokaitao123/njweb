<template>
  <div class="wrap">
    <header-title :title="title" :flag="flag"></header-title>
    <div class="contentAll">
      <p class="title">人力资源共享服务平台员工端</p>
      <div class="content">
        <p>职工可以通过电脑或手机登录员工自助系统。在员工自助系统中，职工可以享受以下服务：</p>
        <ul>
          <li>1.查看个人的基本信息、薪酬及社保缴费信息。</li>
          <li>2.查询国家、集团公司、地方及公司内部有关人力资源方面的政策及热点问答。</li>
          <li>3.能进行在线提问咨询与本人切身利益相关的政策事宜，由人力资源专家提供解答服务。 </li>
          <li>4.能提供在线申请收入证明和身份证明的办理业务，方便职工办事。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import headerTitle from '../../components/headTitle.vue';

  export default {
    name: "about",
    data() {
      return {
        title: '关于',
        flag:true
      }
    },
    components: {
      headerTitle
    }
  }
</script>

<style scoped lang="less" type="text/less">
  ul,li{
    list-style: none;
  }
  .wrap {
    .contentAll{
      height: 1000px;
      .title{
        color: #333333;
        font-size: 36px;
        text-align: center;
        padding-top: 58px;
        padding-bottom: 62px;
        box-sizing: border-box;
      }
      background-color: #FFFFFF;
      .content {
        padding: 0 32px;
        box-sizing: border-box;
        font-size: 30px;
        p{
          margin-bottom: 40px;
        }
        ul>li {
          margin-bottom: 40px;
        }
      }
    }

  }
</style>
