import { ISideMenuData, queryType } from "./sqlConsoleModels"

export interface ISqlConsoleContext {
  host: string
  setHost(host: string): void
  databaseName: string
  setDatabaseName(databaseName: string): void
  connectToDevice(): void
  sendQuery(sqlText: string, type?: queryType): void
  // sqlTableData: ISqlTableData
  // sqlTablesList: {[key: string]: string}[]
  isConnected: boolean
  sideMenu: ISideMenuData[]
}