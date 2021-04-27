<template>
    <div class="show-product">
        <div class="name">{{ product.name }}</div>
        <img class="thumb" v-bind:src="imgSrc" />

        <div v-if="detailed">
            <div class="price">${{ product.price }}</div>
            <p class="description">{{ product.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
        },
        detailed: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        imgSrc() {
            try {
                return require("@/assets/images/products/" +
                    this.product.id +
                    ".jpg");
            } catch (e) {
                return require("@/assets/images/products/image-not-available.jpg");
            }
        },
    },
};
</script>

<style scoped>
.name {
    height: 50px;
    font-size: 2rem;
    margin: 5px 0 10px 0;
    vertical-align: baseline;
}

.thumb {
    width: 75%;
    max-width: 300px;
    border-radius: var(--radius);
}

.description {
    margin: auto;
    text-align: left;
    font-style: italic;
    line-height: 1.5;
}

.price {
    font-family: var(--serif-font);
    font-weight: bold;
    font-size: 2rem;
    padding: 10px;
}
</style>