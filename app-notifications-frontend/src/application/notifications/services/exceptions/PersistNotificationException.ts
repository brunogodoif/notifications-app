import store from "@/application/store";

export default class PersistNotificationException extends Error {
    constructor(message: string, status:string) {
        super(message);
        super.name = "PersistNotificationException";
        store.dispatch('notifications/showAlertByStatusHttp', {
            message: message,
            httpStatus: status
        });
    }
}
