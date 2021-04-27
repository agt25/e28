<template>
    <div id="product-page">
        <div v-if="productNotFound">
            <p>Product {{ id }} not found.</p>
            <router-link v-bind:to="'/products'"
                >Go to all products</router-link
            >
        </div>

        <div v-else-if="product">
            <show-product
                v-bind:product="product"
                v-bind:detailed="true"
            ></show-product>
        </div>
    </div>
</template>

<script>
import ShowProduct from "@/components/ShowProduct.vue";

export default {
    components: {
        "show-product": ShowProduct,
    },
    props: {
        id: {
            type: String,
        },
        products: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {};
    },
    computed: {
        product() {
            return this.products.filter((product) => {
                return product.id == this.id;
            }, this.id)[0];
        },
        productNotFound() {
            return this.product == null;
        },
    },
};
</script>

<style scoped>
</style>