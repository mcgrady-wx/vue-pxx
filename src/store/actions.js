import {
    HOME_CASUAL,
    HOME_NAV,
    HOME_SHOP_LIST,
    REC_SHOP_LIST,
    SEARCH_GOODS,
    USER_INFO,
    RESET_USER_INFO
} from './mutation-types'

import {
    getHomeCasual,
    getHomeNav,
    getHomeShopList,
    getRecommendShopList,
    getSearchGoods,
    getUserInfo,
    getLogout
} from '../api'

const actions={
    // 获取首页轮播图
    async reqHomeCasual({commit}){
        //发起请求获得数据
        const result = await getHomeCasual();
        //修改state中的数据
        if (result.success_code===200) {
            commit(HOME_CASUAL,result.message)
        }
    },
    //获取首页轮播图
    async reqHomeNav({commit}){
        //发起请求获得数据
        const result = await getHomeNav();
        //修改state中的数据
        if (result.success_code===200) {
            commit(HOME_NAV,result.message)
        }
    },
    //获取首页商品列表
    async reqHomeShopList({commit},callback){
        //发起请求获得数据
        const result = await getHomeShopList();
        //修改state中的数据
        if (result.success_code===200) {
            commit(HOME_SHOP_LIST,result.message)
        }
        callback && callback()
    },
    //推荐的列表数据
    async reqRecShopList({commit},params){
        //发起请求获得数据
        const result = await getRecommendShopList(params);
        //修改state中的数据
        if (result.success_code===200) {
            commit(REC_SHOP_LIST,result.message)
        }
    },
    //搜索的列表数据
    async reqSearchGoods({commit}){
        //发起请求获得数据
        const result = await getSearchGoods();
        //修改state中的数据
        if (result.success_code===200) {
            commit(SEARCH_GOODS,result.message)
        }
    },
    //同步更新用户信息
    syncUserInfo({commit}, userInfo){
        commit(USER_INFO, userInfo);
    },
    //异步获取用户信息
    async getUserInfo({commit}){
        const result = await getUserInfo();
        //console.log(result);
        if(result.success_code === 200){
        commit(USER_INFO, result.message);
        }
    },
    //异步退出登录
    async logOut({commit}){
        const result = await getLogout();
        //console.log(result);
        if(result.success_code === 200){
          commit(RESET_USER_INFO);
        }
    },
}

export default actions