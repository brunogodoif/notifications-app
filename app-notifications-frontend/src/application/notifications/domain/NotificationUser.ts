export default class NotificationUser {
    private idUser: number
    private seen: boolean
    private dateSeen: string

    constructor(idUser: number, seen: boolean, dateSeen: string) {
        this.idUser = idUser;
        this.seen = seen;
        this.dateSeen = dateSeen;
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

    public static fromApi(data: any): NotificationUser {
        if (data !== undefined && data !== null) {
            return new NotificationUser(
                data.idUser,
                data.seen,
                data.dateSeen
            )
        }
        return null;

    }
}