import { ISideMenuData, ISqlQuery } from "./models/sqlConsoleModels";

export interface IElectronAPI {
  sendQuery: (query: ISqlQuery) => Promise<[string | null, {[key: string]: string[] | null}]>,
  getMetadata: ({ host: string, databaseName: string }) => Promise<[string | null, ISideMenuData[] | null]>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}