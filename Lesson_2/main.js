/*const products = [
    { id: 1, title: 'Laptop', price: 40000 },
    { id: 2, title: 'Mouse', price: 750 },
    { id: 3, title: 'Keyboard', price: 900 },
    { id: 4, title: 'Gamepad', price: 1500 },
];

//Функция для формирования верстки каждого товара
const renderProduct = (item, img = 'images/box.png') => {
    return `<div class="product-item">
                <h3>Наименование:<br>${item.title}</h3>
                <p>Цена: ${item.price} руб.</p>
                <img src="${img}">
              <button class="buy-btn">Купить</button>
           </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join("");
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);

////////////////////////////////////////////////////////////////////

const products = [
    { id: 1, title: 'Laptop', price: 40000, img: 'images/laptop.jpg' },
    { id: 2, title: 'Mouse', price: 750, img: 'images/mouse.jpg' },
    { id: 3, title: 'Keyboard', price: 900, img: 'images/keyboard.jpg' },
    { id: 4, title: 'Gamepad', price: 1500, img: 'images/gamepad.jpg' },
];

const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>Наименование:<br> ${item.title}</h3>
                <p>Цена: ${item.price} руб.</p>
                <img src="${item.img}">
                <br>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join("");
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);
*/

//список товаров каталога
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts();
    }

    _getProducts() {
        this.goods = [
            { id: 1, title: 'Laptop', price: 40000, img: 'images/laptop.jpg' },
            { id: 2, title: 'Mouse', price: 750, img: 'images/mouse.jpg' },
            { id: 3, title: 'Keyboard', price: 900, img: 'images/keyboard.jpg' },
            { id: 4, title: 'Gamepad', price: 1500, img: 'images/gamepad.jpg' },
        ];
    }
    renderProductList() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const productObject = new ProductItem(good);
            block.insertAdjacentHTML('beforeend', productObject.renderProductItem())
        }
    }
    calcSum() {
        /* сумма через цикл for
        let sum = 0;
        for (let i = 0; i < this.goods.length; i++) {
            sum += this.goods[i].price;
        }
        return sum;
        */

        /* сумма через forEach
        let sum = 0;
        this.goods.forEach((el) => {
            sum += el.price;
        });
        return sum;
        */

        return this.goods.reduce((sum, element) => sum += element.price, 0);
    }
}

//товар каталога
class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
    }
    renderProductItem() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="product image">
                <h3>${this.title}</h3>
                <p>Цена: ${this.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

//список товаров в корзине (корзина товаров)
class BasketList {
    constructor() {

    }
    renderBasketList() {

    }
    addProduct() {

    }
    deleteProduct() {

    }
    calcSum() {

    }
}

//товар корзины (элемент корзины товаров)
class BasketItem {
    constructor() {

    }
    renderBasketItem() {

    }
}

let prodList = new ProductList();
prodList.renderProductList();
console.log(prodList.calcSum());
