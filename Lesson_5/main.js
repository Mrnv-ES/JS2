const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        imgProduct: 'https://placehold.it/200x150',
        imgBasket: 'https://placehold.it/50x100',
        userSearch: '',
        showBasket: false,
        products: [],
        basketItems: [],
        filtered: [],
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(item) {
            let find = this.basketItems.find(el => el.id_product === item.id_product);
            if (find) {
                find.quantity++;
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.basketItems.push(prod);
            }
        },
        removeProduct(item) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.basketItems.splice(this.basketItems.indexOf(item), 1);
            }
        },
        filter() {
            let searchCheck = new RegExp(this.userSearch, 'i');
            this.filtered = this.filtered.filter(el => searchCheck.test(el.product_name));
        },
    },
    mounted() {
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketItems.push(el);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
});

/*
class List {
    constructor(url, container, list = lst) {
        this.url = url;
        this.container = container;
        this.list = list;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    _init() {
        return false;
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(err => {
                console.log(err);
            })
    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    render() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const prodObj = new this.list[this.constructor.name](good);
            this.allProducts.push(prodObj);
            block.insertAdjacentHTML('beforeend', prodObj.render());
        }
    }
    calcSum() {
        return this.allProducts.reduce((sum, element) => sum += element.price, 0);
    }
}

class Item {
    constructor(elem, img = 'https://placehold.it/200x150') {
        this.id_product = elem.id_product;
        this.product_name = elem.product_name;
        this.price = elem.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}

class ProductList extends List {
    constructor(basket, container = '.products', url = '/catalogData.json') {
        super(url, container);
        this.basket = basket;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.basket.addProduct(e.target);
            }
        });
    }

}

class ProductItem extends Item {

}

class Basket extends List {
    constructor(container = '.cart-block', url = '/getBasket.json') {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }
    addProduct(elem) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let prodId = +elem.dataset['id'];
                    let prodFind = this.allProducts.find(product => product.id_product === prodId);
                    if (prodFind) {
                        prodFind.quantity++;
                        this._updateBasket(prodFind);
                    } else {
                        let product = {
                            id_product: prodId,
                            price: +elem.dataset['price'],
                            product_name: elem.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('error')
                }
            })
    }
    removeProduct(elem) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let prodId = +elem.dataset['id'];
                    let prodFind = this.allProducts.find(product => product.id_product === prodId);
                    if (prodFind.quantity > 1) {
                        prodFind.quantity--;
                        this._updateBasket(prodFind);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(prodFind), 1);
                        document.querySelector(`.cart-item[data-id='${prodId}']`).remove();
                    }
                } else {
                    alert('error');
                }
            })
    }
    _updateBasket(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} $`;
    }
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }
}

class BasketItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
         <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">Цена ${this.price} $</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity * this.price}</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
    }
}

const lst = {
    ProductList: ProductItem,
    Basket: BasketItem
};


let basket = new Basket();
let products = new ProductList(basket);
*/

/*
//список товаров каталога
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; // все товары (массив товаров)
        this.allProducts = []; // все объекты (массив объектов)
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.renderProductList();
            })
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    renderProductList() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const productObject = new ProductItem(good);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.renderProductItem())
        }
    }
    calcSum() {
        return this.goods.reduce((sum, element) => sum += element.price, 0);
    }
}

//товар каталога
class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    renderProductItem() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="product image">
                <h3>${this.title}</h3>
                <p>Цена: ${this.price} $</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

//список товаров в корзине (корзина товаров)
class BasketList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getBasketList()
            .then(data => {
                this.goods = [...data];
                this.renderBasketList();
            })
    }

    _getBasketList() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    renderBasketList() {
        console.log(this.goods)
    }
    addProduct() {

    }
    deleteProduct() {

    }
    changeProduct() {

    }
    calcSum() {

    }
}

//товар корзины (элемент корзины товаров)
class BasketItem {
    constructor(id, title, price, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    renderBasketItem() {

    }
}

let prodList = new ProductList();
prodList.renderProductList();
console.log(prodList.calcSum());
let baskList = new BasketList();
baskList.renderBasketList();
*/