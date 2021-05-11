<template>
    <div>
        <h2>Add a Product</h2>

        <small class="form-help">All fields are required</small>

        <div id="inputs">
            <label for="name">Name</label>
            <input
                type="text"
                v-model="product.name"
                id="name"
                data-test="product-name-input"
            />
            <small class="form-help">Min: 3, Max: 100</small>
            <error-field
                v-if="errors && 'name' in errors"
                v-bind:errors="errors.name"
            ></error-field>

            <label for="sku">SKU:</label>
            <input
                type="text"
                v-model="product.sku"
                id="sku"
                data-test="product-sku-input"
            />
            <small class="form-help"
                >Min: 3, Max: 100. Letters and dashes only.</small
            >
            <error-field
                v-if="errors && 'sku' in errors"
                v-bind:errors="errors.sku"
            ></error-field>

            <label for="price">Price:</label>
            <input
                type="text"
                v-model="product.price"
                id="price"
                data-test="product-price-input"
            />
            <small class="form-help">Enter a decimal value number</small>
            <error-field
                v-if="errors && 'price' in errors"
                v-bind:errors="errors.price"
            ></error-field>

            <label for="available">Quantity available:</label>
            <input
                type="text"
                v-model="product.available"
                id="available"
                data-test="product-available-input"
            />
            <small class="form-help">Enter a whole number</small>
            <error-field
                v-if="errors && 'available' in errors"
                v-bind:errors="errors.available"
            ></error-field>

            <label for="weight">Weight (in lbs):</label>
            <input
                type="text"
                v-model="product.weight"
                id="weight"
                data-test="product-weight-input"
            />
            <error-field
                v-if="errors && 'weight' in errors"
                v-bind:errors="errors.weight"
            ></error-field>

            <label for="perishable" class="form-checkbox-label">
                <input
                    type="checkbox"
                    v-model="product.perishable"
                    id="perishable"
                    data-test="product-perishable-checkbox"
                />
                Perishable?
            </label>

            <label for="description">Description</label>
            <textarea
                v-model="product.description"
                id="description"
                data-test="product-description-textarea"
            ></textarea>
            <small class="form-help">Min:100</small>
            <error-field
                v-if="errors && 'description' in errors"
                v-bind:errors="errors.description"
            ></error-field>
        </div>

        <button v-on:click="addProduct" data-test="add-product-button">
            Add Product
        </button>

        <div class="form-feedback-error" v-if="errors">
            Please correct the above errors
        </div>

        <transition name="fade">
            <div
                class="alert"
                v-if="showConfirmation"
                data-test="product-added-confirmation"
            >
                Your product was added
            </div>
        </transition>
    </div>
</template>

<script>
import { axios } from "@/common/app.js";
import ErrorField from "@/components/ErrorField.vue";

export default {
    components: {
        "error-field": ErrorField,
    },
    data() {
        return {
            showConfirmation: false,
            errors: null,
            product: {
                name: "Candy Heart Grapes",
                sku: "candy-heart-grapes-" + new Date().valueOf(),
                price: 5.99,
                available: 25,
                weight: 2,
                perishable: true,
                description:
                    "Next time the kids are craving candy, hand them a bowl of seedless Candy Heart grapes. Plump, red, and bursting with juice, they taste a little like raspberry lemonade and are just as refreshing. So go ahead and eat your heart out!",
            },
        };
    },
    methods: {
        addProduct() {
            axios.post("/product", this.product).then((response) => {
                if (response.data.errors) {
                    this.errors = response.data.errors;
                    this.showConfirmation = false;
                } else {
                    this.product = {
                        name: "",
                        slug: "",
                        price: "",
                        available: "",
                        weight: "",
                        perishable: false,
                        description: "",
                    };

                    this.$emit("update-products");
                    this.showConfirmation = true;

                    // Fade out confirmation after 3 seconds
                    setTimeout(() => (this.showConfirmation = false), 3000);
                }
            });
        },
    },
};
</script>

<style scoped>
#inputs {
    text-align: left;
}

textarea {
    height: 100px;
}

button {
    margin-bottom: 10px;
}
</style>