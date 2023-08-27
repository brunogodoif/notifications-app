import store from "@/application/store";

export default class ActivateNotificationException extends Error {
    constructor(message: string, status: string) {
        super(message);
        super.name = "ActivateNotificationException";
        store.dispatch('alerts/showAlertByStatusHttp', {
            message: message,
            httpStatus: status
        });
    }
}
