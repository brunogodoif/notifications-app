import store from "@/application/store";

export default class RepublishNotificationException extends Error {
    constructor(message: string, status:string) {
        super(message);
        super.name = "RepublishNotificationException";
        store.dispatch('alerts/showAlertByStatusHttp', {
            message: message,
            httpStatus: status
        });
    }
}
