export default class CustomButtonTableActionEvent {

    public btnTypeCss: string
    public btnIconCss: string
    public eventEmit: string;

    constructor(btnTypeCss: string, btnIconCss: string, eventEmit: string) {
        this.btnTypeCss = btnTypeCss;
        this.btnIconCss = btnIconCss;
        this.eventEmit = eventEmit;
    }

    public getBtnTypeCss(): string {
        return this.btnTypeCss;
    }
    public getBtnIconCss(): string {
        return this.btnIconCss;
    }
    public getEventEmit(): string {
        return this.eventEmit;
    }


}