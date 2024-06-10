import { ISqlQuery } from "./models/sqlConsoleModels";

export interface IElectronAPI {
  sendQuery: (query: ISqlQuery) => Promise<[{[key: string]: string[]}, string]>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}