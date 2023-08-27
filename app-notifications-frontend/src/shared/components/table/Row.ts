import RowValue from "@/shared/components/table/RowValue";

export default class Row {

    public id: string;
    public rowValues: Array<RowValue>;


    constructor(id: string, rowsValues: Array<RowValue>) {
        this.id = id;
        this.rowValues = rowsValues;
    }

    public getId(): string {
        return this.id;
    }

    public getRowValues(): Array<RowValue> {
        return this.rowValues;
    }

}