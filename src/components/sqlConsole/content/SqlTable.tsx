
import "@blueprintjs/table/lib/css/table.css";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { useSqlConsole } from "../../../context/SqlConsoleContext";
import { ISqlConsoleContext } from "../../../models/contextProvider";

export function SqlTable() {
  const { sqlTableData } = useSqlConsole() as ISqlConsoleContext
  const numRows = Object.values(sqlTableData)[0]?.length

  const cellRenderer = (cells: string[], rowIndex: number) => {
    return <Cell>{cells[rowIndex]}</Cell>
  }
  return (
    <Table2 numRows={numRows}>
      {Object.entries(sqlTableData).map(
        ([column, cells]) => (
          <Column key={column} name={column} cellRenderer={(rowIndex: number) => cellRenderer(cells, rowIndex)}/>
        )
      )}
    </Table2>
  )
}