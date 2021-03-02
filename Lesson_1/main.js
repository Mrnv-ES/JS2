/*const products = [
    { id: 1, title: 'Laptop', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];

//Функция для формирования верстки каждого товара
const renderProduct = (item, img = 'images/box.png') => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
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
*/

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