
//日原始考勤
import attenCheckinitday from '@/pages/attenManage/attenCheckinitday/attenCheckinitday.vue'
//月修订考勤管理
import attenMonthreviMange from '@/pages/attenManage/attenMonthrevi/attenMonthreviList.vue'

export default [
  {
    path: 'attenCheckinitday',
    name: 'attenCheckinitday',
    component: attenCheckinitday,
  },
  {
    path: 'attenMonthreviMange',
    name: 'attenMonthreviMange',
    component: attenMonthreviMange,
  },
]
