let add = (basket, req) => {
    basket.contents.push(req.body);
    return JSON.stringify(basket, null, 4);
};
let change = (basket, req) => {
    let find = basket.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(basket, null, 4);
};

let del = (basket, req) => {
    for (let i = 0; i < basket.contents.length; i++) {
        if (basket.contents[i].id_product === +req.params.id) {
            if (basket.contents[i].quantity > 1) {
                basket.contents[i].quantity -= 1;
            }
            if (basket.contents[i].quantity === 1) {
                basket.contents.splice(i,1);
            }
        }
    }
    return JSON.stringify(basket, null, 4);
};

module.exports = {
    add,
    change,
    del
};