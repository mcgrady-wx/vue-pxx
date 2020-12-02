import Vue from 'vue'
import Router from 'vue-router'
//import Home from '../pages/Home/Home.vue'
//import Recommend from '../pages/Recommend/Recommend.vue'
//import Search from '../pages/Search/Search.vue'
//import Cart from '../pages/Cart/Cart.vue'
//import Me from '../pages/Me/Me.vue'
import Hot from '../pages/Home/children/Hot.vue'
import Others from '../pages/Home/children/Others.vue'
//import Login from '../pages/Login/Login.vue'
import MeSetting from '../pages/Me/MeSetting.vue'
import MeDetail from '../pages/Me/MeDetail.vue'

//路由懒加载
const Home = () => import('../pages/Home/Home.vue')
const Recommend = () => import('../pages/Recommend/Recommend.vue')
const Search = () => import('../pages/Search/Search.vue')
const Cart = () => import('../pages/Cart/Cart.vue')
const Me = () => import('../pages/Me/Me.vue')
const Login = () => import('../pages/Login/Login.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      component:Home,
      meta:{isShow:true},
      children:[
        {
          path: '/',
          redirect:'/home/hot'
        },
        {
          path: 'hot',
          component:Hot,
          meta:{isShow:true}
        },
        {
          path: ':name',
          component:Others,
          meta:{isShow:true}
        }
      ]
    },
    {
      path: '/recommend',
      component:Recommend,
      meta:{isShow:true}
    },
    {
      path: '/search',
      component:Search,
      meta:{isShow:true}
    },
    {
      path: '/cart',
      component:Cart,
      meta:{isShow:true}
    },
    {
      path: '/me',
      component:Me,
      meta:{isShow:true},
    },
    {
      path: '/me/detail',
      component:MeDetail,
    },
    {
      path: '/me/setting',
      component:MeSetting,
    },
    {
      path: '/login',
      component:Login
    }
  ]
})


const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}