<!--一条为一行-->
<template>
    <div class="EmployeeInformation">
      <ul v-for="item in dataList" @click="detail(item.id)">
        <li class="Li">
          员工工号：{{item.empdimWorkno}}
          <span v-show="item.Step1State === 'p_flowst_3'" class="dateTime1">已提交</span>
          <span v-show="item.Step1State !== 'p_flowst_3'" class="dateTime2">待提交</span>
        </li>
        <li>
          中文名：{{item.empdimCname}}
          <img @click.stop="deleteByids(item.id)" v-show="item.Step1State !== 'p_flowst_3' && item.Step1State !== undefined && isList"
               src="../../../../static/main/remove.png" class="Imgae" alt="">
        </li>
        <li>
          公司：{{item.empdimCompanyDis}}

        </li>
        <li>
          部   门：{{item.empdimDeptDis}}
        </li>
        <li>
          岗位：{{item.empdimPostDis}}
        </li>
        <li>
          离职类型：{{item.empdimDimtypeDis}}
          <span v-show="item.empdimDimtypeDis === undefined">自愿</span>
        </li>
        <li>
          申请日期：{{item.empdimApplydate}}
        </li>
        <li class="dateTime3" v-show="item.id !== undefined">
          最后雇佣日期：{{item.empdimLaskemployday}}
        </li>
      </ul>
    </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../.././axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
  import Message from 'muse-ui-message'

  export default {
    name: "dimissionList",
    data() {
      return {
      }
    },
    props: {
      dataList: Array,
      isList: Boolean,
    },
    components: {
    },
    methods: {
      detail(id) {
        if (this.isList) {
          this.$router.push({
            path:'/dimissionDetails',
            query:{ id: id}
          })
        }
      },
      deleteByids(id) {
        const t = this
        let params = {
          _mt: "weiXinFireMember.deleteByIds",
          companyId: pubsource.companyId,
          ids: id
        }
        Message.confirm('确定要删除？', '提示', {
          type: 'warning'
        }).then(({ result }) => {
          if (result) {
            getDataLevelUserLogin(params).then((res) => {
              if (isSuccess(res, t)) {
                Message.alert('删除成功', '成功', {
                  type: 'success',
                  okLabel: '确定'
                }).then(() => {
                  this.dataList.shift()
                });
              }
            }).catch((res) =>{
              Message.alert('网络错误', '错误', {
                type: 'error',
                okLabel: '确定'
              }).then(() => {
              });
            })
          } else {
          }
        });
      }
    },
  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../css/common_inform';
  .EmployeeInformation {
    width: 100%;
    background: white;
    position: relative;
    margin-bottom: 20px;
    box-sizing: border-box;
    height: calc(100% - 90px);
    overflow: scroll;
    ul{
      padding: 40px 54px 0px 30px;
      border-bottom: 20px solid #F2F2F2;
    }
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
      .Imgae{
        width:40px;
        float: right;
      }
    }
    .Li{
      position: relative;;
    }
    .dateTime1{
      position: absolute;
      top:0;
      right:0;
      color: #84DC76;
    }
    .dateTime2{
      position: absolute;
      top:0;
      right:0;
      color: #ff0000;
    }
    .dateTime3{
      color: #e69138;
    }
    .dateColor {
      color: #FF850E;
      margin-bottom: 0;
    }
    .state {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #F44336;
      font-size: 28px;
    }
  }
</style>
