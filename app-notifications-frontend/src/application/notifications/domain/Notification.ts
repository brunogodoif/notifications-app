import Notice from "@/application/notifications/domain/Notice";
import NotificationUser from "@/application/notifications/domain/NotificationUser";

export default class Notification {
    private id: number;
    private idNotice: number;
    private alias: string;
    private published: boolean;
    private status: boolean;
    private inactivationDate: string;
    private inactivationReason: string;
    private notice: Notice;
    private notificationUser: NotificationUser;
    private createdAt: string;
    private updatedAt: string;

    constructor(id: number, idNotice: number, alias: string, published: boolean, status: boolean, inactivationDate: string, inactivationReason: string, notice: Notice, noticeUser: NotificationUser, createdAt: string, updatedAt: string) {
        this.id = id;
        this.idNotice = idNotice;
        this.alias = alias;
        this.published = published;
        this.status = status;
        this.inactivationDate = inactivationDate;
        this.inactivationReason = inactivationReason;
        this.notice = notice;
        this.notificationUser = noticeUser;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromApi(data: any): Notification {
        if (data !== undefined && data !== null) {
            return new Notification(
                data.id,
                data.idNotice,
                data.alias,
                data.published,
                data.status,
                data.inactivationDate,
                data.inactivationReason,
                Notice.fromApi(data.notice),
                NotificationUser.fromApi(data.notificationUser),
                data.createdAt,
                data.updatedAt,
            );
        }
        return null;
    }


    public getId(): number {
        return this.id;
    }

    public getIdNotice(): number {
        return this.idNotice;
    }

    public getAlias(): string {
        return this.alias;
    }

    public getPublished(): boolean {
        return this.published;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public getInactivationDate(): string {
        return this.inactivationDate;
    }

    public getInactivationReason(): string {
        return this.inactivationReason;
    }

    public getNotice(): Notice {
        return this.notice;
    }

    public getNotificationUser(): NotificationUser {
        return this.notificationUser;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public getUpdatedAt(): string {
        return this.updatedAt;
    }

    public setStatus(status: boolean): void {
        this.status = status;
    }
}