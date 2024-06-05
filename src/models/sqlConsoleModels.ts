export interface ISqlQuery {
  host: string,
  baseName: string,
  sqlText: string,
  queryType: queryType
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
export type queryType = 'user' | 'system'