import { ISideMenuData, ISqlQuery } from "./models/sqlConsoleModels";

export interface IElectronAPI {
  sendQuery: (query: ISqlQuery) => Promise<[{[key: string]: string[]}, string]>,
  getMetadata: ({ host: string, databaseName: string }) => Promise<ISideMenuData[]>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}