<template>
    <!-- 首页热门界面 -->
    <div class="hot">
        <div>
            <!-- 轮播图 -->
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(casual, index) in homecasual" :key="index"> 
                    <img :src="casual.imgurl" alt="" width="100%">
                </mt-swipe-item>
            </mt-swipe>
            <!-- 热门导肮 -->
            <div class="wrapper">
                <div class="scroller">
                    <ul>
                        <li>
                            <div v-for="(item, index) in homenav.data" :key="index">
                                <img :src="item.iconurl" alt="">
                                <span v-text="item.icontitle"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--商品列表-->
            <div class="shop-container">
                <ul class="shop-list">
                    <li class="shop-list-item" v-for="(shop, index) in homeshoplist.goods_list" :key="index">
                        <img :src="shop.image_url" alt="" width="100%">
                        <h4 class="list-item-title">{{shop.goods_name}}</h4>
                        <div class="list-item-bottom">
                            <div class="list-item-bottom-left">
                                <span class="list-item-bottom-left-price">¥{{shop.normal_price / 100}}</span>
                                <span class="">{{shop.sales_tip}}</span>
                            </div>
                            <div class="list-item-bottom-right">
                                <span class="item-user">
                                    <img :src="user.avatar" alt="" v-for="(user, index) in shop.bubble" :key="index">
                                </span>
                                <button>去拼单</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
//引入第三方滚动库，和对应的滚动条插件
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
BScroll.use(ScrollBar)

export default {
    created() {
        this.bscroll = null
        this.Hotbscroll = null
    },
    mounted() {
        this.reqHomeCasual()//获取到轮播数据
        this.reqHomeNav()//获取热门导航
        //this.reqHomeShopList()
        //获取首页商品列表
        this.$store.dispatch('reqHomeShopList',()=>{
            //避免无法滚动，数据大使用回调函数。当数据确定获得后再初始化滚动
            this.$nextTick(()=>{
                setTimeout(() => {
                    this._initHotBscroll()//初始化热门页面滚动
                }, 300);
            })    
        })
        //初始化热门导航滚动效果
        this.$nextTick(()=>{  
            this._initBscroll()//初始化滚动
        })
        
    },
    computed: {
        ...mapState(['homecasual','homenav','homeshoplist'])
    },
    methods: {
        ...mapActions(['reqHomeCasual','reqHomeNav','reqHomeShopList']),
        _initBscroll() {//初始化热门导航滚动
            this.bscroll = new BScroll('.wrapper', {
                scrollY: false,
                scrollX:true,
                scrollbar: true
            })
        },
        _initHotBscroll() {//初始化热门页面滚动
            this.Hotbscroll = new BScroll('.hot', {
                scrollY: true,
                click: true
            })
        }
    },
}
</script>

<style lang="stylus" scoped>
    @import "../../../common/stylus/mixins.styl"
    .hot
        overflow hidden !important
        width 100%
        height 100%
        background $bg
        .mint-swipe
            height 140px
            width 100%
        .wrapper
            width 100%
            height 14rem
            background-color #fff
            padding-top 1rem
            overflow hidden
            position relative
            .scroller
                width 64rem
                height 100%
                ul
                    list-style none
                    padding 0
                    margin 0
                    width 100%
                    height 100%
                    li
                        display flex
                        width 100%
                        height 6rem
                        flex-wrap wrap
                        div
                            display flex
                            flex-direction column
                            justify-content center
                            align-items center
                            font-size 1.2rem
                            width 8rem
                            height 6rem
                            img
                                width 3rem
                            span
                                text-align center
                                margin-top 0.5rem
        .shop-container
            background $bg
            padding-bottom 10rem
            .shop-list
                .shop-list-item
                    margin-top  1rem
                    background-color #fff
                    display flex
                    flex-direction column
                    .list-item-title
                        font-size 1.6rem
                        padding 1rem
                        line-height 2rem
                    .list-item-bottom
                        display flex
                        padding 1rem
                        justify-content space-between
                        align-items center
                        .list-item-bottom-left
                            display flex
                            justify-content space-between
                            align-items center
                            .list-item-bottom-left-price
                                font-size 2rem
                                font-weight bolder
                                color red
                                margin-right 1rem
                        .list-item-bottom-right
                            display flex
                            justify-content center
                            align-items center
                            .item-user
                                img
                                    width 3rem
                                    border-radius 50%
                                img:nth-child(odd)
                                    margin-right -6px
                            button
                                width 8rem
                                height 3rem
                                background-color #e02e24
                                border-radius 1rem
                                margin-left 1rem
                                color #fff
                                font-size 1.6rem




</style>