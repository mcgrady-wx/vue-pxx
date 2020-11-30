// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//引入第三方可滑动导航栏库
import LyTab from 'ly-tab'
Vue.use(LyTab)

//映入mint-ui的轮播
import { Swipe, SwipeItem ,Cell,Actionsheet,DatetimePicker,Header,Button ,Checklist  } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Cell.name, Cell);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Checklist.name, Checklist);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
