/**
 * Created by ljw on 2018/3/15.
 */
//通知公告管理
import manageInform from '@/pages/manageInform/manageIndex'
//消息通知
import messageNoticeManage from '@/pages/manageInform/message/messageNoticeManage'
//所有已读消息
import readedMessage from '@/pages/manageInform/message/readedMessage'
//已读消息明细
import readedDetail from '@/pages/manageInform/message/readedDetail'
//所有未读消息
import unreadMessage from '@/pages/manageInform/message/unreadMessage'
//未读消息明细
import unreadDetail from '@/pages/manageInform/message/unreadDetail'
export default [
    {
        path: 'manageInform',
        name: 'manageInform',
        component: manageInform,
    },
    {
    	path: '/messageNoticeManage',
    	name: 'messageNoticeManage',
    	component: messageNoticeManage,
//  	children: [
//  		{
//		    	path: 'readedMessage',
//		    	name: 'messageNoticeManage',
//		    	component: readedMessage,
//		    },
//		    {
//		    	path: 'readedDetail',
//		    	name: 'messageNoticeManage',
//		    	component: readedDetail,
//		    },
//		    {
//		    	path: 'unreadMessage',
//		    	name: 'messageNoticeManage',
//		    	component: unreadMessage,
//		    },
//		    {
//		    	path: 'unreadDetail',
//		    	name: 'messageNoticeManage',
//		    	component: unreadDetail,
//		    },
//  	]
    },
]
