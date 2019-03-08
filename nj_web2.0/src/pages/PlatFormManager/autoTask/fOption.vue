<template>
	<div class="option-main">
		<Row style="max-height: 450px;overflow-y: auto;padding-right: 20px;">
			 <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
			 	<i-col span="12">
			 		<FormItem :label="$t('lang_platform.autoTask.atskNo')" prop="atskNo">
			 			<Input v-model="form.atskNo" :placeholder="$t('lang_platform.autoTask.atskNoIns')"/>
			 		</FormItem>
			 	</i-col>
			 	<i-col span="12">
			 		<FormItem :label="$t('lang_platform.autoTask.atskName')" prop="atskName">
			 			<Input v-model="form.atskName" :placeholder="$t('lang_platform.autoTask.atskNameIns')"/>
			 		</FormItem>
			 	</i-col>

			 	<i-col span="12">
			 		<FormItem :label="$t('lang_platform.autoTask.atskIsvalid')" prop="atskIsvalid" :label-width="135">
			 			<RadioGroup v-model="form.atskIsvalid">
			 				<Radio :label="item.paramCode" v-for="(item,index) in selectYesno" :key="index">{{item.paramInfoCn}}</Radio>
			 			</RadioGroup>
			 		</FormItem>
			 	</i-col>

         <i-col span="12">
           <FormItem :label="$t('lang_platform.autoTask.atskJobid')" prop="atskJobid">
             <Input v-model="form.atskJobid" :placeholder="$t('lang_platform.autoTask.atskJobidIns')"/>
           </FormItem>
         </i-col>

			 	<i-col span="24">
			 		<FormItem :label="$t('lang_platform.autoTask.atskClass')" >
			 			<Input v-model="form.atskClass" :placeholder="$t('lang_platform.autoTask.atskClassIns')"/>
			 		</FormItem>
			 	</i-col>

			 	<i-col span="12">
			 		<FormItem :label="$t('lang_platform.autoTask.atskType')" >
			 			<Select v-model="form.atskType">
			 				<Option :value="item.paramCode" v-for="(item,index) in selectAtskType" :key="index">{{item.paramInfoCn}}</Option>
			 			</Select>
			 		</FormItem>
			 	</i-col>
         <i-col span="24">
           <!--<FormItem :label="提醒方式" v-if="form.atskType === '02autoprom'" >-->
             <!--<Select v-model="form.atskPrommode">-->
               <!--<Option :value="item.paramCode" v-for="(item,index) in selectAkprommode" :key="index">{{item.paramInfoCn}}</Option>-->
             <!--</Select>-->
           <!--</FormItem>-->
           <FormItem :label="$t('lang_platform.autoTask.atskPrommode')" v-if="form.atskType === '02autoprom'" prop="atskPrommode">
             <CheckboxGroup v-model="form.atskPrommode">
               <Checkbox :label="item.paramCode" v-for="(item,index) in selectAkprommode" :key="index"><span>{{item.paramInfoName}}</span></Checkbox>
             </CheckboxGroup>
           </FormItem>
         </i-col>
			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskTemptable')" v-if="form.atskType === '02autoprom'">
			 			<Select v-model="form.atskTemptable">
			 				<Option v-for="item in TemptableList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 			</Select>
			 		</FormItem>
			 	</i-col>
			 	<i-col span="12">
			 		<FormItem :label="$t('lang_platform.autoTask.atskAdvancedays')" prop="atskAdvancedays">
			 			<Input  v-model="form.atskAdvancedays" />
			 		</FormItem>
			 	</i-col>
			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskDurationdays')" prop="atskDurationdays">
			 			<Input v-model="form.atskDurationdays" />
			 		</FormItem>
			 	</i-col>

			 	<i-col span="12">
			 		<FormItem :label="$t('lang_platform.autoTask.atskFrequency')" prop="atskFrequency">
			 			<Select v-model="form.atskFrequency">
			 				<Option :value="item.paramCode" v-for="(item,index) in selectAtskFrequency" :key="index">{{item.paramInfoCn}}</Option>
			 			</Select>
			 		</FormItem>
			 	</i-col>

			 	<!--每年-->
			 	<i-col span="24" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskTime')" v-if="form.atskFrequency === '04yearly'">
			 			<Row>
				 			<i-col span="6">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunmonth')" v-model="form.atskRunmonth">
				 					<Option v-for="item in monthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
				 			<i-col span="6">
				 				<Select :placeholder="$t('lang_platform.autoTaskatskRunday.')" v-model="form.atskRunday">
				 					<Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
				 			<i-col span="6">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunhour')" v-model="form.atskRunhour">
				 					<Option v-for="item in hourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
				 			<i-col span="6">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunminute')" v-model="form.atskRunminute">
				 					<Option v-for="item in minuteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
			 			</Row>
			 		</FormItem>
			 	</i-col>
			 	<!--每月-->
			 	<i-col span="24" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskTime')" v-if="form.atskFrequency === '03monthly'">
			 			<Row>
				 			<i-col span="8">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunday')" v-model="form.atskRunday">
				 					<Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
				 			<i-col span="8">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunhour')" v-model="form.atskRunhour">
				 					<Option v-for="item in hourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
				 			<i-col span="8">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunminute')" v-model="form.atskRunminute">
				 					<Option v-for="item in minuteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
			 			</Row>
			 		</FormItem>
			 	</i-col>
			 	<!--每天-->
			 	<i-col span="24" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskTime')" v-if="form.atskFrequency === '01daily'">
			 			<Row>
				 			<i-col span="12">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunhour')" v-model="form.atskRunhour">
				 					<Option v-for="item in hourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
				 			<i-col span="12">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunminute')" v-model="form.atskRunminute">
				 					<Option v-for="item in minuteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
			 			</Row>
			 		</FormItem>
			 	</i-col>
			 	<!--每周-->
			 	<i-col span="24" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskTime')" v-if="form.atskFrequency === '02weekly'">
			 			<Row>
				 			<i-col span="8">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunweek')" v-model="form.atskRunweek">
				 					<Option v-for="item in weekList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
				 			<i-col span="8">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunhour')" v-model="form.atskRunhour">
				 					<Option v-for="item in hourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
				 			<i-col span="8">
				 				<Select :placeholder="$t('lang_platform.autoTask.atskRunminute')" v-model="form.atskRunminute">
				 					<Option v-for="item in minuteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				 				</Select>
				 			</i-col>
			 			</Row>
			 		</FormItem>
			 	</i-col>


			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskIntervalminutes')" v-if="form.atskFrequency === '05interval'" prop="atskIntervalminutes">
			 			<Input v-model="form.atskIntervalminutes"  />
			 		</FormItem>
			 	</i-col>
			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskSendamount')" v-if="form.atskFrequency === '05interval' && form.atskType === '02autoprom' " prop="atskSendamount">
			 			<Input v-model="form.atskSendamount"  />
			 		</FormItem>
			 	</i-col>
			 	<!--<i-col span="12" >-->
			 		<!--<FormItem :label="间隔发送数量" v-if="form.atskFrequency === '05interval' && form.atskType === '04autosurvey' " prop="atskSendamount">-->
			 			<!--<Input v-model="form.atskSendamount" />-->
			 		<!--</FormItem>-->
			 	<!--</i-col>-->

			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskRunsdate')" v-if="form.atskFrequency === '05interval'">
			 			<DatePicker v-model="form.atskRunsdate" style="width: 100%;"></DatePicker>
			 		</FormItem>
			 	</i-col>
			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskRunedate')" v-if="form.atskFrequency === '05interval'">
			 			<DatePicker v-model="form.atskRunedate" style="width: 100%;"></DatePicker>
			 		</FormItem>
			 	</i-col>

			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskLasttime')" v-if="form.atskFrequency === '05interval'">
			 			<!--<DatePicker  type="datetime" format="yyyy-MM-dd HH:mm" v-model="atskLasttime" style="width: 100%;"></DatePicker>-->
			 			<Input v-model="atskLasttime" readonly="readonly"/>
			 		</FormItem>
			 	</i-col>
			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskMailtempName')" v-if="form.atskType === '02autoprom'  && form.atskPrommode.indexOf('01mail') !== -1">
			 			<span @dblclick="dbMail">
			 			<Input :placeholder="$t('lang_platform.autoTask.atskMailtempNameIns')" icon="search" readonly="readonly" v-model="form.atskMailtempName" @on-click="selectMail('邮件模板')"/>
			 			</span>
			 		</FormItem>
			 	</i-col>

			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskSurveyName')" v-if="form.atskType === '02autoprom' && form.atskPrommode.indexOf('03survey') !== -1">
			 			<span @dblclick="dbSurvey">
			 			<Input :placeholder="$t('lang_platform.autoTask.atskSurveyNameIns')" icon="search" readonly="readonly" v-model="form.atskSurveyName" @on-click="selectSurvey('调查定义')"/>
			 			</span>
			 		</FormItem>
			 	</i-col>
			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskSmsName')" v-if="form.atskType === '02autoprom' && form.atskPrommode.indexOf('02message') !== -1">
			 			<span @dblclick="dbSms">
			 			<Input :placeholder="$t('lang_platform.autoTask.atskSmsNameIns')" icon="search" readonly="readonly" v-model="form.atskSmsName" @on-click="selectSms('短信模板')"/>
			 			</span>
			 		</FormItem>
			 	</i-col>
         <i-col span="12" >
           <FormItem :label="$t('lang_platform.autoTask.atskWxName')" v-if="form.atskType === '02autoprom' && form.atskPrommode.indexOf('04weixin') !== -1">
			 			<span @dblclick="dbWx">
			 			<Input :placeholder="$t('lang_platform.autoTask.atskWxNameIns')" icon="search" readonly="readonly" v-model="form.atskWxName" @on-click="selectWx('微信模板')"/>
			 			</span>
           </FormItem>
         </i-col>

			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskPromkey')" v-if="form.atskType === '02autoprom'">
			 			<Input :placeholder="$t('lang_platform.autoTask.atskPromkeyIns')" v-model="form.atskPromkey"/>
			 		</FormItem>
			 	</i-col>
			 	<i-col span="12" >
			 		<FormItem :label="$t('lang_platform.autoTask.atskFlowdatakey')" v-if="form.atskType === '02autoprom'">
			 			<Input :placeholder="$t('lang_platform.autoTask.atskFlowdatakeyIns')" v-model="form.atskFlowdatakey"/>
			 		</FormItem>
			 	</i-col>

			 	<i-col span="24">
			 		<FormItem :label="$t('lang_platform.autoTask.atskComment')" >
			 			<Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.autoTask.atskCommentIns')" v-model="form.atskComment"/>
			 		</FormItem>
			 	</i-col>
			 </Form>
		</Row>
		<Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
		<transition name="fade">
			<searchSurvey v-show="openSurvey" @closeSur="closeSur" :searchSur="searchSur" @inputSurvey="inputSurvey" :params="paramsSur"  ref="searchSurvey"></searchSurvey>
		</transition>
		<transition name="fade">
			<searcheMail v-show="openMail" @closeMail="closeMail" :searchMail="searchMail" @inputMail="inputMail" :params="paramsMail"  ref="searcheMail"></searcheMail>
		</transition>
		<transition name="fade">
			<searchSms v-show="openSms" @closeSms="closeSms" :searchSms="searchSms" @inputSms="inputSms" :params="paramsSms"  ref="searchSms"></searchSms>
		</transition>
    <transition name="fade">
      <searchWx v-show="openWx" @closeWx="closeWx" :searchWx="searchWx" @inputWx="inputWx" :params="paramsWx"  ref="searchWx"></searchWx>
    </transition>
	</div>
