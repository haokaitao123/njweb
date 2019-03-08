<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="form" :model="form"  :rules="ruleValidate" :label-width="135" style="height: 450px ;overflow-y: auto;">
        <Row>
          <Col span="23">
          <Row style="margin-bottom: 0;">
            <Col span="10" >
            <FormItem :label="$t('lang_homePage.calendarList.remindStatime')" prop="remindStatime" >
              <DatePicker type="date" v-model="form.remindStatime" :placeholder="$t('lang_homePage.calendarList.remindStatimeDis')" class="width200" ></DatePicker>
            </FormItem>
            </Col>
            <Col span="1" style="text-align: center; margin:0 13px 0 72px; line-height: 30px; color: #999;">——</Col>
            <Col span="8">
            <FormItem prop="remindStatimeHour" style="margin-left:-72px;" >
              <TimePicker type="time" :placeholder="$t('lang_homePage.calendarList.remindHourtimeDis')"  v-model="form.remindStatimeHour" style="width:160px;"></TimePicker>
            </FormItem>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <Row style="margin-bottom: 0;">
            <Col span="10" >
            <FormItem prop="remindStoptime" :label="$t('lang_homePage.calendarList.remindStoptime')">
              <DatePicker type="date" v-model="form.remindStoptime" :placeholder="$t('lang_homePage.calendarList.remindStoptimeDis')" class="width200"></DatePicker>
            </FormItem>
            </Col>
            <Col span="1" style="text-align: center; margin:0 13px 0 72px; line-height: 30px; color: #999;">——</Col>
            <Col span="8">
            <FormItem prop="remindStoptimeHour" style="margin-left:-72px;">
              <TimePicker type="time" :placeholder="$t('lang_homePage.calendarList.remindHourtimeDis')" v-model="form.remindStoptimeHour" style="width:160px;"></TimePicker>
            </FormItem>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row>
          <Col span="10" >
          <FormItem :label="$t('lang_homePage.calendarList.remindType')" prop="remindType" :label-width="135">
            <Select v-model="form.remindType"  :placeholder="$t('lang_homePage.calendarList.remindTypeDis')" :transfer="true">
              <Option :value="item.paramCode" v-for="(item,index) in selectRemindType" key="index">{{item.paramInfoName}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_homePage.calendarList.remindTitle')" prop="remindTitle">
            <Input v-model="form.remindTitle" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_homePage.calendarList.remindTitleDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23" >
          <FormItem :label="$t('lang_homePage.calendarList.remindContent')" prop="remindContent">
            <Input v-model="form.remindContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_homePage.calendarList.remindContentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_homePage.calendarList.remindNote')" prop="remindNote" offset="1">
            <Input v-model="form.remindNote" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_homePage.calendarList.remindNoteDis')"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <Row style="margin-top:20px;">
        <Col span="21" offset="1">
        <Row type="flex" justify="end">
          <Button type="ghost"@click="close" style="margin-right: 5px">{{$t('button.cal')}}</Button>
          <Button type="primary"  v-show="disCalen" @click="handleSubmit">{{$t('button.sav')}}</Button>
        </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import { isSuccess, deepCopy } from '../../lib/util'
  import { getDataLevelUserLoginNew , getDataLevelUserLogin } from '../../axios/axios'
  import valid from '../../lib/pub_valid'

  export default{
    data() {
      const remindStoptimemth = (rule, value, remindStoptimecheck) => {
        if (valid.val_isnull(value)) {
          return remindStoptimecheck()
        }
        return remindStoptimecheck(new Error(rule.message))
      }
      const remindtimemth = (rule, value, remindtimemthcheck) => {
        if (valid.val_isnull(value)) {
          return remindtimemthcheck()
        }
        return remindtimemthcheck(new Error(rule.message))
      }
      return {
        form: {
          _mt: 'cmutRemind.addOrUpd',
          remindType: '',
          remindContent: '',
          remindTitle: '',
          remindStatime: '',
          remindStoptime: '',
          remindStatimeHour: '',
          remindStoptimeHour: '',
          remindNote: '',
          logType: '新增',
        },
        data: [],
        selectRemindType: [],
        total: NaN,
        disCalen: true,
        ruleValidate: {
          remindTitle: [
            { required: true, message: this.$t('lang_homePage.calendarList.remindTitleDis'), trigger: 'blur' },
          ],
          remindType: [
            { required: true, message: this.$t('lang_homePage.calendarList.remindTypeDis'), trigger: 'change' },
          ],
          remindStatime: [
//            { required: true, message: '请选择生效日期', trigger: 'change' },
          ],
          remindStoptime: [
//            { required: true, message: '请选择失效日期', trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        if (this.logType === undefined) {
          this.logType = '查看'
        }
        getDataLevelUserLogin({
          _mt: 'cmutRemind.getById',
          id: id,
          logType: this.logType,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.remindType = res.data.content[0].remindType
            t.form.remindContent = res.data.content[0].remindContent
            t.form.remindTitle = res.data.content[0].remindTitle
            t.form.remindStatime = res.data.content[0].remindStatime
            t.form.remindStoptimeHour = res.data.content[0].remindStoptimeHour
            t.form.remindStatimeHour = res.data.content[0].remindStatimeHour
            t.form.remindStoptime = res.data.content[0].remindStoptime
            t.form.remindNote = res.data.content[0].remindNote
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      close() {
        const t = this
        t.form.remindType = ''
        t.form.remindContent = ''
        t.form.remindTitle = ''
        t.form.remindStatime = ''
        t.form.remindStoptimeHour = ''
        t.form.remindStatimeHour = ''
        t.form.remindStoptime = ''
        t.form.remindNote = ''
        t.$refs.form.resetFields()
        this.$emit('close')
        this.$emit('closeUp')
      },
      dateChange(value) {
        this.date1 = Number(new Date(value).getTime())
      },
      dateChange(value) {
        this.date1 = Number(new Date(value).getTime())
      },
      showDis() {
        this.disCalen = false
      },
      handleSubmit() {
        const t = this
        t.$refs.form.validate((valid) => {
          if (valid) {
            if (t.form.remindStatime !== '') {
              t.form.remindStatime = t.form.remindStatime.format('yyyy-MM-dd')  //  获取发布日期
              if (t.form.remindStatimeHour !== '') {
                t.form.remindStatime = t.form.remindStatime +' ' + t.form.remindStatimeHour
              }
            }
            if (t.form.remindStoptime !== '') {
              t.form.remindStoptime = t.form.remindStoptime.format('yyyy-MM-dd')  //  获取发布日期
              if (t.form.remindStoptimeHour !== '') {
                t.form.remindStoptime = t.form.remindStoptime +' ' + t.form.remindStoptimeHour
              }
            }
            const data = deepCopy(t.form)
            for (const dat in data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            data['remindPlat'] = t.$store.state.user.roleType
            if (t.logType === this.$t('button.upd')) {
              data.id = t.id
            }
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData')
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('updateArray', res.data.content[0])
                }

                t.close()
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'remindtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectRemindType = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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
