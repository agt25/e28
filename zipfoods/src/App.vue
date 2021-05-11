<template>
    <div>
        <img
            alt="ZipFoods logo"
            id="logo"
            src="@/assets/images/zipfoods-logo.png"
        />
        <nav>
            <ul>
                <li>
                    <router-link
                        v-for="link in links"
                        v-bind:key="link"
                        v-bind:to="paths[link]"
                        v-bind:data-test="'nav-link-' + link"
                    >
                        <span v-if="link == 'cart'" data-test="cart-count"
                            >({{ cartCount }})</span
                        >
                        {{ link }}</router-link
                    >
                </li>
            </ul>
        </nav>

        <router-view v-on:update-products="loadProducts"></router-view>
    </div>
</template>

<script>
import { cart } from "@/common/app.js";

export default {
    name: "App",
    data() {
        return {
            /* Store links in an array to maintain order */
            links: [
                "home",
                "products",
                "add a product",
                "categories",
                "account",
                "cart",
            ],

            /* Map links to  the appropriate component */
            paths: {
                home: "/",
                products: "/products",
                "add a product": "/product/new",
                categories: "/categories",
                account: "/account",
                cart: "/cart",
            },
        };
    },
    computed: {
        cartCount() {
            return this.$store.state.cartCount;
        },
        products() {
            return this.$store.state.products;
        },
    },
    mounted() {
        this.loadProducts();

        this.$store.commit("setCartCount", cart.count());

        this.$store.dispatch("authUser");
    },
    methods: {
        loadProducts() {
            this.$store.dispatch("fetchProducts");
        },
    },
};
</script>

<style src='@/assets/css/zipfoods.css'></style>

<style>
</style>
