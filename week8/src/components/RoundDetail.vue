<template>
    <div>
        <ul>
            <li>Round number: {{ number }}</li>
            <li>Winner: {{ winner }}</li>
            <li><slot name="coin"></slot></li>
            <li>The player's choice was {{ choice }}</li>
        </ul>
        <button v-on:click="$emit('delete-round', number)">
            Delete from history
        </button>
    </div>
</template>

<script>
export default {
    name: "RoundDetail",
    props: {
        number: {
            type: Number,
            default: 0,
        },
        winner: {
            type: String,
        },
        choice: {
            type: String,
        },
    },
    data() {
        return {};
    },
};
</script>

<style>
#history div {
    background-color: #eee;
    padding: 10px;
    margin: 10px 0;
    width: 300px;
}
</style>