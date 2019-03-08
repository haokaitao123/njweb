<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
        <i-col span="11">
        <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyNo')"  prop="sihfpcyNo">
          <Input v-model="form.sihfpcyNo" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyNo')" ></Input>
        </FormItem>
      </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyCn')" prop="sihfpcyCn">
            <Input v-model="form.sihfpcyCn" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyCnDis')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyEn')" prop="sihfpcyEn">
            <Input v-model="form.sihfpcyEn" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyEnDis')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyAreaName')" prop="sihfpcyArea">
            <span @dblclick="clearCityid">
              <Input v-model="sihfpcyAreaName" icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyAreaNameDis')" style="width: 200px" @on-click="pickData" />
            </span>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyRegisterpropertyName')" prop="sihfpcyRegisterproperty" >
            <CheckboxGroup v-model="form.sihfpcyRegisterproperty">
              <Checkbox :label="item.paramCode" v-for="(item,index) in selectLayoutMode" :key="index"><span>{{item.paramInfoCn}}</span></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyScopedesc')" prop="sihfpcyScopedesc">
            <Input v-model="form.sihfpcyScopedesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyScopedescDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
        <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyNewdate')" prop="sihfpcyNewdate">
          <Select v-model="form.sihfpcyNewdate" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyNewdateDis')">
            <Option :value="item" v-for="(item,index) in selectDay" :key="index">{{item}}</Option>
          </Select>
        </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyCutdate')" prop="sihfpcyCutdate">
            <Select v-model="form.sihfpcyCutdate" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyCutdateDis')">
              <Option :value="item" v-for="(item,index) in selectDay" :key="index">{{item}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcySdate')" prop="sihfpcySdate">
            <DatePicker type="date" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcySdateDis')" :editable="false" v-model="form.sihfpcySdate" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11"  offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyEdate')" prop="sihfpcyEdate">
            <DatePicker type="date" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyEdateDis')" :editable="false" v-model="form.sihfpcyEdate" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcySamebaseName')" prop="sihfpcySamebase">
            <RadioGroup v-model="form.sihfpcySamebase" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcySamebaseNameDis')">
              <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23">
        <FormItem :label="$t('lang_sihfPolicy.sihtPolicy.sihfpcyComment')" prop="sihfpcyComment">
          <Input v-model="form.sihfpcyComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyCommentDis')"></Input>
        </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <transition name="fade">
      <searchCity v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchCity"></searchCity>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchCity from '../../../components/searchTable/searchCity'

  export default {
    data() {
      return {
        selectLayoutMode: [],
        selectDay: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        selectYesNo: [],
        form: {
          _mt: 'sihfPolicy.addOrUpd',
          funId: '1',
          sihfpcyNo: '',
          sihfpcyType: '01social',
          sihfpcyCn: '',
          sihfpcyEn: '',
          sihfpcyArea: '',
          sihfpcyRegisterproperty: [],
          sihfpcyScopedesc: '',
          sihfpcyNewdate: '',
          sihfpcyCutdate: '',
          sihfpcySamebase: '1',
          sihfpcySdate: '',
          sihfpcyEdate: '',
          sihfpcyComment: '',
        },
        openPick: false,
        sihfpcyAreaName: '',
        params: {
          _mt: 'baseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{"cityIsvalid" : "1"}',
        },
        searchCloumns: [
          {
            title: this.$t('lang_baseManage.baseCity.cityName'),
            key: 'cityName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityTypeName'),
            key: 'cityTypeName',
            sortable: 'custom',
            width: 379,
          },
        ],
        ruleValidate: {
          sihfpcyNo: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyNoDis'), trigger: 'blur' },
          ],
          sihfpcyCn: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyCnDis'), trigger: 'blur' },
          ],
          sihfpcyEn: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyEnDis'), trigger: 'blur' },
          ],
          sihfpcyArea: [
            { required: true, message: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyAreaNameDis'), trigger: 'blur' },
          ],
          sihfpcyRegisterproperty: [
            { required: true, type: 'array', min: 1, message: '至少选择一个户口性质!', trigger: 'blur' },
          ],
          sihfpcySdate: [
            { required: true, type: 'date', message: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcySdateDis'), trigger: 'change' },
          ],
          sihfpcySamebase: [
            { required: true, message: '请选择基数是否相同', trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      searchCity,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getdata() {
        const t = this
        const params = {
          _mt: 'sihfPolicy.getById',
          id: t.$store.state.sihfPo.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sihfpcyNo = res.data.content[0].sihfpcyNo
            this.$store.commit('sihfPo/setSihfpcy', res.data.content[0].sihfpcy) //传递给子表显示,新增时默认显示
            this.form.sihfpcyCn = res.data.content[0].sihfpcyCn
            this.form.sihfpcyEn = res.data.content[0].sihfpcyEn
            this.form.sihfpcyArea = res.data.content[0].sihfpcyArea
            this.sihfpcyAreaName = res.data.content[0].sihfpcyAreaName
            if (res.data.content[0].sihfpcyRegisterproperty === undefined || res.data.content[0].sihfpcyRegisterproperty === '') {
              t.form.sihfpcyRegisterproperty = []
            } else {
              t.form.sihfpcyRegisterproperty = res.data.content[0].sihfpcyRegisterproperty.split(',')
            }
            this.form.sihfpcyScopedesc = res.data.content[0].sihfpcyScopedesc
            this.form.sihfpcyNewdate = res.data.content[0].sihfpcyNewdate
            this.form.sihfpcyCutdate = res.data.content[0].sihfpcyCutdate
            this.form.sihfpcySamebase = res.data.content[0].sihfpcySamebase
            this.form.sihfpcySdate = res.data.content[0].sihfpcySdate
            this.form.sihfpcyEdate = res.data.content[0].sihfpcyEdate
            this.form.sihfpcyComment = res.data.content[0].sihfpcyComment
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      close() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
        t.sihfpcyAreaName = name
        t.form.sihfpcyArea = id
      },
      pickData() {
        const t = this
        t.$refs.searchCity.getData(this.params, '02city\',\'03county')
        t.openPick = true
      },
      clearCityid() {
        const t = this
        t.sihfpcyAreaName = ''
        t.form.sihfpcyArea = ''
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data.sihfpcyRegisterproperty = data.sihfpcyRegisterproperty.toString()
        if (t.$store.state.sihfPo.mainId) {
          data.id = t.$store.state.sihfPo.mainId
        }
        data.logType = t.logType
        if (data.sihfpcySdate !== undefined) {
          data.sihfpcySdate = new Date(data.sihfpcySdate).format('yyyy-MM-dd')
        }
        if (data.sihfpcyEdate !== undefined && data.sihfpcyEdate !== '') {
          data.sihfpcyEdate = new Date(data.sihfpcyEdate).format('yyyy-MM-dd')
        } else {
          data.sihfpcyEdate = ''
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$emit('newdata')
            t.$store.commit('sihfPo/setSihfpcy', res.data.content[0].sihfpcy)
            t.$store.commit('sihfPo/setChildId1', res.data.content[0].id)
            this.form.sihfpcyNo = res.data.content[0].sihfpcyNo
            this.form.sihfpcyCn = res.data.content[0].sihfpcyCn
            this.form.sihfpcyEn = res.data.content[0].sihfpcyEn
            this.form.sihfpcyArea = res.data.content[0].sihfpcyArea
            this.sihfpcyAreaName = res.data.content[0].sihfpcyAreaName
            if (res.data.content[0].sihfpcyRegisterproperty === undefined || res.data.content[0].sihfpcyRegisterproperty === '') {
              t.form.sihfpcyRegisterproperty = []
            } else {
              t.form.sihfpcyRegisterproperty = res.data.content[0].sihfpcyRegisterproperty.split(',')
            }
            this.form.sihfpcyScopedesc = res.data.content[0].sihfpcyScopedesc
            this.form.sihfpcyNewdate = res.data.content[0].sihfpcyNewdate
            this.form.sihfpcyCutdate = res.data.content[0].sihfpcyCutdate
            this.form.sihfpcySamebase = res.data.content[0].sihfpcySamebase
            this.form.sihfpcySdate = res.data.content[0].sihfpcySdate
            this.form.sihfpcyEdate = res.data.content[0].sihfpcyEdate
            this.form.sihfpcyComment = res.data.content[0].sihfpcyComment
            if (t.logType === this.$t('button.add')) {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.addsuccess'),
              })
            } else {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.updsuccess'),
              })
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'registerproperty',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectLayoutMode = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectYesNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        this.form.sihfpcyNo = ''
        this.form.sihfpcyCn = ''
        this.form.sihfpcyEn = ''
        this.form.sihfpcyArea = ''
        this.form.sihfpcyRegisterproperty = ''
        this.form.sihfpcyScopedesc = ''
        this.form.sihfpcyNewdate = ''
        this.form.sihfpcyCutdate = ''
        this.form.sihfpcySamebase = '1'
        this.form.sihfpcySdate = ''
        this.form.sihfpcyEdate = ''
        this.sihfpcyAreaName = ''
        this.form.sihfpcyComment = ''
        this.$store.commit('sihfPo/setSihfpcy', '')
        this.$store.commit('sihfPo/setChildId1', '')
        this.$store.commit('sihfPo/setMainId', '')
        this.$refs.form.resetFields()
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
