//提醒页面
import empmasterManage from '@/pages/remind/employee/empmasterManage'
import empEntryConManage from '@/pages/remind/employee/empEntryConManage'
import empRefundManage from '@/pages/remind/refund/empRefund'
//import depRemManage from '@/pages/remind/employee/depRemManage'
export default [
    {
        path: 'empmasterManage',
        name: 'empmasterManage',
        component: empmasterManage,
    }, 
    {
        path: 'empEntryConManage',
        name: 'empEntryConManage',
        component: empEntryConManage,
    },
    {
        path: 'empRefundManage',
        name: 'empRefundManage',
        component: empRefundManage,
    },  
    // {
    //     path: 'depRemManage',
    //     name: 'depRemManage',
    //     component: depRemManage,
    // }, 

]
