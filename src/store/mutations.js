import {
    HOME_CASUAL,
    HOME_NAV,
    HOME_SHOP_LIST,
    REC_SHOP_LIST,
    SEARCH_GOODS,
    USER_INFO,
    RESET_USER_INFO
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
   }
}


export default mutations