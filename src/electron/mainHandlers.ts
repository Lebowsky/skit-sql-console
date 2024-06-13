import { SQLQueryManager } from "../services/sqlQueryService";
import { ISqlQuery } from "../models/sqlConsoleModels";
import { ConnectionError, EmptyResponseError } from "../utils/exceptions";
import { HttpProvider } from "../services/httpProvider";

export async function sendQuery(props: ISqlQuery) {
  const sql = new SQLQueryManager(props.host, props.databaseName, new HttpProvider())
  try {
    return await sql.sendQuery(props.sqlText)
  } catch (err) {
    console.log(err)
    if (err.name === 'AbortError' ||
        err.name === 'HttpRequestError' || 
        err.message === 'net::ERR_INTERNET_DISCONNECTED') {
      throw new ConnectionError(err.message, err)
    } else if (err.message === 'net::ERR_EMPTY_RESPONSE') {
      throw new EmptyResponseError(err.message, err)
    }
    throw err
  }
}

export async function getMetadata(props: ISqlQuery) {
  const sql = new SQLQueryManager(props.host, props.databaseName, new HttpProvider())
  try {
    return await sql.getMetadata()
  } catch (err) {
    if (err.name === 'AbortError' || err.message === 'net::ERR_INTERNET_DISCONNECTED') {
      throw new ConnectionError(err.message, err)
    }
    throw err
  }
}