/**
 * Created by Aaron on 2017/12/26.
 */
//登录主页;
import loginmain from '@/pages/login/login-main';
//登录
import login from '@/pages/login/login';
//注册
import register from '@/pages/login/register';
//修改密码
import change from '@/pages/login/change';

export default [
  {
    path: '/loginmain',
    name: 'loginmain',
    component: loginmain,
    children:[
      {
        path: 'login',
        name: 'login',
        component: login,
      },
      {
        path: 'register',
        name: 'register',
        component: register,
      },
      {
        path: 'change',
        name: 'change',
        component: change,
      },
    ]
  },
]
