<template>
    <!-- 搜索页面 -->
    <div class="search">
        <!--搜索导航-->
        <search-nav :showSearchPanel="showSearchPanel"/>
        <div class="shop">
            <!--左边-->
            <div class="menu-wrapper">
                <ul>
                    <li class="menu-item" v-for="(goods, index) in searchgoods.data"
                        :key="index"
                        :class="{current: index === currentIndex}"
                        @click="clickLeftItem(index)"
                        ref = 'menulist'
                    >
                        <span>{{goods.name}}</span>
                    </li>
                </ul>
            </div>
            <!--右边-->
            <div class="shop-wrapper">
                <ul ref="shopsParent">
                    <li class="shops-li" v-for="(goods, index1) in searchgoods.data" :key="index1">
                        <div class="shops-title">
                            <h4>{{goods.name}}</h4>
                            <a href="">查看更多 ></a>
                        </div>
                        <ul class="phone-type" v-if="goods.tag === 'phone'">
                            <li v-for="(phone, index) in goods.category" :key="index">
                                <img :src="phone.icon" alt="">
                            </li>
                        </ul>
                        <ul class="shops-items">
                            <li v-for="(item, index2) in goods.items" :key="index2">
                                <img :src="item.icon" alt="">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <!--搜索面板-->
        <search-panel v-if="isShow"  :showSearchPanel="showSearchPanel"/>
    </div>
</template>

<script>
import SearchNav from './children/SearchNav'
import SearchPanel from './children/SearchPanel'
import {mapActions,mapState} from 'vuex'
import BScroll from '@better-scroll/core'
export default {
    data() {
        return {
            scrollY: 0, // 右侧列表滑动的Y轴坐标(实时更新)
            rightLiTops: [], // 所有分类的头部位置
            isShow: false //是否显示搜索界面
        }
    },
    mounted() {
        this.reqSearchGoods()
    },
    computed:{
        ...mapState(['searchgoods']),
        currentIndex(){//左侧选项的样式
            let {rightLiTops,scrollY}=this
            return rightLiTops.findIndex((rightLiTop,index)=>{
                //当右侧滚动的时候，左侧联动滚动
                this._leftScroll(index)
                return scrollY>=rightLiTop && scrollY<rightLiTops[index+1]
            })
        }   
    },
    methods:{
        ...mapActions(['reqSearchGoods']),
        clickLeftItem(index){//点击左侧，右侧跳转到对应位置
            this.scrollY=this.rightLiTops[index] //获得需要移动的距离，改变左侧样式
            this.rightBscroll.scrollTo(0,-this.rightLiTops[index],300)//右侧移动到对应位置
        },
        showSearchPanel(data){//显示搜索面板
            this.isShow=data
        },
        //初始化滚动
        _initBScroll(){
            //左侧滚动
            this.leftBscroll = new BScroll('.menu-wrapper', {
                scrollY: true,
                click: true
            });
            //右侧滚动
            this.rightBscroll = new BScroll('.shop-wrapper', {
                scrollY: true,
                probeType: 2,
                click: true
            });
            //给右侧混蛋绑定事件获得scrollY的值
            this.rightBscroll.on('scroll',({x,y})=>{
                this.scrollY=Math.abs(y)
            })
            //如果probeType的值为3，就不需要监听scrollEnd，这样节约资源
            this.rightBscroll.on('scrollEnd',({x,y})=>{
                this.scrollY=Math.abs(y)
            })
        },
        //求出右侧板块所有项距离顶部的距离
        _initRightLiTops(){
            let arr=[]//保存所有的li标签距离顶部的距离
            let top = 0;//距离距离顶部的距离
            arr.push(top) //第一个li标签距离顶部0
            //得到所有的li标签
            let lis = this.$refs.shopsParent.getElementsByClassName('shops-li')
            //把lis转换成真数组，遍历获得距离顶部的位置
            Array.prototype.slice.call(lis).forEach((li,index) => {
                // 解决左侧无法点击显示最后一栏的BUG，找到右侧最后一栏增加最大滚动距离
                if(index === lis.length - 1){
                    //li.style.paddingBottom =`${window.innerHeight - li.clientHeight - 100}px !important`;
                    this.rightBscroll.maxScrollY=this.rightBscroll.maxScrollY-(window.innerHeight - li.clientHeight - 100)
                    //console.log(this.rightBscroll.maxScrollY)                   
                }   
                top+=li.clientHeight
                arr.push(top)
            });
            this.rightLiTops=arr
            //console.log(this.rightLiTops)
        },
        //右侧滚动的时候左侧连动
        _leftScroll(index){
            //获得左侧所有的li标签
            let leftlis=this.$refs.menulist
            //console.log(leftlis)
            //获得应该移动到的li标签
            let el=leftlis[index]
            this.leftBscroll.scrollToElement(el,300,0,-100)
        }
    },
    watch: {
        searchgoods(){
            this.$nextTick(()=>{
                this._initBScroll() //初始化滚动
                this._initRightLiTops() //求出右侧板块所有项距离顶部的距离
            })
            
        }
    },
    components:{
        SearchNav,
        SearchPanel
    }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    background #F5F5F5
    width 100%
    height 100%
    overflow hidden

    .shop
      display flex
      position absolute
      top 60px
      bottom 50px
      width 100%
      overflow hidden

      .menu-wrapper
        background-color #e0e0e0
        width 80px
        flex 0 0 80px

        .menu-item
          width 100%
          height 60px
          background-color: #fafafa
          display flex
          justify-content center
          align-items center
          font-weight lighter
          color #666666
          position relative

        .current
          color #e02e24

        .current::before
          content: ''
          background-color #e02e24
          width 4px
          height 30px
          position absolute
          left 0

      .shop-wrapper
        flex 1
        background-color #fff

        .shops-title
          display flex
          flex-direction row
          padding 0 10px
          height 44px
          align-items center
          justify-content space-between
          color #999

          a
            color #999
            text-decoration none
            font-weight lighter

        .shops-items
          display flex
          flex-wrap wrap

          li
            display flex
            flex-direction column
            width 33.3%
            height 90px
            justify-content center
            align-items center
            color #666
            font-weight lighter
            font-size 14px

            img
              width 60%
              height 60%
              margin-bottom 5px

        .phone-type
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
          border-bottom-1px(#ccc)

          li
            width 33.3%
            display flex
            justify-content center
            align-items center
            margin 5px 0

            img
              width 70%
</style>