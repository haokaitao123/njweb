<template>
  <div class="main">
    <div class="title">
      <Icon type="android-contacts" size="13"></Icon>
      <span style="margin-left: 10px">{{$t('lang_homePage.contentList.title')}}</span>
    </div>
    <div class="message_box">
      <div class="message" v-for="(item,index) in messageData" @click="showPerInfo(item)">
        <div class="right" style="padding-left: 10px;">
          <p>
            <Icon type="person" />{{item.platSerConperson}}</p>
          <p>
            <Icon type="ios-telephone" />{{item.platSerTel}}</p>
          <p>
            <Icon type="email" />
            <a :href="'mailto:'+item.platSerEmail" style="text-decoration:underline">{{item.platSerEmail}}</a>
          </p>
        </div>
      </div>
    </div>
    <div class="footer" @click="linkToMessage()">
      <Icon type="more" size="24" color="#2d8cf0"></Icon>
    </div>
    <Modal v-model="modal1" :title="$t('lang_homePage.contentList.modaTitle')" width="800" class-name="vertical-center-modal">
      <div class="modalDiv">
        <p>
          <Icon type="person" />{{$t('lang_homePage.contentList.platSerConperson')}}： {{platSerConperson}}</p>
        <p>
          <Icon type="home" />{{$t('lang_homePage.contentList.platSerTeam')}}： {{platSerTeam}}</p>
        <p>
          <Icon type="android-alarm-clock" />{{$t('lang_homePage.contentList.platSerTime')}}： {{platSerTime}}</p>
        <p>
          <Icon type="ios-pulse-strong" />{{$t('lang_homePage.contentList.platSerRange')}}： {{platSerRange}}</p>
        <p>
          <Icon type="android-share-alt" />{{$t('lang_homePage.contentList.platSerLevelName')}}： {{platSerLevelName}}</p>
        <p>
          <Icon type="ios-telephone" />{{$t('lang_homePage.contentList.platSerTel')}}： {{platSerTel}}</p>
        <p>
          <Icon type="email" />{{$t('lang_homePage.contentList.platSerEmail')}}：
          <a :href="'mailto:'+platSerEmail" style="text-decoration:underline">{{platSerEmail}}</a>
        </p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click=" modal1 = false">{{$t('button.clo')}}</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" :title="$t('lang_homePage.contentList.modaTitle')" width="800" class-name="vertical-center-modal">
      <div :style="{height:divheight + 'px',overflow:'auto'}">
        <div v-for="(item,index) in listData" class="cardDiv">
          <Card>
            <div class="modalDiv">
              <p>
                <Icon type="person" />{{$t('lang_homePage.contentList.platSerConperson')}}： {{item.platSerConperson}}</p>
              <p>
                <Icon type="home" />{{$t('lang_homePage.contentList.platSerTeam')}}： {{item.platSerTeam}}</p>
              <p>
                <Icon type="android-alarm-clock" />{{$t('lang_homePage.contentList.platSerTime')}}： {{item.platSerTime}}</p>
              <p>
                <Icon type="ios-pulse-strong" />{{$t('lang_homePage.contentList.platSerRange')}}： {{item.platSerRange}}</p>
              <p>
                <Icon type="android-share-alt" />{{$t('lang_homePage.contentList.platSerLevelName')}}： {{item.platSerLevelName}}</p>
              <p>
                <Icon type="ios-telephone" />{{$t('lang_homePage.contentList.platSerTel')}}： {{item.platSerTel}}</p>
              <p>
                <Icon type="email" />{{$t('lang_homePage.contentList.platSerEmail')}}：
                <a :href="'mailto:'+item.platSerEmail" style="text-decoration:underline">{{item.platSerEmail}}</a>
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div slot="footer">
        <div style="display: flex;justify-content: space-between;">
          <span>
            <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
          </span>
          <span>
            <Button type="primary" @click="modal2 = false">{{$t('button.clo')}}</Button>
          </span>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin2,
    getDataLevelUserLoginSenior
  } from '../../axios/axios'
  import {
    isSuccess
  } from '../../lib/util'

  export default {
    data() {
      return {
        platSerConperson: '',
        platSerTeam: '',
        platSerTime: '',
        platSerRange: '',
        platSerLevelName: '',
        platSerTel: '',
        platSerEmail: '',
        messageData: [],
        listData: [],
        modal1: false,
        modal2: false,
        divheight: document.body.offsetHeight - 280,
        total: NaN,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
      }
    },
    computed: {

    },
    components: {},
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt: 'platBusirel.getList',
          funId: 1,
          logType: '查询消息',
          sort: 'id',
          order: 'desc',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].value) {
              if (res.data.content[0].value.length <= 3) {
                t.messageData = res.data.content[0].value
              } else {
                for (let i = 0; i < 3; i++) {
                  t.messageData.push(res.data.content[0].value[i])
                }
              }
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      showPerInfo(item) {
        const t = this
        t.modal1 = true
        t.platSerConperson = item.platSerConperson
        t.platSerTeam = item.platSerTeam
        t.platSerTime = item.platSerTime
        t.platSerRange = item.platSerRange
        t.platSerLevelName = item.platSerLevelName
        t.platSerTel = item.platSerTel
        t.platSerEmail = item.platSerEmail
      },
      linkToMessage() {
        const t = this
        t.modal2 = true
        t.getListData()
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getListData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getListData()
      },
      getListData() {
        const t = this
        const tData = {}
        const data = {
          _mt: 'platBusirel.getPage',
          funId: 1,
          logType: '查询联系人',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          data: JSON.stringify(tData),
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].rows) {
              t.listData = res.data.content[0].rows
              t.total = res.data.content[0].records
            }
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
  .main {
    width: 100%;
    .title {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid #ddd;
    }
    .message_box {
      width: 100%;
      .message {
        height: 80px;
        display: flex;
        cursor: pointer;
        transition: all .3s;
        border-bottom: 1px solid #ddd;
        .left {
          font-size: 12px;
          line-height: 20px;
          padding: 10px;
          width: 30px;
        }
        .right {
          width: 100%;
          line-height: 20px;
          padding: 10px;
          .mess {
            height: 20px;
          }
        }
      }
    }
    .message:hover {
      background-color: rgba(100, 100, 100, .1);
    }
    .footer {
      padding: 0 10px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      transition: all .3s;
      height: 40px;
    }
    .footer:hover {
      background-color: rgba(100, 100, 100, .1);
    }
  }

  .right p .ivu-icon {
    margin-right: 10px;
    color: #5cadff;
  }

  .right p {
    font-size: 13px;
  }

  .modalDiv p {
    margin-bottom: 10px;
    margin-left: 20px;
    font-size: 15px;
    color: #808080;
  }

  .modalDiv p .ivu-icon {
    color: #5cadff;
    margin-right: 5px;
    font-size: 16px;
  }

  .cardDiv .ivu-card {
    margin-bottom: 10px;
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    /*.ivu-modal{
            top: 0;
        }*/
  }

  a:hover {
    font-weight: bold;
  }

</style>
