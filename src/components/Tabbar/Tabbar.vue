<template>
  <div class="bottom-tab">
    <div class="tab-item" @click="switchTo('/home')">
      <img :src="$route.path.includes('/home') ? tabBarImgArr[0].selected: tabBarImgArr[0].normal" alt="">
      <span :class="{on: $route.path.includes('/home')}">首页</span>
    </div>
    <div class="tab-item" @click="switchTo('/recommend')">
      <img :src="$route.path.includes('/recommend') ? tabBarImgArr[1].selected: tabBarImgArr[1].normal" alt="">
      <span :class="{on: $route.path.includes('/recommend')}">推荐</span>
    </div>
    <div class="tab-item" @click="switchTo('/search')">
      <img :src="$route.path.includes('/search') ? tabBarImgArr[2].selected: tabBarImgArr[2].normal" alt="">
      <span :class="{on: $route.path.includes('/search')}">搜索</span>
    </div>
    <div class="tab-item" @click="switchTo('/cart')" id="badge">
      <img :src="$route.path.includes('/cart') ? tabBarImgArr[3].selected: tabBarImgArr[3].normal" alt="">
      <span :class="{on: $route.path.includes('/cart')}">购物车</span>
      <div class="num" v-if="totalNum>0 && userInfo.id">
        <span>{{totalNum}}</span>
      </div>
    </div>
    <div class="tab-item" @click="switchTo('/me')">
      <img :src="$route.path.includes('/me') ? tabBarImgArr[4].selected: tabBarImgArr[4].normal" alt="">
      <span :class="{on: $route.path.includes('/me')}">个人中心</span>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
export default {
    data() {
        return {
            tabBarImgArr: [
                {normal: require('./../../common/img/icon_home.png'), selected: require('./../../common/img/icon_home_selected.png')},
                {normal: require('./../../common/img/icon_intro.png'), selected: require('./../../common/img/icon_intro_selected.png')},
                {normal: require('./../../common/img/icon_search.png'), selected: require('./../../common/img/icon_search_selected.png')},
                {normal: require('./../../common/img/icon_chat.png'), selected: require('./../../common/img/icon_chat_selected.png')},
                {normal: require('./../../common/img/icon_mine.png'), selected: require('./../../common/img/icon_mine_selected.png')}
            ]
        }
    },
    computed: {
      ...mapGetters(['totalNum']),
      ...mapState(['userInfo'])
    },
    methods:{
        switchTo(path){
            this.$router.push(path)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .bottom-tab
        width 100%
        height 5rem
        position fixed
        bottom 0
        left 0
        display flex
        z-index 999
        background-color white
        box-shadow 0 -0.2rem 1rem #ccc
        .tab-item
          flex 1
          font-size 1.2rem
          display flex
          flex-direction column
          justify-content center
          align-items center
          position relative
          img
            width 35%
            margin-bottom 0.3rem
          .on
            color red
          .num
            position absolute
            width 20px
            height 15px
            background-color #e9232c
            top 5px
            left 45px
            border-radius 40%
            span
              margin-left 5px
              color #cecbcb

</style>