export default class AuthenticatedResponse {

    private isLoggedIn: boolean;
    private token: string;

    constructor(isLoggedIn: boolean, token: string) {
        this.isLoggedIn = isLoggedIn;
        this.token = token;
    }

    public getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    public getToken(): string {
        return this.token;
    }

}