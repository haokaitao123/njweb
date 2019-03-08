<template>
  <div class="left-area">
    <div class="item small">
      <div class="start center" ref="start">
        <div class="text">
          <Icon type="record"></Icon>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" version="1.1" >
          <ellipse cx="15" cy="15" rx="15" ry="15" style="fill:#19be6b"/>
        </svg>
      </div>
    </div>
    <!--<div class="item">-->
      <!--<div class="diamond center2 " ref="diamond">-->
      <!--</div>-->
    <!--</div>-->
    <div class="item">
      <div class="approval center " ref="approval">
        <div class="text">approval</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="36px" version="1.1">
          <rect width="80" height="36" rx="6" ry="6" style="fill:#f1a710" />
        </svg>
      </div>
    </div>
    <div class="item small">
      <div class="end center" ref="end">
        <div class="text">
          <Icon type="close-round"></Icon>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" version="1.1" >
          <ellipse cx="15" cy="15" rx="15" ry="15" style="fill:#ff6600"/>
        </svg>
      </div>
    </div>
    <div style="right: 0;position: absolute; padding:15px">
      <Button type="primary" @click="save">
        {{$t('button.sav')}}
      </Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LeftArea',
    props: {
      jsp: {
        type: Object,
      },
    },
    data() {
      return {
      }
    },
    methods: {
      init() {
        this.jsp.draggable([this.$refs.approval, this.$refs.start, this.$refs.end], {
          clone: true,
          drag: params => {
            this.$emit('update-pos', params.pos)
          },
        })
      },
      save() {
        this.$emit('save')
      },
    },
    mounted() {
      this.init()
    },
  }
</script>

<style lang="scss" scoped>
  .left-area {
    display:flex;
    .item{
      margin-left: 20px;
      position: relative;
      width: 80px;
      height: 60px;
    }
  }
  .jtk-drag{
    z-index: 999;
  }
  .text{
    position: absolute;
    color: #fff;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .center {
    position: absolute;
    width: 80px;
    height: 36px;
    top: calc(50% - 18px);
    left: calc(50% - 40px);
    div{
      cursor: pointer;
    }
  }
  .start,.end{
    width: 30px;
    height: 30px;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
  .text{
    position: absolute;
    color: #fff;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  }
</style>
