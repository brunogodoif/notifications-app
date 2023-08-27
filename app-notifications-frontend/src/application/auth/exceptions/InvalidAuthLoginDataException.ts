import store from '@/application/store';

export default class InvalidAuthLoginDataException extends Error {
    constructor(message: string) {
        super(message);
        super.name = "InvalidAuthLoginDataException";
        store.dispatch('alerts/showAlertWarning', message);
    }


}
