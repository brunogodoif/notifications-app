<template>
    <BaseHeader/>
    <div class="content">
        <Spinner v-if="$store.getters['spinner/getIsLoading']"/>
        <Alert :messages="$store.getters['notifications/getMessages']"></Alert>
        <slot name="content">

        </slot>
    </div>
    <BaseFooter/>
</template>

<script>
import BaseFooter from "@/shared/base/BaseFooter.vue";
import BaseHeader from "@/shared/base/BaseHeader.vue";
import Alert from "@/shared/components/alert/Alert.vue";
import Spinner from "@/shared/components/spinner/Spinner.vue";

export default {
    name: "BaseLayout",
    components: {Spinner, Alert, BaseHeader, BaseFooter}, data() {
        return {
            date: null,
        };
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");

.content {
    background-color: #f2f2f2;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    height: calc(100vh - 60px);
}

.content > .container {
    width: auto;
    padding-left: 0;
    padding-right: 0;
}
</style>
