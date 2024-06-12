import { createContext, useContext, useState } from "react";
import { ISqlConsoleContext } from "../models/contextProvider";
import { currentStates, ISideMenuData, dataType, deviceStatuses, queryType } from "../models/sqlConsoleModels";
import { getStorageData, updateStorageData } from "../utils/localStorageUtils";

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

  async function sendQuery(
    type: queryType = 'user',
    dataType: dataType = 'data'
  ) {
    try {
      const [result, err] = await window.electronAPI.sendQuery(
        {
          host: host,
          databaseName: databaseName,
          sqlText: sqlText,
          queryType: type,
          dataType: dataType
        }
      )
      if (err) {
        console.log(err)
        return
      }
      updateStorageData(
        'sqlScreenData',
        {
          sqlQueryText: sqlText
        }
      )
      setSqlTableData(result)
    } catch (err) {
      console.log(err)
    }
  }

  async function connectToDevice(): Promise<boolean> {
    try {
      setDeviceStatus(deviceStatuses.connecting)
      const metadata = await window.electronAPI.getMetadata({ host, databaseName })
      setSideMenu([...metadata])
      setDeviceStatus(deviceStatuses.connected)
      updateStorageData(
        'sqlScreenData',
        {
          deviceHost: host,
          sqlBaseName: databaseName,
        }
      )
      return true
    } catch (err) {
      setDeviceStatus(deviceStatuses.notConnected)
      console.log('connectToDevice:\n' + err)
      return false
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