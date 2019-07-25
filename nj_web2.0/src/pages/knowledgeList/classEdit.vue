<template>
	<div class="cover">
		<div class="box">
			<div class="title">
				<div class="title-text">
					<Icon type="mouse" size="16" style="margin-right: 11px;"></Icon>
					&nbsp;{{logTypes}}
				</div>
				<Button type="text" @click="handleReset">
					<Icon type="close-round" size="16"></Icon>
				</Button>
			</div>
			<div class="option-main">
				<Row style="max-height: 460px;overflow-y: auto;" ref="scrollBox">
					<Form ref="form" :label-width="120" :model="form" :rules="ruleValidate">
						<i-col span="22" offset="1">
							<div class="adds" v-show="addShow">
								<Row>
									<Col span="11">
									<FormItem label="类目名称:" prop="name">
										<span>
											<Input placeholder="请输入类目名称" :disabled='disabled' :maxLength=100 v-model="form.name" />
										</span>
									</FormItem>
									</Col>
									<Col span="11" offset="1">
									<FormItem label="是否通用" prop="universal">
										<Radio-group v-model="form.universal">
											<Radio label="是">

											</Radio>
											<Radio label="否">

											</Radio>
										</Radio-group>
									</FormItem>
									</Col>
								</Row>
								<Row>
									<Col span="11">
									<FormItem label="所属部门" prop="department" v-if="this.form.universal == '否'">
										<span @dblclick="disabled ? '' : cleardeptId()">
											<Input v-model="form.department" icon="search" :disabled="disabled" placeholder="选择部门" @on-click="disabled ? '' : pickDeptData()" />
										</span>
									</FormItem>
									</Col>
									<Col span="11">
									<FormItem label="所属部门" v-if="this.form.universal == '是' ">
										<span @dblclick="disabled ? '' : cleardeptId()">
											<Input v-model="form.department" icon="search" :disabled="disabled" placeholder="选择部门" @on-click="disabled ? '' : pickDeptData()" />
										</span>
									</FormItem>
									</Col>
								</Row>
								<div class="btns">
									<i-button @click="save" type="primary">保存</i-button>
								</div>
							</div>
						</i-col>
					</Form>
				</Row>
			</div>
			<!--部门-->
			<transition name="fade">
				<searchDept v-if="allotdeptState" @close="closeAllotdept" @func="getMsgFormSon" ref="allotdept"></searchDept>
			</transition>
		</div>
	</div>
