import { JSONValue } from "./jsonTypes"

export interface IHttpProvider {
  get(url: string, params?: { [key: string]: string }): Promise<any[] | [any, any]>
  post(url: string,  data?: JSONValue, params?: { [key: string]: string }): Promise<any[] | [any, any]>
}
