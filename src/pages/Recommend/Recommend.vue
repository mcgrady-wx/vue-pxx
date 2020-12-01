<template>
    <!-- 推荐页面 -->
    <div class="recommend" >
        <div v-if="userInfo.id">
            <ShopList
                v-for="(item, index) in recshoplist"
                :item=item
                :key="index"
                @clickCellBtn="buyOne"
            />
        </div>   
        <select-login v-else/>
    </div>
    
</template>

<script>
import ShopList from '../../components/ShopList/ShopList'
import {mapActions,mapState} from 'vuex'
import BScroll from '@better-scroll/core'
import SelectLogin from '../Login/SelectLogin'
import { Toast , Indicator  } from 'mint-ui';
export default {
    data() {
        return {
            page: 1,//请求页数
            count: 10, //一次请求数量
            ballflag:false
        }
    },
    created() {
        this.RecBscroll=null
    },
    mounted() {
        if (this.userInfo.id) {
            this.reqRecShopList({page: this.page, count: this.count})
        }    
    },
    computed:{
        ...mapState(['recshoplist','userInfo'])
    },
    methods:{
        ...mapActions(['reqRecShopList','addGoods']),
        _initRecBscroll() {//初始化热门页面滚动
            this.RecBscroll = new BScroll('.recommend', {
                scrollY: true,
                click: true
            });
            //console.log(this.RecBscroll.maxScrollY)
            //监听滚动，实现上拉、下拉
            this.RecBscroll.on('touchEnd',({x,y})=>{
                //console.log(y)
                if (y>=30) {//下拉刷新
                    Indicator.open('刷新中...')
                    setTimeout(() => {
                        Indicator.close()
                        Toast({
                            message: '刷新成功',
                            position: 'middle',
                            duration: 2000
                        });
                    }, 1500);
                    
                } else if (this.RecBscroll.maxScrollY>y+30) {//上拉加载更多
                    Indicator.open('加载更多...')
                    this.reqRecShopList({page: this.page, count: this.count})
                }
            })

        },
        buyOne(item){//点击购买
            //console.log(item)  addGoods
            /*{
                "goods_id": 101758846,
                "goods_name": "【冰薇儿】高腰弹力大码胖mm牛仔裤女长裤春秋季松紧腰九分显瘦",
                "thumb_url": "http://t00img.yangkeduo.com/goods/images/2018-08-07/8af1aade86ac71055c6de10f9c089ce9.jpeg",
                "price": 3960,
                "buy_count": 1,
                "is_pay": 0
            }*/
            //获得需要的商品数据
            let good={
                "goods_id": item.goods_id,
                "goods_name": item.goods_name,
                "thumb_url": item.thumb_url,
                "price": item.price,
                "buy_count": 1,
                "is_pay": 0
            }
            //添加到vuex的购物车数据中
            this.addGoods(good)
        }
    },
    watch: {
        recshoplist(){//监视数据变化初始化滚动
            this.page++
            if (this.RecBscroll) {
                setTimeout(() => {
                    this.RecBscroll.refresh()
                }, 500);
                
            } else {
                this.$nextTick(()=>{
                    //做延迟处理
                    setTimeout(() => {
                        this._initRecBscroll()
                    }, 500);
                    
                })
            }
            Indicator.close()
            Toast({
                message: '加载成功',
                position: 'middle',
                duration: 2000
            });    
        }
    },
    components:{
        ShopList,
        SelectLogin
    }
}
</script>

<style lang="stylus" scoped>
    .recommend
        width 100%
        height 100%
        background-color: #f5f5f5;
        overflow hidden
        div
            padding-bottom 5rem
            display flex
            flex-wrap wrap
</style>