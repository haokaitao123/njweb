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
      <Form ref="formValidate" class="tab-box" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="13">
          <Row>
            <Col span="24">
            <FormItem :label="$t('lang_user.rootuser.mobileNo')" prop="mobileNo" >
              <Input v-model="formValidate.mobileNo" :placeholder="$t('lang_user.rootuser.pmobileNo')" :disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem :label="$t('lang_user.rootuser.name')" prop="name" >
              <Input v-model="formValidate.name" :placeholder="$t('lang_user.rootuser.pname')":disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem :label="$t('lang_user.rootuser.idType')" prop="idType">
              <Select v-model="formValidate.idType"  :placeholder="$t('lang_user.rootuser.ppidType')" :disabled="this.formValidate.status !=='01draft' ? true : false">
                <Option :value="item.paramCode" v-for="(item,index) in idtypes" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24" >
            <FormItem :label="$t('lang_user.rootuser.idNo')" prop="idNo" @blur="hah()">
              <Input v-model="formValidate.idNo"  :placeholder="$t('lang_user.rootuser.pidNo')":disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem :label="$t('lang_user.rootuser.birthDate')" prop="birthDate">
              <DatePicker type="date" :placeholder="$t('lang_user.rootuser.pbirthDate')" :editable="false" v-model="formValidate.birthDate" style="width: 100%"
                          :disabled="this.formValidate.status !=='01draft' ? true : false"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24" >
            <FormItem :label="$t('lang_user.rootuser.genderDesc')" prop="gender">
              <Select v-model="formValidate.gender"  :placeholder="$t('lang_user.rootuser.pgender')" :disabled="this.formValidate.status !=='01draft' ? true : false">
                <Option :value="item.paramCode" v-for="(item,index) in selectSex" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem  :label="$t('lang_user.rootuser.email')" prop="email" >
              <Input v-model="formValidate.email" :placeholder="$t('lang_user.rootuser.pemail')" :disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
            </FormItem>
            </Col>
          </Row>
          </Col>
          <Col span="6" offset="1">
            <div class="header-box">
              <div class="header-cover" v-if="this.formValidate.status !=='01draft' ? true : false">
                {{$t('lang_user.rootuser.pcropedImg')}}
              </div>
              <div class="header-cover" @click="render1"  v-else="this.formValidate.status !=='01draft' ? true : false">
                {{$t('lang_user.rootuser.pcropedImg')}}
              </div>
              <div class="header">
                <img :src="cropedImg===''?'../../../static/img/header1.png':cropedImg" width="150" height="150">
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem  :label="$t('lang_user.rootuser.memo')" prop="memo">
            <Input v-model="formValidate.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_user.rootuser.pmemo')"
                   :disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
          </FormItem>
          </Col>
        </Row>
        <!--<Row>-->
          <!--<Col span="23">-->
          <!--<Row type="flex" justify="end">-->
            <!--<FormItem>-->
            <!---->
            <!--</FormItem>-->
          <!--</Row>-->
          <!--</Col>-->
        <!--</Row>-->
      </Form>
      <div class="tab-btn">
        <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
        <Button type="primary" @click="handleSubmit" v-show="this.formValidate.status ==='01draft' ? true : false">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadimage } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import valid from '../../../lib/pub_valid'
  import imgEdit from '../../../components/imgUpdate/imgEdit'

  export default {
    data() {
      const idnocheck = (rule, value, caaaaa) => {
        if (this.formValidate.idType === '01id') {
          if (valid.val_IdCard(value)) {
            return caaaaa()
          }
          return caaaaa(new Error(rule.message))
        }
        return caaaaa()
      }
      const phonecheck = (rule, value, calphonecheck) => {
          if (valid.val_mobile(value)) {
            return calphonecheck()
          }
          return calphonecheck(new Error(rule.message))
      }
      const mailcheck = (rule, value, mailphonecheck) => {
          if (valid.val_mail2(value)) {
            return mailphonecheck()
          }
          return mailphonecheck(new Error(rule.message))
      }
      return {
        value: '',
        httpImg: '',
        cropedImg: '',
        selectSex: [],
        idtypes: [],
        selectState: [],
        updateImg: false,
        formValidate: {
          _mt: 'userMgmt.addOrModifyUser',
          funId: '1',
          mobileNo: '',
          name: '',
          email: '',
          idType: '',
          idNo: '',
          gender: '',
          status: '01draft',
          birthDate: '',
          memo: '',
          pictureDis: '',
        },
        imgPack: {},
        ruleValidate: {
          mobileNo: [
            { required: true, message: this.$t('lang_user.rootuser.pmobileNo'), trigger: 'blur' },
            { validator: phonecheck, message: this.$t('lang_user.rootuser.cpmobileNo'), trigger: 'blur' },
          ],
          status: [
            { required: true, message: this.$t('lang_user.rootuser.cstatusDesc'), trigger: 'blur' },
          ],
          name: [
            { required: true, message: this.$t('lang_user.rootuser.pname'), trigger: 'blur' },
          ],
          idType: [
            { required: true, message: this.$t('lang_user.rootuser.ppidType'), trigger: 'blur' },
          ],
          birthDate: [
            { required: true, type: 'date', message: this.$t('lang_user.rootuser.pbirthDate'), trigger: 'change' },
//            { required: true, message: '请填写生日', trigger: 'blur' },
          ],
          idNo: [
            { required: true, message: this.$t('lang_user.rootuser.pidNo'), trigger: 'blur' },
            { validator: idnocheck, message: this.$t('lang_user.rootuser.cidNo'), trigger: 'change' },

          ],
          email: [
            { required: true, message: this.$t('lang_user.rootuser.pemail'), trigger: 'blur' },
            { validator: mailcheck, message: this.$t('lang_user.rootuser.cemail'), trigger: 'blur' },
          ],
          gender: [
            { required: true, message: this.$t('lang_user.rootuser.pgender'), trigger: 'blur' },
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
    created() {
      this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'userMgmt.getuserbyid',
          id: id,
          purpose: '0',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.mobileNo = res.data.content[0].mobileNo
            t.formValidate.name = res.data.content[0].name
            t.formValidate.email = res.data.content[0].email
            t.formValidate.idNo = res.data.content[0].idNo
            t.formValidate.idType = res.data.content[0].idType
            t.formValidate.gender = res.data.content[0].gender
            t.formValidate.status = res.data.content[0].status
            t.formValidate.birthDate = res.data.content[0].birthDate
            t.formValidate.memo = res.data.content[0].memo
            if (res.data.content[0].picture) {
              const a = res.data.content[0].pictureShrink.split(',')
              t.cropedImg = t.httpImg + a[1]
            }
          }
        }).catch(() => {
          this.$Modal.error({
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'gender,pubstatus,idtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectSex = res.data.content[0].value[0].paramList
            t.selectState = res.data.content[0].value[1].paramList
            t.idtypes = res.data.content[0].value[2].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      render1() {
        const t = this
        this.$Modal.confirm({
          onOk: () => {
            t.imgPack.handlecrop1()
            // base64转图片的方法
            const arr = t.imgPack.option1.cropedImg.split(',')
            const mime = arr[0].match(/:(.*?);/)[1]
            const bstr = atob(arr[1])
            let n = bstr.length
            const u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            const obj = new Blob([u8arr], { type: mime })
            // base64转图片的方法
            const formData = new FormData()
            formData.append('upfile', obj, Date.parse(new Date()) + '.png')
            console.log(formData)
            uploadimage(formData).then((res) => {
              if (res) {
                for (const key in res.data) {
                  t.cropedImg = t.httpImg + res.data[key]
                  t.formValidate.pictureDis = key + ',' + res.data[key]
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          },
          render: (h) => {
            return h(imgEdit, {
              props: {
                value: this.value,
              },
              attrs: {
                id: 'imgEdit',
                ref: 'imgEdit',
              },
              on: {
                ok: (self) => {
                  t.imgPack = self
                },
              },

            })
          },
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        console.log(data)
        if (data.birthDate !== undefined) {
          data.birthDate = data.birthDate === '' ? '' : new Date(data.birthDate).format('yyyy-MM-dd')
        }
        console.log(data)
        this.$refs.formValidate.validate((valid1) => {
          if (valid1) {
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
      handleReset() {
        this.$emit('closeUp')
      },
    },
    watch: {

    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .header-box{
    display: flex;
    position: relative;
    justify-content: flex-end;
  }
  .tab-box{
    overflow-y: auto;
    height: 370px;
  }
  .header-cover{
    display: none;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: rgba(0,0,0,.3);
  }
  .header-box:hover .header-cover{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-box:hover {
    cursor: pointer;
  }
  .header{
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .tab-btn{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    height: 50px;
  }
</style>
