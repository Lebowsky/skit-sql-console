
import "@blueprintjs/table/lib/css/table.css";
import { Cell, Column, Table2 } from "@blueprintjs/table";

const dollarCellRenderer = (rowIndex: number) => (
  <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
);
const euroCellRenderer = (rowIndex: number) => (
  <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
);

export function SqlTable() {
  return (
      <Table2 numRows={30}>
        <Column name="Dollars" cellRenderer={dollarCellRenderer} />
        <Column name="Euros" cellRenderer={euroCellRenderer} />
      </Table2>
  )
}