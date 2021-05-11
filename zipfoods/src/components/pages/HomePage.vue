<template>
    <div id="home-page">
        <p>
            ZipFoods is your one-stop-shop for convenient online grocery
            shopping in the greater Boston area.
        </p>
        <show-featured
            v-bind:category="'snacks'"
            v-bind:products="products"
        ></show-featured>
    </div>
</template>

<script>
import ShowFeatured from "@/components/ShowFeatured.vue";
export default {
    props: {
        products: {
            type: Array,
            default: null,
        },
    },
    components: {
        "show-featured": ShowFeatured,
    },
};
</script>

<style>
</style>