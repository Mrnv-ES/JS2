Vue.component('basket', {
    props: ['basketItems', 'img', 'visibility'],
    template: `<div class="basket-block" v-show="visibility">
                <p v-if="!basketItems.length">Корзина пуста</p>
                <basket-item v-for="item of basketItems" :img="img" :basket-item="item" :key="item.id_product">
                </basket-item>
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
                        <div class="product-total-price">{{ basketItem.quantity * basketItem.price }}</div>
                        <button class="del-btn" @click="$parent.$emit('remove', basketItem)">&times;</button>
                    </div>
                </div>`
});
