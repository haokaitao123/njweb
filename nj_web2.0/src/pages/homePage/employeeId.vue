<template>
  <i-col class="col" span="8">
    <card :bordered="false">
      <p slot="title" class="title"><Icon type="ios-briefcase"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.workno.title')}}</span></p>
      <a href="#" slot="extra">
        <Icon type="more"></Icon>
      </a>
      <div class="block short">
        <div class="data_block" style="background-color: #f7fcff;">
          <div class="data_title">
            {{$t('lang_homePage.workno.empIdnum')}}
          </div>
          <div class="data_content">
            <div style="background-image: url('../../../static/homeImg/DQRS.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
            <div>{{empIdnum}}</div>
          </div>
        </div>
        <div class="data_block" style="background-color: #f6fcf3;">
          <div class="data_title">
            {{$t('lang_homePage.workno.postIdnum')}}
          </div>
          <div class="data_content">
            <div style="background-image: url('../../../static/homeImg/00.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
            <div>{{postIdnum}}</div>
          </div>
        </div>
      </div>
    </card>
  </i-col>
</template>
<script>
  import { isSuccess, deepCopy } from '../../lib/util'
  import { getDataLevelUserLogin } from '../../axios/axios'

  export default{
    data() {
      return {
        empIdnum: '',
        postIdnum: '',
      }
    },
    mounted() {
      this.getDate()
    },
    methods: {
      getDate() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'ansrptStatistics.Nostatistics',
        }).then((res) => {
          if (isSuccess(res, t)) {
            const result = res.data.content[0].value
            t.empIdnum = result.split(',')[0]
            t.postIdnum = result.split(',')[1]
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .short{
    height: 220px;
  }
  .data_block{
    height: 100px;
    padding: 0 10px;
    width: 100%;
    /*margin-right: 1%;*/
  .data_title{
    height: 40px;
    font-weight: bold;
    line-height: 40px;
  }
  .data_content{
    display: flex;
    font-size: 36px;
    line-height: 60px;
    justify-content: space-between;
  }
  }
</style>
