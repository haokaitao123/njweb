<template>
  <div class="cover">
    <div class="box" @click="clid">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_flow.flow.detailTitle')}}
        </div>
        <div>
          <!--<Button type="primary" size="small" @click="save">-->
            <!--保存-->
          <!--</Button>-->
          <Button type="text" @click="handleReset">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>
      </div>
      <div class="flowMain">
        <left-area :jsp="jsp" @save="save" @update-pos="updatePosition"></left-area>
        <right-area :jsp="jsp" :flstepFlow="flstepFlow" :pos="pos" ref="right"></right-area>
      </div>
    </div>
  </div>
</template>
<script>
  import LeftArea from './flowchartLeft'
  import RightArea from './flowchartRight'
  import Bus from '../../../.././lib/bus'
  export default {
    data() {
      return {
        flstepFlow: NaN,
        jsp: this.$jsplumb.getInstance(),
        pos: [0, 0],
      }
    },
    components: {
      LeftArea,
      RightArea,
    },
    methods: {
      clid() {
      },
      fun() {
      },
      save() {
        this.$refs.right.saveAll()
      },
      handleReset() {
        this.$emit('closeUp')
        this.$store.commit('flowStepData/setFlowId', '')
        this.$refs.right.clearAll()
      },
      updatePosition(pos) {
        this.pos = pos
      },
      open(id) {
        this.$refs.right.getListById(id)
        this.$store.commit('flowStepData/setFlowId', id)
        this.$refs.right.init()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
  .cover .box{
    padding: 40px 5px 20px 5px;
  }
  .flowMain{
    display: flex;
    flex-direction: column;
  }
  .left-area{
    position: relative;
    /*border: 1px solid #eee;*/
    background-color: #fcfcfc;
    box-shadow: 0 3px 5px #eeeeee;
    height: 60px;
  }
  .right-area {
    position: relative;
  }
  .left-area {
    width: 100%;
  }
  .right-area {
    width: 100%;
    height: 450px;
    margin-top: 1%;
  }
  .jsp-label {
    background-color: white;
    padding: 0.4em;
    font: 12px sans-serif;
    color: #444;
    z-index: 21;
    border: 1px dotted gray;
    opacity: 0.8;
    cursor: pointer;
  }
  .jsp-label.jtk-hover {
    background-color: #5c96bc;
    color: white;
    border: 1px solid white;
  }

  .cover .box{
    width: 1280px;
  }
  .flowMain{
    height: 550px;
  }
</style>
