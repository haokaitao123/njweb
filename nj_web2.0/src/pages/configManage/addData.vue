<template>
  <div class="cover">
    <div class="box" style="min-width: 900px; height:600px;">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          {{$t('button.add')}}
          <span v-if="stepQue">{{$t('lang_role.suvadmin.stepQue')}}</span>
          <span v-if="stepClass">{{$t('lang_role.suvadmin.stepClass')}}</span>
          <span v-if="stepVary">{{$t('lang_role.suvadmin.stepVary')}}</span>
          <span v-if="stepAns">{{$t('lang_role.suvadmin.stepAns')}}</span>
        </div>
        <Button type="text" @click="reset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <!-- 新增部分 -->
      <div style="height:460px; overflow-y: auto;">
        <!-- 新增第一步，选择样式 -->
        <div v-show="choseType">
          <div class="title-text">{{$t('lang_role.suvadmin.divstyle')}}<span style="color:red;">{{$t('lang_role.suvadmin.divstyle2')}}</span></div>
          <!-- 五项图片选择 -->
          <div class="content">
            <div class="imgList">
              <div v-for="(item,index) in imgList" :key="index" class="imgs">
                <img :src="item.img" @click="bigImg(index)">
                <RadioGroup class="radios" v-model="platSuvStyle" @on-change="getType">
                  <Radio :label="item.id" :disabled="radioFlag">{{item.paramInfoName}}</Radio>
                </RadioGroup>
              </div>
            </div>
            <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
              <div class="prev" @click.stop="prev">
                <Icon type="android-arrow-back" color="#ffffff" size="50"></Icon>
              </div>
              <div class="showImg">
                <img class="bigImg" :src="showImg[num].img">
              </div>
              <div @click.stop="next" class="next">
                <Icon type="android-arrow-forward" color="#ffffff" size="50"></Icon>
              </div>
            </div>
          </div>
          <!-- 五项图片选择 -->
        </div>
        <!-- 新增第二步，新增填写信息-->
        <stepTwo v-if="stepTwoPage" ref="stepTwo" :suvid="suvid" :styleTitle="styleTitle" :styleCode="styleCode"
                 :researchMes="researchMes"></stepTwo>
        <!-- 第三步 之 调查问题-->
        <stepThreeQue v-if="stepQue" :suvid="suvid" :ansType="ansType" :platQusCatid="platQusCatid"
                      :styleCode="styleCode"></stepThreeQue>
        <!-- 第三步 之 调查分类信息-->
        <stepThreeClass v-if="stepClass" :suvid="suvid" :platQusCatid="platQusCatid" :styleCode="styleCode"
                        @getClassid="getClassid($event)"></stepThreeClass>
        <!-- 第三步 之 调查表变量-->
        <stepThreeVary v-if="stepVary" :suvid="suvid" :styleCode="styleCode"></stepThreeVary>
        <!-- 第三步 之 调查答案信息-->
        <stepThreeAns v-if="stepAns" :suvid="suvid" :styleCode="styleCode"></stepThreeAns>
      </div>
      <!-- 新增部分 结束-->
      <Row style="margin-top:20px;">
        <Col span="23">
        <Row type="flex" justify="end">
          <Button type="primary" @click="preStep" v-show="!choseType" class="margin20">{{$t('lang_role.suvadmin.choseType')}}</Button>
          <Button type="primary" @click="nextStep" class="margin20" v-if="showNext">{{$t('lang_role.suvadmin.showNext')}}</Button>
          <Button type="primary" @click="reset" class="margin20" v-else>{{$t('lang_role.suvadmin.reset')}}</Button>
          <Button type="ghost" @click="reset">{{$t('button.cal')}}</Button>
        </Row>
        </Col>
      </Row>
    </div>
    <transition name="fade">
      <!-- 展示页面 -->
      <browseType ref="browseType" v-if="showBrowse" :num="num"></browseType>
    </transition>
  </div>
</template>

