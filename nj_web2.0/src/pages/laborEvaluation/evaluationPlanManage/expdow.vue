<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_evaluation.evaluation.productionDiagnostics1')}}
        </div>
        <Button type="text" @click="closeExpDow">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Button type="text"  @click="dowFile">{{filename}}</Button>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  export default {
    data() {
      return {
        priToken: '',
        filekey: '',
        filename: '',
        openExpDow: false,
      }
    },
    methods: {
      getData(id) {
        const t = this
        let data = {
          _mt: 'evaluationProinfo.exportDataToExcle',
          logType: '下载文件',
          id: id,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.filename = res.data.content[0].filename;
            t.filekey = res.data.content[0].filekey;
//          t.priToken = res.data.content[0].value;
						t.getPriToken(t.filekey);

          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getPriToken(filekey) {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: this.$t('button.exp'),
          filekey: filekey,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	t.openExpDow = true;
            t.priToken = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      dowFile() {
        let doclink = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filename);
        let link = document.createElement('a');
        link.href = doclink;
        link.download = "downloadfiletemp";
        link.click();
      },
      closeExpDow() {
        const t = this
        this.$emit('closeExpDowMain')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
