import { ISideMenuData, ISqlTableData, currentStates, deviceStatuses, queryType } from "./sqlConsoleModels"

export interface ISqlConsoleContext {
  host: string
  setHost(host: string): void
  databaseName: string
  setDatabaseName(databaseName: string): void
  connectToDevice(): Promise<boolean>
  sendQuery(type?: queryType): void
  deviceStatus: deviceStatuses
  sqlText: string 
  setSqlText(text: string): void
  sqlTableData: {[key: string]: string[]}
  sideMenu: ISideMenuData[]
  currentState: currentStates
  setCurrentState(newState: currentStates): void
}