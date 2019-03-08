<template>
  <i-col class="col" span="12">
    <card :bordered="false">
      <p slot="title" class="title"><Icon type="hammer"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.tools.title')}}</span></p>
      <div class="tools shorter">
        <div class="fast_item">
          <div class="item_icon" style="border:1px solid #53bc93">
            <div style="border-radius: 50%;transition:all .3s;height:100%;width:100%;line-height: 60px;text-align: center;">
              <Icon type="ios-calculator" color="#53bc93" size="26"></Icon>
            </div>
          </div>
          <div class="item_title">
            {{$t('lang_homePage.tools.TaxCal')}}
          </div>
        </div>
        <div class="fast_item">
          <div class="item_icon" style="border:1px solid #f55471">
            <div style="border-radius: 50%;transition:all .3s;height:100%;width:100%;line-height: 60px;text-align: center;">
              <Icon type="ios-home" color="#f55471" size="26"></Icon>
            </div>
          </div>
          <div class="item_title">
            {{$t('lang_homePage.tools.SocPolicy')}}
          </div>
        </div>
        <div class="fast_item">
          <div class="item_icon" style="border:1px solid #ff9d0a">
            <div style="border-radius: 50%;transition:all .3s;height:100%;width:100%;line-height: 60px;text-align: center;">
              <Icon type="ios-paper" color="#ff9d0a" size="26"></Icon>
            </div>
          </div>
          <div class="item_title">
            {{$t('lang_homePage.tools.OprBook')}}
          </div>
        </div>
        <div class="fast_item">
          <div class="item_icon" style="border:1px solid #41b3f9">
            <div style="border-radius: 50%;transition:all .3s;height:100%;width:100%;line-height: 60px;text-align: center;">
              <Icon type="android-attach" color="#41b3f9" size="26"></Icon>
            </div>
          </div>
          <div class="item_title">
            {{$t('lang_homePage.tools.mostLink')}}
          </div>
        </div>
      </div>
    </card>
  </i-col>
</template>
<style lang="scss" scoped>
  .tools{
    width: 100%;
    display: flex;
    font-size: 12px;
  .fast_item{
    width: 19%;
    margin-right: 1%;
    cursor: pointer;
    transition: all .3s;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  .item_icon{
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  .item_title{
    height: 20px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  }
  .fast_item:hover .item_icon div{
    background-color: rgba(255,255,255,.3);
  }
  }
  .shorter{
    height: 150px;
  }
</style>
