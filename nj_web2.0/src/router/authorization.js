/**
 * Created by Aaron on 2018/1/2.
 */
//角色管理
import authRole from '@/pages/authorization/authRole/authRole'
//系统功能
import sysFunctions from '@/pages/authorization/sysFunctions/sysFunctions'
//root用户信息管理
import sysUserinfo from '@/pages/authorization/sysUserinfo/sysUserinfo'
//角色组管理
import authRoleGroup from '@/pages/authorization/authRoleGroup/authRoleGroup'
//用户管理
import authUserinfo from '@/pages/authorization/authUserinfo/authUserinfo'
//用户普通角色管理
import plainAuthRole from '@/pages/authorization/plainAuthRole/plainAuthRole'
//用户普通角色组管理
import plainAuthRoleGroup from '@/pages/authorization/plainAuthRoleGroup/plainAuthRoleGroup'
//用户普通角色组管理
import plainUserinfo from '@/pages/authorization/plainUserinfo/plainUserinfo'
//用户普通角色组管理
import sysLog from '@/pages/authorization/sysLog/sysLog'
//ESS角色管理
import essAuthRole from '@/pages/authorization/essAuthRole/essAuthRole'
//ESS角色组
import essAuthRoleGroup from '@/pages/authorization/essAuthRoleGroup/essAuthRoleGroup'
//ESS用户
import essUserinfo from '@/pages/authorization/essUserinfo/essUserinfo'
//待办事项配置
import authTododefine from '@/pages/authorization/authTododefine/authTododefine'
//调查结果查询
import resultQuery from '@/pages/authorization/resultQuery/resultQuery'

export default [
  {
    path: 'authRole',
    name: 'authRole',
    component: authRole,
  },
  {
    path: 'sysFunctions',
    name: 'sysFunctions',
    component: sysFunctions,
  },
  {
    path: 'sysUserinfo',
    name: 'sysUserinfo',
    component: sysUserinfo,
  },
  {
    path: 'authRoleGroup',
    name: 'authRoleGroup',
    component: authRoleGroup,
  },
  {
    path: 'authUserinfo',
    name: 'authUserinfo',
    component: authUserinfo,
  },
  {
    path: 'plainAuthRole',
    name: 'plainAuthRole',
    component: plainAuthRole,
  },
  {
    path: 'plainAuthRoleGroup',
    name: 'plainAuthRoleGroup',
    component: plainAuthRoleGroup,
  },
  {
    path: 'plainUserinfo',
    name: 'plainUserinfo',
    component: plainUserinfo,
  },
  {
    path: 'sysLog',
    name: 'sysLog',
    component: sysLog,
  },
  {
  	path: 'essAuthRole',
  	name: 'essAuthRole',
  	component: essAuthRole,
  },
  {
  	path: 'essAuthRoleGroup',
  	name: 'essAuthRoleGroup',
  	component: essAuthRoleGroup,
  },
  {
  	path: 'essUserinfo',
  	name: 'essUserinfo',
  	component: essUserinfo,
  },
  {
  	path: 'authTododefine',
  	name: 'authTododefine',
  	component: authTododefine,
  },
  {
  	path: 'resultQuery',
  	name: 'resultQuery',
  	component: resultQuery,
  },
]
