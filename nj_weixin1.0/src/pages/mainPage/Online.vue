<!--在线咨询-->
<template>
  <div class="online">
    <div class="middle">
      <div class="middle_all">
        <div class="middle_list">
          <div class="middle_time">HR助理{{OnlineTime}}</div>
          <div class="middle_One">嗨，我是机器人小仁~您可以告诉小仁您的问题，我会尽全力解答哦~~~</div>
          <div class="middle_avatar">
            <img src="../../../static/action/tb_05.png" alt="">
          </div>
        </div>
        <div v-for="item in allOnline">
          <div class="middle_list" v-if="item.val == 0">
            <div class="middle_time">{{item.name}}{{item.time}}</div>
            <!--item.chatUrl-->
            <div class="middle_One">{{item.content}}<span href="###" @click="BtnDetail(item.chatUrl)">{{item.chatUrlContent}}</span></div>
            <div class="middle_avatar">
              <img src="../../../static/action/tb_05.png" alt="">
            </div>
          </div>
          <div class="middle_list1" v-else-if="item.val == 1">
            <div class="middle_time">{{item.name}}{{item.time}}</div>
            <div class="middle_One1">{{item.content}}</div>
            <div class="middle_avatar1" v-if="item.val == 1">
              <img :src="httpImg + $store.state.InfoList.empphotouploadbigicon.split(',')[1]" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fotter">
      <div>
        <!--<textarea  v-model="ipt"  name="usrtxt" cols="1" rows="1" placeholder='   请输入您要咨询的问题' wrap="hard"></textarea>-->
        <input type="text" v-model="ipt" placeholder='   请输入您要咨询的问题'   >
        <!--<div class="textarea" contenteditable="true"></div>-->
      </div>
      <div>
        <transition name="fade">
          <button @click="Btn" ref="BtnColor" :class="{BtnColor : this.ipt != ''}">发送</button>
        </transition>
      </div>
    </div>
    <div class="allMsgMsk" v-if="this.$store.state.Main.childFlag">
      <div class="close">
        <img src="../../../static/action/cha.png" alt=""  @click="closeDetail">
      </div>
      <div class="otherMsk">
        <router-view/>
      </div>

    </div>
  </div>
