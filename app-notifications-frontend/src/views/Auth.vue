<template>
    <div class="login-page">
        <Alert :messages="$store.getters['notifications/getMessages']" class="alert_container" />
        <Spinner v-if="$store.getters['spinner/getIsLoading']" />
        <div class="login-box">
            <div class="card card-outline card-primary">
                <div class="card-body">
                    <p class="login-box-msg">Entre com e-mail e senha para continuar</p>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <div class="input-group">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Email"
                                    v-model="email"
                                    @keyup.enter="login"
                                />
                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="input-group">
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    v-model="password"
                                    @keyup.enter="login"
                                />
                                <span class="input-group-text"><i class="fas fa-lock"></i></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block">Login</button>
                            </div>
                        </div>
                    </form>
                    <p class="mt-2" style="display: none;">
                        <a href="#">Esqueci minha senha</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

import AuthService from "@/application/auth/AuthService";
import AuthRequest from "@/application/auth/request/AuthRequest";
import UserAuthResponse from "@/application/auth/reponse/UserAuthResponse";
import store from "@/application/store";
import AuthenticatedResponse from "@/application/auth/reponse/AuthenticatedResponse";
import router from "@/router";
import Spinner from "@/shared/components/spinner/Spinner.vue";
import Alert from "@/shared/components/alert/Alert.vue";

const authService = new AuthService();
export default defineComponent({
    name: "Auth",
    components: {
        Alert,
        Spinner,
    },
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async login() {
            const authRequest = new AuthRequest(this.email, this.password);
            const authenticated = await authService.login(authRequest);

            if (authenticated instanceof AuthenticatedResponse) {
                store.dispatch('auth/setLogged', authenticated);
                const userDataResponse = await authService.getUser();

                if (userDataResponse instanceof UserAuthResponse) {
                    await store.dispatch('auth/setUserLogged', userDataResponse);
                    setTimeout(() => {
                        router.push({name: 'list-notification'});
                    }, 100);
                }
            } else {
                setTimeout(() => {
                    router.push({name: 'login'});
                }, 100);

            }
        }

    },
    mounted(): void {
        return;
    }
})
</script>
<style scoped>
.alert_container {
    position: absolute !important;
    top: 50;
    right: 0;
    margin-right: 1%;
}

/* Adicione estilos para centralizar o formulário */
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f6f9;
}

.login-box {
    width: 100%;
    max-width: 400px;
}

.card {
    border: none;
}

/* Adicione estilos para ajustar o tamanho da imagem do ícone de envelope */
.input-group-text {
    width: 48px;
}

/* Adicione espaçamento inferior para o botão */
.btn-primary {
    margin-bottom: 1rem;
}
</style>