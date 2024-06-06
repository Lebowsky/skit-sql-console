import { IColumn, ISqlTableData } from '../models/sqlConsoleModels'
import { IHttpProvider } from '../models/httpProvider'

export class SQLQueryManager {
  private __deviceHost: string
  private __devicePort: number
  private __dbName: string
  private __mode: string
  private __query: string
  private __queryParams: string
  private __httpProvider: IHttpProvider

  constructor(deviceHost: string, dbName: string, provider: IHttpProvider) {
    this.__deviceHost = deviceHost
    this.__dbName = dbName
    this.__mode = 'SQLQueryText'
    this.__devicePort = 8095
    this.__query = ''
    this.__queryParams = ''
    this.__httpProvider = provider
  }
  public sendQuery(query: string) {
    this.__query = query
    this.__queryParams = ''

    return this.__sendQuery()
  }

  private __sendQuery() {
    const queryArgs = {
      mode: this.__mode,
      query: this.__query,
      params: this.__queryParams,
      db_name: this.__dbName
    }
    const url = `http://${this.__deviceHost}:${this.__devicePort}`
    return this.__httpProvider.post(url, null, queryArgs)
  }

  public parseData(responseData: string): ISqlTableData {
    const [header, ...body] = responseData.split('\r\n')
    
    if (header && header.length) {
      const columns: IColumn[] = header.split('|').map((el, idx) => (
        {
          id: idx.toString(),
          label: el.trim(),
        }
      ))
      const data = body
        .map((el) => el.trim().split('|'))
        .map(el => Object.fromEntries(el.map((el, idx) => ([idx.toString(), el]))))
      return {
        columns: columns,
        data: data
      }
    }
  }
}