import { createContext, useContext, useState } from "react";
import { ISqlConsoleContext } from "../models/contextProvider";
import { currentStates, ISideMenuData, deviceStatuses } from "../models/sqlConsoleModels";
import { getStorageData, updateStorageData } from "../utils/localStorageUtils";
import { Intent } from "@blueprintjs/core";
import { AppToaster } from "../utils/toaster";

const SqlConsoleContext = createContext<ISqlConsoleContext | null>(null)

interface SqlConsoleContextProvider {
  children: React.ReactNode
}

export function SqlConsoleContextProvider({ children }: SqlConsoleContextProvider) {
  const sqlScreenData = getStorageData('sqlScreenData')
  let sqlQueryText = '', deviceHost = '', sqlBaseName = ''
  if (sqlScreenData) {
    ({ sqlQueryText, deviceHost, sqlBaseName } = sqlScreenData)
  }

  const [deviceStatus, setDeviceStatus] = useState<deviceStatuses>(deviceStatuses.notConnected)
  const [host, setHost] = useState(deviceHost)
  const [databaseName, setDatabaseName] = useState(sqlBaseName)
  const [sqlText, setSqlText] = useState(sqlQueryText)
  const [sideMenu, setSideMenu] = useState<ISideMenuData[]>([])
  const [sqlTableData, setSqlTableData] = useState<{ [key: string]: string[] }>({})
  const [currentState, setCurrentState] = useState<currentStates>(currentStates.readOnly)

  async function sendQuery() {
    setDeviceStatus(deviceStatuses.executing)
    const [error, result] = await window.electronAPI.sendQuery({ host, databaseName, sqlText })

    if (error) {
      processingError(error)
      setDeviceStatus(deviceStatuses.connected)
      return
    }
    
    updateStorageData('sqlScreenData', { sqlQueryText: sqlText })
    setSqlTableData(result)
    setDeviceStatus(deviceStatuses.connected)
  }

  async function connectToDevice(): Promise<boolean> {
    setDeviceStatus(deviceStatuses.connecting)
    const [error, metadata] = await window.electronAPI.getMetadata({ host, databaseName })

    if (error) {
      processingError(error)
      setDeviceStatus(deviceStatuses.notConnected)
      return false
    }

    setSideMenu([...metadata])
    setDeviceStatus(deviceStatuses.connected)
    updateStorageData('sqlScreenData', { deviceHost: host, sqlBaseName: databaseName })
    setDeviceStatus(deviceStatuses.notConnected)
    
    return true
  }

  function processingError(rawError: string){
    const error = JSON.parse(rawError)
    
    if (error.name === 'ConnectionError') {
      AppToaster.show({ message: "No connection", intent: Intent.DANGER })
      console.error(error.message)
    } else if (error.name === 'EmptyResponseError') {
        AppToaster.show({ message: "Query error. Is the SQL syntax correct?", intent: Intent.DANGER })
        setDeviceStatus(deviceStatuses.connected)
    } else {
      AppToaster.show({ message: `Something went wrong. Unhandled error: ${error.message}`, intent: Intent.DANGER })
      console.error(error.stack)
    }
  }

  return (
    <SqlConsoleContext.Provider
      value={{
        host,
        setHost,
        databaseName,
        setDatabaseName,
        sendQuery,
        connectToDevice,
        deviceStatus,
        sideMenu,
        sqlText,
        setSqlText,
        sqlTableData,
        currentState,
        setCurrentState
      }}
    >
      {children}
    </SqlConsoleContext.Provider>
  )
}

export function useSqlConsole() {
  return useContext(SqlConsoleContext)
}