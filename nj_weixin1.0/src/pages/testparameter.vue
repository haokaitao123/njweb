<template>
  <div>
    <h1>This is a test params</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ param1 }}</h1>
    <h1>{{ param2 }}</h1>
    <h1>{{ paramcode }}</h1>
    <mu-button color="primary" @click="getNoteCode">Get Verify Code</mu-button>
    <img :src="validcode"/>

    <mu-button color="primary" @click="testCallback">Test Callback</mu-button>

    <mu-dialog :open.sync="dialog" title="提示">
      {{dialogMsg}}
      <mu-button slot="actions" color="primary" @click="dialogClose">确定</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        param1: '',
        param2: '',
        paramcode: '',
        validcode:'',
        dialog: false,
        dialogMsg: ''
      }
    },
    created() {
      this.param1 = this.$route.query.param1
      this.param2 = this.$route.query.param2
      this.paramcode = this.$route.query.code
    },
    methods: {
      getNoteCode() {
        const t = this
        let params = {
          _mt: "verifycode.requestCaptcha",
          clientId: pubsource.clientId,
          clientPass: pubsource.clientPass,
          clientIp: "127.0.0.1"
        }
        getDataLevelNone(params).then((res) => {
          if (isSuccess(res, t)) {
            let rtndata = res.data.content[0]
//            console.info(rtndata)
            t.validcode = rtndata.imgUrl

//            t.dialog = true
//            t.dialogMsg = t.validcode
          }
        }).catch((res) => {
          t.dialog = true
          t.dialogMsg = res.data.stat.stateList[0].desc
        })
      },
      testCallback() {
        const t = this
        let params = {
          _mt: "wxMsgCallback.recMsgTS",
          msg_signature: "bcf8fba1da2aa2941a6bc7dd2209be1976030744",
          timestamp: "1535609146",
          nonce: "PoFPktxXdSFzUtFI",
          echostr: "qW3QJIrsc1PI0cRFUEa5msl19BsIaC9pt2sW3qLmXJMukTJF6WWgaW4RCZBu6hQIt3URdqbR3aB97Btq1aTQYg=="
        }
        getDataLevelNone(params).then((res) => {
          if (isSuccess(res, t)) {
            let rtndata = res.data.content[0]
            t.dialog = true
            t.dialogMsg = rtndata.value
          }
        }).catch((res) => {
          t.dialog = true
          t.dialogMsg = res.data.stat.stateList[0].desc
        })
      },
      dialogClose() {
        this.dialog = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
