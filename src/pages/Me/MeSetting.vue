<template>
    <!-- 个人设置页面 -->
  <div class="me-setting">
    <mt-header title="设置">
        <router-link to="/me" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div>
        <mt-cell title="免密码支付" is-link @click.native="dealCellClick('免密码支付')">
            <i class="iconfont icon-coin" slot="icon"></i>
        </mt-cell>
        <mt-cell title="免拼单设置" is-link @click.native="dealCellClick('免拼单设置')"> 
            <i class="iconfont icon-calculator" slot="icon"></i>
        </mt-cell>
        <mt-cell title="消息接收设置" is-link @click.native="dealCellClick('消息接收设置')">
            <i class="iconfont icon-chat" slot="icon"></i>
        </mt-cell>
    </div>

    <div style="margin-top: 10px;">
        <mt-cell title="字体设置" is-link @click.native="dealCellClick('字体设置')">
            <i class="iconfont icon-AApay" slot="icon"></i>
        </mt-cell>
        <mt-cell title="喜好设置" is-link @click.native="dealCellClick('喜好设置')">
            <i class="iconfont icon-smail" slot="icon"></i>
        </mt-cell>
    </div>

    <div style="margin-top: 10px;">
        <mt-cell title="客服设置" is-link @click.native="dealCellClick('客服设置')">
            <i class="iconfont icon-service" slot="icon"></i>
        </mt-cell>
    </div>
    <mt-button type="danger" @click="dealLogout" class="logout">退出登录</mt-button>
  </div>
</template>

<script>
  import {Toast, MessageBox} from 'mint-ui';
  import {mapActions} from 'vuex'

  export default {
    name: "MeSetting",
    methods: {
      ...mapActions(["logOut"]),
      dealCellClick(props) {//点击标签
        Toast('点击了' + props);
      },
      dealLogout() {
        MessageBox.confirm('您确定退出登录吗?').then(action => {//确定
            //清除vuex中userInfo的值
            this.logOut()
            //返回到首页
            this.$router.replace('/home')
        },action => {//取消
            Toast('取消成功');
        })
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .logout
    width 100%
    height 44px
    margin-top 10px
    display flex
    justify-content center
    align-items center
    text-align center
</style>
