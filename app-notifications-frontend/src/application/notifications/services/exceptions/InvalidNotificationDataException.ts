import store from "@/application/store";

export default class InvalidNotificationDataException extends Error {
    constructor(message: string) {
        super(message);
        super.name = "InvalidNotificationDataException";
        store.dispatch('alerts/showAlertWarning', message);
    }
}
