import { SQLQueryManager } from "../services/sqlQueryService";
import { ISqlQuery } from "../models/sqlConsoleModels";
import { ConnectionError, EmptyResponseError, UnhandledError } from "../utils/exceptions";
import { HttpProvider } from "../services/httpProvider";
import { ipcMain } from "electron";

export const registerHanders = () => {
  ipcMain.handle('send-query', async (event, props: ISqlQuery) => {
    try {
      return [null, await sendQuery(props)]
    } catch (err) {
      return [JSON.stringify(err), null]
    }
  })

  ipcMain.handle('get-sql-metadata', async (event, props: ISqlQuery) => {
    try {
      return [null, await getMetadata(props)]
    } catch (err) {
      return [JSON.stringify(err), null]
    }
  })
}

async function sendQuery(props: ISqlQuery) {
  const sql = new SQLQueryManager(props.host, props.databaseName, new HttpProvider())
  try {
    return await sql.sendQuery(props.sqlText)
  } catch (err) {
    throwCustomError(err)
  }
}

async function getMetadata(props: ISqlQuery) {
  const sql = new SQLQueryManager(props.host, props.databaseName, new HttpProvider())
  try {
    return await sql.getMetadata()
  } catch (err) {
    throwCustomError(err)
  }
}

const throwCustomError = (err: Error) => {
  if (err.name === 'AbortError'
    || err.name === 'HttpRequestError'
    || err.message === 'net::ERR_INTERNET_DISCONNECTED'
    || err.message === 'net::ERR_CONNECTION_REFUSED'
  ) {
    throw new ConnectionError(err.message, err)
  } else if (err.message === 'net::ERR_EMPTY_RESPONSE') {
    throw new EmptyResponseError(err.message, err)
  }
  throw new UnhandledError(err.message, err)
}