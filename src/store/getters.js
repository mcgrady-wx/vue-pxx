const getters={
    totalPrice(state){//选中商品总价
        let price=0 //保存价格
        state.cartGoods.forEach(element => {
            if (element.is_pay===0) {
                price+=element.buy_count*element.price
            }
        });
        return (price/100).toFixed(2)
    },
    allGoods(state){//是否全选
       return state.cartGoods.every((element)=>{
            return element.is_pay===0
        })
    }

}


export default getters