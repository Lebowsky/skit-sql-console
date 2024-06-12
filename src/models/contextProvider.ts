import { ISideMenuData, deviceStatuses, queryType } from "./sqlConsoleModels"

export interface ISqlConsoleContext {
  host: string
  setHost(host: string): void
  databaseName: string
  setDatabaseName(databaseName: string): void
  connectToDevice(): void
  sendQuery(type?: queryType): void
  deviceStatus: deviceStatuses
  sqlText: string 
  setSqlText(text: string): void
  // sqlTableData: ISqlTableData
  // sqlTablesList: {[key: string]: string}[]
  sideMenu: ISideMenuData[]
}