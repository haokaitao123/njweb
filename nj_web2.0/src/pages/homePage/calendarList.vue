<template>
    <i-col class="col"
           span="16">
        <card :bordered="false">
            <p slot="title"
               class="title">
                <Icon type="android-notifications"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.calendarList.title')}}</span>
            </p>
            <a href="#"
               slot="extra"
               @click="openUp()">
                <Icon type="plus-round"></Icon>
            </a>
            <div class="block">
                <Row>
                    <i-col span="12"
                           style="font-size: 10px;">
                        <v-calendar :attributes='attrs'
                                    @dayclick='dayClicked'></v-calendar>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <div class="calendar_title">
                            <div class="day_block">
                                {{datePick}}
                            </div>
                            <div class="week_block">
                                <div>{{week}}</div>
                                <div>{{nlDate}}</div>
                            </div>
                            <div class="more_message"
                                 @click="openTablePage()">
                                <a>{{$t('lang_homePage.calendarList.moreMessage')}}</a>
                            </div>
                        </div>
                        <div class="block_row"
                             v-for="(item , index) in sysmlvarComment"
                             :key="index">

                            <Icon class="icon"
                                  type="volume-high"
                                  color="#f33155"></Icon>
                            <div class="div"
                                 @click="openUpdHome( item.id )">
                                {{item.remindTitle}}
                            </div>
                        </div>
                    </i-col>
                </Row>
            </div>
        </card>
        <!--style="height: 400px!important;overflow: scroll;"-->
        <el-dialog title="创建日程"
                   style="margin: 0 auto !important;"
                   width='850px'
                   :visible.sync="openUpdate"
                   @close="close">
            <addOrUpdate :dateShow="dateShow"
                         ref="addOrUpdate"
                         :id="id"
                         @closeTodo="close"
                         @rerender="getData"></addOrUpdate>
        </el-dialog>
        <el-dialog title="修改日程"
                   width='850px'
                   :visible.sync="openUpdateHome"
                   @close="close">
            <addOrUpdate ref="addOrUpdate"
                         :id="id"
                         :dateShow="dateShow"
                         @closechang="close"
                         @rerender="getData"></addOrUpdate>
        </el-dialog>
        <!-- <transition name="fade">
      <editCalendarList v-show="openUpdate"   :logType="logType"  @getData="getData"  @close="close" ref="editCalendarList"></editCalendarList>
    </transition> -->
        <transition name="fade">
            <calendarListPage v-if="openTable"
                              @close="close"
                              ref="calendarListPage"></calendarListPage>
        </transition>
        <!-- <transition name="fade">
      <update v-show="openUpdateHome" @close="close"  :logType="logType" ref="update"></update>
    </transition> -->
    </i-col>
