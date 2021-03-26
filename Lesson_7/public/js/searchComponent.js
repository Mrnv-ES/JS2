Vue.component('search', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input type="text" class="search-field" v-model="userSearch">
                    <button type="submit" class="btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
});


// @submit.prevent - отменяем стандартные действия
// $refs - свойство, которое ссылается на нашу верстку <products ref="products"></products>
// v-model="userSearch" - связь между версткой и компонентом userSearch: ''
// Можно использовать свойство props - для доступа к внешним свойствам компонентов
