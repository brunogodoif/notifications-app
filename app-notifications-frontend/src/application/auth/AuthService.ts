import {apiClient} from "@/application/utils/RestResource";
import store from '@/application/store';
import AuthRequest from "@/application/auth/request/AuthRequest";
import AuthenticatedResponse from "@/application/auth/reponse/AuthenticatedResponse";
import UserAuthResponse from "@/application/auth/reponse/UserAuthResponse";
import AuthLoginException from "@/application/auth/exceptions/AuthLoginException";
import router from "@/router";

export default class AuthService {

    private url = "auth";

    async login(authRequest: AuthRequest): Promise<AuthenticatedResponse> {
        const resource = this.url + "/login";
        try {
            const responseRequest = await apiClient.post(resource, authRequest.getDataStringify());
            if (responseRequest.status === 200 && responseRequest.data.token != null) {
                store.dispatch('alerts/showAlertSuccess', "Autenticado com sucesso!");
                return new AuthenticatedResponse(true, responseRequest.data.token);
            }
        } catch (err: any) {
            throw new AuthLoginException(err.response.data.message, err);
        }
    }

    async getUser(): Promise<UserAuthResponse | void> {
        const resource = this.url + "/user";
        return await apiClient.get(resource).then(async (responseRequest) => {
            if (responseRequest.status == 200) {
                return new UserAuthResponse().fill(responseRequest.data)
            }
        }).catch((err: any) => {
            store.dispatch('alerts/showAlertByStatusHttp', {
                message: err.response.data.message,
                httpStatus: err.response.status
            });
        });

    }

    async logout(): Promise<void> {
        await store.dispatch('alerts/hideAllNotifications');
        await store.dispatch('auth/execLogout');
        setTimeout(() => {
            router.push({name: 'login'});
        }, 100);
    }

}