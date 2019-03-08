<template>
  <i-col class="col" span="8">
    <card :bordered="false">
      <p slot="title" class="title"><Icon type="email-unread"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.sms.title')}}</span></p>
      <a href="#" slot="extra">
        <Icon type="more"></Icon>
      </a>
      <div class="block short">
        <div class="messageBox">
          <div class="title">
            <div style="line-height: 20px;">
              <span style="font-size: 32px;font-weight: bold">{{sum}}</span> {{$t('lang_homePage.sms.tiao')}}
            </div>
            <div>
              {{$t('lang_homePage.sms.failtoday')}}
            </div>
          </div>
          <Progress :percent="popsum" :stroke-width="5" status="normal" hide-info></Progress>
        </div>
        <div class="messageBox">
          <div class="title">
            <div style="line-height: 20px;">
              <span style="font-size: 32px;font-weight: bold">{{success}}</span>{{$t('lang_homePage.sms.tiao')}}
            </div>
            <div>
              {{$t('lang_homePage.sms.failcount')}}
            </div>
          </div>
          <Progress :percent="popsuccess" :stroke-width="5" status="success" hide-info></Progress>
        </div>
        <div class="messageBox">
          <div class="title">
            <div style="line-height: 20px;">
              <span style="font-size: 32px;font-weight: bold">{{failure}}</span>{{$t('lang_homePage.sms.tiao')}}
            </div>
            <div>
              {{$t('lang_homePage.sms.weekcount')}}
            </div>
          </div>
          <Progress :percent="popfailure" :stroke-width="5" status="wrong" hide-info></Progress>
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
        sum: 0,
        success: 0,
        failure: 0,
        popsum: 0,
        popsuccess: 0,
        popfailure: 0,
      }
    },
    mounted() {
      this.getDate()
    },
    methods: {
      getDate() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'ansrptStatistics.Smsstatistics',
        }).then((res) => {
          if (isSuccess(res, t)) {
            const result = res.data.content[0].value
            t.sum = Number(result.split(',')[0])
            t.success = Number(result.split(',')[1])
            t.failure = Number(result.split(',')[2])
            const pop = t.sum + t.success + t.failure
            t.popsum = t.sum / pop * 100
            t.popsuccess = t.success / pop * 100
            t.popfailure = t.failure / pop * 100
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
  .messageBox{
    height: 70px;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 12px;
      height: 52px;
    }
  }
</style>
