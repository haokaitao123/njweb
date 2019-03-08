<template>
  <div class="wrap">
    <div class="wrapMianPage" v-show="$route.meta.vShow">
      <router-link to="/mains/Online" class="col-footer" @click.native="changIma4">
        <div class="col-row">
          <img class="home_foooter_ima" :src="ima4">
        </div>
        <div class="col-row" ref="text4">HR助理</div>
      </router-link>
			<router-link to="/mains/spectaculars" class="col-footer" @click.native="changIma1">
				<div class="col-row">
					<img class="home_foooter_ima" :src="ima1">
				</div>
				<div class="col-row" ref="text1">看板</div>
			</router-link>
			<router-link to="/mains/mainActions" class="col-footer" @click.native="changIma2">
				<div class="col-row">
					<img class="home_foooter_ima" :src="ima2">
				</div>
				<div class="col-row" ref="text2">
					功能
				</div>
			</router-link>
			<router-link to="/mains/mainMine" class="col-footer" @click.native="changIma3">
				<div class="col-row">
					<img class="home_foooter_ima" :src="ima3">
				</div>
				<div class="col-row" ref="text3">我的</div>
			</router-link>
		</div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Bus from '../../lib/bus'
  export default {
    name: 'mainView',
    data() {
      return {
        bottomNav: '1',
        ima1: "../../../static/footer/zy_01-01.svg",
        ima2: "../../../static/footer/kb_04-01.svg",
        ima3: "../../../static/footer/kb_05-01.svg",
        ima4: "../../../static/footer/kf_08-01.svg",
      }
    },
    mounted() {
      this.$refs.text2.style.color = '#3399FF'
      console.log()
//      console.log(this.$router.path.indexOf('mains'))
      if(this.$route.path === '/mains/mainMine') {
        this.ima1 = "../../../static/footer/zy_01-01.svg";
        this.ima2 = "../../../static/footer/kb_03-01.svg";
        this.ima3 = "../../../static/footer/zy_06-01.svg";
        this.ima4 = "../../../static/footer/kf_07-01.svg";
        this.$refs.text1.style.color = ''
        this.$refs.text2.style.color = ''
        this.$refs.text3.style.color = '#3399FF'
        this.$refs.text4.style.color = ''
      }
      if(this.$route.path === '/mains/mainActions') {
        this.ima1 = "../../../static/footer/zy_01-01.svg";
        this.ima2 = "../../../static/footer/kb_04-01.svg";
        this.ima3 = "../../../static/footer/kb_05-01.svg";
        this.ima4 = "../../../static/footer/kf_07-01.svg";
        this.$refs.text1.style.color = ''
        this.$refs.text2.style.color = '#3399FF'
        this.$refs.text3.style.color = ''
        this.$refs.text4.style.color = ''

      }
      if(this.$route.path.indexOf('Online') !== -1) {
        this.ima1 = "../../../static/footer/zy_01-01.svg";
        this.ima2 = "../../../static/footer/kb_03-01.svg";
        this.ima3 = "../../../static/footer/kb_05-01.svg";
        this.$refs.text1.style.color = ''
        this.$refs.text2.style.color = ''
        this.$refs.text3.style.color = ''
        this.$refs.text4.style.color = '#3399FF'
      }
    },
    computed : {
      path() {
        return this.$route.path
      },
    },
    methods:{
    	changIma1(){
    		this.ima1 = "../../../static/footer/kb_02-01.svg";
    		this.ima2 = "../../../static/footer/kb_03-01.svg";
    		this.ima3 = "../../../static/footer/kb_05-01.svg";
        this.ima4 = "../../../static/footer/kf_07-01.svg";
    		this.$refs.text1.style.color = '#3399FF'
    		this.$refs.text2.style.color = ''
    		this.$refs.text3.style.color = ''
        this.$refs.text4.style.color = ''
        localStorage.setItem('allOneLine', 0)
    	},
    	changIma2(){
    		this.ima1 = "../../../static/footer/zy_01-01.svg";
    		this.ima2 = "../../../static/footer/kb_04-01.svg";
    		this.ima3 = "../../../static/footer/kb_05-01.svg";
        this.ima4 = "../../../static/footer/kf_07-01.svg";
        this.$refs.text1.style.color = ''
        this.$refs.text2.style.color = '#3399FF'
        this.$refs.text3.style.color = ''
        this.$refs.text4.style.color = ''
        localStorage.setItem('allOneLine', 0)
    	},
    	changIma3(){
    		this.ima1 = "../../../static/footer/zy_01-01.svg";
    		this.ima2 = "../../../static/footer/kb_03-01.svg";
    		this.ima3 = "../../../static/footer/zy_06-01.svg";
        this.ima4 = "../../../static/footer/kf_07-01.svg";
        this.$refs.text1.style.color = ''
        this.$refs.text2.style.color = ''
        this.$refs.text3.style.color = '#3399FF'
        this.$refs.text4.style.color = ''
        localStorage.setItem('allOneLine', 0)
//        Bus.$emit('getData')
    	},
      changIma4() {
        this.$refs.text1.style.color = ''
        this.$refs.text2.style.color = ''
        this.$refs.text3.style.color = ''
        this.$refs.text4.style.color = '#3399FF'
        this.ima4 = "../../../static/footer/kf_08-01.svg";
        this.ima2 = "../../../static/footer/kb_03-01.svg";
        this.ima3 = "../../../static/footer/kb_05-01.svg";
        this.ima1 = "../../../static/footer/zy_01-01.svg";
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .wrap{
    width:100%;
    height:100%;
    .wrapMianPage{
			position: fixed;
			display: flex;
			flex-direction: row;
			bottom: 0;
			z-index: 10;
			color: #757575;
			background-color: #fff;
			text-align: center;
			font-size: 20px;
			width: 100%;
			height: 100px;
				.col-row {
					flex: 1;
					text-align: center;
					margin-top: -5px;
				}

				.col-footer {
					flex: 1;
					color: #757575;
					display: flex;
					text-align: center;
					text-decoration: none;
					flex-direction: column;
				}

				.home_foooter_ima {
					margin-top: 14px;
					width: 46px;
					height: 40px;
				}
    }
  }

</style>
