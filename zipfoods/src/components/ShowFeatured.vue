<template>
    <div id="show-featured">
        <h2>Featured Products</h2>

        <ul class="clean-list">
            <li
                v-for="product in featuredProducts"
                v-bind:key="product.id"
                data-test="featured-product"
            >
                {{ product.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        category: {
            type: String,
        },
    },
    data() {
        return {};
    },
    computed: {
        featuredProducts() {
            return this.products.filter((product) => {
                if (product.categories) {
                    return product.categories.includes(this.category);
                }
            }, this.category);
        },
        products() {
            return this.$store.state.products;
        },
    },
};
</script>

<style scoped>
#show-featured {
    background-color: var(--light-blue);
    border-radius: var(--radius);
    padding: 10px;
}
</style>
