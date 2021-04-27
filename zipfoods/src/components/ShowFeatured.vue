<template>
    <div id="show-featured">
        <h2>Featured Products</h2>
        <ul class="clean-list">
            <li v-for="product in featuredProducts" v-bind:key="product.id">
                {{ product.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { products } from "@/common/products.js";

export default {
    props: {
        category: {
            type: String,
        },
    },
    data() {
        return {
            products: products,
        };
    },
    computed: {
        featuredProducts() {
            return this.products.filter((product) => {
                return product.categories.includes(this.category);
            }, this.category);
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
