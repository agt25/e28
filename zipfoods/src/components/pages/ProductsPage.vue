<template>
    <div id="products-page">
        <h2>Products</h2>
        <div id="products">
            <router-link
                class="product-link"
                v-for="product in products"
                v-bind:to="'/product/' + product.id"
                v-bind:key="product.id"
            >
                <show-product
                    v-bind:product="product"
                    v-bind:detailed="false"
                ></show-product>
            </router-link>
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
        products: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {};
    },
};
</script>

<style scoped>
#products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
}

a.product-link:link,
a.product-link:visited,
a.product-link:active,
a.product-link:hover {
    text-decoration: none;
    color: var(--black);
    cursor: pointer;
    border: 1px solid var(--silver);
    text-align: center;
    padding: 15px;
    margin: 15px;
    width: 30%;
    min-width: 300px;
}

a.product-link:hover {
    border: 1px solid var(--black);
}
</style>
