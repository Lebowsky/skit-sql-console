
import { Intent } from "@blueprintjs/core";
import { Column, EditableCell2, Table2 } from "@blueprintjs/table";

export const QueryParamsTable = () => {
  const columnNames = ["params"]

  const renderCell = (rowIndex: number, columnIndex: number) => {
    return (
      <EditableCell2
        value={'text'}
        intent={Intent.NONE}
        onConfirm={(content) => {
          const cellData = {
            rowIndex,
            columnIndex,
            content
          }
          console.log('onConfirm', cellData)
        }}
      />
    );
  };

  const columns = columnNames.map((_: string, index: number) => {
    return (
      <Column key={index} name={'params'} cellRenderer={renderCell}/>
    );
  });

  return (
    <Table2 numRows={7}>{columns}</Table2>
  )
}