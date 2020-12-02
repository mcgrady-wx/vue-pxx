<template>
  <div class="chat">
    <div v-if="userInfo.id" style="height:100%;width:100%;overflow: hidden;">
      <!--头部区域-->
      <div class="header">
        <a href="" class="icon_back"></a>
        <h3>购物车</h3>
        <a href="" class="icon_menu"></a>
      </div>
      <!--安全提示-->
      <div class="jd_safe_tip">
        <p class="tip_word">
          您正在安全购物环境中，请放心购物
        </p>
      </div>
      <!--中间的列表-->
      <div class="jd_shopCart_list">
        <section v-if="totalPrice>0">
          <transition-group name="fade"> 
            <div class="shopCart_list_con" v-for="goods in cartGoods" :key="goods.goods_id">
              <div class="list_con_left">
                  <input type="checkbox" :id="goods.goods_id" :checked="goods.is_pay===0?true:false" @click="buy(goods.goods_id)" ref="inpu"/>
                  <label :for="goods.goods_id"></label>
              </div>
              <div class="list_con_right">
                <div class="shop_img">
                  <img :src="goods.thumb_url" alt="">
                </div>
                <div class="shop_con">
                  <a href="">{{goods.goods_name}}</a>
                  <p class="shop_price">&yen;{{goods.price / 100}}</p>
                  <div class="shop_deal">
                    <div class="shop_deal_left">
                      <span @click="reduce(goods)">-</span>
                      <input type="tel" value="1" v-model="goods.buy_count">
                      <span @click="add(goods)">+</span>
                    </div>
                    <div class="shop_deal_right" @click="delGood(goods.goods_id)">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>  
        </section>
        <div v-else>
          <img src="./images/timg.jpg" alt="" srcset="" width="100%">
        </div>
      </div> 
      <!--底部通栏-->
      <div id="tab_bar">
        <div class="tab-bar-left">         
          <input type="checkbox" id="all" :checked="allGoods" @click="allBuy"/>
          <label for="all"></label>
          <span style="font-size: 16px;">全选</span>
          <div class="select-all">
            合计：<span class="total-price">&yen;{{totalPrice}}</span>
          </div>
        </div>
        <div class="tab-bar-right">
          <a href="#" class="pay">去结算</a>
        </div>
      </div>
    </div>
    <select-login v-else/>
  </div>
</template>

<script>
  import {mapState,mapActions,mapGetters} from 'vuex';
  import SelectLogin from './../Login/SelectLogin'
  import BScroll from '@better-scroll/core'
  export default {
    name: "Chat",
    data() {
        return {
            n:true,
           
        }
    },
    computed: {
      ...mapState(['userInfo','cartGoods']),
      ...mapGetters(['totalPrice','allGoods'])
    },
    methods: {
        ...mapActions(['selectedGoods','addGoods','reduceGoods','selectedAllGoods','delGoods']),
        buy(id){//选中购买或取消购买
            this.selectedGoods(id)
        },
        add(good){//增加商品数量
            this.addGoods(good)
        },
        reduce(good){//减少商品数量
            this.reduceGoods(good)
        },
        allBuy(el){//是否全选
            //console.log(el.srcElement.checked)
            this.selectedAllGoods(el.srcElement.checked)

        },
        delGood(id){//删除商品
            this.delGoods(id)
        }
    },
    watch: {
      cartGoods(){
        if (this.carBscroll) {
          this.carBscroll.refresh()
        } else {
          this.carBscroll = new BScroll('.jd_shopCart_list', {
              scrollY: true,
              click: true
          });
        }
        
      }
    },
    mounted() {
      // 请求商品数据
      //this.$store.dispatch('reqCartsGoods');
      setTimeout(() => {
        this.carBscroll = new BScroll('.jd_shopCart_list', {
              scrollY: true,
              click: true
          });
      }, 500);
      
    },
    components: {
      SelectLogin
    }
  }
</script>


