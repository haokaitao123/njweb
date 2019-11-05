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
							<div class="addContent" v-show="addconShow">
								<Row>
									<Col span="12" offset="0">
									<FormItem label="标题" prop="title">
										<span>
											<Input placeholder="请输入标题" :disabled='disabled' v-model="form.title" />
										</span>
									</FormItem>
									</Col>
								</Row>
								<Row style="position:relative;z-index: 0;">
									<Col span="24" offset="0">
									<FormItem label="内容" prop="content">
										<div id="editor" style="z-index: 0;"></div>
										<div id="txt" v-show="false" v-model="form.content"></div>
									</FormItem>
									</Col>
								</Row>
								<Row>
									<Col span="24">
									<FormItem label="附件上传" prop="noticeAttach">
										<Row>
											<i-col span="3" v-show="!editdisabled">
												<Upload :before-upload="handleUpload" :format="['xls','xlsx','rar', 'txt', 'zip', 'ppt', 'xls', 'pdf','xlsx']"
												 action=" ">
													<Button type="ghost" icon="ios-cloud-upload-outline" :disabled="editdisabled">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button>
												</Upload>
											</i-col>
											<i-col span="20">
												<span v-if="file !== ''" @dblclick="clearFile(editdisabled)">
													<i-col span="22">
														<Input v-model="file.name" readonly="readonly">
														<span slot="prepend">
															<Icon type="folder" size="16"></Icon>
														</span>
														</Input>
													</i-col>
													<i-col span="2">
														<Button type="text" @click="uploadLocalFile" v-if="loadingStatus">{{$t('lang_platdoc.platDoc.plat_upload')}}</Button>
													</i-col>
												</span>
											</i-col>
										</Row>
									</FormItem>
									</Col>
								</Row>
								<div class="adds">
									<Row>
										<Col span="11">
										<FormItem label="链接名称" prop="attachments">
											<span>
												<Input placeholder="请输入链接名称" :disabled='disabled' v-model="form.attachments" />
											</span>
										</FormItem>
										</Col>
										<Col span="11" offset="1">
										<FormItem label="标签" prop="tag">
											<span>
												<Input placeholder="请输入标签" :disabled='disabled' v-model="form.tag" />
											</span>
										</FormItem>
										</Col>
									</Row>
									<div class="btns">
										<i-button style="margin-left: 70%;" @click="Consave" type="primary">保存</i-button>
									</div>
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
		uploadKnowledge,
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
	import E from "wangeditor";
	let editor = new E("#editor");
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
					attachments: '',
					categoryId: '',
					content: '',
					expired: '',
					id: '',
					link: '',
					tag: '',
					title: '',
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
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入知识内容',
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
		mounted() {
			//this.getSelectUser();
			editor.customConfig.pasteFilterStyle = false
			editor.customConfig.pasteTextHandle = function(content) {
				// content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
				if (content == '' && !content) return ''
				let str = content;
				//处理的标签里的多余代码
				str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '');
				str = str.replace('/(\\n|\\r| class=(")?Mso[a-zA-Z]+(")?)/g', '');
				let reg = new RegExp('<!--(.*?)-->', 'g')
				str = str.replace(reg, '');
				str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
				// str = str.replace(/<\/?[^>]*>/g, '')
				str = str.replace(/[ | ]*\n/g, '\n')
				str = str.replace(/&nbsp;/ig, '')
				console.log('富文本的content', JSON.parse(JSON.stringify(content)))
				console.log('****str修改后的content str', str)
				return str
			}
			editor.customConfig.onchange = function(html) {
				document.getElementById("txt").innerHTML = html;
			};
			editor.create();
			console.log(this.form.state, "form");
		},
		created() {},
		computed: {
			tableButton() {
				return this.$store.state.knowledge.id;
			}
		},
		methods: {
			getMsgFormSon(data, data1) {
				// this.msgFormSon = data
				console.log(data, data1)
				this.form.department = data
				this.departmentId = data1
			},
			sortable(column) {
				console.log('column', column)
				this.sort = column.key;
				console.log(this.sort)
				this.order = column.order;

				if (this.order !== "normal") {
					this.getData(this.treeid);
				} else {
					this.order = "desc";
				}
			},
			dataClick(item) {
				console.log(item)
				this.itemTitle = item.title
				this.itemCreated = item.created
				this.itemAtt = item.attachments
			},
			revise(e) {
				console.log('213', e)
				const t = this;
				t.addShow = true;
				t.ifShow = false;
				t.ifShows = false;
				t.ifCollect = false;
			},
			Consave() {
				const t = this;
				this.form.content = document.getElementById("txt").innerHTML;
				t.$refs.form.validate(valid => {
					if (valid) {
						const t = this;
						var readyData = JSON.stringify({
							attachments: this.form.attachments,
							categoryId: this.form.categoryId,
							content: this.form.content,
							id: this.form.id,
							link: this.form.link,
							tag: this.form.tag,
							title: this.form.title,
							userId: this.$store.state.user.userId
						});
						console.log('readyData', readyData)
						//var headers = {'Content-Type':'application/x-www-form-urlencoded'};
						getKnowledgePost('ry/knowledge', {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								readyData
							})
							.then(function(response) {
								console.log(response);
								t.$Message.success('保存成功');
							})
							.catch(function(error) {
								t.$Message.error('保存失败');
								console.log(error);
							});
					}
				})
			},
			//上传
			uploadLocalFile() {
				const t = this;
				const formData = new FormData();
				formData.append("upfile", t.file);
				console.log(formData);
				uploadKnowledge(formData)
					.then(res => {
						for (const key in res.data) {
							t.file = {
								name: key
							};
							t.filekey = res.data[key];
							t.form.noticeAttach = key + ":" + res.data[key];
						}
						t.$Modal.success({
							title: this.$t("reminder.suc"),
							content: "上传成功",
							onOk: () => {
								t.loadingStatus = false;
							}
						});
					})
					.catch(() => {
						t.$Message.error(this.$t("reminder.errormessage"));
					});
			},
			clearFile (ckdis) {
			    if (!ckdis) {
			        this.$Modal.confirm({
			            title: this.$t("reminder.remind"),
			            content: "是否清除已上传的附件",
			            onOk: () => {
			                this.file = "";
			                this.filekey = "";
			                this.form.noticeAttach = "";
			                this.loadingStatus = false;
			            },
			            onCancel: () => { }
			        });
			    }
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
				editor.txt.clear();
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
			iframeDetail(id) {
				this.ifShow = false;
				this.ifShows = true;
				const t = this
				getKnowledgeGet('http://192.168.101.155/api/exam/ry/mustReadKnowledge', {
						params: {
							id: id
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
			closeAllotdept() {
				const t = this
				t.allotdeptState = false
			},
			handleUpload(file) {
				this.loadingStatus = true;
				let fileName = file.name
				let fileType = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()
				if (fileType !== 'doc' && fileType !== 'docx') {
					this.file = file
				} else {
					this.$Message.error({
						content: "暂不支持word格式",
						duration: 2,
					})
				}
				return false;
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
