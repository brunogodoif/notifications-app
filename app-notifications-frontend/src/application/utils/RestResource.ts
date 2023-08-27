import store from '@/application/store';
import axios, {AxiosInstance,} from 'axios';

const defaultApiUrl = process.env.VUE_APP_API_BACKEND
console.log(process.env.VUE_APP_VERSION);
console.log(process.env.VUE_APP_API_BACKEND);
const apiClient: AxiosInstance = axios.create({
    baseURL: defaultApiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token")
        config.headers['Authorization'] = 'Bearer ' + token
        store.dispatch('spinner/updateIsLoading', true)
        return config;
    },
    (error) => {
        store.dispatch('spinner/updateIsLoading', false)
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        store.dispatch('spinner/updateIsLoading', false)
        return response;
    },
    (error) => {
        store.dispatch('spinner/updateIsLoading', false)

        if (error.code === "ERR_NETWORK") {
            store.dispatch('notifications/showAlertByStatusHttp', {
                message: "Falha de comunicação com servidor",
                httpStatus: 500
            });
        } else {

            if (error.response.status === 401) {
                if (!error.response.request.responseURL.includes("auth/login")) {
                    store.dispatch('notifications/showAlertWarning', "Acesso não autorizado!");
                }
            }

            if (error.response.status === 403) {
                store.dispatch('notifications/showAlertWarning', "Acesso ao recurso não autorizado!");
            }

        }
        return Promise.reject(error);
    }
);

export {apiClient}