import RowColumn from "@/shared/components/table/RowColumn";
import Row from "@/shared/components/table/Row";

export default class TableData {

    private columns: Array<RowColumn> = [];
    private rows: Array<Row> = [];

    public addColumn(column: RowColumn): this {
        this.columns.push(column)
        return this;
    }

    public addColumns(columns: Array<RowColumn>): this {
        columns.forEach(column => {
            this.columns.push(column)
        });
        return this;
    }

    public clearColumns(): this {
        this.columns = [];
        return this;
    }

    public clearAndAddColumns(columns: Array<RowColumn>): this {
        return this.clearRows().addColumns(columns);
    }

    public addRow(row: Row): this {
        this.rows.push(row);
        return this;
    }

    public addRows(rows: Array<Row>): this {
        rows.forEach(row => {
            this.rows.push(row)
        });
        return this;
    }

    public clearRows(): this {
        this.rows = [];
        return this;
    }

    public clearAndAddRows(rows: Array<Row>): this {
        return this.clearRows().addRows(rows);
    }

    public getColumns(): Array<RowColumn> {
        return this.columns;

    }

    public getRows(): Array<Row> {
        return this.rows;
    }
}