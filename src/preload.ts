import { contextBridge, ipcRenderer } from 'electron'
import { ISqlQuery } from './models/sqlConsoleModels'

contextBridge.exposeInMainWorld('electronAPI', {
  sendQuery: (props: ISqlQuery) => ipcRenderer.invoke('send-query', {...props}),
})