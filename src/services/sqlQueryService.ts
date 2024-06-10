import { IHttpProvider } from '../models/httpProvider'
import { zip } from 'lodash';

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
  public async sendQuery(query: string): Promise<[{[key: string]: string[]} | null, string | null]> {
    this.__query = query
    this.__queryParams = ''

    const [data, error] = await this.__sendQuery()
    try{
      if (data){
        return [this.parseData(data.toString()), null]
      } else if (error){
        throw Error(error)
      }
    } catch (err){
      return [null, err.toString()]
    }
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

  public parseData(responseData: string): {[key: string]: string[]} {
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