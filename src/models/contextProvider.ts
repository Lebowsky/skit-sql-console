import { ISideMenuData, deviceStatuses, queryType } from "./sqlConsoleModels"

export interface ISqlConsoleContext {
  host: string
  setHost(host: string): void
  databaseName: string
  setDatabaseName(databaseName: string): void
  connectToDevice(): void
  sendQuery(sqlText: string, type?: queryType): void
  deviceStatus: deviceStatuses
  // sqlTableData: ISqlTableData
  // sqlTablesList: {[key: string]: string}[]
  sideMenu: ISideMenuData[]
}