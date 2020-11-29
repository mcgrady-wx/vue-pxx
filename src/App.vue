<template>
  <div id="app">
    <router-view/>
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
</style>
