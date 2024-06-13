import { ISideMenuData, currentStates, deviceStatuses } from "./sqlConsoleModels"

export interface ISqlConsoleContext {
  host: string
  setHost(host: string): void
  databaseName: string
  setDatabaseName(databaseName: string): void
  connectToDevice(): Promise<boolean>
  sendQuery(): void
  deviceStatus: deviceStatuses
  sqlText: string 
  setSqlText(text: string): void
  sqlTableData: {[key: string]: string[]}
  sideMenu: ISideMenuData[]
  currentState: currentStates
  setCurrentState(newState: currentStates): void
}