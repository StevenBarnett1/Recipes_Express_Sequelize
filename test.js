let placeOrder = (toppings,callback) => {

}

let chooseToppings = (callback) => {
    callback("tomatoes","onions")//return value of this is placeOrder
}


chooseToppings(toppings => placeOrder(toppings, order=>collectOrder(order)))