<style scoped lang="stylus">
  .chat
    width 100%
    height 100%
    background-color #e0e0e0
    overflow: hidden;
    .header
      width: 100%;
      height: 44px;
      background: #ececec;
      -webkit-background-size: 1px 44px;
      background-size: 1px 44px;
      border-bottom: 1px solid #e0e0e0;
      position: fixed;
      left: 0;
      top: 0;
      display flex
      justify-content center
      align-items center
      font-size 18px
      font-weight bolder
      color #E9232C
      z-index 999
    .jd_safe_tip
      margin-top 44px
      height 36px
      line-height 36px
      border-bottom: 1px solid #e0e0e0;
      background-color #fff
      text-align center
      .tip_word
        display inline-block
        font-size 14px
        padding-left 20px
        position relative
        &:before
          content ''
          width 18px
          height 18px
          background url("./images/safe_icon.png") no-repeat
          -webkit-background-size 18px 18px
          background-size 18px 18px
          position absolute
          top 9px
          left 0
    .jd_shopCart_list
      margin-bottom 64px
      background-color #e0e0e0
      overflow: hidden;
      height 75%
      width 100%
      section
        margin-top 15px
        border-top 1px solid #e0e0e0
        background-color #fff
        .fade-enter-active,.fade-leave-active
          transition all 0.3s
        .fade-enter,.fade-leave-to
          transform translate3d(100%, 0, 0)
          opacity 0
        .shopCart_list_con
          padding: 10px 0
          border-bottom 1px solid #e0e0e0
          .list_con_left
            input[type="checkbox"] + label::before
                content: "\a0";  /*不换行空格*/
                display: inline-block;
                background-color: silver;
                float left
                -webkit-background-size 50px 100px
                background-size 50px 100px
                width 20px
                height 20px
                border-radius 50%
                margin-top 28px
                margin-left 4px
            input[type="checkbox"]:checked + label::before
                content: "\2713";
                display: block;
                line-height: 20px;
                vertical-align: middle;
                text-align: center;
                background-color: #BF0000;
                color: #ffffff;
            input 
                position: absolute;
                clip: rect(0, 0, 0, 0);
          .list_con_right
            overflow: hidden;
            padding: 0 7px;
            .shop_img
              float left
              img
                width 80px
                height 80px
                display block
            .shop_con
              overflow hidden
              padding-left 7px
              & > a
                font-size 14px
                color #666
                line-height 20px
                height 40px
                overflow hidden
                display block
                text-decoration none
              .shop_price
                color #E9232C
                margin-top 5px
              .shop_deal
                margin-top 5px
                .shop_deal_left
                  float left
                  & > span
                    border 1px solid #e0e0e0
                    display inline-block
                    width 30px
                    height 25px
                    line-height 25px
                    text-align center
                    float left
                    &:first-child
                      border-top-left-radius 3px
                      border-bottom-left-radius 3px
                    &:last-child
                      border-top-right-radius 3px
                      border-bottom-right-radius 3px
                  input
                    border none
                    border-top 1px solid #e0e0e0
                    border-bottom 1px solid #e0e0e0
                    float left
                    width 50px
                    height 23px
                    text-align center
                .shop_deal_right
                  float right
                  & > span:first-child
                    background url('./images/delete_up.png') no-repeat
                    background-size 18px 4px
                    width 18px
                    height 4px
                    display block
                  & > span:last-child
                    background url('./images/delete_down.png') no-repeat
                    background-size 17px 17px
                    width 17px
                    height 17px
                    display block
                    margin-top -3px
    #tab_bar
      position: fixed
      left 0
      bottom 50px
      width 100%
      height 44px
      background-color #fff
      display flex
      justify-content space-between
      align-items center
      box-shadow 0 -5px 5px #e0e0e0
      border-bottom: 1px solid #e0e0e0
      .tab-bar-left
        display flex
        align-items center
        margin-left 7px
        input[type="checkbox"] + label::before
            content: "\a0";  /*不换行空格*/
            display: inline-block;
            background-color: silver;
            float left
            -webkit-background-size 50px 100px
            background-size 50px 100px
            width 15px
            height 15px
            border-radius 50%
            margin 0 4px
        input[type="checkbox"]:checked + label::before
            content: "\2713";
            display: block;
            line-height: 15px;
            vertical-align: middle;
            text-align: center;
            background-color: #BF0000;
            color: #ffffff;
        input 
            position: absolute;
            clip: rect(0, 0, 0, 0);
        .select-all
          margin-left 8px
          font-size 16px
      .tab-bar-right
        .pay
          width 90px
          height 44px
          background-color #E9232C
          display flex
          justify-content center
          align-items center
          font-size 18px
          color #fff
          text-decoration none
</style>
