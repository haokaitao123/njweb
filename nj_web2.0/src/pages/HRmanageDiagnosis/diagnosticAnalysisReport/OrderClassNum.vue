<!---->
<template>
  <div style="width: 100%;">
    <div id="OrderClassNum" ref="OrderClassNum" style="width: 90%;height: 450px;margin:auto"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  export default {
    name: 'responsibleTask',
    data() {
      return {
        dataNum: {},
        cmutKntypeDescNum: [],
        cmutKntypeNameNum: [],
        cmutKntypeNameNumSubString: [],
        ObjectNum: [],
      }
    },
    mounted () {
      // this.getData(10)
    },
    methods: {
      getData(id) {
        const t = this
       let resId=id
        getDataLevelUserLogin({
          _mt: 'evaluationResult.analysisChart4',
          logType: '按照工单大类统计工单数量Num',
          resId:resId,
          resType: '01eval',
        }).then((res) => {
          if (isSuccess(res, t)) {
             t.ObjectNum = []
                t.dataNum= []
            if(res.data.content[0].value!=''&&res.data.content[0].value!=undefined){
                let value=eval('('+res.data.content[0].value+')')

                t.ObjectNum = value.indicator
                t.dataNum= value.value
                t.getEchatsColumnNum(t.ObjectNum,t.dataNum)
            }

          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumnNum(ObjectNum,dataNum) {
        let echats3 = this.$echarts.init(document.getElementById('OrderClassNum'))
        echats3.setOption({
			    // title: {
			    //   text: '工单大类统计'
			    // },
          tooltip: {},
          grid:{
            left:10,
            right:10,
          },
			    legend: {
			        // data: ['预算分配（Allocated Budget）']
			    },
			    radar: {
			        // shape: 'circle',
			        name: {
			            textStyle: {
			                color: '#fff',
			                backgroundColor: '#999',
                      borderRadius: 3,
                      width:50,
			                // padding: [3, 5]
			           }
			        },
			        indicator:ObjectNum ,
               center: ['50%', '55%'],
              //  startAngle: 90,
              //  splitNumber: 4,
			    },
			    series: [{
			        // name: '预算 ',
			        type: 'radar',
			        // areaStyle: {normal: {}},
			        data : [
			            {
			                value :dataNum,
			                // name : '预算分配（Allocated Budget）'
			            },

			        ]
			    }]
    		})
      },
    },
  }
</script>

