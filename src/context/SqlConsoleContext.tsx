import { createContext, useContext, useEffect, useState } from "react";
import { ISqlConsoleContext } from "../models/contextProvider";
import { ISideMenuData, dataType, queryType } from "../models/sqlConsoleModels";
import { SQL_QUERY_GET_TABLES } from "../constants/sqlQueries";

const SqlConsoleContext = createContext<ISqlConsoleContext | null>(null)

interface SqlConsoleContextProvider {
  children: React.ReactNode
}

export function SqlConsoleContextProvider({ children }: SqlConsoleContextProvider) {
  const sqlScreenData = JSON.parse(localStorage.getItem('sqlScreenData'))
  let sqlQueryText = '', deviceHost = '', sqlBaseName = ''
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
      const metadata = await getMetadata()
      setSideMenu([...metadata])
    } catch (err) {
      console.log(err)
    }
  }

  async function getMetadata(){
    const [data, err] = await sendQuery(SQL_QUERY_GET_TABLES)
    const metadata: ISideMenuData[] = []
    
    if (err){
      throw Error(err)
    }

    for (const table of data.name){
      const [columns, err] = await sendQuery(`PRAGMA table_info(${table});`)
      
      if (err){
        throw Error(err)
      }
      metadata.push({
        label: table,
        childs: Object.keys(columns)
      })
    }
    return metadata
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