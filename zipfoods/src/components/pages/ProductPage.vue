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

            <button v-on:click="addToCart" data-test="add-to-cart-button">
                Add to cart
            </button>

            <transition name="fade">
                <div
                    class="alert"
                    v-if="addConfirmation"
                    data-test="add-to-cart-confirmation"
                >
                    This product was added to your cart!
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import ShowProduct from "@/components/ShowProduct.vue";

import { cart } from "@/common/app.js";

export default {
    components: {
        "show-product": ShowProduct,
    },
    props: {
        id: {
            type: String,
        },
    },
    data() {
        return {
            addConfirmation: false,
        };
    },
    computed: {
        product() {
            return this.$store.getters.getProductById(this.id);
        },
        productNotFound() {
            return this.product == null;
        },
        products() {
            return this.$store.state.products;
        },
    },
    methods: {
        addToCart() {
            console.log(this.product.id);

            cart.add(this.product.id);

            this.$store.commit("setCartCount", cart.count());

            this.addConfirmation = true;

            setTimeout(() => {
                this.addConfirmation = false;
            }, 3000);
        },
    },
};
</script>

<style scoped>
</style>