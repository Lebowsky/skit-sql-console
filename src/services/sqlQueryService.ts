import { SQL_QUERY_GET_TABLES } from '../constants/sqlQueries';
import { IHttpProvider } from '../models/httpProvider'
import { zip } from 'lodash';
import { ISideMenuData } from '../models/sqlConsoleModels';

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
  public async sendQuery(query: string): Promise<{[key: string]: string[]}> {
    this.__query = query
    this.__queryParams = ''

    const data = await this.__sendQuery()
    return this.__parseData(data.toString())
  }

  public async getMetadata() : Promise<ISideMenuData[]>{
    const data = await this.sendQuery(SQL_QUERY_GET_TABLES)
    const metadata: ISideMenuData[] = []

    for (const table of data.name){
      const columns = await this.sendQuery(`PRAGMA table_info(${table});`)
      metadata.push({
        label: table,
        childs: columns.name
      })
    }
    return metadata
  }

  private __sendQuery() {
    const queryArgs = {
      mode: this.__mode,
      query: this.__query,
      params: this.__queryParams,
      db_name: this.__dbName
    }
    const url = `http://${this.__deviceHost}:${this.__devicePort}`
    return this.__httpProvider.get(url, queryArgs)
  }

  private __parseData(responseData: string): {[key: string]: string[]} {
    try{
      const [header, ...body] = responseData.split('\r\n')
      if (header && header.length) {
        const data = zip(...body.filter(el => !!el.trim()).map(el => el.trim().split('|').map(el => el.trim())));

        return Object.fromEntries(header.split('|').map((el, idx) => (
          [el.trim(), data[idx]]
        )))
      }
    }
    catch (err){
      console.log(err)
      return
    }
  }
}