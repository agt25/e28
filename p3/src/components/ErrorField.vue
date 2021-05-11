<template>
    <ul>
        <li
            v-for="(error, index) in errors"
            v-bind:key="index"
            class="form-feedback-error"
        >
            {{ error }}
        </li>
    </ul>
</template>

<script>
export default {
    props: ["errors"],
};
</script>

<style scoped>

.form-feedback-error {
    color: teal;
    font-size: 0.9rem;
}


</style>