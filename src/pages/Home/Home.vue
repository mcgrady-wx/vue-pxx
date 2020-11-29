<template>
    <!-- 首页 -->
    <div class="home">
        <!-- 可滑动导航 -->
        <ly-tab v-model="selectedId" :items="items" @change="handleChange(selectedId)"></ly-tab>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedId: 0,
            items: [
                {label: '热门',name:'hot'},
                {label: '服饰',name:'dress'},
                {label: '鞋包',name:'box'},
                {label: '母婴',name:'mbaby'},
                {label: '百货',name:'general'},
                {label: '食品',name:'food'},
                {label: '内衣',name:'shirt'},
                {label: '男装',name:'man'},
                {label: '电器',name:'ele'}
            ],
        }
    },
    mounted() {
        this._lybarBUG()//解决导航的BUG
    },
    methods:{
        handleChange(index){
            //console.log(index);
            this.$router.push(`/home/${this.items[index].name}`)
        },
        _lybarBUG(){//解决刷新后，路由正确，但导航初始化问题
            let name=this.$route.params.name //获得当前路由
            this.items.forEach((item,index)=>{//遍历导航
                if (item.name===name) {//找到当前导航的下标，赋值给selectedId
                    //console.log(index);
                    this.selectedId = index
                    return 
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .home
        width 100%
        height 100%
        overflow hidden
</style>