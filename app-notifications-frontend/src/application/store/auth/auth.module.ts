import AuthenticatedResponse from "@/application/auth/reponse/AuthenticatedResponse";
import UserAuthResponse from "@/application/auth/reponse/UserAuthResponse";

export default {
    namespaced: true,
    state: {
        token: "",
        userData: null
    },
    mutations: {
        SET_TOKEN(state: any, token: string) {
            state.token = token;
        },
        EXEC_LOGOUT(state: any) {
            state.token = "";
            state.userData = null;
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
        },
        SET_TOKEN_IN_STORE(state: any, token: string) {
            localStorage.setItem("token", token);
        },
        SET_USER_DATA(state: any, userData: UserAuthResponse) {
            state.userData = userData;
        },
        SET_USER_DATA_IN_STORE(state: any, userData: UserAuthResponse) {
            localStorage.setItem("userData", JSON.stringify(userData));
        },
    },
    actions: {
        setLogged(context: any, authenticated: AuthenticatedResponse) {
            context.commit('SET_TOKEN', authenticated.getToken());
            context.commit('SET_TOKEN_IN_STORE', authenticated.getToken());
        },
        setUserLogged(context: any, userData: UserAuthResponse) {
            context.commit('SET_USER_DATA', userData);
            context.commit('SET_USER_DATA_IN_STORE', userData);
        },
        execLogout(context: any) {
            context.commit('EXEC_LOGOUT');
        },
    },
    getters: {
        isLoggedIn: function (state: any): boolean {
            return localStorage.getItem("token") !== null;
        },
        getToken: function (state: any) {
            return localStorage.getItem("token")
        },
        getUserData: function (state: any): UserAuthResponse {
            return new UserAuthResponse().fill(JSON.parse(localStorage.getItem("userData")));
        }
    }
}