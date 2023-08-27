<template>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch"
               :checked="checkedValue"
               @change="onSwitchChange">
    </div>
</template>

<script>
export default {
    props: {
        checkedValue: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onSwitchChange(event) {
            this.$emit('update:modelValue', event.target.checked);
        },
    },
};
</script>

<style scoped>
</style>
