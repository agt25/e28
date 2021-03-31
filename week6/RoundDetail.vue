
<!-- HTML --> 
<template> 
<div>
    <ul>
        <li>Round #: {{ number }}</li>
        <li>Winner: {{ winner }}</li>
        <li>
            <slot name='coin'></slot>
        </li>
        <li>The player's choice was {{ choice }}</li>
    </ul>
    <button v-on:click='$emit("delete-round", number)'>Delete from history</button>
</div>
</template>


<script>

// JavaScript Component 
export default {
    name: 'RoundDetail',
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
        }
    },
    data() {
        return {}
    },
    
}

</script>

<!-- CSS -->
<style>
[v - cloak]{
    display: none;
}

#history div {
    background - color: #eee;
    padding: 10 px;
    margin: 10 px 0;
    width: 300 px;
}
</style>