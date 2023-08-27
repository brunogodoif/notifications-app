import store from "@/application/store";

export default class GetNotificationException extends Error {
    constructor(message: string, status:string) {
        super(message);
        super.name = "GetNotificationException";
        store.dispatch('alerts/showAlertByStatusHttp', {
            message: message,
            httpStatus: status
        });
    }
}
