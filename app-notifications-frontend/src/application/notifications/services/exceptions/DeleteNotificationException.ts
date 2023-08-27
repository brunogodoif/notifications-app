import store from "@/application/store";

export default class DeleteNotificationException extends Error {
    constructor(message: string, status:string) {
        super(message);
        super.name = "DeleteNotificationException";
        store.dispatch('alerts/showAlertByStatusHttp', {
            message: message,
            httpStatus: status
        });
    }
}
