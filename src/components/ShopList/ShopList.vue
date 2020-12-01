<template>
    <a class="recommend-item">
        <img :src="item.thumb_url" alt="" width="100%" v-if="item.thumb_url">
        <h4 class="item-title">{{item.short_name}}</h4>
        <div class="item-bottom">
            <span class="item-price">¥{{item.price / 100}}</span>
            <span class="item-sales">{{item.sales_tip}}</span>
            <button class="item-btn" @click="clickCell(item)">购买</button>
        </div>
        <transition 
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
    </a>
</template>

<script>
export default {
    data() {
      return {
        ballflag:false
      }
    },
    props: {
      item: Object,
    },
    methods: {
      clickCell(item){//点击购买
        //把购买的商品信息通过自定义事件传递给父元素处理
        this.$emit('clickCellBtn',item)
        //显示小球
        this.ballflag=!this.ballflag
      },
      //小球动画
      beforeEnter(el){
         el.style.transform="translate(0,0)"//初始化小球位置
      },
      enter(el,done){
        el.offsetWidth//随便设置一个才会有动画效果
        //通过getBoundingClientRect()的方法，分别获得小球、购物车图标距离顶部和左边的距离，然后计算出小球移动的距离
        //获取小球距离顶部和左部的坐标
        let ballPosition=this.$refs.ball.getBoundingClientRect()
        //获得购物车距离顶部和左部的坐标
        let badgePosition=document.getElementById("badge").getBoundingClientRect()
        //console.log(ballPosition,badgePosition)
        //计算小球移动的距离
        let x=badgePosition.left-ballPosition.left+30
        let y=badgePosition.top-ballPosition.top

        el.style.transform=`translate(${x}px,${y}px)`//设置小球最终位置
        el.style.transition="all 0.5s cubic-bezier(.17,.67,.83,.67)"//设置动画效果，使用贝塞尔曲线(cubic-bezier)设置小球的运动轨迹

        //最后调用done函数 done()===afterEnter(el)
        done()
      },
      afterEnter(el){
        this.ballflag=!this.ballflag//隐藏小球
      }
    },
}
</script>

<style lang="stylus" scoped>
  .recommend-item:nth-child(2n-1)
    margin-right 1%

  .recommend-item
    width 49.5%
    background #FFF
    padding-bottom 15px
    margin-bottom 15px
    position relative
    .item-title
      line-height 20px
      font-size 13px
      font-weight lighter
      height 20px
      overflow hidden
      margin 5px 0
      padding 0 5px
    .item-bottom
      display flex
      flex-direction row
      align-items center
      padding 0 6px
      .item-price
        flex 2
        color red
        font-weight bolder
        font-size 12px
      .item-sales
        flex 4
        font-size 10px
        color #666666
      .item-btn
        flex 2
        border 1px solid orangered
        height 26px
        border-radius 5px
        font-size 10px
        background-color transparent
        color red
    .ball
      width 15px
      height 15px
      background red
      z-index: 1000
      border-radius 50%
      position absolute
      top 220px
      left 140px
</style>