import { contextBridge, ipcRenderer } from 'electron'
import { ISqlQuery } from './models/sqlConsoleModels'

contextBridge.exposeInMainWorld('electronAPI', {
  sendQuery: (props: ISqlQuery) => ipcRenderer.invoke('send-query', {...props}),
  getMetadata: (props: {host: string, databaseName: string}) => ipcRenderer.invoke('get-sql-metadata', {...props}),
})