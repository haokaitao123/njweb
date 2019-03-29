<template>
    <div class="moditySelect">
        <Dropdown>
            <Button type="primary">
                {{Name}}
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <span v-for="(item,index) in dropdownMenuList"
                      :key="index"
                      @click="getPageByState(item.funStatecode,item.funName)">
                    <DropdownItem>{{item.funName}}</DropdownItem>
                </span>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
export default {
    data () {
        return {
            data: [],
            Name: this.statusDis,
            funStatecode: this.status
        }
    },
    props: {
        dropdownMenuList: {
            type: Array,
            default: [],
        },
        statusDis: '',
        status: '',
    },
    mounted () {

    },
    computed: {
        operate () {
            return this.$store.state.btnOperate.pageOperate
        }
    },
    methods: {
        getPageByState (funStatecode, funName) {
            this.funStatecode = funStatecode;
            this.Name = funName;
            var obj = {
                "funStatecode": funStatecode,
                "funName": funName
            }
            let array = this.operate;
            let temp = [];
            let pageShow = ""
            for (var i = 0; i < array.length; i++) {
                if (array[i].modityName == this.funStatecode) {
                    temp.push(array[i].btnName)
                }
            }
            if (temp.length > 1) {
                pageShow = "button_opt_upd";
                this.$store.commit('btnOperate/setPageShow', pageShow);
            } else if (temp.length == 1) {
                this.$store.commit('btnOperate/setPageShow', temp[0]);
            } else {
                this.$store.commit('btnOperate/setPageShow', "");
            }
            this.$store.commit('btnOperate/setModity', this.funStatecode)
            this.$emit('getPageByState', obj);
        }
    },
}
</script>
<style lang="scss" scoped>
.moditySelect {
    display: inline-block;
    padding: 0 2px;
}
</style>
