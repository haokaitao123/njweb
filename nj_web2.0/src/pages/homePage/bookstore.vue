<template>
  <i-col class="col" span="12">
    <card :bordered="false">
      <p slot="title" class="title"><Icon type="ios-book"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.bookStore.title')}}</span></p>
      <a href="#" slot="extra" @click="lookStore">
        <Icon type="more"></Icon>
      </a>
      <div class="block shorter" >
        <div class="block_row" v-for="(item,index) in knowledgeData" :key="index" @click="selectDetail(item)">
        	<Icon class="icon" type="ios-book"  color="#41b3f9"></Icon>
        	<div class="div">{{item.cmutKldPublish}}&nbsp;&nbsp;{{item.cmutKldTitle}}</div>
        </div>
      </div>
    </card>
    <transition name="fade">
    	<bookdetail v-show="isDetail" ref="bookdetail" @closeUp="closeUp"></bookdetail>
    </transition>
  </i-col>
</template>

<script>
	import bookdetail from '../cmutManage/cmutKnowledgeBase/bookDetail'
	import { isSuccess } from '../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../axios/axios'
	export default{
		data() {
			return {
				knowledgeData: [],
				isDetail: false,
			}
		},
		components: {
			bookdetail,
		},
		mounted() {
			this.getData()
		},
		methods: {
			lookStore() {
				const tag = {
	        title: this.$t('lang_homePage.bookStore.tagTitle'),
	        path: '/knowledgeStore',
	        name: 'knowledgeStore',
	      }
      	this.$store.commit('increateTag', tag)
      	this.$router.push('/knowledgeStore')
			},
			getData() {
				const t = this
				const data = {
          _mt: 'cmutKnowledge.getList',
         	funId: 1,
          logType: this.$t('button.ser'),
          sort: 'cmutKldPublish',
        	order: 'desc',
          cmutKldState: '03released',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
          	if (res.data.content[0].value) {
          		if (res.data.content[0].value.length <= 4) {
                for (let i = 0; i < res.data.content[0].value.length; i++) {
                  res.data.content[0].value[i].cmutKldPublish = res.data.content[0].value[i].cmutKldPublish.slice(0, 10) // 截取时间字符串
                }
          			t.knowledgeData = res.data.content[0].value
          		} else {
          			for (let i = 0; i < 4; i++) {
                  res.data.content[0].value[i].cmutKldPublish = res.data.content[0].value[i].cmutKldPublish.slice(0, 10) // 截取时间字符串
          				t.knowledgeData.push(res.data.content[0].value[i])
          			}
          		}
          	}
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
			},
			selectDetail(item) {
				const t = this
        localStorage.setItem('knowid', item.id)
        localStorage.setItem('bookStoreItem', JSON.stringify(item))
				t.lookStore()
				t.isDetail = true
				t.$refs.bookdetail.getData(item)
			},
			closeUp() {
				const t = this
				t.isDetail = false
			},
		},
	}
</script>

<style lang="scss" scoped>
  .block{
    font-size: 12px;
    height: 280px;
    overflow-y: auto;
    overflow-x: hidden;
  .block_row{
    height: 36px;
    position: relative;
    cursor: pointer;
    transition: all .3s;
    line-height: 36px;
  .icon{
    line-height: 36px;
    position: absolute;
  }
  .div{
    padding-left: 20px;
    padding-right: 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .icon_end{
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
  .block_row:hover{
    color: #2d8cf0;
  }
  }
  .shorter{
    height: 150px;
  }
</style>
