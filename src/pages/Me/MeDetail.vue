<template>
  <div class="user-detail">
    <mt-header title="基本信息">
        <router-link to="/me" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="./images/me_icon.png" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{user_phone}}</span>
      </div>
      <div class="user-item" @click="changeUser">
        <span>昵称</span>
        <span>{{user_name}}</span>
      </div>
      <div class="user-item" @click="sheetVisible = true">
        <span>性别</span>
        <span>{{user_sex}}</span>
      </div>
      <div class="user-item" @click="changeAddress">
        <span>常住地</span>
        <span>{{user_address}}</span>
      </div>
      <div class="user-item" @click="$refs.picker.open()">
        <span>生日</span>
        <span>{{user_birthday}}</span>
      </div>
      <div class="user-item" @click="changeSign">
        <span>个性签名</span>
        <span>{{user_sign}}</span>
      </div>

      <button @click="saveUserInfo">修改</button>
    </div>
    <!-- 性别选择 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
    <!-- 出生年月选择 -->
    <mt-datetime-picker 
        ref="picker"
        v-model="pickerVisible" 
        type="date"
        :startDate=startDate
        :endDate=endDate 
        year-format="{value} 年" 
        month-format="{value} 月" 
        date-format="{value} 日"
        @confirm="handleConfirm"
        >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {changeUserInfo} from './../../api/index';
  import {Toast,MessageBox} from 'mint-ui';
  import dayjs from 'dayjs';//时间处理库

  export default {
    name: "MeDetail",
    data() {
      return {
        user_sign: '',
        user_address: '',
        user_name: '',
        user_sex: '',
        user_phone: '',
        user_birthday: '',

        // 2. 性别
        sheetVisible: false, //控制显示隐藏
        actions: [//弹出数据
          {name: '男', method: this.selectSex},
          {name: '女', method: this.selectSex},
        ],

        // 3. 出生年月日
        pickerVisible:'',//选择后的值
        startDate: new Date('1960-01-01'),
        endDate: new Date(),
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    mounted(){
        this.user_sign = this.userInfo.user_sign || '';
        this.user_address = this.userInfo.user_address || '';
        this.user_name = this.userInfo.user_name || '';
        this.user_sex = this.userInfo.user_sex || '';
        this.user_phone= this.userInfo.user_phone || '';
        this.user_birthday= this.userInfo.user_birthday || '';
    },
    methods: {
        changeUser(){//修改昵称
            MessageBox.prompt('请输入昵称').then(({ value, action }) => {
                this.user_name=value
            });
        },
        changeAddress(){//修改常住地
            MessageBox.prompt('请输入常住地').then(({ value, action }) => {
                this.user_address=value
            });
        },
        changeSign(){//修改个性签名
             MessageBox.prompt('请输入个性签名').then(({ value, action }) => {
                this.user_sign=value
            });
        },
        selectSex(data){//性别选择的回调函数
            //console.log(data)
            this.user_sex=data.name
        },
        handleConfirm(data){//选择生日确定调用的函数
            //console.log(data)
            //console.log(this.pickerVisible)
            this.user_birthday=dayjs(this.pickerVisible).format('YYYY-MM-DD')
        },
        async saveUserInfo(){//提交修改，修改个人信息
            //发起请求
            let result = await changeUserInfo(this.userInfo.id, this.user_name, this.user_sex, this.user_address, this.user_birthday, this.user_sign);
            //给用户提示
            Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
            });
            //跳转回去
            if(result.success_code === 200){
                // 更新本地数据
                this.$store.dispatch('getUserInfo');
                //  返回主界面
                setTimeout(()=>{
                    this.$router.replace('/me');
                }, 2000)
            }
        }     
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user-detail
    width 100%
    height 100%
    .user-detail-top
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .user-detail-group
      .user-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .user-item
        height 40px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border none
          outline none
          text-align right
      button
        width 90%
        height 40px
        line-height 40px
        background-color #e9232c
        text-align center
        margin 20px 5%
        border none
        font-size 16px
        color #fff
        border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>
