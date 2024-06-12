import { createContext, useContext, useState } from "react";
import { ISqlConsoleContext } from "../models/contextProvider";
import { ISideMenuData, dataType, deviceStatuses, queryType } from "../models/sqlConsoleModels";
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

  async function sendQuery(
    sqlText: string,
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
    } catch (err) {
      console.log(err)
    }
  }

  async function connectToDevice() {
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
    } catch (err) {
      setDeviceStatus(deviceStatuses.notConnected)
      console.log('connectToDevice:\n' + err)
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
        setSqlText
      }}
    >
      {children}
    </SqlConsoleContext.Provider>
  )
}

export function useSqlConsole() {
  return useContext(SqlConsoleContext)
}