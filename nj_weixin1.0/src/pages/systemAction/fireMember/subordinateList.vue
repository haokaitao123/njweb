<!--一条为一行-->
<template>
  <div class="wrap" style="overflow: hidden">
    <div class="EmployeeInformation" v-loading="isLoading" data-mu-loading-overlay-color="white"
         style="position: relative; width: 100%;">
      <ul v-for="item in dataList" @click="detail(item.id)">
        <li class="Li">
          <div class="message">
            <span >{{item.empCname}}</span>
            <span class="last">{{item.empLastname}}{{item.empFirstname}}</span>
            <span class="empNum">{{item.empkiWorkno}}</span>
          </div>
          <div style="height: 20px">

          </div>
        </li>
      </ul>
    </div>
    <noInfo v-show="noInfo"></noInfo>
  </div>
</template>

<script>
  import noInfo from '../../.././components/NoInfo.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "subordinateList",
    data() {
      return {
        title: '选择下属',
        flagImg: true,
        isLoading: true,
        noInfo: false,
        sort: 'id',
        dataList: [],
      }
    },
    props: {
    },
    components: {
      noInfo,
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData(){
        const t = this
        t.isLoading = true
        let params = {
          _mt: "weiXinFireMember.getNoDimissMembers",
          companyId: pubsource.companyId,
          busiId: localStorage.getItem('bus_empid'),
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.dataList = JSON.parse(res.data.content[0].value)
            if (t.dataList.length === 0) {
              t.noInfo = true
            }
            t.isLoading = false
          }
        }).catch((res) =>{
          console.error(res.data.desc)
        })
      },
      detail(id) {
        this.$router.push({
          path:'/fireMemberDetails',
          query:{ id: id, isBase:true}
        })
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../css/common_inform';
  .EmployeeInformation {
    width: 100%;
    height: 100%;
    padding: 40px 54px 48px 30px;
    background: white;
    position: relative;
    margin-bottom: 20px;
    box-sizing: border-box;
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
    }
    .Li{
      position: relative;;
    }
    .empNum{
      position: absolute;
      top:0;
      right:0;
      color: #87807e;
    }
    .last{
      position: absolute;
      top:0;
      left: 140px;
      color: #87807e;
    }
    .first{
      position: absolute;
      top:0;
      left: 250px;
      color: #87807e;
    }
    .message{
      border-bottom: 3px solid #E3E3E3;
      width: 100%;
      div{
        display: flex;
        justify-content: space-between;
        background: #FFFFFF;
        font-size: 30px;
        color: #666666;
        padding: 45px 35px  26px 32px;
      }
    }
  }

</style>
