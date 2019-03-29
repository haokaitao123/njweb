<template>
    <div class="btnAuth"
         <span
         style="margin: 0;">
        <Button type="primary"
                icon="search"
                @click="search()">
            查询
        </Button>
        </span>
    </div>
</template>
<script>

export default {
    data () {
        return {
        }
    },
    props: {
    },
    computed: {
    },
    mounted () {

    },
    methods: {
        search () {
            this.$emit("Search")
        }
    },
}
</script>
<style lang="scss" scoped>
.btnAuth {
    display: inline-block;
    padding: 0 2px;
}
</style>