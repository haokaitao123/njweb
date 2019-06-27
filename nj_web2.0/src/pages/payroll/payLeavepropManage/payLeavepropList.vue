<template>
	<div class="table">
		<Row>
			<Col span="24">
			<card>
				<p slot="title">
					<Icon type="mouse"></Icon>&nbsp;离职率基础信息
				</p>
				<Row>
					<Col span="24">
					<Row>
						<span @dblclick="clearUnitFname">
                  <Input
                    v-model="unitFname"
                    style="width: 200px"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择项目名称"
                    @on-click="unitFnamePick"
                  />
                </span>

						<!-- 页面按钮 -->
						<btnList @buttonExport="expData" @buttonAdd="openUp('','新增')" @buttonDel="deletemsg" @buttonSearch="search" @buttonImport="importExcel" @moditySelect="modityChange" :btnData="btnData" :FlowNode="FlowNode"></btnList>
					</Row>
					<!-- 表格 分页 -->
					<commonPage :imp_mt="imp_mt" :page_mt="page_mt" :exp_mt="exp_mt" :dele_mt="dele_mt" :state_mt="state_mt" :expDataTital="expDataTital" :table_height="table_height" :mockData="mockData" @tableBtn="tableBtn" ref="commonPage"></commonPage>
					</Col>
				</Row>
			</card>
			</Col>
		</Row>
		<!-- 新增修改弹窗页面  v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
		<transition name="fade">
			<update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @newData="addNewArray" @update="updateArray" ref="update"></update>
		</transition>
		<!--搜索 弹出选择框  -->
		<!-- <transition name="fade">
    <searchDept v-show="openUnitFname"
    @closeModal="closeUnitFname"
    @inputModal ="inputUnitFname"
    ref="unitFnameSearch"></searchDept>
    </transition>-->
	</div>
</template>
<script>
	import { isSuccess } from "@/lib/util";
	import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
	import commonPage from "@/components/commonPage/commonPage"; //公共页面组件
	import update from "./payLeavepropBase"; //新增修改组件
	import btnList from "@/components/btnAuth/btnAuth.js"; //按钮组件
	import searchDept from "@/components/searchTable/searchDept";

	export default {
		data() {
			return {
				// 导入的mt名称
				imp_mt: "payLeaveprop.importData",
				// 导出的mt名称
				exp_mt: "payLeaveprop.export",
				// 导出字段设置, code字段名 name列名
				expDataTital: [{
						code: "levpPer",
						name: "期间"
					},
					{
						code: "unitFname",
						name: "项目名称"
					},
					{
						code: "levpProp",
						name: "离职率"
					}
				],
				// 表格列字段
				columns: [{
						type: "selection",
						width: 54,
						fixed: "left",
						align: "center"
					},
					{
						key: "levpPer",
						title: "期间",
						sortable: "custom",
						width: 220
					},
					{
						key: "unitFname",
						title: "项目名称",
						sortable: "custom",
						width: 220
					},
					{
						key: "levpProp",
						title: "离职率",
						sortable: "custom",
						width: 220
					}
				],
				// 表格获取数据mt名称
				page_mt: "payLeaveprop.getPage",
				// 删除数据mt名称
				dele_mt: "payLeaveprop.delByIds",
				// 修改流程状态mt名称
				state_mt: "payLeaveprop.setStateByIds",
				//表格 id
				updateId: NaN,
				//操作类型
				logType: "",
				//对应列表index
				index: 0,
				//显示隐藏新增修改弹窗的变量
				openUpdate: false,
				//搜索参数
				searchParams: {
					unitFname: "",
					levpPer: ""
				},
				typeCode: "",
				//弹出选择框
				openUnitFname: false,
				unitFname: "",
				mockData: [{
					levpPer: "2017-2018",
					unitFname: "NAJIE",
					levpProp: "1%"
				}],

				table_height: document.body.offsetHeight - 280
			};
		},
		components: {
			searchDept,

			commonPage, //页面公共组件
			btnList, //按钮组件
			update //新增修改组件
		},
		computed: {
			//按钮数据
			btnData() {
				return this.$store.state.btnOperate.btnData;
			},
			//判断是不是流程节点
			FlowNode() {
				return this.$store.state.btnOperate.isFlowNode;
			}
		},
		beforeCreate() {
			//清空搜索数据
			this.$store.commit("commonPage/setParams", "");
		},
		mounted() {
			//列表字段存储
			this.getColumns();
		},
		methods: {
			//获取列表项字段
			getColumns() {
				this.$store.commit("commonPage/setColumns", this.columns);
			},
			//删除
			deletemsg() {
				this.$refs.commonPage.deletemsg();
			},
			//页面查询
			search() {
				this.$store.commit("commonPage/setParams", this.searchParams);
				this.$refs.commonPage.search();
			},
			//打开新增或修改弹窗
			openUp(id, logType, index) {
				const t = this;
				t.updateId = parseInt(id, 10);
				t.logType = logType;
				t.openUpdate = true;
				t.index = index;
				//主子表的主表
				t.$store.commit("payLeaveprop/setMainId", id);
				t.$store.commit("payLeaveprop/setLogType", logType);
				if(logType != "新增") {
					//t.$refs.update.getOption(id, logType);
				}
			},
			//点击表格查看或修改事件
			tableBtn(res) {
				let id = res.id;
				let logType = res.name;
				let index = res.index;
				this.openUp(id, logType, index);
			},
			//关闭新增修改弹窗
			closeUp() {
				this.openUpdate = false;
			},
			//新增后表格数据添加
			addNewArray(res) {
				this.$refs.commonPage.data.unshift(res);
			},
			//修改后表格数据更新
			updateArray(res) {
				this.$refs.commonPage.data.splice(this.index, 1, res);
			},
			//导出
			expData() {
				this.$refs.commonPage.expData();
			},
			//导入
			importExcel() {
				this.$refs.commonPage.importExcel();
			},
			//状态操作按钮
			modifystatus(type, name) {
				this.$refs.commonPage.modifystatus(type, name);
			},
			//修改流程状态
			modityChange() {
				this.$refs.commonPage.modityChange();
			},
			//获取下拉列表数据
			getSelectValue() {
				const t = this;
				getDataLevelUserLogin({
						_mt: "baseParmInfo.getSelectValue",
						logType: "查询下拉数据",
						typeCode: t.typeCode
					})
					.then(res => {
						if(isSuccess(res, t)) {}
					})
					.catch(() => {
						this.$Message.error(this.$t("reminder.errormessage"));
					});
			},
			clearUnitFname() {
				this.unitFname = "";
				this.searchParams.deptId = "";
			},
			unitFnamePick() {
				this.$refs.unitFnameSearch.getData();
				this.openUnitFname = true;
			},
			closeUnitFname() {
				this.openUnitFname = false;
			},
			inputUnitFname(row) {
				this.searchParams.deptId = row.deptId;
				this.unitFname = row.unitFname;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.table-form {
		margin: 10px 0;
	}
	
	.margin-right-10 {
		margin-right: 10px;
	}
</style>