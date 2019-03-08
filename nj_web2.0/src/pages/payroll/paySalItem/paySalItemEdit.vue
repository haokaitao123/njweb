<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalItem.paysiOrder')" prop="paysiOrder">
            <Input v-model="formValidate.paysiOrder" :placeholder="$t('lang_payroll.paySalItem.paysiOrderDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalItem.paysiCode')" prop="paysiCode">
            <Input v-model="formValidate.paysiCode" :placeholder="$t('lang_payroll.paySalItem.paysiCodeDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalItem.paysiDefaulttypeName')" prop="paysiDefaulttype">
            <Select @on-change="setDataSouType" v-model="formValidate.paysiDefaulttype" :placeholder="$t('lang_payroll.paySalItem.paysiDefaulttypeNameDis')">
              <Option :value="item.paramCode" v-for="(item,index) in selectItemType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalItem.paysiCN')" prop="paysiCN">
            <Input v-model="formValidate.paysiCN" :placeholder="$t('lang_payroll.paySalItem.paysiCNDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalItem.paysiEN')" prop="paysiEN">
            <Input v-model="formValidate.paysiEN" :placeholder="$t('lang_payroll.paySalItem.paysiENDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalItem.paysiIsdefaultssiName')" prop="paysiIsdefaultssi">
            <RadioGroup v-model="formValidate.paysiIsdefaultssi" placeholder="请选择是否确认项目">
              <Radio :label="item.paramCode" v-for="(item,index) in selectIsType" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
            <!--<Select v-model="formValidate.paysiIsdefaultssi"  :placeholder="$t('lang_payroll.paySalItem.paysiIsdefaultssiNameDis')">-->
              <!--<Option :value="item.paramCode" v-for="(item,index) in selectIsType" :key="index">{{item.paramInfoCn}}</Option>-->
            <!--</Select>-->
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalItem.paysiDefaultdtsourceName')" prop="paysiDefaultdtsource">
            <Select v-model="formValidate.paysiDefaultdtsource"  :placeholder="$t('lang_payroll.paySalItem.paysiDefaultdtsourceNameDis')">
              <Option :value="item.paramCode" v-for="(item,index) in TempSourceType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.paySalItem.paysiComment')" prop="paysiComment">
            <Input v-model="formValidate.paysiComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.paySalItem.paysiCommentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        selectItemType: [],
        selectIsType: [],
        SourceType: [],
        TempSourceType: [],
        formValidate: {
          _mt: 'paySalItem.addOrUpd',
          funId: '1',
          paysiOrder: '',
          paysiCode: '',
          paysiDefaulttype: '',
          paysiCN: '',
          paysiEN: '',
          paysiIsdefaultssi: '1',
          paysiDefaultdtsource: '',
          paysiComment: '',
        },
        ruleValidate: {
          paysiOrder: [
            { required: true, message: this.$t('lang_payroll.paySalItem.paysiOrderDis'), trigger: 'blur' },
          ],
          paysiCode: [
            { required: true, message: this.$t('lang_payroll.paySalItem.paysiCodeDis'), trigger: 'blur' },
          ],
          paysiDefaulttype: [
            { required: true, message: this.$t('lang_payroll.paySalItem.paysiDefaulttypeNameDis'), trigger: 'blur' },
          ],
          paysiCN: [
            { required: true, message: this.$t('lang_payroll.paySalItem.paysiCNDis'), trigger: 'blur' },
          ],
          paysiEN: [
            { required: true, message: this.$t('lang_payroll.paySalItem.paysiENDis'), trigger: 'blur' },
          ],
          paysiIsdefaultssi: [
            { required: true, message: this.$t('lang_payroll.paySalItem.paysiIsdefaultssiNameDis'), trigger: 'blur' },
          ],
          paysiDefaultdtsource: [
            { required: true, message: this.$t('lang_payroll.paySalItem.paysiDefaultdtsourceNameDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'paySalItem.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.paysiOrder = res.data.content[0].paysiOrder
            t.formValidate.paysiCode = res.data.content[0].paysiCode
            t.formValidate.paysiDefaulttype = res.data.content[0].paysiDefaulttype
            t.formValidate.paysiCN = res.data.content[0].paysiCN
            t.formValidate.paysiEN = res.data.content[0].paysiEN
            t.formValidate.paysiIsdefaultssi = res.data.content[0].paysiIsdefaultssi
            t.formValidate.paysiDefaultdtsource = res.data.content[0].paysiDefaultdtsource
            t.formValidate.paysiComment = res.data.content[0].paysiComment
            t.setDataSouType(t.formValidate.paysiDefaulttype)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      setDataSouType(itemType) {
        const t = this
        t.TempSourceType = []
        switch (itemType) {
          case '00fixedproject':
            t.TempSourceType[0] = t.SourceType[0]
            break
          case '01sysperiodic':
            t.TempSourceType[0] = t.SourceType[1]
            t.TempSourceType[1] = t.SourceType[2]
            t.TempSourceType[2] = t.SourceType[4]
            break
          case '02sysaperiodic':
            t.TempSourceType[0] = t.SourceType[3]
            t.TempSourceType[1] = t.SourceType[4]
            break
          case '03userperiodic':
            t.TempSourceType[0] = t.SourceType[1]
            t.TempSourceType[1] = t.SourceType[4]
            break
          case '04useraperiodic':
            t.TempSourceType[0] = t.SourceType[3]
            t.TempSourceType[1] = t.SourceType[4]
            break
          default:
            break
        }
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
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
              this.$Modal.error({
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
          typeCode: 'payroll_itemtype,yesno,saldtsource',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectItemType = res.data.content[0].value[0].paramList
            t.selectIsType = res.data.content[0].value[1].paramList
            t.SourceType = res.data.content[0].value[2].paramList
            t.TempSourceType = res.data.content[0].value[2].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.formValidate.paysiIsdefaultssi = '1'
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
