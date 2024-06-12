export enum deviceStatuses {
  notConnected = 'notConnected',
  connecting = 'connecting',
  executing = 'executing',
  connected = 'connected'
}

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

export enum currentStates {
  settings = 'settings',
  tables = 'tables',
  editor = 'editor',
  readOnly = 'readOnly'
}
export type queryType = 'user' | 'system'
export type dataType = 'tables' | 'columns' | 'data'