</template>
<script>
	import searchDept from './department';
	import {
		getDataLevelUserLogin,
		getDataLevelNone,
		getDataLevelUserLoginNew,
		getKnowledgeGet,
		getKnowledgePost
	} from '@/axios/axios.js';
	import {
		isSuccess,
		deepCopy
	} from '@/lib/util';
	import valid from '@/lib/pub_valid';
	import qs from 'qs'
	export default {
		data() {
			return {
				editdisabled: false,
				file: "",
				filekey: "",
				fileName: "",
				coloData: [],
				departmentId: '',
				dataTree: [],
				treeheight: document.body.offsetHeight - 270,
				tableheight: document.body.offsetHeight,
				loading: false,
				fId: "0",
				selection: [],
				form: {
					ids: '', //知识id
					name: '', //分类名
					sorts: '', //排序
					pid: "", //父id
					department: '', //部门名称
					universal: '是', //是否通过
					userId: ''
				},
				comInfo: [],
				id: 0,
				conForm: {

				},
				noticeTitle: '',
				noticeContent: '',
				unitPidDis: '',
				noticePublish: '',
				ifShow: true,
				ifShows: false,
				value: '',
				unitFname: '',
				openDeptPick: false,
				postFname: '',
				addShow: false,
				addconShow: false,
				ifCollect: false,
				ifSelect: false,
				i: 0,
				units: '',
				partmId: '',
				itemTitle: '',
				itemCreated: '',
				itemAtt: '',
				allotdeptState: false,
				ruleValidate: {
					name: [{
						required: true,
						message: '请输入类目名称',
						trigger: 'blur'
					}],
					department: [{
						required: true,
						message: '请输入部门',
						trigger: 'blur'
					}]
				},
				disabled: false,
			};
		},
		props: {
			logType: String,
			logTypes: String,
			index: Number,
		},
		components: {
			searchDept
		},
		mounted() {},
		created() {},
		computed: {
			tableButton() {
				return this.$store.state.knowledge.id;
			}
		},
		methods: {
			getMsgFormSon(data, data1) {
				// this.msgFormSon = data
				//console.log(data, data1)
				this.form.department = data
				this.departmentId = data1
			},
			dataClick(item) {
				console.log(item)
				this.itemTitle = item.title
				this.itemCreated = item.created
				this.itemAtt = item.attachments
			},
			celectDate() {
				const t = this
				getKnowledgeGet('ry/mustReadKnowledge/search', {
						params: {
							page: '1',
							size: '20',
							sort: 'asc',
						}
					})
					.then((res) => {
						console.log(res, "res")
						t.coloData = res.data.content;

					})
					.catch((err) => {
						console.log(err);
					});
			},
			revise(e) {
				console.log('213', e)
				const t = this;
				t.addShow = true;
				t.ifShow = false;
				t.ifShows = false;
				t.ifCollect = false;
			},
			save() {
				const t = this;
				t.$refs.form.validate(valid => {
					if (valid) {
						t.postQuest()
					}
				})
			},
			postQuest() {
				const t = this;

				var ifPass = 1
				if (this.form.universal == '是') {
					ifPass = 1
				} else if (this.form.universal == '否') {
					ifPass = 0
				}
				//this.form.fatherId = this.tableButton() 
				var readyData = JSON.stringify({
					"operatorId": this.$store.state.user.userId,
					"operatorName": this.$store.state.user.name,
					"departmentId": this.departmentId,
					"level": this.form.tier,
					"name": this.form.name,
					"path": this.form.urlname,
					"pid": this.form.pid,
					"sort": this.form.sorts,
					"universal": ifPass,
					"updateBy": this.form.lastId
				});
				console.log('readyData', readyData)
				getKnowledgePost('ry/knowledgeCategory', {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						readyData
					})
					.then(function(response) {
						t.$Message.success('保存成功');
						console.log(response);
					})
					.catch(function(error) {
						t.$Message.error('保存失败');
						console.log(error);
					});
			},
			newAdd(fId) {
				this.form.pid = fId;
				const t = this;
				t.addShow = true;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = false;
				t.ifCollect = false;
			},
			newAdds(params) {
				console.log(params)
				this.form.name = params.row.title;
				this.form.pid = params.row.pid;
				this.form.sorts = params.row.sort;
				this.form.ids = params.row.id;
				const t = this;
				t.addShow = true;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = false;
				t.ifCollect = false;
			},
			seleEvnt() {
				const t = this;
				t.addShow = false;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = false;
				t.ifCollect = false;
				t.ifSelect = true;
				console.log(t.ifSelect)
			},
			colEvent() {
				const t = this;
				t.addShow = false;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = false;
				t.ifCollect = true;
				t.ifSelect = false;
				getKnowledgeGet('/ry/knowledge/search', {

					})
					.then((res) => {
						t.coloData = res.data.content[0].rows[0];
						console.log(t.coloData, "reswew")
					})
					.catch((err) => {
						console.log(err);
					});
			},
			addContent(params) {
				this.form.title = params.row.title;
				editor.txt.append(params.row.content);
				document.getElementById("txt").innerHTML = params.row.content;
				this.form.attachments = params.row.attachments;
				this.form.categoryId = params.row.categoryId;
				this.form.expired = params.row.expired;
				this.form.id = params.row.id;
				const t = this;
				t.addShow = false;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = true;
				t.ifCollect = false;
			},
			addC(Pid) {
				this.Pid = Pid;
				const t = this;
				t.addShow = false;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = true;
				t.ifCollect = false;
			},
			handleReset() {
				const t = this;
				this.form.title = '';
				this.form.attachments = '';
				this.form.categoryId = '';
				this.form.expired = '';
				this.form.id = '';
				this.form.content = '',
					this.form.units = '';
				this.form.department = '';
				this.form.name = '', //分类名
					this.form.sorts = '', //排序
					this.form.pid = "", //父id
					this.fId = "0",
					this.form.departmentId = '', //部门名称
					this.$refs.form.resetFields();
				this.$refs.scrollBox.$el.scrollTop = "0"
				t.$emit('closeUp');
			},
			readIform() {
				this.ifShows = false;
				this.ifShow = true;
				console.log(this.ifShows);
			},
			closeAllotdept() {
				const t = this
				t.allotdeptState = false
			},
			//上传
			uploadLocalFile() {
				const t = this;
				var readyData = JSON.stringify({
					file: t.file.name,
				});
				console.log('readyData', readyData)
				//var headers = {'Content-Type':'application/x-www-form-urlencoded'};
				getKnowledgePost('ry/upload', {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						readyData
					})
					.then(function(response) {
						console.log(response);
						t.$Message.success('上传成功');
					})
					.catch(function(error) {
						t.$Message.error('上传失败');
						console.log(error);
					});
			},
			handleUpload(file) {
				console.log(file)
				this.file = file;
				this.loadingStatus = true;
				return false;
			},
			//部门
			cleardeptId() {
				const t = this;
				t.unitFname = '';
				t.formValidate.deptId = '';
			},
			pickDeptData() {
				const t = this;
				t.allotdeptState = true;
			},
			closeDept(msg) {
				this.i = 0;
				console.log(msg)
				const t = this;
				t.$refs.searchDept.unitCode = '';
				t.openDeptPick = false;
			},
			changeDeptInput(name, id) {
				//console.log(section)
				const t = this;
				console.log(id, 'id');
				//t.departmentId = id;
				t.formValidate.deptId = id;
			}
		}
	};
</script>
<style lang="scss" scoped>
	.cover {
		position: fixed;
		overflow: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		-webkit-overflow-scrolling: touch;
		outline: 0;

		.box {
			position: relative;
			width: 900px;
			background-color: #fff;
			padding: 60px 0px 30px 20px;
			border-radius: 11px;

			.form {
				max-height: 800px;
				overflow-y: auto;
			}

			.title {
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

				.title-text {
					font-weight: bold;
					font-size: 14px;
				}
			}
		}
	}

	.option-main {
		position: relative;
		max-height: 500px;

		.itemWrap {
			>div {
				margin-top: 20px;
				font-size: 13px;
			}
		}
	}

	.btn {
		position: absolute;
		bottom: 20px;
		right: 50px;
	}

	.btn1 {
		position: absolute;
		bottom: 20px;
		right: 120px;
	}

	.itemDetail {}

	.detailWrap {
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		flex-wrap: wrap;

		.itemList {
			width: 40%;
			margin-top: 20px;
		}

		.items {
			width: 100%;
			font-size: 15px;
			height: 200px;
			text-indent: 25px;
		}

		.createTime {
			text-align: right;
			font-size: 15px;
		}
	}

	.collectWrap {
		display: flex;

		.collectDtail {
			width: 200px;
			height: 400px;
		}
	}

	.adds {
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		font-size: 20px;

		.input-list {
			margin-top: 20px;
		}

		.ivu-row {
			width: 100%;
		}

		.btns {
			margin-top: 50px;
			margin-left: 80%;
		}
	}
</style>
