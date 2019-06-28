<template>
    <div class="noData">
        <div class="noDataImg">
            <img src="../../../static/function/dimission.png"
                 alt="">
        </div>
        <x-button type="primary"
                  class="x_button"
                  @click.native="addNew()"
                  action-type="button">{{btnName}}</x-button>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
	props: {
		btnName: {
			type: String,
		},
	},
    methods: {
        addNew () {
            this.$emit('addNew')
        }
    },
}
</script>
<style lang="less" scoped>
.noData {
    height: calc(~"100% - 100px");
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .noDataImg {
        width: 406px;
        height: 406px;
        margin-top: 90px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .x_button {
        margin-top: 60px;
        width: 300px;
        font-size: 34px;
        height: 84px;
    }
}
</style>
