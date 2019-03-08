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
			<Row style="max-height: 420px;overflow-y: auto;padding-right: 20px;margin-bottom: 10px;">
				<Form :model="form" label-position="right" :rules="ruleValidate"  ref="form" :label-width="120">
					<i-col span="12">
						<FormItem :label="$t('lang_platform.autoTask.atskdfClmmark')" prop="atskdfClmmark" >
							<Input :placeholder="$t('lang_platform.autoTask.atskdfClmmarkIns')" v-model="form.atskdfClmmark" />
						</FormItem>
					</i-col>

					<i-col span="12">
						<FormItem :label="$t('lang_platform.autoTask.atskdfClmcn')" prop="atskdfClmcn">
							<Input :placeholder="$t('lang_platform.autoTask.atskdfClmcnIns')" v-model="form.atskdfClmcn" />
						</FormItem>
					</i-col>
					<i-col span="12">
						<FormItem :label="$t('lang_platform.autoTask.atskdfClmcn')" prop="atskdfClmen">
							<Input :placeholder="$t('lang_platform.autoTask.atskdfClmcnIns')" v-model="form.atskdfClmen" />
						</FormItem>
					</i-col>

					<i-col span="12" v-if="$store.state.atsk.atskdfMailvar">
						<FormItem :label="$t('lang_platform.autoTask.atskdfMailvarName')" >
							<span @dblclick="dbMailVar">
							<Input icon="search" readonly="readonly" :placeholder="$t('lang_platform.autoTask.atskdfMailvarNameIns')" v-model="atskdfMailvarName" @on-click="selectMailVar" />
							</span>
						</FormItem>
					</i-col>
					<i-col span="12" v-if="$store.state.atsk.atskdfSurveyvar">
						<FormItem :label="$t('lang_platform.autoTask.atskdfSurveyvarName')" >
							<span @dblclick="dbSurVar">
							<Input icon="search" readonly="readonly" :placeholder="$t('lang_platform.autoTask.atskdfSurveyvarNameIns')" v-model="atskdfSurveyvarName" @on-click="selectSurveyVar" />
							</span>
						</FormItem>
					</i-col>

					<i-col span="12" v-if="$store.state.atsk.atskdfSmsvar">
						<FormItem :label="$t('lang_platform.autoTask.atskdfSmsvarName')" >
							<span @dblclick="dbSmsVar">
							<Input icon="search" readonly="readonly" :placeholder="$t('lang_platform.autoTask.atskdfSmsvarNameIns')" v-model="atskdfSmsvarName" @on-click="selectSmsVar" />
							</span>
						</FormItem>
					</i-col>
          <i-col span="12" v-if="$store.state.atsk.atskdfWxvar">
            <FormItem :label="$t('lang_platform.autoTask.atskdfWxvarName')" >
							<span @dblclick="dbWxVar">
							<Input icon="search" readonly="readonly" :placeholder="$t('lang_platform.autoTask.atskdfWxvarNameIns')" v-model="atskdfWxvarName" @on-click="selectWxVar" />
							</span>
            </FormItem>
          </i-col>
					<i-col span="12">
						<FormItem :label="$t('lang_platform.autoTask.atskdfGetvalbyclmName')" >
							<span @dblclick="clearValbyfiled">
							<Input icon="search" readonly="readonly" :placeholder="$t('lang_platform.autoTask.atskdfGetvalbyclmNameIns')" v-model="atskdfGetvalbyclmName" @on-click="pickData2"/>
							</span>
						</FormItem>
					</i-col>

					<i-col span="24">
						<FormItem :label="$t('lang_platform.autoTask.atskdfComment')" >
							<Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.autoTask.atskdfCommentIns')" v-model="form.atskdfComment" />
						</FormItem>
					</i-col>
				</Form>
			</Row>
			<Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
		</div>
		<transition name="fade">
			<searchSurveyVar v-show="openSurveyVar" @closeSurVar="closeSurVar" :searchSurVar="searchSurVar" @inputSurveyVar="inputSurveyVar" :params="paramsSurVar" ref="searchSurveyVar"></searchSurveyVar>
		</transition>
		<transition name="fade">
			<searcheMailVar v-show="openMailVar" @closeMailVar="closeMailVar" :searchMailVar="searchMailVar" @inputMailVar="inputMailVar" :params="paramsMailVar" ref="searcheMailVar"></searcheMailVar>
		</transition>
		<transition name="fade">
			<searchSmsVar v-show="openSmsVar" @closeSmsVar="closeSmsVar" :searchSmsVar="searchSmsVar" @inputSmsVar="inputSmsVar" :params="paramsSmsVar" ref="searchSmsVar"></searchSmsVar>
		</transition>
    <transition name="fade">
      <searchWxVar v-show="openWxVar" @closeWxVar="closeWxVar" :searchWxVar="searchWxVar" @inputWxVar="inputWxVar" :params="paramsWxVar" ref="searchWxVar"></searchWxVar>
    </transition>
    <transition name="fade">
      <searchValbyfiled v-show="openPick2" :searchCloumns="searchCloumns2" :params="params2" @closeUp="close2" @changeinput="changeinput2" ref="searchValbyfiled"></searchValbyfiled>
    </transition>
	</div>
