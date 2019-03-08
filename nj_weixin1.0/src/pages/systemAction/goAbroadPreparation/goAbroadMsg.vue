<!--一条为一行-->
<template>
  <div>
    <!--<data value="" v-for="item in dataList">-->
      <div class="message">
        <div>
          <span>公司</span>
          <span>{{dataList.passCompDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>部门</span>
          <span>{{dataList.passDeptDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>岗位</span>
          <span>{{dataList.passPostDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>证件类型</span>
          <span>{{dataList.passIdtypeDis}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>证件号码</span>
          <span>{{dataList.passIdno}}</span>
        </div>

      </div>
      <div class="message">
        <div>
          <span>工作城市</span>
          <span>{{dataList.passCityDis}}</span>
        </div>

      </div>
      <!--<div class="message">-->
        <!--<div>-->
          <!--<span>是否已有护照</span>-->
          <!--<span>{{item.passIdno}}</span>-->
        <!--</div>-->

      <!--</div>-->
      <div class="message1">
        <div>
          <span>是否已有护照</span>
          <span class="messRadio">
            <!--@change="orderRadio"-->
            <mt-radio
              v-model="value"
              :options=this.options
            >
          </mt-radio>
          </span>
        </div>
      </div>
      <div class="message" v-if="this.value === '1'">
        <div>
          <span>护照签发领区</span>
          <span>{{dataList.passAreaDis}}</span>
        </div>

      </div>
      <div class="message" v-if="this.value === '1'" >
        <div>
          <span>护照号码</span>
          <span>{{dataList.passNumber}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>职责</span>
          <span>{{dataList.passObligation}}</span>
        </div>
      </div>
    <!--</data>-->
  </div>
</template>

<script>
  export default {
    name: "goAbroadMsg",
    data() {
      return{
        options:[
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ],
        value:this.dataList.passHaspass
      }
    },
    mounted() {
      setTimeout(() => {
        this.value = this.dataList.passHaspass
      },500)

    },
    props:{
      dataList:Object,
    },
  }
</script>

<style scoped type="text/less" lang="less">
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
  .message1{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    padding: 45px 35px  26px 32px;
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;

    }
  }

</style>
