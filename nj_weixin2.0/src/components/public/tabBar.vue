<template>
	<div class="wrapper">
		<div v-for="i in tabbar" class="tabBar_box">
			<div class="tabTip" v-show="values > 0" v-if='i.title == "审批"'>
				<badge class="tips" :text="values"></badge>
			</div>
			<div class="tabbar_item" @click="tabTo(i.key)">
				<div class="tabbar_icon">
					<img :src="pKey == i.key?i.activeImgSrc:i.imgSrc">
				</div>
				<span class="font" :class="[pKey == i.key?'tabbar_active':'']">{{i.title}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Badge
	} from 'vux'
	import {
		getDataLevelUserLogin
	} from '@/axios/axios'
	import { isSuccess } from '@/lib/util'
	export default {
		components: {
			Badge
		},
		props: {
			pIndexKey: {
				type: [String],
			}
		},
		computed: {
			pKey() {
				return this.$store.state.pIndexKey
			},
			values() {
				return this.$store.state.tipNum;
			}
		},
		created() {
			this.getInfor()
		},
		data() {
			return {
				tabbar: [{
						title: "功能",
						key: "function",
						imgSrc: "../../../static/footer/kb_03-01.svg",
						activeImgSrc: "../../../static/footer/kb_04-01.svg"
					},
					{
						title: "审批",
						key: "approve",
						imgSrc: "../../../static/footer/sp_03-01-01.svg",
						activeImgSrc: "../../../static/footer/sp_04-01-01.svg"
					},
					{
						title: "我的",
						key: "mine",
						imgSrc: "../../../static/footer/kb_05-01.svg",
						activeImgSrc: "../../../static/footer/zy_06-01.svg"
					},
				],
			};
		},
		
		methods: {
			getInfor() {		
				console.log(window.localStorage.getItem('empId'))
				const t = this
				const data = {
					_mt: 'wxansrpttodo.getAllTodo',
					companyId: pubsource.companyId,
					empId: window.localStorage.getItem('empId'),
					tbName: 'all'
				}
				getDataLevelUserLogin(data).then((res) => {
					if (isSuccess(res, t)) {
						console.log(res)
						if (res.data.content[0].value) {
							const listRes = JSON.parse(res.data.content[0].value)
							console.log(listRes,'1')
							t.$store.commit('tabarTip', listRes.length);
						}
					}
				}).catch(() => {
					t.$store.commit('tabarTip', '0');
					t.$notify({
						message: '网络错误',
						duration: 1500,
						background: '#f44'
					});
				}).finally(() => {
					
				})
			},
			tabTo(_key) {
				if (this.pKey === _key) return;
				this.$store.commit('setPIndexKey', _key);
				this.$emit("tabTo", {
					status: "tabTo",
					data: {
						key: this.pKey
					}
				});
			}
		},
	};
</script>
<style scoped lang="less">
	.wrapper {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100px;
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
		z-index: 10;
		border-top: 1px solid #dcdcdc;

		.tabBar_box {
			flex: 1;

			.tabTip {
				display: inline-block;
				position: fixed;
				bottom: 60px;
				left: 53%;

				.tips {
					width: 30px;
					height: 30px;
					line-height: 30px;
					display: inline-block;
					border-radius: 50%;
				}
			}

			.tabbar_item {
				height: 100%;
				display: flex;
				flex-direction: column;
				// justify-content: space-around;
				align-items: center;

				.tabbar_icon {
					margin-top: 10px;

					img {
						width: 48px;
						height: 48px;
					}
				}

				.font {
					font-size: 24px;
					color: #666666;
					display: block;
					line-height: 1;
				}

				.tabbar_active {
					color: #339afe;
				}
			}
		}
	}
</style>
