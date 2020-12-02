<template>
  <div id="app">
    <keep-alive>
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
    </keep-alive>
    <Tabbar v-if="$route.meta.isShow"></Tabbar>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar/Tabbar'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  mounted(){
    this.getUserInfo()
  },
  methods:{
    ...mapActions(['getUserInfo'])
  },
  components:{
    Tabbar
  }
}
</script>

<style>
#app {
  width : 100%;
  height : 100%;
  background : #F5F5F5;
}
.slide-enter-active,.slide-leave-active{
  transition: all 0.2s;
}
.slide-enter{
  transform: translate3d(100%, 0, 0);
}
.slide-leave-to{
  transform: translate3d(-100%, 0, 0);
}
  
</style>
