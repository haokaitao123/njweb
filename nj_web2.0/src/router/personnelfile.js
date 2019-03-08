/*
 * Created by Erdong on 2018/10/14.
 */

//档案分类管理
import fileClassification from '@/pages/personFileManage/fileClassification/fileClassification'
//档案室管理
import archiveRoom from '@/pages/personFileManage/archiveRoom/archiveRoom'
//档案柜管理
import fileCabinet from '@/pages/personFileManage/fileCabinet/fileCabinet'
//档案查询管理
import fileQuery from '@/pages/personFileManage/fileQuery/fileQuery'

export default[{
		path: 'fileClassification',
	    name: 'fileClassification',
	    component: fileClassification
	},{
		path: 'archiveRoom',
	    name: 'archiveRoom',
	    component: archiveRoom
	},{
		path: 'fileCabinet',
	    name: 'fileCabinet',
	    component: fileCabinet
	},{
		path: 'fileQuery',
	    name: 'fileQuery',
	    component: fileQuery
	}]
