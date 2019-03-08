<template>
  <div class="login" >
    <div class="login_top">
      <div class="login_img">
        <img src="../../../static/img/HROCloud_Logo_new.png" alt="">
        <span>人力资源共享服务平台</span>
      </div>
    </div>
    <transition name="component-fade" mode="out-in">
      <router-view/>
    </transition>
    <div class="login_mid"></div>
    <div class="login_fot">POWEREDBY HROCLOUD.COM</div>
    <div class="logo_con"></div>
    <div class="test_con"></div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    /*background-image: url('../../../static/img/login_bg.jpg');*/
    /*background-size: cover;*/
    background-position: center;
    position: relative;
    .login_top{
      width:100%;
      height: 10%;
      background: white;
      padding-left: 60px;
      .login_img{
        width:350px;
        padding-top: 20px;
        display: flex;
        align-items: center;
        img{
          width:135px;
          height: 35px;
          margin-right: 10px;
        }
        span{
          font-size: 20px;
          font-weight: bold;
          padding-top: 10px;
        }
      }
    }
    .login_mid{
      width: 100%;
      height: 80%;
      background-image: url('../../../static/img/q.jpg');
      background-size: cover;
    }
    .login_fot{
      width:100%;
      height: 10%;
      background: white;
      font-size: 14px;
      text-align: center;
      line-height: 63.5px;
      font-weight: bold;
    }
    .logo_con{
      position: absolute;
      top:50px;
      left:100px;
      width:200px;
      height:50px;
      /*background-image: url('../../../static/img/HROCloud_Logo_.png');*/
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .test_con{
      position: absolute;
      top:65px;
      left:300px;
      width:200px;
      height:25px;
      /*background-image: url('../../../static/img/z.png');*/
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
</style>
