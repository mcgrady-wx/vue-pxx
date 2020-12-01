import {
    HOME_CASUAL,
    HOME_NAV,
    HOME_SHOP_LIST,
    REC_SHOP_LIST,
    SEARCH_GOODS,
    USER_INFO,
    RESET_USER_INFO,
    ADD_GOODS_COUNT,
    REDUCE_GOODS_COUNT,
    SELECTED_SINGER_GOODS,
    SELECTED_ALL_GOODS,
    DEL_SINGER_GOODS
} from './mutation-types'


const mutations={
   [HOME_CASUAL](state,data){
        state.homecasual=data
   },
   [HOME_NAV](state,data){
        state.homenav=data
   },
   [HOME_SHOP_LIST](state,data){
        state.homeshoplist=data
   },
   [REC_SHOP_LIST](state,data){
        state.recshoplist=state.recshoplist.concat(data)
   },
   [SEARCH_GOODS](state,data){
     state.searchgoods=data
   },
   [USER_INFO](state,data){
     state.userInfo=data
   },
   [RESET_USER_INFO](state){
     state.userInfo={}
   },
   [ADD_GOODS_COUNT](state,good){
     let arr=state.cartGoods
     let flag=false//标记添加的商品是否在购物车，如果在把flag置为true  
     arr.forEach(element => {
          if (element.goods_id===good.goods_id) {
               element.buy_count++
               flag=true
          } 
     });
     if (!flag) {//表示要添加的商品不在购物车中
          arr.push(good)
     }
     state.cartGoods=arr
     localStorage.setItem('cartGoods',JSON.stringify(arr))
   },
   [REDUCE_GOODS_COUNT](state,good){
     let arr=state.cartGoods
     arr.forEach(element => {
          if (element.goods_id===good.goods_id) {
               element.buy_count--
               if (element.buy_count<=1) {
                    element.buy_count=1
               }
          } 
     });
     state.cartGoods=arr
     localStorage.setItem('cartGoods',JSON.stringify(arr))
   },
   [SELECTED_SINGER_GOODS](state,id){
     let arr=state.cartGoods
     arr.forEach(element => {
          if (id===element.goods_id) {
               if (element.is_pay === 0) {
                   element.is_pay=1
               } else {
                   element.is_pay=0
               }
          }
     });
     state.cartGoods=arr
   },
   [SELECTED_ALL_GOODS](state,flag){
     let arr=state.cartGoods
     if (flag) {//全选
          arr.forEach((element)=>{
               element.is_pay=0
          })
     } else {//全取消
          arr.forEach((element)=>{
               element.is_pay=1
          })
        }
     state.cartGoods=arr
   },
   [DEL_SINGER_GOODS](state,id){
     let arr=state.cartGoods.filter((element)=>{
         return element.goods_id !==id
     })
     state.cartGoods=arr
     localStorage.setItem('cartGoods',JSON.stringify(arr))
   }
}


export default mutations