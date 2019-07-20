<template>
	<div class="option-main">
		<Spin size="large" fix v-if="spinShow"></Spin>
		<Row style="overflow-y: auto;" :style="{ maxHeight: disabled?'500px':'420px' }" ref="scrollBox">
			<Form :model="form" label-position="right" ref="form" :label-width="100" id="empForm" :rules="ruleValidate">

				<i-col span="11">
					<FormItem label="唯一编号" prop="numberCode">
						<Input v-model="form.numberCode" :disabled="true"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="雇员姓名" prop="empnhName">
						<Input v-model.trim="form.empnhName" :disabled="disabled" placeholder="请输入雇员姓名" @on-blur="cop()"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="曾用名" prop="empnhPtname">
						<Input v-model="form.empnhPtname" :disabled="disabled" placeholder="请输入你用过的名字"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="民族" prop="empnhNation">
						<Select v-model="form.empnhNation" :clearable="!disabled" :disabled="disabled" placeholder="请选择民族">
							<Option :value="item.paramCode" v-for="(item,index) in selectNation" :key="index" @click.native="getIdByType(item.paramCode,'empnhNation')">{{item.paramInfoCn}}</Option>
						</Select>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="部门名称" prop="deptId">
						<span @dblclick="disabled?'':cleardeptId()">
                            <Input v-model="unitFname"
                                   icon="search"
                                   :disabled="disabled"
                                   :readonly="true"
                                   placeholder="选择部门"
                                   @on-click="disabled?'':pickDeptData()" />
                        </span>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="岗位名称" prop="postId">
						<span @dblclick="disabled?'':dbPost()">
                            <Input placeholder="请选择岗位"
                                   icon="search"
                                   :readonly="true"
                                   :disabled='disabled'
                                   v-model="postFname"
                                   @on-click="disabled?'':selectPost()" />
                        </span>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="直接上级" prop="empnhPmp">
						<span @dblclick="disabled?'':dbclean()">
                            <Input v-model="empnhPmpDis"
                                   icon="search"
                                   :readonly="true"
                                   :disabled="disabled"
                                   placeholder="请选择员工"
                                   @on-click="disabled?'':pickEmpData()" />
                        </span>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="工作地点" prop="empnhWklocat">
						<span @dblclick="disabled?'':workplace()">
                            <Input v-model="empnhWklocatDis"
                                   icon="search"
                                   :disabled="disabled"
                                   :readonly="true"
                                   placeholder="选择工作地点"
                                   @on-click="disabled?'':pickData()" />
                        </span>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="证件类型" prop="empnhIdtype">
						<Select v-model="form.empnhIdtype" :clearable="!disabled" :disabled="disabled">
							<Option :value="item.paramCode" v-for="(item,index) in selectIdtype" :key="index" @click.native="getIdByType(item.paramCode,'empnhIdtype')">{{item.paramInfoCn}}</Option>
						</Select>
					</FormItem>
				</i-col>

				<i-col span="11">
					<FormItem label="证件号码" prop="empnhIdno">
						<Input v-model="form.empnhIdno" :disabled="disabled" @on-blur="monthCount()" placeholder="请输入证件号码"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="生效日期" prop="empnhSday">
						<DatePicker type="date" placeholder="请选择生效日期" :editable="false" :disabled="disabled" :readonly="disabled" v-model="form.empnhSday" style="width: 100%"></DatePicker>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="证件到期日" prop="empnhEday">
						<DatePicker type="date" placeholder="请选择证件到期日" :editable="false" :disabled="disabled" :readonly="disabled" v-model="form.empnhEday" style="width: 100%"></DatePicker>
					</FormItem>
				</i-col>

				<i-col span="11">
					<FormItem label="性别" prop="empnhGender">
						<Select v-model="form.empnhGender" :clearable="!disabled" :disabled="disabled" placeholder="请选择性别">
							<Option :value="item.paramCode" v-for="(item,index) in selectGender" :key="index" @click.native="getIdByType(item.paramCode,'empnhGender')">{{item.paramInfoCn}}</Option>
						</Select>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="出生日期" prop="empnhBirthdate">
						<DatePicker type="date" placeholder="请选择出生日期" :editable="false" :disabled="disabled" :readonly="disabled" v-model="form.empnhBirthdate" style="width: 100%"></DatePicker>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="手机号码" prop="empnhMobile">
						<Input v-model="form.empnhMobile" :disabled="disabled" placeholder="请输入手机号码"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="居住地址" prop="empnhResiaddr">
						<Input v-model="form.empnhResiaddr" :disabled="disabled" placeholder="请输入省.市.区.街道信息"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="身份证地址" prop="empnhRegaddr">
						<Input v-model="form.empnhRegaddr" :disabled="disabled" placeholder="请输入身份证地址"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="户籍性质" prop="empnhRegtype">
						<Select v-model="form.empnhRegtype" :clearable="!disabled" :disabled="disabled" placeholder="请选择户籍性质">
							<Option :value="item.paramCode" v-for="(item,index) in selectRegtype" :key="index" @click.native="getIdByType(item.paramCode,'empnhRegtype')">{{item.paramInfoCn}}</Option>
						</Select>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="个人邮箱" prop="empnhPersmail">
						<Input v-model="form.empnhPersmail" :disabled="disabled" placeholder="请输入个人邮箱"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="公司邮箱" prop="empnhCompmail">
						<Input v-model="form.empnhCompmail" :disabled="disabled" placeholder="请输入公司邮箱"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="QQ号码" prop="empnhQq">
						<Input v-model="form.empnhQq" :disabled="disabled" placeholder="请输入QQ号码"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="微信号" prop="empnhWechat">
						<Input v-model="form.empnhWechat" :disabled="disabled" placeholder="请输入微信号码"></Input>
					</FormItem>
				</i-col>

				<i-col span="11">
					<FormItem label="成本中心" prop="empnhCostcent">
						<span @dblclick="disabled?'':clearCostcenter()">
                            <Input v-model="empnhCostcentDis"
                                   icon="search"
                                   :disabled="disabled"
                                   :readonly=true
                                   placeholder="选择成本中心"
                                   @on-click="disabled?'':pickCostCenterkData()" />
                        </span>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="入职日期" prop="empnhEntrydate">
						<DatePicker type="date" placeholder="请选择入职日期" :editable="false" :disabled="disabled" :readonly="disabled" v-model="form.empnhEntrydate" @on-change="entrydateChange" style="width: 100%">

						</DatePicker>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="转正日期" prop="empnhIrmentdate">
						<DatePicker type="date" placeholder="请选择转正日期" :editable="false" :disabled="disabled" :readonly="disabled" v-model="form.empnhIrmentdate" style="width: 100%"></DatePicker>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="开户银行" prop="empnhSalbank">
						<span @dblclick="disabled?'':dbbkBank()">
                            <Input placeholder="请选择开户银行"
                                   icon="search"
                                   :readonly="true"
                                   :disabled="disabled"
                                   v-model="empnhSalbankDis"
                                   @on-click="disabled?'':selectBank()" />
                        </span>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="银行账号" prop="empnhSalaccount">
						<Input v-model="form.empnhSalaccount" :disabled="disabled" placeholder="请输入银行账号"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="户名" prop="empnhSalaccname">
						<Input v-model="form.empnhSalaccname" :disabled="disabled" placeholder="请输入户名"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="婚姻状况" prop="empnhMarriage">
						<Select v-model="form.empnhMarriage" :clearable="!disabled" :disabled="disabled" placeholder="请选择婚姻状况">
							<Option :value="item.paramCode" v-for="(item,index) in selectMarriage" :key="index" @click.native="getIdByType(item.paramCode,'empnhMarriage')">{{item.paramInfoCn}}</Option>
						</Select>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="政治面貌" prop="empnhPolitical">
						<Select v-model="form.empnhPolitical" :clearable="!disabled" :disabled="disabled" placeholder="请选择政治面貌">
							<Option :value="item.paramCode" v-for="(item,index) in selectPolitical" :key="index" @click.native="getIdByType(item.paramCode,'empnhPolitical')">{{item.paramInfoCn}}</Option>
						</Select>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="参加工作时间" prop="empnhFirstwkdate">
						<DatePicker type="date" placeholder="请选择参加工作时间" :editable="false" :disabled="disabled" :readonly="disabled" v-model="form.empnhFirstwkdate" style="width: 100%"></DatePicker>
					</FormItem>
				</i-col>

				<i-col span="11">
					<FormItem label="职称" prop="empnhTechtil">
						<Select v-model="form.empnhTechtil" :clearable="!disabled" :disabled="disabled" placeholder="请选择职称">
							<Option :value="item.paramCode" v-for="(item,index) in selectTechnicaltitle" :key="index" @click.native="getIdByType(item.paramCode,'empnhTechtil')">{{item.paramInfoCn}}</Option>
						</Select>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="职称专业" prop="empnhTechspec">
						<Input v-model="form.empnhTechspec" :disabled="disabled" placeholder="请输入职称专业"></Input>
					</FormItem>
				</i-col>
				<i-col span="11">
					<FormItem label="职称取得时间" prop="empnhTechdate">
						<DatePicker type="date" placeholder="请选择职称取得时间" :editable="false" :disabled="disabled" :readonly="disabled" v-model="form.empnhTechdate" style="width: 100%"></DatePicker>
					</FormItem>
				</i-col>

				<i-col span="23">
					<FormItem label="是否考勤" prop="empnhAttendyn">
						<RadioGroup v-model="form.empnhAttendyn">
							<Radio :label="item.paramCode" v-for="(item,index) in selectAttendy" :key="index" :disabled="disabled">{{item.paramInfoCn}}</Radio>
						</RadioGroup>
					</FormItem>
				</i-col>
				<i-col span="23">
					<FormItem label="附件上传" prop="fileKey">
						<Row>
							<i-col span="4" v-show="!disabled">
								<Upload :before-upload="handleUpload" action=" ">
									<Button type="ghost" icon="ios-cloud-upload-outline" :disabled="disabled">浏览</Button>
								</Upload>
							</i-col>
							<i-col span="18">
								<span v-if="file !== ''">
                                    <i-col span="21"
                                           @dblclick.native="disabled?'':clearFile()">
                                        <Input v-model="file.name"
                                               readonly="readonly">
                                        <span slot="prepend">
                                            <Icon type="folder"
                                                  size="16"></Icon>
                                        </span>
								</Input>
							</i-col>
							<i-col span="2">
								<Button type="text" @click="uploadLocalFile" v-if="loadingStatus">
                                            上传
                                        </Button>
								<Button type="text" @click="downloadFile" v-if="!loadingStatus">
                                            下载
                                        </Button>
							</i-col>
							</span>
				</i-col>
				</Row>
				</FormItem>
				</i-col>
				<i-col span="22">
					<FormItem label="备注" prop="note">
						<Input v-model="form.note" type="textarea" :disabled="disabled" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
					</FormItem>
				</i-col>
			</Form>

			<!--城市-->
			<transition name="fade">
				<searchCity v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchCity"></searchCity>
			</transition>
			<!--部门-->
			<transition name="fade">
				<searchDept v-show="openDeptPick" :searchDeptClo="searchDeptCloumns" :params="deptParams" @closeDept="closeDept" @inputDept="changeDeptInput" ref="searchDept"></searchDept>
			</transition>
			<!--岗位-->
			<transition name="fade">
				<searchPost v-show="openPost" @closePost="closePost" :searchPostClo="searchPostClo" @inputPost="inputPost" :params="paramsPost" ref="searchPost"></searchPost>
			</transition>
			<!--直接上級-->
			<transition name="fade">
				<searchEmpMaster v-show="openEmpMaster" :deptId="deptId" @closeModal="closeEmp" @inputModal="inputEmp" ref="searchEmpMaster"></searchEmpMaster>
			</transition>
			<!--银行-->
			<transition name="fade">
				<searchBank v-show="openBank" @closeBank="closeBank" :searchBankCol="searchBankCol" @inputBank="inputBank" :params="paramsBank" ref="searchBank"></searchBank>
			</transition>
			<!--成本中心-->
			<transition name="fade">
				<searchOrgcostcenter v-show="openCostCenter" :searchCloumns="searchCostCol" :params="paramsCostCenter" @closeUp="closeCostCenter" @changeinput="inputCostCenter" ref="searchOrgcostcenter"></searchOrgcostcenter>
			</transition>
		</Row>
		<!-- <div style="padding-bottom: 20px;"
                 >
                <Row type="flex"
                     justify="end">
                    <Col pull="1">
                    <Button type="primary"
                            @click="save">保存</Button>

                    </Col>
                </Row>
            </div> -->
		<Button class="btn" type="primary" @click="save" v-show="!disabled">{{$t('button.sav')}}</Button>
	</div>
