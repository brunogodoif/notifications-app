export default class NotificationPersist {
    private id: string;
    private title: string;
    private description: string;
    private author: string;
    private idUser: number;
    private seen: boolean;
    private dateSeen: string;
    private alias: string;
    private published: boolean;
    private status: boolean;

    constructor(id: string, title: string, description: string, author: string, idUser: number, seen: boolean, dateSeen: string, alias: string, published: boolean, status: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.idUser = idUser;
        this.seen = seen;
        this.dateSeen = dateSeen;
        this.alias = alias;
        this.published = published;
        this.status = status;
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getIdUser(): number {
        return this.idUser;
    }

    public getSeen(): boolean {
        return this.seen;
    }

    public getDateSeen(): string {
        return this.dateSeen;
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
}