export default class NotificationPersistResponse {

    private id: number;
    private idNotice: number;
    private alias: string;
    private published: string;
    private status: boolean;
    private createdAt: string;
    private updatedAt: string;


    constructor(id: number, idNotice: number, alias: string, published: string, status: boolean, createdAt: string, updatedAt: string) {
        this.id = id;
        this.idNotice = idNotice;
        this.alias = alias;
        this.published = published;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromApi(data: any): NotificationPersistResponse {
        if (data !== undefined && data !== null) {
            return new NotificationPersistResponse(
                data.id,
                data.idNotice,
                data.alias,
                data.published,
                data.status,
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

    public getPublished(): string {
        return this.published;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public getUpdatedAt(): string {
        return this.updatedAt;
    }
}