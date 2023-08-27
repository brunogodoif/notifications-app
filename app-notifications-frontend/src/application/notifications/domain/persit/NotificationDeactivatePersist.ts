export default class NotificationDeactivatePersist {
    private inactivationReason: string

    constructor(inactivationReason: string) {
        this.inactivationReason = inactivationReason;
    }


    public getInactivationReason(): string {
        return this.inactivationReason;
    }
}