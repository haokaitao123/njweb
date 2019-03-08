//自动回复数组
var imAutoReplay = [
    '您好，我现在有事不在，一会再和您联系。', 
    '你没发错吧？face[微笑] ',
    '洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！face[哈哈] ',
    '你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。face[心] face[心] face[心] ',
    'face[威武] face[威武] face[威武] face[威武] ',
    '<（@￣︶￣@）>',
    '你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
    'face[黑线]  你慢慢说，别急……',
    '(*^__^*) face[嘻嘻] ，是贤心吗？'
  ];
  
function getLineData(id) { //获取好友在线信息
	$.ajax({  
        type:'post',  
        url:'',  
        data:'',  
        dataType:'json',  
        success:function(res){  
            for (var i=0; i<res.data.length; i++) {
            	if (res.data[i].status === 'offline') { //离线
            		layim.setFriendStatus(res.data[i].id, 'offline'); //设置指定好友在线，即头像置灰
            	}
            	if (res.data[i].status === 'online') { //在线
            		layim.setFriendStatus(res.data[i].id, 'online'); //设置指定好友在线，即头像取消置灰
            	}
            }
        }  
    }); 
}
  
function setONorOFF(id) { //每隔一分钟查看好友在线与离线（id为当前用户的id）
	setInterval(function () {
          getLineData(id);
    }, 60000);
}
