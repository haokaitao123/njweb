<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form :model="form" ref="form" label-position="right" :rules="ruleValidate" :label-width="120">
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPolicyName')" prop="sihfpcy">
              <Input v-model="sihfpcy" :disabled="true" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPolicyNameIns')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsOrder')" prop="sihfpcyinsOrder">
              <Input v-model="form.sihfpcyinsOrder" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsOrderDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsInsName')" prop="sihfpcyinsIns">
              <Select v-model="form.sihfpcyinsIns" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsInsNameDis')">
                <Option :value="item.id" v-for="(item,index) in selectPcyinsIns" :key="index">{{item.sscName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="21" ></i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCbll')" prop="sihfpcyinsCbll">
              <Input v-model="form.sihfpcyinsCbll":placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCbllDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCbul')" prop="sihfpcyinsCbul">
              <Input v-model="form.sihfpcyinsCbul" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCbulDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPbll')" prop="sihfpcyinsPbll">
              <Input v-model="form.sihfpcyinsPbll" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPbllDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPbul')" prop="sihfpcyinsPbul">
              <Input v-model="form.sihfpcyinsPbul" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPbulDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrtypeName')" prop="sihfpcyinsCrtype">
              <Select v-model="form.sihfpcyinsCrtype" @on-change="crChange"  :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrtypeNameDis')">
                <Option :value="item.paramCode" v-for="(item,index) in selectInsratetype" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" v-if="form.sihfpcyinsCrtype === '01fixed'">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCr')" prop="sihfpcyinsCr" >
              <Input v-model="form.sihfpcyinsCr" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCr')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="21"  v-if="form.sihfpcyinsCrtype === '02dynamic'" ></i-col>
          <i-col span="11"  v-if="form.sihfpcyinsCrtype === '02dynamic'">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrll')" prop="sihfpcyinsCrll" >
              <Input v-model="form.sihfpcyinsCrll" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrllDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" v-if="form.sihfpcyinsCrtype === '02dynamic'">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrul')" prop="sihfpcyinsCrul" >
              <Input v-model="form.sihfpcyinsCrul" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrulDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrtypeName')" prop="sihfpcyinsPrtype">
              <Select v-model="form.sihfpcyinsPrtype" @on-change="prChange"   :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrtypeNameDis')">
                <Option :value="item.paramCode" v-for="(item,index) in selectInsratetype" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" v-if="form.sihfpcyinsPrtype === '01fixed'">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPr')" prop="sihfpcyinsPr">
              <Input v-model="form.sihfpcyinsPr" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="21"  v-if="form.sihfpcyinsPrtype === '02dynamic'" ></i-col>
          <i-col span="11" v-if="form.sihfpcyinsPrtype === '02dynamic'">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrll')" prop="sihfpcyinsPrll">
              <Input v-model="form.sihfpcyinsPrll" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrllDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" v-if="form.sihfpcyinsPrtype === '02dynamic'">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrul')" prop="sihfpcyinsPrul">
              <Input v-model="form.sihfpcyinsPrul" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrulDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCall')" prop="sihfpcyinsCall">
              <Input v-model="form.sihfpcyinsCall" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCallDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCaul')" prop="sihfpcyinsCaul">
              <Input v-model="form.sihfpcyinsCaul" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCaulDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPall')" prop="sihfpcyinsPall">
              <Input v-model="form.sihfpcyinsPall" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPallDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPaul')" prop="sihfpcyinsPaul">
              <Input v-model="form.sihfpcyinsPaul" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPaulDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCarullName')" prop="sihfpcyinsCarull">
              <Select v-model="form.sihfpcyinsCarull"   :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCarullNameDis')">
                <Option :value="item.paramCode" v-for="(item,index) in selectDecimalRule" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsParullName')" prop="sihfpcyinsParull">
              <Select v-model="form.sihfpcyinsParull"   :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsParullNameDis')">
                <Option :value="item.paramCode" v-for="(item,index) in selectDecimalRule" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11"  >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCaa')" prop="sihfpcyinsCaa">
              <Input v-model="form.sihfpcyinsCaa" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCaaDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPaa')" prop="sihfpcyinsPaa">
              <Input v-model="form.sihfpcyinsPaa" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPaaDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11"  >
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsFrequency')" prop="sihfpcyinsFrequency">
              <Input v-model="form.sihfpcyinsFrequency" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsFrequencyDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="22">
            <FormItem :label="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsComment')" prop="sihfpcyinsComment">
              <Input v-model="form.sihfpcyinsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCommentDis')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        selectPcyinsIns: [],
        selectInsratetype: [],
        selectDecimalRule: [],
        form: {
          sihfpcyinsPolicyid: '',
          sihfpcyinsOrder: '',
          sihfpcyinsIns: '',
          sihfpcyinsCbll: '',
          sihfpcyinsCbul: '',
          sihfpcyinsPbll: '',
          sihfpcyinsPbul: '',
          sihfpcyinsCrtype: '',
          sihfpcyinsCr: '0',
          sihfpcyinsCrll: '',
          sihfpcyinsCrul: '',
          sihfpcyinsPrtype: '',
          sihfpcyinsPr: '',
          sihfpcyinsPrll: '',
          sihfpcyinsPrul: '',
          sihfpcyinsCall: '',
          sihfpcyinsCaul: '',
          sihfpcyinsPall: '',
          sihfpcyinsPaul: '',
          sihfpcyinsCarull: '',
          sihfpcyinsParull: '',
          sihfpcyinsCaa: '',
          sihfpcyinsPaa: '',
          sihfpcyinsFrequency: '',
          sihfpcyinsComment: '',
        },
        params2: {
          _mt: 'baseSscoverage.getSelectValue',
          funId: '1',
          sscType: '01social',
        },
        ruleValidate: {
          sihfpcyinsIns: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsInsNameDis'), trigger: 'change' },
          ],
          sihfpcyinsOrder: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsOrderDis'), trigger: 'blur' },
          ],
          sihfpcyinsCbll: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCbllDis'), trigger: 'blur' },
          ],
          sihfpcyinsCbul: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCbulDis'), trigger: 'blur' },
          ],
          sihfpcyinsPbll: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPbllDis'), trigger: 'blur' },
          ],
          sihfpcyinsPbul: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPbulDis'), trigger: 'blur' },
          ],
          sihfpcyinsCrtype: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrtypeNameDis'), trigger: 'change' },
          ],
          sihfpcyinsCr: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrDis'), trigger: 'blur' },
          ],
          sihfpcyinsCrll: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrllDis'), trigger: 'blur' },
          ],
          sihfpcyinsCrul: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrulDis'), trigger: 'blur' },
          ],
          sihfpcyinsPrtype: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrtypeNameDis'), trigger: 'change' },
          ],
          sihfpcyinsPr: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrDis'), trigger: 'blur' },
          ],
          sihfpcyinsPrll: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrllDis'), trigger: 'blur' },
          ],
          sihfpcyinsPrul: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrulDis'), trigger: 'blur' },
          ],
          sihfpcyinsCall: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCallDis'), trigger: 'blur' },
          ],
          sihfpcyinsCaul: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCaulDis'), trigger: 'blur' },
          ],
          sihfpcyinsPall: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPallDis'), trigger: 'blur' },
          ],
          sihfpcyinsPaul: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPaulDis'), trigger: 'blur' },
          ],
          sihfpcyinsCarull: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCarullNameDis'), trigger: 'change' },
          ],
          sihfpcyinsParull: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsParullNameDis'), trigger: 'change' },
          ],
          sihfpcyinsCaa: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCaaDis'), trigger: 'blur' },
          ],
          sihfpcyinsPaa: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPaaDis'), trigger: 'blur' },
          ],
          sihfpcyinsFrequency: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsFrequencyDis'), trigger: 'blur' },
          ],
        },
        rowId: '',
      }
    },
    props: {
      id: Number,
      logType: String,
      sihfpcy: String,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      setRowId(id) {
        const t = this
        t.rowId = id
        t.getdata(id)
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'sihfPlcyinsurance.getById',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.sihfpcyinsPolicyName = this.$store.state.sihfPo.sihfpcy
            t.form.sihfpcyinsPolicyid = res.data.content[0].sihfpcyinsPolicyid
            t.form.sihfpcyinsOrder = res.data.content[0].sihfpcyinsOrder
            t.form.sihfpcyinsIns = res.data.content[0].sihfpcyinsIns
            t.form.sihfpcyinsCbll = res.data.content[0].sihfpcyinsCbll
            t.form.sihfpcyinsCbul = res.data.content[0].sihfpcyinsCbul
            t.form.sihfpcyinsPbll = res.data.content[0].sihfpcyinsPbll
            t.form.sihfpcyinsPbul = res.data.content[0].sihfpcyinsPbul
            t.form.sihfpcyinsCrtype = res.data.content[0].sihfpcyinsCrtype
            t.form.sihfpcyinsCr = res.data.content[0].sihfpcyinsCr
            t.form.sihfpcyinsCrll = res.data.content[0].sihfpcyinsCrll
            t.form.sihfpcyinsCrul = res.data.content[0].sihfpcyinsCrul
            t.form.sihfpcyinsPrtype = res.data.content[0].sihfpcyinsPrtype
            t.form.sihfpcyinsPr = res.data.content[0].sihfpcyinsPr
            t.form.sihfpcyinsPrll = res.data.content[0].sihfpcyinsPrll
            t.form.sihfpcyinsPrul = res.data.content[0].sihfpcyinsPrul
            t.form.sihfpcyinsCall = res.data.content[0].sihfpcyinsCall
            t.form.sihfpcyinsCaul = res.data.content[0].sihfpcyinsCaul
            t.form.sihfpcyinsPall = res.data.content[0].sihfpcyinsPall
            t.form.sihfpcyinsPaul = res.data.content[0].sihfpcyinsPaul
            t.form.sihfpcyinsCarull = res.data.content[0].sihfpcyinsCarull
            t.form.sihfpcyinsParull = res.data.content[0].sihfpcyinsParull
            t.form.sihfpcyinsCaa = res.data.content[0].sihfpcyinsCaa
            t.form.sihfpcyinsPaa = res.data.content[0].sihfpcyinsPaa
            t.form.sihfpcyinsFrequency = res.data.content[0].sihfpcyinsFrequency
            t.form.sihfpcyinsComment = res.data.content[0].sihfpcyinsComment
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      crChange(value) {
        const t = this
        if (value === '01fixed') {
          t.form.sihfpcyinsCrll = ''
          t.form.sihfpcyinsCrul = ''
        } else if (value === '02dynamic') {
          t.form.sihfpcyinsCr = ''
        }
      },
      prChange(value) {
        const t = this
        if (value === '01fixed') {
          t.form.sihfpcyinsPrll = ''
          t.form.sihfpcyinsPrul = ''
        } else if (value === '02dynamic') {
          t.form.sihfpcyinsPr = ''
        }
      },
      getSelect() {
        const t = this
        t.params2.logType = '查询选项信息'
        const data = deepCopy(t.params2)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.selectPcyinsIns = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'insratetype,decimalRule',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectInsratetype = res.data.content[0].value[0].paramList
            t.selectDecimalRule = res.data.content[0].value[1].paramList
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
        const params = deepCopy(t.form)
        params._mt = 'sihfPlcyinsurance.addOrUpd'
        params.logType = this.$t('button.add')
        params.sihfpcyinsPolicyid = t.$store.state.sihfPo.childId1
        if (t.logType === this.$t('button.upd')) {
          params.id = t.id
        }
        for (const dat in params) {
          if (t.rowId) {
            params.logType = this.$t('button.upd')
            params.id = t.rowId
          }
        }
        if (params.fypdStartdate !== undefined) {
          params.fypdStartdate = new Date(params.fypdStartdate).format('yyyy-MM-dd')
        }
        if (params.fypdEnddate !== undefined) {
          params.fypdEnddate = new Date(params.fypdEnddate).format('yyyy-MM-dd')
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                t.close()
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.form.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
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
        t.rowId = null
        t.form.sihfpcyinsPolicyid = ''
        t.form.sihfpcyinsOrder = ''
        t.form.sihfpcyinsIns = ''
        t.form.sihfpcyinsCbll = ''
        t.form.sihfpcyinsCbul = ''
        t.form.sihfpcyinsPbll = ''
        t.form.sihfpcyinsPbul = ''
        t.form.sihfpcyinsCrtype = ''
        t.form.sihfpcyinsCr = ''
        t.form.sihfpcyinsCrll = ''
        t.form.sihfpcyinsCrul = ''
        t.form.sihfpcyinsPrtype = ''
        t.form.sihfpcyinsPr = ''
        t.form.sihfpcyinsPrll = ''
        t.form.sihfpcyinsPrul = ''
        t.form.sihfpcyinsCall = ''
        t.form.sihfpcyinsCaul = ''
        t.form.sihfpcyinsPall = ''
        t.form.sihfpcyinsPaul = ''
        t.form.sihfpcyinsCarull = ''
        t.form.sihfpcyinsParull = ''
        t.form.sihfpcyinsCaa = ''
        t.form.sihfpcyinsPaa = ''
        t.form.sihfpcyinsFrequency = ''
        t.form.sihfpcyinsComment = ''
        t.sihfpcyinsPolicyName = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 560px;
    overflow:hidden;
    .content{
      left: 20px;
      right: 20px;
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
