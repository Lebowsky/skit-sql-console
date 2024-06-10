export interface ISqlQuery {
  host: string,
  databaseName: string,
  sqlText: string,
  queryType: queryType,
  dataType: dataType
}

export interface IColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface IRowData {
  [key: string]: string
}

export interface ISqlTableData {
  columns: IColumn[]
  data?: IRowData[]
}

export interface ISqlResponse {
  tableData: ISqlTableData
  queryType: queryType
}

export interface ISideMenuData {
  label: string
  childs: string[]
}
export type queryType = 'user' | 'system'
export type dataType = 'tables' | 'columns' | 'data'