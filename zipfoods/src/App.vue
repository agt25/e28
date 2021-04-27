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
                        >{{ link }}</router-link
                    >
                </li>
            </ul>
        </nav>

        <!-- binding the API data to router-view so we can use it as props on other pages 
        and triger based on update-product $emit from createPage-->
        <router-view
            v-bind:products="products"
            
            v-on:update-products="loadProducts"
        ></router-view>
    </div>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
    name: "App",
    data() {
        return {
            products: [],

            /* Store links in an array to maintain order */
            links: ["home", "products", "add a product", "categories"],

            /* Map links to  the appropriate component */
            paths: {
                home: "/",
                products: "/products",
                "add a product": "/product/new",
                categories: "/categories",
            },
        };
    },
    mounted() {
        this.loadProducts();
    },
    methods: {
        loadProducts() {
            // "product" is the url end point
            axios.get("product").then((response) => {
                this.products = response.data.product;
            });
        },
    },
};
</script>

<style src='@/assets/css/zipfoods.css'></style>

<style>
</style>
