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
        dataError: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.dataError = true;
                    console.log(this.dataError);
                });
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
    }
});