<script>
  import stepTwo from './stepTwo'                     //  新增页面第二步
  import stepThreeQue from './stepThreeQue'           //  新增页面第三步 之 调查问题
  import stepThreeClass from './stepThreeClass'       //  新增页面第三步 之 调查分类信息
  import stepThreeVary from './stepThreeVary'         //  新增页面第三步 之 调查表变量
  import stepThreeAns from './stepThreeAns'           //  新增页面第三步 之 调查答案信息
  import browseType from './browseType'               //  展示页面
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess, deepCopy} from '../../lib/util'

  export default {
    data() {
      return {
        radioFlag: false,
        showNext: true,
        showBrowse: false,  //  展示页面显示
        platSuvStyle: 3,    //  邮件样式code
        styleTitle: this.$t('lang_role.suvadmin.styleTitle'),     //  邮件样式名字
        styleCode: 'p_suvstyle_03',  //  邮件样式code值
        num: 0,
        showBigImg: false,
        imgList: [
          {img: '../../static/img/type1s.jpg', paramInfoName: '', id: 1, paramCode: ''},
          {img: '../../static/img/type2s.jpg', paramInfoName: '', id: 2, paramCode: ''},
          {img: '../../static/img/type3s.jpg', paramInfoName: '', id: 3, paramCode: ''},
          {img: '../../static/img/type4s.jpg', paramInfoName: '', id: 4, paramCode: ''},
          {img: '../../static/img/type5s.jpg', paramInfoName: '', id: 5, paramCode: ''},
        ],
        showImg: [
          {img: '../../static/img/type1b.png'},
          {img: '../../static/img/type2b.png'},
          {img: '../../static/img/type3b.png'},
          {img: '../../static/img/type4b.png'},
          {img: '../../static/img/type5b.png'},
        ],
        stepNum: 1,             //  新增时当前步骤
        choseType: true,        //  选择样式页面
        stepTwoPage: false,     //  第二步
        stepQue: false,         //  第三步 之 调查问题
        stepClass: false,       //  第三步 之 调查分类信息
        stepVary: false,        //  第三步 之 调查表变量
        stepAns: false,         //  第三步 之 调查答案信息
        suvid: '',              //  调查信息id
        researchMes: {},
        platQusCatid: '',      //  新增后获取的调查分类id
      }
    },
    components: {
      browseType,
      stepTwo,
      stepThreeQue,
      stepThreeClass,
      stepThreeVary,
      stepThreeAns,
    },
    props: {
      logType: String,
      id: Number,
      index: Number,
      emailType: Array,
      ansType: Array,
    },
    mounted() {
      const t = this
      for (let i = 0; i < t.emailType.length; i++) {
        t.imgList[i].paramInfoName = t.emailType[i].paramInfoName
        t.imgList[i].paramCode = t.emailType[i].paramCode
      }
    },
    methods: {
      // 取消
      reset() {
        const t = this
        t.$emit('closeAdd')
        t.stepNum = 1
      },
      // 上一步
      preStep() {
        const t = this
        if (t.platSuvStyle === 1) { //  第1种方式
          switch (t.stepNum) {
            case 1:
              break
            case 2:
              t.choseType = true
              t.stepTwoPage = false
              t.stepNum--
              break
            case 3:
              t.getInfo()
              break
            case 4:
              t.stepAns = false
              t.stepQue = true
              t.stepNum--
              break
            case 5:
              t.stepVary = false
              t.stepAns = true
              t.showNext = true
              t.stepNum--
              break
          }
        } else if (t.platSuvStyle === 2) { //  第2种方式
          switch (t.stepNum) {
            case 1:
              break
            case 2:
              t.choseType = true
              t.stepTwoPage = false
              t.stepNum--
              break
            case 3:
              t.getInfo()
              break
            case 4:
              t.stepQue = false
              t.stepClass = true
              t.stepNum--
              break
            case 5:
              t.stepAns = false
              t.stepQue = true
              t.stepNum--
              break
            case 6:
              t.stepVary = false
              t.stepAns = true
              t.showNext = true
              t.stepNum--
              break
          }
        } else if (t.platSuvStyle === 3) { //  第3种方式
          switch (t.stepNum) {
            case 1:
              break
            case 2:
              t.choseType = true
              t.stepTwoPage = false
              t.stepNum--
              break
            case 3:
              t.getInfo()
              break
            case 4:
              t.stepAns = false
              t.stepQue = true
              t.stepNum--
              break
            case 5:
              t.stepVary = false
              t.stepAns = true
              t.showNext = true
              t.stepNum--
              break
          }
        } else if (t.platSuvStyle === 4 || t.platSuvStyle === 5) { //  第4、5种方式
          switch (t.stepNum) {
            case 1:
              break
            case 2:
              t.choseType = true
              t.stepTwoPage = false
              t.stepNum--
              break
            case 3:
              t.getInfo()
              break
            case 4:
              t.stepClass = true
              t.stepQue = false
              t.stepNum--
              break
            case 5:
              t.stepAns = false
              t.stepQue = true
              t.stepNum--
              break
            case 6:
              t.stepVary = false
              t.stepAns = true
              t.showNext = true
              t.stepNum--
              break
          }
        }
      },
      // 下一步
      nextStep() {
        const t = this
        t.radioFlag = true
        if (t.platSuvStyle === 1) { //  第1种方式
          switch (t.stepNum) {
            case 1:
              t.choseType = false
              t.stepTwoPage = true
              if (t.suvid !== '') {
                t.getInfo2()
              }
              t.stepNum++
              break
            case 2:
              t.$refs.stepTwo.form.platSuvContent = document.getElementById('txtCon').innerHTML           //  正文
              t.$refs.stepTwo.form.platSuvOptdesc = document.getElementById('txtDes').innerHTML           //  选项说明
              t.$refs.stepTwo.form.platSuvBottom = document.getElementById('txtEnd').innerHTML            //  末尾
              t.$refs.stepTwo.form.platSuvSuggestitle = document.getElementById('txtSuggest').innerHTML   //  建议标题
              if (t.suvid === '') {
                t.$refs.stepTwo.$refs.form.validate((valid) => {
                  if (valid) {
                    t.finish()
                  }
                })
              } else if (t.suvid !== '') {
                t.finish()
              }
              break
            case 3:
              t.stepQue = false
              t.stepAns = true
              t.stepNum++
              break
            case 4:
              t.stepAns = false
              t.stepVary = true
              t.showNext = false
              t.stepNum++
              break
          }
        } else if (t.platSuvStyle === 2) { //  第2种方式
          switch (t.stepNum) {
            case 1:
              t.choseType = false
              t.stepTwoPage = true
              if (t.suvid !== '') {
                t.getInfo2()
              }
              t.stepNum++
              break
            case 2:
              t.$refs.stepTwo.form.platSuvContent = document.getElementById('txtCon').innerHTML           //  正文
              t.$refs.stepTwo.form.platSuvOptdesc = document.getElementById('txtDes').innerHTML           //  选项说明
              t.$refs.stepTwo.form.platSuvBottom = document.getElementById('txtEnd').innerHTML     //  末尾
              t.$refs.stepTwo.form.platSuvSuggestitle = document.getElementById('txtSuggest').innerHTML   //  建议标题
              if (t.suvid === '') {
                t.$refs.stepTwo.$refs.form.validate((valid) => {
                  if (valid) {
                    t.finish()
                  }
                })
              } else if (t.suvid !== '') {
                t.finish()
              }
              break
            case 3:
              t.stepClass = false
              t.stepQue = true
              t.stepNum++
              break
            case 4:
              t.stepQue = false
              t.stepAns = true
              t.stepNum++
              break
            case 5:
              t.stepAns = false
              t.stepVary = true
              t.showNext = false
              t.stepNum++
              break
          }
        } else if (t.platSuvStyle === 3) { //  第3种方式
          switch (t.stepNum) {
            case 1:
              t.choseType = false
              t.stepTwoPage = true
              if (t.suvid !== '') {
                t.getInfo2()
              }
              t.stepNum++
              break
            case 2:
              t.$refs.stepTwo.form.platSuvContent = document.getElementById('txtCon').innerHTML           //  正文
              t.$refs.stepTwo.form.platSuvOptdesc = document.getElementById('txtDes').innerHTML           //  选项说明
              t.$refs.stepTwo.form.platSuvBottom = document.getElementById('txtEnd').innerHTML     //  末尾
              t.$refs.stepTwo.form.platSuvSuggestitle = document.getElementById('txtSuggest').innerHTML   //  建议标题
              if (t.suvid === '') {
                t.$refs.stepTwo.$refs.form.validate((valid) => {
                  if (valid) {
                    t.finish()
                  }
                })
              } else if (t.suvid !== '') {
                t.finish()
              }
              break
            case 3:
              t.stepQue = false
              t.stepAns = true
              t.stepNum++
              break
            case 4:
              t.stepAns = false
              t.stepVary = true
              t.showNext = false
              t.stepNum++
              break
          }
        } else if (t.platSuvStyle === 4 || t.platSuvStyle === 5) { //  第4、5种方式
          switch (t.stepNum) {
            case 1:
              t.choseType = false
              t.stepTwoPage = true
              if (t.suvid !== '') {
                t.getInfo2()
              }
              t.stepNum++
              break
            case 2:
              t.$refs.stepTwo.form.platSuvContent = document.getElementById('txtCon').innerHTML           //  正文
              t.$refs.stepTwo.form.platSuvOptdesc = document.getElementById('txtDes').innerHTML           //  选项说明
              t.$refs.stepTwo.form.platSuvBottom = document.getElementById('txtEnd').innerHTML     //  末尾
              t.$refs.stepTwo.form.platSuvSuggestitle = document.getElementById('txtSuggest').innerHTML   //  建议标题
              if (t.suvid === '') {
                t.$refs.stepTwo.$refs.form.validate((valid) => {
                  if (valid) {
                    t.finish()
                  }
                })
              } else if (t.suvid !== '') {
                t.finish()
              }
              break
            case 3:
              t.stepClass = false
              t.stepQue = true
              t.stepNum++
              break
            case 4:
              t.stepQue = false
              t.stepAns = true
              t.stepNum++
              break
            case 5:
              t.stepAns = false
              t.stepVary = true
              t.showNext = false
              t.stepNum++
              break
          }
        }
      },
      // 获取用户选择的邮件样式
      getType(value) {
        this.platSuvStyle = value
        this.styleTitle = this.imgList[value - 1].paramInfoName
        this.styleCode = this.imgList[value - 1].paramCode
      },
      // 点击小图片看大图片
      bigImg(index) {
        this.showBigImg = true
        this.num = index
        if (this.radioFlag === false) {
          this.platSuvStyle = this.imgList[index].id
          this.styleTitle = this.imgList[index].paramInfoName
        }
      },
      prev() {
        if (this.num === 0) {
          this.num = 5
        }
        this.num--
        if (this.radioFlag === false) {
          this.platSuvStyle = this.imgList[this.num].id
          this.styleTitle = this.imgList[this.num].paramInfoName
        }
      },
      next() {
        if (this.num === 4) {
          this.num = -1
        }
        this.num++
        if (this.radioFlag === false) {
          this.platSuvStyle = this.imgList[this.num].id
          this.styleTitle = this.imgList[this.num].paramInfoName
        }
      },
      // 修改
      upData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSurvery.getById',
          id: id,
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            // t.researchMes = res.data.content[0].platSuvCode
            t.researchMes = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 完成
      finish() {
        const t = this
        t.$refs.stepTwo.form.platSuvGentime = t.$refs.stepTwo.form.platSuvGentime.format('yyyy-MM-dd')
        const data = deepCopy(t.$refs.stepTwo.form)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (t.logType === this.$t('button.add')) {
              t.suvid = res.data.content[0].id
              t.$emit('getData', res.data.content[0])
            }
            if (t.platSuvStyle === 1) {
              t.stepTwoPage = false
              t.stepQue = true
              t.stepNum++
            } else if (t.platSuvStyle === 2) {
              t.stepTwoPage = false
              t.stepClass = true
              t.stepNum++
            } else if (t.platSuvStyle === 3) {
              t.stepTwoPage = false
              t.stepQue = true
              t.stepNum++
            } else if (t.platSuvStyle === 4 || t.platSuvStyle === 5) {
              t.stepTwoPage = false
              t.stepClass = true
              t.stepNum++
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getInfo() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSurvery.getById',
          id: t.suvid,
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (t.platSuvStyle === 1) {
              t.stepQue = false
              t.stepTwoPage = true
              t.stepNum--
            } else if (t.platSuvStyle === 2) {
              t.stepClass = false
              t.stepTwoPage = true
              t.stepNum--
            } else if (t.platSuvStyle === 3) {
              t.stepQue = false
              t.stepTwoPage = true
              t.stepNum--
            } else if (t.platSuvStyle === 4 || t.platSuvStyle === 5) {
              t.stepClass = false
              t.stepTwoPage = true
              t.stepNum--
            }
            t.upData(t.suvid)
            t.researchMes = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getInfo2() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSurvery.getById',
          id: t.suvid,
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.upData(t.suvid)
            t.researchMes = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getClassid(id) {
        this.platQusCatid = id
      },
    },
  }
  // .imgs:nth-child(2) img,.imgs:nth-child(4) img{width:120px; height:180px; margin:20px auto 0;}
  // .imgs:nth-child(3) img{width:150px; height:225px; margin:0px auto;}
</script>

<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";

  .content {
    padding: 30px 10px 20px 10px;
  }

  .imgList {
    margin: 30px auto 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .imgs {
    width: 20%;
    cursor: pointer;
  }

  .imgs img {
    width: 150px;
    height: 225px;
    display: block;
    margin: 40px auto 0;
  }

  .radios {
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }

  .imgMask {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(0, 0, 0, .6);
  }

  .showImg {
    width: 500px;
    height: 768px;
    position: absolute;
    left: 50%;
    top: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  .bigImg {
    width: 100%;
    height: 768px;
  }

  .prev, .next {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  .prev {
    position: fixed;
    top: 50%;
    left: 20%;
    width: 40px;
    transform: translate(10px, -50%);
  }

  .next {
    position: fixed;
    top: 50%;
    right: 20%;
    width: 40px;
    transform: translate(10px, -50%);
  }

  .margin20 {
    margin-right: 5px;
  }
</style>
