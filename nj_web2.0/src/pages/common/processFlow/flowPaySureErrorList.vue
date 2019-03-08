<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_communication.commonFlowUpdate2.errList')}}
        </div>
        <Button type="text" @click="closeSureErrorListModel">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="content-main">
          <Row>
          <Input :placeholder="$t('lang_communication.commonFlowUpdate2.pacemCnameDis')" style="width: 200px" v-model="ppcCompanyscope"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)" >{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click='checkManyCommint' v-if="!(isbtnDisplay=='p_flowst_3')" :disabled="(parseInt(payproRound.slice(0,2))!=parseInt(roundNumber.slice(0,2)))||thisStepState=='p_flowst_3'">{{$t('lang_communication.commonFlowUpdate2.batchConfirm')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable"  @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </div>
    </div>
  </div>
</template>
<script>

  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin,getDataLevelUserLoginNew3 } from '../../../axios/axios'

  export default{
    data() {
      return {
        selectCityType:[],
        isSelect:[],
        submitType:'',
        payerrResperson:'',
        isDisabled:this.tableselected!=[]?true:false,
        id:'',
        index:null,
        tableheight:430,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        roleType: [],
        ppcCompanyscope:'',
        ppcRoleDis:'',
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrCompid'),
            key: 'payerrCompidDis',
             width: 100
          },
          {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrPeriod'),
            key: 'payerrPeriod',
             width: 100
          },
          {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrRound'),
            key: 'payerrRoundDis',
             width: 100
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemimItem'),
            key: 'payerrSalitemDis',
             width: 100
          },

         {
            title: this.$t('lang_payroll.payAccItem.pacemCname'),
            key: 'payerrEmpname',
             width: 100
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemEmpworkno'),
            key: 'payerrWorkno',
            // sortable: true,
             width: 100
          },
          {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrErrortype'),
            key: 'payerrErrortypeDis',
             width: 100
          },
          {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrErrorinfo'),
            key: 'payerrErrorinfo',
             width: 100
          },

           {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrResperson'),
            key: 'payerrRespersonDis',
             width: 100
          },
          {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrDealstatus'),
            key: 'payerrDealstatusDis',
             width: 100
          },
           {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrDealperson'),
            key: 'payerrDealpersonDis',
             width: 100
          },
          {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrDealtime'),
            key: 'payerrDealtime',
             width: 100
            },
          {
            title: this.$t('lang_communication.commonFlowUpdate2.payerrErrorinfo'),
            key: 'payerrErrorinfo',
             width: 100
          },
          {
            title: this.$t('button.opr'),
            key: 'payerrErrorinfo',
            fixed: 'right',
                        width:80,
                        render: (h, params) => {
                            let t=this;
                            console.log(h)
                             console.log(params)
                            return h('div', [
                                // h('Select',{
                                //       props:{
                                //         value: t.data[params.index].eventValue,
                                //     },
                                //     on: {
                                //         'on-change':(event) => {
                                //            t.data[params.index].eventValue=event;
                                //             if(event==1){
                                //                 t.data[params.index].disabled=true
                                //                 t.isSelect[params.index]=true;
                                //                 console.log(t.$refs.selection)
                                //                 t.index=params.index

                                //                 t.submitType='submit'
                                //                 t.payerrResperson=''
                                //                 t.id= params.row.id
                                //             }else{
                                //                 console.log(t.$refs.selection)
                                //                 t.data[params.index].disabled=false
                                //                  t.isSelect[params.index]=false
                                //                   t.index=params.index

                                //                 t.submitType='forward'
                                //                 t.payerrResperson=''
                                //                 t.id= params.row.id
                                //             }
                                //             console.log(t.data[t.index].disabled)
                                //         }
                                //     },
                                //      style:{
                                //          width:'80px',
                                //          margin:'5px',
                                //      }
                                //  },[
                                //     h('Option', {
                                //         props: {
                                //             value: '1',
                                //         }
                                //     }, 'Confirm'),
                                //     h('Option', {
                                //         props: {
                                //             value: '2',
                                //         }
                                //     }, 'Forward')
                                // ]),
                                //  h('Select',{
                                //      props:{
                                //         value:'' ,
                                //         disabled:t.data[t.index].disabled
                                //     },
                                //     attrs:{
                                //         id:params.index
                                //     },
                                //     on: {
                                //         'on-change':(event) => {
                                //              t.payerrResperson=event
                                //         }
                                //     },
                                //      style:{
                                //          width:'80px',
                                //          margin:'0 5px',
                                //      }
                                //  },[
                                //     h('Option', {
                                //         props: {
                                //             value:t.selectCityType[0].paramCode,
                                //         }
                                //     }, t.selectCityType[0].paramInfoName),
                                //     h('Option', {
                                //         props: {
                                //             value:t.selectCityType[1].paramCode,
                                //         }
                                //     }, t.selectCityType[1].paramInfoName),
                                // ]),

                                h('Button', {
                                  style:{
                                    margin:'0 10px'
                                  },
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled:(parseInt(this.payproRound.slice(0,2))!=parseInt(this.roundNumber.slice(0,2))||this.thisStepState=='p_flowst_3')
                                    },
                                    on: {
                                        click: (event) => {
                                            t.id= params.row.id
                                           t.singleCommint();

                                        }
                                    },
                                }, this.$t('button.confirm'))
                            ]);
                        }
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        formDataSubmit:{}
      }
    },
    props:{
        payproPeriod:String,
        payproSalset:String,
        payproRound:String,
        paccStatus:String,
        funId:String,
        openIdUpdate:String,
        roundNumber:String,
        isbtnDisplay:String,
        thisStepState:String
    },
   watch:{
    index(val, oldVal){
    //普通的watch监听
    console.log(val,oldVal)
    }
   },
    computed: {
    },

    components: {

    },
    mounted() {

        this.getData(1)
        this.getSelect()
        console.log(this.roundNumber)
    },
    methods: {
        singleCommint(){
            const t = this
            t.formDataSubmit = {};
            t.formDataSubmit._mt = "payProErrorlist.submit";
            t.formDataSubmit.logType = '查询';
            t.formDataSubmit.data = JSON.stringify({'submitType':'submit','id':t.id});
            t.formDataSubmit.funId= t.funId,
            getDataLevelUserLogin(t.formDataSubmit
            ).then((res) => {
            if (isSuccess(res, t)) {
               console.log(res)
               this.getData(1)
            }
            }).catch(() => {
            this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
            })
            })

        },
        checkManyCommint(){
            const t = this
            if(t.tableselected.length==0){
                t.$Modal.error({
                title: t.$t('reminder.remind'),
                content: this.$t('reminder.leastone'),
              })
            }else{
               t.formDataSubmit = {};
                t.formDataSubmit._mt = "payProErrorlist.batchSubmit";
                t.formDataSubmit.logType = '查询';
                t.formDataSubmit.ids = t.tableselected;
                t.formDataSubmit.funId= t.funId,
                getDataLevelUserLogin(t.formDataSubmit
                ).then((res) => {
                if (isSuccess(res, t)) {
                  console.log(res)
                  t.getData(1)
                }
              }).catch(() => {
              t.$Modal.error({
                  title: t.$t('reminder.err'),
                  content: t.$t('reminder.errormessage'),
              })
            })

            }


        },
        getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'salpsrole',
         }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectCityType = res.data.content[0].value[0].paramList;
            if(t.openIdUpdate=='4-1'){
                t.selectCityType.forEach(function(item,index){
                    if(item.paramCode=="02BP"){
                        t.selectCityType.splice(index,1)
                    }
                })
            }
            if(t.openIdUpdate=='4-2'){
                t.selectCityType.forEach(function(item,index){
                    if(item.paramCode=="03BF"){
                        t.selectCityType.splice(index,1)
                    }
                })
            }
            if(t.openIdUpdate=='4-3'){
                t.selectCityType.forEach(function(item,index){
                    if(item.paramCode=="01PR"){
                        t.selectCityType.splice(index,1)
                    }
                })
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },

      getData(page) {

        const t = this
        if (page) {
          t.page = page
        }
        if(t.openIdUpdate=='4-1'){
            t.payerrResperson='02BP'
        }
        if(t.openIdUpdate=='4-2'){
            t.payerrResperson='03BF'
        }
        if(t.openIdUpdate=='4-3'){
            t.payerrResperson='01PR'
        }
        t.formDataSubmit = {};
          t.formDataSubmit._mt = "payProErrorlist.getPage";
          t.formDataSubmit.logType = '查询';
          t.formDataSubmit.data = JSON.stringify({'payerrPeriod':t.payproPeriod,'payerrSalset':t.payproSalset,'payerrRound':t.roundNumber,'payerrEmpname':t.ppcCompanyscope,'payerrResperson': t.payerrResperson,'payerrDealstatus':'01tobeprocess'});
          t.formDataSubmit.rows = t.rows
          t.formDataSubmit.page = t.page
          t.formDataSubmit.sort = t.sort
          t.formDataSubmit.order = t.order
          t.formDataSubmit.funId= t.funId,
          console.log(t.formDataSubmit.stepId + "111111111111111111111");
          getDataLevelUserLoginNew3(t.formDataSubmit)
            .then(res => {

              if (isSuccess(res, t)) {
                 t.data = res.data.content[0].rows
                 for(let i=0;i<t.data.length;i++){
                     t.data[i].eventValue=''
                     t.data[i].disabled=false;
                     t.isSelect[i]=false;
                 }
                 console.log(t.isSelect)
                 t.total = res.data.content[0].records
              }
            })
            .catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              });
            });
      },

      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr;

       this.tableselected=this.tableselected.join(',')
       console.log(this.tableselected)
      },



     closeSureErrorListModel(){
           const t = this;
            t.$emit("closeSureErrorListModel");

      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .cover .box {
  width: 1200px;
}
  .content-main{
    height: 500px;
    .table-form{
      margin: 10px 0;
    }
  }
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