</template>
<script>
  import moment from 'moment'// 格式化时间
  export default {
    name: 'Online',
    data() {
      return {
        httpImg: '',
        allOnline: [],
        OnlineTime: [],
        currentsession: localStorage.getItem('bus_userid') + '_' + pubsource.webSocketDevice,
        ipt: '',
      }
    },
    mounted() {
      this.OnlineTime = moment().format('YYYY-MM-DD HH:mm:ss')
      this.initIM()
      if (this.$store.state.Main.allOnline_save.length > 10) {
        let hh = this.$store.state.Main.allOnline_save.splice(-6)
        for(let i = 0; i < hh.length; i++) {
          this.allOnline.push(hh[i])
        }
      } else {
        let hh = this.$store.state.Main.allOnline_save
        for(let i = 0; i < hh.length; i++) {
          this.allOnline.push(hh[i])
        }
      }
    },
    created() {
      this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
      closeDetail() {
        this.$store.commit('Main/setChildFlag',false)
        this.$router.push({
          path:'/mains/Online'
        })
      },
      BtnDetail(http) {
        var hh = http.split("/")
        var routerResult = hh[3]
        this.$store.commit('Main/setChildFlag',true)
        this.$router.push({
          path:'/mains/Online/' + routerResult
        })
        console.log(routerResult);
      },
      Btn() {
        if (this.ipt.length > 0) {
          let Obj = {}
          Obj['content'] = this.ipt
          Obj['val'] = 1
          Obj['time'] = moment().format('YYYY-MM-DD HH:mm:ss')
          Obj['name'] = localStorage.getItem('bus_empCname')
          this.allOnline.push(Obj)
          this.$store.state.Main.allOnline_save = this.allOnline
          this.sendMsg(this.ipt)
          this.ipt = ''
        } else {
          layer.msg("请输入要发送的消息!");
        }
      },
      sendMsg(msg) {
        let message = new proto.Model()
        let content = new proto.MessageBody()
        message.setMsgtype(4)
        message.setCmd(5)
        message.setToken(this.currentsession)
        message.setSender(this.currentsession)
        message.setDeviceid(pubsource.webSocketDevice)
        content.setContent(msg)
        content.setType(0)
        message.setReceiver("0");//机器人ID默认为0
        message.setContent(content.serializeBinary())
//        console.log(proto.Model.deserializeBinary(message.serializeBinary()), 'bytes')
        socket.send(message.serializeBinary())
      },
      ReplaceUrl(text) {
        var re = /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
        var name = text
        var reg = /[\u4e00-\u9fa5]/g;
        var names = name.match(reg);
        var s = text.replace(re, function (a) {
          return '<a href="' + a + '" target=_blank>' + names.join("") + '</a>';
        });
        return s
      },
      initIM() {
        const t = this
        // *******************从这开始打开聊天面板*****************************
        layui.use('layim', function (layim) {

          let initEventHandle = function () {
            //收到消息后
            socket.onmessage = function (event) {
//              console.log(event)
              if (event.data instanceof ArrayBuffer) {
//                console.log(event.data)
                let msg = proto.Model.deserializeBinary(event.data);      //如果后端发送的是二进制帧（protobuf）会收到前面定义的类型
//                console.log(msg.getCmd())
//                console.log(msg,'这里是收到的消息1')
                let msgCon = proto.MessageBody.deserializeBinary(msg.getContent());
//                console.log(msgCon,'这里是收到的消息2')
                if (msg.getCmd() == 2) {
                  //发送心跳回应
                  let message1 = new proto.Model();
                  message1.setCmd(2);
                  message1.setMsgtype(4);
                  message1.setDeviceid(pubsource.webSocketDevice)
                  socket.send(message1.serializeBinary());
                } else if (msg.getCmd() == 5) {
//                  console.log(msg,'这里是收到的消息1')
//                  console.log(msg.getSender())
//                  let msgCon111 = proto.MessageBody.deserializeBinary(msg.getContent());
//                  console.log(msgCon111.getContent())
                  //显示非自身消息
                  if (msg.getSender() != this.currentsession) {
                    //不显示用户组消息
                    if (msg.getGroupid() == null || msg.getGroupid().length < 1) {
                      let msgCon = proto.MessageBody.deserializeBinary(msg.getContent());
//                      console.log(msg.getSender())
//                      console.log(msg.getTimestamp())
                      console.log(msgCon.getContent())
                      if (msgCon.getContent().indexOf('[wxurl]') === -1 ) {
                        var chatTitle = msgCon.getContent()
                        let Obj = {}
                        Obj['content'] = chatTitle;
                        Obj['val'] = 0
                        Obj['time'] = msg.getTimestamp()
                        Obj['name'] = 'HR助理'
                        t.allOnline.push(Obj)
                        t.$store.state.Main.allOnline_save = t.allOnline
                      } else {
                        var chatTitle = msgCon.getContent().split('[wxurl]')[0]
                        var chatUrl = msgCon.getContent().split('[wxurl]')[1].split('[/wxurl]')[0]
                        var chatUrlContent = msgCon.getContent().split('[wxurl]')[1].split('[/wxurl]')[1]
                        let Obj = {}
                        Obj['content'] = chatTitle;
                        Obj['chatUrl'] = chatUrl;
                        Obj['chatUrlContent'] = chatUrlContent;
                        Obj['val'] = 0
                        Obj['time'] = msg.getTimestamp()
                        Obj['name'] = 'HR助理'
                        t.allOnline.push(Obj)
                        t.$store.state.Main.allOnline_save = t.allOnline
                      }
                    }
                  }
                }
              } else {
                let data = event.data;                //后端返回的是文本帧时触发
              }
            };
            //连接后
            socket.onopen = function (event) {
              let message = new proto.Model();
              let browser = BrowserUtil.info();
              message.setVersion("1.0");
              message.setDeviceid(pubsource.webSocketDevice)
              message.setCmd(1);
              message.setSender(t.currentsession);
              message.setMsgtype(1);
              message.setFlag(1);
              message.setPlatform(browser.name);
              message.setPlatformversion(browser.version);
              message.setToken(this.currentsession);
              let bytes = message.serializeBinary();
              socket.send(bytes);
            };
            //连接关闭
            socket.onclose = function (event) {
//              console.info(event)
              layim.setFriendStatus(this.currentsession, 'offline');
//              if (this.status()) {
              layer.confirm('您已下线，重新上线?', function (index) {
                reconnect(websocketurl, initEventHandle);
                layer.close(index);
              });
//              }
            };
            socket.onerror = function () {
              reconnect(websocketurl, initEventHandle);
            };
          }

          //-----------------socket链接-------------------
          //创建连接
          setTimeout(() => {
            createWebSocket(websocketurl, initEventHandle)
          }, 0)
        })

      },
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .online {
    width: 100%;
    height: 100%;
    position: relative;
    .allMsgMsk{
      position: fixed;
      top:0;
      left: 0;
      background: white;
      height: 100%;
      width: 100%;
      z-index: 200;
      .close{
        width:100%;
        height:80px;
        z-index: 500;
        text-align: right;
        line-height: 80px;
        padding-right: 20px;
        box-sizing: border-box;
        background: rgba(0,0,0,0.5);
        img{
          width:40px;
          height:40px;
        }
      }
      .otherMsk{
        height: calc(100% - 80px);
        overflow-y: scroll;
      }
    }
    .middle {
      width: 100%;
      height: calc(100% - 200px);
      overflow-y: scroll;
      background: #f5f5f5;
      .middle_all {
        width: 100%;
        padding-top: 20px;
        .middle_list {
          /*border:2px solid #efefef;*/
          font-size: 34px;
          position: relative;
          width: 100%;
          padding-left: 120px;
          margin-bottom: 20px;
          box-sizing: border-box;
          .middle_time {
            font-size: 28px;
            color: #999;
          }
          .middle_avatar {
            position: absolute;
            width: 80px;
            height: 80px;
            top: 0;
            left: 10px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .middle_One {
            /*min-width: 20%;*/
            padding: 10px 10px 10px 30px;
            background: #fff;
            position: relative;
            border-radius: 5px;
            max-width: 80%;
            word-wrap: break-word;
            word-break: normal;
            display: inline-block;
            span{
              color: #ff4081;
            }
          }
          .middle_One:after {
            content: '';
            position: absolute;
            left: -30px;
            top: 13px;
            width: 0;
            height: 0;
            border-style: solid dashed dashed;
            border-color: #fff transparent transparent;
            overflow: hidden;
            border-width: 30px;
          }
        }
        .middle_list1 {
          /*border:2px solid #efefef;*/
          font-size: 34px;
          margin-right: 25px;
          position: relative;
          width: 100%;
          padding: 0 120px 0 50px;
          margin-bottom: 20px;
          overflow: hidden;
          box-sizing: border-box;
          .middle_time {
            font-size: 28px;
            color: #999;
            text-align: right;
          }
          .middle_avatar1 {
            position: absolute;
            width: 80px;
            height: 80px;
            top: 0;
            right: 10px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .middle_One1 {
            padding: 10px 30px 10px 10px;
            background: #9EEA6A;
            position: relative;
            border-radius: 5px;
            word-wrap: break-word;
            word-break: normal;
            max-width: 80%;
            display: inline-block;
            float: right;
          }
          .middle_One1:after {
            content: '';
            position: absolute;
            right: -30px;
            top: 13px;
            width: 0;
            height: 0;
            border-style: solid dashed dashed;
            border-color: #9EEA6A transparent transparent;
            overflow: hidden;
            border-width: 30px;
          }
        }
      }
    }
    .fotter {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      background: #f3f3f3;
      padding-left: 40px;
      padding-right: 40px;
      line-height: 100px;
      div:nth-of-type(1) {
        line-height: 100px;
        input {
          border: 0;
          width: 540px;
          outline: none;
          font-size: 28px;
          height: 60px;
        }
        .textarea{
          width: 400px;
          min-height: 20px;
          max-height: 300px;
          _height: 120px;
          margin-left: auto;
          margin-right: auto;
          padding: 3px;
          outline: 0;
          border: 1px solid #a0b3d6;
          font-size: 12px;
          line-height: 24px;
          word-wrap: break-word;
          overflow-x: hidden;
          overflow-y: auto;

          border-color: rgba(82, 168, 236, 0.8);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
        }
      }
      div:nth-of-type(2) {
        line-height: 100px;
        text-align: center;
        button {
          width: 100px;
          background: #757575;
          border-radius: 10px;
          color: white;
          outline: none;
          border: 0;
          line-height: 60px;
          font-size: 28px;
        }
        .BtnColor{
          background: #9EEA6A;
        }
      }
    }
  }
</style>
