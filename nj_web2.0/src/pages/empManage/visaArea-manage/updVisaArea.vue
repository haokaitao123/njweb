<template>
  <div class="option-main">
    <Row>
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="110">
        <i-col span="11">
          <FormItem label="目的国" prop="areaContry">
            <span @dblclick="dbCountry">
               <Input v-model="form.areaContryDis" icon="search" :readonly="true" placeholder="请选择目的国"  @on-click="selectCountry"/>
          </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="领区" prop="areaDistrict">
            <Select v-model="form.areaDistrict" clearable placeholder="请选择领区" >
              <Option :value="item.paramCode"  v-for="(item,index) in Visaarea" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem label="受理区域范围" prop="areaScope">
            <Input v-model="form.areaScope" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入受理区域范围"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="生效日期" prop="areaTimesta">
            <DatePicker type="date" placeholder="请选择生效日期" :editable="false" v-model="form.areaTimesta" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="失效日期">
            <DatePicker type="date" placeholder="请选择失效日期" :editable="false" v-model="form.areaTimestop" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem label="备注">
            <Input v-model="form.areaComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <transition name="fade">
      <searchCountry v-show="openCountry" @closeCountry="closeCountry"  @inputCountry="inputCountry" ref="searchCountry"></searchCountry>
    </transition>
  </div>
</template>
<script>
  import searchCountry from '../../../components/searchTable/searchCountry'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        openCountry: false,
        form: {},
        ruleValidate: {
          areaContry: [
            { required: true, message: '请选择目的国', trigger: 'change' },
          ],
          areaDistrict: [
            { required: true, message: '请选择领区', trigger: 'change' },
          ],
          areaScope: [
            { required: true, message: '请输入受理区域范围', trigger: 'blur' },
          ],
          areaTimesta: [
            { required: true, type: 'date', message: '请选择生效日期', trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      Visaarea: Array,
    },
    components: {
      searchCountry,
    },
    mounted() {
    },
    methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'actiontype,emptype,idtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Actiontype = res.data.content[0].value[0].paramList
            t.Emptype = res.data.content[0].value[1].paramList
            t.Idtype = res.data.content[0].value[2].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data._mt = 'visaArea.addOrUpd'
        data.funId = '1'
        data.logType = t.logType
        data.id = t.id
        if (data.areaTimesta !== undefined) {
          data.areaTimesta = data.areaTimesta === '' ? '':new Date(data.areaTimesta).format('yyyy-MM-dd')
        }
        if (data.areaTimestop !== undefined) {
          data.areaTimestop = data.areaTimestop === '' ? '' : new Date(data.areaTimestop).format('yyyy-MM-dd')
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.id) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('newdata', res.data.content[0])
                }
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
      clear() {
        const t = this
        t.areaContryDis = ''
        t.form = {}
        this.$refs.form.resetFields()
      },
      //  	选择国家
      selectCountry() {
        const t = this
        t.$refs.searchCountry.getData()
        t.openCountry = true
      },
      closeCountry() {
        const t = this
        t.$refs.searchCountry.countryCname = ''
        t.openCountry = false
      },
      inputCountry(name, id) {
        const t = this
        t.form.areaContryDis = name
        t.form.areaContry = id
      },
      dbCountry() {
        const t = this
        t.form.areaContryDis = ''
        t.form.areaContry = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
.option-main{
  position: relative;
  height: 500px;
  .btn{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>