</template>
<script>
import editCalendarList from './editCalendarList'
import addOrUpdate from './addOrUpdate'
import calendarListPage from './calendarListPage'
import { isSuccess, deepCopy } from '../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLoginNew4 } from '../../axios/axios'
import update from './editCalendarList'
import Bus from '../../lib/bus'
export default {
    data () {
        return {
            id: '',
            sysmlvarComment: [],
            openUpdate: false,
            openTable: false,
            openUpdateHome: false,
            dateShow: true,
            thisWeekDay: -1,
            logType: this.$t('lang_homePage.calendarList.view'),
            attrs: [
                {
                    key: 'today',
                    highlight: {
                        backgroundColor: '#fee4be',
                    },
                    dates: [
                        new Date(),
                    ],
                },
                {
                    key: 'pick',
                    highlight: {
                        backgroundColor: '#c5f9ff',
                    },
                    dates: [],
                },
                {
                    dot: {
                        backgroundColor: '#ff4d4d',
                    },
                    dates: [
                        new Date(2018, 2, 1),
                        new Date(2018, 2, 10),
                        new Date(2018, 2, 22),
                        new Date(2018, 2, 6),
                        new Date(2018, 2, 16),
                    ],
                },
            ],
            datePick: new Date().getDate().toString(),
            nlDate: GetLunarDay(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            remindStatime: new Date().format('yyyy-MM-dd'),
        }
    },
    props: {
        roleType: String,
    },
    components: {
        editCalendarList,
        calendarListPage,
        update,
        addOrUpdate,
    },
    computed: {
        remindType () {
            return this.$store.state.user.roleType
        },
        week () {
            return this.thisWeekDay === -1 ? this.dayToWeek(new Date().getDay()) : this.dayToWeek()
        },
    },
    mounted () {
        //   Bus.$on('calenderGetData', () => {
        //     this.getData()
        //   })
        //   setTimeout(() => {
        //     this.getData()
        //   }, 1000)
    },
    methods: {
        openUpdHome (id) {
            const t = this
            t.id = id
            t.openUpdateHome = true
            t.dateShow = true
            t.logType = this.$t('lang_homePage.calendarList.view')
            setTimeout(() => {
                this.$refs.addOrUpdate.getInfoById(id)
            }, 100);
            // t.$refs.update.showDis()
            // t.$refs.update.getSelect()
            // t.$refs.update.getData(id)
        },
        rerender () {

        },
        getData () {
            const t = this
            const data = {
                _mt: 'cmutRemind.getByList',
                remindStatime: t.remindStatime,
                remindPlat: t.$store.state.user.roleType,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.sysmlvarComment = res.data.content[0].value
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        openTablePage () {
            const t = this
            t.openTable = true
            setTimeout(() => {
                t.$refs.calendarListPage.getData()
            }, 100)
        },
        openUp () {
            const t = this
            t.openUpdate = true
            t.dateShow = true
            t.logType = this.$t('button.add')
            setTimeout(() => {
                this.$refs.addOrUpdate.getInfoById('')
            }, 100);
            // t.$refs.editCalendarList.getSelect()
        },
        close () {
            const t = this
            t.openUpdate = false
            t.openTable = false
            t.openUpdateHome = false
            t.$refs.addOrUpdate.resetFields()
        },
        dayClicked (date) {
            console.log(date.date.format('yyyy-MM-dd'))
            this.remindStatime = date.date.format('yyyy-MM-dd')  //  获取发布日期
            let dateStr = date.year + '-' + date.month + '-' + date.day
            this.thisWeekDay = date.weekday - 1
            this.datePick = date.day + ''
            //        this.week = this.dayToWeek()
            this.nlDate = GetLunarDay(date.year, date.month, date.day)
            this.attrs[1].dates = [new Date(dateStr)]
            this.getData()
        },
        dayToWeek (day) {
            let week = ''
            if (!day) {
                day = this.thisWeekDay
            }
            switch (day) {
                case 0: week = this.$t('lang_homePage.calendarList.week.sun')
                    break
                case 1: week = this.$t('lang_homePage.calendarList.week.mon')
                    break
                case 2: week = this.$t('lang_homePage.calendarList.week.tue')
                    break
                case 3: week = this.$t('lang_homePage.calendarList.week.wed')
                    break
                case 4: week = this.$t('lang_homePage.calendarList.week.thu')
                    break
                case 5: week = this.$t('lang_homePage.calendarList.week.fri')
                    break
                case 6: week = this.$t('lang_homePage.calendarList.week.sat')
                    break
            }
            return week
        },
    },
    watch: {
        remindType (value) {
            this.getData()
        },
    },
}
</script>
<style lang="scss" scoped>
.block {
    font-size: 12px;
    height: 280px;
    overflow-y: auto;
    overflow-x: hidden;
    .block_row {
        height: 36px;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;
        line-height: 36px;
        .icon {
            line-height: 36px;
            position: absolute;
        }
        .div {
            padding-left: 20px;
            padding-right: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .icon_end {
            position: absolute;
            width: 24px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            border-radius: 50%;
            right: 0;
            top: 5px;
        }
    }
    .block_row:hover {
        color: #2d8cf0;
    }
}
.calendar_title {
    display: flex;
    position: relative;
    width: 100%;
    .day_block {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 48px;
        font-weight: bold;
    }
    .week_block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 60px;
        div {
            height: 20px;
            line-height: 20px;
        }
    }
    .more_message {
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>
