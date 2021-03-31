const ShoppingList = {
    data() {
        return {
            item: '',
            qty: '',
            items: [],
            itemsCount: 0,
        }
    },
    methods: {
        addItem() {

            // Don’t create the newItem object via a data property because you want each new item to be unique
            // this.newItem.name = this.item;
            // this.newItem.qty = this.qty;

            // Instead, you could create a new local object so it’s unique each time:
            // let newItem = {}
            // newItem.name = this.item;
            // newItem.qty = this.qty;

            // Or, use the new object shorthand as I've done here:
            this.items.push({
                name: this.item,
                qty: this.qty,
            });

            this.itemsCount += this.qty;

            // Clear inputs
            this.item = '';
            this.qty = '';
        },
        removeItem(name) {
            this.items = this.items.filter(item => {
                if (item.name == name) {
                    this.itemsCount -= item.qty;
                }

                return item.name != name;
            });
        }
    }
}

const app = Vue.createApp(ShoppingList).mount('#app');
