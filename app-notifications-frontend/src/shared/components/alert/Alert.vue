<template>
    <div class="alert_container col-6">
        <TransitionGroup name="list" tag="div">
            <div v-for="message in messages" :key="message.id">

                <div class="alert alert-dismissible fade show" role="alert" :class="message.type"
                     :id="message.id">
                    <h5><i class="" :class="message.icon"></i>{{ message.message }}</h5>
                    <button type="button" class="close btn-close" data-dismiss="alert" aria-label="Close"  @click="closeNotification(message.id)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

            </div>
        </TransitionGroup>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import store from '@/application/store';

export default defineComponent({
    name: 'Alert',
    props: {
        messages: {
            type: Array,
            required: true,
        }
    },
    methods: {
        closeNotification(id: number) {
            store.dispatch('notifications/hideAlert', id)
        }
    },
})

</script>
<style scoped>

.alert_container {
    position: absolute !important;
    z-index: 9999;
    top: 50;
    right: 0;
    margin-right: 1%;
}

.alert {
    position: relative !important;
    top: 0;
    z-index: 9998;
    width: 100%;
}

.btn-close {
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1;
    color: #000;
    opacity: 0.5;
    background-color: transparent;
    border: none;
}

.btn-close:hover {
    color: #000;
    opacity: 0.75;
    text-decoration: none;
    cursor: pointer;
}
</style>
