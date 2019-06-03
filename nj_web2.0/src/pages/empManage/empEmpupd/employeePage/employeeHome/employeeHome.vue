<!--  -->
<template>
  <div class="main">
    <div class="head">
      <div class="title">
        <div class="top">
          <div class="tel">
            服务热线：400-815-2266
          </div>
        </div>
        <div class="content">
          <div class="logo">
            <img src="../../../../static/img/HROCloud_Logo_.png"></img>
            <span>员工/经理人事共享服务大厅</span>
          </div>
          <div class="user">
            <img src="../../../../static/employee/rt.png"></img>
            <a @click="login">用户登录</a>
          </div>
        </div>

      </div>
      <div class="btn">
        <Dropdown class="dropdown">
          <Button href="javascript:void(0)" type="warning" size="large" @click="login">
            我的待办
          </Button>
          <!-- <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem disabled>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem divided>北京烤鸭</DropdownItem>
            </DropdownMenu> -->
        </Dropdown>
        <Dropdown class="dropdown">
          <Button href="javascript:void(0)" type="warning" size="large" @click="login">
            我的查询
          </Button>
          <!-- <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem disabled>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem divided>北京烤鸭</DropdownItem>
            </DropdownMenu> -->
        </Dropdown>
        <Dropdown class="dropdown">
          <Button href="javascript:void(0)" type="warning" size="large" @click="login">
            我的人事
          </Button>
          <!-- <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem disabled>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem divided>北京烤鸭</DropdownItem>
            </DropdownMenu> -->
        </Dropdown>
        <Dropdown class="dropdown">
          <Button href="javascript:void(0)" type="warning" size="large" @click="login">
            我的咨询
          </Button>
          <!-- <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem disabled>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem divided>北京烤鸭</DropdownItem>
            </DropdownMenu> -->
        </Dropdown>
        <Dropdown class="dropdown">
          <Button href="javascript:void(0)" type="warning" size="large" @click="login">
            我的办理
          </Button>
          <!-- <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem disabled>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem divided>北京烤鸭</DropdownItem>
            </DropdownMenu> -->
        </Dropdown>
      </div>
      <div class="man">
        <div class="font">
          有任何不明白的地方， 请点击进入
          <a>办事指南</a>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="left con">
        <div class="title">
          <img src="../../../../static/employee/tz.png">
          <div class="titlefont">
            通知公告
            <a>>>更多</a>
          </div>
        </div>
        <div class="content">
          <div class="item" v-for="(item, index) in todoList" :key="index">
            <img src="../../../../static/employee/tz1.png">
            <div class="itemfont">
              <a>{{item.cmutNoticeTitle}}</a>
            </div>
            <div class="time">
              {{item.cmutNoticePublish}}
            </div>
          </div>
        </div>
      </div>
      <div class="right con">
        <div class="title">
          <img src="../../../../static/employee/gg.png">
          <div class="titlefont">
            政策制度
            <a>>>更多</a>
          </div>
        </div>
        <div class="content">
          <div class="item">
            <img src="../../../../static/employee/gg1.png">
            <div class="itemfont">
              <a>增值税发票验旧</a>
            </div>
            <div class="time">
              2012-12-01
            </div>
          </div>
          <div class="item">
            <img src="../../../../static/employee/gg1.png">
            <div class="itemfont">
              <a>员工资助服务平台2.1.0版本更新</a>
            </div>
            <div class="time">
              2012-12-01
            </div>
          </div>
          <div class="item">
            <img src="../../../../static/employee/gg1.png">
            <div class="itemfont">
              <a>员工资助服务平台2.1.0版本更新</a>
            </div>
            <div class="time">
              2012-12-01
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="zhanwei"></div>
    <div class="footer">
      Copyright © 2013-2018 上海仁云信息科技有限公司
    </div>
    <login v-if="showLogin" @close="close"></login>
  </div>
</template>
<script>
  import login from './login'
  import {
    getNoteCode,
    getDataLevelNone
  } from '../../../axios/axios'
  import {
    setCookie,
    isSuccess,
    getCookie
  } from '../../../lib/util'

  export default {
    data() {
      return {
        showLogin: false,
        todoList: [],
      }
    },
    components: {
      login,
    },
    created() {

    },
    mounted() {
      this.getTodo()
    },
    methods: {
      login() {
        let t = this
        t.showLogin = true
      },
      getTodo() {
        let t = this
        let data = {
          _mt: 'cmutNotic.getList',
          companyId: '1000',
        }
        getDataLevelNone(data).then((res) => {
          this.todoList = res.data.content[0].value
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      close() {
        let t = this
        t.showLogin = false
      },
    },
  }

</script>
<style lang='scss' scoped>
  .main {
    width: 100%;
    min-height: 100%;
    position: relative;
    .head {
      width: 100%;
      height: 0;
      padding-top: 588px;
      background: url('../../../../static/img/login_bg.jpg') center no-repeat;
      background-size: cover;
      position: relative;
      .title {
        position: absolute;
        top: 40px;
        width: 100%;
        height: 0;
        padding-top: 120px;
        background: url('../../../../static/employee/bg-01.png') center no-repeat;
        background-size: cover;
        .top {
          position: absolute;
          top: -40px;
          width: 100%;
          height: 40px;
          background-color: #1956a7;
          .tel {
            position: absolute;
            right: 20px;
            color: #ffffff;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
          }
        }
        .content {
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 55px;
          line-height: 55px;
          padding: 0 20px;
          top: 10px;
          .logo {
            display: flex;
            align-items: center;
            font-size: 18px;
            color: #ffffff;
          }
          .user {
            display: flex;
            align-items: center;
            height: 55px;
            font-size: 16px;
            a {
              margin-left: 10px;
              color: #ffffff;
            }
          }
        }
      }
      .btn {
        width: 1200px;
        position: absolute;
        left: 50%;
        margin-left: -600px;
        top: 200px;
        display: flex;
        padding: 0 40px;
        justify-content: flex-end;
        .dropdown {
          margin-left: 20px;
        }
      }
      .man {
        position: absolute;
        bottom: 0;
        left: 100px;
        width: 500px;
        height: 362px;
        background: url('../../../../static/employee/bg-03.png') center no-repeat;
        background-size: cover;
        .font {
          position: absolute;
          top: 110px;
          right: 15px;
          width: 180px;
          height: 80px;
          font-size: 16px;
          color: #222222;
          a {
            font-size: 18px;
            font-weight: bold;
            color: #f7941e;
          }
        }
      }
    }
    .center {
      position: relative;
      width: 1200px;
      padding: 0 30px 30px 30px;
      left: 50%;
      margin-left: -600px;
      display: flex;
      .con {
        width: 50%;
        padding: 20px 50px;
        .title {
          width: 100%;
          height: 50px;
          line-height: 50px;
          position: relative;
          img {
            margin-top: 10px;
            position: absolute;
          }
          .titlefont {
            position: relative;
            width: 100%;
            margin-left: 40px;
            font-size: 16px;
            a {
              position: absolute;
              right: 80px;
              font-size: 14px;
            }
          }
        }
        .content {
          .item {
            position: relative;
            height: 40px;
            line-height: 40px;
            img {
              position: absolute;
              top: 9px;
            }
            .itemfont {
              margin-left: 30px;
              margin-right: 120px;
              font-size: 14px;
              overflow: hidden;
            }
            .time {
              position: absolute;
              top: 0;
              width: 100px;
              right: 0;
            }
          }
        }
      }
    }
    .zhanwei {
      width: 100%;
      position: relative;
      height: 50px;
    }
    .footer {
      background: #d5ecfa;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
  }

</style>
