<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;登录
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <FormItem label="用户名">
            <Input v-model="formValidate.userIM" placeholder="请输入用户名...">
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="密码">
            <Input v-model="formValidate.passwordIM" placeholder="请输入密码...">
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem style="text-align: right;">
            <Button type="info" @click="loginIM()">登录</Button>
            <Button>注册</Button>
          </FormItem>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../axios/axios'
  import {isSuccess, deepCopy} from '../../lib/util'

  export default {
    data() {
      return {
        initData: {},
        formValidate: {
          userIM: '',
          passwordIM: '',
        },
        currentsession: '',
        ruleValidate: {
//        countryCname: [
//          { required: true, message: this.$t('lang_baseManage.baseCountry.countryCnameDis'), trigger: 'blur' },
//        ],
//        countryEname: [
//          { required: true, message: this.$t('lang_baseManage.baseCountry.countryEnameDis'), trigger: 'blur' },
//        ],
        },
      }
    },
    props: {},
    updated() {

    },
    methods: {
      handleReset() {
        const t = this
        t.$emit('closeIM')
      },
      loginIM() {
        const t = this
        /**********获取本人的信息************/
        getDataLevelUserLogin({
          _mt: 'userMgmt.getuserbyid',
          logType: '查询',
          id: t.$store.state.user.userId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].loginStatus === '0') {
              res.data.content[0].loginStatus = 'hide'
            } else {
              res.data.content[0].loginStatus = 'online'
            }
            // ------我自己的信息-------
            t.initData.mine = {
              username: res.data.content[0].name,
              id: res.data.content[0].id,
              status: res.data.content[0].loginStatus,
              sign: res.data.content[0].imSigns,
              avatar: pubsource.pub_pubf_downlink + res.data.content[0].pictureDis.split(',')[1],
            }
            t.currentsession = res.data.content[0].id + '_' + pubsource.webSocketDevice
            // *******获取好友和群组的信息***********
            getDataLevelUserLogin({
              _mt: 'cmutSupportteam.getTeamAndMembers',
              sort: '',
              order: '',
            }).then((res) => {
              if (isSuccess(res, t)) {
//                console.log(res.data.content[0])
                if (res.data.content[0].value) {

                  t.initData.friend = []
                  t.initData.group = []
                  // ------固定客服------
                  t.initData.friend.push({
                    groupname: 'HR智能助理',
                    id: 1,
                  })
                  t.initData.friend[0].list = []
                  t.initData.friend[0].list.push({
                    username: 'HR智能助理',
                    id: '0',
                    status: 'online',
                    sign: '有任何问题尽管问我吧',
                    avatar: '../../../static/workOrderImg/6.png',
                  })

                  // -------------我的好友和群组信息-------------
                  for (let i = 0; i < res.data.content[0].value.length; i++) {
                    // --------好友组-----------
                    t.initData.friend.push({
                      groupname: res.data.content[0].value[i].cmstTeamname,
                      id: res.data.content[0].value[i].id,
                    })
                    // -------群组---------
                    t.initData.group.push({
                      groupname: res.data.content[0].value[i].cmstTeamname,
                      id: res.data.content[0].value[i].id,
                      avatar: '../../../static/workOrderImg/allotperson.png',
                    })
                    // ---------好友列表------------
                    t.initData.friend[i + 1].list = []
                    for (let j = 0; j < res.data.content[0].value[i].memList.length; j++) {
                      if (res.data.content[0].value[i].memList[j].loginStatus === '0') {
                        res.data.content[0].value[i].memList[j].loginStatus = 'hide'
                      } else {
                        res.data.content[0].value[i].memList[j].loginStatus = 'online'
                      }
                      console.log(res.data.content[0].value[i].memList[j])
                      t.initData.friend[i + 1].list.push({
                        username: res.data.content[0].value[i].memList[j].cmstmUseridDis,
                        id: res.data.content[0].value[i].memList[j].cmstmUserid,
                        status: res.data.content[0].value[i].memList[j].loginStatus,
                        sign: res.data.content[0].value[i].memList[j].imSigns,
                        avatar: pubsource.pub_pubf_downlink + res.data.content[0].value[i].memList[j].picture.split(',')[1],
                      })
                    }
                  }
                  // 信息获取完成再打开主面板
//                  if (layui.layim === undefined) {}
                  if (localStorage.getItem('soket_state') === '1') {
                    t.anOtherinitIM()
                  } else {
                    t.initIM()
                  }
                }
              }
            }).catch((res) => {
              t.$Modal.error({
                title: '错误',
                content: res,
              })
            })
          }
        }).catch((res) => {
          t.$Modal.error({
            title: '错误',
            content: res,
          })
        })
      },
      // 打开面板
      initIM() {
        const t = this
        localStorage.setItem('soket_state', 1)
        let sendMsg = function (msg, receiver, group) {
          let message = new proto.Model()
          let content = new proto.MessageBody()
          message.setMsgtype(4)
          message.setCmd(5)
          message.setGroupid(group)// 系统用户组
          message.setToken(t.currentsession)
          message.setSender(t.currentsession)
          message.setReceiver(receiver)// 好友ID
          message.setDeviceid(pubsource.webSocketDevice)
          content.setContent(msg)
          content.setType(0)
          message.setContent(content.serializeBinary())
          socket.send(message.serializeBinary())
        }

        // *******************从这开始打开聊天面板*****************************
        layui.use('layim', function (layim) {
//          console.log(layim)
          layim.config({ // 基础配置
            title: '我的咨询',
            min: false,
            notice: true,
//			    voice: 'default.mp3', // 放在在./layui/css/modules/layim/voice目录
            copyright: true,
//			    initSkin: '',//初始背景
            skin: [ // 配置背景图
              '../../../static/img/HROCloud_Logo_new.png',
            ],
            msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html', // 消息盒子
            chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html', // 聊天记录
            // 初始化渲染主面板
            init: t.initData,

            members: { // 获取群员
              url: '',
              type: 'get',
            },
            uploadImage: { // 上传图片
              url: pubsource.pub_pubf_uploadlink,
              type: 'post', // 默认post
            },
            uploadFile: { // 上传文件
              url: '', // 接口地址
              type: 'post', // 默认post
            },
          })
          // -------基础配置----------


//				layim.addList({
//				  type: 'friend' //列表类型，只支持friend和group两种
//					  ,avatar: "../../../static/workOrderImg/allotperson.png" //好友头像
//					  ,username: 'HR智能助理' //好友昵称
//					  ,groupid: 1008 //所在的分组id
//					  ,status: 'online'
//					  ,id: "0" //好友id
//					  ,sign: "有什么问题尽管问我把" //好友签名
//			  })
//				layim.setFriendStatus(t.currentsession, 'online');

          // 本地缓存
          let cache = layim.cache()
          // 设置头像颜色
          for (let i = 0; i < cache.base.init.friend.length; i++) {
            for (let j = 0; j < cache.base.init.friend[i].list.length; j++) {
              if (cache.base.init.friend[i].list[j].status === 'hide') {
                layim.setFriendStatus(cache.base.init.friend[i].list[j].id, 'offline') //设置指定好友在线，即头像置灰
              } else {
                layim.setFriendStatus(cache.base.init.friend[i].list[j].id, 'online') //设置指定好友在线，即头像取消置灰
              }
            }
          }

          // ----------------初始化完成----------------------
          layim.on('ready', function (res) { // 现在这种init直接赋值是不执行的，只有设置init初始化url才执行这

          })
          layim.msgbox(2) // 模拟消息盒子

          // 监听聊天窗口的切换
          layim.on('chatChange', function (res) {
            var type = res.data.type
//		    console.log(res)
            if (type === 'friend') {
              // 标注好友状态
              if (res.data.status === 'hide') {
                layim.setChatStatus('<span style="color:#FF5722;">离线</span>')
              } else {
                layim.setChatStatus('<span style="color:#FF5722;">在线</span>');
              }
            } else if (type === 'group') {
              // 系统消息
              layim.getMessage({
                system: true,
                id: res.data.id,
                type: "group",
                content: '群员' + (Math.random() * 100 | 0) + '加入群聊',
              })
            }
          })

          // ----------------监听发送消息----------------------
          layim.on('sendMessage', function (data) {
//            console.log(data)
            let To = data.to
            let my = data.mine
            let message = my.content
//            console.log(message)
            let receiver = To.id + ""
            if (To.type === 'friend') {
              if (To.status === 'online') {
                layim.setChatStatus('<span style="color:#FF5722;">对方正在输入...</span>')
              } else {
                let obj = {
                  username: To.name,
                  avatar: To.avatar,
                  id: To.id,
                  type: To.type,
                  content: '[您好，我现在不在，稍后回复您]',
                }
                layim.getMessage(obj)
              }
            }
            if (window.WebSocket) {
//		    	 alert("window.WebSocket");
              if (socket.readyState == WebSocket.OPEN) {
                //判断是发送好友消息还是群消息
                if (To.type == "friend") {
//                  console.log(message, receiver)
                  sendMsg(message, receiver, null)
                } else {
                  sendMsg(message, null, receiver)
                }
              }
            }
          })

          let initEventHandle = function () {
            //收到消息后
            socket.onmessage = function (event) {
              if (event.data instanceof ArrayBuffer) {
                let msg = proto.Model.deserializeBinary(event.data);      //如果后端发送的是二进制帧（protobuf）会收到前面定义的类型
//                console.log(msg, '这里是收到的消息1')
                let msgCon = proto.MessageBody.deserializeBinary(msg.getContent());
//                console.log(msgCon, '这里是收到的消息2')
                let cache = layui.layim.cache();
                let local = layui.data('layim')[cache.mine.id];
                let username = "", avatar = "", friend = false;
                layui.each(cache.friend, function (index1, item1) {
                  layui.each(item1.list, function (index, item) {
                    if (item.id == msg.getSender()) {
                      username = item.username;
                      avatar = item.avatar;
                      return friend = true;
                    }
                  });
                  if (friend) return true;
                });

                //心跳消息
                if (msg.getCmd() == 2) {
                  //发送心跳回应
                  let message1 = new proto.Model();
                  message1.setCmd(2);
                  message1.setMsgtype(4);
                  message1.setDeviceid(pubsource.webSocketDevice)
                  socket.send(message1.serializeBinary());
                } else if (msg.getCmd() == 3) {
                  //上线
                  if (msg.getSender() != t.currentsession) {
                    layer.msg(username + "上线了！");
                    layim.setFriendStatus(msg.getSender(), 'online');
                  }
                } else if (msg.getCmd() == 4) {
                  //下线
                  if (msg.getSender() != t.currentsession) {
                    layer.msg(username + "已下线！");
                    layim.setFriendStatus(msg.getSender(), 'offline');
                  }
                } else {
                  //显示非自身消息
                  if (msg.getSender() != t.currentsession) {
                    //不显示用户组消息
                    let time = (new Date(msg.getTimestamp())).getTime();
                    if (msg.getGroupid() == null || msg.getGroupid().length < 1) {
                      layim.getMessage({
                        username: username
                        , avatar: avatar + "?" + new Date().getTime()
                        , id: msg.getSender()
                        , type: "friend"
                        , content: msgCon.getContent()
                        , timestamp: time
                      });
                    } else {
                      layim.getMessage({
                        username: username,
                        avatar: avatar + '?' + new Date().getTime(),
                        id: msg.getGroupid(),
                        type: 'group',
                        content: msgCon.getContent(),
                        timestamp: time,
                      })
                    }
                  }
                }
              } else {
                let data = event.data                // 后端返回的是文本帧时触发
              }
            }
            // 连接后
            socket.onopen = function (event) {
              let message = new proto.Model()
              let browser = BrowserUtil.info()
              message.setVersion('1.0')
              message.setDeviceid('')
              message.setCmd(1)
              message.setSender(t.currentsession)
              message.setMsgtype(1)
              message.setFlag(1)
              message.setPlatform(browser.name)
              message.setPlatformversion(browser.version)
              message.setToken(t.currentsession)
              message.setDeviceid(pubsource.webSocketDevice)
              let bytes = message.serializeBinary()
              socket.send(bytes)
            }
            // 连接关闭
            socket.onclose = function (event) {
//              console.log(event)
              layim.setFriendStatus(t.currentsession, 'offline')
              layer.confirm('您已下线，重新上线?', function (index) {
                reconnect(websocketurl, initEventHandle)
                layer.close(index)
              })
            }
            socket.onerror = function () {
              reconnect(websocketurl, initEventHandle);
            }
          }

          // -----------------socket链接-------------------
          // 创建连接
          setTimeout(() => {
            createWebSocket(websocketurl, initEventHandle)
          }, 0)
          //-----------------------------socket连接------------

          cache = layui.layim.cache()
//          console.log(layui.layim.cache())

          // 监听背景皮肤更换
          layim.on('setSkin', function (filename, src) {
//            console.log(filename) //获得文件名，如：1.jpg
//            console.log(src) //获得背景路径，如：http://res.layui.com/layui/src/css/modules/layim/skin/1.jpg
          })

          // 监控签名
          layim.on('sign', function (value) {
            //console.log(value) //获得新的签名
            t.setSign(value)
            //此时，你就可以通过Ajax将新的签名同步到数据库中了。
          })

          // 监控在线状态
          layim.on('online', function (status) {
//            console.log(status) //获得online或者hide

            // 此时，你就可以通过Ajax将这个状态值记录到数据库中了。
            // 服务端接口需自写。
          })
        })
      },
      anOtherinitIM() {
        const t = this
        layui.use('layim', function (layim) {
          layim.config({
            title: '我的咨询',
            min: false,
            notice: true,
            copyright: true,
            skin: [
              '../../../static/img/HROCloud_Logo_new.png',
            ],
            msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html',
            chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html',
            init: t.initData,
            members: {
              url: '',
              type: 'get',
            },
            uploadImage: {
              url: pubsource.pub_pubf_uploadlink,
              type: 'post',
            },
            uploadFile: {
              url: '',
              type: 'post',
            },
          })
        })
      },
      //修改签名
      setSign(value) {
        const t = this
        const data1 = {
          id: t.$store.state.user.userId,
          imSigns: value,
        }
        const data = {
          _mt: 'userMgmt.addOrModifyUser',
          logType: '更改签名',
          data: JSON.stringify(data1),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            layer.msg('签名修改成功', function () {
              //关闭后的操作
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: '错误',
            content: '网络错误',
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";

  .cover {

  .box {
    width: 500px;
  }

  }
</style>
