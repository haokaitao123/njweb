<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_knowBase.knowlegeType.selectPic')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <row class="table-form" ref="table-form">
        <div class="item_icon" v-for="(item, index) in indexFunImg"  @dblclick="getImgId(item)" >
          <div class="div" :style="'background-image: url(../../../static/indexImg/'+ item +')'" ></div>
        </div>
      </row>
    </div>
  </div>
</template>
<script>
  import { isSuccess, deepCopy } from '../../lib/util'
  import { getDataLevelUserLoginNew , getDataLevelUserLogin } from '../../axios/axios'

  export default{
    data() {
      const funImgs = []
      for (let i = 120; i < 242; i++) {
        if (i < 10) {
          funImgs.push('recr-img-00' + i + '.png')
        } else if (i < 100) {
          funImgs.push('recr-img-0' + i + '.png')
        } else {
          funImgs.push('recr-img-' + i + '.png')
        }
      }
      return {
        data: [],
        indexFunImg: funImgs,
        total: NaN,
        pmtypeCode: '',
        searchText: this.$t('lang_knowBase.knowlegeType.searchText1'),
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      getImgId(imgid) {
        this.$emit('getImgId', imgid)
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/table";
  .short{
    height: 220px;
    display: flex;
    div{
      width: 33%;
      height: 100%;
    }
  }
  .table-form{
    margin-bottom: 10px;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    .item_icon{
      width: 80px;
      height: 80px;
      margin-right: 6px;
      margin-bottom: 10px;
      transition: all .3s;
      cursor: pointer;
      .div{
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
    .item_icon:hover .item_icon .div{
      background-color: rgba(255,255,255,.3);
    }
  }
  .btn-group{
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .background{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox{
      position:relative;
      width: 750px;
      background-color: #fff;
      padding: 60px 20px 30px 20px;
      border-radius: 10px;
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;

        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
</style>
