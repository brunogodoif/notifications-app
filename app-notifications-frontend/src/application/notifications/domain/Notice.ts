export default class Notice {

    private title: string;
    private description: string;
    private author: string;

    constructor(title: string, description: string, author: string) {
        this.title = title;
        this.description = description;
        this.author = author;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getAuthor(): string {
        return this.description;
    }

    public static fromApi(data: any): Notice {
        if (data !== undefined && data !== null) {
            return new Notice(
                data.title,
                data.description,
                data.author,
            );
        }
        return null;
    }
}