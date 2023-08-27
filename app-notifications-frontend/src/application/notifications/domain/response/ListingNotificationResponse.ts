import Notification from "@/application/notifications/domain/Notification";
import PaginationResponse from "@/application/notifications/domain/response/PaginationResponse";

export default class ListingNotificationResponse {

    private data: Array<Notification> = [];
    private pagination: PaginationResponse;

    constructor(patientsList: Array<Notification>, pagination: PaginationResponse) {
        this.data = patientsList;
        this.pagination = pagination;
    }

    public getData(): Array<Notification> {
        return this.data;
    }

    public setData(value: Array<Notification>): void {
        this.data = value;
    }

    public add(value: Notification) {
        this.data.push(value);
    }

    public unsetById(id: string): void {
        this.setData(
            this.data.filter((list: Notification) => list.getId().toString() !== id)
        )
    }

    public getPagination(): PaginationResponse {
        return this.pagination;
    }

    public static nullReponse() {
        return new ListingNotificationResponse([], PaginationResponse.nullPagination());
    }

    public updateNotificationStatus(id: string, status: boolean): void {
        const notificationToUpdate = this.data.find(notification => notification.getId().toString() === id);
        if (notificationToUpdate) {
            notificationToUpdate.setStatus(status);
        }
    }
}