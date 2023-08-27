import store from "@/application/store";

export default class DeactivateNotificationException extends Error {
    constructor(message: string, status: string) {
        super(message);
        super.name = "DeactivateNotificationException";
        store.dispatch('notifications/showAlertByStatusHttp', {
            message: message,
            httpStatus: status
        });
    }
}
