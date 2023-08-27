export default class RowValue {

    private value: string;
    private html = false;
    private component: boolean;
    private componentName: string;
    private componentProps: any;


    constructor(value: string, html: boolean, isComponent: boolean, componentName: string, componentProps: any) {
        this.value = value;
        this.html = html;
        this.component = isComponent;
        this.componentName = componentName;
        this.componentProps = componentProps;
    }

    public getValue(): string {
        return this.value;
    }

    public isHtml(): boolean {
        return this.html;
    }

    public isComponent(): boolean {
        return this.component;
    }

    public getComponentName(): string {
        return this.componentName;
    }

    public getComponentProps(): any {
        return this.componentProps;
    }
}