import { createContext, useContext, useState } from "react";
import { ISqlConsoleContext } from "../models/contextProvider";
import { ISideMenuData, dataType, queryType } from "../models/sqlConsoleModels";
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

  const [isConnected, setIsConnected] = useState(false)
  const [appState, setAppState] = useState()
  const [host, setHost] = useState(deviceHost)
  const [databaseName, setDatabaseName] = useState(sqlBaseName)
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
      const metadata = await window.electronAPI.getMetadata({ host, databaseName })
      setSideMenu([...metadata])
      setIsConnected(true)
      updateStorageData(
        'sqlScreenData', 
        {
          deviceHost: host,
          sqlBaseName: databaseName,
        }
      )
    } catch (err) {
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
        isConnected,
        sideMenu
      }}
    >
      {children}
    </SqlConsoleContext.Provider>
  )
}

export function useSqlConsole() {
  return useContext(SqlConsoleContext)
}