</template>
<script>
	import {
		getDataLevelUserLoginNew,
		getDataLevelUserLogin,
		uploadFile
	} from "../../../../axios/axios";
	import { isSuccess, deepCopy } from "../../../../lib/util";
	import city from '@/lib/cityData'
	import valid from '../../../../lib/pub_valid'
	import searchCity from "../../../../components/searchTable/searchCity";
	import searchDept from '../../../../components/searchTable/searchDept'
	import searchPost from '../../../../components/searchTable/searchPost';
	import searchEmpMaster from '../../../../components/searchTable/searchEmpnhMaster'
	import searchBank from "../../../../components/searchTable/searchBank";
	import searchOrgcostcenter from '../../../../components/searchTable/searchOrgcostcenter'
	export default {
		data() {
			//身份证验证
			const idnocheck = (rule, value, idcheck) => {
				if(this.form.empnhIdtype === '01id') {
					if(valid.val_identity(value)) {
						return idcheck()
					}
					return idcheck(new Error(rule.message))
				}
				return idcheck()
			}
			//手机号验证
			const phonecheck = (rule, value, calphonecheck) => {
				if(valid.val_mobile(value)) {
					return calphonecheck()
				}
				return calphonecheck(new Error(rule.message))
			}
			//邮箱验证
			const mailcheck = (rule, value, mailcheck) => {
				if(value !== '' && value !== undefined) {
					if(valid.val_mail2(value)) {
						return mailcheck()
					}
					return mailcheck(new Error(rule.message))
				}
				mailcheck()
			}
			//数字验证
			const numberCheck = (rule, value, numberValCheck) => {
				if(value !== '' && value !== undefined) {
					if(valid.val_number103(value)) {
						return numberValCheck()
					}
					return numberValCheck(new Error(rule.message))
				}
				numberValCheck()
			}
			//日期验证
			const idCardTime = (rule, value, callback) => {
				if(value === "" || !value) {
					callback(new Error("请选择到期日期"));
				} else {
					//开始时间不能大于结束时间
					let startTimeNum = (new Date(this.form.empnhSday)).getTime();
					let endTimeNum = (new Date(this.form.empnhEday)).getTime();
					if(startTimeNum > endTimeNum) {
						callback(new Error('生效日期不能大于到期日期'))
					}
					callback()
				}
			};
			//日期验证
			const jobTime = (rule, value, callback) => {
				if(value === "" || !value) {
					callback(new Error("请选择入职日期"));
				} else {
					//开始时间不能大于结束时间
					let startTimeNum = (new Date(this.form.empnhEntrydate)).getTime();
					let endTimeNum = (new Date(this.form.empnhIrmentdate)).getTime();
					if(startTimeNum > endTimeNum) {
						callback(new Error('入职日期不能大于转正日期'))
					}
					callback()
				}
			};
			//居住地址验证
			const addressCheck = (rule, value, callback) => {
				if(value !== '' && value !== undefined) {
					let address = this.form.empnhResiaddr;
					if(value.length > 3) {
						return callback()
					}
					return callback(new Error('请输入详细的居住地址'))
				} else {

					callback(new Error('请输入居住地址'))
                }
            }
			//银行卡号码的验证
			// const backCardCheck = (rule, value, callback) => {
			// 	var pattern = /^([1-9]{1})(\d{14}|\d{18})$/,
			// 		str = value.replace(/\s+/g, "");
			// 	if(!pattern.test(str)) {
			// 		callback(new Error('请输入正确的银行卡号码'))
			// 	}
			// 	callback()
			// }
			return {
				disabled: false,
				popup: '',
				form: {
					_mt: 'empEmpnh.addOrUpd',
					numberCode: "XXXXXX", // 唯一编号
					empnhName: "", // 雇员姓名
					empnhPtname: "", // 曾用名
					empnhNation: "10", // 民族
					deptId: "", // 部门名称
					postId: "", // 岗位名称
					empnhPmp: "", // 直接上级
					empnhIdtype: "01id", // 证件类型
					empnhIdno: "", // 证件号码
					empnhSday: "", // 生效日期
					empnhEday: "", // 证件到期日
					empnhGender: "", // 性别
					empnhBirthdate: "", // 出生日期
					empnhMobile: "", // 手机号码
					empnhResiaddr: "",//"武汉市", // 居住地址
					empnhRegtype: "", // 户籍性质
					empnhRegaddr: "", // 身份证地址
					empnhPersmail: "", // 个人邮箱
					empnhCompmail: "", // 公司邮箱
					empnhQq: "", // QQ号码
					empnhWechat: "", // 微信号
					empnhWklocat: "1410", // 工作地点
					empnhEntrydate: "", // 入职日期
					empnhIrmentdate: "", // 转正日期
					empnhSalbank: "", // 开户银行
					empnhSalaccount: "", // 银行账号
					empnhSalaccname: "", // 户名
					empnhMarriage: "", // 婚姻状况
					empnhPolitical: "", // 政治面貌
					empnhFirstwkdate: "", // 参加工作时间
					empnhTechtil: "", // 职称
					empnhTechspec: "", // 职称专业
					empnhTechdate: "", // 职称取得时间
					fileKey: "", // 上传附件
					empnhAttendyn: "1", // 是否考勤
					empnhCostcent: "", //成本中心
					note: "", // 备注
				},
				// 弹出框相关参数
				openPick: false,
				empnhRegtypeDis: "", // 户籍性质显示字段
				empnhSalbankDis: "", // 开户银行显示字段
				empnhCostcentDis: "", // 成本中心显示字段 弹框
				empnhGenderDis: "", // 性别显示字段
				empnhNationDis: "", // 民族显示字段 弹框
				unitFname: "", // 部门名称显示字段 弹框
				postFname: "", // 岗位名称显示字段  弹框
				empnhPmpDis: "", // 直接上级显示字段 弹框
				empnhIdtypeDis: "", // 证件类型显示字段
				empnhRegaddrDis: "", // 身份证地址显示字段
				empnhAttendynDis: "", // 是否考勤显示字段
				empnhWklocatDis: "武汉市", // 工作地点显示字段 弹框
				empnhMarriageDis: "", // 婚姻状况显示字段
				empnhPoliticalDis: "", // 政治面貌显示字段
				empnhTechtilDis: "", // 职称显示字段
				file: '',
				filekey: '',
				loadingStatus: false,
				openDeptPick: false,
				openPost: false,
				openEmpMaster: false,
				openBank: false,
				openCostCenter: false,
				spinShow: false,
				deptId: "",
				//部门
				searchDeptCloumns: [{
						title: '部门编码',
						key: 'unitCode',
						sortable: 'custom',
					},
					{
						title: '部门名称',
						key: 'unitFname',
					},
				],
				deptParams: {
					_mt: 'orgUnits.getByOrgFramePageList',
					rows: 10,
					page: 1,
					sort: 'id',
					order: 'desc',
					logType: '部门',
					//unitType: '02dept',
					state: '02valid'
				},
				//岗位
				searchPostClo: [{
						title: '岗位编码',
						key: "postCode",
						sortable: "custom"
					},
					{
						title: '岗位名称',
						key: "postFname"
					},
				],
				paramsPost: {
					_mt: "orgPost.getDeptPage",
					rows: 10,
					page: 1,
					sort: "id",
					order: "desc",
					funId: "1107",
					logType: "岗位",
					state: '02valid'
				},
				//城市
				params: {
					_mt: "baseCity.getPage",
					sort: "cityCode3",
					order: "asc",
					rows: 10,
					page: 1,
					funId: "1",
					logType: "工作地方查询",
					data: {
						"cityIsvalid": "1",
						"cityType": "02city"
					}
				},
				searchCloumns: [{
						title: "城市名称",
						key: "cityName",
						sortable: "custom",
						width: 380
					},
					{
						title: "城市类型",
						key: "cityTypeName",
						sortable: "custom",
						width: 379
					}
				],
				//银行
				searchBankCol: [{
						title: '银行名称',
						key: "bankCname",
						sortable: "custom"
					},
					{
						title: '银行编码',
						key: "bankCode",
						sortable: "custom"
					}
				],
				paramsBank: {
					_mt: "baseBankinfo.getPage",
					rows: 10,
					page: 1,
					sort: "id",
					order: "desc",
					funId: "1100",
					logType: "开户银行"
				},
				//成本中心
				searchCostCol: [{
						title: "成本中心编码",
						key: 'costCode',
						sortable: 'custom',
					},
					{
						title: "成本中心名称",
						key: 'costName',
					},
				],
				paramsCostCenter: {
					_mt: 'orgCostcenter.getPage',
					sort: 'id',
					order: 'desc',
					rows: 10,
					page: 1,
					funId: '1',
					logType: '成本中心查询',
					data: '{}',
				},
				yesOrNo: [],
				selectGender: [],
				selectTechnicaltitle: [],
				selectMarriage: [],
				selectPolitical: [],
				selectNation: [],
				selectIdtype: [],
				selectRegtype: [],
				selectSalbank: [],
				selectAttendy: [],
				ruleValidate: {
					empnhName: [{
						required: true,
						message: "请输入姓名",
						trigger: "blur"
					}],
					empnhNation: [{
						required: true,
						message: "请选择民族",
						trigger: "blur"
					}],
					deptId: [{
						required: true,
						message: "请选择部门",
						trigger: "change"
					}],
					postId: [{
						required: true,
						message: "请选择岗位",
						trigger: "change"
					}],
					/*                empnhPmp: [
					                    {
					                        required: true,
					                        message: "请选择上级",
					                        trigger: "blur"
					                    }
					                ],*/
					empnhIdtype: [{
						required: true,
						message: "请选择证件类型",
						trigger: "blur"
					}],

					empnhIdno: [{
							required: true,
							message: "请输入证件号码",
							trigger: "blur"
						},
						{
							validator: idnocheck,
							message: '请填写正确的证件号码',
							trigger: 'blur'
						},
						/*                    {
						                        validator: numberCheck,
						                        message: '请输入正确的数字格式',
						                        trigger: 'blur'
						                    },*/
					],
					empnhSday: [{
						required: true,
						type: "date",
						validator: idCardTime,
						trigger: "change"
					}],
					empnhEday: [{
						required: true,
						type: "date",
						message: "请选择证件到期日",
						trigger: "change"
					}],
					empnhGender: [{
						required: true,
						message: "请选择性别",
						trigger: "change"
					}],
					empnhBirthdate: [{
						required: true,
						type: "date",
						message: "请选择出生日期",
						trigger: "change"
					}],
					empnhMobile: [{
							required: true,
							message: "请输入手机号码",
							trigger: "blur"
						},
						{
							validator: phonecheck,
							message: '请填写正确的手机号',
							trigger: 'blur'
						},
						{
							validator: numberCheck,
							message: '请输入正确的数字格式',
							trigger: 'blur'
						},
					],
					empnhResiaddr: [
						// {
						// required: true,
						// message: "请输入居住地址",
						// trigger: "blur"
						// },
						{
							validator: addressCheck,
							message: '请输入详细的居住地址',
							trigger: 'blur'
						},
					],
					empnhRegaddr: [{
						required: true,
						message: "请输入身份证地址",
						trigger: "blur"
					}],
					empnhRegtype: [{
						required: true,
						message: "请选择户籍性质",
						trigger: "blur"
					}],
					empnhPersmail: [{
						required: false,
						validator: mailcheck,
						message: "请填写正确的邮箱格式",
						trigger: "blur"
					}],
					empnhCompmail: [{
						required: false,
						validator: mailcheck,
						message: "请填写正确的邮箱格式",
						trigger: "blur"
					}],
					empnhQq: [{
						required: false,
						validator: numberCheck,
						message: '请输入正确的数字格式',
						trigger: 'blur'
					}, ],
					empnhWklocat: [{
						required: true,
						message: "选择工作地点",
						trigger: "change"
					}],
					empnhEntrydate: [{
						required: true,
						type: "date",
						validator: jobTime,
						trigger: "change"
					}],
					empnhIrmentdate: [{
						required: true,
						type: "date",
						message: "请选择转正日期",
						trigger: "change"
					}],
					empnhSalbank: [{
						required: true,
						message: "请选择开户银行",
						trigger: "change"
					}],
					empnhSalaccount: [{
							required: false,
                            validator: numberCheck,
                            message: '请输入正确的数字格式',
                            trigger: 'blur'
						},
					],
					empnhSalaccname: [{
						required: true,
						message: "请输入户名",
						trigger: "blur"
					}],
					empnhFirstwkdate: [{
						required: true,
						type: "date",
						message: "请选择参加工作时间",
						trigger: "change"
					}],
					empnhAttendyn: [{
						required: true,
						message: "请选择考勤",
						trigger: "change"
					}],
				}
			};
		},
		// 接收主子表页面参数 visaare一般不传
		props: {
			index: Number,
			modity: String
		},
		components: {
			searchCity,
			searchDept,
			searchPost,
			searchEmpMaster,
			searchBank,
			searchOrgcostcenter
		},
		computed: {
			id() {
				return this.$store.state.empMaster.mainId;
			},
			logType() {
				return this.$store.state.empMaster.logType;
			}
		},
		mounted() {
			this.getSelect();
		},
		methods: {
			//获取主表数据 无需变更
			getdata(id) {
				const t = this;
				t.spinShow = true;
				getDataLevelUserLogin({
						_mt: 'empEmpnh.getById',
						id: id,
						logType: '员工信息id查询',
					}).then(res => {
						if(isSuccess(res, t)) {
							t.form.numberCode = res.data.content[0].numberCode;
							t.form.empnhName = res.data.content[0].empnhName;
							t.form.empnhPtname = res.data.content[0].empnhPtname;
							t.form.empnhNation = res.data.content[0].empnhNation;
							t.form.deptId = res.data.content[0].deptId;
							t.form.postId = res.data.content[0].postId;
							t.form.empnhPmp = res.data.content[0].empnhPmp;
							t.unitFname = res.data.content[0].unitFname;
							t.postFname = res.data.content[0].postFname;
							t.empnhPmpDis = res.data.content[0].empnhPmpDis;
							t.form.empnhIdtype = res.data.content[0].empnhIdtype;
							t.form.empnhIdno = res.data.content[0].empnhIdno;
							t.form.empnhSday = res.data.content[0].empnhSday;
							t.form.empnhEday = res.data.content[0].empnhEday;
							t.form.empnhGender = res.data.content[0].empnhGender;
							t.form.empnhBirthdate = res.data.content[0].empnhBirthdate;
							t.form.empnhMobile = res.data.content[0].empnhMobile;
							t.form.empnhResiaddr = res.data.content[0].empnhResiaddr;
							t.form.empnhRegtype = res.data.content[0].empnhRegtype;
							t.form.empnhRegaddr = res.data.content[0].empnhRegaddr;
							t.form.empnhPersmail = res.data.content[0].empnhPersmail ? res.data.content[0].empnhPersmail : '';
							t.form.empnhCompmail = res.data.content[0].empnhCompmail ? res.data.content[0].empnhCompmail : '';
							t.form.empnhQq = res.data.content[0].empnhQq;
							t.form.empnhWechat = res.data.content[0].empnhWechat;
							t.form.empnhWklocat = res.data.content[0].empnhWklocat;
							t.empnhWklocatDis = res.data.content[0].empnhWklocatDis;
							t.form.empnhEntrydate = res.data.content[0].empnhEntrydate;
							t.form.empnhIrmentdate = res.data.content[0].empnhIrmentdate;
							t.form.empnhSalbank = res.data.content[0].empnhSalbank;
							t.empnhSalbankDis = res.data.content[0].empnhSalbankDis;
							t.form.empnhSalaccount = res.data.content[0].empnhSalaccount;
							t.form.empnhSalaccname = res.data.content[0].empnhSalaccname;
							t.form.empnhMarriage = res.data.content[0].empnhMarriage;
							t.form.empnhPolitical = res.data.content[0].empnhPolitical;
							t.form.empnhFirstwkdate = res.data.content[0].empnhFirstwkdate;
							t.form.empnhTechtil = res.data.content[0].empnhTechtil;
							t.form.empnhTechspec = res.data.content[0].empnhTechspec;
							t.form.empnhTechdate = res.data.content[0].empnhTechdate;
							t.form.empnhAttendyn = res.data.content[0].empnhAttendyn;
							t.empnhCostcentDis = res.data.content[0].empnhCostcentDis;
							t.form.note = res.data.content[0].note;
							if(res.data.content[0].fileKey) {
								t.file = {
									name: res.data.content[0].fileKey.split(':')[0]
								}
								t.filekey = res.data.content[0].fileKey.split(':')[1]
							}
						}
					})
					.catch(() => {
						this.$Message.error('网络错误');
					})
					.finally(() => {
						t.spinShow = false
					});;
			},
			cop() {
				this.form.empnhSalaccname = this.form.empnhName;
				if(this.form.empnhName !== "") {
					const t = this;
					getDataLevelUserLogin({
							_mt: "empEmpnh.getCompmailByName",
							logType: t.logType,
							name: t.form.empnhName,
						})
						.then(res => {
							if(isSuccess(res, t)) {
								let empnhCompmail = res.data.content[0].empnhCompmail;
								if(empnhCompmail) {
									this.form.empnhCompmail = empnhCompmail
								}
							}
						})
						.catch(() => {
							t.$Message.error('网络错误');
						});
				}

			},
			//查询公共参数
			getSelect() {
				const t = this;
				getDataLevelUserLogin({
						_mt: "baseParmInfo.getSelectValue",
						typeCode: 'nationtype,idtype,registerproperty,marrystatus,political,techlevel,gender,yesno'
					}).then(res => {
						if(isSuccess(res, t)) {
							t.selectNation = res.data.content[0].value[0].paramList;
							t.selectIdtype = res.data.content[0].value[1].paramList;
							t.selectRegtype = res.data.content[0].value[2].paramList;
							t.selectMarriage = res.data.content[0].value[3].paramList;
							t.selectPolitical = res.data.content[0].value[4].paramList;
							t.selectTechnicaltitle = res.data.content[0].value[5].paramList;
							t.selectGender = res.data.content[0].value[6].paramList;
							t.selectAttendy = res.data.content[0].value[7].paramList;
							console.log('123', t.selectGender);
						}
					})
					.catch(() => {
						this.$Message.error('网络错误');
					});
			},
			getIdByType(paramCode, type) {
				this.form[type] = paramCode;
				var tt = this.form[type];
			},

			//失去焦点事件
			monthCount() {
				if(this.form.empnhIdtype === '01id') {
					if(valid.val_identity(this.form.empnhIdno)) {
						let str = this.form.empnhIdno;
						let res = parseInt(str.substring(16, 17));
						console.log(res)
						if(res % 2 == 1) {
							this.form.empnhGender = '01male';
						} else {
							this.form.empnhGender = '02female';
						}
						let UUserCard = this.form.empnhIdno;
						this.form.empnhBirthdate = new Date(UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14))
						for(let v of city.cityData) {
							if(UUserCard.substring(0, 6) == v.code) {

								this.form.empnhRegaddr = v.title
							}
						}
					}
				}
			},

			//保存方法
			save() {
				const t = this;
				const data = deepCopy(t.form);
				data._mt = "empEmpnh.addOrUpd";
				data.logType = t.logType;
				data.id = t.id;
				if(t.logType === '修改') {
					data.id = t.id
				}
				// 日期字段进行转换
				if(data.empnhSday !== undefined) {
					data.empnhSday = data.empnhSday === "" ? "" : new Date(data.empnhSday).format("yyyy-MM-dd");
				}
				if(data.empnhEday !== undefined) {
					data.empnhEday = data.empnhEday === "" ? "" : new Date(data.empnhEday).format("yyyy-MM-dd");
				}
				if(data.empnhBirthdate !== undefined) {
					data.empnhBirthdate = data.empnhBirthdate === "" ? "" : new Date(data.empnhBirthdate).format("yyyy-MM-dd");
				}
				if(data.empnhEntrydate !== undefined) {
					data.empnhEntrydate = data.empnhEntrydate === "" ? "" : new Date(data.empnhEntrydate).format("yyyy-MM-dd");
				}
				if(data.empnhIrmentdate !== undefined) {
					data.empnhIrmentdate = data.empnhIrmentdate === "" ? "" : new Date(data.empnhIrmentdate).format("yyyy-MM-dd");
				}
				if(data.empnhFirstwkdate !== undefined) {
					data.empnhFirstwkdate = data.empnhFirstwkdate === "" ? "" : new Date(data.empnhFirstwkdate).format("yyyy-MM-dd");
				}
				if(data.empnhTechdate !== undefined) {
					data.empnhTechdate = data.empnhTechdate === "" ? "" : new Date(data.empnhTechdate).format("yyyy-MM-dd");
				}
				//        保存无需关闭页面 无需变更
				this.$refs.form.validate((valid) => {
					if(valid) {
						getDataLevelUserLoginNew(data)
							.then(res => {
								if(isSuccess(res, t)) {
									if(t.logType === '修改') {
										t.$Message.success('修改成功');
										t.$emit("update", res.data.content[0]);
									} else {
										t.$Message.success('新增成功');
										t.$store.commit('empMaster/setMainId', res.data.content[0].id);
										t.$store.commit('empMaster/setLogType', "修改");
										t.$emit("newdata", res.data.content[0]);
									}
								}
							})
							.catch(() => {
								this.$Message.error('网络错误');
							});
					}else{
                        this.$nextTick(function(){
                            let tt = document.querySelectorAll('.ivu-form-item-error');
                            if(tt[0].parentNode.offsetTop<this.$refs.scrollBox.$el.scrollTop){
                                this.$refs.scrollBox.$el.scrollTop = tt[0].parentNode.offsetTop
                            }
                        })
                    }
				});
			},
			clear() {
				const t = this;
				this.$refs.scrollBox.$el.scrollTop = "0";
				t.form = {};
				t.form.numberCode = "XXXXXX";
				t.form.empnhAttendyn = "1";
				t.form.empnhNation = "10";
				t.form.empnhIdtype = "01id";
				t.form.empnhWklocat = "1410";
				t.form.empnhResiaddr = "";//"武汉市";
				t.empnhRegtypeDis = ""; // 户籍性质显示字段
				t.empnhSalbankDis = ""; // 开户银行显示字段
				t.empnhCostcentDis = ""; // 成本中心显示字段 弹框
				t.empnhGenderDis = ""; // 性别显示字段
				t.empnhNationDis = ""; // 民族显示字段 弹框
				t.unitFname = ""; // 部门名称显示字段 弹框
				t.postFname = ""; // 岗位名称显示字段  弹框
				t.empnhPmpDis = ""; // 直接上级显示字段 弹框
				t.empnhIdtypeDis = ""; // 证件类型显示字段
				t.empnhRegaddrDis = ""; // 身份证地址显示字段
				t.empnhAttendynDis = ""; // 是否考勤显示字段
				t.empnhWklocatDis = "武汉市"; // 工作地点显示字段 弹框
				t.empnhMarriageDis = ""; // 婚姻状况显示字段
				t.empnhPoliticalDis = ""; // 政治面貌显示字段
				t.empnhTechtilDis = ""; // 职称显示字段
				t.file = '';
				this.$refs.form.resetFields();
				t.disabled = false

			},
			//城市
			close() {
				this.openPick = false;
			},
			changeinput(name, id) {
				this.empnhWklocatDis = name;
				this.form.empnhWklocat = id;
				//this.form.empnhResiaddr = this.empnhWklocatDis;
			},
			pickData() {
				const t = this
				this.popup = '0'
				this.$refs.searchCity.getData(this.params)
				this.openPick = true
			},
			workplace() {
				const t = this
				t.empnhWklocatDis = ''
				t.form.empnhWklocat = ''
			},
			//部门
			cleardeptId() {
				const t = this
				t.unitFname = ''
				t.form.deptId = ''
        t.form.postId = "";
        t.postFname = "";
        t.empnhPmpDis = ''
        t.form.empnhPmp = ''
			},
			pickDeptData() {
				const t = this
				const paramsDept = deepCopy(t.deptParams)
				t.$refs.searchDept.getData(paramsDept)
				t.openDeptPick = true
			},
			closeDept() {
				const t = this
				t.$refs.searchDept.unitCode = ''
				t.openDeptPick = false
			},
			changeDeptInput(name, id) {
				const t = this
				console.log(name, "name")
				t.unitFname = name
				t.form.deptId = id
        t.form.postId = "";
        t.postFname = "";
        t.empnhPmpDis = ''
        t.form.empnhPmp = ''
			},
			//岗位
			dbPost() {
				const t = this;
				t.form.postId = "";
				t.postFname = "";
			},
			selectPost() {
                const t = this;
                if(t.unitFname === "") {
                this.$Message.warning('请选择部门');
                }else{
                const paramsPost = deepCopy(t.paramsPost);
                paramsPost.deptId =  t.form.deptId;
                t.$refs.searchPost.getData(paramsPost);
                t.openPost = true;
                }
			},
			closePost() {
				const t = this;
				t.$refs.searchPost.postCode = "";
				t.openPost = false;
			},
			inputPost(name, id, postName, postId) {
				const t = this;
				t.postFname = name;
				t.form.postId = id;
			},
			//选择员工
			pickEmpData() {
				const t = this;
				if(t.unitFname === "") {
					this.$Message.warning('请选择部门');
				} else {
					console.log(t.form.deptId, " t.form.deptId")
					t.$store.commit('empMaster/setDeptId', t.form.deptId);
					t.$refs.searchEmpMaster.getData();
					t.openEmpMaster = true;
				}
			},
			closeEmp() {
				const t = this
				t.openEmpMaster = false
			},
			inputEmp(row) {
				const t = this
				t.empnhPmpDis = row.empnhName;
				t.form.empnhPmp = row.id;
			},
			dbclean() {
				const t = this
				t.empnhPmpDis = '';
				t.form.empnhPmp = '';
			},
			//银行
			selectBank() {
				const t = this;
				t.$refs.searchBank.getData(this.paramsBank);
				t.openBank = true;
			},
			inputBank(name, id) {
				const t = this;
				console.log(name, "name")
				t.empnhSalbankDis = name;
				t.form.empnhSalbank = id;
			},
			dbbkBank() {
				const t = this;
				t.empnhSalbankDis = "";
				t.form.empnhSalbank = "";
			},
			closeBank() {
				const t = this;
				t.$refs.searchBank.bankCname = "";
				t.openBank = false;
			},
			//成本中心
			clearCostcenter() {
				const t = this
				t.empnhCostcentDis = ''
				t.form.empnhCostcent = ''
			},
			pickCostCenterkData() {
				const t = this
				t.$refs.searchOrgcostcenter.getData(this.paramsCostCenter)
				t.openCostCenter = true
			},
			inputCostCenter(name, id) {
				const t = this
				t.empnhCostcentDis = name
				t.form.empnhCostcent = id
			},
			closeCostCenter() {
				const t = this
				t.openCostCenter = false
			},
			//附件上传
			handleUpload(file) {
				this.file = file
				this.loadingStatus = true
				return false
			},
			//上传
			uploadLocalFile() {
				const t = this
				const formData = new FormData()
				formData.append('upfile', t.file)
				console.log(formData)
				uploadFile(formData).then(res => {
					for(const key in res.data) {
						t.file = {
							name: key
						}
						t.filekey = res.data[key]
						t.form.fileKey = key + ':' + res.data[key]
					}
					this.$Message.success('上传成功');
					this.loadingStatus = false;
				}).catch(() => {
					this.$Message.error('网络错误');
				})
			},
			//下载
			downloadFile() {
				const t = this
				let data = {
					_mt: 'userMgmt.getfiletoken',
					isprivate: true,
					logType: '导出',
					filekey: t.filekey,
					expiresecs: 180,
				}
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
						localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
						if(this.isIE()) {
							window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
						} else {
							let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
							let link = document.createElement('a')
							link.href = doclink
							link.download = 'downloadfiletemp'
							link.setAttribute('download', 'downloadfiletemp');
							document.body.appendChild(link);
							link.click();
						}
						this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
						localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
					}
				}).catch(() => {
					this.$Message.error('网络错误');
				})
			},
			//清除附件
			clearFile(ckdis) {
				this.$Modal.confirm({
					title: this.$t("reminder.remind"),
					content: "是否清除已上传的附件",
					onOk: () => {
						this.file = ""
						this.filekey = ""
						this.form.fileKey = ""
						this.loadingStatus = false;
					},
					onCancel: () => {}
				})
			},
			//转正日期默认为入职日期3个月以后
			entrydateChange(date) {
				//this.empnhIrmentdate=date.setMonth(date.getMonth() + 3);
				date = new Date(date)
				let entryDate = date.setMonth(date.getMonth() + 6);
				console.log(new Date(entryDate).getDate() - 1, "123")
				entryDate = new Date(entryDate).setDate(new Date(entryDate).getDate() - 1);
				this.form.empnhIrmentdate = new Date(entryDate).format('yyyy-MM-dd')
			},

		}
	};
</script>
<style lang="scss" scoped>
	.option-main {
		position: relative;
		height: 500px;
		overflow-y: auto;
		.btn {
			position: absolute;
			bottom: 20px;
			right: 20px;
		}
	}

	// #empForm:after {
	//     clear: both;
	//     content: "";
	//     display: block;
	//     visibility: hidden;
	// }
</style>
