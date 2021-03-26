Vue.component('basket', {
    data() {
        return {
            imgBasket: 'https://placehold.it/50x50',
            basketUrl: '/getBasket.json',
            basketItems: [],
            showBasket: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.basketItems.find(el => el.id_product === product.id_product);
            console.log(find);
            if (find) {
                this.$parent.putJson(`/api/basket/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/basket`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.basketItems.push(prod);
                        }
                    })
            }
        },
        remove(product) {
            for (let i = 0; i < this.basketItems.length; i++) {
                if (this.basketItems[i].id_product === +product.id_product) {
                    this.$parent.deleteJson(`/api/basket/${this.basketItems[i].id_product}`, this.basketItems[i])
                        .then(data => {
                            if (data.result === 1) {
                                this.basketItems[i].quantity -= 1;
                                if (this.basketItems[i].quantity === 0) {
                                    this.basketItems.splice(i, 1)
                                }

                            }
                        })
                }
            }
        }
    },
    mounted() {
        this.$parent.getJson(`/api/basket`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketItems.push(el);
                }
            });
    },
    // props: ['basketItems', 'img', 'visibility'],
    template: `<div>
            <button class="btn-basket basket-btn" type="button" @click="showBasket = !showBasket">Корзина</button>
            <div class="basket-block" v-show="showBasket">
                <p v-if="!basketItems.length">Корзина пуста</p>
                <basket-item class="basket-item"
                v-for="item of basketItems"
                :key="item.id_product"
                :basket-item="item"
                :img="imgBasket"
                @remove="remove">
                </basket-item>
            </div>
</div>`
});
Vue.component('basket-item', {
    props: ['img', 'basketItem'],
    template: `<div class="basket-item">
                    <div class="product-info">
                        <img :src="img" alt="Product image">
                        <div class="product-desc">
                            <div class="product-title">{{ basketItem.product_name }}</div>
                            <div class="product-quantity">Количество: {{ basketItem.quantity }}</div>
                            <div class="product-price">{{ basketItem.price }} $</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-total-price">{{ basketItem.quantity * basketItem.price }}$</div>
                        <button class="del-btn" @click="$emit('remove', basketItem)">&times;</button>
                    </div>
                </div>`
});
