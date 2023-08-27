<template>
    <div>
        <button class="btn btn-default" :class="this.format">
            <i :class="this.icon"></i>
            {{ this.label}}
        </button>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "ButtonComponent",
    props: {
        label: {
            required: false,
            type: String,
        },
        icon: {
            required: false,
            type: String,
            default: "",
        },
        format: {
            required: false,
            type: String,
            default: "",
        }
    }
})
</script>

<style scoped>
.btn-default {
    background-color: #6a1b9a;
    color: #fff;
    cursor: pointer;
}

.btn-default:hover {
    background-color: #420a5e;
    color: #fff;
}

.btn-default:active {
    background-color: #6d06a1;
    color: #fff;
}

.btn-circle {
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}
</style>