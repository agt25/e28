const ShoppingList = {
    data() {
        return {
            item: '',
            items: []
        }
    },
    methods: {
        addItem() {
            this.items.push(this.item);
        }
    }
}

const app = Vue.createApp(ShoppingList).mount('#app');