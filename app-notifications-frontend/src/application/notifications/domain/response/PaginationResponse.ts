export default class PaginationResponse {

    private limit: number;
    private page: number;
    private total: number;
    private path: string;
    private nextPage: number;
    private totalPages: number;

    constructor(limit: number, page: number, total: number, path: string, nextPage: number, totalPages: number) {
        this.limit = limit;
        this.page = page;
        this.total = total;
        this.path = path;
        this.nextPage = nextPage;
        this.totalPages = totalPages;
    }

    public static nullPagination() {
        return new PaginationResponse(1, 0, 0, "", 0, 0);
    }

    getLimit(): number {
        return this.limit;
    }

    getPage(): number {
        return this.page;
    }

    getTotal(): number {
        return this.total;
    }

    getPath(): string {
        return this.path;
    }

    getNextPage(): number {
        return this.nextPage;
    }

    getTotalPages(): number {
        return this.totalPages;
    }
}