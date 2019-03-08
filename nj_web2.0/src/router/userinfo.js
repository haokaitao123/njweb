/**
 * Created by Aaron on 2018/1/2.
 */
//注册用户信息管理
import userManage from '@/pages/userManage/userinfo/userManage'
import useinfo from '@/pages/useinfo/useinfo'

export default [
  {
    path: 'userManage',
    name: 'userManage',
    component: userManage,
  },
  {
    path: 'useinfo',
    name: 'useinfo',
    component: useinfo,
  },
]
