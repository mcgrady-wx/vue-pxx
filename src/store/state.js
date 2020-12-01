var cartGoods=JSON.parse(localStorage.getItem('cartGoods')) || []

const state={
    // 首页轮播图
    homecasual: [],
    // 首页导航
    homenav: {},
    // 首页的商品列表
    homeshoplist: {},
    // 推荐列表数据
    recshoplist: [],
    // 搜索列表数据
    searchgoods: [],
    // 用户信息
    userInfo: {},
    // 购物车的数据
    cartGoods: cartGoods
}


export default state