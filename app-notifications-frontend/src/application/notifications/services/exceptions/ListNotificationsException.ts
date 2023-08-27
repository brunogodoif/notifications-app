import store from "@/application/store";

export default class ListNotificationsException extends Error {
    constructor(message: string, status: string) {
        super(message);
        super.name = "ListNotificationsException";
        store.dispatch('notifications/showAlertByStatusHttp', {
            message: message,
            httpStatus: status
        });
    }
}
