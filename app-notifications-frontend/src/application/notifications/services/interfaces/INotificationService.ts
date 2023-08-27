import Notification from "@/application/notifications/domain/Notification";
import NotificationPersist from "@/application/notifications/domain/persit/NotificationPersist";
import NotificationDeactivatePersist from "@/application/notifications/domain/persit/NotificationDeactivatePersist";
import ListingNotificationResponse from "@/application/notifications/domain/response/ListingNotificationResponse";
import NotificationPersistResponse from "@/application/notifications/domain/persit/NotificationPersistResponse";

declare interface INotificationService {

    list(page: number, limit: number, description?: string): Promise<ListingNotificationResponse>

    persist(notificationPersist: NotificationPersist): Promise<NotificationPersistResponse>

    insert(notificationPersist: NotificationPersist): Promise<any>

    update(notificationPersist: NotificationPersist, id: string): Promise<any>

    get(id: string): Promise<Notification>

    delete(id: string): Promise<boolean>

    activate(id: string): Promise<boolean>

    deactivate(id: string, notificationDeactivatePersist: NotificationDeactivatePersist): Promise<boolean>

    republish(id: string): Promise<boolean>

}

export default INotificationService