</template>

<script>
import searchSurvey from '../../../components/searchTable/searchSurvey'
import searcheMail from '../../../components/searchTable/searcheMail'
import searchSms from '../../../components/searchTable/searchSms'
import searchWx from '../../../components/searchTable/searchWx'
import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLoginSenior, getDataLevelUserLogin2 } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import valids from '../../../lib/pub_valid'

	export default {
		data() {
			return {
				form: {
					atskNo: '',
					atskName: '',
					atskIsvalid: '0',
          atskJobid: '',
					atskClass: '',
					atskType: '01autorun',
          atskPrommode: [],
					atskTemptable: '',
					atskAdvancedays: 1,
					atskDurationdays: 1,
					atskFrequency: '',
					atskRunmonth: '',
					atskRunweek: '',
					atskRunday: '',
					atskRunhour: '',
					atskRunminute: '',
					atskIntervalminutes: 1,
					atskSendamount: 1,
					atskRunsdate: '',
					atskRunedate: '',
					atskMailtemp: '',
					atskMailtempName: '',
					atskSurveyName: '',
					atskSurvey: '',
					atskSmsName: '',
					atskSms: '',
          atskWxName: '',
          atskWx: '',
					atskPromkey: '',
					atskFlowdatakey: '',
				},
//				atskLasttime: '',
				selectYesno: [],
				selectAtskType: [],
        selectAkprommode: [],
				selectAtskFrequency: [],
				ruleValidate: {
					atskNo: [{ required: true, message: this.$t('lang_platform.autoTask.atskNoIns'), trigger: 'blur' }],
					atskName: [{ required: true, message: this.$t('lang_platform.autoTask.atskNameIns'), trigger: 'blur' }],
					atskFrequency: [{ required: true, message: this.$t('lang_platform.autoTask.atskFrequencyIns'), trigger: 'blur, change' }],
          atskJobid: [{ required: true, message: this.$t('lang_platform.autoTask.atskJobidIns'), trigger: 'blur' }],
          atskPrommode: [
            { required: true, type: 'array', min: 1, message: this.$t('lang_platform.autoTask.atskPrommodeIns'), trigger: 'blur' },
          ],
				},
				TemptableList: [
					{
						value: 'plat_atsk_temp01',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp01'),
					},
					{
						value: 'plat_atsk_temp02',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp02'),
					},
					{
						value: 'plat_atsk_temp03',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp03'),
					},
					{
						value: 'plat_atsk_temp04',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp04'),
					},
					{
						value: 'plat_atsk_temp05',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp05'),
					},
					{
						value: 'plat_atsk_temp06',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp06'),
					},
					{
						value: 'plat_atsk_temp07',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp07'),
					},
					{
						value: 'plat_atsk_temp08',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp08'),
					},
					{
						value: 'plat_atsk_temp09',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp09'),
					},
					{
						value: 'plat_atsk_temp10',
						label: this.$t('lang_platform.autoTask.plat_atsk_temp10'),
					},
				],
				weekList: [
					{
						value: '0',
						label: this.$t('date.week.Sun'),
					},
					{
						value: '1',
						label: this.$t('date.week.Mon'),
					},
					{
						value: '2',
						label: this.$t('date.week.Tue'),
					},
					{
						value: '3',
						label: this.$t('date.week.Wed'),
					},
					{
						value: '4',
						label: this.$t('date.week.Thu'),
					},
					{
						value: '5',
						label: this.$t('date.week.Fri'),
					},
					{
						value: '6',
						label: this.$t('date.week.Sat'),
					},
				],
				monthList: [],
				dayList: [],
				hourList: [],
				minuteList: [],
				openSurvey: false,
				searchSur: [
				  {
		            title: this.$t('lang_platform.autoTask.platSuvCode'),
		            key: 'platSuvCode',
		            sortable: 'custom',
		          },
		          {
		            title: this.$t('lang_platform.autoTask.platSuvTitle'),
		            key: 'platSuvTitle',
		            sortable: 'custom',
		          },
				],
				paramsSur: {
			  	  _mt: 'platSurvery.getPage',
		          sort: 'id',
		          order: 'desc',
		          rows: 10,
		          page: 1,
		          funId: '1',
		          logType: '调查定义',
				},
				openMail: false,
				searchMail: [
				  {
		            title: this.$t('lang_platform.autoTask.sysmailName'),
		            key: 'sysmailName',
		            sortable: 'custom',
		          },
		          {
		            title: this.$t('lang_platform.autoTask.sysmailObject'),
		            key: 'sysmailObject',
		            sortable: 'custom',
		          },
				],
				paramsMail: {
			  	  _mt: 'platSysmail.getPage',
		          sort: 'id',
		          order: 'desc',
		          rows: 10,
		          page: 1,
		          funId: '1',
		          logType: '邮件模板',
				},
        openSms: false,
				searchSms: [
				  {
		            title: this.$t('lang_platform.autoTask.syssmsNo'),
		            key: 'syssmsNo',
		            sortable: 'custom',
		          },
		          {
		            title: this.$t('lang_platform.autoTask.syssmsTitle'),
		            key: 'syssmsTitle',
		            sortable: 'custom',
		          },
				],
				paramsSms: {
			  	  _mt: 'platSyssms.getPage',
		          sort: 'id',
		          order: 'desc',
		          rows: 10,
		          page: 1,
		          funId: '1',
		          logType: '短信模板',
				},
        openWx: false,
        searchWx: [
          {
            title: this.$t('lang_platform.autoTask.syswxNo'),
            key: 'syswxNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.syswxTitle'),
            key: 'syswxTitle',
            sortable: 'custom',
          },
        ],
        paramsWx: {
          _mt: 'platSyswx.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '微信模板',
        },
			}
		},
		props: {
			id: Number,
			logType: String,
		},
		components: {
			searchSurvey,
			searcheMail,
			searchSms,
      searchWx,
		},
		mounted() {
			this.getSelect()
			this.getSelectDate()
		},
		computed: {
			atskLasttime() {
				if (this.form.atskRunedate === '') {
					return null
				}
				const thisTime = this.form.atskRunedate - this.form.atskIntervalminutes * 60000
				return new Date(thisTime).format('yyyy-MM-dd hh:mm:ss')
			},
		},
		methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.$store.commit('atsk/setTempVar', res.data.content[0])
            t.form.atskNo = res.data.content[0].atskNo
            t.form.atskJobid = res.data.content[0].atskJobid
            t.form.atskName = res.data.content[0].atskName
            t.form.atskIsvalid = res.data.content[0].atskIsvalid
            t.form.atskClass = res.data.content[0].atskClass
            t.form.atskType = res.data.content[0].atskType
            t.form.atskTemptable = res.data.content[0].atskTemptable
            t.form.atskAdvancedays = res.data.content[0].atskAdvancedays
            t.form.atskDurationdays = res.data.content[0].atskDurationdays
            t.form.atskFrequency = res.data.content[0].atskFrequency
            t.form.atskRunmonth = res.data.content[0].atskRunmonth
            t.form.atskRunday = res.data.content[0].atskRunday
            t.form.atskRunhour = res.data.content[0].atskRunhour
            t.form.atskRunminute = res.data.content[0].atskRunminute
            t.form.atskIntervalminutes = res.data.content[0].atskIntervalminutes
            t.form.atskSendamount = res.data.content[0].atskSendamount
            t.form.atskRunsdate = res.data.content[0].atskRunsdate
            t.form.atskRunweek = res.data.content[0].atskRunweek
            t.form.atskRunedate = res.data.content[0].atskRunedate
            t.form.atskMailtemp = res.data.content[0].atskMailtemp
            t.form.atskMailtempName = res.data.content[0].atskMailtempName
            t.form.atskSurvey = res.data.content[0].atskSurvey
            t.form.atskSurveyName = res.data.content[0].atskSurveyName
            t.form.atskSms = res.data.content[0].atskSms
            t.form.atskSmsName = res.data.content[0].atskSmsName
            t.form.atskWx = res.data.content[0].atskWx
            t.form.atskWxName = res.data.content[0].atskWxName
            t.form.atskPromkey = res.data.content[0].atskPromkey
            t.form.atskFlowdatakey = res.data.content[0].atskFlowdatakey
            if (res.data.content[0].atskPrommode === undefined || res.data.content[0].atskPrommode === '') {
              t.$store.commit('atsk/setTempAlert', '')
              t.form.atskPrommode = []
            } else {
              t.$store.commit('atsk/setTempAlert', res.data.content[0].atskPrommode)
              t.form.atskPrommode = res.data.content[0].atskPrommode.split(',')
            }
