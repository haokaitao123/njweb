<template>
    <div class="cover">
        <div class="box">
            <row>
                <i-col class="meau-left"
                       span="5">
                    <Menu :active-name="active"
                          width="auto"
                          @on-select="pageTo">
                        <!--主子表左侧页面布局-->
                        <MenuItem name="option">基础信息管理</MenuItem>
                        <MenuItem name="payLadder,payBystages"
                                  :disabled="logType==='新增'"
                                  @click.native="logType==='新增'?tips():''">阶梯项目管理</MenuItem>
                    </Menu>
                </i-col>
                <i-col class="meau-right"
                       span="19">
                    <div class="title">
                        <div class="title-text">
                            <Icon type="mouse"
                                  size="16"
                                  style="margin-right: 10px;"></Icon>
                            {{logType}}
                        </div>
                        <Button type="text"
                                @click="handleReset">
                            <Icon type="close-round"
                                  size="16"></Icon>
                        </Button>
                    </div>
                    <div style="margin-top: 40px;padding: 10px;">
                        <!--主表详细信息页面 -->
                        <mOption v-show="option"
                                 ref="option"
                                 :index="index"
                                 :modity="modity"
                                 @update="update"
                                 @newData="newData"></mOption>
                         <!--子表分页页面 mainid为主表id-->
                        <payLadder,payBystages v-show="payLadder,payBystages"
                                      ref="payLadder,payBystages"></payLadder,payBystages>
                    </div>
                </i-col>
            </row>
        </div>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
} from "@/axios/axios";
import { isSuccess, deepCopy, getUrlKey, GetQueryString } from "@/lib/util";
import mOption from "./payProjbaseEdit";
import payLadder,payBystages from "./payLadder,payBystages/payLadder,payBystages";
export default {
    data () {
        return {
            //初试默认选中
            active: "option",
            option: true,
            payLadder,payBystages: false,
            //获取子表funid mt名称
            funId_mt: 'sysFunctions.getIdByCode'
        };
    },
    components: {
        mOption,
        payLadder,payBystages,
    },
    props: {
        index: Number,
        modity: String
    },
    computed: {
        id () {
            return this.$store.state.payProjbase.mainId;
        },
        logType () {
            return this.$store.state.payProjbase.logType;
        }
    },
    methods: {
        // 关闭方法 分别调用本页面 父页面 主表详细信息页面 子表分页的清除方法  无需变更
        handleReset () {
            this.$emit("closeUp");
            this.clear();
        },
        // 主表信息查询方法 无需变更
        getOption (id, logType) {
            this.$refs.option.disabled = false
            if (logType == "修改" || logType == "查看") {
                this.$refs.option.getData(id);
            }
            if (logType == "查看") {
                this.$refs.option.disabled = true
            }
        },
        tips () {
            this.active = "option";
            this.$Message.warning('请先保存数据!');
        },
        //       根据name分别调用 主表或子表的查询方法 无需变更
        pageTo (name) {
            if (this.logType === "新增") {
                return;
            }
            this.option = false;
            this.payLadder,payBystages = false;
            this.$refs.option.clear();
            this.$refs.payLadder,payBystages.clear();
            this.active = name;
            this[name] = true;
            if (name !== "option") {
                //this.getChildFunId(name)
                this.$refs[name].search('获取');
            } else {
                this.$store.commit('setChildFunId', "");
                this.getOption(this.id, this.logType);
            }
        },
        // 获取子表funId
        getChildFunId (name) {
            const t = this;
            let code = "";
            if (name == "payLadder,payBystages") {
                code = '350200'
            } 
            this.$store.commit('setFunCode', code);
            const data = {
                _mt: this.funId_mt,
                funCode: code
            }
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        let childCode = res.data.content[0].value;
                        this.$store.commit('setChildFunId', childCode);
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                });
        },
        // 清空方法 初始化本页面参数 
        clear () {
            this.option = true;
            this.payLadder,payBystages = false;
            this.active = "option";
            this.$refs.option.clear();
            this.$refs.payLadder,payBystages.clear();
            this.$store.commit('setChildFunId', "");
            let funcode = getUrlKey('code');
            this.$store.commit('setFunCode', funcode);
            this.$store.commit('payProjbase/setMainId', "")
            this.$store.commit('payProjbase/setLogType', "");
        },
        // 修改数据更新父页面列表 
        update (data) {
            this.$emit('update', data)
        },
        // 新增数据更新父页面列表 
        newData (data) {
            this.$emit('newData', data)
        },
    }
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
@import "../../../sass/updateMainBase";
</style>

