
//日原始考勤
import attenCheckinitday from '@/pages/attenManage/attenCheckinitday/attenCheckinitday.vue'

//日修订考勤
import attenCheckupdday from '@/pages/attenManage/attenCheckupdday/attenCheckupdday.vue'


//月修订考勤管理
import attenMonthreviMange from '@/pages/attenManage/attenMonthrevi/attenMonthreviList.vue'

export default [
  {
    path: 'attenCheckinitday',
    name: 'attenCheckinitday',
    component: attenCheckinitday,
  },
  {
    path: 'attenCheckupdday',
    name: 'attenCheckupdday',
    component: attenCheckupdday,
  },
  {
    path: 'attenMonthreviMange',
    name: 'attenMonthreviMange',
    component: attenMonthreviMange,
  },
]
