<template>
	<div>
		<orderlist v-if="$store.state.workOrder.listTemp"></orderlist>
		<orderdetail v-if="$store.state.workOrder.detailTemp"></orderdetail>
	</div>
</template>

<script>
	import orderlist from './myWorkOrder'
	import orderdetail from './orderDetail'

	export default{
    data() {
      return {
      }
    },
    computed: {
    },
    components: {
    	orderlist,
    	orderdetail,
    },
    mounted() {

    },
    methods: {
    },
  }
</script>

<style>
</style>
