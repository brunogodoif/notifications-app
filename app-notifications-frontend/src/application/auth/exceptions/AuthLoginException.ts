import store from '@/application/store';

export default class AuthLoginException extends Error {
    constructor(message: string, err: any) {
        super(message);
        super.name = "AuthLoginException";
        store.dispatch('alerts/showAlertWarning', message);
    }

}