//            t.$store.commit('atsk/setTempAlert', res.data.content[0].atskType)
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
          logType: this.$t('button.ser'),
          typeCode: 'yesno,autotasktype,runfrequency,akprommode',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectYesno = res.data.content[0].value[0].paramList
            t.selectAtskType = res.data.content[0].value[1].paramList
            t.selectAtskFrequency = res.data.content[0].value[2].paramList
            t.selectAkprommode = res.data.content[0].value[3].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelectDate() {
		    	const t = this
		    	for (let i = 1; i < 13; i++) {
		    		t.monthList.push({
		    			value: i.toString(),
		    			label: i + this.$t('lang_platform.autoTask.month'),
		    		})
		    	}
		    	for (let j = 1; j < 31; j++) {
		    		t.dayList.push({
		    			value: j.toString(),
		    			label: j + this.$t('lang_platform.autoTask.day'),
		    		})
		    	}
		    	for (let x = 0; x < 24; x++) {
		    		if (x < 10) {
		    			t.hourList.push({
			    			value: x.toString(),
			    			label: '0' + x + this.$t('lang_platform.autoTask.hour'),
			    		})
		    		} else {
		    			t.hourList.push({
			    			value: x.toString(),
			    			label: x + this.$t('lang_platform.autoTask.hour'),
			    		})
		    		}
		    	}
		    	for (let y = 0; y < 60; y++) {
		    		if (y < 10) {
		    			t.minuteList.push({
			    			value: y.toString(),
			    			label: '0' + y + this.$t('lang_platform.autoTask.minut'),
			    		})
		    		} else {
		    			t.minuteList.push({
			    			value: y.toString(),
			    			label: y + this.$t('lang_platform.autoTask.minut'),
			    		})
	    			}
		    	}
		    },
		    save() {
		    	const t = this
		    	const data = deepCopy(t.form)
          data.atskPrommode = data.atskPrommode.toString()
		    	if (data.atskRunsdate !== undefined) {
		    		data.atskRunsdate = new Date(data.atskRunsdate).format('yyyy-MM-dd')
		    	}
		    	if (data.atskRunsdate === 'NaN-aN-aN') {
		    		data.atskRunsdate = ''
		    	}
		    	if (data.atskRunedate !== undefined) {
		    		data.atskRunedate = new Date(data.atskRunedate).format('yyyy-MM-dd')
		    	}
		    	if (data.atskRunedate === 'NaN-aN-aN') {
		    		data.atskRunedate = ''
		    	}
		    	if (t.logType === this.$t('button.upd')) {
		    		data.id = t.id
		    	}
		    	const params = {
		    		_mt: 'platAutotask.addOrUpd',
		    		funId: '1',
		    		logType: this.$t('button.add'),
		    		data: JSON.stringify(data),
		    	}
		    	 this.$refs.form.validate((valid) => {
		           if (valid) {
		           	 getDataLevelUserLogin2(params).then((res) => {
			          if (isSuccess(res, t)) {
			          	t.$emit('getid', res.data.content[0].id)
                  if (res.data.content[0].atskPrommode === undefined || res.data.content[0].atskPrommode === '') {
                    t.$store.commit('atsk/setTempAlert', '')
                  } else {
                    t.$store.commit('atsk/setTempAlert', res.data.content[0].atskPrommode)
                  }
			          	t.$store.commit('atsk/setTempVar', res.data.content[0])
			            if (t.logType === this.$t('button.add')) {
			              t.$Modal.success({
			                title: this.$t('reminder.suc'),
			                content: this.$t('reminder.addsuccess'),
			              })
			              t.$emit('newdata', res.data.content[0])
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
        t.form.atskNo = ''
        t.form.atskName = ''
        t.form.atskJobid = ''
        t.form.atskIsvalid = '0'
        t.form.atskClass = ''
        t.form.atskType = '01autorun'
        t.form.atskTemptable = ''
        t.form.atskAdvancedays = 1
        t.form.atskDurationdays = 1
        t.form.atskFrequency = ''
        t.form.atskRunweek = ''
        t.form.atskRunmonth = ''
        t.form.atskRunday = ''
        t.form.atskRunhour = ''
        t.form.atskRunminute = ''
        t.form.atskIntervalminutes = 1
        t.form.atskSendamount = 1
        t.form.atskRunsdate = ''
        t.form.atskRunedate = ''
        t.atskLasttime = ''
        t.form.atskMailtempName = ''
        t.form.atskSurveyName = ''
        t.form.atskSmsName = ''
        t.form.atskSms = ''
        t.form.atskWxName = ''
        t.form.atskWx = ''
        t.form.atskPromkey = ''
        t.form.atskFlowdatakey = ''
        t.$refs.form.resetFields()
      },
      selectSurvey() {
		   	   const t = this
    		   t.$refs.searchSurvey.getData(this.paramsSur)
    		   t.openSurvey = true
		   },
		   closeSur() {
		   	const t = this
		   	t.openSurvey = false
		   },
		   inputSurvey(name, id) {
		   	const t = this
		   	t.form.atskSurveyName = name
		   	t.form.atskSurvey = id
		   },
		   dbSurvey() {
		   	const t = this
		   	t.form.atskSurveyName = ''
		   	t.form.atskSurvey = ''
		   },
		   selectMail() {
		   	 const t = this
    		   t.$refs.searcheMail.getData(this.paramsMail)
    		   t.openMail = true
		   },
		   closeMail() {
		   	const t = this
		   	t.openMail = false
		   },
		   inputMail(name, id) {
		   	const t = this
		   	t.form.atskMailtempName = name
		   	t.form.atskMailtemp = id
		   },
		   dbMail() {
		   		const t = this
			   	t.form.atskMailtempName = ''
			   	t.form.atskMailtemp = ''
		   },
		   selectSms() {
		   	 const t = this
    		   t.$refs.searchSms.getData(this.paramsSms)
    		   t.openSms = true
		   },
		   closeSms() {
		   	const t = this
		   	t.openSms = false
		   },
		   inputSms(name, id) {
		   	const t = this
		   	t.form.atskSmsName = name
		   	t.form.atskSms = id
		   },
		   dbSms() {
		   	const t = this
		   	t.form.atskSmsName = ''
		   	t.form.atskSms = ''
		   },
      selectWx() {
        const t = this
        t.$refs.searchWx.getData(this.paramsWx)
        t.openWx = true
      },
      closeWx() {
        const t = this
        t.openWx = false
      },
      inputWx(name, id) {
        const t = this
        t.form.atskWxName = name
        t.form.atskWx = id
      },
      dbWx() {
        const t = this
        t.form.atskWxName = ''
        t.form.atskWx = ''
      },
		},
	}
</script>
<style lang="scss" scoped="scoped">
	.option-main {
		position: relative;
		height: 500px;
		margin-top: 20px;
		.btn{
		    position: absolute;
		    bottom: 20px;
		    right: 20px;
		}
	}
</style>
