<template>
    <div class="wrapper">
        <div v-for="i in tabbar"
             class="tabBar_box">
			 <!-- <div class="tabTip" v-show ="tipNum > 0" v-if='i.title == "审批"'>
			<badge class="tips"></badge> -->
			</div>
            <div class="tabbar_item"
                 @click="tabTo(i.key)">
                <div class="tabbar_icon">
                    <img :src="pKey == i.key?i.activeImgSrc:i.imgSrc">
                </div>
                <span class="font"
                      :class="[pKey == i.key?'tabbar_active':'']">{{i.title}}</span>
            </div>
			
        </div>
    </div>
</template>

<script>
import { Badge } from 'vux'
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
        pKey () {
            return this.$store.state.pIndexKey
        }
    },
    data () {
        return {
            tabbar: [
                {
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
			tipNum : 0
        };
    },
    methods: {
		getTipNum(){
					this.tipNum = JSON.parse(localStorage.getItem('tipNum'));
					console.log(this.tipNum)
		},
        tabTo (_key) {
			this.getTipNum()
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
		.tabTip{
			display: inline-block;
			position: fixed;
			bottom: 60px;
			left: 330px;
		.tips{
			width: 15px;
			height: 15px;
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