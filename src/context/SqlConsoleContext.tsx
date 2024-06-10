import { createContext, useContext, useEffect, useState } from "react";
import { ISqlConsoleContext } from "../models/contextProvider";
import { queryType } from "src/models/sqlConsoleModels";

const SqlConsoleContext = createContext<ISqlConsoleContext | null>(null)

interface SqlConsoleContextProvider {
  children: React.ReactNode
}

export function SqlConsoleContextProvider({ children }: SqlConsoleContextProvider) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    sendQuery('', '', '', '')
  }, [])

  async function sendQuery(
    sqlText: string,
    host: string,
    baseName: string, 
    type: queryType = 'user'
  ) {
    const result = await window.electronAPI.sendQuery(
      {
        host: host,
        baseName: baseName,
        sqlText: sqlText,
        queryType: type
      }
    )

    console.log(result)
  }


  return (
    <SqlConsoleContext.Provider
      value={{
        isConnected
      }}
    >
      {children}
    </SqlConsoleContext.Provider>
  )
}

export function useSqlConsole() {
  return useContext(SqlConsoleContext)
}