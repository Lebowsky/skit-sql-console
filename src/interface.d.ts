export interface IElectronAPI {
  sendQuery: (query: ISqlQuery) => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}