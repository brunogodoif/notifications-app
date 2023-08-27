import InvalidAuthLoginDataException from "@/application/auth/exceptions/InvalidAuthLoginDataException";

export default class AuthRequest {

    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email
        this.password = password;
        this.validate();
    }

    private validate(){
        if (this.email == '' || this.password == '') {
            throw new InvalidAuthLoginDataException('Insira os dados de e-mail e senha para efetuar o login');
        }
    }
    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getDataStringify(): any {
        return JSON.stringify({email: this.email, password: this.password});
    }
}