import { createContext, useContext, useState } from "react";
import { ISqlConsoleContext } from "../models/contextProvider";
import { ISideMenuData, dataType, queryType } from "../models/sqlConsoleModels";
import { SQL_QUERY_GET_TABLES } from "../constants/sqlQueries";

const SqlConsoleContext = createContext<ISqlConsoleContext | null>(null)

interface SqlConsoleContextProvider {
  children: React.ReactNode
}

export function SqlConsoleContextProvider({ children }: SqlConsoleContextProvider) {
  const sqlScreenData = JSON.parse(localStorage.getItem('sqlScreenData'))
  let sqlQueryText = '', deviceHost = '10.24.24.23', sqlBaseName = 'SimpleKeep'
  if (sqlScreenData) {
    ({ sqlQueryText, deviceHost, sqlBaseName } = sqlScreenData)
  }

  const [isConnected, setIsConnected] = useState(false)
  const [host, setHost] = useState(deviceHost)
  const [databaseName, setDatabaseName] = useState(sqlBaseName)
  const [sideMenu, setSideMenu] = useState<ISideMenuData[]>([])

  async function sendQuery(
    sqlText: string,
    type: queryType = 'user',
    dataType: dataType = 'data'
  ): Promise<[{[key: string]: string[]} | null, string | null]> {
    const result = await window.electronAPI.sendQuery(
      {
        host: host,
        databaseName: databaseName,
        sqlText: sqlText,
        queryType: type,
        dataType: dataType
      }
    )
    return result
  }

  async function connectToDevice(){
    try {
      const metadata = await window.electronAPI.getMetadata({host, databaseName})
      setSideMenu([...metadata])
      setIsConnected(true)
    } catch (err) {
      console.log('connectToDevice:' + err)
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