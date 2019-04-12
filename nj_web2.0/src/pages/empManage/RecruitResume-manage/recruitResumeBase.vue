<template>
    <div class="cover">
        <div class="box">
            <row>
                <i-col class="meau-left"
                       span="4">
                    <Menu :active-name="active"
                          width="auto"
                          @on-select="pageTo">
                        <!--主子表左侧页面布局-->
                        <MenuItem name="option">
                        招聘简历管理
                        </MenuItem>
                        <MenuItem name="reeduc"
                                  v-show="id">
                        简历教育信息
                        </MenuItem>
                        <MenuItem name="rework"
                                  v-show="id">
                        简历工作经历
                        </MenuItem>
                        <MenuItem name="refam"
                                  v-show="id">
                        简历家庭成员
                        </MenuItem>
                    </Menu>
                </i-col>
                <i-col class="meau-right"
                       span="20">
                    <div class="title">
                        <div class="title-text">
                            <Icon type="mouse"
                                  size="16"
                                  style="margin-right: 10px;"></Icon>{{logType}}
                        </div>
                        <Button type="text"
                                @click="handleReset">
                            <Icon type="close-round"
                                  size="16"></Icon>
                        </Button>
                    </div>
                    <div style="margin-top: 40px;padding: 10px;">
                        <!--主表详细信息页面 visaare为特殊参数一般不传 其余无需变更-->
                        <mOption v-show="option"
                                 :logType="logType"
                                 ref="option"
                                 :id="id"
                                 @update="update"
                                 @newdata="newdata"></mOption>
                        <!--子表分页页面 mainid为主表id-->
                        <Reeduc v-show="reeduc"
                                :logType="logType"
                                ref="reeduc"
                                :mainId="id"></Reeduc>
                        <Rework v-show="rework"
                                :logType="logType"
                                ref="rework"
                                :mainId="id"></Rework>
                        <Refam v-show="refam"
                               :logType="logType"
                               ref="refam"
                               :mainId="id"></Refam>
                    </div>
                </i-col>
            </row>
        </div>
    </div>
</template>
<script>
import mOption from './recruitResumeView'
import Reeduc from './recruitReeducManage'
import Rework from './recruitReworkexpManage'
import Refam from './recruitRefamilyManage'
export default {
    data () {
        return {
            //        默认参数 无需变更
            active: 'option',
            option: true,
            reeduc: false,
            rework: false,
            refam: false,
            id: NaN,
            disabled: false,
            //        主表查询单条数据的mt
        }
    },
    components: {
        mOption,
        Reeduc,
        Rework,
        Refam,
    },
    props: {
        //      父页面传递参数  visaare一般不传
        logType: String,
        index: Number,
        params: Object,
    },
    mounted () {
    },
    methods: {
        //      关闭方法 分别调用本页面 父页面 主表详细信息页面 子表分页的清除方法  无需变更
        handleReset () {
            this.$emit('closeUp')
            this.clear()
        },
        // 主表信息查询方法 无需变更
        getOption (id, logType) {
            this.id = parseInt(id, 10)
            this.$refs.option.getData(this.id)
            this.$refs.option.disabled = this.disabled
        },
        //       根据name分别调用 主表或子表的查询方法 无需变更
        pageTo (name) {
            this.option = false
            this.reeduc = false
            this.rework = false
            this.refam = false
            this.active = name
            this.$refs.option.clear()
            this.$refs.reeduc.clear()
            this[name] = true
            if (name !== 'option') {
                this.$refs[name].disabled = this.disabled;
                this.$refs[name].id = this.id;
                this.$refs[name].search();
                this.$refs[name].logType = this.logType;
            } else {
                this.getOption(this.id, this.$t('button.upd'))
            }
        },
        //      清空方法 初始化本页面参数 无需变更
        clear () {
            this.option = true
            this.reeduc = false
            this.rework = false
            this.refam = false
            this.id = NaN
            this.active = 'option'
            this.$refs.option.clear()
            this.$refs.reeduc.clear()
            this.$refs.rework.clear()
            this.$refs.refam.clear()
        },
        //      更新父页面列表 无需变更
        update (data) {
            this.$emit('update', data)
        },
        //      更新父页面列表 无需变更
        newdata (data) {
            this.id = data.id
            this.$emit('newdata', data)
        },
    },
}
</script>
<style>
.ivu-menu-vertical.ivu-menu-light:after {
    background-color: transparent;
}
</style>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.header-box {
    display: flex;
    position: relative;
    justify-content: flex-end;
}
.cover .box {
    padding: 0;
}
.cover .box .form {
    margin-top: 60px;
}
.meau-left {
    margin-top: 30px;
}
.meau-right {
    position: relative;
    border-left: 2px solid #efefef;
}
.header-cover {
    display: none;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: rgba(0, 0, 0, 0.3);
}
.header-box:hover .header-cover {
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-box:hover {
    cursor: pointer;
}
.header {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

