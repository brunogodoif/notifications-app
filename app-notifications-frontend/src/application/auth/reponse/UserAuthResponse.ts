export default class UserAuthResponse {

    private id: string;
    private name: string;
    private email: string;
    private createdAt: string;
    private updatedAt: string;

    public fill(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        return this;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public getUpdatedAt(): string {
        return this.updatedAt;
    }
}