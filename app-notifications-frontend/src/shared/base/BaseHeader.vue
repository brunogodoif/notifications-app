<template>
    <header class="navbar navbar-purple">
        <div class="container d-flex justify-content-between align-items-center">
            <router-link to="/" class="navbar-logo d-flex align-items-center">
                <span class="fa-solid fa-house icon-spacing"></span>
                Notifications App
            </router-link>
            <div class="user-info d-flex align-items-center">
                <img src="@/assets/avatar.png" alt="Usuário" class="user-avatar rounded-circle img-fluid"/>
                <ButtonComponent :label="'Sair'" :icon="'fa fa-sign-out'"/>
            </div>
        </div>
    </header>
</template>

<script>
import ButtonComponent from "@/shared/components/buttons/ButtonComponent.vue";

export default {
    name: "BaseHeader",
    components: {ButtonComponent},
    data() {
        return {
            version: process.env.VUE_APP_VERSION,
        };
    },
};
</script>
<style scoped>
.navbar-purple {
    background-color: #6a1b9a;
    color: #fff;
}

.navbar-logo {
    color: #fff;
    text-decoration: none;
}

.icon-spacing {
    margin-right: 0.5rem; /* Ajuste o valor conforme necessário */
}

.user-avatar {
    max-width: 40px;
    max-height: 40px;
    margin-right: 20px;
}
</style>