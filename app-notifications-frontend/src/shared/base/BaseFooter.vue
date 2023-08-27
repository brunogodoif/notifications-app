<template>
    <footer class="footer text-center py-3">
        <p>{{ titleApp }} - <b>Versão</b> {{ version }}</p>
    </footer>
</template>

<script>
export default {
    name: "BaseFooter",
    data() {
        return {
            version: process.env.VUE_APP_VERSION,
            titleApp: process.env.VUE_APP_TITLE,
        };
    },
};
</script>
<style scoped>
footer {
    background-color: #6a1b9a;
    color: white;
    padding: 15px 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
}
</style>