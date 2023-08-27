<template>
    <div></div>
</template>
<script>
import AuthService from "@/application/auth/AuthService";

export default {
    name: "AuthLogout",
    created() {
        const authService = new AuthService();
        authService.logout();
    }
}
</script>
