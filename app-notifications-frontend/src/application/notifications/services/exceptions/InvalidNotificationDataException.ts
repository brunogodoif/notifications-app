
export default class InvalidNotificationDataException extends Error {
    constructor(message: string) {
        super(message);
        super.name = "InvalidNotificationDataException";
        //store.dispatch('notifications/showAlertWarning', message);
    }
}