</template>
<script>
	import searchSurveyVar from '../../../components/searchTable/searchSurveyVar'
	import searcheMailVar from '../../../components/searchTable/searcheMailVar'
	import searchSmsVar from '../../../components/searchTable/searchSmsVar'
  import searchWxVar from '../../../components/searchTable/searchWxVar'
  import searchValbyfiled from '../../../components/searchTable/searchPlatValbyfiled'
	import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
	import { isSuccess, deepCopy } from '../../../lib/util'

	export default {
		data() {
			return {
//				logType: '',
        atskdfMailvarName: '',
        atskdfSurveyvarName: '',
        atskdfSmsvarName: '',
        atskdfWxvarName: '',
        atskdfGetvalbyclmName: '',
				form: {
					atskdfClmmark: '',
					atskdfClmcn: '',
					atskdfClmen: '',
					atskdfMailvar: '',
					atskdfSurveyvar: '',
					atskdfSmsvar: '',
          atskdfWxvar: '',
					atskdfGetvalbyclm: '',
					atskdfComment: '',
				},
				rowId: '',
				openSurveyVar: false,
        openPick2: false,
				searchSurVar: [
					{
						title: this.$t('lang_platform.autoTask.platSvaCname'),
						key: 'platSvaCname',
						sortable: 'custom',
					},
					{
						title: this.$t('lang_platform.autoTask.platSvaName'),
						key: 'platSvaName',
						sortable: 'custom',
					},
				],
				paramsSurVar: {
					_mt: 'platSurveyvar.getPage',
					sort: 'id',
					order: 'desc',
					rows: '10',
					page: 1,
					funId: '1',
					logType: '调查变量',
				},
				openMailVar: false,
				searchMailVar: [
				  {
						title: this.$t('lang_platform.autoTask.sysmlvarName'),
						key: 'sysmlvarName',
						sortable: 'custom',
					},
					{
						title: this.$t('lang_platform.autoTask.sysmlvarMark'),
						key: 'sysmlvarMark',
						sortable: 'custom',
					},
				],
				paramsMailVar: {
					_mt: 'platSysmailVar.getPage',
					sort: 'id',
					order: 'desc',
					rows: 10,
					page: 1,
					funId: '1',
					logType: '邮件变量',
				},
				openSmsVar: false,
				searchSmsVar: [
				  {
						title: this.$t('lang_platform.autoTask.syssmsvarName'),
						key: 'syssmsvarName',
						sortable: 'custom',
					},
					{
						title: this.$t('lang_platform.autoTask.syssmsvarMark'),
						key: 'syssmsvarMark',
						sortable: 'custom',
					},
				],
				paramsSmsVar: {
					_mt: 'platSyssmsVar.getPage',
					sort: 'id',
					order: 'desc',
					rows: 10,
					page: 1,
					funId: '1',
					logType: '短信变量',
				},
        openWxVar: false,
        searchWxVar: [
          {
            title: this.$t('lang_platform.autoTask.syswxvarName'),
            key: 'syswxvarName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.syswxvarMark'),
            key: 'syswxvarMark',
            sortable: 'custom',
          },
        ],
        paramsWxVar: {
          _mt: 'platSyswxVar.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '微信变量',
        },
        params2: {
          _mt: 'platValdefinefield.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns2: [
          {
            title: this.$t('lang_platform.autoTask.sourceName'),
            key: 'sourceName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.vffPropname'),
            key: 'vffPropname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autoTask.vffProperty'),
            key: 'vffProperty',
            sortable: 'custom',
          },
        ],
        ruleValidate: {
          atskdfClmmark: [{ required: true, message: this.$t('lang_platform.autoTask.atskdfClmmarkIns'), trigger: 'blur' }],
          atskdfClmcn: [{ required: true, message: this.$t('lang_platform.autoTask.atskdfClmcnIns'), trigger: 'blur' }],
          atskdfClmen: [{ required: true, message: this.$t('lang_platform.autoTask.atskdfClmenIns'), trigger: 'blur, change' }],
        },
			}
		},
		props: {
			id: Number,
			logType: String,
		},
		components: {
			searchSurveyVar,
			searcheMailVar,
			searchSmsVar,
      searchWxVar,
      searchValbyfiled,
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
					_mt: 'platAutotaskDatadefine.getById',
					id: rowId,
					funId: '1',
					logType: '查询List信息',
				}
				getDataLevelUserLogin(params).then((res) => {
					if (isSuccess(res, t)) {
						t.form.atskdfClmmark = res.data.content[0].atskdfClmmark
						t.form.atskdfClmcn = res.data.content[0].atskdfClmcn
						t.form.atskdfClmen = res.data.content[0].atskdfClmen
						t.form.atskdfMailvar = res.data.content[0].atskdfMailvar
						t.form.atskdfSurveyvar = res.data.content[0].atskdfSurveyvar
						t.form.atskdfSmsvar = res.data.content[0].atskdfSmsvar
            t.form.atskdfWxvar = res.data.content[0].atskdfWxvar
						t.form.atskdfGetvalbyclm = res.data.content[0].atskdfGetvalbyclm
						t.form.atskdfComment = res.data.content[0].atskdfComment
            t.atskdfMailvarName = res.data.content[0].atskdfMailvarName
            t.atskdfSurveyvarName = res.data.content[0].atskdfSurveyvarName
            t.atskdfSmsvarName = res.data.content[0].atskdfSmsvarName
            t.atskdfWxvarName = res.data.content[0].atskdfWxvarName
            t.atskdfGetvalbyclmName = res.data.content[0].atskdfGetvalbyclmName
					}
				}).catch(() => {
					t.$Modal.error({
						title: this.$t('reminder.err'),
						content: this.$t('reminder.errormessage'),
					})
				})
			},
      close2() {
        const t = this
        t.openPick2 = false
      },
      changeinput2(name, id) {
        const t = this
        t.atskdfGetvalbyclmName = name
        t.form.atskdfGetvalbyclm = id
      },
      pickData2() {
        const t = this
        t.$refs.searchValbyfiled.getData(this.params2)
        t.openPick2 = true
      },
      clearValbyfiled() {
        const t = this
        t.atskdfGetvalbyclmName = ''
        t.form.atskdfGetvalbyclm = '0'
      },
			save() {
				const t = this
				const params = deepCopy(t.form)
				params._mt = 'platAutotaskDatadefine.addOrUpd'
				params.funId = '1'
				params.logType = this.$t('button.add')
				params.atskdfAtskid = t.id
				if (t.logType === this.$t('button.upd')) {
					params.logType = this.$t('button.upd')
					params.id = t.rowId
				}
        t.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                t.close()
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                }
                if (t.logType === this.$t('button.upd')) {
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
				t.form.atskdfClmmark = ''
				t.form.atskdfClmcn = ''
				t.form.atskdfClmen = ''
				t.form.atskdfMailvar = ''
				t.form.atskdfSurveyvar = ''
				t.form.atskdfSmsvar = ''
        t.form.atskdfWxvar = ''
				t.form.atskdfGetvalbyclm = ''
        t.atskdfMailvarName = ''
        t.atskdfSurveyvarName = ''
        t.atskdfSmsvarName = ''
        t.atskdfWxvarName = ''
        t.atskdfGetvalbyclmName = ''
				t.form.atskdfComment = ''
        t.$refs.form.resetFields()
			},
			close() {
				this.$emit('hideMsg')
				this.clear()
			},
			selectSurveyVar() {
		   	   const t = this
		   	   if (t.$store.state.atsk.atskdfSurveyvar1) {
		   	   	this.paramsSurVar.platSvaSuvid = t.$store.state.atsk.atskdfSurveyvar1
		   	   }
    		   t.$refs.searchSurveyVar.getData(this.paramsSurVar)
    		   t.openSurveyVar = true
		   },
		   closeSurVar() {
		   	const t = this
		   	t.openSurveyVar = false
		   },
		   inputSurveyVar(name, id) {
		   	const t = this
		   	t.atskdfSurveyvarName = name
		   	t.form.atskdfSurveyvar = id
		   },
		   dbSurVar() {
		   		const t = this
		   	t.atskdfSurveyvarName = ''
		   	t.form.atskdfSurveyvar = 0
		   },
		   selectMailVar() {
		   	 const t = this
		   	 if (t.$store.state.atsk.atskdfMailvar1) {
		   	 	this.paramsMailVar.sysmlvarMailid = t.$store.state.atsk.atskdfMailvar1
//		   	 	console.log(t.$store.state.atsk.atskdfMailvar1)
		   	 }
//		   	 console.log(this.paramsMailVar)
    		   t.$refs.searcheMailVar.getData(this.paramsMailVar)
    		   t.openMailVar = true
		   },
		   closeMailVar() {
		   	const t = this
		   	t.openMailVar = false
		   },
		   inputMailVar(name, id) {
		   	const t = this
		   	t.atskdfMailvarName = name
		   	t.form.atskdfMailvar = id
		   },
		   dbMailVar() {
		   		const t = this
		   	t.atskdfMailvarName = ''
		   	t.form.atskdfMailvar = 0
		   },
		   selectSmsVar() {
		   	 const t = this
		   	 if (t.$store.state.atsk.atskdfSmsvar1) {
		   	 	this.paramsSmsVar.syssmsvarSmsid = t.$store.state.atsk.atskdfSmsvar1
		   	 }
    		   t.$refs.searchSmsVar.getData(this.paramsSmsVar)
    		   t.openSmsVar = true
		   },
		   closeSmsVar() {
		   	const t = this
		   	t.openSmsVar = false
		   },
		   inputSmsVar(name, id) {
		   	const t = this
		   	t.atskdfSmsvarName = name
		   	t.form.atskdfSmsvar = id
		   },
		   dbSmsVar() {
		   	const t = this
		   	t.atskdfSmsvarName = ''
		   	t.form.atskdfSmsvar = 0
		   },
      selectWxVar() {
        const t = this
        if (t.$store.state.atsk.atskdfWxvar1) {
          this.paramsWxVar.syswxvarWxid = t.$store.state.atsk.atskdfWxvar1
        }
        t.$refs.searchWxVar.getData(this.paramsWxVar)
        t.openWxVar = true
      },
      closeWxVar() {
        const t = this
        t.openWxVar = false
      },
      inputWxVar(name, id) {
        const t = this
        t.atskdfWxvarName = name
        t.form.atskdfWxvar = id
      },
      dbWxVar() {
        const t = this
        t.atskdfWxvarName = ''
        t.form.atskdfWxvar = 0
      },
		},
	}
</script>
<style lang="scss" scoped>
	@import "../../../sass/updateAndAdd.scss";
	.btn {
		position: absolute;
		bottom: 20px;
		right: 36px;
	}
</style>
